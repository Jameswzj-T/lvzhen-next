import type { ShortResult } from "@/evaluation/short-table/contract";

type FeedbackRow = NonNullable<ShortResult["assessment"]>["items"][number];
export type IndependentPracticeSupplement = {
  id: string;
  source: "codex_independent_reading";
  sourceLabel: string;
  binding: {
    resultId: string;
    exerciseId: string;
    exerciseRevision: string;
    answerSHA256: string;
  };
  title: string;
  text: string;
  sourceReferences: { path: string; line: number; kind: string }[];
  affectsScore: false;
  originalModelReminder: false;
};

/** Reading projection only: never changes the existing score or saved reply. */
export function practiceFeedbackReading(result: ShortResult | null) {
  const rows =
    result?.state === "complete" && !result.failure && result.assessment?.valid
      ? result.assessment.items.filter((row) => row.questionId === "1")
      : [];
  const pending = (row: FeedbackRow) =>
    row.earned === null ||
    row.label === "待核对" ||
    !row.sourceValid ||
    (row.label === "是" &&
      (!row.sourceQuotes?.length ||
        !row.sourceQuotes.every(
          (quote) =>
            typeof quote === "string" &&
            quote.trim().length > 0 &&
            result!.answer.includes(quote),
        )));
  const pendingRows = rows.filter(pending);
  const accepted = rows.filter(
    (row) => !pending(row) && row.label === "是" && row.earned !== null,
  );
  const missingRows = rows.filter(
    (row) => !pending(row) && row.label === "否" && row.earned === 0,
  );
  const complete = Boolean(
    result?.state === "complete" &&
    !result.failure &&
    result.assessment?.valid &&
    rows.length &&
    !pendingRows.length &&
    result.total !== null,
  );
  const allAccepted =
    complete &&
    accepted.length === rows.length &&
    rows.every((row) => row.earned === row.points);
  const sourceText =
    result?.source === "offline_test" ? "离线样例，未调用模型。" : null;
  const scoreText =
    result?.state === "complete" &&
    !result.failure &&
    result.assessment?.valid &&
    result.total !== null
      ? `${result.total}/${result.card.maximum}`
      : result?.state === "stopped" || result?.failure
        ? "评阅未完成"
        : "待核对";
  let outcomeText = "尚无完整评阅，暂不能判断这份原答的对错。";
  let needsCopy = "先读取完整评阅，再确定需要修改的地方。";
  if (result?.state === "stopped" || result?.failure) {
    outcomeText = "本次未能完成可靠评阅，没有记为答错。";
    needsCopy = "暂不能确定错漏，可先对照参考分析。";
  } else if (result?.state === "running") {
    outcomeText = "本次评阅尚未完成。";
    needsCopy = "等待本次结果，不按零分判断。";
  } else if (allAccepted) {
    outcomeText = `这道题的${rows.length === 3 ? "三个" : `${rows.length}个`}要点，你都答到了。`;
    needsCopy = "这次没有需要补答的得分点。";
  } else if (rows.length) {
    const parts = [
      accepted.length ? `${accepted.length}项获认可` : "",
      missingRows.length ? `${missingRows.length}项未获分` : "",
      pendingRows.length ? `${pendingRows.length}项待核对` : "",
    ].filter(Boolean);
    outcomeText = parts.length
      ? `${parts.join("，")}。`
      : "逐项依据待核对，暂不下整体对错结论。";
    needsCopy = pendingRows.length
      ? "待核项目先对照原文和依据，不按漏答处理。"
      : missingRows.length
        ? "先看下面未获分项目，按保存的解释修改。"
        : "请对照逐项依据核对本次表达。";
  }
  return {
    scoreText,
    outcomeText,
    acceptedTitles: accepted.map((row) => row.title),
    missingRows,
    pendingRows,
    needsCopy,
    sourceText,
    complete,
    rowCount: rows.length,
  };
}

/** An independent note belongs to one exact original/result, never to a phrase. */
export function boundReadingSupplement(
  result: ShortResult | null,
  rawSupplement: unknown,
  answerSHA256: string | null,
) {
  if (!rawSupplement || typeof rawSupplement !== "object") return null;
  const supplement = rawSupplement as IndependentPracticeSupplement;
  if (
    !result ||
    result.state !== "complete" ||
    result.failure ||
    !result.assessment?.valid ||
    !supplement ||
    supplement.source !== "codex_independent_reading" ||
    supplement.affectsScore !== false ||
    supplement.originalModelReminder !== false ||
    typeof supplement.id !== "string" ||
    !supplement.id.trim() ||
    typeof supplement.title !== "string" ||
    !supplement.title.trim() ||
    typeof supplement.text !== "string" ||
    !supplement.text.trim() ||
    supplement.sourceLabel !== "独立阅读补充，不扣分" ||
    !supplement.binding ||
    typeof supplement.binding !== "object" ||
    !Array.isArray(supplement.sourceReferences) ||
    !supplement.sourceReferences.length ||
    !supplement.sourceReferences.every(
      (reference) =>
        reference &&
        typeof reference === "object" &&
        typeof reference.path === "string" &&
        reference.path.startsWith("src/") &&
        typeof reference.kind === "string" &&
        reference.kind.trim().length > 0 &&
        Number.isInteger(reference.line) &&
        reference.line > 0,
    ) ||
    !answerSHA256 ||
    !/^[a-f0-9]{64}$/.test(answerSHA256) ||
    supplement.binding?.resultId !== result.id ||
    supplement.binding.exerciseId !== result.card.id ||
    supplement.binding.exerciseRevision !== result.card.exerciseRevision ||
    supplement.binding.answerSHA256 !== answerSHA256
  )
    return null;
  return supplement;
}
