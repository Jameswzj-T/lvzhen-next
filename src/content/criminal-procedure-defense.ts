import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const criminalProcedureDefenseRevision =
  "crimpro-defense-basic-2026-10-11.v1";

export const criminalProcedureDefenseSources: ContentSources = {
  "crimpro-defense-law34": {
    title: "《刑事诉讼法》2018修正第34条：委托辩护的时间与侦查阶段身份",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "2026-10-11直接读取深圳市南山区政府公安公开的2018修正全文第34条。网页2024-07-03为转载日期，不是修法日期。第一次讯问或者采取强制措施为起点；侦查期间只能委托律师作为辩护人。本单元不展开法律援助、值班律师或所有不适格情形。",
  },
  "crimpro-defense-law39": {
    title: "《刑事诉讼法》2018修正第39条：律师会见与不被监听",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "2026-10-11直接读取第39条各款；本组只考普通盗窃侦查案件中持三项材料的辩护律师会见，不将危害国家安全、恐怖活动案件的侦查许可例外扩为所有案件。48小时安排期限作为讲解，不在本组未问期限的小问中另扣。",
  },
};

export const criminalProcedureDefenseCaseFacts = {
  "CRIMPRO-FIRST-QUESTIONING-1":
    "本案为独立教学虚构。成年居民方屿因涉嫌盗窃，上午第一次接受公安机关讯问，下午结束讯问后回到家中，尚未被采取强制措施。案件仍在侦查，尚未移送检察院审查起诉。方屿想委托执业律师周宁作为辩护人。他的表兄没有律师资格，也愿意以辩护人身份帮助他。\n\n有人说：“人还没被拘留，案子也没到检察院，所以现在不能请辩护人；如果想找人帮忙，侦查时表兄和律师都可以作为受委托的辩护人。”本问只讨论现在能否委托，以及这两种人选在侦查阶段的区别，不讨论法律援助或其他阶段。",
  "CRIMPRO-LAWYER-MEETING-1":
    "本案为另一独立教学虚构。叶川因涉嫌盗窃一台相机被刑事拘留，案件在公安机关侦查中。叶川已经委托执业律师赵禾辩护。赵禾持本人律师执业证书、律师事务所证明和叶川的委托书到看守所要求会见。\n\n看守所答复：“盗窃案也一律要先拿侦查人员批准；即便获准见面，我们还要监听谈话，方便继续查案。”赵禾要求按普通盗窃案的规则安排会见。本问只核这两项要求，不讨论会见的具体排期、其他辩护人或特殊案件。",
};

