import personalTortBindings from "./unit-feedback-personal-tort-bindings.json";
import tortBindings from "./unit-feedback-tort-bindings.json";
import cl14Bindings from "./unit-feedback-cl14-bindings.json";
import reviewedBindings20261005 from "./unit-feedback-reviewed-bindings-20261005.json";
import reviewedFollowupBindings20261005 from "./unit-feedback-reviewed-followup-bindings-20261005.json";
import civilBindings20261005 from "./unit-feedback-civil-bindings-20261005.json";
import { exerciseRevision } from "../content/fault-catalog";
import type { PublicFeedbackRule } from "./unit-feedback";

// Wrapper identity only: never add these fields to the old task definition/hash.
export const UNIT_FEEDBACK_REGISTRY_VERSION =
  "unit-feedback-public-registry-20261004.v1";
export const UNIT_FEEDBACK_PROTOCOL_VERSION =
  "unit-evidence-feedback-candidate-v1";
export const UNIT_FEEDBACK_INSTRUCTIONS_SHA256 =
  "d1096931615d031dde11a1ebc373131ff22c9046a4b4d13f47081c56e3162919";

export type UnitFeedbackBinding = {
  registrationVersion: string;
  protocolVersion: string;
  instructionsSha256: string;
  referenceFingerprint: string;
  sourceMetadataFingerprint: string;
  questionId: string;
  questionRevision: string;
  contentId: string;
  title: string;
  facts: string;
  prompt: string;
  criteria: {
    id: string;
    label: string;
    meaning: string;
    acceptable: string;
    boundary: string;
  }[];
  publicRules: PublicFeedbackRule[];
};

