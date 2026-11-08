import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

/** Four authored fictional cases in one bounded civil-procedure unit. */
export const civilProcedureJurisdictionResponseRevision =
  "civpro-jurisdiction-response-2026-10-06.v1";

const topicId = "civpro-jurisdiction-response";
const lawUrl =
  "https://fgw.sh.gov.cn/cmsres/95/95d5fd4cc4bb4c8292ea9684def3fa02/0212340e50e0b014b7a206164f270398.pdf";
const interpretationUrl = "https://www.court.gov.cn/fabu/xiangqing/353651.html";

export const civilProcedureJurisdictionResponseSources = {
  "civpro-response-law": {
    title: "《民事诉讼法》2023年修正文本第130条：异议审查与应诉管辖",
    url: lawUrl,
    note: "上海市发展和改革委员会官网公开全文，2026-10-06直接读取第130条两款。及时管辖异议须审查；未提出异议且应诉答辩或者提出反诉的管辖效果保留级别、专属例外。本组不计算答辩天数或处理全部管辖路径。",
  },
  "civpro-response-interpretation": {
    title: "最高法民诉解释2022年修正文本第223条：及时异议与实体应诉",
    url: interpretationUrl,
    note: "2026-10-06直接读取两款：答辩期内提出异议又就起诉内容答辩，仍须审查异议；未提出异议而就实体内容答辩、陈述或反诉，可以认定应诉答辩。本组不把单纯沉默当作实体应诉，也不扩全部诉讼行为的效果。",
  },
  "civpro-response-exclusive-law": {
    title: "《民事诉讼法》2023年修正文本第34条第一项：不动产专属管辖",
    url: lawUrl,
    note: "同一官方全文，2026-10-06直接读取第34条第一项。这里仅以房屋物权归属确认纠纷识别不动产所在地，配合第130条的专属例外，不练港口、继承或全部专属管辖。",
  },
  "civpro-response-property-interpretation": {
    title: "最高法民诉解释2022年修正文本第28条第一款：不动产物权纠纷",
    url: interpretationUrl,
    note: "2026-10-06直接读取第一款，将不动产权利确认、分割、相邻关系等引起的物权纠纷纳入所述不动产纠纷。本案只用房屋所有权确认，不由房屋相关二字泛推全部合同或行政争议。",
  },
} satisfies ContentSources;

const common =
  "本案为独立虚构案例，人物和地点均为虚构。各方均为境内普通成年公民，不涉及仲裁、涉外或专门法院管辖，题设给定受诉基层法院级别适当。";

const timelyObjection: UnitExercise = {
  id: "civpro-jurisdiction-timely-objection",
  caseId: "CP-JURIS-TIMELY-1",
  relatedTopicIds: [topicId],
  kind: "objective",
  choiceMode: "single",
  title: "提出异议后又答了实体问题",
  facts:
    common +
    "江禾向邵宁索还一笔借款，在清荷县法院起诉。邵收到起诉状副本后，在提交答辩状期间向法院提出明确的管辖权异议，说明自己认为该院没有地域管辖权的理由，并请求审查；他同时提交了实体答辩，主张借款已归还。该案不涉及专属管辖，法院尚未核查异议是否成立。工作人员认为，既然邵已经答了实体问题，原来的及时异议就不用再审查。本问只处理这个程序意见，不判断异议最终是否成立或借款是否已还。",
  prompt: "法院对邵宁及时提出的管辖权异议应如何处理？哪项最符合题设？",
  options: [
    {
      id: "a",
      text: "邵同时进行了实体答辩，就视为自动放弃及时提出的管辖异议，无须再审查。",
      explanation:
        "忽略已在答辩期内提出明确异议；第223条第一款要求这种情况下仍审查异议。",
    },
    {
      id: "b",
      text: "仍应审查异议；成立时裁定移送有管辖权的法院，不成立时裁定驳回异议。",
      explanation:
        "及时异议与实体答辩同时存在，不因后者跳过第130条第一款的审查和对应处理。",
    },
    {
      id: "c",
      text: "只要异议在答辩期内提出，无须审查理由，就必须直接移送。",
      explanation: "及时提出不等于异议必然成立，法律仍要求法院审查。",
    },
    {
      id: "d",
      text: "有管辖异议，就可以直接认定借款请求不成立并判原告败诉。",
      explanation: "管辖异议属于诉讼管辖问题，不能代替实体借款责任判断。",
    },
  ],
  answer: "b",
  hint: "分别核对是否及时提出异议，以及此后实体答辩能否直接消除这次异议。",
  reference:
    "选B。第130条第一款要求对答辩期内提出的管辖异议进行审查，成立时裁定移送有管辖权的法院，不成立时裁定驳回异议。解释第223条第一款进一步说明，已在答辩期间提出异议，又针对起诉内容答辩的，仍应按该规则审查。邵明确提出了及时异议，不能因其同时主张借款已还，就改按未提出异议的应诉规则跳过审查。异议是否成立、借款是否已还均需各自判断，本题未要求作这两个最终结论。",
  sources: ["civpro-response-law", "civpro-response-interpretation"],
};

