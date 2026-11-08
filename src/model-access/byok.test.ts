import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import { prepareCurrentQuestionFeedback } from "../evaluation/registered-question-feedback-task";
import { currentQuestionDispatch } from "../evaluation/current-question-teacher-dispatch";
import { presentUnitFeedbackReceipt } from "../evaluation/unit-feedback-dispatch";
import { createHash } from "node:crypto";
import { createOwnKeyFeedbackHandler } from "./feedback-handler";
import { createOwnKeyInquiryHandler } from "./inquiry-handler";
import { prepareQuestionInquiry } from "../evaluation/question-inquiry-task";
import { RecentModelRequests } from "./recent-requests";
import { ownKeyCompletion, ModelAccessError } from "./transport";
import { runtimeConfig } from "../runtime/config";
import { allowScoringTrialRequest } from "../evaluation/local-scoring-access";
import { allowPublicRequest, usesOwnModelKey } from "./access";
import {
  readModelAccess,
  saveModelAccess,
  removeModelAccess,
  modelAccessHeaders,
  modelAccessStorageKey,
} from "./client";
import { freshProgress, progressSchema } from "../domain/fault-progress";
import {
  recordInquiryExplanation,
  savedInquiryExplanation,
} from "../domain/saved-inquiry-explanation";
import { readLearningRecordFile } from "../records/record-file";
import { planImport } from "../records/import-plan";

const env = {
  NODE_ENV: "production" as const,
  LVZHEN_ENV: "public",
  LVZHEN_APP_ORIGIN: "https://lvzhen.example.test",
};
const key = "synthetic-device-key-DO-NOT-USE",
  otherKey = "synthetic-other-person-key-DO-NOT-USE";
const qid = "g8-writing-civil-complaint";
function input(id = "offline-byok-answer") {
  return {
    version: "registered-question-submission-v1",
    action: "submit",
    exerciseId: qid,
    exerciseRevision: exerciseRevision(qid),
    attemptId: id,
    answer: "离线合成原答，只检查传输和绑定。",
    choice: "",
    transmissionConsent: true,
  };
}
function request(
  body: unknown,
  credential: string | null = key,
  origin = env.LVZHEN_APP_ORIGIN,
) {
  return new Request(`${env.LVZHEN_APP_ORIGIN}/api/test`, {
    method: "POST",
    headers: {
      host: "lvzhen.example.test",
      origin,
      "Content-Type": "application/json",
      "x-lvzhen-scoring": "1",
      ...(credential ? { Authorization: `Bearer ${credential}` } : {}),
    },
    body: JSON.stringify(body),
  });
}
function envelope(text: string, status = 200) {
  return new Response(
    JSON.stringify({
      id: "offline-upstream-response",
      model: "deepseek-flash",
      choices: [
        {
          index: 0,
          finish_reason: "stop",
          message: { role: "assistant", content: text },
        },
      ],
    }),
    { status },
  );
}
function answerOutput(original = input()) {
  const task = prepareCurrentQuestionFeedback(original).task;
  return JSON.stringify({
    caseId: qid,
    caseRevision: original.exerciseRevision,
    answerId: original.attemptId,
    status: "assessed",
    substantiveIssue: "",
    terminologyIssue: "",
    clarification: "",
    studentResponse: "离线合成讲解，不能作为模型能力证明。",
    criteria: task.input.criteria.map((c) => ({
      id: c.id,
      status: "partial",
      evidence: [original.answer],
      reason: "离线合成理由，仅测试本题原文绑定。",
    })),
  });
}
beforeEach(() =>
  vi.stubGlobal(
    "fetch",
    vi.fn(() => {
      throw Error("OFFLINE_NO_NETWORK");
    }),
  ),
);
afterEach(() => {
  expect(fetch).not.toHaveBeenCalled();
  vi.unstubAllGlobals();
});