export const criminalProcedureDefenseExercises: UnitExercise[] = [
  {
    hint: "结合本问给定事实和所问范围说明，不要求固定措辞或条号。",
    id: "crimpro-defense-retain-choice",
    caseId: "CRIMPRO-FIRST-QUESTIONING-1",
    relatedTopicIds: ["crimpro-defense-basic"],
    kind: "objective",
    title: "第一次讯问后能委托谁？",
    facts:
      "本案为独立教学虚构。成年居民方屿因涉嫌盗窃，上午第一次接受公安机关讯问，下午结束讯问后回到家中，尚未被采取强制措施。案件仍在侦查，尚未移送检察院审查起诉。方屿想委托执业律师周宁作为辩护人。他的表兄没有律师资格，也愿意以辩护人身份帮助他。\n\n有人说：“人还没被拘留，案子也没到检察院，所以现在不能请辩护人；如果想找人帮忙，侦查时表兄和律师都可以作为受委托的辩护人。”本问只讨论现在能否委托，以及这两种人选在侦查阶段的区别，不讨论法律援助或其他阶段。",
    prompt: "针对方屿现在的处境，哪项判断正确？",
    answer: "b",
    reference:
      "选B。第一次讯问已经发生，即使未采取强制措施、未移送审查起诉，也已可委托辩护人；侦查期间只能委托律师，表兄不能以无律师资格的亲友身份在此阶段接受辩护委托。",
    sources: ["crimpro-defense-law34", "crimpro-defense-law39"],
    choiceMode: "single",
    options: [
      {
        id: "a",
        text: "必须等被拘留后才能委托。",
        explanation:
          "第一次讯问与采取强制措施是可分别触发的起点，不须两者同时发生。",
      },
      {
        id: "b",
        text: "现在可以委托周律师；无律师资格的表兄不能在侦查期间受委托担任辩护人。",
        explanation: "对应委托起点和侦查阶段律师身份限制。",
      },
      {
        id: "c",
        text: "现在只能委托亲友，律师要等起诉。",
        explanation: "阶段限制恰好相反。",
      },
      {
        id: "d",
        text: "现在可任选周律师或表兄作为侦查阶段受委托辩护人。",
        explanation: "忽略侦查期间只能委托律师的限定。",
      },
    ],
  },
  {
    hint: "结合本问给定事实和所问范围说明，不要求固定措辞或条号。",
    id: "crimpro-defense-retain-explain",
    caseId: "CRIMPRO-FIRST-QUESTIONING-1",
    relatedTopicIds: ["crimpro-defense-basic"],
    kind: "subjective",
    title: "还没拘留，是否必须等起诉？",
    facts:
      "本案为独立教学虚构。成年居民方屿因涉嫌盗窃，上午第一次接受公安机关讯问，下午结束讯问后回到家中，尚未被采取强制措施。案件仍在侦查，尚未移送检察院审查起诉。方屿想委托执业律师周宁作为辩护人。他的表兄没有律师资格，也愿意以辩护人身份帮助他。\n\n有人说：“人还没被拘留，案子也没到检察院，所以现在不能请辩护人；如果想找人帮忙，侦查时表兄和律师都可以作为受委托的辩护人。”本问只讨论现在能否委托，以及这两种人选在侦查阶段的区别，不讨论法律援助或其他阶段。",
    prompt:
      "方屿现在能否委托周律师，为什么？没有律师资格的表兄能否在本案侦查期间接受委托担任辩护人？请分别说明。",
    answer: "",
    reference:
      "现在可以委托周律师。第一次讯问已发生即到达法定起点，不须再等强制措施或审查起诉。侦查期间只能委托律师作为辩护人，表兄没有律师资格，不能仅凭亲友身份在此阶段接受该辩护委托。",
    sources: ["crimpro-defense-law34", "crimpro-defense-law39"],
    criteria: [
      {
        id: "defense-retain-start",
        label: "联系第一次讯问说明现在可以委托",
        meaning:
          "联系第一次讯问已经发生，说明现在已可委托周律师，不以另行拘留或移送审查起诉为前提。",
        acceptable:
          "“已经第一次问过他了，现在就能找周律师，不用等拘留或者起诉”即可；不要求复述采取强制措施的另一触发点或条号。",
        boundary:
          "只说任何时候随便委托不完整；不额外考告知、代为委托或法律援助。",
      },
      {
        id: "defense-investigation-lawyer",
        label: "区分侦查阶段律师与无资格亲友",
        meaning:
          "说明侦查期间受委托的辩护人只能是律师，所以本案表兄没有律师资格，不能以亲友身份担任。",
        acceptable:
          "“表兄不是律师，这个侦查阶段还不能当受托辩护人”可表达；不要求固定称谓。",
        boundary:
          "不能把其他阶段亲友可委托范围直接搬到侦查；不要求判断表兄在后续阶段是否一定合格。",
      },
    ],
  },
  {
    hint: "结合本问给定事实和所问范围说明，不要求固定措辞或条号。",
    id: "crimpro-defense-meeting-choice",
    caseId: "CRIMPRO-LAWYER-MEETING-1",
    relatedTopicIds: ["crimpro-defense-basic"],
    kind: "objective",
    title: "普通盗窃案也一律许可、监听吗？",
    facts:
      "本案为另一独立教学虚构。叶川因涉嫌盗窃一台相机被刑事拘留，案件在公安机关侦查中。叶川已经委托执业律师赵禾辩护。赵禾持本人律师执业证书、律师事务所证明和叶川的委托书到看守所要求会见。\n\n看守所答复：“盗窃案也一律要先拿侦查人员批准；即便获准见面，我们还要监听谈话，方便继续查案。”赵禾要求按普通盗窃案的规则安排会见。本问只核这两项要求，不讨论会见的具体排期、其他辩护人或特殊案件。",
    prompt: "就看守所提出的两项要求，哪项正确？",
    answer: "c",
    reference:
      "选C。本案为普通盗窃案，辩护律师已持三项法定材料，不能一律增加侦查许可前提；律师会见不被监听，不能以继续查案为由监听谈话。",
    sources: ["crimpro-defense-law34", "crimpro-defense-law39"],
    choiceMode: "single",
    options: [
      {
        id: "a",
        text: "两项都可以，只要案件仍在侦查。",
        explanation: "侦查中不等于所有律师会见都须许可，亦不消灭不被监听权。",
      },
      {
        id: "b",
        text: "不应要求侦查许可，但可为查案监听谈话。",
        explanation: "普通案无该许可前提不等于允许监听。",
      },
      {
        id: "c",
        text: "不能一律要求侦查许可，也不能以查案为由监听律师会见。",
        explanation: "分别对应普通案件会见与不被监听。",
      },
      {
        id: "d",
        text: "三项材料都不用提供，所有案件都能直接会见。",
        explanation: "忽略材料要求及特定案件侦查阶段许可例外。",
      },
    ],
  },
  {
    hint: "结合本问给定事实和所问范围说明，不要求固定措辞或条号。",
    id: "crimpro-defense-meeting-explain",
    caseId: "CRIMPRO-LAWYER-MEETING-1",
    relatedTopicIds: ["crimpro-defense-basic"],
    kind: "subjective",
    title: "分别判断许可与监听要求",
    facts:
      "本案为另一独立教学虚构。叶川因涉嫌盗窃一台相机被刑事拘留，案件在公安机关侦查中。叶川已经委托执业律师赵禾辩护。赵禾持本人律师执业证书、律师事务所证明和叶川的委托书到看守所要求会见。\n\n看守所答复：“盗窃案也一律要先拿侦查人员批准；即便获准见面，我们还要监听谈话，方便继续查案。”赵禾要求按普通盗窃案的规则安排会见。本问只核这两项要求，不讨论会见的具体排期、其他辩护人或特殊案件。",
    prompt:
      "本案必须先取得侦查人员许可才能安排会见吗？能否以方便查案为由监听赵律师与叶川的会见？请联系题设分别说明。",
    answer: "",
    reference:
      "本案普通盗窃案不属于第39条规定的危害国家安全、恐怖活动案件侦查会见许可例外，赵律师已经持所需三项材料，不能再一律要求侦查人员批准。辩护律师会见犯罪嫌疑人时不被监听，方便查案不能作为监听谈话的理由。",
    sources: ["crimpro-defense-law34", "crimpro-defense-law39"],
    criteria: [
      {
        id: "defense-meeting-permission",
        label: "联系普通案件及材料排除一律许可",
        meaning:
          "联系普通盗窃案和律师已持所需材料，说明不能一律要求先取得侦查人员批准才能安排会见。",
        acceptable:
          "“只是普通盗窃，律师材料带齐了，不用另拿办案人员许可”即可；不要求逐项重复三个证件名称或列完例外。",
        boundary:
          "不接受所有案件一概无需许可的扩大说法；不额外扣未写安排时限。",
      },
      {
        id: "defense-meeting-confidentiality",
        label: "说明律师会见不被监听",
        meaning:
          "说明律师与在押嫌疑人的会见不被监听，不能以继续查案或仍在侦查为由监听本次谈话。",
        acceptable: "“查案也不能偷听律师和叶川谈话”可以；不要求固定法律术语。",
        boundary:
          "不能把许可和监听混同；不额外讨论不同辩护人、通信审查或所有监视居住场景。",
      },
    ],
  },
];