// Only explicitly bound public-reviewed scope. Registration alone never enables a provider.
const bindings: Record<string, UnitFeedbackBinding> = {
  "cl17-witness-retaliation-no-interference": {
    registrationVersion: UNIT_FEEDBACK_REGISTRY_VERSION,
    protocolVersion: UNIT_FEEDBACK_PROTOCOL_VERSION,
    instructionsSha256: UNIT_FEEDBACK_INSTRUCTIONS_SHA256,
    referenceFingerprint:
      "f98167a057fe463312e9c8e47d32a2ad1a7a4a4f9284f6349b03e72f01523821",
    sourceMetadataFingerprint:
      "8a52387079195249f936d427fe2f816782ad075faefbd03fb0d321503d465865",
    questionId: "cl17-witness-retaliation-no-interference",
    questionRevision: "criminal-witness-retaliation-2026-10-03.v1",
    contentId:
      "c1ca347bdf16138f133c9e8a02d73a1d308f56d8c47e561e1cb30d22f4e074a7",
    title: "没要求改口，就能排除报复证人吗",
    facts:
      "乙在丙的刑事案件中，就自己亲眼见到的经过依法出庭作证。成年甲是丙的朋友，看过记载乙作证情况的庭审记录，得知该证言对丙不利后，给丙发消息说‘他作证让你吃亏，我要教训他’。次日，甲在乙回家途中守候，拦住乙，提起此前作证的事，接连殴打乙并砸坏乙随身手机。现场录像、甲的消息和同行者的陈述记录了上述经过。甲不是司法工作人员，没有让乙改口、不到庭或不再作证的要求，现有资料也没有其他阻止作证的安排，双方没有私人债务或其他纠纷。本题不展开伤情、财损数额及其他加重资料，只分析甲上述行为的司法秩序犯罪审查路径，不要求确定最终罪责、刑期或附随罪数。",
    prompt:
      "甲说：“我没有让乙改口，也没有阻止他出庭，所以不能按第308条审查我。”这一排除理由能否成立？结合第308条与第307条第1款的分工及题设说明。本问不要求最终定罪、严重程度或刑期。",
    criteria: [
      {
        id: "cl17-witness-retaliation-no-interference-p1",
        label: "两条的行为分工",
        meaning:
          "第308条针对对证人打击报复，阻止作证或指使作伪证不是适用本条的必要条件；不能据此排除报复证人路径。",
        acceptable:
          "意思相当且能联系本案事实即可：第308条针对对证人打击报复，阻止作证或指使作伪证不是适用本条的必要条件；不能据此排除报复证人路径。",
        boundary:
          "接受报复既有作证与干预作证的等义区分，不要求逐字复述两条、背出条号或列出第307条全部手段；无需另造一句独立定罪结论。",
      },
      {
        id: "cl17-witness-retaliation-no-interference-p2",
        label: "作证联系与实际行为",
        meaning:
          "甲知道乙已经作证，得知不利证言后的消息与守候、提及作证、殴打毁物相互联系，支持因作证而攻击乙的报复路径；未要求改口或阻止出庭不能直接排除。",
        acceptable:
          "意思相当且能联系本案事实即可：甲知道乙已经作证，得知不利证言后的消息与守候、提及作证、殴打毁物相互联系，支持因作证而攻击乙的报复路径；未要求改口或阻止出庭不能直接排除。",
        boundary:
          "接受综合说明甲针对乙作证实施实际侵害，不逐动作、逐引文复述，不要求同时列殴打和毁物两项。只写乙是证人而不说明攻击与作证的联系不足；不把未展开的加重资料判成不严重。严重程度、最终罪责、刑期及附随罪数均非本问必答。",
      },
    ],
    publicRules: [
      {
        sourceId: "witnessRetaliationLaw",
        title: "刑法307条第1款、308条的行为分工",
        url: "https://tianjin.chinatax.gov.cn/11200000000/0300/030004/03000418/20240920152615743.shtml",
        excerpt:
          "第307条第1款针对阻止证人作证或指使作伪证，第308条针对对证人打击报复。第308条后段情节严重是较重刑档条件，不移作全部基本路径的统一门槛。",
        checkedAt: "2026-10-04",
        scope: "条文结构及本题排除理由，不扩最终罪责、严重程度、刑期。",
      },
    ],
  },
  "reasoning-evidence-v2": {
    registrationVersion: UNIT_FEEDBACK_REGISTRY_VERSION,
    protocolVersion: UNIT_FEEDBACK_PROTOCOL_VERSION,
    instructionsSha256: UNIT_FEEDBACK_INSTRUCTIONS_SHA256,
    referenceFingerprint:
      "36b0fb95cc46ce8b7532dc728aa41aac9ccf1afb15db2cf5d23a3abda52e314c",
    sourceMetadataFingerprint:
      "6260172086921253d7415d0dfc1ef7c20863e70fc104f00221c64836767eec76",
    questionId: "reasoning-evidence-v2",
    questionRevision: "practice-foundation-2026-09-14.v1",
    contentId:
      "a59a8ee72d6c4a10dfe17be51ba30b79d1b4207e49790306641dc1c2992e2fa6",
    title: "展台录像：说明依据",
    facts:
      "现场录像中，乙指着展台外沿提醒甲：‘启动转台会碰到旁边的人。’甲看向站在边上的丙，回答‘看到了’，随后按下启动键。转台碰伤丙。录像只拍到操作区，转台周围的防护设施不在画面内。",
    prompt: "能否据此确定甲对丙受伤的罪过？请说明已有依据和还需核实的事实。",
    criteria: [
      {
        id: "known",
        label: "现有画面支持实际预见",
        meaning: "乙的警告、甲的查看和回应支持甲已经认识到碰人的风险。",
        acceptable: "从一组连贯事实说明已知危险，不要求照抄全部动作。",
        boundary: "不能说甲没有预见，也不能直接用继续启动证明接受伤人。",
      },
      {
        id: "missing",
        label: "说明需要核实的事实",
        meaning:
          "需要了解实际防护与控制条件、甲是否认识并依赖其效能、当时相关言行，以判断结果态度。",
        acceptable:
          "提出与接受伤人或相信能避免有关的具体核实方向；不要求逐项列全。",
        boundary: "只说再调查不够具体；画面外未拍到，不等于现场不存在。",
      },
      {
        id: "limited-conclusion",
        label: "不超出证据范围定性",
        meaning:
          "目前不能确定放任还是轻信避免，应保留判断；补充事实的不同可能改变罪过结论。",
        acceptable: "说明为何暂不能确定，并保留条件；不强制编写两套假设案例。",
        boundary:
          "不能将自行假设的防护设施或信心当作已查明事实，也不能因为材料不足就直接认定无罪过。",
      },
    ],
    publicRules: [
      {
        sourceId: "law",
        title: "刑法14—16条：认识、态度与过失",
        url: "https://tianjin.chinatax.gov.cn/11200000000/0300/030004/03000418/20240920152615743.shtml",
        excerpt:
          "第14条区分明知危害结果并希望或放任；第15条区分应当预见而未预见，以及已经预见却轻信能够避免。仅凭发生危害结果或继续有意识操作，不能代替对该结果的认识和态度事实判断。",
        checkedAt: "2026-10-04",
        scope:
          "结合本题已给与未知资料分析认识及态度，非最终罪名或司法证明标准。",
      },
    ],
  },
  ...cl14Bindings,
  ...reviewedBindings20261005,
  ...reviewedFollowupBindings20261005,
  ...civilBindings20261005,
  ...tortBindings,
  ...personalTortBindings,
};
export function unitFeedbackBinding(
  questionId: string,
): UnitFeedbackBinding | null {
  return Object.hasOwn(bindings, questionId) ? bindings[questionId] : null;
}
export const unitFeedbackQuestionIds = Object.keys(bindings);