it("public mode needs no database/mail/owner secret, never permits local scoring, and trusts only its configured site", () => {
  expect(runtimeConfig(env)).toMatchObject({
    mode: "public",
    enabled: false,
    databaseUrl: "",
    authSecret: "",
  });
  expect(usesOwnModelKey(request(input(), null), env)).toBe(true);
  expect(allowPublicRequest(request(input()), "x-lvzhen-scoring", env)).toBe(
    true,
  );
  expect(
    allowPublicRequest(
      request(input(), key, "https://attacker.test"),
      "x-lvzhen-scoring",
      env,
    ),
  ).toBe(false);
  const proxy = new Request("http://127.0.0.1:3000/api/test", {
    method: "POST",
    headers: {
      host: "lvzhen.example.test",
      origin: env.LVZHEN_APP_ORIGIN,
      "x-lvzhen-scoring": "1",
    },
  });
  expect(allowPublicRequest(proxy, "x-lvzhen-scoring", env)).toBe(true);
  expect(
    allowScoringTrialRequest(
      new Request("http://127.0.0.1:3107/api/test", {
        headers: {
          host: "127.0.0.1:3107",
          origin: "http://127.0.0.1:3107",
          "x-lvzhen-scoring": "1",
        },
      }),
      env,
    ),
  ).toBe(false);
});
it("missing Key and read-only lookup cannot call an owner provider or upstream", async () => {
  const upstream = vi.fn();
  const handle = createOwnKeyFeedbackHandler({ env, fetcher: upstream });
  const missing = await (await handle(request(input(), null))).json();
  expect(missing.reply).toMatchObject({
    result: null,
    canSubmit: false,
    availability: "paused",
  });
  expect(missing.reply.message).toContain("模型设置");
  const ready = await (
    await handle(request({ ...input(), action: "lookup" }))
  ).json();
  expect(ready.reply).toMatchObject({
    canSubmit: true,
    submissionMode: "direct",
  });
  expect(upstream).not.toHaveBeenCalled();
});
it("reuses exact existing dispatch and decoder, deduplicates one answer and isolates users", async () => {
  const original = input();
  const dispatch = currentQuestionDispatch(
    prepareCurrentQuestionFeedback(original).task,
  );
  const bodyHash = createHash("sha256")
    .update(JSON.stringify(dispatch.body))
    .digest("hex");
  expect(
    presentUnitFeedbackReceipt(
      prepareCurrentQuestionFeedback(original).task,
      answerOutput(),
      bodyHash,
    ).requestBodyHash,
  ).toBe(bodyHash);
  const upstream = vi.fn(async (url, init) => {
    const tool = dispatch.body.tools?.[0].function.name;
    expect(url).toBe(
      tool
        ? "https://api.deepseek.com/beta/chat/completions"
        : "https://api.deepseek.com/chat/completions",
    );
    expect(JSON.parse(init.body)).toEqual(dispatch.body);
    expect(init.redirect).toBe("error");
    expect(init.cache).toBe("no-store");
    expect(init.headers.Authorization).toMatch(/^Bearer synthetic-/);
    return tool
      ? new Response(
          JSON.stringify({
            id: "offline-upstream-response",
            model: "deepseek-flash",
            choices: [
              {
                finish_reason: "tool_calls",
                message: {
                  role: "assistant",
                  content: null,
                  tool_calls: [
                    {
                      id: "offline-tool-call",
                      type: "function",
                      function: { name: tool, arguments: answerOutput() },
                    },
                  ],
                },
              },
            ],
          }),
        )
      : envelope(answerOutput());
  });
  const handle = createOwnKeyFeedbackHandler({
    env,
    fetcher: upstream,
    recent: new RecentModelRequests(),
  });
  const replies = await Promise.all([
    handle(request(original)),
    handle(request(original)),
  ]);
  const first = await replies[0].json(),
    second = await replies[1].json();
  await expect(upstream.mock.results[0]?.value).resolves.toBeInstanceOf(
    Response,
  );
  expect(first.reply.result.source).toBe("real_provider");
  expect(first.reply.result.view.originalText).toBe(original.answer);
  expect(first.reply.result.view.questionId).toBe(qid);
  expect(first.reply.result).toEqual(second.reply.result);
  expect(first.original.id).toBe(original.attemptId);
  expect(JSON.stringify(first)).not.toContain(key);
  expect(upstream).toHaveBeenCalledTimes(1);
  const saved = await (
    await handle(request({ ...original, action: "lookup" }))
  ).json();
  expect(saved.reply.result.id).toBe(first.reply.result.id);
  const other = await (
    await handle(request({ ...original, action: "lookup" }, otherKey))
  ).json();
  expect(other.reply.result).toBeNull();
  expect(upstream).toHaveBeenCalledTimes(1);
  const changed = await (
    await handle(request({ ...original, answer: "同编号换了原答" }))
  ).json();
  expect(changed.reply.result).toBeNull();
  expect(upstream).toHaveBeenCalledTimes(1);
});
it.each([401, 402, 429, 500])(
  "upstream %s keeps the original, suppresses provider error details and never automatically retries",
  async (status) => {
    const upstream = vi.fn(
      async () => new Response(`PRIVATE UPSTREAM ${key}`, { status }),
    );
    const handle = createOwnKeyFeedbackHandler({
      env,
      fetcher: upstream,
      recent: new RecentModelRequests(),
    });
    const first = await (
      await handle(request(input(`status-${status}`)))
    ).json();
    expect(first.reply.availability).toBe("failed");
    expect(first.original.answer).toBe(input().answer);
    expect(JSON.stringify(first)).not.toContain(key);
    expect(JSON.stringify(first)).not.toContain("PRIVATE UPSTREAM");
    await handle(request(input(`status-${status}`)));
    expect(upstream).toHaveBeenCalledTimes(1);
  },
);
it("rejects invalid consent, cross-site requests, oversize bodies, truncated output and forged original evidence", async () => {
  const upstream = vi.fn(async () =>
    envelope(answerOutput().replaceAll(input().answer, "不是原答的文字")),
  );
  const handle = createOwnKeyFeedbackHandler({ env, fetcher: upstream });
  expect(
    (await handle(request({ ...input(), transmissionConsent: false }))).status,
  ).toBe(400);
  expect(
    (await handle(request(input(), key, "https://other.test"))).status,
  ).toBe(403);
  expect(
    (await handle(request({ ...input(), answer: "a".repeat(37000) }))).status,
  ).toBe(400);
  const failed = await (
    await handle(request(input("invalid-evidence")))
  ).json();
  expect(failed.reply.result).toBeNull();
  expect(upstream).toHaveBeenCalledTimes(1);
  const truncated = vi.fn(
    async () =>
      new Response(
        JSON.stringify({
          id: "truncated",
          model: "deepseek-flash",
          choices: [
            {
              finish_reason: "length",
              message: { role: "assistant", content: "{}" },
            },
          ],
        }),
      ),
  );
  await expect(
    ownKeyCompletion(
      currentQuestionDispatch(prepareCurrentQuestionFeedback(input()).task)
        .body,
      key,
      truncated,
    ),
  ).rejects.toBeInstanceOf(ModelAccessError);
});

