import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const personalTortRevision = "civil-tort-personal-2026-10-09.v1";
export const personalTortQuestion: UnitExercise = {
  id: "civil-tort-mall-slip",
  caseId: "civil-tort-mall-slip-case",
  kind: "subjective",
  title: "顾客也有疏忽，商场就不用赔吗",
  facts:
    "以下为自编虚构案例。远禾商场自行管理的营业通道出现一片明显积水，值班主管已发现，十多分钟内却既未安排清理，也未设置警示或隔离，仍让顾客通行。成年顾客陈某边走边低头看手机，未注意前方本可看见并避开的积水，踩上后滑倒受伤。录像与诊疗资料确认，未清理、未警示的积水和陈某未注意脚下的疏忽共同促成这次摔伤；本问以双方对损害发生均有过错为已给前提，没有他人推撞或其他第三人侵害。陈某为本次受伤支出医疗费2400元、医嘱所需护理费600元及就医交通费200元，票据、医嘱等已确认三项均为本次治疗和康复所必需、合理的费用。没有其他待处理的损失项目。双方过错的具体责任比例尚未确定。商场称：‘陈某自己也有过错，所以我们可以完全不赔。’",
  prompt:
    "商场的完全免责主张能否成立？请结合题设说明商场的安全保障责任、陈某过错对责任的影响，以及上述三项费用如何处理。不要求确定具体责任比例或最终应付金额。",
  hint: "责任是否存在、受害人过错的影响、合理损失范围分别判断。",
  reference:
    "商场不能仅以陈某也有过错而完全免责。商场明知营业通道积水，仍未清理、警示或隔离，与本次滑倒受伤相联系，未尽安全保障义务，应承担侵权责任。题设也确认陈某的疏忽对损害发生有作用，可以依法减轻商场责任，但不当然把双方共同促成的损害全部交给陈某，也不能凭双方都有过错就直接对半分。医疗2400元、护理600元、交通200元均已被题设确认为治疗康复所需的合理费用，应纳入本次人身损害范围，共3200元；纳入损失范围不等于商场必须全额承担。具体责任比例未定，本问据此说明减责与费用范围即可，不给出无依据的最终应付数额。",
  criteria: [
    {
      id: "mall-duty",
      label: "商场的安全保障责任",
      meaning:
        "联系商场明知通道积水却未清理、警示或隔离，且与顾客滑倒受伤有因果联系，说明未尽安全保障义务而应承担侵权责任。",
      acceptable:
        "可综合表达危险已知而未采取合理防护导致受伤；不逐动作复述，也不要求固定条号。",
      boundary:
        "此项核责任基础，另一项另核受害人过错带来的减责。已说清商场责任基础时，不因其随后把减责理解错误而抹去本项；仅以在商场受伤即一律有责不足。第三人补充责任、雇员内部追偿不是本题必答。",
    },
    {
      id: "mall-victim-fault",
      label: "受害人过错不当然完全免责",
      meaning:
        "商场仅凭陈某也有过错即完全免责的主张不能成立。联系陈某未注意脚下的疏忽也促成同一损害，说明可以减轻商场责任，不能当然全免或自动对半分。",
      acceptable:
        "接受双方行为都对摔伤有作用、顾客疏忽应在分担中考虑但并不抹去商场责任等等义说明；一段即可，不必使用过失相抵术语。",
      boundary:
        "不要求给出具体比例、最终金额或额外的司法认定程序。未主动说不应对半分不另作漏项，但明确断言必须对半分属于无依据结论。单纯复述或明确反对完全免责主张，不当作赞同。不能将普通疏忽改写成受害人故意自伤。",
    },
    {
      id: "mall-expenses",
      label: "合理人身损害费用与实际分担分开",
      meaning:
        "医疗2400元、护理600元、交通200元为本次治疗康复所需合理费用，均纳入损失范围共3200元；再结合责任分担处理，而非当然由商场全额支付。",
      acceptable:
        "明确三项均为合理治疗康复开支、合计3200元，或准确逐项列明费用即可；已在责任部分说清依法减责，不要求本项机械重复。",
      boundary:
        "题设已确认必要合理及本次受伤联系，不额外要求鉴定、全部票据复述或另外证明费用。精神损害、残疾赔偿、误工等不在本问范围。受害人也有过错不使合理损失本身消失；损失范围表达正确应保留。",
    },
  ],
  sources: ["mallSafety", "victimFault", "personalExpenses"],
};