export const criminalProcedureDefenseTopics: FaultTopic[] = [
  {
    id: "crimpro-defense-basic",
    title: "侦查阶段委托辩护与律师会见",
    headline:
      "第一次讯问即可委托律师；普通案件会见不以侦查许可和监听为常规条件。",
    goal: "区分委托起点、侦查阶段人选与普通案件律师会见的两项保障。",
    prerequisite: "知道侦查与审查起诉属于不同诉讼阶段。",
    minutes: "8–12",
    paragraphs: [
      "犯罪嫌疑人自被侦查机关第一次讯问或者采取强制措施之日起，有权委托辩护人。这是两个可分别触发的起点，不须等到拘留和起诉都发生。侦查期间，只能委托律师作为辩护人，不能把其他阶段的亲友委托范围照搬过来。",
      "辩护律师持执业证书、律师事务所证明和委托书或者法律援助公函要求会见在押嫌疑人、被告人，看守所应及时安排，至迟不得超过四十八小时。危害国家安全、恐怖活动案件在侦查期间会见须经侦查机关许可；这是特定例外，不是普通盗窃等全部案件的常规前置条件。",
      "辩护律师会见犯罪嫌疑人、被告人时不被监听，不能因侦查尚未结束就以查案为由监听。委托、会见与查阅案卷是不同问题：本单元不展开阅卷起点、法律援助、非律师辩护人或全部特殊案件程序。",
    ],
    example: {
      title: "第一次讯问后能委托谁？",
      facts:
        "本案为独立教学虚构。成年居民方屿因涉嫌盗窃，上午第一次接受公安机关讯问，下午结束讯问后回到家中，尚未被采取强制措施。案件仍在侦查，尚未移送检察院审查起诉。方屿想委托执业律师周宁作为辩护人。他的表兄没有律师资格，也愿意以辩护人身份帮助他。\n\n有人说：“人还没被拘留，案子也没到检察院，所以现在不能请辩护人；如果想找人帮忙，侦查时表兄和律师都可以作为受委托的辩护人。”本问只讨论现在能否委托，以及这两种人选在侦查阶段的区别，不讨论法律援助或其他阶段。",
      analysis:
        "选B。第一次讯问已经发生，即使未采取强制措施、未移送审查起诉，也已可委托辩护人；侦查期间只能委托律师，表兄不能以无律师资格的亲友身份在此阶段接受辩护委托。",
    },
    pitfall:
      "把第一次讯问与强制措施看成必须同时发生，或把特殊会见许可扩大到所有侦查案件。",
    recall: {
      prompt:
        "未被拘留但已第一次讯问，可以委托谁？普通案律师会见可为查案监听吗？",
      reference:
        "已可委托律师；侦查期间无律师资格的亲友不能受托担任辩护人。普通案不一律要求侦查许可，律师会见不被监听。",
    },
    sources: ["crimpro-defense-law34", "crimpro-defense-law39"],
    exercises: criminalProcedureDefenseExercises,
  },
];
export const criminalProcedureDefenseChapter = {
  id: "CRIMPRO-DEFENSE",
  title: "刑事辩护基本权利",
  section: "刑事诉讼法",
  topicIds: ["crimpro-defense-basic"],
};
export const criminalProcedureDefenseContentPack = {
  revision: criminalProcedureDefenseRevision,
  snapshot: {
    topics: criminalProcedureDefenseTopics,
    sources: criminalProcedureDefenseSources,
  },
};
export const criminalProcedureDefenseDefaultQueues = {
  objective: criminalProcedureDefenseExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: criminalProcedureDefenseExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function criminalProcedureDefenseQuestion(id: string) {
  const q = criminalProcedureDefenseExercises.find((q) => q.id === id);
  return q ? structuredClone(q) : undefined;
}
export function criminalProcedureDefenseTopicForQuestion(id: string) {
  const t = criminalProcedureDefenseTopics.find((t) =>
    t.exercises.some((q) => q.id === id),
  );
  return t ? structuredClone(t) : undefined;
}
export function criminalProcedureDefenseSameCaseQuestions(id: string) {
  const q = criminalProcedureDefenseQuestion(id);
  return q
    ? structuredClone(
        criminalProcedureDefenseExercises.filter((x) => x.caseId === q.caseId),
      )
    : [];
}
export const criminalProcedureDefensePublicRules = [
  {
    sourceId: "crimpro-defense-law34",
    title: "第34条：委托起点与人选（教学摘要）",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    excerpt:
      "犯罪嫌疑人自第一次讯问或者采取强制措施之日起有权委托辩护人；侦查期间只能委托律师作为辩护人。两个触发条件不要求同时发生。",
    checkedAt: "2026-10-11",
    scope: "侦查阶段基本委托规则，不包含本题人物、参考答案或后续阶段全规则。",
  },
  {
    sourceId: "crimpro-defense-law39",
    title: "第39条：会见材料、例外与不被监听（教学摘要）",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    excerpt:
      "律师持执业证、律所证明及委托书或者法援公函要求会见，应及时安排且至迟不超过48小时。危害国家安全、恐怖活动案件侦查期间会见须许可。辩护律师会见不被监听。",
    checkedAt: "2026-10-11",
    scope: "在押人员辩护律师会见基本规则，不包含题目判断与其他辩护人全程序。",
  },
];
