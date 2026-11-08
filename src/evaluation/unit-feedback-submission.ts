import { unitFeedbackBinding } from "./unit-feedback-catalog";
import { prepareRegisteredUnitFeedback } from "./unit-feedback-registry";
import {
  unitFeedbackRequestBody,
  type UnitFeedbackTask,
} from "./unit-feedback";
import {
  prepareUnitFeedbackDispatch,
  type UnitFeedbackDispatchProtocol,
} from "./unit-feedback-dispatch";
import {
  unitFeedbackRequestSchema,
  type UnitFeedbackReply,
  type UnitTrialAvailability,
} from "./unit-feedback-contract";
import { lookupUnitFeedback } from "./unit-feedback-service";
import { applyReviewedActiveFeedback } from "./unit-feedback-active-review";
import {
  UnitFeedbackStorage,
  UNIT_SUBMISSION_VERSION,
  unitDigest,
  unitReceiptSchema,
  resultFromUnitReceipt,
  type StoredUnitSubmission,
} from "./unit-feedback-storage";

export type SyntheticUnitProvider = {
  kind: "synthetic_provider";
  feedbackProtocol?: UnitFeedbackDispatchProtocol;
  execute: (
    body: ReturnType<typeof unitFeedbackRequestBody>,
    signal: AbortSignal,
  ) => Promise<unknown>;
};
export type UnitFeedbackDependencies = {
  repo?: string;
  syntheticProvider?: SyntheticUnitProvider;
  realTrialProvider?: {
    kind: "registered_synthetic_trial";
    mode?: "trial" | "direct";
    feedbackProtocol?: UnitFeedbackDispatchProtocol;
    permits: (
      body: ReturnType<typeof unitFeedbackRequestBody>,
    ) => Promise<boolean>;
    execute: SyntheticUnitProvider["execute"];
    gate?: (
      body: ReturnType<typeof unitFeedbackRequestBody>,
    ) => Promise<UnitTrialAvailability>;
    activate?: (
      body: ReturnType<typeof unitFeedbackRequestBody>,
      trialId: string,
    ) => Promise<boolean>;
  };
  timeoutMs?: number;
  unavailableTrial?: UnitTrialAvailability;
  // Supplied only by the canonical current-question route, never by HTTP input.
  currentQuestion?: { task: UnitFeedbackTask; registrationVersion: string };
};
const paused = "新答逐项评阅尚未开放；本入口不会外发原答，可先对照参考自检。";
const failureMessage =
  "这次未能取得可核实的逐项反馈，原答保留；不计零分，也不会自动重试。";

