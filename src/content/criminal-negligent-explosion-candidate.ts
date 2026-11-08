import type { ContentSources, UnitExercise } from "./fault-unit";

export const negligentExplosionCandidateRevision =
  "criminal-negligent-explosion-2026-10-16.candidate-v1" as const;

export const negligentExplosionCandidatePreparation = {
  registeredInProduct: false,
  independentContentReviewApproved: false,
  fullCurrentValidityAuditCompleted: false,
  independentCases: 1,
  writtenQuestions: 1,
  objectiveQuestions: 0,
  knowledgeCards: 0,
  reuseTopicId: "safety-fire",
  modelCalls: 0,
  reviewedCurrentNeighbors: [
    "cl14-fire-camping-v2",
    "cl14-utilities-gas",
    "cl14-facilities-chemical",
    "cl02-review-gas-v2",
  ],
  scope:
    "现有失火题已考过失及重大损失正例。本候选只补一般生活事件中的过失心理、无严重结果不成立过失爆炸及不能转套第114条；不新增知识卡，不处理专门事故罪或设备罪，不提供爆炸操作细节。",
} as const;

export const negligentExplosionCandidateSources: ContentSources = {
  "negligent-explosion-code-15": {
    title: "《中华人民共和国刑法》第14、15条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5212248/content.html",
    note: "2026-10-16直接读取国家税务总局政策法规库所载修正案（十二）文本：区分故意与两类过失，并核过失犯罪须有法律规定。将具体心理事实归入过于自信的过失是本题适用判断，不是官方案例或采分标准。未完成后续全部修改及2027年度范围审计。",
  },
  "negligent-explosion-code-114-115": {
    title: "《中华人民共和国刑法》第114条、第115条第1、2款",
    url: "https://tianjin.chinatax.gov.cn/11200000000/0300/030004/03000418/20240920152615743.shtml",
    note: "2026-10-16直接读取天津税务机关收录至修正案（十二）的正文：115条第2款指向前款重伤、死亡或公私财产重大损失，与114条故意危害公共安全的基本规定区分。同页及总局正文另核118、119、134—136条，作为本候选明确排除专门设备、生产事故和危险物品管理犯罪的范围依据，不把生产安全解释的数量标准移用于本题。未做全量后续效力清理。",
  },
};

export const negligentExplosionCandidatePublicBasis = [
  {
    sourceId: "negligent-explosion-code-15",
    provisions: ["第14条", "第15条"],
    rule: "已经预见危害结果而轻信能够避免，属于过失的一种心理形态；知道风险并继续行为，不单独证明希望或放任结果。过失心理还不等于某一过失犯罪成立。",
    application:
      "本题提示、暂停及错误依赖另一物品的旧记录，共同支持已预见风险却无充分根据相信可以避免；不能仅凭最后没有伤亡反推没有过失。",
  },
  {
    sourceId: "negligent-explosion-code-114-115",
    provisions: ["第114条", "第115条第1、2款"],
    rule: "过失爆炸须符合第115条第2款指向的严重结果条件。只有公共危险、未致重伤死亡或重大财产损失，不能照搬第114条故意基本犯入罪。",
    application:
      "本题公共通道已被爆炸波及，但没有法定严重结果，不成立过失爆炸罪；其过失心理不能补足结果，也不能转换成故意来适用114条。",
    boundary:
      "限定题设已排除的专门罪名，不据此概括所有燃气、危险物品或生产事故。仅结论为不成立本罪，不评价其他责任，也不编造财产损失数额门槛。",
  },
] as const;

