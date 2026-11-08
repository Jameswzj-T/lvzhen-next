import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

// Twelve original fictional cases, paired as choice and full written forms.
export const civilProcedureArbitrationRevision =
  "civil-procedure-arbitration-2026-10-30.v1";
export const civilProcedureArbitrationSources: ContentSources = {
  "civpro-arbitration-scope-property-basis": {
    title: "《中华人民共和国仲裁法》（2025年修订）第3条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30按2026年3月1日起施行的仲裁法及所引现行解释核对。平等商事主体之间的普通设备货款合同纠纷，属于可仲裁的合同纠纷；可以通过合格仲裁协议选择商事仲裁。 继承人就遗产份额发生的继承纠纷，不能只因涉及财产而交由商事仲裁。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-arbitration-chosen-institution-basis": {
    title: "《中华人民共和国仲裁法》（2025年修订）第6条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30按2026年3月1日起施行的仲裁法及所引现行解释核对。约定的合法仲裁机构不因不在双方住所地或合同履行地而失去受理基础，商事仲裁不实行地域管辖。 不因标的额较大就自动交给所谓上一级仲裁机构，仲裁不实行法院式级别管辖。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-arbitration-agreement-independent-basis": {
    title: "《中华人民共和国仲裁法》（2025年修订）第30条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30按2026年3月1日起施行的仲裁法及所引现行解释核对。主合同被主张未成立、无效或被撤销等，不当然影响已经达成的独立仲裁协议效力。 仲裁庭有权确认主合同的效力，不必一律等待法院先判主合同有效后才能处理。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-arbitration-agreement-unclear-basis": {
    title:
      "《中华人民共和国仲裁法》（2025年修订）第27条；《中华人民共和国仲裁法》（2025年修订）第29条；《最高人民法院关于适用〈中华人民共和国仲裁法〉若干问题的解释》第4条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30按2026年3月1日起施行的仲裁法及所引现行解释核对。普通机构仲裁只写提交仲裁、机构未约定且不能从约定规则等确定，可以补充选定机构。 补充协商不能达成一致且对方及时明确否认协议时，本案仲裁协议无效，不能由申请人单方补定机构。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-arbitration-tribunal-recusal-basis": {
    title:
      "《中华人民共和国仲裁法》（2025年修订）第46条引导句、第一项；《中华人民共和国仲裁法》（2025年修订）第47条；《中华人民共和国仲裁法》（2025年修订）第48条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30按2026年3月1日起施行的仲裁法及所引现行解释核对。首席仲裁员是对方代理人的胞姐，属于法定近亲属回避情形，应当回避。 首次开庭后才知悉该事由，在最后一次开庭终结前提出申请，不因首次开庭已经结束而当然逾期。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-arbitration-preservation-before-basis": {
    title: "《中华人民共和国仲裁法》（2025年修订）第39条第一、二款",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30按2026年3月1日起施行的仲裁法及所引现行解释核对。存在紧急转移设备、可能影响将来裁决执行的事实，仲裁协议当事人可以在申请仲裁前依法向法院申请财产保全。 进入仲裁后申请保全，由仲裁机构依民诉法提交人民法院处理，不是仲裁庭直接冻结财产。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-arbitration-online-objection-basis": {
    title:
      "《中华人民共和国仲裁法》（2025年修订）第11条；《中华人民共和国仲裁法》（2025年修订）第51条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30按2026年3月1日起施行的仲裁法及所引现行解释核对。一方已经明确表示不同意在线而要求线下开庭，不能强制其采用在线仲裁活动；这不等于其放弃仲裁协议。 没有双方协议不开庭，机构或仲裁庭不能只因该方不愿线上就单方改为只阅书面材料、不开庭审理。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-arbitration-mediation-signature-basis": {
    title:
      "《中华人民共和国仲裁法》（2025年修订）第64条；《中华人民共和国仲裁法》（2025年修订）第65条；《中华人民共和国仲裁法》（2025年修订）第70条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30按2026年3月1日起施行的仲裁法及所引现行解释核对。仲裁调解书尚未双方签收，一方在其签收前反悔，该调解书尚未生效，仲裁庭应当及时作出裁决。 仲裁裁决书与调解书生效方式不同，裁决书自作出之日起发生效力，不等待双方签收。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-arbitration-vacate-period-basis": {
    title:
      "《中华人民共和国仲裁法》（2025年修订）第10条第一款；《中华人民共和国仲裁法》（2025年修订）第71条；《中华人民共和国仲裁法》（2025年修订）第72条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30按2026年3月1日起施行的仲裁法及所引现行解释核对。协议、仲裁及裁决均在2026年3月1日以后，本案收到裁决书后超过三个月才申请撤销，已超过现行72条期间，不能沿用六个月。 撤销是法定事由下的司法审查，不是对不服实体结果提起普通上诉；裁决实行一裁终局。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-arbitration-execution-stay-basis": {
    title:
      "《中华人民共和国仲裁法》（2025年修订）第75条；《中华人民共和国仲裁法》（2025年修订）第77条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30按2026年3月1日起施行的仲裁法及所引现行解释核对。生效国内裁决一方不履行，另一方可依法申请执行；另方撤销申请已依法受理时，应裁定中止执行。 撤销申请被法院裁定驳回，应当裁定恢复执行，不因申请过撤销而永久停止。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-arbitration-seat-hearing-basis": {
    title: "《中华人民共和国仲裁法》（2025年修订）第81条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30按2026年3月1日起施行的仲裁法及所引现行解释核对。涉外仲裁书面约定上海为仲裁地，后来依法在东京开庭且双方未改仲裁地，裁决仍视为在上海作出。 没有对仲裁程序适用法另作约定时，以仲裁地作为程序适用法及司法管辖法院的确定依据；开庭地点不自动取代仲裁地。 原创教学案例，人物与交易为虚构，不是官方试题。",
  },
  "civpro-arbitration-adhoc-scope-basis": {
    title: "《中华人民共和国仲裁法》（2025年修订）第82条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30按2026年3月1日起施行的仲裁法及所引现行解释核对。涉外海事属于82明确准许的类别；有书面仲裁约定、中国仲裁地、合格人员组成仲裁庭及约定规则，可以采用本条规定的非机构仲裁方式。 仲裁庭须在组庭后三个工作日内将法定信息向仲裁协会备案；本条不能泛化为无涉外纯国内纠纷一律可采用。 原创教学案例，人物与交易为虚构，不是官方试题。",
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
    id: "civpro-arbitration-scope-property",
    topicId: "civpro-arbitration-scope-institution",
    title: "都是争一笔钱，能否都交仲裁",
    facts:
      "2026年4月，泽禾公司与青屿公司因设备货款发生争议，双方签署书面协议，将这笔货款纠纷交给选定的仲裁机构处理。同月，林澄与哥哥因父亲遗产的继承份额发生争议，也签了同样形式的协议。兄妹只争各自应继承多少存款，不争身份；哥哥认为既然都是争钱，继承份额也能像设备款一样仲裁。两份协议的签署人均有完全民事行为能力，签署过程没有胁迫。",
    prompt: "这两项争议能否都按仲裁法交由商事仲裁机构处理？请分别说明原因。",
    reference:
      "设备货款可以仲裁，继承份额不能按这部仲裁法仲裁。公司间的货款是平等主体之间的合同财产纠纷，双方可以协议仲裁。兄妹争的虽是存款数额，争议的性质仍是继承纠纷，属于法律排除的范围；双方签字同意也不能改变这一点。",
    answer: "b",
    options: [
      {
        text: "两项都可仲裁，只要争议可以换算成钱即可",
        explanation: "是否涉及钱不是唯一标准，继承纠纷被法律明确排除。",
      },
      {
        text: "设备货款可以仲裁，遗产继承份额不能按仲裁法仲裁",
        explanation: "应按争议性质区分，不能用双方同意突破法定范围。",
      },
      {
        text: "两项都不能仲裁，因为处理财产只能向法院起诉",
        explanation: "平等主体的合同和其他财产权益纠纷可以协议仲裁。",
      },
      {
        text: "兄妹不争身份，继承份额便自动转为普通货款纠纷",
        explanation: "争议仍源于遗产继承，不因只争数额而改变性质。",
      },
    ],
    points: [
      {
        label: "设备货款属于可仲裁范围",
        meaning: "联系公司间设备款是平等主体合同财产纠纷，说明可按协议仲裁。",
        boundary: "不要求展开本题没有争议的协议形式或机构资格。",
      },
      {
        label: "继承争议不能因同意而纳入",
        meaning:
          "联系存款份额来自遗产继承，说明属于法定排除范围，双方同意也不能使其可仲裁。",
        boundary: "不要求另行分析法定继承份额；不以是否写出条号区分。",
      },
    ],
    sources: ["civpro-arbitration-scope-property-basis"],
  },
  {
    id: "civpro-arbitration-chosen-institution",
    topicId: "civpro-arbitration-scope-institution",
    title: "仲裁也要按所在地和金额分级吗",
    facts:
      "2026年4月，两家均在杭州的企业签订设备采购合同，书面约定将该合同争议提交广州仲裁委员会，条款名称明确，双方签字确认。签约、履行及财产均在杭州。后来发生大额货款争议，被申请人要求把案件移到杭州的仲裁机构；又称即使留在广州，金额这么大，也应移交“上一级仲裁机构”。除此之外，双方没有提出协议或受理范围方面的争议。",
    prompt: "这两个移交理由是否成立？本案应如何确定仲裁机构？",
    reference:
      "两个理由都不成立。本案按双方约定由广州仲裁委员会处理，不因双方和履行地都在杭州而改由杭州机构处理。仲裁不实行法院那样的地域和级别管辖，也不存在仅因金额大就移到“上一级仲裁机构”的规则。",
    answer: "d",
    options: [
      {
        text: "应按被申请人住所地改由杭州机构处理",
        explanation: "仲裁机构由当事人协议选定，不能直接套用法院地域管辖。",
      },
      {
        text: "可以留在广州，但必须按争议金额升至上一级机构",
        explanation: "仲裁不实行级别管辖。",
      },
      {
        text: "广州与交易没有实际联系，约定当然无效",
        explanation: "商事仲裁机构的选定不以法院协议管辖式的实际联系为条件。",
      },
      {
        text: "依约由广州仲裁委员会处理，地点和金额均不构成本题移交理由",
        explanation: "仲裁不实行地域或级别管辖，双方应按明确约定选定机构。",
      },
    ],
    points: [
      {
        label: "按协议选机构，不套地域管辖",
        meaning:
          "联系双方明确选定广州仲裁委员会，说明在杭州签约履行不要求改到杭州仲裁。",
        boundary: "不要求评价未发生的机构合并、更名或不存在的仲裁机构。",
      },
      {
        label: "金额不产生上一级管辖",
        meaning: "说明仲裁不实行级别管辖，不能仅因金额大移到上一级仲裁机构。",
        boundary: "不要求背诵机构组织制度或法院的具体标的额标准。",
      },
    ],
    sources: ["civpro-arbitration-chosen-institution-basis"],
  },
  {
    id: "civpro-arbitration-agreement-independent",
    topicId: "civpro-arbitration-agreement",
    title: "主合同有问题，仲裁条款是否一起失效",
    facts:
      "2026年5月，启川公司与远舟公司签了一份设备销售合同，并在合同中写明将本合同产生的争议提交苏州仲裁委员会。后因设备交易是否违反强制性规定发生争议，买方主张合同无效并请求返还已付款。卖方说：“整个合同无效，里面的仲裁条款也一起失效，只能去法院。”双方均未主张签订仲裁条款时存在胁迫、行为能力欠缺或仲裁事项超范围等问题。",
    prompt:
      "仅凭主合同可能无效，能否否定已经达成的仲裁条款？仲裁庭能否处理本题的合同效力争议？",
    reference:
      "不能因为主合同可能无效，就认定仲裁条款一起失效。仲裁协议独立存在，主合同是否成立、有效或被撤销，并不当然影响仲裁协议。本题双方没有提出仲裁条款自身的效力问题，仲裁庭可以确认合同效力，并在约定范围内处理返还争议。",
    answer: "a",
    options: [
      {
        text: "主合同效力与仲裁协议分别判断，仲裁庭可以确认合同效力",
        explanation: "仲裁协议独立存在，合同效力争议本身可以交给仲裁庭处理。",
      },
      {
        text: "只要一方声称合同无效，仲裁条款就立即失效",
        explanation: "当事人的主张不能自动消灭独立的仲裁协议。",
      },
      {
        text: "仲裁庭只能处理有效合同，不能判断合同效力",
        explanation: "法律明确赋予仲裁庭确认合同效力的权限。",
      },
      {
        text: "仲裁协议独立，所以主合同也一定有效",
        explanation: "独立性只解决仲裁协议效力，不预先决定主合同是否合法。",
      },
    ],
    points: [
      {
        label: "主合同效力不当然影响仲裁条款",
        meaning:
          "说明已经达成的仲裁协议独立存在，不能仅因主合同可能无效而否定它。",
        boundary: "认可自然表达；不要求列全变更、终止等所有情形。",
      },
      {
        label: "仲裁庭可以确认合同效力",
        meaning: "说明仲裁庭有权判断本题合同效力并处理约定范围内的返还争议。",
        boundary:
          "不要求考生替仲裁庭判断该交易最终有效还是无效，也不要求算返还数额。",
      },
    ],
    sources: ["civpro-arbitration-agreement-independent-basis"],
  },
  {
    id: "civpro-arbitration-agreement-unclear",
    topicId: "civpro-arbitration-agreement",
    title: "合同只写提交仲裁怎么办",
    facts:
      "2026年5月，两家国内企业的合同写着“本合同争议提交仲裁”，没有写仲裁机构，也没有约定能据以确定机构的规则。争议发生后，双方谈了补充协议，但各自坚持不同机构，没有谈成。一方随后单独向某仲裁委员会申请；另一方在首次开庭前即明确否认双方存在可据以在该机构仲裁的协议。本案没有涉外海事、特定自贸区域等特别情形。",
    prompt:
      "本题能否由申请人单方选一家机构补上缺口？双方原本可以怎样补救，未达成补充协议会怎样？",
    reference:
      "不能让申请人单方补上机构。原条款没有约定可确定的仲裁机构，双方可以另签补充协议，但本题未能达成，仲裁协议无效。对方又已经明确提出异议，不能把其收到申请材料当成默认同意由申请人选机构。",
    answer: "c",
    options: [
      {
        text: "申请人先向哪家机构申请，就自动选定哪家",
        explanation: "机构选定不能仅由一方申请代替双方约定。",
      },
      {
        text: "只写仲裁两个字，任何机构都必须受理",
        explanation: "机构没有约定或不明确且无法补充的，不能据此启动本题仲裁。",
      },
      {
        text: "不能单方补定；双方可以补充协议，补充不成则协议无效",
        explanation: "应先看能否共同补充，本题已明确未能达成。",
      },
      {
        text: "只要对方收过申请材料，就视为已经同意机构",
        explanation: "本题对方明确否认，收到材料本身也不是同意。",
      },
    ],
    points: [
      {
        label: "不能单方决定欠缺的机构",
        meaning:
          "联系原条款和规则均不能确定机构，说明申请人单方指定不能代替双方协议。",
        boundary: "不要求讨论未给出的机构名称简称、更名等识别问题。",
      },
      {
        label: "共同补充不成导致协议无效",
        meaning: "说明双方可以补充约定，但本题补充未达成，仲裁协议无效。",
        boundary: "不把收到材料等同默认同意；本题已经明确提出异议。",
      },
    ],
    sources: ["civpro-arbitration-agreement-unclear-basis"],
  },
  {
    id: "civpro-arbitration-tribunal-recusal",
    topicId: "civpro-arbitration-tribunal-preservation",
    title: "开庭后才发现仲裁员的亲属关系",
    facts:
      "2026年6月，一宗国内供货仲裁由三人仲裁庭审理。第一次开庭后，申请人拿到此前不知道的材料，发现首席仲裁员是被申请人代理人的亲姐姐。申请人随即在最后一次开庭终结前提出回避申请，并说明亲属关系和获知时间。首席仲裁员不兼任该仲裁机构主任。被申请人说，仲裁员已经开过庭，申请人现在就不能再要求回避。",
    prompt:
      "这项亲属关系是否构成回避事由？申请在首次开庭后提出，是否就必然逾期？",
    reference:
      "应当回避：代理人的亲姐姐属于近亲属，不能继续担任本案仲裁员。申请也没有因为首次开庭已结束而当然逾期；本题是开庭后才得知事由，并在最后一次开庭终结前提出，符合这一时间要求。是否回避由仲裁机构主任决定。",
    answer: "b",
    options: [
      {
        text: "必须证明已经作出偏袒裁决，才有资格提出回避",
        explanation: "近亲属关系本身就是法定回避事由，无须等偏袒裁决出现。",
      },
      {
        text: "存在应当回避的亲属关系，本题申请也没有逾期",
        explanation: "开庭后才知道的回避事由，可在最后一次开庭终结前提出。",
      },
      {
        text: "只要参加过一次开庭，任何回避事由都不能再提出",
        explanation: "法律为首次开庭后才知悉的回避事由保留了申请时间。",
      },
      {
        text: "首席仲裁员由谁选定，是否回避就只能由那一方决定",
        explanation: "本题是否回避由仲裁机构主任决定，不由选定方单独决定。",
      },
    ],
    points: [
      {
        label: "代理人的近亲属应当回避",
        meaning: "联系首席仲裁员是对方代理人的亲姐姐，说明属于法定回避事由。",
        boundary: "无须证明已经实际偏袒或裁决错误。",
      },
      {
        label: "后来才知道的申请未必逾期",
        meaning:
          "联系首次开庭后才知悉、最后一次开庭终结前申请，说明本题仍可提出。",
        boundary: "不要求写出法条号码；决定机关作为讲解，不额外计为本题必答。",
      },
    ],
    sources: ["civpro-arbitration-tribunal-recusal-basis"],
  },
  {
    id: "civpro-arbitration-preservation-before",
    topicId: "civpro-arbitration-tribunal-preservation",
    title: "还没申请仲裁，设备就要被搬走",
    facts:
      "2026年6月，景川公司与澄越公司签订含明确仲裁条款的供货合同。发生欠款后，景川取得材料，发现澄越正在集中转移仓库设备，若等仲裁启动再处理，可能已无财产可执行。景川尚未申请仲裁，愿依法提供担保，准备向有管辖权的法院申请财产保全。澄越称，有仲裁条款法院就一概不能介入，必须先由仲裁庭自己查封设备。",
    prompt:
      "景川能否在申请仲裁前向法院申请紧急财产保全？若在仲裁过程中提出这类申请，由谁提交、谁依法处理？",
    reference:
      "可以先向有管辖权的法院申请。本题情况紧急，法律允许仲裁协议当事人在申请仲裁前依法申请财产保全，不必等仲裁庭组成。进入仲裁后申请保全，由仲裁机构依法把申请提交法院，法院审查处理；仲裁庭不能仅凭仲裁条款自行查封。能申请并不等于法院不经审查就一定准许。",
    answer: "d",
    options: [
      {
        text: "有仲裁条款时，法院对任何保全均无权处理",
        explanation: "法院可以依法为仲裁提供保全支持。",
      },
      {
        text: "只有先取得最终裁决，才能申请财产保全",
        explanation: "保全可以在符合法定条件的仲裁前或仲裁中提出。",
      },
      {
        text: "先由仲裁庭自行查封，法院只负责事后登记",
        explanation: "本题财产保全应由法院依法处理，仲裁庭不能自行采取查封。",
      },
      {
        text: "紧急时可在仲裁前依法向法院申请；仲裁中由机构依法转交法院",
        explanation: "仲裁协议不排除法院保全支持，不同阶段的提交方式要分清。",
      },
    ],
    points: [
      {
        label: "紧急时可在仲裁前申请法院保全",
        meaning:
          "联系设备正被转移、等待可能无法执行，说明可在仲裁前依法向法院申请财产保全。",
        boundary: "不要求在本题给出法院名称、担保数额或保全一定获准的保证。",
      },
      {
        label: "仲裁中机构提交，法院处理",
        meaning:
          "说明仲裁中的保全申请由仲裁机构依法提交法院，由法院审查处理而非仲裁庭自己查封。",
        boundary: "限本题普通机构仲裁；不要求展开涉外临时仲裁的特别提交规则。",
      },
    ],
    sources: ["civpro-arbitration-preservation-before-basis"],
  },
  {
    id: "civpro-arbitration-online-objection",
    topicId: "civpro-arbitration-hearing-resolution",
    title: "不接受线上开庭，就只能书面审理吗",
    facts:
      "2026年7月，一宗仲裁拟通过网络视频开庭。被申请人在安排确定前书面表示，不同意线上方式，但愿意到现场参加开庭、提交材料和接受询问。双方也没有约定不开庭审理。申请人认为对方既然拒绝上线，机构就可以强制按线上安排进行，或者干脆只看双方书面材料作出裁决。",
    prompt:
      "能否无视本题的明确反对而强制在线仲裁？能否因此改为不开庭、仅依书面材料裁决？",
    reference:
      "两种做法都不妥。在线仲裁可以采用，但当事人明确不同意时不能强制按线上方式进行；本题对方愿意到现场，不是放弃参加仲裁。不开庭审理还需要当事人协议，反对线上不等于同意不开庭。本题应安排依法开庭，不能只把材料收齐就直接代替开庭。",
    answer: "a",
    options: [
      {
        text: "不能强制线上，也不能把反对线上当成同意不开庭",
        explanation: "在线方式和是否开庭是两件事，各有适用条件。",
      },
      {
        text: "只要仲裁机构技术成熟，就可忽略当事人的明确反对",
        explanation: "法律对当事人明确不同意在线方式设置了例外。",
      },
      {
        text: "反对线上就是放弃仲裁，因此只能直接驳回其主张",
        explanation: "本题当事人愿意线下参加，不能据此推定放弃。",
      },
      {
        text: "反对线上即可改为纯书面裁决，不需要任何协议",
        explanation: "不开庭审理需要当事人协议，不能用反对线上替代。",
      },
    ],
    points: [
      {
        label: "明确不同意时不能强制在线",
        meaning:
          "联系书面反对线上但愿线下参加，说明不能强制本次在线方式，也不是放弃仲裁。",
        boundary: "不把本人设备能力当成额外必要条件。",
      },
      {
        label: "不开庭另需当事人协议",
        meaning:
          "联系双方未约定不开庭，说明不能因反对线上就直接仅凭书面材料裁决。",
        boundary: "不要求仲裁程序在任何案件都必须线上或都必须线下。",
      },
    ],
    sources: ["civpro-arbitration-online-objection-basis"],
  },
  {
    id: "civpro-arbitration-mediation-signature",
    topicId: "civpro-arbitration-hearing-resolution",
    title: "调解书还没签收，一方反悔了",
    facts:
      "2026年7月，仲裁庭调解一宗付款纠纷，并制作调解书。申请人已经签收，被申请人在签收前明确反悔，拒绝接收。仲裁庭随后依法继续审理并作出裁决。被申请人又说：“调解书我没签，裁决书我也不签收，两份文书都不会生效。”这里的拒绝签收不涉及送达程序是否合法的争议。",
    prompt:
      "调解书此时是否生效，反悔后仲裁庭应怎样处理？裁决书是否也要等双方签收才生效？",
    reference:
      "调解书尚未生效，因为还没有经双方签收；被申请人在签收前反悔，仲裁庭应及时作出裁决。裁决书不同，它自作出之日起发生法律效力，不以双方签收为生效条件。不能通过拒签裁决书，把已经作出的裁决挡在生效之前。",
    answer: "c",
    options: [
      {
        text: "申请人一方签收，调解书就已经对双方生效",
        explanation: "仲裁调解书须经双方当事人签收。",
      },
      {
        text: "调解书没有生效，仲裁庭只能永远等待对方改变主意",
        explanation: "签收前反悔，仲裁庭应及时作出裁决。",
      },
      {
        text: "调解书尚未生效，应及时裁决；裁决书自作出日起生效",
        explanation: "两类文书的生效节点不同，不能用拒签裁决书阻止其生效。",
      },
      {
        text: "调解书和裁决书都必须经双方签收才有法律效力",
        explanation: "裁决书自作出之日起生效，不适用调解书的双签收规则。",
      },
    ],
    points: [
      {
        label: "调解未双签收，反悔后及时裁决",
        meaning:
          "联系被申请人在签收前反悔，说明调解书尚未生效，仲裁庭应及时作出裁决。",
        boundary:
          "不要求证明反悔者有正当理由，也不讨论题外已生效调解书的救济。",
      },
      {
        label: "裁决作出即生效",
        meaning:
          "说明裁决书自作出之日起生效，不必等双方签收，拒签不能阻止生效。",
        boundary: "本项不要求把执行申请期间与裁决生效日期混在一起计算。",
      },
    ],
    sources: ["civpro-arbitration-mediation-signature-basis"],
  },
  {
    id: "civpro-arbitration-vacate-period",
    topicId: "civpro-arbitration-judicial-review",
    title: "拿着旧书的六个月期限申请撤销",
    facts:
      "两家国内企业在2026年3月订立仲裁协议并开始仲裁程序，裁决于同年4月作出。败诉方于4月10日收到裁决书，8月12日才向仲裁机构所在地的中级法院申请撤销。它主张裁决依据的一份文件是伪造的，称律师虽提醒应尽快申请，但旧辅导书写的是六个月，所以一直未提出。其间不存在不可抗力或其他妨碍申请的情况。该方还要求法院像二审一样重新全面判断合同价款和履行情况。",
    prompt:
      "按本题适用的现行法，撤销申请是否在法定期间内？撤销审查是否等于对仲裁裁决进行一次普通上诉审理？",
    reference:
      "申请已经超过三个月的法定期间。现行仲裁法从收到裁决书之日起计算三个月，本题4月10日收到、8月12日才申请，不能依据旧书的六个月来认定及时。撤销也不是仲裁的二审；法院针对法定撤销事由进行司法审查，不按普通上诉把合同事实和价款重新全面审一遍。主张证据伪造，仍须依法提出证据，不能因此忽略申请期限。",
    answer: "b",
    options: [
      {
        text: "未满六个月，申请及时，法院必须全面重审合同争议",
        explanation: "本题适用新法三个月，撤销也不是普通上诉。",
      },
      {
        text: "已超过三个月，且撤销审查不等于普通二审",
        explanation: "应分别判断申请期限与法定司法审查范围。",
      },
      {
        text: "主张证据伪造，就没有任何撤销申请期限",
        explanation: "主张法定事由不能直接取消法律规定的申请期限。",
      },
      {
        text: "一裁终局意味着法院绝对不能审查任何仲裁裁决",
        explanation: "一裁终局不排除法定撤销或不予执行审查。",
      },
    ],
    points: [
      {
        label: "收到后超过三个月，申请已迟",
        meaning:
          "以收到裁决书起三个月说明4月10日至8月12日的申请超过法定期间，不能沿用六个月。",
        boundary:
          "不强求推算具体截止日；本题日期远超三个月且已排除妨碍申请的情形。",
      },
      {
        label: "撤销不是普通二审",
        meaning:
          "说明法院按法定撤销事由审查，不因不服裁决就重新全面审理合同实体争议。",
        boundary: "可指出伪造证据是法定事由，但不要求在本题判断文件最终真假。",
      },
    ],
    sources: ["civpro-arbitration-vacate-period-basis"],
  },
  {
    id: "civpro-arbitration-execution-stay",
    topicId: "civpro-arbitration-judicial-review",
    title: "申请撤销时，裁决是否还继续执行",
    facts:
      "2026年8月，一宗国内仲裁裁决作出后，胜诉方申请执行；另一方在法定期间内申请撤销，法院已受理撤销申请。执行程序正准备处分一项财产，双方分别主张“执行必须照常进行”和“只要申请撤销，执行就要彻底结束”。后来，撤销申请被裁定驳回，且没有其他需要暂停执行的事由。",
    prompt:
      "撤销申请受理后，执行程序应怎样处理？本题撤销申请被驳回后，又应怎样处理？",
    reference:
      "应先裁定中止执行，既不是继续处分，也不是彻底终结。后来撤销申请被驳回，法院应裁定恢复执行。只有裁决被撤销，才应终结对该裁决的执行；“申请撤销”和“已经撤销”不能当成同一件事。",
    answer: "d",
    options: [
      {
        text: "申请执行在前，后来的撤销申请对执行完全没有影响",
        explanation: "法律规定申请执行与申请撤销并存时应中止执行。",
      },
      {
        text: "只要提出撤销，执行依据就永久消失",
        explanation: "申请不等于裁决已被撤销，应区分中止和终结。",
      },
      {
        text: "撤销申请被驳回后，必须重新仲裁才能执行",
        explanation: "裁决未被撤销，本题应恢复已有执行程序。",
      },
      {
        text: "先中止执行，撤销申请被驳回后恢复执行",
        explanation: "两步分别对应撤销审查进行中和申请被驳回后的状态。",
      },
    ],
    points: [
      {
        label: "撤销审查期间中止执行",
        meaning:
          "联系已有执行申请、另一方申请撤销且法院已受理，说明应裁定中止而非继续或终结。",
        boundary: "不把中止误说为已撤销裁决或消灭债权。",
      },
      {
        label: "驳回撤销后恢复执行",
        meaning: "联系撤销申请已被驳回，说明应裁定恢复执行。",
        boundary: "不要求胜诉方重新仲裁；题目已排除其他暂停事由。",
      },
    ],
    sources: ["civpro-arbitration-execution-stay-basis"],
  },
  {
    id: "civpro-arbitration-seat-hearing",
    topicId: "civpro-arbitration-foreign-seat",
    title: "约定上海仲裁地，却到东京开庭",
    facts:
      "2026年8月，一家中国公司与一家日本公司就跨境设备采购订立书面仲裁协议，明确约定上海为仲裁地，未另行约定仲裁程序适用法。仲裁开始后，为方便境外证人，双方同意仅将一次实体开庭安排在东京，并明确不变更上海仲裁地。裁决随后作出。一方称“既然在东京开了庭，裁决就自动成了在日本作出的裁决”。",
    prompt:
      "本题开庭安排是否改变仲裁地，裁决应视为在哪里作出？在未另约定程序适用法的情况下，哪个地点用于确定相应程序法和司法管辖依据？",
    reference:
      "仲裁地仍是上海，裁决视为在上海作出。东京只是这次实际开庭的地点，双方已经明确不变更仲裁地。未另行约定仲裁程序适用法时，依法以约定的仲裁地作为程序适用法和司法管辖法院的确定依据，不能只看人在哪里开过庭。",
    answer: "a",
    options: [
      {
        text: "仍以上海为仲裁地，裁决视在上海作出，并依仲裁地规则确定相应程序法及司法管辖依据",
        explanation: "实际开庭地点不自动取代书面约定的仲裁地。",
      },
      {
        text: "只要有一次境外开庭，仲裁地就必然变成该境外城市",
        explanation: "开庭安排与仲裁地约定是两回事，本题明确未变更。",
      },
      {
        text: "裁决作出地只看仲裁员签字时身处何处",
        explanation: "本题依法视为在仲裁地作出，不能用签字物理地点替代。",
      },
      {
        text: "仲裁地只是交通安排，与程序法和司法管辖毫无关系",
        explanation: "现行法赋予涉外仲裁地明确的程序法和司法管辖意义。",
      },
    ],
    points: [
      {
        label: "实际开庭地点不改约定仲裁地",
        meaning:
          "联系书面约定上海且明确未变更，说明仲裁地仍上海，裁决视为在上海作出。",
        boundary: "不要求评价东京场地租用或外国法院的具体法律制度。",
      },
      {
        label: "以仲裁地确定程序法及司法管辖依据",
        meaning:
          "联系没有另行约定程序适用法，说明依法以仲裁地作为相应程序法和司法管辖的确定依据。",
        boundary:
          "不要求在本题列出某一家具体法院；不把该结论扩成所有案件都无须看其他管辖条款。",
      },
    ],
    sources: ["civpro-arbitration-seat-hearing-basis"],
  },
  {
    id: "civpro-arbitration-adhoc-scope",
    topicId: "civpro-arbitration-foreign-seat",
    title: "涉外海事能否不交机构而组庭",
    facts:
      "2026年9月，一家中国航运公司与一家外国船东因国际运输船舶租赁发生海事合同纠纷。双方书面约定以中国上海为仲裁地，由符合法定任职条件的人员组成仲裁庭，按约定规则仲裁，不交由仲裁机构管理。仲裁庭刚组成，尚未办理备案。另一家企业听说后认为，任何两家境内企业之间、没有涉外因素的普通货款纠纷，也都可直接照此办理，不必再选择仲裁机构。",
    prompt:
      "本题涉外海事纠纷能否采用这种组庭方式，仲裁庭还应履行什么备案要求？能否把这一特别规则推广到所述纯国内普通货款纠纷？",
    reference:
      "这宗涉外海事纠纷可以采用该特别方式。双方有书面约定，以我国为仲裁地，人员和规则也符合题设要求；仲裁庭应在组庭后三个工作日内，将当事人名称、仲裁地、仲裁庭组成和仲裁规则向仲裁协会备案。但这不是向所有纠纷开放的通道，纯国内普通货款纠纷不能仅凭双方同意套用这项涉外特别规则。",
    answer: "c",
    options: [
      {
        text: "所有仲裁都只能由机构管理，本题方式绝对不允许",
        explanation: "现行法对符合条件的涉外海事等纠纷规定了特别组庭方式。",
      },
      {
        text: "所有国内货款争议均可采用，而且组庭后不必备案",
        explanation: "忽略了特别适用范围与三个工作日备案要求。",
      },
      {
        text: "本题可采用，应在组庭后三个工作日内向仲裁协会备案；不能泛化到纯国内普通货款纠纷",
        explanation: "应同时注意涉外海事类别、组庭条件、备案和适用边界。",
      },
      {
        text: "只有双方都在自贸区登记，涉外海事纠纷才可采用",
        explanation:
          "涉外海事本身是法定适用类别，不要求额外叠加自贸区企业条件。",
      },
    ],
    points: [
      {
        label: "涉外海事可依法组庭并及时备案",
        meaning:
          "联系涉外海事、书面约定、我国仲裁地及合格人员规则，说明可用此方式，并应在组庭后三个工作日内向仲裁协会备案。",
        boundary:
          "不要求逐项背出全部备案材料；不把自贸区企业条件额外加到涉外海事。",
      },
      {
        label: "不推广为纯国内纠纷普遍可用",
        meaning:
          "说明法定特别范围不能仅凭当事人同意扩大，本题所述纯国内普通货款纠纷不能直接照用。",
        boundary:
          "不要求列全法律规定的所有特定区域，也不要求讨论本题没有给出的涉外连接点。",
      },
    ],
    sources: ["civpro-arbitration-adhoc-scope-basis"],
  },
];

const topicDrafts = [
  {
    id: "civpro-arbitration-scope-institution",
    chapterId: "CIVPRO-ARBITRATION-SCOPE-INSTITUTION",
    title: "仲裁范围与机构选定",
    headline: "先看争议能否仲裁，再看双方选了哪家机构。",
    paragraphs: [
      "平等主体的合同和其他财产权益纠纷可以协议仲裁。婚姻、收养、监护、扶养、继承纠纷以及依法应由行政机关处理的行政争议，不能按本法仲裁。争的是钱，也可能属于继承等排除事项。",
      "仲裁机构由当事人协议选定，不实行法院那样的级别和地域管辖。合同在外地履行、金额较大，都不直接否定双方对机构的明确选择。",
    ],
    pitfall: "把涉及钱等同可仲裁，或把法院的地域、级别规则直接搬到仲裁。",
  },
  {
    id: "civpro-arbitration-agreement",
    chapterId: "CIVPRO-ARBITRATION-AGREEMENT",
    title: "仲裁协议的效力与独立性",
    headline: "主合同有争议，先别把仲裁条款一起推翻。",
    paragraphs: [
      "仲裁协议独立存在。主合同是否成立、有效、被撤销或终止，不当然影响已经达成的仲裁协议；仲裁协议自身是否有效仍要单独看。仲裁庭有权确认合同效力。",
      "通常应约明请求仲裁的意思、仲裁事项和机构。机构或事项不明确，可以补充协议；补充不成的，协议无效。申请人单方选机构不能代替共同约定。",
    ],
    pitfall:
      "一说主合同无效就认定仲裁条款失效，或者把单方申请当成双方已经选定机构。",
  },
  {
    id: "civpro-arbitration-tribunal-preservation",
    chapterId: "CIVPRO-ARBITRATION-TRIBUNAL-PRESERVATION",
    title: "仲裁员回避与法院保全",
    headline: "仲裁员有应回避的关系要处理，财产要保住则依法申请法院。",
    paragraphs: [
      "仲裁员是当事人或代理人的近亲属等，依法应回避。首次开庭后才知道回避事由的，可以在最后一次开庭终结前提出；不能仅以开过庭为由封住申请。",
      "情况紧急时，仲裁协议当事人可在申请仲裁前依法向法院申请财产或行为保全。仲裁中申请此类保全，由仲裁机构依法提交法院处理，仲裁庭不是自行查封的执行机关。",
    ],
    pitfall:
      "把首次开庭后新发现的回避事由一律当成逾期，或认为约了仲裁法院就不能保全。",
  },
  {
    id: "civpro-arbitration-hearing-resolution",
    chapterId: "CIVPRO-ARBITRATION-HEARING-RESOLUTION",
    title: "仲裁审理、调解与裁决",
    headline: "线上不是唯一方式，调解书和裁决书也不是同一个生效节点。",
    paragraphs: [
      "仲裁可以在线进行，但当事人明确不同意时除外。通常应开庭；只有当事人协议不开庭，仲裁庭才可以依书面材料裁决。反对线上不等于同意不开庭。",
      "调解书经双方签收生效，一方在签收前反悔，应及时作出裁决。裁决书则自作出日起生效，不以双方签收为条件；拒签不能用来阻止裁决生效。",
    ],
    pitfall: "把线上与不开庭混为一谈，或认为不签收裁决书就一直不生效。",
  },
  {
    id: "civpro-arbitration-judicial-review",
    chapterId: "CIVPRO-ARBITRATION-JUDICIAL-REVIEW",
    title: "仲裁撤销与执行",
    headline: "撤销是法定司法审查，不是仲裁的第二审。",
    paragraphs: [
      "现行仲裁法规定，申请撤销裁决应自收到裁决书起三个月内提出。法院按法定撤销事由审查，不因为当事人不服就全面重审实体争议。不要再套旧书六个月。",
      "一方申请执行，另一方申请撤销，法院应裁定中止执行。裁决被撤销，终结执行；撤销申请被驳回，恢复执行。另有不予执行的法定审查机制，一裁终局不等于没有司法监督。",
    ],
    pitfall: "把提出撤销申请当成裁决已经被撤销，或者误把司法审查当作普通上诉。",
  },
  {
    id: "civpro-arbitration-foreign-seat",
    chapterId: "CIVPRO-ARBITRATION-FOREIGN-SEAT",
    title: "涉外仲裁地与特别组庭",
    headline: "仲裁地是法律上的连接点，开庭地点可能只是方便安排。",
    paragraphs: [
      "涉外仲裁可书面约定仲裁地，裁决视为在仲裁地作出。未另行约定程序适用法时，以仲裁地作为程序法及司法管辖的确定依据；异地开一次庭不自动改变该约定。",
      "涉外海事纠纷，以及法定特定区域内登记企业之间的涉外纠纷，可在法定条件下约定以我国为仲裁地，由合格人员按约定规则组成仲裁庭。组庭后三个工作日内须向仲裁协会备案；不能把此特别规则推广为所有纯国内纠纷都可自由组庭。",
    ],
    pitfall: "只看实际开庭城市判断裁决作出地，或忽略特别组庭的适用范围与备案。",
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
export const civilProcedureArbitrationTopics: FaultTopic[] = topicDrafts.map(
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
export const civilProcedureArbitrationChapters = topicDrafts.map((topic) => ({
  id: topic.chapterId,
  title: topic.title,
  section: "民事诉讼法",
  topicIds: [topic.id],
}));
export const civilProcedureArbitrationExercises =
  civilProcedureArbitrationTopics.flatMap((topic) => topic.exercises);
export const civilProcedureArbitrationContentPack = {
  revision: civilProcedureArbitrationRevision,
  snapshot: {
    topics: civilProcedureArbitrationTopics,
    sources: civilProcedureArbitrationSources,
  },
};
export const civilProcedureArbitrationDefaultQueues = {
  objective: civilProcedureArbitrationExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureArbitrationExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureArbitrationQuestion(id: string) {
  const question = civilProcedureArbitrationExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilProcedureArbitrationTopicForQuestion(id: string) {
  return civilProcedureArbitrationTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilProcedureArbitrationSameCaseQuestions(id: string) {
  const question = civilProcedureArbitrationQuestion(id);
  return question
    ? structuredClone(
        civilProcedureArbitrationExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilProcedureArbitrationChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilProcedureArbitrationChapters.find(
    (c) => c.id === chapterId,
  );
  return chapter
    ? civilProcedureArbitrationTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
