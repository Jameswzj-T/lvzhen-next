import { faultTopics, type UnitExercise } from "./fault-unit";

// Authored cases, reviewed against Criminal Law arts. 14–16 on 2026-09-14.
// Source use and question-by-question findings: practice-content.review.md.
// Keep this published pack independent of all earlier question snapshots.
export const practiceFaultRevision = "practice-fault-2026-09-14.v1";
const original = (topicId: string, id: string) =>
  faultTopics
    .find((t) => t.id === topicId)!
    .exercises.find((q) => q.id === id)!;

export const practiceFaultCases: {
  topicId: "negligence" | "accident";
  exam: boolean;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "negligence",
    exam: false,
    exercise: {
      id: "negligence-inspection-reason",
      kind: "subjective",
      optional: true,
      title: "护栏松动：没有想到就能免责吗",
      facts: original("negligence", "negligence-inspection").facts,
      prompt:
        "甲说：‘我根本没想到会有人跌伤，所以这是意外事件。’这一理由能否成立？请结合案情说明甲对跌伤结果的罪过。",
      hint: "把检查职责、受训能力和当时能否发现松动，与未预见的原因联系起来。",
      reference:
        "甲的理由不能成立。检查护栏是其职责，他受过培训，且正常检查即可发现并固定松动部位，说明在当时条件下应当且能够预见跌伤风险。他却因疏忽跳过检查而未预见，对跌伤结果属于疏忽大意的过失。意外事件要求不存在故意或过失，不能只凭‘没想到’认定。是否构成具体过失犯罪，还须审查法律规定及其他条件。",
      criteria: [
        {
          id: "duty-capacity",
          label: "应当且能够预见",
          meaning:
            "检查职责和培训支持预见义务与能力；正常检查即可发现松动，说明当时有现实的发现条件。",
          acceptable: "结合职责、能力及可发现的松动，说明风险本可被预见。",
          boundary:
            "只说设备员应负责，或只从已经跌伤倒推过失，都缺少具体依据。",
        },
        {
          id: "failure-to-foresee",
          label: "因疏忽没有预见",
          meaning: "甲因疏忽跳过检查而没有预见跌伤，不是已经预见后轻信能避免。",
          acceptable: "把遗漏检查与未意识到跌伤风险联系起来。",
          boundary: "不能自行补成甲已经看到松动、相信护栏不会倒。",
        },
        {
          id: "conclusion",
          label: "疏忽大意的过失",
          meaning: "甲对跌伤有疏忽大意的过失，实际没想到不足以认定意外事件。",
          acceptable: "结论与应当能够预见、因疏忽未预见的事实一致。",
          boundary: "不直接据此宣称某一具体罪名成立。",
        },
      ],
      sources: ["law"],
    },
  },
  {
    topicId: "negligence",
    exam: true,
    exercise: {
      id: "negligence-exam-return",
      kind: "objective",
      optional: true,
      title: "归还工具：好意与注意义务",
      facts:
        "甲借用活动中心的一箱金属工具后，准备归还。工具箱很重，甲站在高于地面的卸货台上，打算把箱子推到台下。台边地面照明良好，乙正在下方整理物品，甲稍向前查看即可发现。甲为赶时间没有查看便推下箱子，乙被砸伤。查明甲是具有正常认知能力的成年人，事先没有想到箱子会砸伤人，也没有伤人意图。",
      prompt: "仅就甲对乙受伤的罪过，下列说法正确的是：",
      options: [
        {
          id: "a",
          text: "甲是为了归还工具，出于好意，所以属于意外事件。",
          explanation:
            "归还工具的目的不能排除对砸伤风险的注意义务；甲本可先查看台下。",
        },
        {
          id: "b",
          text: "甲应当且能够预见，却因疏忽未预见，属于疏忽大意的过失。",
          explanation:
            "从高处推下重箱有明显风险，乙又处于稍加查看即可发现的位置；甲有能力预见，却未查看而没有想到。",
        },
        {
          id: "c",
          text: "甲有意推下工具箱，因此对乙受伤属于直接故意。",
          explanation:
            "有意识地推箱不等于希望伤人；题设没有甲希望乙受伤的事实。",
        },
        {
          id: "d",
          text: "只要甲实际没有想到会砸伤人，就不存在任何过失。",
          explanation:
            "疏忽大意的过失恰恰可能表现为实际没有预见，仍须判断应当且能够预见。",
        },
      ],
      answer: "b",
      hint: "归还的目的和对砸伤的注意义务，是两个不同的问题。",
      reference:
        "甲对乙受伤属于疏忽大意的过失。从高处推下重箱可能砸伤台下人员，甲具有正常认知能力，且稍加查看即可发现乙，应当且能够预见危险。他为赶时间未查看而没有预见，不能因归还工具的好意免除这一过失。本题只判断罪过，具体犯罪仍需结合损害程度和相应法律规定。",
      sources: ["law"],
    },
  },
  {
    topicId: "negligence",
    exam: true,
    exercise: {
      id: "negligence-exam-brake",
      kind: "objective",
      optional: true,
      title: "滑车失控：最后来不及制止",
      facts:
        "甲负责用滑车将器材沿坡道运至仓库，按规定应先检查制动装置。制动拉杆已明显脱落，受过培训的甲只要按步骤检查即可发现并停止使用。甲因疏忽漏做检查，未发现故障，也没有想到滑车会失控撞人，便开始搬运。滑车沿坡道失控后，甲立即追赶，但当时已无法拦住，最终撞伤行人。",
      prompt: "关于甲对撞伤结果的罪过，下列说法正确的是：",
      options: [
        {
          id: "a",
          text: "滑车失控后甲已无法拦住，因此整个事件属于不能抗拒。",
          explanation:
            "最后无法拦住不能消除此前漏查制动装置的过失，须把危险形成前的可预见条件一并审查。",
        },
        {
          id: "b",
          text: "甲事后追赶滑车，足以证明此前已经预见风险并轻信能够避免。",
          explanation:
            "事后追赶说明他在失控后发现危险，不能证明开始搬运前已经预见；题设明确此前没有想到。",
        },
        {
          id: "c",
          text: "甲漏做本可发现故障的检查，因疏忽未预见撞伤风险，属于疏忽大意的过失。",
          explanation:
            "检查职责、培训和明显脱落的拉杆支持应当且能够预见；遗漏检查导致未预见。",
        },
        {
          id: "d",
          text: "制动装置有故障，事故就只能归责于设备，甲没有过失。",
          explanation:
            "设备故障与使用者的检查过失可以同时存在；本案故障可被甲发现。",
        },
      ],
      answer: "c",
      hint: "从开始使用滑车前看起，不能只截取已经失控的一瞬间。",
      reference:
        "甲对撞伤结果属于疏忽大意的过失。他有检查职责和能力，拉杆明显脱落，本可通过规定的检查发现危险并停用，却因疏忽未检查、未预见。失控后无法拦住，不会使此前有关过失消失，不能据此适用刑法第十六条排除罪过。是否构成具体过失犯罪仍须另行审查。",
      sources: ["law"],
    },
  },
  {
    topicId: "accident",
    exam: false,
    exercise: {
      id: "accident-hidden-reason",
      kind: "subjective",
      optional: true,
      title: "内部异常：结论依赖哪些事实",
      facts: original("accident", "accident-hidden").facts,
      prompt:
        "为什么本案可以认定为意外事件？请结合案情说明，并判断‘只要完成检查，机械故障伤人就都不用承担刑事责任’是否正确。",
      hint: "区分完成了检查，与风险在当时确实无从预见、此前没有相关过错。",
      reference:
        "本案可以认定为意外事件：内部异常无法通过合理检查发现，甲当时无从预见，也无此前相关过错，异常出现后没有现实可行的制止办法，已排除甲对伤人结果的故意和过失。关键在这些具体条件，完成检查本身不是一概免责的理由；如果风险能够发现，或者甲此前存在有关过失，就须重新判断。",
      criteria: [
        {
          id: "unforeseeability",
          label: "当时无从预见",
          meaning:
            "罕见内部异常无法通过合理检查发现，甲在当时条件下无从预见偏转伤人。",
          acceptable: "说明本案异常超出了当时合理检查和预见的范围。",
          boundary: "仅说没有想到，或仅说机械坏了，未说明不能预见的依据。",
        },
        {
          id: "no-fault",
          label: "排除有关过错",
          meaning:
            "甲此前没有相关过错，异常出现后也没有现实可行的制止办法，据此对伤人无故意或过失。",
          acceptable:
            "结合事前检查和事发时条件，说明无相关罪过而适用意外事件。",
          boundary: "不能仅凭最后制止不了，就忽略此前可能存在的过失。",
        },
        {
          id: "limited-conclusion",
          label: "不能推广到所有故障",
          meaning:
            "完成检查不当然免责；能发现的风险、遗漏的检查或此前相关过失，都可能改变结论。",
          acceptable:
            "否定所有机械故障一概免责，并指出仍须看风险与过错的具体条件。",
          boundary: "不能将题设没有的检查过失当作本案已查明事实。",
        },
      ],
      sources: ["law"],
    },
  },
  {
    topicId: "accident",
    exam: true,
    exercise: {
      id: "accident-exam-rockfall",
      kind: "objective",
      optional: true,
      title: "山路落石：看见危险仍无法避免",
      facts:
        "甲驾驶检验正常的车辆，按规定速度和路线行驶。山体突发无事先可识别征兆的崩塌，落石击毁车辆转向装置。甲发现车辆即将撞上护栏，立即制动并尽力控制，仍导致乘客受伤。鉴定和现场记录确认，转向装置受损后，当时任何现实可行的操作均无法避免此次撞击；甲此前没有与本次事故有关的过错。",
      prompt: "关于甲对乘客受伤的刑事责任，下列说法正确的是：",
      options: [
        {
          id: "a",
          text: "甲撞击前已经看见危险，就不能适用刑法第十六条。",
          explanation:
            "刑法第十六条还规定不能抗拒的原因；发现危险不等于有能力避免，也不直接证明罪过。",
        },
        {
          id: "b",
          text: "只要司机驾驶的车辆撞伤乘客，司机就至少有过失。",
          explanation:
            "损害结果不能代替过失判断；题设已经排除此前相关过错和事发时现实的避免可能。",
        },
        {
          id: "c",
          text: "甲刹车未成功，所以属于轻信能够避免的过于自信过失。",
          explanation:
            "危险出现后尽力减损，不等于此前轻信能够避免；不能把应急措施失败直接视为过失。",
        },
        {
          id: "d",
          text: "甲无相关故意或过失，结果由不能抗拒的原因引起，不对本次伤害承担刑事责任。",
          explanation:
            "无事先可识别征兆、无此前相关过错，以及当时无法避免撞击，共同支持本题结论。",
        },
      ],
      answer: "d",
      hint: "第十六条除了不能预见，还规定了什么原因？此前有无相关过错？",
      reference:
        "依题设，甲不对本次伤害承担刑事责任。突发落石使车辆失控，甲虽在撞击前发现危险，却已无法通过任何现实可行的操作避免，且此前没有相关过错，属于刑法第十六条所规定的不能抗拒原因。预见危险本身不等于故意或过失；本结论也不直接决定民事赔偿或其他主体的责任。",
      sources: ["law"],
    },
  },
  {
    topicId: "accident",
    exam: true,
    exercise: {
      id: "accident-exam-condition",
      kind: "objective",
      optional: true,
      title: "罕见病情：有因果就一定有罪吗",
      facts:
        "甲在等候区轻拍熟人乙的肩膀，提醒其叫号。乙随即倒地死亡。医学鉴定确认，这次轻拍诱发了乙极为罕见的隐匿性病变，导致死亡。已查明，轻拍的力度和方式属于日常正常接触，乙此前无可识别的异常表现；甲没有相关病情信息，按当时条件既不能预见死亡，也无其他与死亡有关的过错。本题以轻拍与死亡存在因果关系为前提。",
      prompt: "仅就乙的死亡结果，下列说法正确的是：",
      options: [
        {
          id: "a",
          text: "既然轻拍与死亡有因果关系，甲就应承担过失致人死亡的刑事责任。",
          explanation:
            "因果关系不能代替主观罪过；还须审查对死亡的预见可能性，本题已经排除有关过错。",
        },
        {
          id: "b",
          text: "甲无相关故意或过失，死亡对甲属于意外事件，不承担该结果的刑事责任。",
          explanation:
            "正常接触、无可识别征兆、当时不能预见且无其他相关过错，支持仅就死亡排除罪过。",
        },
        {
          id: "c",
          text: "乙有特殊体质，因此任何人用任何方式造成其死亡，都属于意外事件。",
          explanation:
            "是否意外取决于具体行为危险、已知信息和预见条件；特殊体质不是普遍免责理由。",
        },
        {
          id: "d",
          text: "只要认定意外事件，就必须否定轻拍与死亡之间的因果关系。",
          explanation:
            "意外事件可以在行为造成损害的前提下排除故意、过失；本题也已明确因果关系成立。",
        },
      ],
      answer: "b",
      hint: "因果关系和主观罪过要分别判断，不能用其中一个替代另一个。",
      reference:
        "甲不对乙的死亡承担刑事责任。轻拍虽与死亡有因果关系，但题设明确属于正常接触，甲没有相关病情信息，当时不能预见死亡且无其他有关过错，对死亡没有故意或过失，适用意外事件。不能推广成‘不知病情就一律免责’；行为本身的危险性和具体预见条件仍须审查。",
      sources: ["law"],
    },
  },
];
