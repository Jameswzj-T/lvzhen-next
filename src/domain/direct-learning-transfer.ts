import { exerciseFor, exerciseRevision } from "../content/fault-catalog";

// Reviewed question links, not a semantic classifier or a mastery record.
// Other topics keep ordinary continuation until a meaningful link is supplied.
const unperformed = "civpro-contract-unperformed-venue-explain";
const agreed = "civpro-contract-agreed-venue-explain";
const revision = "civil-procedure-contract-venue-2026-10-09.v1";
const service = "civpro-contract-unperformed-service-transfer-explain";
const serviceRevision = "civil-procedure-unperformed-transfer-2026-10-10.v1";
const pairs = [
  {
    left: `${unperformed}-conditions`,
    right: `${agreed}-performance`,
    focus: "约定履行地的一般规则与未履行例外",
    toAgreed:
      "刚才混淆了约定履行地的适用；换一份已交货的合同，练习区分一般规则与例外。",
    toUnperformed:
      "刚才对约定履行地的适用还不稳；换一份双方都未履行的合同，练习核对适用条件。",
  },
  {
    left: `${unperformed}-defendant`,
    right: `${agreed}-defendant`,
    focus: "被告住所地和履行地能否并列选择",
    toAgreed:
      "刚才确定可选法院时有偏差；换一个已交货的案情，练习联系被告身份和履行地点。",
    toUnperformed:
      "刚才确定可选法院时有偏差；换一个未履行的案情，练习判断两个地点是否仍能并列。",
  },
];

export function directTransferLink(
  fromId: string,
  toId: string,
  forRecommendation = false,
) {
  if (
    fromId === "commercial-forfeiture-partial-explain-v2" &&
    toId === "commercial-forfeiture-notice-transfer-explain"
  ) {
    const from = exerciseFor(fromId),
      to = exerciseFor(toId);
    if (
      !from ||
      !to ||
      from.caseId === to.caseId ||
      exerciseRevision(fromId) !==
        "commercial-contribution-forfeiture-2026-10-15.v2" ||
      exerciseRevision(toId) !== "commercial-forfeiture-transfer-2026-10-16.v1"
    )
      return null;
    const links = [
      {
        fromPointId: "forfeiture-notice-dispatch",
        toPointId: "forfeiture-transfer-notice-dispatch",
        focus: "联系公司处理过程判断失权时点",
        reason: "换一个公司的出资处理案例，先自己完整判断，再看本题反馈。",
      },
      {
        fromPointId: "forfeiture-unpaid-equity-only",
        toPointId: "forfeiture-transfer-unpaid-scope",
        focus: "联系出资情况判断失权范围",
        reason: "换一个公司的出资处理案例，先自己完整判断，再看本题反馈。",
      },
    ];
    return links.every(
      (p) =>
        from.criteria?.some((c) => c.id === p.fromPointId) &&
        to.criteria?.some((c) => c.id === p.toPointId),
    )
      ? links
      : null;
  }
  const sourceId = "crimpro-confession-only-explain";
  const targetId = "crimpro-confession-partial-corroboration-explain";
  if (fromId === sourceId && toId === targetId) {
    const from = exerciseFor(fromId),
      to = exerciseFor(toId);
    const fromPointId = `${sourceId}-application`;
    const toPointId = `${targetId}-sources`;
    if (
      !from ||
      !to ||
      from.caseId === to.caseId ||
      exerciseRevision(fromId) !== "criminal-procedure-proof-2026-10-10.v1" ||
      exerciseRevision(toId) !==
        "criminal-procedure-partial-corroboration-2026-10-10.v1" ||
      !from.criteria?.some((p) => p.id === fromPointId) ||
      !to.criteria?.some((p) => p.id === toPointId)
    )
      return null;
    return [
      {
        fromPointId,
        toPointId,
        focus: "区分材料来源，再判断它能说明什么",
        reason:
          "前一份答案在材料来源上有过混淆；换一份完整案情，先自己判断，再看本题反馈。",
      },
    ];
  }
  if (fromId === unperformed && toId === service) {
    const from = exerciseFor(fromId),
      to = exerciseFor(toId);
    if (
      !from ||
      !to ||
      from.caseId === to.caseId ||
      exerciseRevision(fromId) !== revision ||
      exerciseRevision(toId) !== serviceRevision
    )
      return null;
    const links = [
      {
        fromPointId: `${unperformed}-conditions`,
        toPointId: `${service}-conditions`,
        focus: "联系合同约定与实际行为判断履行地规则的适用",
        reason:
          "刚才对约定地点的适用有偏差；换一个服务合同案，联系实际行为重新判断管辖法院。",
      },
      {
        fromPointId: `${unperformed}-defendant`,
        toPointId: `${service}-defendant`,
        focus: "联系本案起诉对象判断被告住所地",
        reason:
          "刚才确定可选法院时有偏差；换一个服务合同案，联系起诉对象重新判断管辖法院。",
      },
    ];
    return links.every(
      (p) =>
        from.criteria?.some((c) => c.id === p.fromPointId) &&
        to.criteria?.some((c) => c.id === p.toPointId),
    )
      ? links
      : null;
  }
  // Keep the old contrast readable for saved feedback, but do not recommend it
  // as a diagnostic transfer for this misconception: its contract was performed.
  if (forRecommendation && fromId === unperformed) return null;
  const forward = fromId === unperformed && toId === agreed;
  const reverse = fromId === agreed && toId === unperformed;
  if (!forward && !reverse) return null;
  const from = exerciseFor(fromId),
    to = exerciseFor(toId);
  if (
    !from ||
    !to ||
    from.caseId === to.caseId ||
    exerciseRevision(fromId) !== revision ||
    exerciseRevision(toId) !== revision
  )
    return null;
  const links = pairs.map((p) => ({
    fromPointId: forward ? p.left : p.right,
    toPointId: forward ? p.right : p.left,
    focus: p.focus,
    reason: forward ? p.toAgreed : p.toUnperformed,
  }));
  return links.every(
    (p) =>
      from.criteria?.some((c) => c.id === p.fromPointId) &&
      to.criteria?.some((c) => c.id === p.toPointId),
  )
    ? links
    : null;
}
