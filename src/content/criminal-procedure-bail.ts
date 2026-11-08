import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const criminalProcedureBailRevision = "crimpro-bail-basic-2026-10-12.v1";

export const criminalProcedureBailSources: ContentSources = {
  "crimpro-bail-law68": {
    title: "《刑事诉讼法》2018修正第68条：取保候审的保证方式",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "北京时间2026-10-12直接核对官方公开正文。决定取保后，提出保证人或者交纳保证金。本单元给定已决定取保，不要求另行判断取保资格、保证人资格、数额或变更程序。",
  },
  "crimpro-bail-law71": {
    title: "《刑事诉讼法》2018修正第71条第1款：取保期间的基本义务",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "北京时间2026-10-12直接核对第1款第（一）、（三）项。离开所居住市县须经执行机关批准，传讯时及时到案；本题明确没有批准、也无不能按时到案的事由。不另设全部义务、没收金额或逮捕结果为必答。",
  },
  "crimpro-bail-rules4": {
    title: "《关于取保候审若干问题的规定》2022年第4条：不得同时采用两种保证",
    url: "https://www.court.gov.cn/fabu/xiangqing/372491.html",
    note: "公通字〔2022〕25号，2022-09-05印发。北京时间2026-10-12核对最高法全文及北京市公安局同文现行有效标记。同一犯罪嫌疑人、被告人不得同时采用保证人保证和保证金保证；本单元不展开未成年人优先保证方式或变更流程。",
  },
  "crimpro-bail-rules19": {
    title: "《关于取保候审若干问题的规定》2022年第19条：离开市县须经批准",
    url: "https://www.court.gov.cn/fabu/xiangqing/372491.html",
    note: "普通外出须经执行机关批准。紧急情况下可以先电话、短信申请，以及经常跨市县可简化批准程序，均不等于免批准。本题给定公安机关决定并执行、没有申请或批准，不要求额外回答检法决定案件的征求同意流程。",
  },
};

export const criminalProcedureBailCaseFacts = {
  "CRIMPRO-BAIL-GUARANTEE-1":
    "本案为独立教学虚构。许岑涉嫌一起盗窃案，公安机关已经决定对他取保候审，并决定采用保证金方式。许岑已按要求将保证金交入指定账户，机关确认已经到账。此后没有新的情况，也没有变更保证方式。\n\n办理人员仍要求：“保证金照留，你还得再找一名保证人，两种保证同时具备才办理取保。”本问只判断这一同时采用两种保证的要求，不讨论是否符合取保条件、保证金数额或保证人资格。",
  "CRIMPRO-BAIL-DUTIES-1":
    "本案为另一独立教学虚构。程禾因涉嫌犯罪，由公安机关决定取保候审并执行，已经交纳保证金。他住在安岭县，取保措施仍在执行。程禾想去另一城市的外县探望朋友，没有向执行机关申请，也没有得到离开安岭县的批准。他还收到依法作出的传讯通知，要求次日上午到案，没有不能按时到案的事由。\n\n程禾说：“钱已经交了，离开居住县先发条消息就行；这次传讯我也可以等下周方便时再去。”本问只判断这两个理由，不讨论取保条件、保证金处置或是否逮捕。",
};

