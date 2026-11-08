import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const criminalProcedureBurdenRevision =
  "criminal-procedure-burden-2026-10-11.v1";
const topicId = "crimpro-burden-and-acquittal";
const burdenCaseId = "CRIMPRO-PROSECUTION-BURDEN-1";
const verdictCaseId = "CRIMPRO-INSUFFICIENT-ACQUITTAL-1";
const lawUrl =
  "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html";

export const criminalProcedureBurdenSources: ContentSources = {
  "crimpro-burden-article51": {
    title: "《刑事诉讼法》第51条：公诉案件的有罪举证责任",
    url: lawUrl,
    note: "2026-10-11直接读取南山区政府网站、来源深圳市公安局的2018修正全文；网页2024-07-03发布不是修法日。第51条公诉部分由人民检察院承担被告人有罪的举证责任。新华社2018-10-27受权文本交叉核对；本组不展开自诉或特殊法定推定。案例、参考和得失点为自编教学材料，不是官方试题或阅卷细则。",
  },
  "crimpro-burden-article55": {
    title: "《刑事诉讼法》第55条：全案排除合理怀疑",
    url: lawUrl,
    note: "2026-10-11直接核第55条，作为现有供述与证明单元的衔接。本组不重考全部三项条件的背诵；不能以被告未提供不在场材料替代公诉方有罪证明，也不能以被告否认直接推定无罪。",
  },
  "crimpro-burden-article200": {
    title: "《刑事诉讼法》第200条第（三）项：证据不足的无罪判决",
    url: lawUrl,
    note: "2026-10-11直接核第200条首段及三项判决。仅用于已完成庭审、最后陈述并进入评议，证据不足不能认定被告人有罪的给定情形；应作证据不足、指控犯罪不能成立的无罪判决。不将侦查初期疑点直接等同判决条件，不扩补侦、再审、赔偿或终局事实真相。",
  },
  "crimpro-burden-effective-directory": {
    title: "现行有效法律目录：刑事诉讼法2018修正版本",
    url: "https://www.samr.gov.cn/fgs/sjdt/art/2026/art_93a4fbac2ce14ab6baab60b0cd452ef4.html",
    note: "市场监管总局转载中国人大网目录，2026-09-18发布、数据截至2026-08-28；本轮独立核对既有公开目录文本的刑事诉讼法条目，列2018修正。保留目录截止边界，不宣称今日实时状态或此后全部废改已穷尽核验。",
  },
};

