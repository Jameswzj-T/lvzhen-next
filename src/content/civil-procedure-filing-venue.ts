import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

/** Pure teaching candidate; published revisions stay immutable. */
export const civilProcedureFilingVenueRevision =
  "civpro-filing-venue-2026-10-05.v1";

const filingTopicId = "civpro-filing-conditions";
const venueTopicId = "civpro-general-territorial-venue";
const procedureLawURL =
  "https://fgw.sh.gov.cn/cmsres/95/95d5fd4cc4bb4c8292ea9684def3fa02/0212340e50e0b014b7a206164f270398.pdf";

export const civilProcedureFilingVenueSources: ContentSources = {
  "civpro-filing-law": {
    title: "《民事诉讼法》2023年修正文本第2、122、126条：起诉与受理",
    url: procedureLawURL,
    note: "上海市发展和改革委员会官网公开全文；2026-10-05直接读取所列条文。本组辨析原告利害关系与受理的程序意义，不据立案认定实体胜诉，不考立案时限；非整科后续规范或2027大纲核验。",
  },
  "civpro-venue-law": {
    title: "《民事诉讼法》2023年修正文本第22条：对公民的一般地域管辖",
    url: procedureLawURL,
    note: "同一官方公开全文，2026-10-05直接读取第22条。仅比较普通境内公民的住所地、经常居住地连接点；本组不列全部有权法院，不否定合同等其他法定管辖路径。",
  },
  "civpro-domicile-interpretation": {
    title: "最高法民诉解释2022年修正文本第3、4条：住所地与经常居住地",
    url: "https://www.court.gov.cn/fabu/xiangqing/353651.html",
    note: "最高人民法院2022-04-02发布页，载第二次修正及2022-04-10施行日期；2026-10-05直接读第3、4条。连续一年以上及住院就医排除仅采用第4条明文，不创造其他量化标准，也不宣称已穷尽后续规范。",
  },
};

const friendOwnName: UnitExercise = {
  id: "civpro-filing-friend-own-name",
  caseId: "CP-FILING-OWN-1",
  relatedTopicIds: [filingTopicId],
  kind: "objective",
  choiceMode: "single",
  title: "朋友能以本人名义起诉吗",
  facts:
    "本案为虚构，各方均为境内成年公民。周平向梁澄出借一万元，到期归还发生争议。周的朋友魏安没有取得这笔债权，自己的权利也没有因本次争议受到影响。魏拟把自己列为原告，以本人名义请求梁向周归还借款；他并非以周的诉讼代理人身份参加诉讼。本问只考察魏作为原告与本案的利害关系，不判断借款最终责任或其他起诉条件。",
  prompt:
    "仅就原告须与本案有直接利害关系这一条件，下列对魏安的判断哪项最符合题设？",
  options: [
    {
      id: "a",
      text: "朋友愿意帮助债权人，就足以作为本人名义起诉的原告。",
      explanation: "愿意帮助朋友不等于自己的权利与本案具有直接利害关系。",
    },
    {
      id: "b",
      text: "题述朋友关系本身不足以使魏满足这一原告条件。",
      explanation:
        "债权未归魏，题设也没有魏自身权利受影响的事实，不能以朋友关系替代原告的直接利害关系。",
    },
    {
      id: "c",
      text: "只要能写清被告姓名，就无需再核原告的利害关系。",
      explanation: "明确被告与原告利害关系是不同的起诉条件，前者不替代后者。",
    },
    {
      id: "d",
      text: "魏知道借款发生的经过，就当然可以作为自己的案件起诉。",
      explanation: "知道案情并不当然使该争议成为魏自身的权利争议。",
    },
  ],
  answer: "b",
  hint: "核对所请求保护的是谁的权利，区分帮助朋友与自己作为原告。",
  reference:
    "选B。第122条要求原告与本案有直接利害关系。借款债权未转给魏，题设也没有魏自己的权利受到影响的事实；朋友身份和知道案情本身不足。这里仅判断题问的一项，不作借款最终责任或全部起诉条件的结论。",
  sources: ["civpro-filing-law"],
};