export const criminalProcedureBailExercises: UnitExercise[] = [
  {
    id: "crimpro-bail-double-guarantee-choice",
    caseId: "CRIMPRO-BAIL-GUARANTEE-1",
    relatedTopicIds: ["crimpro-bail-basic"],
    kind: "objective",
    title: "交了保证金，还必须同时找保证人吗？",
    facts:
      "本案为独立教学虚构。许岑涉嫌一起盗窃案，公安机关已经决定对他取保候审，并决定采用保证金方式。许岑已按要求将保证金交入指定账户，机关确认已经到账。此后没有新的情况，也没有变更保证方式。\n\n办理人员仍要求：“保证金照留，你还得再找一名保证人，两种保证同时具备才办理取保。”本问只判断这一同时采用两种保证的要求，不讨论是否符合取保条件、保证金数额或保证人资格。",
    prompt: "关于办理人员提出的要求，哪项判断正确？",
    answer: "b",
    reference:
      "选B。这一要求不妥。对同一个人取保候审，保证人保证和保证金保证不能同时使用。许岑已经按现有决定交纳保证金，保证方式没有变更，不能还保留保证金又要求他同时提供保证人。本问不判断改换保证方式的条件，也不把取保说成已经无罪。",
    hint: "结合题里的具体要求说明理由，不需要背条号或固定句式。",
    sources: ["crimpro-bail-law68", "crimpro-bail-rules4"],
    choiceMode: "single",
    options: [
      {
        id: "a",
        text: "要求正确，两种保证同时具备才足够。",
        explanation: "同一被取保候审人不能被要求同时提供两种保证。",
      },
      {
        id: "b",
        text: "要求不妥，不能同时使用保证金保证和保证人保证。",
        explanation:
          "本案没有变更方式，仍保留保证金却又要求保证人，是同时使用。",
      },
      {
        id: "c",
        text: "是否能同时要求，完全取决于所涉罪名。",
        explanation:
          "题设中的保证方式要求不能因罪名就排除二者不可同时使用的规则。",
      },
      {
        id: "d",
        text: "交纳保证金后案件已经结束，不再需要任何程序。",
        explanation: "交纳保证金不是案件终结或无罪结论。",
      },
    ],
  },
  {
    id: "crimpro-bail-double-guarantee-explain",
    caseId: "CRIMPRO-BAIL-GUARANTEE-1",
    relatedTopicIds: ["crimpro-bail-basic"],
    kind: "subjective",
    title: "怎样回应“两种保证都要有”？",
    facts:
      "本案为独立教学虚构。许岑涉嫌一起盗窃案，公安机关已经决定对他取保候审，并决定采用保证金方式。许岑已按要求将保证金交入指定账户，机关确认已经到账。此后没有新的情况，也没有变更保证方式。\n\n办理人员仍要求：“保证金照留，你还得再找一名保证人，两种保证同时具备才办理取保。”本问只判断这一同时采用两种保证的要求，不讨论是否符合取保条件、保证金数额或保证人资格。",
    prompt:
      "办理人员保留保证金、又要求许岑同时提供保证人，是否妥当？请结合本案说明理由。",
    answer: "",
    reference:
      "这一要求不妥。对同一个人取保候审，保证人保证和保证金保证不能同时使用。许岑已经按现有决定交纳保证金，保证方式没有变更，不能还保留保证金又要求他同时提供保证人。本问不判断改换保证方式的条件，也不把取保说成已经无罪。",
    hint: "结合题里的具体要求说明理由，不需要背条号或固定句式。",
    sources: ["crimpro-bail-law68", "crimpro-bail-rules4"],
    criteria: [
      {
        id: "bail-one-guarantee",
        label: "不能两种保证一起要",
        meaning:
          "说明同一被取保候审人不能同时采用保证人保证和保证金保证，并联系本案已经交纳保证金、未变更方式的事实，否定同时再要保证人的要求。",
        acceptable:
          "“原来的钱还留着、方式也没改，又要人担保就是两种一起用，这样不行”即可。一段综合表达足够，不要求术语、条号或把结论重写一遍。",
        boundary:
          "本问只设一个完整判断，不另扣取保适用条件、保证人资格、金额、退还或变更流程；不要求宣布许岑无罪。",
      },
    ],
  },
  {
    id: "crimpro-bail-duties-choice",
    caseId: "CRIMPRO-BAIL-DUTIES-1",
    relatedTopicIds: ["crimpro-bail-basic"],
    kind: "objective",
    title: "交了保证金，就能自行外出和推迟到案吗？",
    facts:
      "本案为另一独立教学虚构。程禾因涉嫌犯罪，由公安机关决定取保候审并执行，已经交纳保证金。他住在安岭县，取保措施仍在执行。程禾想去另一城市的外县探望朋友，没有向执行机关申请，也没有得到离开安岭县的批准。他还收到依法作出的传讯通知，要求次日上午到案，没有不能按时到案的事由。\n\n程禾说：“钱已经交了，离开居住县先发条消息就行；这次传讯我也可以等下周方便时再去。”本问只判断这两个理由，不讨论取保条件、保证金处置或是否逮捕。",
    prompt: "针对程禾提出的两个理由，哪项判断正确？",
    answer: "c",
    reference:
      "选C。两个理由都不能成立。未经执行机关批准，程禾不能离开所居住的安岭县，发消息告知不等于已经获准；交纳保证金不免除这一义务。收到本案依法作出的传讯且没有不能及时到案的事由，他应按通知及时到案，不能仅因自己方便就拖到下周。本问无需断言一定没收全部保证金或一定逮捕。",
    hint: "结合题里的具体要求说明理由，不需要背条号或固定句式。",
    sources: ["crimpro-bail-law71", "crimpro-bail-rules19"],
    choiceMode: "single",
    options: [
      {
        id: "a",
        text: "交了保证金即可自行离县，也可以等自己方便再到案。",
        explanation: "保证金不能替代取保期间的行为义务。",
      },
      {
        id: "b",
        text: "离县发消息即可，但传讯应及时到案。",
        explanation: "报信不是执行机关批准。",
      },
      {
        id: "c",
        text: "离县须经执行机关批准，传讯应及时到案；交钱不能代替这些义务。",
        explanation: "分别对应本问外出与到案两项，未额外断言处罚结果。",
      },
      {
        id: "d",
        text: "不得离县，但只要最终会到案，就可以自行推迟到下周。",
        explanation:
          "没有题述不能及时到案事由，不能以自行方便替代及时到案要求。",
      },
    ],
  },
  {
    id: "crimpro-bail-duties-explain",
    caseId: "CRIMPRO-BAIL-DUTIES-1",
    relatedTopicIds: ["crimpro-bail-basic"],
    kind: "subjective",
    title: "分别说明外出和到案该怎么做",
    facts:
      "本案为另一独立教学虚构。程禾因涉嫌犯罪，由公安机关决定取保候审并执行，已经交纳保证金。他住在安岭县，取保措施仍在执行。程禾想去另一城市的外县探望朋友，没有向执行机关申请，也没有得到离开安岭县的批准。他还收到依法作出的传讯通知，要求次日上午到案，没有不能按时到案的事由。\n\n程禾说：“钱已经交了，离开居住县先发条消息就行；这次传讯我也可以等下周方便时再去。”本问只判断这两个理由，不讨论取保条件、保证金处置或是否逮捕。",
    prompt:
      "程禾认为离开居住县只需发消息，并可把本次传讯推到下周，这两个理由能否成立？请分别结合题设说明。",
    answer: "",
    reference:
      "两个理由都不能成立。未经执行机关批准，程禾不能离开所居住的安岭县，发消息告知不等于已经获准；交纳保证金不免除这一义务。收到本案依法作出的传讯且没有不能及时到案的事由，他应按通知及时到案，不能仅因自己方便就拖到下周。本问无需断言一定没收全部保证金或一定逮捕。",
    hint: "结合题里的具体要求说明理由，不需要背条号或固定句式。",
    sources: ["crimpro-bail-law71", "crimpro-bail-rules19"],
    criteria: [
      {
        id: "bail-leave-permission",
        label: "离县要先获准",
        meaning:
          "联系程禾没有得到执行机关批准，说明不得自行离开所居住的县，仅发消息不能代替批准，已交保证金不免除该义务。",
        acceptable:
          "“离县得执行机关先同意，他没获准，报个信不能当许可”即可；不要求固定的申请方式、条号或所有报备期限。",
        boundary:
          "只判断题述外出理由；不另扣审批层级、居住地认定、24小时信息变更报告或全部附加禁止事项。",
      },
      {
        id: "bail-timely-attendance",
        label: "传讯要及时到案",
        meaning:
          "联系有效传讯和没有不能及时到案的事由，说明应及时到案，不能因交过保证金或自己方便而推迟到下周。",
        acceptable:
          "“通知他明早到又没有去不了的事，就该及时去，不能因为交钱就拖一周”即可；不要求背完整法条。",
        boundary:
          "只判断本次传讯理由；不自行增加拘留、逮捕、没收金额或其他案件责任为必答。",
      },
    ],
  },
];