export const negligentExplosionCandidateQuestions: UnitExercise[] = [
  {
    id: "safety-negligent-explosion-no-serious-result-candidate-v1",
    caseId: "CL14-NEGLIGENT-EXPLOSION-1",
    relatedTopicIds: ["safety-fire", "negligence"],
    kind: "subjective",
    title: "旧记录与眼前的异常",
    facts:
      "本案为教学虚构。沈某是具备通常认知和行动能力的成年人，在自家院内清理生活旧物，院外是居民经常通行的公共过道。沈某事前读到针对眼前物品的异常提示：继续自行处置可能发生爆炸，并波及过路人。他暂停处理，却找出数年前另一件物品的检验记录作为继续处理的依据，没有核对适用对象，也未排除眼前的异常；当时可以停止处理、等待专业检查。其事前发给家人的信息与查阅记录的过程相互印证：他将旧记录误认为这次不会爆炸的依据。调查确认，该记录不适用于本次物品，不能据此判断当前安全。随后上述处置引发爆炸，冲击和碎片进入仍有人通行的公共过道，多名行人躲避。最终无人受伤，公私财产损失未达到重大程度，也没有其他严重后果，因果及结果均已查明。为集中考查罪过与结果门槛，本题已排除危险物品肇事、生产责任事故及破坏燃气等专门设备犯罪，不讨论爆炸的技术机理和其他责任。",
    prompt:
      "结合沈某事前获知的信息与继续处理的依据，判断其对爆炸及人员受害风险的心理态度。公共危险已形成但没有法定严重后果，是否成立过失爆炸罪，能否改按第114条的基本规定追究？说明理由，不要求量刑。",
    hint: "",
    answer: "",
    reference:
      "沈某读到明确的爆炸及伤人风险提示后暂停处理，说明并非完全没有预见风险；他后来依赖不适用于眼前物品的旧检验记录，误以为本次不会发生爆炸，属于没有充分根据而相信可以避免，体现过于自信的过失。不能仅因知道风险后继续处理就推成希望或放任爆炸，也不能因最终无人受伤否认其过失心理。罪过心理与具体犯罪成立须分开：过失爆炸适用刑法第115条第2款，须达到其所指向的重伤、死亡或公私财产重大损失等严重结果。本案虽有现实公共危险，但没有这些结果，不成立过失爆炸罪。第114条针对故意危害公共安全的基本犯罪，不能为填补本案过失行为的结果条件而套用；也不能按第115条第2款的情节较轻规定绕开结果要求。本题不据此认定其他责任一概不存在。",
    criteria: [
      {
        id: "negligent-explosion-foreseen-unfounded-confidence",
        label: "已预见风险却无充分根据相信可以避免",
        meaning:
          "联系明确风险提示、暂停及对另一物品旧记录的错误依赖，认定已预见爆炸及伤人风险，但无充分根据相信可避免，体现过于自信的过失心理。",
        acceptable:
          "‘他知道可能爆炸伤人，却把不适用的旧记录当成这次安全的依据，以为不会出事，这是有预见而判断过分乐观的过失’即可；不要求固定术语或复述全部事实。",
        boundary:
          "只说过失而未说明预见和错误依赖的关系为部分。明确说从未预见而属疏忽大意，或仅因知道风险后继续便认定希望、放任，与本项相反；事实分析正确的部分仍须承认。未造成伤亡不排除过失心理。只写第15条一般规则不代补本案应用。未表达与明确犹豫分别保留为遗漏、未决，不用第二项结论倒推本项。",
      },
      {
        id: "negligent-explosion-serious-result-required",
        label: "未达严重结果不成立过失爆炸且不能转套故意基本犯",
        meaning:
          "说明过失爆炸须有法定严重结果，本案虽形成公共危险却无伤亡或重大财产损失，不成立该罪；第114条故意基本犯不能代替过失犯罪的结果条件。",
        acceptable:
          "‘有过失和公共危险还不够，这里没有重伤、死亡或重大损失，不能定过失爆炸；故意爆炸的基本规定也不能拿来套这个过失行为’即可，可承接前文的过失分析，不要求背条号、刑期或损失数额。",
        boundary:
          "只有不构成本罪结论而无结果理由，或已正确说明严重结果及本案不构罪、却未回应为何不能转套故意基本规定，均为部分。明确主张过失只要形成公共危险即可构罪、转用第114条入罪，或借情节较轻而省略严重结果，均与本项相反；仍保留其其他正确法理。第一项错误不自动连带本项，须判断本项在过失前提下的结果规则及本案适用。未表达与明确犹豫分别保留为遗漏、未决；不要求另答未遂、其他罪名或其他责任。",
      },
    ],
    sources: [
      "negligent-explosion-code-15",
      "negligent-explosion-code-114-115",
    ],
  },
];

export const negligentExplosionCandidateTrace = [
  {
    criterionId: "negligent-explosion-foreseen-unfounded-confidence",
    promptPart: "判断其对爆炸及人员受害风险的心理态度",
    givenFact: "他将旧记录误认为这次不会爆炸的依据",
    sourceId: "negligent-explosion-code-15",
    provisions: ["第14条", "第15条"],
  },
  {
    criterionId: "negligent-explosion-serious-result-required",
    promptPart: "是否成立过失爆炸罪，能否改按第114条的基本规定追究",
    givenFact: "最终无人受伤，公私财产损失未达到重大程度",
    sourceId: "negligent-explosion-code-114-115",
    provisions: ["第114条", "第115条第1、2款"],
  },
] as const;

export function negligentExplosionCandidatePromptMaterial(id: string) {
  const q = negligentExplosionCandidateQuestions.find((item) => item.id === id);
  if (!q) return undefined;
  return {
    id: q.id,
    revision: negligentExplosionCandidateRevision,
    caseId: q.caseId,
    relatedTopicIds: [...q.relatedTopicIds!],
    kind: q.kind,
    title: q.title,
    facts: q.facts,
    prompt: q.prompt,
  };
}