function memoryStorage() {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    key: (i: number) => [...map.keys()][i] ?? null,
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => {
      map.set(k, v);
    },
    removeItem: (k: string) => {
      map.delete(k);
    },
  } satisfies Storage;
}
it("device Key survives another reader, changes/deletes independently of records and is never put in learning exports", () => {
  const storage = memoryStorage();
  storage.setItem("existing-learning", JSON.stringify(freshProgress()));
  const old = storage.getItem("existing-learning");
  saveModelAccess(key, storage);
  expect(readModelAccess(storage)?.apiKey).toBe(key);
  vi.stubGlobal("window", { localStorage: storage, dispatchEvent: vi.fn() });
  expect(modelAccessHeaders().Authorization).toBe(`Bearer ${key}`);
  saveModelAccess(otherKey, storage);
  expect(modelAccessHeaders().Authorization).toBe(`Bearer ${otherKey}`);
  const exported = JSON.stringify(
    progressSchema.parse(JSON.parse(storage.getItem("existing-learning")!)),
  );
  expect(exported).not.toContain(key);
  expect(exported).not.toContain(otherKey);
  expect(exported).not.toContain(modelAccessStorageKey);
  removeModelAccess(storage);
  expect(modelAccessHeaders()).toEqual({});
  expect(storage.getItem("existing-learning")).toBe(old);
});
it("inquiry uses only fixed public material, is saved with its original, and survives export/import without Key", async () => {
  const questionId = "cl14-flight-no-serious-result",
    inquiryId = "offline-inquiry-save";
  const identity = {
    questionId,
    questionRevision: exerciseRevision(questionId),
    inquiryId,
    text: "这是离线虚构疑问，为什么本题不能仅凭违规认定？",
  };
  const task = prepareQuestionInquiry(identity);
  const rule = task.material.publicRules[0];
  const upstream = vi.fn(async (_url, init) => {
    expect(JSON.parse(init.body)).toEqual(task.body);
    return envelope(
      JSON.stringify({
        version: "question-inquiry-v1",
        taskId: task.taskId,
        kind: "explanation",
        explanation: "离线虚构解释，只验证原文与公开依据绑定。",
        uncertainty: "",
        basis: [{ sourceId: rule.sourceId, quote: rule.excerpt }],
      }),
    );
  });
  const handle = createOwnKeyInquiryHandler({ env, fetcher: upstream });
  const first = await (
    await handle(
      request({
        version: "question-inquiry-v1",
        action: "explain",
        transmissionConsent: true,
        ...identity,
      }),
    )
  ).json();
  expect(first.status).toBe("ready");
  expect(first.result.identity).toEqual(identity);
  expect(upstream).toHaveBeenCalledTimes(1);
  const before = progressSchema.parse({
    ...freshProgress(),
    inquiries: [
      {
        id: inquiryId,
        text: identity.text,
        createdAt: new Date().toISOString(),
        exerciseId: questionId,
        exerciseRevision: identity.questionRevision,
      },
    ],
  });
  const saved = progressSchema.parse(
    recordInquiryExplanation(before, first.result),
  );
  expect(saved.inquiries).toEqual(before.inquiries);
  expect(savedInquiryExplanation(saved, identity)).toEqual(first.result);
  const exported = JSON.stringify(saved);
  expect(exported).not.toContain(key);
  const restored = readLearningRecordFile(exported)[0].state;
  expect(savedInquiryExplanation(restored, identity)).toEqual(first.result);
  const merged = planImport(before, restored).state;
  expect(savedInquiryExplanation(merged, identity)).toEqual(first.result);
  expect(
    recordInquiryExplanation(saved, {
      ...first.result,
      explanation: "不得覆盖旧解释",
    }),
  ).toBe(saved);
  expect(() =>
    progressSchema.parse({
      ...saved,
      inquiryExplanations: [
        { ...first.result, identity: { ...identity, text: "另一条疑问" } },
      ],
    }),
  ).toThrow();
  expect(() =>
    planImport(saved, {
      ...saved,
      inquiryExplanations: [{ ...first.result, explanation: "不同旧解释" }],
    }),
  ).toThrow("inquiry_explanation_id_conflict");
  expect(exerciseFor(qid)?.kind).toBe("subjective");
});