const meritsResponse: UnitExercise = {
  id: "civpro-jurisdiction-merits-response",
  caseId: "CP-JURIS-MERITS-1",
  relatedTopicIds: [topicId],
  kind: "objective",
  choiceMode: "single",
  title: "没有异议，直接争论维修款",
  facts:
    common +
    "唐沐与魏澄就家用相机维修款发生争议，唐在松禾县法院起诉。双方的住所及本次维修、约定付款地点都在澄溪县，没有管辖协议；本题给定松禾县法院在起诉时没有其他地域管辖基础，不考合同履行地识别。案件不涉及专属管辖。魏收到起诉状副本后，在提交答辩状期间没有提出任何管辖异议，已经提交针对维修款的书面答辩和付款记录，主张部分费用已付；并未保留管辖异议。本问只判断这种应诉行为的管辖效果，不认定维修款实际应付多少。",
  prompt: "就魏澄的上述应诉行为，哪项判断最符合题设？",
  options: [
    {
      id: "a",
      text: "只要松禾县起诉时没有地域连接点，即使魏未异议并作实体答辩，也永远不能依应诉规则认定管辖。",
      explanation:
        "忽略法律对未提出异议且实体应诉的规定，以及题设已排除的级别、专属例外。",
    },
    {
      id: "b",
      text: "必须另签书面管辖协议，魏已经提交的实体答辩不可能产生所述管辖效果。",
      explanation: "协议管辖与本题的应诉规则是不同依据，不能强加另签协议条件。",
    },
    {
      id: "c",
      text: "魏未提出异议而已经针对实体内容答辩，且无级别、专属例外，可按应诉规则视受诉法院有管辖权。",
      explanation:
        "对应第130条第二款及第223条第二款的事实条件，不把这一程序效果等同于维修款责任已被认定。",
    },
    {
      id: "d",
      text: "魏作了答辩就应同时认定唐提出的全部维修款请求成立。",
      explanation: "应诉行为的管辖效果不代替实体请求和付款记录的审理。",
    },
  ],
  answer: "c",
  hint: "核对未提出异议与已经就实体争议答辩两个条件，再看题设是否涉及法定例外。",
  reference:
    "选C。第130条第二款规定，未提出管辖异议并应诉答辩或者提出反诉的，视为受诉法院有管辖权，违反级别和专属管辖的除外。解释第223条第二款允许把未异议而就案件实体内容答辩、陈述或反诉认定为应诉答辩。魏未异议，且已围绕维修款是否支付作实体答辩，题设排除了级别、专属例外，符合这里的应诉条件；不必另签管辖协议。结论只关乎诉讼管辖，不认定维修款应付多少。",
  sources: ["civpro-response-law", "civpro-response-interpretation"],
};