const defendantResidence: UnitExercise = {
  id: "civpro-venue-defendant-residence",
  caseId: "CP-VENUE-DOMICILE-1",
  relatedTopicIds: [venueTopicId],
  kind: "objective",
  choiceMode: "single",
  title: "一般规则先看谁的住处",
  facts:
    "本案为虚构，青岚县、柳溪县均为虚构地点。沈岚把一把电钻借给杜禾，约定期限届满后返还发生争议，沈拟起诉杜。两人均为境内普通成年公民；杜的户籍所在地与起诉时的经常居住地均在青岚县，沈居住在柳溪县。杜不属于被监禁、被采取强制性教育措施等特殊被告情形；双方无管辖或仲裁协议，不涉及专属、专门或涉外管辖。本问给定相应基层法院级别适当，只按对公民的一般地域规则识别连接点，不要求列出合同等其他规则下所有可能有权的法院。",
  prompt:
    "仅按第22条对公民的一般地域管辖规则，本案应识别下列哪个地点作为连接点？",
  options: [
    {
      id: "a",
      text: "青岚县：本案被告的住所地与经常居住地均在这里。",
      explanation:
        "一般规则从被告住所地出发；题中两个地点一致，青岚县对应本问连接点。",
    },
    {
      id: "b",
      text: "柳溪县：只要原告住在这里，一般规则就应优先照顾其方便。",
      explanation:
        "仅凭原告住处和便利，不能替代本问所考的一般被告住所地连接点。",
    },
    {
      id: "c",
      text: "只看电钻目前存放在哪个县，无需核被告的住处。",
      explanation:
        "本问限于第22条的一般连接点，不能以物品存放地点替代对被告住所、经常居住情况的识别。",
    },
    {
      id: "d",
      text: "两人住在不同县，因此无法从一般规则识别任何连接点。",
      explanation:
        "一般规则已经给出被告住所地连接点，原被告住在不同县不使该规则失去作用。",
    },
  ],
  answer: "a",
  hint: "先固定谁是被告，再看其住所地与经常居住地是否相同。",
  reference:
    "选A。按第22条对公民的一般地域规则识别被告住所地；民诉解释第3条以公民户籍所在地界定住所地。杜的住所地与经常居住地均在青岚县，本问连接点是青岚县。这里只回答一般规则，不能据此断言合同纠纷的其他法定管辖路径不存在。",
  sources: ["civpro-venue-law", "civpro-domicile-interpretation"],
};

const admissionNotMerits: UnitExercise = {
  id: "civpro-filing-admission-not-merits",
  caseId: "CP-FILING-MERITS-1",
  relatedTopicIds: [filingTopicId],
  kind: "subjective",
  title: "已经立案，就已证明该付款吗",
  facts:
    "本案为虚构。余宁与万衡就一次印刷服务发生争议，余向有管辖权且级别适当的人民法院请求万支付2400元价款。余以自己的服务价款请求起诉，明确列出万为被告，提交具体诉求及所据事实、理由；题设给定不存在仲裁协议、重复起诉等受理障碍，法院已经依法立案。双方仍争议实际印刷并交付的数量，以及款项是否已经支付；法院尚未就这些争议作出实体裁判。朋友认为：“既然已经立案，就已经证明万必须按余的请求付清2400元。”本问只评析这个推论，不判断服务合同的最终责任。",
  prompt:
    "朋友的推论能否成立？请说明立案受理的作用，并联系本案尚未解决的争议写出理由。",
  hint: "分清进入诉讼程序的条件，与服务、价款及付款争议是否已经得到实体判断。",
  reference:
    "推论不能成立。依法立案说明本次起诉已经进入受理程序，不能仅凭立案认定余提出的实体请求成立。实际印刷交付数量和是否已付款仍有争议且尚未获得实体裁判，不能由立案直接推出万必定按请求付清2400元。依据第2、122、126条的程序与实体审理分工。本问不要求作最终价款或责任结论。",
  criteria: [
    {
      id: "civpro-filing-admission-not-merits-procedure",
      label: "受理的程序意义",
      meaning:
        "立案受理使起诉进入诉讼程序，不等于已经认定原告的实体主张成立；不能由立案直接推出必然胜诉。",
      acceptable:
        "‘法院让案子进入程序，不是已经判定他说的都成立’等义表达可以；不强迫使用‘程序审查’或‘实体审理’标题、背出条号或列全四个起诉条件。",
      boundary:
        "把立案等同于判定债务必然成立，与本项相反。只需说明本问的程序作用，不要求立案时限、证据种类、审判程序名称或其他起诉障碍清单；结论可与案情理由综合表达，不另拆第三个结论句。",
    },
    {
      id: "civpro-filing-admission-not-merits-dispute",
      label: "联系尚未判定的实体争议",
      meaning:
        "题中实际印刷交付数量、是否已付款仍有未决争议，法院尚未作实体裁判；因此不能据立案认定万必定按余的请求付清2400元。",
      acceptable:
        "结合题中数量或付款争议，说明这些问题还没有被判定、不能靠立案直接认定请求成立即可；一段综合表达可同时承接两项，不要求逐字复述全部争议或2400这个数额。",
      boundary:
        "只说不能确定而不联系本案未决争议不足；不要求将印刷数量与付款两项同时逐项列全，也不要求判谁最终胜诉、核定应付数额、论证完整举证责任体系或讨论其他责任。",
    },
  ],
  sources: ["civpro-filing-law"],
};

