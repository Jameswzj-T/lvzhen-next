import type { ContentSources, UnitExercise } from "./fault-unit";

// Authored review candidates only; existing publications and product entries stay intact.
export const civilInsecurityStagesCandidateRevision =
  "civil-insecurity-stages-2026-10-16.candidate-v1";
export const civilInsecurityStagesCandidatePreparation = {
  status: "awaiting-independent-content-review",
  registeredInProduct: false,
  independentContentReviewApproved: false,
  sourceCheckedAt: "2026-10-16",
  fullCurrentValidityAuditCompleted: false,
  independentCases: 2,
  writtenQuestions: 2,
  objectiveQuestions: 0,
  newKnowledgeCards: 0,
  modelCalls: 0,
  existingTopicId: "civil-contract-performance-defense",
  preservedExistingRevision: "civil-contract-performance-2026-10-05.v1",
  existingCoverageReused: [
    "civil-contract-insecurity-rumor",
    "civil-contract-resume-after-security",
  ],
  distinctiveChanges: [
    "有资金转移及逃债目的的具体材料，直接考初次中止与及时通知；不同于无来源传闻，也不把通知当对方同意。",
    "另一交易已合法中止并及时通知，合理期限后仍未恢复能力且未提供适当担保；直接考解除权和违约责任请求权，不重考初次中止。",
  ],
} as const;

const codeUrl =
  "https://scjgj.xlgl.gov.cn/eportal/ui?articleKey=52e241f7b3244542bf83ec751a839e27&columnId=bb921ab38b3b48448a10c34332ca3f21&pageId=55b25d5ef9f74315b582ce7a486da1f6";
const sourceNote =
  "2026-10-16直接核读官方转载民法典正文；页面2021-11-30刊载，注明来源锡盟财政局。法律于2020-05-28通过、2021-01-01施行，刊载日不是施行日。原NPC来源与旧题元数据不改，本次未完成随后全部修改及司法解释清理；案例、参考与判据为自编教学候选，非官方试题或阅卷细则。";

export const civilInsecurityStagesCandidateSources: ContentSources = {
  "civil-insecurity-stages-code527": {
    title: "《民法典》第527条：确切证据与转移财产逃债时的中止",
    url: codeUrl,
    note:
      sourceNote +
      "第一题采用第1款第2项转移财产、抽逃资金以逃避债务；不要求列全四类风险，不考第2款无确切证据中止的违约责任。",
  },
  "civil-insecurity-stages-code528": {
    title: "《民法典》第528条：及时通知及合理期限后的解除与违约责任",
    url: codeUrl,
    note:
      sourceNote +
      "第一题考依法中止应及时通知；第二题采用合理期限内未恢复履行能力且未提供适当担保这一并列条件，区分可以解除和请求承担违约责任。期限长短为题设已确认，不创造统一天数，不计算赔偿。",
  },
  "civil-insecurity-stages-code565": {
    title: "《民法典》第565条：解除权行使与解除发生的区别",
    url: codeUrl,
    note:
      sourceNote +
      "仅为第二题参考的教学边界：有解除权不等于合同已经自动解除。依法通知、附条件通知或诉讼仲裁方式须按各自条件判断；本题不把通知方式、到达时间、诉讼送达或生效时点另列必答。",
  },
};

// Neutral public rules, kept separate from references and authored sample answers.
// These candidates are not added to the current public-inquiry registry.
export const civilInsecurityStagesCandidatePublicBasis = [
  {
    sourceId: "civil-insecurity-stages-code527",
    provisions: ["民法典第527条第1款第2项"],
    summary:
      "应当先履行的一方，有确切证据证明对方转移财产、抽逃资金以逃避债务，可以中止履行。",
    scope: "先履行方的初次中止；不将任何资金调动都推定为逃债。",
  },
  {
    sourceId: "civil-insecurity-stages-code528",
    provisions: ["民法典第528条"],
    summary:
      "依据第527条中止履行，应当及时通知对方；对方提供适当担保，应恢复履行。中止后对方在合理期限内未恢复履行能力且未提供适当担保，视为以自己的行为表明不履行主要债务，中止方可以解除合同并可以请求对方承担违约责任。",
    scope: "中止后的通知、恢复及进一步救济；合理期限不是法定统一天数。",
  },
  {
    sourceId: "civil-insecurity-stages-code565",
    provisions: ["民法典第565条"],
    summary:
      "依法主张解除须行使解除权；通知到达、通知载明条件及诉讼仲裁等方式各有适用规则，不能仅因具备解除条件就认定合同已经自动解除。",
    scope: "只作解除权与解除发生的教学区分，不是本批新增判定项。",
  },
] as const;