const silentDefendant: UnitExercise = {
  id: "civpro-jurisdiction-silence-no-response",
  caseId: "CP-JURIS-SILENT-1",
  relatedTopicIds: [topicId],
  kind: "subjective",
  title: "没有提出异议，也一直没有回应",
  facts:
    common +
    "叶青与陆苇就一次普通相机借用后的损坏赔偿发生争议。叶在榆川县法院起诉，起诉状副本已经依法送达陆。本题给定该院原无其他地域管辖基础，不涉及专属管辖。提交答辩状期间已经届满，陆没有提出管辖异议，也没有就案件实体内容作答辩或陈述，没有提出反诉；法院尚未作任何实体裁判。有人认为：“陆没有提异议，所以不用看他是否应诉，就可以按应诉规则视这个法院有管辖权。”本问只评析这个理由，不处理缺席程序、损坏责任或后续移送手续。",
  prompt:
    "上述理由能否成立？请说明应诉管辖所需的行为条件，并联系陆苇实际未作回应的情况写出理由。",
  hint: "未提出异议之外，法律还要求什么应诉行为？沉默是否已经表达了实体答辩？",
  reference:
    "理由不能成立。第130条第二款同时要求未提出管辖异议，以及应诉答辩或者提出反诉，不能只取前一条件；解释第223条第二款把就实体内容答辩、陈述或反诉作为可认定的应诉行为。陆虽未异议，但始终没有实体答辩、陈述或反诉，不能仅凭沉默和答辩期届满就按这条视受诉法院有管辖权。这里没有把实体请求判给任何一方，也不要求讨论缺席审理或移送的全部程序。",
  criteria: [
    {
      id: "civpro-response-silence-rule",
      label: "未异议之外的实际应诉条件",
      meaning:
        "按应诉规则认定管辖，不仅要未提出管辖异议，还要有应诉答辩或者提出反诉的行为；不能仅以沉默或未提异议替代后一条件。",
      acceptable:
        "‘没有反对管辖还不够，也要实际就案件答辩或反诉’等义表达可以；允许规则和案情合写，不强迫报条号、单列标题或罗列所有可认定的表达形式。",
      boundary:
        "不能说答辩期一过而未异议就无条件获得应诉管辖。本题不要求复述级别、专属例外清单，也不要求另列缺席裁判或移送手续；反驳结论不拆成第三个独立必答。",
    },
    {
      id: "civpro-response-silence-application",
      label: "联系陆未答辩、未陈述也未反诉",
      meaning:
        "陆只是没有提出异议，始终没有就实体回应或提出反诉，因此题述行为不满足应诉条件，不能靠所引理由视榆川县法院有管辖权。",
      acceptable:
        "‘陆什么实体回应都没作，也没有反诉，不能把他没提异议当成已经应诉’可综合承接两项；不要求逐字重复所有缺失行为或法院名称。",
      boundary:
        "须联系本案仅沉默而无应诉行为，不能只有抽象规则。不能把法院已送达文书当作陆已经作出答辩；不要求判最终赔偿、确定全部有权法院或处理未问的程序。",
    },
  ],
  sources: ["civpro-response-law", "civpro-response-interpretation"],
};

const exclusiveProperty: UnitExercise = {
  id: "civpro-jurisdiction-exclusive-response",
  caseId: "CP-JURIS-EXCLUSIVE-1",
  relatedTopicIds: [topicId],
  kind: "subjective",
  title: "已经答辩，房屋所在地还要看吗",
  facts:
    common +
    "顾鸣与程遥对位于望澜区的一套房屋所有权归属发生争议。顾在自己居住的岚溪县法院起诉，请求确认该房屋归自己所有；这是两名私人之间的不动产物权确认争议，不是请求支付房款或审查行政登记行为。房屋不在岚溪县，题设给定相应基层法院级别适当。程没有提出管辖异议，已经针对房屋归属作书面实体答辩，主张房屋属于自己并说明理由。有人认为：“程既然已经答辩，就可以不管房屋所在地，直接按应诉规则视岚溪县法院有管辖权。”本问只审这个理由，不判断房屋最终属于谁或其他管辖程序。",
  prompt:
    "这个理由能否支持岚溪县法院按应诉规则取得管辖？请说明相关例外，并联系本案争议类型和房屋位置写出理由。",
  hint: "先确定本案请求是房屋物权确认，再看实体应诉能否改变相应的专属管辖要求。",
  reference:
    "理由不能成立。未异议而实体应诉的管辖效果，依第130条第二款保留违反级别或专属管辖的例外；实体答辩不能用来排除本案专属要求。第34条第一项规定因不动产纠纷提起的诉讼由不动产所在地法院专属管辖；解释第28条第一款明确包括因不动产权利确认引起的物权纠纷。本案实际请求确认房屋所有权，房屋位于望澜区而不在受诉的岚溪县，所以不能仅因程已经实体答辩，就依应诉规则把专属管辖交给岚溪县法院。这里不是将全部房屋相关交易泛定为专属，也不作最终产权、所有例外或程序处理结论。",
  criteria: [
    {
      id: "civpro-response-exclusive-exception",
      label: "应诉效果保留专属管辖例外",
      meaning:
        "未提出异议并作实体答辩的应诉管辖效果，不能用于违反专属管辖规定的情形；实体应诉不能排除专属要求。",
      acceptable:
        "‘已经答辩也不能突破专属管辖’等义表达可以；可与本案房屋物权确认理由合写，不强求第130条号或同时列出级别管辖例外。",
      boundary:
        "不能说只要应诉就能改变任何法定管辖。未同时讲级别例外、其他专属案件名单或完整移送程序，不算本问漏答；无需另造一个重复反驳结论点。",
    },
    {
      id: "civpro-response-exclusive-property-location",
      label: "联系房屋物权确认与所在地",
      meaning:
        "本案是房屋所有权归属确认的物权纠纷，适用不动产所在地的专属管辖；房屋在望澜区而不在岚溪县，所以不能以程已答辩认定岚溪县取得所述管辖。",
      acceptable:
        "‘这是房屋确权，房子在望澜区，专属连接点不能因为程答辩就改成岚溪县’足以说明必要联系；允许一段综合论证，不要求逐字抄写完整法条或当事人理由。",
      boundary:
        "需联系本案物权确认性质和房屋位置，不能只见房屋二字就泛推全部相关合同。未说房屋最终属谁、未报条号、未列其他所有有权法院或未要求移送，不单独作漏答；不从其他题原答补足。",
    },
  ],
  sources: [
    "civpro-response-law",
    "civpro-response-exclusive-law",
    "civpro-response-property-interpretation",
  ],
};