/** The default has no provider. HTTP input/env cannot install the trusted test-only executor. */
export async function evaluateUnitFeedback(
  raw: unknown,
  dependencies: UnitFeedbackDependencies = {},
): Promise<UnitFeedbackReply> {
  const request = unitFeedbackRequestSchema.parse(raw);
  const empty = (
    message: string,
    availability: UnitFeedbackReply["availability"],
  ): UnitFeedbackReply => ({
    result: null,
    canSubmit: false,
    submissionMode: "closed",
    message,
    availability,
    ...(dependencies.unavailableTrial
      ? { trial: dependencies.unavailableTrial }
      : {}),
  });
  const binding = dependencies.currentQuestion
    ? {
        registrationVersion: dependencies.currentQuestion.registrationVersion,
        contentId: dependencies.currentQuestion.task.contentId,
      }
    : unitFeedbackBinding(request.exerciseId);
  if (!binding)
    return empty(
      "本题尚未登记逐项评阅依据；原答保留，可参考自检。",
      "unsupported",
    );
  let task;
  try {
    task =
      dependencies.currentQuestion?.task ??
      prepareRegisteredUnitFeedback({
        id: request.attemptId,
        questionId: request.exerciseId,
        exerciseRevision: request.exerciseRevision,
        raw: request.answer,
      });
    if (
      task.input.caseId !== request.exerciseId ||
      task.input.caseRevision !== request.exerciseRevision ||
      task.input.answerId !== request.attemptId ||
      task.input.studentText !== request.answer
    )
      throw Error("current-question-request-binding");
  } catch {
    return empty("题目或依据版本已变更，不套用旧判断；原答仍保留。", "changed");
  }
  if (!request.answer.trim())
    return empty("原答为空，尚未评阅；不计作学生错误。", "failed");
  if (
    request.action !== "lookup" &&
    (request.contentId !== task.contentId ||
      request.registrationVersion !== binding.registrationVersion)
  )
    return empty("题目或依据登记已变更，请重新读取；本次未提交。", "changed");
  const store = new UnitFeedbackStorage(dependencies.repo ?? process.cwd());
  const trial = dependencies.realTrialProvider;
  const direct = trial?.mode === "direct";
  let body: ReturnType<typeof unitFeedbackRequestBody>;
  try {
    body = prepareUnitFeedbackDispatch(
      task,
      trial?.feedbackProtocol ??
        dependencies.syntheticProvider?.feedbackProtocol,
    ).body;
  } catch {
    return empty(
      "本协议只适用于已核定的两题及原版本；原答保留，本次未发送。",
      "changed",
    );
  }
  const bodyHash = unitDigest(body);
  const info = await trial?.gate?.(body);
  const withTrial = (reply: UnitFeedbackReply): UnitFeedbackReply =>
    info ? { ...reply, trial: info } : reply;
  if (
    request.action !== "lookup" &&
    trial?.gate &&
    request.trialId !== info?.grantId
  )
    return withTrial(
      empty("本次试用范围已变化，请重新读取；没有发送原答。", "changed"),
    );
  const saved = await store.read(task, binding.registrationVersion, bodyHash);
  if (saved)
    return withTrial(
      saved.result
        ? {
            result: saved.result,
            canSubmit: false,
            submissionMode: "closed",
            availability: "lookup_only",
            message:
              saved.result.source === "real_provider" &&
              saved.result.purpose === "practice"
                ? "已读取这份新答保存的模型反馈；没有新增调用，原答与回执分别保留。"
                : saved.result.source === "real_provider"
                  ? saved.result.purpose === "practice"
                    ? "已读取这份新答保存的模型反馈；没有新增调用，可核对原文与逐项依据。"
                    : "已读取这份虚构原答保存的真实模型试调回执；没有新增调用，仍需核对实际解释。"
                  : "已读取这份原答保存的隔离合成回执；没有新增调用，不代表真实模型质量。",
          }
        : empty(failureMessage, "failed"),
    );
  if (await store.intent(task.taskId))
    return empty(
      "这份提交已有执行记录，尚无可采用结果；需要核查回执，不自动重发。",
      "busy",
    );
  // Existing same-text fictional samples retain their original source task/event.
  if (request.action === "lookup") {
    const existing = lookupUnitFeedback(request);
    if (existing.result) return withTrial(existing);
  }
  if (dependencies.syntheticProvider && dependencies.realTrialProvider)
    throw Error("unit-provider-ambiguous");
  if (request.action === "activate") {
    if (direct) return empty("提交当前答案即可评阅。", "paused");
    if (!trial?.activate || !(await trial.activate(body, request.trialId)))
      return withTrial(
        empty(
          "本机尚无可启用的有效新答授权，未发送原答；可保存与参考自检。",
          "paused",
        ),
      );
    const gate = await trial.gate!(body);
    return {
      ...empty("试用已由你主动启用；点击评阅这份新答才会发送。", "ready"),
      canSubmit: await trial.permits(body),
      submissionMode: "real_trial",
      trial: gate,
    };
  }
  const provider = trial ?? dependencies.syntheticProvider;
  if (
    !provider ||
    (trial
      ? trial.kind !== "registered_synthetic_trial" ||
        !(await trial.permits(body))
      : provider.kind !== "synthetic_provider")
  )
    return withTrial(
      empty(
        direct
          ? "暂时无法完成评阅，原答已保存；本次未发送，不自动重试。"
          : paused,
        "paused",
      ),
    );
  // Legacy driver-only grants remain browser-closed. A new server-owned grant needs explicit activation and submission.
  if (request.action === "lookup" && trial) {
    if (direct)
      return {
        result: null,
        canSubmit: true,
        submissionMode: "direct",
        availability: "ready",
        message: "原答已保存，提交当前答案即可评阅。",
      };
    if (!trial.gate) return empty(paused, "paused");
    return {
      result: null,
      canSubmit: true,
      submissionMode: "real_trial",
      availability: "ready",
      trial: info!,
      message: "已启用限定试用；点击评阅才发送本题、公开依据与这份已保存原答。",
    };
  }
  if (request.action === "lookup")
    return {
      result: null,
      canSubmit: true,
      submissionMode: "synthetic_test",
      availability: "ready",
      message:
        "隔离测试已就绪：仅主动提交当前虚构答文给合成执行器；不连接真实模型。",
    };
  const timeoutMs = dependencies.timeoutMs ?? (trial ? 35000 : 5000);
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 60000)
    throw Error("unit-submission-timeout-config");
  const release = await store.acquire(
    task,
    binding.registrationVersion,
    bodyHash,
    body,
    trial ? "real_provider" : "synthetic_provider",
  );
  if (!release)
    return empty(
      "已有提交正在执行或待核，当前原答仍保留；不会重复发送。",
      "busy",
    );
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let sourceReceipt: StoredUnitSubmission["sourceReceipt"] = null;
  try {
    const rawReceipt = await Promise.race([
      Promise.resolve().then(() => provider.execute(body, controller.signal)),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(Error("unit-submission-timeout"));
        }, timeoutMs);
      }),
    ]);
    sourceReceipt = unitReceiptSchema.parse(rawReceipt);
    const at = new Date().toISOString(),
      result = resultFromUnitReceipt(task, sourceReceipt, at);
    if (
      sourceReceipt.source !== (trial ? "real_provider" : "synthetic_provider")
    )
      throw Error("unit-provider-source-mismatch");
    await store.save({
      version: UNIT_SUBMISSION_VERSION,
      registrationVersion: binding.registrationVersion,
      taskId: task.taskId,
      requestBodyHash: bodyHash,
      completedAt: at,
      outcome: "accepted",
      failure: null,
      sourceReceipt,
      result,
    });
    return {
      result: applyReviewedActiveFeedback(result),
      ...(trial?.gate ? { trial: await trial.gate(body) } : {}),
      canSubmit: false,
      submissionMode: "closed",
      availability: "lookup_only",
      message: trial
        ? result.purpose === "practice"
          ? "这份新答的真实模型反馈已保存；可回看或独立重答，不生成分数或永久掌握结论。"
          : "虚构新答的真实模型回执已保存；本次确实调用，仅逐项反馈，不生成分数或永久掌握结论。"
        : "虚构答文的合成回执已保存。这是接口与保存验证，未调用真实模型；可核对逐项说明。",
    };
  } catch {
    // Intent survives both failure and uncertain persistence; never retry this task automatically.
    await store
      .save({
        version: UNIT_SUBMISSION_VERSION,
        registrationVersion: binding.registrationVersion,
        taskId: task.taskId,
        requestBodyHash: bodyHash,
        completedAt: new Date().toISOString(),
        outcome: "failed",
        failure: "execution-or-validation-or-storage-failed",
        sourceReceipt,
        result: null,
      })
      .catch(() => {});
    return {
      ...empty(failureMessage, "failed"),
      ...(trial?.gate ? { trial: await trial.gate(body) } : {}),
    };
  } finally {
    if (timer) clearTimeout(timer);
    controller.abort();
    await release();
  }
}
