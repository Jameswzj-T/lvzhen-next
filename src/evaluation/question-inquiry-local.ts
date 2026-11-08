import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { allowScoringTrialRequest } from "./local-scoring-access";
import { unitDirectPolicySchema } from "./unit-feedback-direct-policy";
import { createUnitFeedbackTrialProvider } from "./unit-feedback-provider";
import { realUnitReceiptSchema } from "./unit-feedback-storage";
import {
  inquiryRequestSchema,
  INQUIRY_VERSION,
  type InquiryReply,
} from "../domain/question-inquiry";
import {
  prepareQuestionInquiry,
  presentQuestionInquiry,
  inquiryDigest,
  INQUIRY_GENERATIONS,
} from "./question-inquiry-task";

async function readJson(path: string) {
  try {
    const bytes = await readFile(path);
    if (bytes.length > 512000) throw Error("inquiry-archive-size");
    return JSON.parse(bytes.toString());
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw e;
  }
}
export function createQuestionInquiryHandler(
  repo = process.cwd(),
  options: Pick<
    Parameters<typeof createUnitFeedbackTrialProvider>[0],
    "transport" | "readCredential"
  > = {},
) {
  return async (request: Request) => {
    const headers = { "Cache-Control": "no-store" };
    const respond = (v: InquiryReply) => Response.json(v, { headers });
    if (!allowScoringTrialRequest(request))
      return Response.json(
        { error: "仅限本机使用。" },
        { status: 403, headers },
      );
    let input;
    try {
      const text = await request.text();
      if (text.length > 24000) throw Error();
      input = inquiryRequestSchema.parse(JSON.parse(text));
    } catch {
      return Response.json(
        { error: "请检查本题版本和这次疑问；不接受历史答卷或账号资料。" },
        { status: 400, headers },
      );
    }
    const { questionId, questionRevision, inquiryId, text } = input;
    let task: ReturnType<typeof prepareQuestionInquiry>;
    try {
      task = prepareQuestionInquiry({
        questionId,
        questionRevision,
        inquiryId,
        text,
      });
    } catch {
      return respond({
        status: "unsupported",
        result: null,
        message:
          "本题当前版本尚缺可绑定的已核公开依据，疑问仍保留；本次没有发送模型。",
      });
    }
    try {
      const policy = unitDirectPolicySchema.parse(
        await readJson(
          join(repo, "artifacts/unit-feedback-service/config.json"),
        ),
      );
      const root = join(repo, "artifacts/unit-feedback-service", policy.id);
      const identityPath = join(
        root,
        `inquiry-identity-${inquiryDigest({ inquiryId })}.json`,
      );
      const identityHash = inquiryDigest(task.identity);
      const savedIdentity = await readJson(identityPath);
      if (savedIdentity && savedIdentity.identityHash !== identityHash)
        return respond({
          status: "failed",
          result: null,
          message:
            "这个疑问记录的内容或题目版本与首次发送不一致；没有再次发送或覆盖旧解释。",
        });
      // A generation change must never make an already billed inquiry look new.
      // Old identity files contain only identityHash and therefore pin legacy v1.
      const legacy = prepareQuestionInquiry(task.identity, INQUIRY_VERSION);
      const candidates = [
        task,
        ...INQUIRY_GENERATIONS.filter(
          (generation) => generation !== task.generationProtocol,
        ).map((generation) =>
          prepareQuestionInquiry(task.identity, generation),
        ),
      ];
      const records = await Promise.all(
        candidates.map(async (candidate) => {
          const name = `inquiry-${candidate.taskId.slice(0, 40)}`;
          return {
            task: candidate,
            receipt: await readJson(join(root, name + ".receipt.json")),
            intent: await readJson(join(root, name + ".intent.json")),
          };
        }),
      );
      const recorded = records.filter((r) => r.receipt || r.intent);
      const pinnedId = savedIdentity
        ? (savedIdentity.taskId ?? legacy.taskId)
        : (recorded[0]?.task.taskId ?? task.taskId);
      const selected = records.find((r) => r.task.taskId === pinnedId);
      if (
        !selected ||
        recorded.length > 1 ||
        (recorded.length === 1 && recorded[0].task.taskId !== pinnedId) ||
        (savedIdentity?.generationProtocol &&
          savedIdentity.generationProtocol !== selected.task.generationProtocol)
      )
        return respond({
          status: "failed",
          result: null,
          message:
            "这个疑问的已存生成版本无法一致核对；旧记录保留，没有再次发送。",
        });
      task = selected.task;
      const archived = selected.receipt;
      if (archived) {
        try {
          return respond({
            status: "ready",
            message: "已读取这次疑问的保存解释，没有重复调用。",
            result: presentQuestionInquiry(
              task,
              realUnitReceiptSchema.parse(archived.receipt),
            ),
          });
        } catch {
          return respond({
            status: "failed",
            result: null,
            message:
              "这次解释未通过完整性或依据校验；疑问已保留，不自动重复收费。",
          });
        }
      }
      if (selected.intent)
        return respond({
          status: "pending",
          result: null,
          message:
            "这次请求已有发送记录，暂未取得可用解释；可稍后读取，不会重复发送。",
        });
      const provider = createUnitFeedbackTrialProvider({
        grant: policy,
        root,
        credentialRepo: repo,
        ...options,
        prepareDirectDispatch: (body) => {
          const current = prepareQuestionInquiry(
            {
              questionId,
              questionRevision,
              inquiryId,
              text,
            },
            task.generationProtocol,
          );
          if (
            inquiryDigest(body) !== inquiryDigest(current.body) ||
            current.taskId !== task.taskId
          )
            throw Error("inquiry-request-changed");
          return {
            body: current.body,
            taskId: current.taskId,
            inquiry: {
              validateReceipt: (r) => {
                presentQuestionInquiry(current, r);
              },
            },
          };
        },
      });
      if (!(await provider.permits(task.body)))
        return respond({
          status: "paused",
          result: null,
          message: "解释服务当前不可用，疑问已保存；不会自动发送或扣分。",
        });
      if (input.action === "lookup")
        return respond({
          status: "available",
          result: null,
          message: "尚未请求解释；仅主动点击时发送这次疑问。",
        });
      await mkdir(root, { recursive: true, mode: 0o700 });
      try {
        await writeFile(
          identityPath,
          JSON.stringify({
            identityHash,
            taskId: task.taskId,
            generationProtocol: task.generationProtocol,
          }),
          {
            flag: "wx",
            mode: 0o600,
          },
        );
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
        const existing = await readJson(identityPath);
        if (
          existing?.identityHash !== identityHash ||
          (existing?.taskId ?? legacy.taskId) !== task.taskId ||
          (existing?.generationProtocol &&
            existing.generationProtocol !== task.generationProtocol)
        )
          throw e;
      }
      const receipt = await provider.execute(task.body, request.signal);
      if (receipt.failure)
        return respond({
          status: "failed",
          result: null,
          message: `解释未完成（${receipt.failure}）；疑问保留，不自动重试。`,
        });
      return respond({
        status: "ready",
        result: presentQuestionInquiry(task, receipt),
        message: "本次模型解释已保存；疑问不计作答或掌握状态。",
      });
    } catch {
      return respond({
        status: "paused",
        result: null,
        message: "暂时无法读取或完成本次解释；疑问保留，不会自动重复发送。",
      });
    }
  };
}