/** Learning linkage only; registration never authorizes a provider. */
export function isRegisteredCivilUnitFeedbackQuestion(
  questionId: string,
): boolean {
  if (questionId === "civil-tort-mall-slip") {
    const b = unitFeedbackBinding(questionId);
    return (
      !!b &&
      b.questionRevision === "civil-tort-personal-2026-10-09.v1" &&
      exerciseRevision(questionId) === b.questionRevision &&
      b.contentId ===
        "9db84fe0c57373b3f4a91824af387699d732bc738d235a64cbc6714bed974c58" &&
      b.registrationVersion === UNIT_FEEDBACK_REGISTRY_VERSION &&
      b.protocolVersion === UNIT_FEEDBACK_PROTOCOL_VERSION &&
      b.instructionsSha256 === UNIT_FEEDBACK_INSTRUCTIONS_SHA256
    );
  }
  if (questionId === "civil-tort-neighbor-window") {
    const b = unitFeedbackBinding(questionId);
    return (
      !!b &&
      b.questionRevision === "civil-tort-property-2026-10-08.v1" &&
      exerciseRevision(questionId) === b.questionRevision &&
      b.contentId ===
        "a5091781be63c646607cd298dc09f50f4c02ece8362d1dca1a6727722e421370" &&
      b.registrationVersion === UNIT_FEEDBACK_REGISTRY_VERSION &&
      b.protocolVersion === UNIT_FEEDBACK_PROTOCOL_VERSION &&
      b.instructionsSha256 === UNIT_FEEDBACK_INSTRUCTIONS_SHA256
    );
  }
  if (questionId !== "civil-contract-changed-price") return false;
  const binding = unitFeedbackBinding(questionId);
  return Boolean(
    binding &&
    binding.questionId === questionId &&
    binding.questionRevision === "civil-contract-formation-2026-10-05.v1" &&
    exerciseRevision(questionId) === binding.questionRevision &&
    binding.contentId ===
      "405c5244cbc41c22900c5b0fd3d29ab387b8295824b870d98ae237a18199338e" &&
    binding.registrationVersion === UNIT_FEEDBACK_REGISTRY_VERSION &&
    binding.protocolVersion === UNIT_FEEDBACK_PROTOCOL_VERSION &&
    binding.instructionsSha256 === UNIT_FEEDBACK_INSTRUCTIONS_SHA256,
  );
}