const habitualResidence: UnitExercise = {
  id: "civpro-venue-habitual-residence",
  caseId: "CP-VENUE-HABITUAL-1",
  relatedTopicIds: [venueTopicId],
  kind: "subjective",
  title: "户籍未迁，能只按户籍地吗",
  facts:
    "本案为虚构，桐河县、鹭江区均为虚构地点。赵石与林遥就另一场旧书转让的余款发生争议，林拟起诉赵。两人均为境内普通成年公民。赵的户籍仍在桐河县，但已离开该地；至起诉当天，赵已在鹭江区连续工作和日常居住两年，起诉时仍住在该区，这段居住并非住院就医。赵不存在被监禁、被采取强制性教育措施等特殊被告情形；双方无管辖或仲裁协议，不涉及专属、专门或涉外管辖。本问给定相应基层法院级别适当，仅比较对公民的一般住所地与经常居住地连接点，不要求列全部可能有权法院。有人认为：“赵的户籍没有迁走，所以一般规则仍必须只按桐河县。”",
  prompt:
    "这个理由能否成立？请结合一般地域规则、经常居住地的条件及题设居住情况，说明本问应识别的连接点。",
  hint: "户籍未迁与起诉时已形成另一经常居住地可以同时存在；核对连续居住情况及就医排除。",
  reference:
    "理由不能成立。公民住所地与经常居住地不一致时，第22条的一般地域规则按经常居住地识别连接点；解释第3、4条分别以户籍所在地界定住所地，并规定离开住所地至起诉时已连续居住一年以上的地方、住院就医地除外。赵已离开户籍地，起诉时在鹭江区连续日常居住两年且非就医，满足题问的经常居住地条件，因此一般连接点是鹭江区。户籍未迁不能单独把本问结论拉回桐河县。本问不据此穷尽或否定其他法定管辖路径。",
  criteria: [
    {
      id: "civpro-venue-habitual-residence-rule",
      label: "不同地点时的一般规则",
      meaning:
        "公民住所地与经常居住地不一致时，一般地域规则按经常居住地识别连接点；经常居住地依据离开住所地至起诉时的连续居住情况识别，住院就医地除外。",
      acceptable:
        "结合第2项的起诉时连续两年、非就医居住事实说明已形成另一经常居住地，并表达不同地点时按后者即可；不要求重复抄一整段定义、固定‘原告就被告’口号或背条号。",
      boundary:
        "本项仍须表达两个地点不同后按经常居住地的一般规则，不能只写户籍未迁就当然只按户籍地。若已用题中两年非就医事实说明经常居住地条件，不因未单列‘一年以上’定义句记作遗漏；不新增其他管辖路径提醒为必答。",
    },
    {
      id: "civpro-venue-habitual-residence-application",
      label: "联系赵的居住事实确定连接点",
      meaning:
        "赵已离开桐河户籍地，起诉时仍在鹭江连续日常居住两年且非住院就医，题述条件支持鹭江为经常居住地和本问的一般连接点；户籍未迁不足以坚持只能按桐河。",
      acceptable:
        "‘人已在鹭江连续生活两年，起诉时还住在那里又不是就医，不能只抓住户籍没迁，一般按鹭江’可综合承接两项；不要求逐字复述工作与居住两种描述或另造第三个结论句。",
      boundary:
        "只说有经常居住地而未联系本案哪一地点和居住条件不足。不要求核其他全部法院、合同履行地、最终立案裁定或实体余款责任；对本问一般连接点的正确应用即可。",
    },
  ],
  sources: ["civpro-venue-law", "civpro-domicile-interpretation"],
};