export const civilInsecurityStagesCandidateQuestions: UnitExercise[] = [
  {
    id: "civil-insecurity-transfer-suspension-explain",
    caseId: "CIV-INSECURITY-TRANSFER-1",
    relatedTopicIds: ["civil-contract-performance-defense"],
    kind: "subjective",
    title: "转走的采购资金",
    facts:
      "本案为独立教学虚构。桑禾向澄木公司购买60把普通办公椅，合同已经成立且有效，双方约定桑禾先付全款，公司十日后交货；本题不存在代理或合同效力争议。\n\n付款前，公司向桑禾出示本月银行流水、库存清单及负责人签名的说明，三份材料的真实性已经核实。流水记载，公司已把账户内全部可用资金转至另一家关联企业；负责人在说明中写明，这样做是为了让正在催款的债权人找不到可供清偿的资金。库存清单显示没有约定型号的办公椅，公司同时确认现无其他可用资金采购这批椅子，也没有另行安排供货。\n\n桑禾目前尚未付款，也尚未向公司表示将中止付款。只判断上述材料下的初次中止与通知，不讨论解除或赔偿。",
    prompt:
      "桑禾能否依据现有材料中止付款？如果中止，应如何履行通知义务，是否必须先取得澄木公司同意？结合本案简要说明。",
    hint: "",
    answer: "",
    reference:
      "桑禾约定先付款，属于先履行一方。银行流水与已核实的负责人说明共同表明，公司把可用资金转出以逃避债务，库存及资金材料又显示目前没有货物和其他采购安排；这些是具体、可核实的风险材料，不是单纯传闻。依第527条，桑禾可以据此中止付款。依据第528条，她中止付款应及时通知澄木公司，不能只在自己一方停下而不告知；通知是依法中止后的义务，不以公司先同意为前提。本问不要求判断未通知的赔偿后果，也不因中止便认定合同无效或已经解除。",
    criteria: [
      {
        id: "insecurity-initial-evidence-suspension",
        label: "具体逃债材料支持先履行方初次中止",
        meaning:
          "联系桑禾先付款的约定、已核实流水及逃债说明等材料，说明已有确切证据支持对方转移财产逃避债务，桑禾可以据此中止付款。",
        acceptable:
          "“她本来要先给钱，但流水和公司自己的说明已经证实把钱转走躲债，货也没备、没其他供货安排，这种有材料支持的风险可以先停付款”即可。无须逐条抄材料、背条号、列全四类风险或使用固定术语。",
        boundary:
          "只给‘可以中止’而没有事实联系，属于部分表达；不能仅因公司的交货义务尚未到期或合同有效就否定中止，也不能仅凭任何资金转移就推定逃债。已联系流水和逃债目的，正确说明本案桑禾可以中止时，不因未另复述先付款约定、库存、资金或十日安排漏答；不要求证明对方将来必然无法交货。若已正确说明风险材料足以支持中止，另把通知误当同意门槛，该错误在第二项处理，不重复否定本项已有的证据分析。",
      },
      {
        id: "insecurity-initial-timely-notice",
        label: "及时通知中止，无须先取得同意",
        meaning:
          "桑禾依据风险材料中止付款，应及时把中止付款告知澄木公司；通知不是向公司请求批准，不必先取得公司同意。",
        acceptable:
          "“停付要及时告诉公司，不是等公司点头才能停”即可；可以在同一句中说明及时告知和不需同意，不要求固定通知文书、书面形式、具体送达方式或期限数字。",
        boundary:
          "只说要通知而没有及时性，或未回应题目明确问到的是否须同意，按已有表达作部分处理；明确说可以一直不告知，或必须等公司批准后才能中止，与本项相反。未通知的赔偿后果、后续担保及解除不是本项必答；第一项不足不自动抹去本项正确分析。",
      },
    ],
    sources: [
      "civil-insecurity-stages-code527",
      "civil-insecurity-stages-code528",
    ],
  },
  {
    id: "civil-insecurity-expired-period-remedies-explain",
    caseId: "CIV-INSECURITY-PERIOD-2",
    relatedTopicIds: ["civil-contract-performance-defense"],
    kind: "subjective",
    title: "合理期限届满后的选择",
    facts:
      "本案为另一独立教学虚构。林序向朔宁商店出售24台普通咖啡机，合同已经成立且有效，约定林序先交货，商店收货七日后付款。\n\n交货前，林序依据商店履行能力风险的确切材料，已经依法中止交货并及时通知商店；初次中止及通知均无争议，本问不要求重新证明。此后，本案应给的合理期限已经届满，该期限的适当性及届满均已确认，本题不考期限长短。经核实，期限届满时商店仍未恢复支付约定价款的能力，至今也没有提供任何担保。\n\n林序尚未向商店作出解除合同的意思表示，也未提起解除诉讼或申请仲裁。只判断现在是否有权解除并请求违约责任，不计算赔偿或判断具体解除时点。",
    prompt:
      "林序现在能否解除合同，并请求朔宁商店承担违约责任？结合中止后的期限和商店状况说明，不要求计算赔偿或说明具体解除程序。",
    hint: "",
    answer: "",
    reference:
      "林序已经依法中止并及时通知。在题设合理期限届满时，商店仍未恢复支付价款的能力，也没有提供适当担保，符合第528条后段的两个条件。该条将这种状态视为以行为表明不履行主要债务，林序可以解除合同，并可以请求商店承担违约责任，无须一直等待，也不因尚未交货就否定这一请求权。这里说的是林序现在有权依法解除，不是期限一过合同已经自动解除；第565条关于依法行使解除权的规则只作理解提示，本题不把通知、生效时点或诉讼方式另列必答。可以请求违约责任不等于已经确定赔偿金额，本问也没有要求计算。",
    criteria: [
      {
        id: "insecurity-expired-period-termination-right",
        label: "合理期限内能力未恢复且无适当担保，取得解除权",
        meaning:
          "联系合法中止后合理期限已届满、商店仍未恢复履行能力且没有提供适当担保，说明林序可以解除合同；这是解除权成立，不能直接认定合同已经自动解除。",
        acceptable:
          "“该给的合理时间已经过了，店里还是付不了钱，也没拿出担保，所以林序有权解除”即可。‘可以解除’已经表达权利，不要求另外加一句‘尚未自动解除’，也不要求背出法条的拟制表述。",
        boundary:
          "须联系合理期限和能力、担保两个条件，不能把且写成任一条件即可。只给解除结论、漏条件联系时按实际作部分处理；明确说期限一过合同已自动解除，与本项权利性质相反。无需重证初次中止、通知或合理期限长短，无须补写统一天数、解除通知方式及生效时点。",
      },
      {
        id: "insecurity-expired-period-liability-request",
        label: "可以请求商店承担违约责任",
        meaning:
          "在本案符合第528条后段的条件下，林序除可以解除合同外，还可以请求朔宁商店承担违约责任；尚未交货不排除这一请求权。",
        acceptable:
          "“还可以要求店里承担违约责任”即可；与同一答文中的条件分析相连即可，不要求为本项再抄一遍合理期限、能力和担保事实。‘依法要求对方赔偿违约造成的损失’也可表达请求权，不要求具体数额。",
        boundary:
          "明确否定违约责任请求权，或说必须先交货才能请求，与本项相反。只说有权解除而不提违约责任，不能替学生补成已回答；只表示能否请求尚未决定，保留未决。未计算金额、罗列全部责任形式或说明损失证明不扣分；不把可以请求等同于任意金额当然全部获支持。前项存在自动解除等错误，不抹去本项明确正确的请求权表达。",
      },
    ],
    sources: [
      "civil-insecurity-stages-code528",
      "civil-insecurity-stages-code565",
    ],
  },
];