export const criminalProcedureBurdenCaseFacts = {
  [burdenCaseId]: [
    "本案为教学虚构。人民检察院以盗窃罪向法院起诉成年被告人沈禾，指控她晚八时从共享办公室取走一台音箱。失主陈述、物品登记和价值材料可以证明音箱丢失及其归属、价值；走廊录像只显示一名穿深色外套的人经过，没有拍清面部或拿取动作。当天有多人出入，尚没有材料把画面中的人可靠地确定为沈禾。",
    "沈禾否认拿取音箱，说当时独自在家，但没有监控、同行人或其他不在场材料。庭审中有人主张：‘她拿不出证明自己没去现场的证据，就该认定是她拿的，检方已经尽到证明责任。’本题明确是公诉案件，只问这个证明责任和推论，不要求在庭审尚未结束时预定最终判决，也不设置特殊法定推定。",
  ].join("\n\n"),
  [verdictCaseId]: [
    "本案为另一独立教学虚构。人民检察院指控成年被告人唐闻在球馆外殴打顾栩致伤。原始录像拍到人群发生推搡，但关键动作被遮挡；两名到庭证人能确认顾栩在混乱中受伤，却都没有看清是谁实施了致伤动作。唐闻当时在附近，衣服颜色与画面中一人相近，现场也有其他穿相近颜色衣服的人。",
    "本题给定：法庭已经依法调查、核实并综合审查全部定案材料，仍不能排除他人实施致伤行为的合理可能，现有证据不足以认定唐闻有罪；也没有查明唐闻案发时身在别处等能确定其未实施该行为的事实。法庭调查、辩论及被告人最后陈述均已完成，合议庭正在评议。只判断当前给定条件下应作何种判决，不讨论延期审理、补充侦查、再审或赔偿。",
  ].join("\n\n"),
};
const burdenSources = ["crimpro-burden-article51", "crimpro-burden-article55"];
const verdictSources = [
  "crimpro-burden-article200",
  "crimpro-burden-article55",
];
export const criminalProcedureBurdenExercises: UnitExercise[] = [
  {
    id: "crimpro-alibi-burden-choice",
    caseId: burdenCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "拿不出不在场证明，就能认定有罪吗？",
    facts: criminalProcedureBurdenCaseFacts[burdenCaseId],
    prompt: "对本案庭审中的主张，下列判断哪项正确？",
    options: [
      {
        id: "a",
        text: "沈禾不能证明自己在家，就由她承担未能证明无罪的后果。",
        explanation: "本案公诉方有罪举证责任不因被告拿不出不在场材料而转移。",
      },
      {
        id: "b",
        text: "人民检察院仍须证明沈禾有罪，缺少不在场材料不能补足拿取者身份的证明。",
        explanation:
          "失物及价值证明与行为人身份证明不同；不能把被告未能自证清白当成公诉证明已经完成。",
      },
      {
        id: "c",
        text: "只要沈禾否认，法院现在就必须认定她没有拿取音箱。",
        explanation:
          "否认不是事实清白的自动证明。本问仅判断责任和推论，未要求预定尚未结束庭审的判决。",
      },
      {
        id: "d",
        text: "公诉方证明音箱确实丢失及价值后，就完成了对沈禾有罪的全部证明。",
        explanation:
          "这些材料不当然证明拿取者是沈禾，不能省去指控行为与被告之间的联系。",
      },
    ],
    answer: "b",
    hint: "",
    reference:
      "选B。公诉案件中，被告人有罪的举证责任由人民检察院承担。沈禾未能提供不在场材料，不等于已有证据证明她实施拿取；音箱丢失与价值的证据也没有补上行为人身份这一缺口。不能把举证责任转成由她证明自己无罪，也不能仅凭她否认就预定无罪事实。",
    sources: burdenSources,
  },
  {
    id: "crimpro-alibi-burden-explain",
    caseId: burdenCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "证明责任能转给沈禾吗？",
    facts: criminalProcedureBurdenCaseFacts[burdenCaseId],
    prompt:
      "‘沈禾拿不出不在场证明，所以可认定她拿走音箱，检方已完成证明责任。’这段推论能否成立？请说明由谁承担有罪举证责任，并结合本案的证明缺口解释。无需作出最终判决。",
    hint: "",
    reference:
      "不能成立。本案是公诉案件，沈禾有罪的举证责任由人民检察院承担，不能转成由沈禾自证无罪。音箱丢失、归属和价值有材料，并不等于拿取者是沈禾已经被证明；录像没有可靠识别人，沈禾又没有不在场材料，也补不上这个缺口。",
    criteria: [
      {
        id: "prosecution-carries-burden",
        label: "由公诉方证明有罪",
        meaning:
          "说明本案有罪举证责任由人民检察院承担，不能要求沈禾先证明无罪才免于有罪推断。",
        acceptable:
          "‘这是检方起诉的案子，要由检方拿证据证明她干了，不能反过来让她先证明清白’足以表达，不要求背条号。",
        boundary:
          "只限本案公诉证明责任，不另考自诉、特殊推定、侦查取证职责或一般沉默权。不能扩大成被告否认即可当然无罪。",
      },
      {
        id: "alibi-absence-does-not-fill-gap",
        label: "没有不在场材料，不等于已经证明拿取",
        meaning:
          "否定原推论，联系本案失物证据不能识别拿取者、录像未可靠确定沈禾，说明缺少不在场材料不能填补这项有罪证明缺口。",
        acceptable:
          "‘东西确实丢了不等于就是她拿的，录像没认出人；她没有人能证明在家，也不能因此补成有罪证据’可以，不要求逐列每一种材料。",
        boundary:
          "可与前项一段合写，结论可隐含于理由；不要求另列第55条全部三条件、无罪判决或补查方案，不从同案选择题补足本问理由。",
      },
    ],
    sources: burdenSources,
  },
  {
    id: "crimpro-insufficient-acquittal-choice",
    caseId: verdictCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "不能证明有罪，也没查明清白，怎样判？",
    facts: criminalProcedureBurdenCaseFacts[verdictCaseId],
    prompt: "按题设已完成庭审并进入评议的条件，法院应怎样处理？",
    options: [
      {
        id: "a",
        text: "仍然可判有罪，只要因为证据不足而适当从轻。",
        explanation: "证据不足不能认定有罪时，不得以从轻处罚代替无罪判决。",
      },
      {
        id: "b",
        text: "只有唐闻先证明自己确实不在现场，法院才能判无罪。",
        explanation:
          "第200条第（三）项不把先证明事实清白作为证据不足无罪判决的前提。",
      },
      {
        id: "c",
        text: "应作证据不足、指控犯罪不能成立的无罪判决，不必先查明唐闻确实未实施行为。",
        explanation:
          "题设固定评议阶段和有罪证明不足，适用证据不足的无罪判决；不能因此冒称真实行为人已经查明。",
      },
      {
        id: "d",
        text: "暂不作任何判决，必须一直等到找到能确定真相的新证据。",
        explanation:
          "本题已给定第200条第（三）项条件，应依法作出判决，不以无限等待替代法定处理。",
      },
    ],
    answer: "c",
    hint: "",
    reference:
      "选C。已经完成庭审并进入评议，现有证据不足、不能认定唐闻有罪，应作证据不足、指控犯罪不能成立的无罪判决。这不要求唐闻先证明自己不在现场，也不等于法庭已经查清谁实施致伤行为。",
    sources: verdictSources,
  },
  {
    id: "crimpro-insufficient-acquittal-explain",
    caseId: verdictCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "无罪判决一定要先证明事实清白吗？",
    facts: criminalProcedureBurdenCaseFacts[verdictCaseId],
    prompt:
      "有人说：‘虽然目前不能认定唐闻有罪，但也没查明他确实没打人，所以现在不能作无罪判决。’这一说法能否成立？请结合题设说明应作何种判决及理由。",
    hint: "",
    reference:
      "不能成立。庭审已完成，仍不能排除他人实施致伤行为的合理可能，现有证据不足以认定唐闻有罪，应作证据不足、指控犯罪不能成立的无罪判决。这个判决不要求先查明他确实没有实施行为；不能把尚未证明事实清白，当成拒绝该无罪判决或勉强判有罪的理由。",
    criteria: [
      {
        id: "insufficient-evidence-acquittal",
        label: "联系证明不足，明确无罪判决",
        meaning:
          "联系庭审完成后仍存在他人致伤的合理可能、有罪证明不足，明确应作证据不足、指控犯罪不能成立的无罪判决。",
        acceptable:
          "‘庭审结束后还是不能排除别人动手，证据没证明是他，所以应判无罪，理由是指控没证实’可以，结论可与理由合写。",
        boundary:
          "不要求逐字背诵判决名称或条号，但只说暂时不能定罪而不说明应判无罪不足。无须另列第55条全部条件、所有证据、补侦/再审程序或赔偿。",
      },
      {
        id: "no-prior-proof-of-innocence",
        label: "不另加先证实清白的门槛",
        meaning:
          "否定未查明事实清白就不能作无罪判决的理由，说明本项无罪判决不要求先证明唐闻确实未实施致伤行为。",
        acceptable:
          "‘不是非得先查清他没打人才能判无罪，检方没把有罪证明到要求，就不能让这份怀疑挡住无罪判决’可以，不必使用证明责任术语。",
        boundary:
          "不能把本题无罪判决说成已经查明实际行为人或唐闻一定不在场，也不要求主动附加此类提醒作为第三个得失点。不考终局真相、他人罪责或未来新证据。",
      },
    ],
    sources: verdictSources,
  },
];