export const criminalProcedureBailTopics: FaultTopic[] = [
  {
    id: "crimpro-bail-basic",
    title: "取保候审的保证方式与基本义务",
    headline:
      "交保证金和找保证人怎样选择？取保以后，哪些事仍需先获准或及时做到？",
    goal: "区分两种保证不可叠加，以及离县批准和及时到案义务。",
    prerequisite: "知道取保候审期间案件尚未终结。",
    minutes: "8–12",
    paragraphs: [
      "决定取保候审时，采用保证人保证或者保证金保证；对同一被取保候审人，不能两种方式同时使用。是否符合取保条件是另一个问题，不由交钱或找人自动决定。",
      "被取保候审人未经执行机关批准，不得离开所居住的市、县；传讯时应及时到案。交过保证金或已有保证人，不免除这些义务。",
      "本单元只练保证方式、外出批准和及时到案。法定的信息变更报告、不得妨害证据等其他义务仍存在；这里不展开全部义务、具体金额、违反后的处理、期限或拘留逮捕条件。",
    ],
    example: {
      title: "交了保证金，还必须同时找保证人吗？",
      facts:
        "本案为独立教学虚构。许岑涉嫌一起盗窃案，公安机关已经决定对他取保候审，并决定采用保证金方式。许岑已按要求将保证金交入指定账户，机关确认已经到账。此后没有新的情况，也没有变更保证方式。\n\n办理人员仍要求：“保证金照留，你还得再找一名保证人，两种保证同时具备才办理取保。”本问只判断这一同时采用两种保证的要求，不讨论是否符合取保条件、保证金数额或保证人资格。",
      analysis:
        "选B。这一要求不妥。对同一个人取保候审，保证人保证和保证金保证不能同时使用。许岑已经按现有决定交纳保证金，保证方式没有变更，不能还保留保证金又要求他同时提供保证人。本问不判断改换保证方式的条件，也不把取保说成已经无罪。",
    },
    pitfall:
      "把两种保证说成必须叠加，或把保证金当成以后不受程序要求约束的费用。",
    recall: {
      prompt:
        "已交保证金，能否还要求同时提供保证人？离县与收到传讯又该怎样做？",
      reference:
        "同一人不能同时使用保证人保证和保证金保证；离开所居住的市县须经执行机关批准，传讯时及时到案。保证形式不能代替这些义务。",
    },
    sources: [
      "crimpro-bail-law68",
      "crimpro-bail-law71",
      "crimpro-bail-rules4",
      "crimpro-bail-rules19",
    ],
    exercises: criminalProcedureBailExercises,
  },
];
export const criminalProcedureBailChapter = {
  id: "CRIMPRO-BAIL",
  title: "强制措施：取保候审基础",
  section: "刑事诉讼法",
  topicIds: ["crimpro-bail-basic"],
};
export const criminalProcedureBailContentPack = {
  revision: criminalProcedureBailRevision,
  snapshot: {
    topics: criminalProcedureBailTopics,
    sources: criminalProcedureBailSources,
  },
};
export const criminalProcedureBailDefaultQueues = {
  objective: criminalProcedureBailExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: criminalProcedureBailExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function criminalProcedureBailQuestion(id: string) {
  const q = criminalProcedureBailExercises.find((q) => q.id === id);
  return q ? structuredClone(q) : undefined;
}
export function criminalProcedureBailTopicForQuestion(id: string) {
  const t = criminalProcedureBailTopics.find((t) =>
    t.exercises.some((q) => q.id === id),
  );
  return t ? structuredClone(t) : undefined;
}
export function criminalProcedureBailSameCaseQuestions(id: string) {
  const q = criminalProcedureBailQuestion(id);
  return q
    ? structuredClone(
        criminalProcedureBailExercises.filter((x) => x.caseId === q.caseId),
      )
    : [];
}
export const criminalProcedureBailPublicRules = [
  {
    sourceId: "crimpro-bail-law68",
    title: "《刑事诉讼法》2018修正第68条：取保候审的保证方式（教学摘要）",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    excerpt: "决定取保候审，应责令提出保证人或者交纳保证金。",
    checkedAt: "2026-10-12",
    scope: "保证形式的基本规则；不含题目人物、答案、保证人资格或数额标准。",
  },
  {
    sourceId: "crimpro-bail-law71",
    title: "《刑事诉讼法》2018修正第71条第1款：取保期间的基本义务（教学摘要）",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    excerpt:
      "被取保候审人未经执行机关批准不得离开所居住的市、县，并应在传讯时及时到案。",
    checkedAt: "2026-10-12",
    scope:
      "第1款两项基本义务的中性摘要，不包含具体个案判断、处罚或其他全部义务。",
  },
  {
    sourceId: "crimpro-bail-rules4",
    title:
      "《关于取保候审若干问题的规定》2022年第4条：不得同时采用两种保证（教学摘要）",
    url: "https://www.court.gov.cn/fabu/xiangqing/372491.html",
    excerpt: "对同一犯罪嫌疑人、被告人，不得同时采用保证人保证和保证金保证。",
    checkedAt: "2026-10-12",
    scope: "两种保证不可同时使用的中性规则；不包含题目人物或答案。",
  },
  {
    sourceId: "crimpro-bail-rules19",
    title:
      "《关于取保候审若干问题的规定》2022年第19条：离开市县须经批准（教学摘要）",
    url: "https://www.court.gov.cn/fabu/xiangqing/372491.html",
    excerpt:
      "被取保候审人离开所居住的市、县，须经执行机关批准。紧急情况下可以先电话或短信提出申请，之后补办手续；申请不等于已经批准。经常跨市县正常工作生活可以简化批准程序，并非无需批准。",
    checkedAt: "2026-10-12",
    scope: "只澄清申请与批准区别，不引入本题未给定的紧急或经常外出事实。",
  },
];