export const civilInsecurityStagesCandidateTrace = [
  {
    criterionId: "insecurity-initial-evidence-suspension",
    promptPart: "桑禾能否依据现有材料中止付款？",
    givenFact:
      "先付款后交货；已核实流水记载全部可用资金转出，负责人说明为躲避催债，库存及资金资料显示没有货物及其他采购安排。",
    sourceId: "civil-insecurity-stages-code527",
    provisions: ["民法典第527条第1款第2项"],
    contrast: "不同于既有无来源传闻；本题直接要求判断初次中止。",
  },
  {
    criterionId: "insecurity-initial-timely-notice",
    promptPart: "如果中止，应如何履行通知义务，是否必须先取得澄木公司同意？",
    givenFact: "桑禾尚未付款或作出中止表示，本问询问中止时应履行的通知义务。",
    sourceId: "civil-insecurity-stages-code528",
    provisions: ["民法典第528条第1句"],
    contrast: "通知义务成为直接设问，不再仅是已通知的背景事实。",
  },
  {
    criterionId: "insecurity-expired-period-termination-right",
    promptPart: "林序现在能否解除合同",
    givenFact:
      "已依法中止并及时通知；本案合理期限已过，商店仍未恢复付款能力且未提供任何担保，尚未行使解除权。",
    sourceId: "civil-insecurity-stages-code528",
    provisions: ["民法典第528条后段"],
    contrast: "不同于已提供足额有效担保后恢复履行，也不同于563条迟延催告解除。",
  },
  {
    criterionId: "insecurity-expired-period-liability-request",
    promptPart: "并请求朔宁商店承担违约责任？",
    givenFact:
      "合理期限后能力与担保两个条件均未补足；题面未给赔偿金额，本问只问请求权。",
    sourceId: "civil-insecurity-stages-code528",
    provisions: ["民法典第528条后段"],
    contrast: "除解除权外独立回答违约责任请求，不由解除结论自动补分。",
  },
] as const;

export function civilInsecurityStagesCandidatePromptMaterial(id: string) {
  const q = civilInsecurityStagesCandidateQuestions.find((q) => q.id === id);
  if (!q) return undefined;
  return {
    id: q.id,
    revision: civilInsecurityStagesCandidateRevision,
    caseId: q.caseId,
    relatedTopicIds: [...(q.relatedTopicIds ?? [])],
    kind: q.kind,
    title: q.title,
    facts: q.facts,
    prompt: q.prompt,
  };
}