export const civilProcedureFilingVenueTopics: FaultTopic[] = [
  {
    id: filingTopicId,
    title: "起诉条件与受理",
    headline: "先核起诉入口，再审实体主张",
    goal: "识别原告与本案的直接利害关系，说明立案受理与实体请求成立是不同判断。",
    prerequisite:
      "知道原告提出请求、被告是请求指向的人即可；本卡从民诉入口开始。",
    minutes: "8–12",
    paragraphs: [
      "第122条的起诉条件分别关心：原告是否与本案有直接利害关系，被告是否明确，诉讼请求及所据事实理由是否具体，以及是否属于法院民事受案范围和受诉法院管辖。不能拿其中一项替代其他项。",
      "帮助朋友、知道事情经过，本身不等于自己的权利与该案有直接利害关系。以本人名义作原告和作为他人的诉讼代理人，是不同问题；本组只用题述事实识别前者。",
      "第126条保障符合条件的起诉得到受理。受理与后续查明争议事实、确认权利义务不是同一判断；仅凭已经立案，不能认定实体诉求必然成立。两题分别练习利害关系与这一边界，不代表四项条件均已练习。",
    ],
    example: {
      title: friendOwnName.title,
      facts: friendOwnName.facts,
      analysis: friendOwnName.reference,
    },
    pitfall:
      "把朋友愿意帮助当作本人利害关系，或把法院立案当成已经赢得实体请求。",
    recall: {
      prompt:
        "朋友为什么不能仅凭朋友身份以本人名义作原告？已经立案为什么还不能直接推出原告胜诉？",
      reference:
        "本人作原告要有与本案的直接利害关系，帮助朋友本身不能替代。立案受理是诉讼入口，争议事实和实体权利义务还需审理，不能仅凭立案认定诉求成立。",
    },
    sources: ["civpro-filing-law"],
    exercises: [friendOwnName, admissionNotMerits],
  },
  {
    id: venueTopicId,
    title: "对公民的一般地域管辖",
    headline: "先找被告，再比较住所与经常居住地",
    goal: "根据被告住所地与起诉时经常居住情况识别一般连接点，辨析只看原告便利或户籍未迁的理由。",
    prerequisite:
      "知道地域管辖讨论地点；本组给定法院级别适当，无需先做级别管辖判断。",
    minutes: "8–12",
    paragraphs: [
      "第22条对公民的一般地域规则从被告住所地出发；住所地与经常居住地不一致时，由经常居住地人民法院管辖。原告住得近、去起诉方便，本身不能替代这个一般连接点。",
      "解释第3条以公民户籍所在地界定住所地；第4条规定，公民离开住所地至起诉时已连续居住一年以上的地方可以是经常居住地，但住院就医的地方除外。识别时固定起诉时点，不能只看户籍是否迁移。",
      "本组只比较普通境内公民的一般住所地与经常居住地。其他管辖规则可能另有连接点；给出本问的一般连接点，不等于已经列出全部有权法院或判断实体争议。",
    ],
    example: {
      title: defendantResidence.title,
      facts: defendantResidence.facts,
      analysis: defendantResidence.reference,
    },
    pitfall:
      "只按原告自己的住处，或只因被告户籍未迁就忽略起诉时另一经常居住地。",
    recall: {
      prompt:
        "被告户籍与起诉时经常居住地不一致时，一般规则怎么识别连接点？识别经常居住地要核哪些题述事实？",
      reference:
        "一般按被告经常居住地识别。核其已离开住所地、至起诉时连续居住一年以上的情况，以及是否属于住院就医地；正确的一般连接点不穷尽其他管辖路径。",
    },
    sources: ["civpro-venue-law", "civpro-domicile-interpretation"],
    exercises: [defendantResidence, habitualResidence],
  },
];

const exercises = [
  friendOwnName,
  defendantResidence,
  admissionNotMerits,
  habitualResidence,
];

export const civilProcedureFilingVenueChapter = {
  id: "CIVPRO-FILING-VENUE",
  title: "起诉条件与一般地域管辖",
  section: "民事诉讼法",
  topicIds: civilProcedureFilingVenueTopics.map((topic) => topic.id),
};

export const civilProcedureFilingVenueContentPack = {
  revision: civilProcedureFilingVenueRevision,
  snapshot: {
    topics: civilProcedureFilingVenueTopics,
    sources: civilProcedureFilingVenueSources,
  },
};

export const civilProcedureFilingVenueDefaultQueues = {
  objective: exercises.filter((q) => q.kind === "objective").map((q) => q.id),
  subjective: exercises.filter((q) => q.kind === "subjective").map((q) => q.id),
};

export const civilProcedureFilingVenueQuestion = (id: string) =>
  exercises.find((question) => question.id === id);

export const civilProcedureFilingVenueTopicForQuestion = (id: string) =>
  civilProcedureFilingVenueTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );

export const civilProcedureFilingVenueSameCaseQuestions = (id: string) => {
  const question = civilProcedureFilingVenueQuestion(id);
  return question ? exercises.filter((q) => q.caseId === question.caseId) : [];
};
