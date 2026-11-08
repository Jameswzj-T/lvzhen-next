import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

// Eight original fictional cases, paired as choice and full written forms.
export const civilProcedureForeignRevision =
  "civil-procedure-foreign-2026-10-29.v1";
export const civilProcedureForeignSources: ContentSources = {
  "civpro-foreign-agreement-court-basis": {
    title: "《中华人民共和国民事诉讼法》（2023年修正）第277条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-29按现行涉外民事诉讼规则核对。双方均在境外，不影响其以书面协议选择中国人民法院处理涉外民事纠纷；不能仅因争议与中国没有实际联系而否定该选择。 具体受理法院仍须符合适用的级别、专门、专属等管辖规定；本案排除这些障碍后可按约定受理。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-foreign-parallel-stay-basis": {
    title:
      "《中华人民共和国民事诉讼法》（2023年修正）第276条第一款；《中华人民共和国民事诉讼法》（2023年修正）第280条首句；《中华人民共和国民事诉讼法》（2023年修正）第281条第一、二款",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-29按现行涉外民事诉讼规则核对。外国法院先受理不当然排除我国法院管辖；我国法院依法有管辖权的，可以受理同一纠纷。 满足281条的申请与前提时，我国法院可以裁定中止；本案既已依法中止，外国法院后续未采取必要审理措施或未在合理期间审结，当事人书面申请后，我国法院应当恢复诉讼。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-foreign-electronic-service-basis": {
    title:
      "《中华人民共和国民事诉讼法》（2023年修正）第283条引导句、第九项；《中华人民共和国民事诉讼法》（2023年修正）第271条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-29按现行涉外民事诉讼规则核对。受送达人在境内没有住所，能够确认其收悉且其所在国法不禁止的，可以用电子方式送达。 如果所在国法禁止该方式，单凭当事人同意或实际上收到，不能绕过283条第九项的禁止边界。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-foreign-answer-appeal-terms-basis": {
    title:
      "《中华人民共和国民事诉讼法》（2023年修正）第285条；《中华人民共和国民事诉讼法》（2023年修正）第286条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-29按现行涉外民事诉讼规则核对。在中国境内没有住所的被告，收到起诉状副本后三十日内提出答辩状。 在中国境内没有住所的当事人，对依法可上诉的一审判决、裁定的上诉期间均为送达之日起三十日；申请延期是否准许，由人民法院决定。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-foreign-recognition-first-basis": {
    title:
      "《中华人民共和国民事诉讼法》（2023年修正）第298条；《中华人民共和国民事诉讼法》（2023年修正）第299条；《最高人民法院关于适用〈中华人民共和国民事诉讼法〉的解释》（2022年修正）第544条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-29按现行涉外民事诉讼规则核对。外国法院生效金钱判决不能直接视为国内执行依据，应向有管辖权的中级人民法院申请承认和执行。 法院依法审查、裁定承认后，需要执行的再依法执行；可以一次同时申请承认和执行，不要求当事人分成两次申请。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-foreign-notice-defense-basis": {
    title: "《中华人民共和国民事诉讼法》（2023年修正）第300条引导句、第二项",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-29按现行涉外民事诉讼规则核对。我国法院核实被申请人未获合法传唤，或者虽经合法传唤却未获合理陈述、辩论机会，应裁定不予承认和执行该外国判决。 外国判决已经生效、作出国允许强制执行，都不能消除我国承认程序对上述程序保障的审查。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-foreign-overseas-video-basis": {
    title:
      "《中华人民共和国民事诉讼法》（2023年修正）第284条第一款、第二款引导句及第二项",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-29按现行涉外民事诉讼规则核对。本案被告明确不同意，缺少双方当事人同意，不能只凭原告和证人愿意就采用284条第二款第二项的即时通讯取证路径。 这不意味着境外证据永远不能调查；当事人可以申请法院依法按适用条约规定的方式或外交途径收集。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-foreign-foreign-direct-investigation-basis": {
    title:
      "《中华人民共和国民事诉讼法》（2023年修正）第293条；《中华人民共和国民事诉讼法》（2023年修正）第294条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-29按现行涉外民事诉讼规则核对。外国法院未经我国主管机关准许，不得派员在中国境内自行实施正式调查取证，证人或双方同意不能替代该许可。 外国驻华使领馆向本国公民取证属于法定例外，但仍须遵守中国法律、不得采取强制措施；司法协助按条约途径，没有条约关系的通过外交途径进行。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
};

type CaseDraft = {
  id: string;
  topicId: string;
  title: string;
  facts: string;
  prompt: string;
  reference: string;
  answer: "a" | "b" | "c" | "d";
  options: { text: string; explanation: string }[];
  points: { label: string; meaning: string; boundary: string }[];
  sources: string[];
};
const cases: CaseDraft[] = [
  {
    id: "civpro-foreign-agreement-court",
    topicId: "civpro-foreign-jurisdiction",
    title: "双方都在境外，还能约定中国法院吗",
    facts:
      "两家外国公司就一宗普通设备货款发生纠纷。双方住所、合同签订和履行、设备及可供执行财产均在境外。双方另有由双方签字确认的书面条款，约定由中国苏州的人民法院解决本项合同纠纷；结合金额和依法确定的管辖安排，具体受诉法院能够确定。案件不涉及身份关系、专属管辖或仲裁约定，也不存在违反级别、专门管辖的情形。被告只以“交易与中国没有实际联系”为由，要求否定这项选择中国法院的约定。",
    prompt:
      "被告仅凭没有实际联系，能否否定本题的协议管辖？这项约定是否也能排除级别、专属等管辖限制？",
    reference:
      "不能仅因交易与中国没有实际联系，就否定本题的书面选择。现行涉外诉讼规则允许当事人书面协议选择中国法院，不再把与中国有实际联系作为这一协议管辖的必要条件。但选择法院不能绕过级别、专属等法定限制。本题已经排除这些障碍，可依协议由相应中国法院管辖。",
    answer: "b",
    options: [
      {
        text: "没有实际联系，任何选择中国法院的协议都必然无效",
        explanation:
          "这是把一般国内协议管辖的实际联系要求直接套用到现行涉外协议选择中国法院上。",
      },
      {
        text: "可以依书面协议选择中国法院，但仍须遵守法定管辖限制",
        explanation:
          "涉外书面选择中国法院不以实际联系为必要条件，也不意味着可以突破级别、专属等限制。",
      },
      {
        text: "可以任意选择中国任何级别法院，其他管辖限制一律失效",
        explanation: "当事人约定不能取代级别、专属等法定管辖规则。",
      },
      {
        text: "只有外国法院先拒绝受理，中国法院才能依据协议受理",
        explanation: "本题书面选择中国法院，不以外国法院先拒绝为前提。",
      },
    ],
    points: [
      {
        label: "书面选择不以实际联系为必要条件",
        meaning:
          "联系双方真实书面选择中国法院，说明不能仅因交易无实际联系而否定协议管辖。",
        boundary:
          "限本题涉外协议选择中国法院；不推广为所有国内协议管辖均无实际联系要求。",
      },
      {
        label: "仍受法定管辖限制",
        meaning: "说明协议不能排除级别、专属等法定限制，本题已排除相关障碍。",
        boundary: "不要求逐项列出全部限制，也不要求写法院具体名称。",
      },
    ],
    sources: ["civpro-foreign-agreement-court-basis"],
  },
  {
    id: "civpro-foreign-parallel-stay",
    topicId: "civpro-foreign-jurisdiction",
    title: "外国法院先受理以后",
    facts:
      "一家中国公司与一家外国公司发生货款纠纷，合同履行地在中国，中国受诉法院依法有管辖权。同一纠纷已先由外国法院受理。双方未约定选择中国法院，也未订立排他性选择外国法院的协议；案件不属于中国法院专属管辖，由中国法院审理也不存在明显更方便的情形。被告书面申请中止，中国法院依法裁定中止诉讼。此后，外国法院长期没有采取必要措施审理案件，中国公司提交相应材料并书面申请恢复中国法院的诉讼。",
    prompt:
      "外国法院先受理，是否意味着中国法院一开始就不得受理？本题中止后出现上述情况，应怎样处理恢复申请？",
    reference:
      "不意味着中国法院失去受理权。中国法院本来有管辖权，可以受理；在本题条件下，可以根据书面申请裁定中止，避免两个程序同时推进。现在外国法院长期没有采取必要审理措施，当事人又书面申请恢复，中国法院应当恢复诉讼，不能无限期等待。",
    answer: "d",
    options: [
      {
        text: "外国法院一旦先受理，中国法院就必然无管辖权",
        explanation: "平行诉讼不当然排除中国法院依法已有的管辖权。",
      },
      {
        text: "中国法院既然中止，就永远不能恢复",
        explanation: "外国法院不采取必要措施等法定情形出现后，可以依法恢复。",
      },
      {
        text: "原告必须先撤销外国案件，中国法院才能考虑恢复",
        explanation:
          "本题恢复以法定事由及书面申请为依据，不要求先取得外国法院撤案决定。",
      },
      {
        text: "中国法院原可受理并依法中止，现在应依书面申请恢复",
        explanation: "本题同时给出了原管辖依据、中止条件和恢复的法定事由。",
      },
    ],
    points: [
      {
        label: "先受理不排除我国管辖",
        meaning:
          "说明我国法院已有管辖权仍可受理；本题外国先受理可依法中止，不等于当然不得受理。",
        boundary: "不要求重新分析题设已明确的合同履行地管辖。",
      },
      {
        label: "不采取必要措施时依法恢复",
        meaning:
          "联系外国法院长期未采取必要审理措施及当事人书面申请，说明中国法院应恢复诉讼。",
        boundary: "不自行编造固定等待月数，也不要求先撤销外国诉讼。",
      },
    ],
    sources: ["civpro-foreign-parallel-stay-basis"],
  },
  {
    id: "civpro-foreign-electronic-service",
    topicId: "civpro-foreign-service-periods",
    title: "境外收到了法院邮件",
    facts:
      "中国法院审理一宗涉外合同纠纷。被告外国公司在中国境内没有住所，已明确同意使用其指定的电子邮箱接收本案诉讼文书。法院核实，受送达人所在国法律不禁止这种送达，适用条约也没有相反限制。法院将起诉材料发至指定邮箱，被告确认收到，系统同时留存了可确认收悉的记录。被告随后称，只要文件发往境外，电子送达就一律无效，必须重新走外交途径。",
    prompt:
      "本题是否必须仅因送达境外而否定电子送达？如果所在国法律明确禁止这种方式，仅凭对方实际收到是否就足够？",
    reference:
      "不必否定。本题电子方式能确认被告收悉，所在国法律不禁止，也没有相反条约限制，不能仅因收件人在境外就认定无效。如果所在国法律明确禁止这种方式，则不能只凭“确实收到了”就认定这一电子送达合法，应采用其他合法的送达途径。",
    answer: "a",
    options: [
      {
        text: "本题可依法电子送达；若所在国禁止，收到本身不能替代合法方式",
        explanation: "能够确认收悉和所在国不禁止都是这里需要注意的条件。",
      },
      {
        text: "凡收件人在境外，只能采用外交送达",
        explanation: "涉外送达有多种法定方式，并非只有外交途径。",
      },
      {
        text: "只要收悉，所在国明确禁止也不影响电子送达合法",
        explanation: "这忽略了电子送达不得违反受送达人所在国禁令的边界。",
      },
      {
        text: "电子方式只能送提醒，永远不能送诉讼文书",
        explanation: "现行法允许符合法定条件的电子送达。",
      },
    ],
    points: [
      {
        label: "本题电子送达可用",
        meaning:
          "联系可确认收悉、所在国不禁止等事实，说明不能仅因在境外就否定本次电子送达。",
        boundary: "不强求列全所有替代送达方式或技术细节。",
      },
      {
        label: "实际收到不能覆盖所在国禁令",
        meaning:
          "回答假设情形：所在国明确禁止时，不能只凭实际收到认定合法，须依法另选送达方式。",
        boundary: "不要求指定未知国家的具体条约或主管机关。",
      },
    ],
    sources: ["civpro-foreign-electronic-service-basis"],
  },
  {
    id: "civpro-foreign-answer-appeal-terms",
    topicId: "civpro-foreign-service-periods",
    title: "境内没有住所的答辩和上诉期限",
    facts:
      "中国法院受理一起涉外买卖纠纷，被告公司住所和实际经营均在境外，在中国境内没有住所。该公司收到起诉状副本后第24日提交答辩状；后来收到一审判决后第26日提交上诉状。两次提交均在相应文书送达后30日内。原告以国内一般的15日期间为由，认为两次都已超期。被告另称，如果以后不能在法定期间提交文书，只要自己提出延期，就可以自动延长。",
    prompt:
      "本题答辩与上诉是否超期？境内没有住所的当事人提出延期申请，是否就自动获准？",
    reference:
      "两次都没有超期。本题被告在中国境内没有住所，收到起诉状副本后的答辩期间为30日，不服一审判决的上诉期间也为送达后30日，第24日和第26日均在期间内。需要延期时可以申请，但是否准许由法院决定，申请本身不会自动延长。",
    answer: "c",
    options: [
      {
        text: "两次都超过15日，应一律按超期处理",
        explanation: "本题适用境内无住所当事人的涉外特别期间。",
      },
      {
        text: "两次没有超期，且只要申请延期就必然获准",
        explanation: "是否准许延期仍由人民法院决定。",
      },
      {
        text: "两次均未超过30日，延期是否获准由法院决定",
        explanation: "答辩、上诉的特别期间及延期决定主体均符合本题规则。",
      },
      {
        text: "外国当事人答辩和上诉均没有任何期限",
        explanation: "涉外程序仍有法定期间，不是无限期作答或上诉。",
      },
    ],
    points: [
      {
        label: "适用三十日且两次未超期",
        meaning:
          "联系被告在境内没有住所，说明答辩和不服一审判决的上诉均适用送达后30日，本案两次均及时。",
        boundary: "依据是境内无住所，不是单凭外国国籍；不要求额外计算节假日。",
      },
      {
        label: "延期须经法院决定",
        meaning: "说明提出延期申请并不自动获准，是否准许由法院决定。",
        boundary: "不要求自行承诺法院一定同意或必须延长多少天。",
      },
    ],
    sources: ["civpro-foreign-answer-appeal-terms-basis"],
  },
  {
    id: "civpro-foreign-recognition-first",
    topicId: "civpro-foreign-judgments",
    title: "外国胜诉判决怎样在国内执行",
    facts:
      "宁禾公司在外国法院取得一份已经发生法律效力的普通货款判决。败诉方在中国境内有可供执行的财产。该判决尚未经过中国法院承认，也不是仲裁裁决。宁禾把判决原件交给国内法院，要求直接像执行中国生效判决一样划走对方存款，认为“外国判决已经生效，就无须再审查”。本题只讨论中国的承认与执行程序，不预设适用的条约或互惠条件已经满足。",
    prompt:
      "能否仅凭外国判决生效就直接执行？宁禾应向什么层级的法院提出什么申请，之后还需要哪一步？",
    reference:
      "不能直接照国内生效判决划款。宁禾应向有管辖权的中级人民法院申请承认和执行这份外国判决。中国法院要依适用条约或互惠原则及法定条件审查，裁定承认其效力后，需要执行的再发出执行令。外国判决已经生效，是提出申请的基础，不等于已经获中国法院承认。",
    answer: "b",
    options: [
      {
        text: "外国判决生效后，中国任何基层法院都必须立即划款",
        explanation: "外国判决需要先经法定承认与执行审查，不能省略。",
      },
      {
        text: "向有管辖权的中级法院申请承认和执行，经审查承认后再依法执行",
        explanation: "区分外国判决在原国生效与在我国取得承认执行效力。",
      },
      {
        text: "必须把货款争议从头起诉一遍，外国判决一律不能使用",
        explanation:
          "法律提供承认与执行外国生效判决的程序，并非一律重新审理原纠纷。",
      },
      {
        text: "按照外国仲裁裁决申请即可，法院判决与仲裁裁决程序完全相同",
        explanation: "两种裁判来源不同，本题明确是外国法院判决。",
      },
    ],
    points: [
      {
        label: "向中级法院申请承认和执行",
        meaning:
          "说明应向有管辖权的中级人民法院申请承认和执行，而非直接当国内判决划款。",
        boundary: "不要求在缺少具体国别材料时判断互惠或条约是否已成立。",
      },
      {
        label: "审查承认后才能依法执行",
        meaning:
          "说明中国法院依条约或互惠原则及法定条件审查，承认后需要执行的再依法发出执行令，原国生效不等于自动承认。",
        boundary: "不要求逐一背诵全部拒绝承认事由，须有审查和承认这一环。",
      },
    ],
    sources: ["civpro-foreign-recognition-first-basis"],
  },
  {
    id: "civpro-foreign-notice-defense",
    topicId: "civpro-foreign-judgments",
    title: "没收到开庭通知的外国判决",
    facts:
      "一家外国法院作出对林禾不利的民事缺席判决，申请人现向中国有管辖权的法院申请承认和执行。中国法院审查确认：林禾在外国原诉中没有得到合法传唤，也没有合理的陈述和辩论机会，不是他自行放弃出庭；适用的规则没有排除此项程序保障。申请人称，只要判决在外国已经生效，通知和答辩机会就是外国法院自己的事，中国法院不能过问。",
    prompt:
      "中国法院对本题外国判决应否承认和执行？外国缺席判决是否仅因“缺席”两个字就一律不能承认？",
    reference:
      "本题应裁定不予承认和执行。林禾没有得到合法传唤，也没有合理陈述、辩论机会，属于法定拒绝承认事由，不能用外国判决已生效来跳过这项审查。但缺席判决并非一律不能承认；已经合法通知、得到合理答辩机会却自行不到庭的，不能只凭缺席就认定存在本题障碍。",
    answer: "d",
    options: [
      {
        text: "只要判决在外国生效，中国法院就无权审查通知程序",
        explanation: "合法传唤和合理陈述辩论机会正是法定审查事项。",
      },
      {
        text: "所有外国缺席判决均绝对不得承认，无须看通知情况",
        explanation: "缺席本身不等于未被合法通知或被剥夺答辩机会。",
      },
      {
        text: "是否承认只看判决赔偿金额，通知情况与此无关",
        explanation: "本题程序保障缺失构成法定不予承认事由。",
      },
      {
        text: "本题应不予承认和执行，但不能把所有缺席判决一概排除",
        explanation: "应依据合法传唤与合理答辩机会等具体事实审查。",
      },
    ],
    points: [
      {
        label: "本题依法拒绝承认执行",
        meaning:
          "联系未合法传唤，或者未获合理陈述、辩论机会这一法定事由，说明应裁定不予承认和执行。",
        boundary:
          "不要求把两个择一事由并列写全，也不要求改判外国法院原来的实体赔偿结论。",
      },
      {
        label: "不把缺席一概当拒绝事由",
        meaning:
          "说明缺席本身不当然排除承认，关键是合法传唤及是否获得合理陈述辩论机会。",
        boundary:
          "不要求承诺所有合法传唤后的缺席判决均必然承认；其他法定条件仍须审查。",
      },
    ],
    sources: ["civpro-foreign-notice-defense-basis"],
  },
  {
    id: "civpro-foreign-overseas-video",
    topicId: "civpro-foreign-judicial-assistance",
    title: "证人在境外，能否直接视频取证",
    facts:
      "中国法院审理一宗设备买卖纠纷，需要调查一名现居境外的证人。经核实，证据所在国法律不禁止以拟采用的即时通讯方式取证，也没有相反条约限制。证人愿意参加视频，原告已经同意，但被告明确不同意。原告要求法院立即连线，理由是证人本人愿意、技术也能接通，没有必要再征求被告意见。法院尚未通过条约或外交途径提出取证请求。",
    prompt:
      "仅凭本题现有同意，能否采用这条即时通讯取证路径？如不能，是否意味着中国法院完全不能调查这份境外证据？",
    reference:
      "不能仅凭证人和原告同意，就按这条即时通讯路径取证。该方式要求所在国法律不禁止，并经双方当事人同意；本题被告明确反对，缺少双方同意。中国法院仍可依法通过适用条约规定的方式或外交途径调查收集，不能把一种方式的条件未满足，理解为这份证据永远不能调查。",
    answer: "a",
    options: [
      {
        text: "现有同意不足以走即时通讯路径，但可依法另循条约或外交途径",
        explanation: "本题欠缺双方当事人同意，并不否定其他法定调查取证途径。",
      },
      {
        text: "只要证人本人愿意，双方当事人是否同意不重要",
        explanation: "本条即时通讯取证方式还要求双方当事人同意。",
      },
      {
        text: "被告不同意，就使一切境外取证永久成为不可能",
        explanation: "不同意仅影响本题这条取证路径，其他法定途径仍可依法采用。",
      },
      {
        text: "法院视频取证永远不受证据所在国法律限制",
        explanation: "现行法同时要求所在国法律不禁止该方式。",
      },
    ],
    points: [
      {
        label: "本次即时通讯欠缺双方同意",
        meaning:
          "联系被告明确不同意，说明虽当地法不禁止且证人同意，仍不满足双方当事人同意条件。",
        boundary: "不要求证人具有中国国籍；不能把领事取证的国籍条件套来。",
      },
      {
        label: "其他法定取证途径仍可用",
        meaning:
          "说明可以依法按照适用条约规定的方式或者外交途径调查收集，不是所有境外取证均被阻断。",
        boundary: "不要求指定具体国家、条约名称或保证外国一定协助成功。",
      },
    ],
    sources: ["civpro-foreign-overseas-video-basis"],
  },
  {
    id: "civpro-foreign-foreign-direct-investigation",
    topicId: "civpro-foreign-judicial-assistance",
    title: "外国法官能否直接来公司查账",
    facts:
      "一家外国法院审理境外商业纠纷，拟派法官到中国境内的苏州公司，查阅账簿并询问中国籍员工。双方当事人和员工都表示愿意配合，但外国法院没有依司法协助途径提出请求，也未取得中国主管机关准许。来访人员是外国法院办案人员，不是使领馆工作人员。该法院认为不使用强制手段、大家都同意，就可以自行在中国开展这些司法取证活动。",
    prompt:
      "本题当事人和员工的同意，能否代替中国主管机关准许？外国法院如请求中国协助调查，应通过什么途径办理？",
    reference:
      "不能代替。外国法院人员在中国境内开展司法取证，不能只凭当事人和员工自愿就绕过中国主管机关的准许。本题也不属于外国使领馆依法向本国公民取证的例外。请求中国法院提供司法协助，应依适用国际条约规定的途径办理；没有条约关系的，通过外交途径提出。",
    answer: "c",
    options: [
      {
        text: "所有人自愿配合，就无需任何司法协助或准许手续",
        explanation: "自愿不能替代跨境司法活动需要的法定准许与途径。",
      },
      {
        text: "外国法院直接通知公司即可，是否强制是唯一判断标准",
        explanation: "不使用强制手段也不当然允许外国法院自行来华司法取证。",
      },
      {
        text: "同意不能替代主管机关准许，应依法通过条约或外交途径请求协助",
        explanation:
          "本题是外国法院人员在我国境内调查，不适用领事对本国公民取证例外。",
      },
      {
        text: "我国法院从不协助外国法院调查任何证据",
        explanation: "法律允许依条约或互惠原则相互请求协助，不能一概拒绝。",
      },
    ],
    points: [
      {
        label: "自愿不能替代法定准许",
        meaning:
          "联系外国法院办案人员拟在中国境内查账询问、未获主管机关准许，说明双方及证人同意不足以合法化。",
        boundary:
          "只评价本题外国法院的司法取证，不推广为禁止当事人自行保存已有材料。",
      },
      {
        label: "依法通过条约或外交途径协助",
        meaning:
          "说明请求中国法院协助应依适用条约规定的途径；没有条约关系时通过外交途径。",
        boundary:
          "无需判断某个未指明国家的实际条约关系；不把领事例外当成一般法院取证权限。",
      },
    ],
    sources: ["civpro-foreign-foreign-direct-investigation-basis"],
  },
];

const topicDrafts = [
  {
    id: "civpro-foreign-jurisdiction",
    chapterId: "CIVPRO-FOREIGN-JURISDICTION",
    title: "涉外协议管辖与平行诉讼",
    headline: "外国法院也在审，不等于中国法院就不能审。",
    paragraphs: [
      "涉外纠纷可以书面协议选择中国法院，不再以与中国有实际联系为这一协议管辖的必要条件；级别、专属等法定限制仍要遵守。不要把国内协议管辖的要求直接套过来。",
      "同一纠纷已在外国法院起诉，我国法院依法有管辖权的仍可受理。外国法院先受理，当事人书面申请时，我国法院可以依法中止；选择我国法院、我国专属管辖或我国审理明显更方便的除外。外国法院未采取必要措施或未在合理期间审结，依书面申请应恢复诉讼。",
    ],
    pitfall: "把外国先立案理解成中国法院当然无权受理，或把中止当成无限期等待。",
  },
  {
    id: "civpro-foreign-service-periods",
    chapterId: "CIVPRO-FOREIGN-SERVICE-PERIODS",
    title: "涉外送达与答辩上诉期间",
    headline: "先看境内是否有住所，再看送达方式和法定期间。",
    paragraphs: [
      "向境内没有住所的当事人送达，可以依法选用条约、外交、代理人或符合法定条件的电子等方式。电子送达须能确认收悉，受送达人所在国法律禁止的不能采用；适用条约有不同规定的，按条约及我国保留处理。",
      "境内没有住所的被告收到起诉状副本后，答辩期间为30日；境内没有住所的当事人不服一审判决、裁定，上诉期间也为送达后30日。不能按期提出时可以申请延期，是否准许由法院决定。不是所有外国人都自动适用这组期间。",
    ],
    pitfall: "把境外一律当成只能外交送达，或只凭外国国籍就把普通期间改成30日。",
  },
  {
    id: "civpro-foreign-judgments",
    chapterId: "CIVPRO-FOREIGN-JUDGMENTS",
    title: "外国法院判决的承认与执行",
    headline: "外国判决生效后，仍须依法取得中国法院承认。",
    paragraphs: [
      "需要在我国承认和执行外国法院生效判决，可向有管辖权的中级法院申请。法院依适用条约或互惠原则及法定条件审查，裁定承认后，需要执行的再发出执行令。不能把外国判决直接等同于我国的执行依据。",
      "未合法传唤、没有合理陈述辩论机会等，是法定不予承认执行的事由。缺席本身不是自动拒绝的理由；还要审查相应程序保障是否给足。外国法院判决与外国仲裁裁决分开处理。",
    ],
    pitfall:
      "只看外国判决已经生效，就跳过我国承认程序；或把所有缺席判决一概排除。",
  },
  {
    id: "civpro-foreign-judicial-assistance",
    chapterId: "CIVPRO-FOREIGN-JUDICIAL-ASSISTANCE",
    title: "跨境取证与司法协助",
    headline: "能连上视频，不代表可以绕过跨境取证的法律条件。",
    paragraphs: [
      "我国法院调查境外证据，可依法按适用条约或外交途径进行。采用即时通讯方式时，须所在国法律不禁止并经双方当事人同意；证人同意不能替代双方同意。",
      "外国法院请求我国法院协助，按适用条约规定的途径办理；无条约关系的，通过外交途径。除外国使领馆依法对本国公民进行非强制送达取证等法定情形外，外国机关或个人未经我国主管机关准许，不得自行在我国境内开展相应司法送达、调查取证。",
    ],
    pitfall:
      "把当事人自愿与主管机关准许混为一谈，或把一种方式不能用当成所有取证途径都关闭。",
  },
];
function pair(item: CaseDraft): UnitExercise[] {
  const common = {
    caseId: item.id,
    relatedTopicIds: [item.topicId],
    facts: item.facts,
    prompt: item.prompt,
    hint: "先回答本题所问，再结合案情说明理由。",
    reference: item.reference,
    sources: item.sources,
  };
  const criteria: Criterion[] = item.points.map((point, index) => ({
    id: `${item.id}-${index + 1}`,
    ...point,
    acceptable: "认可法律含义相同的自然表达，不要求固定句式或条号。",
  }));
  return [
    {
      ...common,
      id: `${item.id}-choice`,
      title: `${item.title}（单选）`,
      kind: "objective",
      choiceMode: "single",
      answer: item.answer,
      options: item.options.map((option, i) => ({
        id: ["a", "b", "c", "d"][i],
        ...option,
      })),
    },
    {
      ...common,
      id: `${item.id}-written`,
      title: `${item.title}（自由作答）`,
      kind: "subjective",
      answer: "",
      prompt: `${item.prompt}请结合案情说明理由。`,
      criteria,
    },
  ];
}
export const civilProcedureForeignTopics: FaultTopic[] = topicDrafts.map(
  (topic) => {
    const related = cases.filter((item) => item.topicId === topic.id);
    const first = related[0];
    return {
      id: topic.id,
      title: topic.title,
      headline: topic.headline,
      goal: first.prompt,
      prerequisite: "知道民事诉讼用于解决当事人之间的民事争议。",
      minutes: "约8分钟",
      paragraphs: topic.paragraphs,
      pitfall: topic.pitfall,
      recall: {
        prompt: "本组两种情形的处理有什么区别？",
        reference: topic.headline,
      },
      sources: [...new Set(related.flatMap((item) => item.sources))],
      example: {
        title: first.title,
        facts: first.facts,
        analysis: first.reference,
      },
      exercises: related.flatMap(pair),
    };
  },
);
export const civilProcedureForeignChapters = topicDrafts.map((topic) => ({
  id: topic.chapterId,
  title: topic.title,
  section: "民事诉讼法",
  topicIds: [topic.id],
}));
export const civilProcedureForeignExercises =
  civilProcedureForeignTopics.flatMap((topic) => topic.exercises);
export const civilProcedureForeignContentPack = {
  revision: civilProcedureForeignRevision,
  snapshot: {
    topics: civilProcedureForeignTopics,
    sources: civilProcedureForeignSources,
  },
};
export const civilProcedureForeignDefaultQueues = {
  objective: civilProcedureForeignExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureForeignExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureForeignQuestion(id: string) {
  const question = civilProcedureForeignExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilProcedureForeignTopicForQuestion(id: string) {
  return civilProcedureForeignTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilProcedureForeignSameCaseQuestions(id: string) {
  const question = civilProcedureForeignQuestion(id);
  return question
    ? structuredClone(
        civilProcedureForeignExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilProcedureForeignChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilProcedureForeignChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilProcedureForeignTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