const sourceUrl = "https://www.cac.gov.cn/2020-06/01/c_15925617772683196.htm";
const checkedNote =
  "中央网信办转载新华社公布的民法典第七编；2026-10-09北京时间直接核对所引条文。仅支持本题基础规则及明确给定事实，不是官方阅卷、具体比例或所有赔偿项目的完整标准。";
export const personalTortSources: ContentSources = {
  mallSafety: {
    title: "民法典第1198条第1款：安全保障义务",
    url: sourceUrl,
    note: checkedNote,
  },
  victimFault: {
    title: "民法典第1173条：被侵权人过错",
    url: sourceUrl,
    note: checkedNote,
  },
  personalExpenses: {
    title: "民法典第1179条：合理人身损害费用",
    url: sourceUrl,
    note: checkedNote,
  },
};
export const personalTortPublicRules = [
  {
    sourceId: "mallSafety",
    title: personalTortSources.mallSafety.title,
    url: sourceUrl,
    excerpt:
      "商场等经营场所、公共场所的经营者、管理者，未尽到安全保障义务，造成他人损害的，应当承担侵权责任。",
    checkedAt: "2026-10-09",
    scope:
      "第1198条第1款的本题相关摘要，非全文；本案无第三人侵害，不用第二款补充责任替代本款。",
  },
  {
    sourceId: "victimFault",
    title: personalTortSources.victimFault.title,
    url: sourceUrl,
    excerpt: "被侵权人对同一损害的发生或者扩大有过错的，可以减轻侵权人的责任。",
    checkedAt: "2026-10-09",
    scope:
      "第1173条；本题给定双方过错均促成同一损害，比例未定，不从该条生成固定比例。",
  },
  {
    sourceId: "personalExpenses",
    title: personalTortSources.personalExpenses.title,
    url: sourceUrl,
    excerpt:
      "侵害他人造成人身损害的，应当赔偿医疗费、护理费、交通费、营养费、住院伙食补助费等为治疗和康复支出的合理费用，以及因误工减少的收入。",
    checkedAt: "2026-10-09",
    scope:
      "第1179条首句；只处理本题已确定的医疗、护理与交通三项费用，不补入其他未问项目或具体赔偿计算标准。",
  },
];

export const personalTortTopic: FaultTopic = {
  id: "civil-tort-personal",
  title: "安全保障义务与受害人过错",
  headline: "顾客有疏忽，不等于经营者当然免责",
  goal: "把责任基础、过错分担和合理人身损害费用分开说明。",
  prerequisite: "本题双方过错及费用合理性已给定，不要求确定比例。",
  minutes: "5–10",
  paragraphs: [
    "经营者未尽安全保障义务并造成他人损害，应承担侵权责任；不能只因损害发生在其场所就省略义务及因果判断。",
    "受害人对同一损害有过错，可以减轻侵权人责任。需要分担不等于自动全免，也不意味着双方一定各半。",
    "医疗、护理、交通等合理治疗康复费用先确定损失范围，再结合责任处理。本题不展开具体比例和其他赔偿项目。",
  ],
  example: {
    title: personalTortQuestion.title,
    facts: personalTortQuestion.facts,
    analysis: personalTortQuestion.reference,
  },
  pitfall: "把减轻责任说成全部免责，或把损失范围当成最终应付金额。",
  recall: {
    prompt: "受害人也有过错时，为什么不能直接说经营者不用赔？",
    reference:
      "受害人过错可影响分担，但不当然消除经营者已经成立的责任；损失范围与具体负担再分别处理。",
  },
  sources: personalTortQuestion.sources,
  exercises: [personalTortQuestion],
};
export const personalTortChapter = {
  id: "CIV-TORT-PERSONAL",
  title: "侵权责任：人身损害与过错分担",
  section: "侵权责任",
  topicIds: [personalTortTopic.id],
};
export const personalTortContentPack = {
  revision: personalTortRevision,
  snapshot: { topics: [personalTortTopic], sources: personalTortSources },
};
export const personalTortDefaultQueues = {
  objective: [] as string[],
  subjective: [personalTortQuestion.id],
};
export const personalTortQuestionFor = (id: string) =>
  id === personalTortQuestion.id ? personalTortQuestion : undefined;