const exercises = [
  timelyObjection,
  meritsResponse,
  silentDefendant,
  exclusiveProperty,
];

export const civilProcedureJurisdictionResponseTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "管辖权异议与应诉管辖",
    headline: "先看是否及时异议，再看实际应诉与例外",
    goal: "区分及时异议与实体答辩的关系，识别未异议时实际应诉的条件，并应用专属管辖例外。",
    prerequisite:
      "已认识起诉受理与一般地域连接点；本组给定法院级别适当，不要求重新穷尽合同等地域管辖路径。",
    minutes: "10–15",
    paragraphs: [
      "第130条第一款规定，受理案件后对管辖权有异议，应当在提交答辩状期间提出。法院须审查，成立时裁定移送有管辖权的法院，不成立时裁定驳回异议；提出及时不等于理由已经成立。",
      "解释第223条第一款区分已提出的异议与实体答辩：在答辩期内提出管辖异议，又针对起诉内容答辩的，仍应审查异议。不能把所有实体答辩都一律当作没有管辖异议。",
      "没有提出管辖异议时，第130条第二款还要求应诉答辩或者提出反诉。解释第223条第二款以针对实体内容答辩、陈述或反诉作为可认定的应诉行为。仅沉默或答辩期已过，不能替代实际应诉；正确的管辖效果也不等于已经判定实体请求成立。",
      "应诉效果保留级别和专属管辖例外。本组只以房屋物权归属确认为例：第34条第一项与解释第28条第一款指向不动产所在地的专属管辖，不能靠未异议而实体答辩改变。这里不展开级别金额标准、协议、涉外或其他专属事项。",
    ],
    example: {
      title: timelyObjection.title,
      facts: timelyObjection.facts,
      analysis: timelyObjection.reference,
    },
    pitfall:
      "把及时异议后的实体答辩当作自动放弃，或把未异议、沉默、实体应诉和突破专属管辖混成一个条件。",
    recall: {
      prompt:
        "已及时提出异议又答实体问题，还要审异议吗？没有异议是否已足够？房屋物权确认案已经应诉，专属要求还在吗？",
      reference:
        "及时异议仍须审查。未异议之外还要有实际应诉答辩或反诉，单纯沉默不足。实体应诉不能突破专属管辖，房屋物权确认仍要联系不动产所在地。",
    },
    sources: Object.keys(civilProcedureJurisdictionResponseSources),
    exercises,
  },
];

export const civilProcedureJurisdictionResponseChapter = {
  id: "CIVPRO-JURISDICTION-RESPONSE",
  title: "管辖权异议与应诉管辖",
  section: "民事诉讼法",
  topicIds: [topicId],
};

export const civilProcedureJurisdictionResponseContentPack = {
  revision: civilProcedureJurisdictionResponseRevision,
  snapshot: {
    topics: civilProcedureJurisdictionResponseTopics,
    sources: civilProcedureJurisdictionResponseSources,
  },
};

export const civilProcedureJurisdictionResponseDefaultQueues = {
  objective: exercises
    .filter((question) => question.kind === "objective")
    .map((question) => question.id),
  subjective: exercises
    .filter((question) => question.kind === "subjective")
    .map((question) => question.id),
};

export function civilProcedureJurisdictionResponseQuestion(
  id: string,
): UnitExercise | undefined {
  const question = exercises.find((candidate) => candidate.id === id);
  return question ? structuredClone(question) : undefined;
}

export function civilProcedureJurisdictionResponseTopicForQuestion(
  id: string,
): FaultTopic | undefined {
  const topic = civilProcedureJurisdictionResponseTopics.find((candidate) =>
    candidate.exercises.some((question) => question.id === id),
  );
  return topic ? structuredClone(topic) : undefined;
}

export function civilProcedureJurisdictionResponseSameCaseQuestions(
  id: string,
): UnitExercise[] {
  const question = exercises.find((candidate) => candidate.id === id);
  return question
    ? structuredClone(
        exercises.filter((candidate) => candidate.caseId === question.caseId),
      )
    : [];
}
