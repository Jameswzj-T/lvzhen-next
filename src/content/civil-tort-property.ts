import type { UnitExercise, ContentSources, FaultTopic } from "./fault-unit";
export const tortRevision = "civil-tort-property-2026-10-08.v1";
export const tortQuestion: UnitExercise = {
  id: "civil-tort-neighbor-window",
  caseId: "civil-tort-neighbor-window-case",
  kind: "subjective",
  title: "打球砸坏了邻居的玻璃",
  facts:
    "成年梁某在邻居许某家一楼窗边的空地独自练习投球。窗户离他只有两米，旁边有更开阔、远离窗户的地方；他看见窗户仍在这里用力投球，球砸碎了许某家的玻璃。录像确认了这一经过，没有他人介入。许某按原规格更换玻璃，玻璃和安装共花1800元；票据和当地报价表明这是恢复原状的必要、合理费用，没有升级装修。许某没有参与打球，也没有对损害发生或扩大作出有过错的行为。本题不涉及产品缺陷、未成年人、工作任务或其他特殊责任。",
  prompt: "梁某是否应赔偿这1800元？请结合题设说明承担责任的理由和费用范围。",
  hint: "分别想清楚为什么要赔、为什么这1800元属于可以赔的损失。",
  reference:
    "梁某应赔偿1800元。普通侵权须判断过错，而非财物一损坏就无条件赔偿。梁某已经看见近处的窗户，仍选择在窗边用力投球，未尽合理注意，具有过错；该球直接造成玻璃损坏。按原规格恢复原状的必要合理费用1800元，可以作为本案财产损失的合理计算方式。不能只以发生损害替代过错判断，也不凭空要求升级装修或其他未给定损失。",
  criteria: [
    {
      id: "window-fault",
      label: "赔偿结论与过错理由",
      meaning:
        "梁某应赔；普通侵权应判断过错，结合其看见近处窗户仍用力投球、可选择开阔位置的事实说明未尽合理注意，并联系其行为造成玻璃损坏。",
      acceptable:
        "接受疏忽、小心程度不足、没有尽到应有注意等相同意思；一段综合表达即可，不要求逐一列出全部事实、固定条号或用法言法语。",
      boundary:
        "正确赔偿结论应单独保留；只说弄坏东西就一定赔或无需判断过错，属于理由错误，不把已正确表达的损失范围抹掉。没有故意不等于没有过错。无需主动列举其他特殊责任或不存在的减责争点。",
    },
    {
      id: "window-loss",
      label: "1800元的损失范围",
      meaning:
        "球造成的玻璃损坏与必要、合理的同规格恢复费用1800元相对应，应赔偿该数额。",
      acceptable:
        "接受结合原规格更换、修复实际损失、必要合理费用或票据与报价所支持的1800元，不强求重复所有证据或复述法条。",
      boundary:
        "题设已给必要、合理且无升级费用的事实；不把另作鉴定、全部免责类型、折旧公式或精神损害作为必答。即使过错理由有错，本项符合要求仍保留。",
    },
  ],
  sources: ["civilFaultProperty"],
};
export const tortSources: ContentSources = {
  civilFaultProperty: {
    title: "民法典第1165条第1款、第1184条",
    url: "https://www.cac.gov.cn/2020-06/01/c_15925617772683196.htm",
    note: "中央网信办转载新华社公布的民法典第七编；2026-10-08直接核对两条原文。仅支持普通过错侵权与财产损失合理计算，不是官方阅卷规则。",
  },
};
/** One versioned teaching topic; registration is independent of paid dispatch. */
export const tortTopic: FaultTopic = {
  id: "civil-tort-property",
  title: "普通过错侵权与财产损失",
  headline: "为什么要赔，与赔多少分开说明",
  goal: "联系题内事实说明过错、因果和合理财产损失。",
  prerequisite: "本题不涉及特殊责任。",
  minutes: "5–10",
  paragraphs: [
    "普通侵权须判断过错，发生损害本身不能替代这一判断。",
    "财产损失按照损失发生时的市场价格或者其他合理方式计算；本题已给定同规格恢复的必要合理费用。",
  ],
  example: {
    title: tortQuestion.title,
    facts: tortQuestion.facts,
    analysis: tortQuestion.reference,
  },
  pitfall: "结论正确，不代表过错理由也正确。",
  recall: {
    prompt: "为什么不能只凭东西被弄坏就说无条件赔偿？",
    reference: "普通过错侵权仍须结合行为说明过错和因果；财产损失范围另行判断。",
  },
  sources: tortQuestion.sources,
  exercises: [tortQuestion],
};
export const tortPublicRules = [
  {
    sourceId: "civilFaultProperty",
    title: "民法典第1165条第1款、第1184条",
    url: "https://www.cac.gov.cn/2020-06/01/c_15925617772683196.htm",
    excerpt:
      "民法典第1165条第1款：行为人因过错侵害他人民事权益造成损害的，应当承担侵权责任。第1184条：侵害他人财产的，财产损失按照损失发生时的市场价格或者其他合理方式计算。",
    checkedAt: "2026-10-08",
    scope:
      "仅普通过错侵权与本案已明示必要合理的同规格恢复费用。修复费适用是教学案情分析，不冒充条文逐字规定或完整司法赔偿标准。",
  },
];

export const tortChapter = {
  id: "CIV-TORT-PROPERTY",
  title: "侵权责任：过错与财产损失",
  section: "侵权责任",
  topicIds: [tortTopic.id],
};
export const tortContentPack = {
  revision: tortRevision,
  snapshot: { topics: [tortTopic], sources: tortSources },
};
export const tortDefaultQueues = {
  objective: [] as string[],
  subjective: [tortQuestion.id],
};
export const tortQuestionFor = (id: string) =>
  id === tortQuestion.id ? tortQuestion : undefined;
