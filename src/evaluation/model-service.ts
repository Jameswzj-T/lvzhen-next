import { readFile } from "node:fs/promises";
import { z } from "zod";
import { inputSchema, buildModelInput, type EvaluationInput } from "./index";
import {
  configSchema,
  priceSchema,
  runChatCompletion,
  type Transport,
} from "./provider";
import { priceWindowCovers } from "./price-window";
import {
  profileSchema,
  validateModel,
  validateEndpoint,
  releaseIdentity,
  digest,
} from "./model-config";

const releaseSchema = z
  .object({
    profile: profileSchema,
    config: configSchema,
    price: priceSchema,
    credentialRef: z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/),
    workspace: z
      .object({ region: z.literal("cn-beijing"), workspaceId: z.string() })
      .strict()
      .optional(),
  })
  .strict();
const reviewSchema = z
  .object({
    releaseSha256: z.string().regex(/^[a-f0-9]{64}$/),
    reportRef: z.string().trim().min(1),
    protocol: z.literal(true),
    quality: z.literal(true),
    latency: z.literal(true),
    cost: z.literal(true),
  })
  .strict();
function freeze<T>(value: T): T {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
  return value;
}
function prepare(raw: unknown) {
  const spec = releaseSchema.parse(raw);
  validateModel(spec.config, [spec.profile]);
  validateEndpoint(spec.config, spec.profile, spec.workspace);
  if (
    spec.price.model !== spec.config.model ||
    !spec.price.billingWindow ||
    !spec.profile.priceSources.includes(
      spec.price.sourceUrl.replace(/\/$/, ""),
    ) ||
    spec.config.timeoutMs > 20000 ||
    spec.config.maxTokens > 1536
  )
    throw new Error("Invalid release");
  const identity = releaseIdentity(spec.config, spec.price, spec.profile);
  return freeze({
    ...spec,
    identity,
    releaseSha256: digest({
      identity,
      credentialRef: spec.credentialRef,
      workspace: spec.workspace,
    }),
  });
}
type Release = ReturnType<typeof prepare>;
/** Single-process service boundary. Host owns persistence/auth; no HTTP or credentials stored here. */
export class EvaluationModelService {
  private candidate: Release | null = null;
  private active: Release | null = null;
  private previous: Release | null = null;
  private approvals = new Map<string, z.infer<typeof reviewSchema>>();
  stage(raw: unknown) {
    const release = prepare(raw);
    this.candidate = release;
    return release.releaseSha256;
  }
  async stageFile(path: string) {
    return this.stage(JSON.parse(await readFile(path, "utf8")));
  }
  state() {
    return {
      candidate: this.candidate?.releaseSha256 ?? null,
      active: this.active?.releaseSha256 ?? null,
      previous: this.previous?.releaseSha256 ?? null,
    };
  }
  private checkWindow(release: Release) {
    const now = Date.now();
    if (
      !priceWindowCovers(
        release.price.billingWindow!,
        release.config.model,
        now,
        now + release.config.timeoutMs,
      )
    )
      throw new Error("price-window-unavailable");
  }
  activate(rawReview: unknown) {
    const review = reviewSchema.parse(rawReview),
      next = this.candidate;
    if (!next || review.releaseSha256 !== next.releaseSha256)
      throw new Error("Review does not match candidate");
    this.checkWindow(next);
    if (next.releaseSha256 === this.active?.releaseSha256)
      throw new Error("Already active");
    this.approvals.set(next.releaseSha256, freeze(review));
    this.previous = this.active;
    this.active = next;
    this.candidate = null;
    return this.state();
  }
  rollback() {
    if (!this.previous) throw new Error("No previous release");
    this.checkWindow(this.previous);
    const next = this.previous;
    this.previous = this.active;
    this.active = next;
    return this.state();
  }
  async evaluate(
    input: EvaluationInput,
    deps: {
      credential: (ref: string) => Promise<string>;
      transport: (adapter: string) => Transport;
      allowRealCall?: boolean;
      signal?: AbortSignal;
    },
  ) {
    const selected = this.active;
    if (!selected) throw new Error("No active release");
    const original = inputSchema.parse(buildModelInput(input).data);
    this.checkWindow(selected);
    const transport = deps.transport(selected.profile.adapter);
    if (transport.source === "real_provider" && deps.allowRealCall !== true)
      throw new Error("Explicit real-call authorization required");
    const credential = await deps.credential(selected.credentialRef);
    const evaluation = await runChatCompletion(original, selected.config, {
      credential,
      transport,
      allowRealCall: deps.allowRealCall,
      signal: deps.signal,
      price: selected.price,
    });
    return {
      releaseSha256: selected.releaseSha256,
      identity: selected.identity,
      review: this.approvals.get(selected.releaseSha256)!,
      evaluation,
    };
  }
}
