import type { ContentSources, UnitExercise } from "./fault-unit";

export const explosionCandidateRevision =
  "criminal-explosion-danger-2026-10-16.candidate-v1" as const;
export const explosionCandidatePreparation = {
  status: "awaiting-independent-content-review",
  chapterId: "CL14",
  proposedTopicId: "safety-explosion",
  registeredInProduct: false,
  independentContentReviewApproved: false,
  fullCurrentValidityAuditCompleted: false,
  independentCases: 1,
  writtenQuestions: 1,
  objectiveQuestions: 0,
  knowledgeCards: 0,
  modelCalls: 0,
  scope:
    "计划中尚缺的爆炸罪独立案例；只核公共危险、私人动机与未造成严重后果的基本规定。不扩过失爆炸、其他爆炸物犯罪、罪数或量刑。",
} as const;

export const explosionCandidateSources: ContentSources = {
  "explosion-code-114-115": {
    title: "《中华人民共和国刑法》第114条、第115条第1款",
    url: "https://tianjin.chinatax.gov.cn/11200000000/0300/030004/03000418/20240920152615743.shtml",
    note: "2026-10-16直接核读天津税务机关收录至修正案（十二）的正文：第114条列明爆炸危害公共安全、尚未造成严重后果的基本规定，第115条第1款另列重伤、死亡或者公私财产重大损失。第14条只作故意的背景核对，不设独立罪过分类采分点。未完成此后全部修改、清理及2027年度范围审计。",
  },
};

export const explosionCandidatePublicBasis = [
  {
    sourceId: "explosion-code-114-115",
    provisions: ["第114条", "第115条第1款"],
    summary:
      "以爆炸方式危害公共安全，尚未造成严重后果，已有基本犯罪规定；重伤、死亡或者公私财产重大损失另对应严重后果规定。",
    application:
      "本题适用推论：私人报复动机不能缩小冲击、碎片已进入有顾客公共过道的实际危险范围；未发生严重后果也不等同于没有基本犯罪。",
    boundary:
      "本题已经发生爆炸且给足公共通道受波及的事实，不处理只有准备、装置尚未爆炸或危险尚未形成的阶段争议。",
  },
] as const;

export const explosionCandidateQuestions: UnitExercise[] = [
  {
    id: "safety-explosion-danger-candidate",
    caseId: "CL14-EXPLOSION-PUBLIC-1",
    relatedTopicIds: [explosionCandidatePreparation.proposedTopicId],
    kind: "subjective",
    title: "店门之外的爆炸",
    facts:
      "本案为教学虚构。肖某成年并具备刑事责任能力。肖某因与周某有私人纠纷，决定用爆炸毁坏周某在商场一层的店铺。他明知当时商场仍在营业，店门外是顾客持续通行的公共过道，也明知爆炸冲击和碎片会进入这条过道，仍故意在该处引发爆炸。实际爆炸掀坏店门，冲击、碎片进入仍有人通行的过道，数名顾客急忙躲避。最终无人受伤，财物损失也未达到重大损失程度；这些结果已查明，没有其他严重后果。本题不考爆炸物来源、其他犯罪的竞合，也不要求区分直接故意与间接故意。",
    prompt:
      "结合爆炸影响的实际范围，判断肖某的私人报复动机是否排除公共危险。无人受伤、财物损失未达重大程度，是否因此排除爆炸罪？说明应适用基本规定还是严重后果规定，不要求量刑。",
    hint: "",
    answer: "",
    reference:
      "私人报复动机不排除本案公共危险。肖某明知营业中的公共过道持续有顾客通行，仍引发爆炸，冲击和碎片实际进入该过道，危险已经超出周某的店铺而波及公共场所中的人员。应按刑法第114条的爆炸罪基本规定判断；该条不以实际伤亡或重大财产损失为成立前提。本题没有重伤、死亡或者公私财产重大损失，不适用第115条第1款的严重后果规定。无人受伤、损失未达重大程度，不能消除已经发生的公共危险，也不能仅据此认定无罪或只有未遂。",
    criteria: [
      {
        id: "explosion-public-danger",
        label: "实际公共危险不因私人报复动机而被排除",
        meaning:
          "结合营业中仍有人通行的公共过道、爆炸冲击与碎片已进入该处，说明危险超出周某店铺而涉及公共场所中的人员，私人报复动机不排除公共危险。",
        acceptable:
          "‘虽是冲着周某去的，但冲击、碎片已到了有顾客的公共过道，危险不只落在那一家店’即可；不要求固定术语或重复题干全部事实。",
        boundary:
          "只说爆炸很危险而无本案范围联系为部分；以只想报复周某为由否定公共危险，与本项相反。已清楚说明公共过道内人员受到危险，不因未另重复动机句漏答。仅讨论后果轻重不代补本项；第二项的错误不抹去本项正确分析。",
      },
      {
        id: "explosion-basic-without-serious-result",
        label: "未造成严重后果仍适用爆炸罪基本规定",
        meaning:
          "认定本案可适用爆炸罪基本规定，未有伤亡及重大财产损失不排除基本犯罪；同时区分本题未达到严重后果规定。",
        acceptable:
          "‘没人伤、损失不重大，也能按爆炸罪的基本情形处理，只是不能按严重后果处理’表达完整；可以承接同一答文已写的公共危险事实，无须背条号或刑期。",
        boundary:
          "只写罪名、未说明无严重后果与基本规定的关系为部分；明确说没有伤亡就无罪或只能是未遂，或者只要爆炸就已达到严重后果，均与本项相反。遗漏或明确犹豫如实保留，不代补结论；不因第一项错误自动否定本项已正确表达的结果层次区分。",
      },
    ],
    sources: ["explosion-code-114-115"],
  },
];

export const explosionCandidateTrace = [
  {
    criterionId: "explosion-public-danger",
    promptPart: "判断肖某的私人报复动机是否排除公共危险",
    givenFact: "冲击、碎片进入仍有人通行的过道，数名顾客急忙躲避",
    sourceId: "explosion-code-114-115",
    provisions: ["第114条"],
  },
  {
    criterionId: "explosion-basic-without-serious-result",
    promptPart: "说明应适用基本规定还是严重后果规定",
    givenFact: "最终无人受伤，财物损失也未达到重大损失程度",
    sourceId: "explosion-code-114-115",
    provisions: ["第114条", "第115条第1款"],
  },
] as const;

export function explosionCandidatePromptMaterial(id: string) {
  const q = explosionCandidateQuestions.find((item) => item.id === id);
  if (!q) return undefined;
  return {
    id: q.id,
    revision: explosionCandidateRevision,
    caseId: q.caseId,
    relatedTopicIds: [...q.relatedTopicIds!],
    kind: q.kind,
    title: q.title,
    facts: q.facts,
    prompt: q.prompt,
  };
}