export const criminalProcedureBurdenTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "公诉证明责任与证据不足的无罪判决",
    headline: "不能让被告自证无罪，也不能把有罪证明不足改成从轻判有罪。",
    goal: "分清公诉方的有罪证明责任，以及庭审后证据不足时应作的判决。",
    prerequisite: "知道定罪要求全案证据确实、充分，而不是只看是否供认。",
    minutes: "8–12",
    paragraphs: [
      "公诉案件中，被告人有罪的举证责任由人民检察院承担。被告没有不在场证明、不能解释某个细节，都不能代替公诉方完成有罪证明；但被告否认本身也不自动证明事实清白。要看指控的必要事实是否由证据充分证明。",
      "庭审完成、合议庭评议时，如果证据不足、不能认定被告人有罪，法律要求作证据不足、指控犯罪不能成立的无罪判决。不能因仍有怀疑就勉强判有罪后从轻，也不能以还没查清绝对清白为由拒绝这种判决。",
      "证据不足的无罪判决解决的是当前指控未达到有罪证明要求，不等于已经查明实际行为人或还原全部历史真相。这里不把侦查初期的任何疑点都当成立即判决的条件；自诉、特殊法定推定、补侦、再审和赔偿留待其他单元。",
    ],
    example: {
      title: "失物证明与行为人证明不能混同",
      facts: criminalProcedureBurdenCaseFacts[burdenCaseId],
      analysis:
        "失物的存在和价值有材料，并未把拿取者可靠地确定为沈禾。检方的有罪举证责任不能因她拿不出不在场材料而转移，未能自证清白不是缺失的身份联系证据。",
    },
    pitfall:
      "把没有无罪证据当成有罪证据，或把证据不足的无罪判决误认为必须先查明事实清白。",
    recall: {
      prompt:
        "公诉案件由谁证明被告有罪？庭审后证据仍不足，是先等被告证明清白，还是依法判决？",
      reference:
        "由检察院承担有罪举证责任。庭审后证据不足、不能认定有罪，应作证据不足的无罪判决，不以被告先证明事实清白为前提。",
    },
    sources: Object.keys(criminalProcedureBurdenSources),
    exercises: criminalProcedureBurdenExercises,
  },
];
export const criminalProcedureBurdenChapter = {
  id: "CRIMPRO-EVIDENCE-FOUNDATION",
  title: "证据与证明基础",
  section: "刑事诉讼法",
  topicIds: [topicId],
};
export const criminalProcedureBurdenContentPack = {
  revision: criminalProcedureBurdenRevision,
  snapshot: {
    topics: criminalProcedureBurdenTopics,
    sources: criminalProcedureBurdenSources,
  },
};
export const criminalProcedureBurdenDefaultQueues = {
  objective: criminalProcedureBurdenExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: criminalProcedureBurdenExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function criminalProcedureBurdenQuestion(id: string) {
  const q = criminalProcedureBurdenExercises.find((q) => q.id === id);
  return q ? structuredClone(q) : undefined;
}
export function criminalProcedureBurdenTopicForQuestion(id: string) {
  return criminalProcedureBurdenQuestion(id)
    ? structuredClone(criminalProcedureBurdenTopics[0])
    : undefined;
}
export function criminalProcedureBurdenSameCaseQuestions(id: string) {
  const q = criminalProcedureBurdenQuestion(id);
  return q
    ? structuredClone(
        criminalProcedureBurdenExercises.filter((x) => x.caseId === q.caseId),
      )
    : [];
}
export const criminalProcedureBurdenPublicRules = [
  {
    sourceId: "crimpro-burden-article51",
    title: "第51条公诉部分（教学摘要）",
    url: lawUrl,
    excerpt:
      "公诉案件中，由人民检察院承担被告人有罪的举证责任。不能以被告未能证明自己无罪替代公诉方的有罪证明。",
    checkedAt: "2026-10-11",
    scope: "仅公诉案件基础责任，不展开自诉或特殊法定推定。",
  },
  {
    sourceId: "crimpro-burden-article55",
    title: "第55条全案证明条件（教学摘要）",
    url: lawUrl,
    excerpt:
      "证据确实充分要求定罪量刑事实有证据、定案证据依法查实，综合全案对认定事实已排除合理怀疑；不能用被告未提供不在场材料替代必要事实的证明。",
    checkedAt: "2026-10-11",
    scope:
      "只衔接本组的证明责任与证据不足判决，不作为具体案件已证明充分的结论。",
  },
  {
    sourceId: "crimpro-burden-article200",
    title: "第200条第（三）项（教学摘要）",
    url: lawUrl,
    excerpt:
      "依法完成庭审并进入评议时，证据不足、不能认定被告人有罪，应作证据不足、指控犯罪不能成立的无罪判决；不以先查明被告事实清白为前提。",
    checkedAt: "2026-10-11",
    scope: "仅给定判决阶段和证明不足前提，不讨论延期、补侦、再审或赔偿。",
  },
];
