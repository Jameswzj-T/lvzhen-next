import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

// Twelve original fictional cases, paired as choice and full written forms.
export const civilProcedureExecutionRevision =
  "civil-procedure-execution-2026-10-29.v1";
export const civilProcedureExecutionSources: ContentSources = {
  "civpro-execution-application-court-basis": {
    title: "《民事诉讼法》第235条第1款",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民诉法及对应执行程序司法解释核对。普通生效二审金钱给付判决，可向原第一审法院或与其同级的被执行财产所在地法院申请执行，不因二审生效就必须向二审法院申请。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-execution-application-term-basis": {
    title: "《民事诉讼法》第250条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民诉法及对应执行程序司法解释核对。法律文书规定分期履行的，申请执行两年从最后一期履行期限届满起算，不从原判生效或每一期各自起算。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-execution-over-freeze-basis": {
    title:
      "《民事诉讼法》第253条第1款；《民事诉讼法》第236条；《执行异议和复议规定》（2020年修正）第7条第1款引句及第1项",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民诉法及对应执行程序司法解释核对。可分银行存款冻结明显超过全部执行义务，应通过向负责执行法院提出书面执行行为异议纠正，而非案外人权属之诉。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-execution-conduct-reconsideration-basis": {
    title: "《民事诉讼法》第236条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民诉法及对应执行程序司法解释核对。对执行行为异议裁定不服，自裁定送达起10日内向上一级法院申请复议；不是15日案外人执行异议之诉。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-execution-outsider-machine-basis": {
    title:
      "《民事诉讼法》第238条；《执行异议之诉解释》（法释〔2025〕10号）第1条第1款；《执行异议之诉解释》（法释〔2025〕10号）第3条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民诉法及对应执行程序司法解释核对。原执行依据只判金钱债务，未处理机器权属；案外人主张自有机器排除执行，应先向负责执行该标的的法院提出书面标的异议。 异议被驳回且与原执行依据无关，可自驳回裁定送达起15日向作出该裁定的执行法院提异议之诉；若经诉讼判排除执行，同时处理解除执行措施。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-execution-outsider-judgment-basis": {
    title: "《民事诉讼法》第238条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民诉法及对应执行程序司法解释核对。案外人的异议实质指向作为本次执行依据的原生效判决、裁定本身错误，异议被驳回后依审判监督程序办理，不套行为复议或与原判无关的执行异议之诉。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-execution-subsistence-basis": {
    title: "《民事诉讼法》第254条第1款",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民诉法及对应执行程序司法解释核对。工资等收入可以在履行义务范围内扣留提取，但须保留被执行人及所扶养家属的生活必需费用。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-execution-guarantee-basis": {
    title:
      "《民事诉讼法》第242条；《执行担保规定》（2020年修正）第2条；《执行担保规定》（2020年修正）第6条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民诉法及对应执行程序司法解释核对。提供执行担保并经申请执行人依法同意，仍由法院决定是否及在何期限内暂缓；担保人或被执行人单方表示不能自动停止。 法院决定的暂缓期限届满仍不履行，可依法执行所提供的担保财产。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-execution-settlement-default-basis": {
    title:
      "《民事诉讼法》第241条；《执行和解规定》（2020年修正）第9条；《执行和解规定》（2020年修正）第17条第1句",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民诉法及对应执行程序司法解释核对。执行和解只部分履行后再违约，申请执行人可选择申请恢复原生效法律文书执行，不必先另诉取得新判。 恢复后已实际履行部分应依法扣除，不能把已还款再重复执行。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-execution-distribution-basis": {
    title:
      "《民诉法解释》（2022年修正）第506条；《民诉法解释》（2022年修正）第507条；《民诉法解释》（2022年修正）第508条",
    url: "https://www.quanzhou.gov.cn/zfb/xxgk/zfxxgkzl/fgwj/sfjs/202304/t20230412_2868534.htm",
    note: "2026-10-29按现行民诉法及对应执行程序司法解释核对。被执行人为自然人，财产不足清偿全部债权，其他已持执行依据的普通金钱债权人可在执行开始后、财产执行终结前申请参与分配。 先扣执行费用、清偿优先债权，普通债权原则按参与分配债权比例受偿；不是先申请者当然独占。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-execution-stay-resume-basis": {
    title:
      "《民事诉讼法》第267条引句及第1项、末款；《民事诉讼法》第268条引句及第2项",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民诉法及对应执行程序司法解释核对。申请执行人表示可以延期，法院应裁定中止执行；中止情形消失后恢复执行，不意味着债务被免除或原判失效。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-execution-reversal-basis": {
    title: "《民事诉讼法》第244条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民诉法及对应执行程序司法解释核对。执行完毕后据以执行的原裁判确有错误并被法院撤销，法院应裁定责令取得财产者返还；拒不返还可强制执行，不必另提返还之诉重新取得新判。 原创教学案例，人物与金额为虚构，不是官方试题。",
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
    id: "civpro-execution-application-court",
    topicId: "civpro-execution-start",
    title: "二审生效后向哪家法院申请执行",
    facts:
      "甲区基层法院一审判令海川公司向宁禾支付20万元。市中级法院二审维持原判，判决已生效，履行期也已届满，公司仍未付款。公司可供执行的财产在乙区，乙区也设有基层法院；目前尚无法院受理执行。宁禾准备申请执行，有人说既然由中级法院作出终审判决，就只能找该中级法院。",
    prompt:
      "宁禾可以向哪些法院申请执行？是否只能向作出终审判决的中级法院申请？",
    reference:
      "宁禾可以向一审的甲区基层法院申请，也可以向与一审法院同级、财产所在地的乙区基层法院申请。二审判决生效，不会把执行管辖一律转给终审中级法院。申请执行看一审法院和同级财产所在地法院，不是只看最后由谁判案。",
    answer: "b",
    options: [
      {
        text: "只能向市中级法院申请，因为终审法院必然负责执行",
        explanation: "民事生效判决的执行管辖不以终审法院为唯一标准。",
      },
      {
        text: "可向甲区或乙区基层法院申请，不因二审判决生效就只能找中级法院",
        explanation:
          "两家基层法院分别是一审法院和同级财产所在地法院，符合本题执行管辖。",
      },
      {
        text: "只能向乙区基层法院申请，一审法院不能执行外区财产",
        explanation: "一审法院也有法定执行管辖，不因财产在另一辖区就被排除。",
      },
      {
        text: "只能重新起诉请求付款，原判不能直接用于执行",
        explanation: "生效给付判决履行期已满而未履行，可以依法申请执行。",
      },
    ],
    points: [
      {
        label: "识别两个法定执行法院",
        meaning:
          "说明可向甲区一审法院，或者同级财产所在地乙区基层法院申请执行。",
        boundary: "本题未发生多个法院先后受理，不要求讨论先立案优先。",
      },
      {
        label: "不把终审法院当唯一入口",
        meaning: "说明由中级法院终审不等于必须由中级法院执行。",
        boundary: "不否定依法提级执行等本题没有涉及的情形。",
      },
    ],
    sources: ["civpro-execution-application-court-basis"],
  },
  {
    id: "civpro-execution-application-term",
    topicId: "civpro-execution-start",
    title: "分期付款的申请执行期间",
    facts:
      "生效判决要求陈启分两期向许清支付10万元：第一期5万元应于2024年1月31日前支付，最后一期5万元应于2024年12月31日前支付。陈启两期均未付款。2026年10月15日，许清就全部10万元申请执行。题设没有申请执行时效中止、中断等情况。陈启提出第一期到期已超过两年，要求法院认定第一期申请执行已经超期。",
    prompt:
      "本题两年的申请执行期间从何时起算？许清对第一期款项的申请是否已经超过该期间？",
    reference:
      "应从最后一期履行期限届满之日，即2024年12月31日起计算两年的申请执行期间。法律文书规定分期履行的，不逐期单独计算这一期限。许清在2026年10月15日申请，尚未超过最后一期届满后两年，因此第一期款项也未因其自身到期较早而超期。",
    answer: "d",
    options: [
      {
        text: "各期分别从各自到期日起算，第一期已超期",
        explanation:
          "这里是法律文书规定分期履行，申请执行期间从最后一期期限届满时计算。",
      },
      {
        text: "从判决生效日起算两年，是否写明履行期限不重要",
        explanation: "法律文书有履行期限，应依该期限及分期履行规则起算。",
      },
      {
        text: "债务始终未还，申请执行就没有期间限制",
        explanation: "申请执行有两年期间，本题也没有中止、中断等事实。",
      },
      {
        text: "从最后一期届满之日起计算两年，本次申请未超期",
        explanation: "判决规定分期履行，依法从最后一期履行期限届满时起算。",
      },
    ],
    points: [
      {
        label: "最后一期届满起算两年",
        meaning:
          "联系判决规定分期履行，说明从最后一期2024年12月31日期限届满起算两年。",
        boundary: "不要求推算到期日的节假日顺延，本案申请明显早于期满。",
      },
      {
        label: "第一期也未超期",
        meaning:
          "说明2026年10月15日申请未超过上述两年，第一期不另从其自身到期日单算。",
        boundary:
          "仅判断申请期间，不要求讨论法院受理后审查时效抗辩的完整流程。",
      },
    ],
    sources: ["civpro-execution-application-term-basis"],
  },
  {
    id: "civpro-execution-over-freeze",
    topicId: "civpro-execution-conduct",
    title: "冻结金额远超本案债务",
    facts:
      "一宗金钱给付案件正在甲区法院执行。法院已核算，被执行人周宁应履行的本金、利息和执行费用合计5.2万元，却把其银行账户内20万元现金全部冻结，冻结额度也设为20万元。这笔现金可以按金额部分冻结，不存在其他案件冻结、优先债权或不能分割的财产。周宁不争债务，只认为冻结金额太多，想立即纠正。",
    prompt:
      "周宁应通过什么程序、向哪家法院提出？法院审查认为理由成立后，应怎样处理超出部分？",
    reference:
      "周宁可以向负责执行的甲区法院提出书面执行行为异议。本题应履行5.2万元，却冻结可分割现金20万元，执行措施超出了履行义务范围。理由成立，应依法改正冻结额度，解除超出范围的冻结；不是把这5.2万元债务也一并取消。",
    answer: "a",
    options: [
      {
        text: "向甲区执行法院提出书面行为异议，成立后改正冻结额度",
        explanation:
          "争议在冻结行为的范围，属于执行行为异议；合理范围内仍可继续执行。",
      },
      {
        text: "向原审法院申请再审，只有改判才能调整冻结额度",
        explanation: "周宁不争原判债务，问题出在执行行为，不需要先改变判决。",
      },
      {
        text: "直接提起案外人执行异议之诉，要求排除全部执行",
        explanation: "周宁是被执行人，也未主张财产属于案外人，救济种类不符。",
      },
      {
        text: "只能向银行投诉，法院没有权限改变自己的冻结措施",
        explanation:
          "冻结由法院作出，法定书面异议正是要求审查、纠正执行行为的途径。",
      },
    ],
    points: [
      {
        label: "向执行法院提书面行为异议",
        meaning:
          "说明周宁争的是冻结范围，应向甲区负责执行的法院提出书面执行行为异议。",
        boundary: "不要求背条号，不混成案外人所有权异议。",
      },
      {
        label: "改正超范围冻结",
        meaning:
          "联系5.2万元义务与20万元可分割现金，说明应改正并解除超出部分，而非取消全部债务。",
        boundary: "不要求机械计算14.8万元，明确只纠正超出部分即可。",
      },
    ],
    sources: ["civpro-execution-over-freeze-basis"],
  },
  {
    id: "civpro-execution-conduct-reconsideration",
    topicId: "civpro-execution-conduct",
    title: "行为异议被驳回后的救济",
    facts:
      "林安认为执行法院在拍卖其设备时没有依法完成应有的通知程序，已经向该法院提出书面执行行为异议。法院裁定驳回，并于本月3日送达林安。到本月9日，林安仍不服，准备提出救济。设备确属林安，争议不涉及案外人所有权，也不涉及原判认定的债务。",
    prompt:
      "林安对这份执行行为异议裁定不服，应采用什么救济方式？向哪一级法院、在多长期间内提出？",
    reference:
      "应自裁定送达之日起10日内，向上一级人民法院申请复议。本月3日送达、9日提出，尚在期间内。这是对执行行为异议裁定的复议，不是案外人执行异议之诉，也不适用普通一审判决的上诉方式。",
    answer: "c",
    options: [
      {
        text: "在15日内向原执行法院提起执行异议之诉",
        explanation: "这是把案外人标的异议裁定后的救济套到了行为异议上。",
      },
      {
        text: "在15日内向上一级法院提起普通上诉",
        explanation: "执行行为异议裁定的救济是法定复议，不是普通判决上诉。",
      },
      {
        text: "在裁定送达后10日内向上一级法院申请复议",
        explanation: "对执行行为异议裁定不服，适用十日、上一级、复议这一救济。",
      },
      {
        text: "只能再向同一法院重复提出完全相同的异议",
        explanation: "已有异议裁定后可依法向上一级复议，无须重复提交同一申请。",
      },
    ],
    points: [
      {
        label: "采用上一级复议",
        meaning:
          "说明应向上一级人民法院申请复议，而非提起案外人异议之诉或普通上诉。",
        boundary: "无需写上一级法院的具体名称。",
      },
      {
        label: "十日期间内提出",
        meaning: "说明从裁定送达之日起10日内，本案3日送达9日申请尚未超期。",
        boundary: "不把题目第9日当成法定九日。",
      },
    ],
    sources: ["civpro-execution-conduct-reconsideration-basis"],
  },
  {
    id: "civpro-execution-outsider-machine",
    topicId: "civpro-execution-outsider",
    title: "别人的机器被当作债务人财产执行",
    facts:
      "甲区法院执行乙公司欠丙的普通借款判决，查封了乙仓库里的一台机器，尚未拍卖或交付。丁公司提交购买和出借记录，称机器是自己所有、只是借给乙使用；原借款判决没有审理或处理这台机器的归属。丁已就机器提出书面案外人异议，甲区法院实体审查后裁定驳回，裁定已送达丁5日。丁仍坚持所有权足以排除本案执行，准备继续寻求救济。",
    prompt:
      "丁此前提出的是什么异议？对这份裁定仍不服，应在何时向哪家法院提起何种诉讼？",
    reference:
      "丁主张机器属于自己、不能拿来偿还乙的借款，属于案外人对执行标的提出的书面异议。该异议已被驳回，而且争议与原借款判决无关，丁可自裁定送达之日起15日内，向作出异议裁定的甲区执行法院提起执行异议之诉。本题已送达5日，仍可及时起诉；提出诉讼不等于法院已确认机器归丁。",
    answer: "b",
    options: [
      {
        text: "属于执行行为异议，丁只能在10日内向上一级申请复议",
        explanation: "丁争的是自己对机器的权利，不只是查封程序是否规范。",
      },
      {
        text: "属于案外人标的异议，驳回后15日内可向甲区执行法院提起执行异议之诉",
        explanation:
          "机器归属未由原借款判决处理，丁经过异议前置后，可以走相应诉讼救济。",
      },
      {
        text: "只能申请撤销乙欠丙借款的原判，不能另诉",
        explanation:
          "丁不否定借款债务，原判也未处理机器归属，不必通过改变该借款判决救济。",
      },
      {
        text: "出借记录一提交，法院就必须立刻确认丁所有并终止整个执行案",
        explanation:
          "是否享有足以排除执行的权利仍须审查，本案其他财产执行也不因此一并结束。",
      },
    ],
    points: [
      {
        label: "识别案外人标的异议",
        meaning:
          "联系丁以自己的机器所有权排除乙债务执行，说明是案外人对执行标的的书面异议。",
        boundary: "不要求已判定丁必然胜诉，应识别主张性质。",
      },
      {
        label: "驳回后向执行法院提异议之诉",
        meaning:
          "联系原借款判决未处理机器归属，说明送达15日内向甲区执行法院提执行异议之诉，本案5日尚及时。",
        boundary: "须区分十日上一级复议，不要求展开诉讼被告组合。",
      },
    ],
    sources: ["civpro-execution-outsider-machine-basis"],
  },
  {
    id: "civpro-execution-outsider-judgment",
    topicId: "civpro-execution-outsider",
    title: "异议针对的是原判对画作的归属处理",
    facts:
      "甲、乙的原诉讼直接争议一幅画的所有权，生效判决将画判归甲，并判令乙交付。执行时，未参加原诉的沈禾主张画是自己的，提出案外人书面异议，执行法院裁定驳回。沈禾不服的理由是原判把画归甲本来就判错了，而不是执行人员拿错画、违反拍卖程序等问题。他已经选择了案外人执行异议这条救济，现询问对该异议裁定不服后的法定途径。",
    prompt:
      "沈禾此时的异议是否与原判有关？应依什么程序寻求救济，而不是把它当作与原判无关的执行异议之诉？",
    reference:
      "与原判直接有关。沈禾要推翻的正是原判对这幅画的归属处理，不是纠正执行人员如何执行。对案外人异议裁定不服，认为原判决、裁定错误的，应依审判监督程序办理，依法申请再审；不能借“与原判无关”的执行异议之诉绕开原判。本题不需要先判断沈禾最终能否证明所有权。",
    answer: "d",
    options: [
      {
        text: "一律按15日内执行异议之诉处理，是否针对原判都一样",
        explanation: "案外人异议裁定后的救济要区分是否认为原判错误。",
      },
      {
        text: "只向上一级法院申请执行行为复议，就能改掉画作归属判决",
        explanation: "执行行为复议不能代替对原生效判决实体内容的审判监督。",
      },
      {
        text: "只要沈禾没参加原案，生效判决就自动失效",
        explanation: "未参加并不会使原判自动失效，仍需依法寻求救济。",
      },
      {
        text: "异议直接指向原判，应依审判监督程序依法申请再审",
        explanation:
          "原判已经处理该画归属，沈禾认为这一处理错误，属于审判监督救济路线。",
      },
    ],
    points: [
      {
        label: "认定争议直接关联原判",
        meaning:
          "说明原判已处理同一画作归属，沈禾争的是原判判断，不是单纯执行措施问题。",
        boundary: "不需要重新审查画作真实权属。",
      },
      {
        label: "走审判监督救济",
        meaning:
          "说明依法申请再审、按审判监督程序办理，不套用与原判无关的执行异议之诉。",
        boundary:
          "仅按本题已提出案外人异议的阶段判断，不要求比较所有第三人救济。",
      },
    ],
    sources: ["civpro-execution-outsider-judgment-basis"],
  },
  {
    id: "civpro-execution-subsistence",
    topicId: "civpro-execution-measures-security",
    title: "执行工资也要留下必要生活费",
    facts:
      "生效判决要求赵宁偿还借款。赵宁每月到手工资7000元，是本人和两名依法由其扶养、没有收入的家属的唯一生活来源。法院已核实三人的必要生活费用合计每月4000元，没有其他收入可供这些基本支出。申请执行人要求将7000元全部扣走，理由是欠款没有还清，生活费应由赵宁自己另想办法。",
    prompt:
      "法院能否将本题全部工资用于偿债？保留必要生活费后，剩余收入是否一律不能执行？",
    reference:
      "不能全部扣走，应为赵宁及其所扶养家属保留已核实的4000元必要生活费。工资收入并非完全不能执行，超出生活必需费用的剩余部分仍可在应履行义务范围内依法扣留、提取。欠债要履行，但不能把本题唯一的基本生活来源全部拿走。",
    answer: "a",
    options: [
      {
        text: "保留必要生活费，剩余收入可在义务范围内依法执行",
        explanation:
          "依法执行收入时，要同时保留被执行人及其所扶养家属的生活必需费用。",
      },
      {
        text: "全部7000元都应扣走，欠款未清就不考虑生活费",
        explanation: "法律明确要求保留生活必需费用，不能因债务未清而省略。",
      },
      {
        text: "只要赵宁要扶养家属，其全部工资都不得执行",
        explanation: "保护必要生活费不等于对全部工资给予执行豁免。",
      },
      {
        text: "生活费只能由申请执行人自愿赠与，法院无权保留",
        explanation: "这是法院执行时应遵守的法定保障，不取决于债权人赠与。",
      },
    ],
    points: [
      {
        label: "为本人及所扶养家属保留生活费",
        meaning:
          "联系已核实4000元为唯一基本生活需要，说明不能把7000元全扣，须保留必要生活费。",
        boundary: "不要求机械重复人数和金额，须包括依法被扶养人的必要生活。",
      },
      {
        label: "剩余收入仍可依法执行",
        meaning:
          "说明保留必需费用后的剩余收入可在义务范围内执行，不是全部工资均豁免。",
        boundary: "不要求自行确定以后每月生活标准，也不要求计算利息。",
      },
    ],
    sources: ["civpro-execution-subsistence-basis"],
  },
  {
    id: "civpro-execution-guarantee",
    topicId: "civpro-execution-measures-security",
    title: "提供执行担保是否就能自动暂停",
    facts:
      "甲公司正被执行一笔生效判决确定的付款义务。甲向执行法院提交形式和内容均符合法律要求的财产担保，请求暂缓执行3个月；申请执行人乙也书面同意这项担保和暂缓安排。法院尚未作出暂缓决定。甲认为材料已经齐全、乙也同意了，执行人员就必须立即停止全部措施，以后也不得再处理担保财产。",
    prompt:
      "甲提供担保并得到乙同意后，是否自动暂缓执行？法院决定的暂缓期限届满，甲仍不履行时，担保财产可否用于执行？",
    reference:
      "不会自动暂缓，法院还须决定是否暂缓以及暂缓期限。提供合格担保、申请执行人同意，是法院作出该决定的条件，不是材料一交就自动停止执行。法院决定暂缓后，甲在期限届满时仍不履行，法院有权执行依法提供的担保财产；担保不是让债务和执行责任消失。",
    answer: "c",
    options: [
      {
        text: "乙一同意就自动永久停止执行，法院没有判断余地",
        explanation:
          "法律规定法院可以决定暂缓及期限，不是当事人自动决定永久停止。",
      },
      {
        text: "即使法院决定暂缓，期限届满未还款也永远不能执行担保财产",
        explanation: "被执行人逾期不履行，法院有权依法执行担保财产。",
      },
      {
        text: "由法院决定是否暂缓及期限，逾期不履行可执行担保财产",
        explanation: "担保与同意不能替代法院决定，担保财产也不是永久免于执行。",
      },
      {
        text: "只要有一份担保，完全不需申请执行人同意即可自动停执行",
        explanation: "法定条件包括申请执行人同意，是否暂缓还需法院决定。",
      },
    ],
    points: [
      {
        label: "暂缓及期限由法院决定",
        meaning:
          "联系担保和乙同意已具备但法院尚未决定，说明不自动暂缓，须由法院作出决定及确定期限。",
        boundary: "不将暂缓等同解封全部财产，不要求评价担保价值。",
      },
      {
        label: "逾期未履行可执行担保财产",
        meaning: "说明法院决定的暂缓期限届满仍不履行，有权依法执行担保财产。",
        boundary: "本题财产担保，不强求扩展第三人保证的全部程序。",
      },
    ],
    sources: ["civpro-execution-guarantee-basis"],
  },
  {
    id: "civpro-execution-settlement-default",
    topicId: "civpro-execution-settlement-distribution",
    title: "执行和解违约后怎样接着执行",
    facts:
      "生效判决判令杜安向林禾支付借款本金20万元。执行中，双方达成分期和解：本金总额仍为20万元，先付5万元，余款15万元在三个月内付清。协议已交执行法院记录，杜安付了5万元后，其余约定期限全部届满仍未支付。林禾选择申请恢复对原生效判决的执行，没有另行起诉要求履行和解协议。双方对已经支付的5万元没有争议。",
    prompt:
      "林禾能否申请恢复原判的执行，是否必须重新取得一份付款判决？恢复时，已经履行的5万元应怎样处理？",
    reference:
      "可以申请恢复对原生效判决的执行，不需要先重新起诉取得付款判决。杜安没有按执行和解协议履行剩余义务，林禾选择恢复原判执行，有法定依据。已经支付的5万元应扣除，本金只剩15万元，不能因为和解违约又把原来的20万元本金全收一遍。",
    answer: "b",
    options: [
      {
        text: "达成和解就永久抹掉原判，林禾只能重新起诉取得新判决",
        explanation: "执行和解违约后的法定恢复执行途径仍存在。",
      },
      {
        text: "可恢复原判执行，已付5万元应扣除",
        explanation:
          "执行和解未履行可依法申请恢复原文书执行，同时须扣除已履行部分。",
      },
      {
        text: "可恢复原判，但违约意味着已付5万元全部作废，应再付20万元本金",
        explanation: "已经履行部分必须依法扣除，不能重复受偿。",
      },
      {
        text: "法院只能强制执行和解协议，原判绝对不能再用",
        explanation:
          "本题林禾选择的是依法恢复原生效判决执行，不是直接执行私下协议。",
      },
    ],
    points: [
      {
        label: "可申请恢复原判执行",
        meaning:
          "联系执行和解剩余款项逾期未履行，说明可申请恢复原生效判决，不必先取得新判决。",
        boundary: "不说所有情形只能恢复，题设已明确本次选择。",
      },
      {
        label: "扣除已履行部分",
        meaning: "说明已支付5万元应扣除，未履行本金15万元，不得重复收取。",
        boundary: "不要求另行计算迟延利息和执行费用。",
      },
    ],
    sources: ["civpro-execution-settlement-default-basis"],
  },
  {
    id: "civpro-execution-distribution",
    topicId: "civpro-execution-settlement-distribution",
    title: "先查封是否意味着先拿走全部钱",
    facts:
      "自然人周清分别欠甲8万元、乙12万元，两名普通债权人都已取得生效给付判决，没有抵押等优先受偿权。甲先申请执行，法院查封并变卖周清的财产；乙在该财产执行终结前，提交申请书及自己的生效判决，申请参与分配。法院已查明周清的全部财产不足清偿两笔债务，扣除执行费用后只有10万元可分配，也没有其他优先债权。甲主张自己先申请、先查封，应先拿走全部8万元，乙只能取剩下的2万元。",
    prompt:
      "乙能否在本题申请参与分配？普通债权应如何分配，甲是否仅凭先申请、先查封就应先拿足8万元？",
    reference:
      "乙可以申请参与分配。被执行人周清是自然人，财产不足清偿全部债权，乙已取得执行依据并在法定阶段提出申请。扣除费用且没有优先债权后，普通债权原则上按各债权占全部参与分配债权的比例受偿。本题甲、乙按8∶12分配10万元，即甲4万元、乙6万元，不因甲先申请、先查封就让其先拿足。",
    answer: "d",
    options: [
      {
        text: "甲先查封就必然先拿足8万元，乙只能取2万元",
        explanation:
          "本题符合自然人参与分配规则，普通债权不只按先查封顺序清偿。",
      },
      {
        text: "乙没有参与甲的原诉讼，不能持自己的判决申请参与分配",
        explanation:
          "其他有执行依据的债权人符合条件可以参与，不必是同一原审诉讼当事人。",
      },
      {
        text: "所有债权人都按人数平均分，债权大小不重要",
        explanation: "普通债权原则上按债权数额比例，不是按人数平均。",
      },
      {
        text: "乙可参与分配，普通债权原则上按债权比例受偿",
        explanation:
          "本题自然人不足清偿、乙有执行依据且及时申请，适用普通参与分配比例规则。",
      },
    ],
    points: [
      {
        label: "乙满足参与分配条件",
        meaning:
          "联系自然人财产不足清偿、乙已有执行依据、财产执行终结前申请，说明乙可以参与分配。",
        boundary: "不要求复述申请书全部格式，不推广到全部企业法人案件。",
      },
      {
        label: "普通债权按比例受偿",
        meaning:
          "说明本题普通债权原则上按8比12的债权比例分配，而非甲先查封先拿足。",
        boundary: "认可正确比例规则，不强求同时计算4万元和6万元。",
      },
    ],
    sources: ["civpro-execution-distribution-basis"],
  },
  {
    id: "civpro-execution-stay-resume",
    topicId: "civpro-execution-end-reversal",
    title: "延期执行以后还能不能恢复",
    facts:
      "执行过程中，申请执行人许安书面表示，愿给被执行人林禾两个月时间筹款，暂时延期执行；法院据此作出中止执行裁定。两个月后，林禾仍未付款，许安也不再同意延期，中止的原因已经消失，没有其他妨碍继续执行的情形。林禾称案件既然已经中止，原债务就算免掉，不能再接着执行。",
    prompt:
      "中止执行是否意味着原债务免除或执行永久结束？本题延期原因消失后，法院应怎样处理？",
    reference:
      "不意味着债务免除，也不是永久结束执行。中止执行只是因法定原因暂停，原生效文书和未履行义务仍在。本题两个月届满、申请执行人不再同意延期，中止原因已消失，应恢复执行；不能把暂时不执行当成以后不用还。",
    answer: "a",
    options: [
      {
        text: "债务不因中止而消灭，中止原因消失后恢复执行",
        explanation: "法定中止只是暂停，原因消失后应继续执行。",
      },
      {
        text: "中止执行等于债务被免除，以后不得恢复",
        explanation: "程序暂停不能替代债权人免债或实体债务消灭。",
      },
      {
        text: "恢复执行前必须就同一债务重新起诉并取得新判决",
        explanation: "原生效执行依据仍在，本题无须重复起诉。",
      },
      {
        text: "只有林禾同意，法院才可恢复执行",
        explanation: "中止原因消失即依法恢复，不以被执行人再次同意为条件。",
      },
    ],
    points: [
      {
        label: "中止不消灭债务",
        meaning:
          "说明中止只是暂停，原生效文书确定的未履行义务仍然存在，不等于永久结束。",
        boundary: "不要求列举所有终结或终本情形。",
      },
      {
        label: "原因消失应恢复执行",
        meaning: "联系约定延期已满且申请执行人不再同意，说明本题应恢复执行。",
        boundary: "不虚构仍有其他暂停事由，不要求重新取得执行依据。",
      },
    ],
    sources: ["civpro-execution-stay-resume-basis"],
  },
  {
    id: "civpro-execution-reversal",
    topicId: "civpro-execution-end-reversal",
    title: "判决撤销后追回已经执行的钱",
    facts:
      "法院根据生效判决，从陆遥账户执行了12万元，并交付申请执行人程宁，执行已经完毕。后来法院经再审认定原判确有错误，依法撤销原判，并最终判决驳回程宁的该笔付款请求。程宁仍持有这12万元，没有第三人交易或其他扣抵争议，却拒绝返还，声称陆遥只能再单独起诉追钱。",
    prompt:
      "法院可以通过什么执行程序处理这12万元？是否必须由陆遥另行起诉取得新的返还判决，程宁才需要返还？",
    reference:
      "应依法办理执行回转。原来据以执行的判决因错误被撤销，法院应作出裁定，责令取得这12万元的程宁返还；程宁拒不返还，可以强制执行，不必让陆遥再为同一笔已执行财产另行起诉取得返还判决。原执行已经完毕，也不妨碍依法回转。",
    answer: "c",
    options: [
      {
        text: "执行完毕就不能再处理，即使原判撤销也归程宁所有",
        explanation: "执行完毕后原依据被撤销，正是法律规定的执行回转情形。",
      },
      {
        text: "必须先另诉取得返还判决，执行法院一律不能裁定返还",
        explanation: "本题可直接依法裁定责令取得财产者返还，拒不返还强制执行。",
      },
      {
        text: "通过执行回转裁定责令返还，拒不返还可强制执行",
        explanation:
          "原执行依据因错误撤销，对已执行财产依法回转，不要求另取返还判决。",
      },
      {
        text: "原判撤销后只能追究执行人员责任，不能向程宁追回财产",
        explanation: "本题依法处理取得财产者的返还，不能用追责替代执行回转。",
      },
    ],
    points: [
      {
        label: "识别依法执行回转",
        meaning:
          "联系原判因错误撤销、12万元已执行交付，说明应通过执行回转处理。",
        boundary: "不要求讨论本题没有的善意第三人交易或执行赔偿。",
      },
      {
        label: "裁定返还并可强制执行",
        meaning:
          "说明法院裁定责令程宁返还，拒不返还强制执行，无须另诉取得返还判决。",
        boundary: "认可同义表达，不强求完整复述法条。",
      },
    ],
    sources: ["civpro-execution-reversal-basis"],
  },
];

const topicDrafts = [
  {
    id: "civpro-execution-start",
    chapterId: "CIVPRO-EXECUTION-START",
    title: "申请执行法院与期间",
    headline: "先找有执行管辖权的法院，再按文书确定的履行期计算时间。",
    paragraphs: [
      "生效民事判决、裁定，可由一审法院或者与其同级的被执行财产所在地法院执行。二审法院作出终审裁判，不等于只有二审法院才能负责执行。",
      "申请执行期间为2年。文书规定履行期的，从履行期最后一日起算；规定分期履行的，从最后一期期限届满起算；没有履行期的，从文书生效起算。时效中止、中断另按法定规则处理。",
    ],
    pitfall: "把终审法院当作唯一执行法院，或者对分期判决逐期计算两年。",
  },
  {
    id: "civpro-execution-conduct",
    chapterId: "CIVPRO-EXECUTION-CONDUCT",
    title: "执行行为异议与复议",
    headline:
      "执行方式有问题，先向执行法院提书面异议；不服裁定再向上一级复议。",
    paragraphs: [
      "当事人、利害关系人认为冻结金额、拍卖程序等执行行为违法，可向负责执行的法院提出书面异议。法院审查理由成立，应撤销或改正相关措施；不是重新审一遍原来的债务。",
      "对执行行为异议裁定不服，自裁定送达起10日内向上一级法院申请复议。把十日复议与案外人标的异议后的十五日起诉区分开。",
    ],
    pitfall: "只看到“异议”两个字，就把所有案件都送去提起执行异议之诉。",
  },
  {
    id: "civpro-execution-outsider",
    chapterId: "CIVPRO-EXECUTION-OUTSIDER",
    title: "案外人标的异议与异议之诉",
    headline:
      "主张自己的财产不该被执行，先提出标的异议，再看争议是否指向原判。",
    paragraphs: [
      "案外人认为自己对被执行财产有足以排除执行的权利，依法先提出书面标的异议。异议被驳回、争议又与原判无关的，可自裁定送达起15日内向作出异议裁定的执行法院提起执行异议之诉。",
      "如果争的正是作为执行依据的原判对同一财产的处理，应按审判监督程序依法申请再审。标的异议成立时中止的是该标的的执行，不会自动消灭被执行人的全部债务。",
    ],
    pitfall:
      "把“财产其实是我的”当成拍卖程序异议，或用执行异议之诉直接绕开原判已作的处理。",
  },
  {
    id: "civpro-execution-measures-security",
    chapterId: "CIVPRO-EXECUTION-MEASURES-SECURITY",
    title: "执行范围、生活保障与担保",
    headline: "执行要实现债权，也要留足必要生活；担保暂缓须由法院决定。",
    paragraphs: [
      "执行收入或财产应限于应履行义务范围，依法保留被执行人及其所扶养家属的生活必需费用和物品。保护的是必要生活，不是全部工资和财产都不执行。",
      "被执行人向法院提供符合要求的担保，且申请执行人同意，法院可以决定暂缓执行及期限。期限届满仍不履行，可依法执行担保财产；担保和同意本身不会自动解除一切措施。",
    ],
    pitfall: "把全部工资扣光，或反过来认为有家属要扶养就完全不用执行。",
  },
  {
    id: "civpro-execution-settlement-distribution",
    chapterId: "CIVPRO-EXECUTION-SETTLEMENT-DISTRIBUTION",
    title: "执行和解与参与分配",
    headline:
      "和解违约可以依法恢复原文书执行；多人争不足清偿的财产，要看分配规则。",
    paragraphs: [
      "执行和解未履行，可以依法申请恢复原生效文书执行；已经履行部分应扣除，不能重复受偿。依法就履行和解协议起诉是另一条路径，不把两条路径混成双重索取。",
      "被执行人是自然人或者其他组织、财产不足清偿全部债权时，其他已取得执行依据的债权人可在执行开始后、财产执行终结前申请参与分配。扣除执行费用并清偿优先债权后，普通债权原则上按债权数额比例受偿。企业法人案件另按相应规则处理。",
    ],
    pitfall:
      "和解违约后连已付的钱也重收一次，或认为先查封必然先拿足全部普通债权。",
  },
  {
    id: "civpro-execution-end-reversal",
    chapterId: "CIVPRO-EXECUTION-END-REVERSAL",
    title: "中止、终结与执行回转",
    headline:
      "中止是暂停，终结有法定原因；执行依据撤销后，已取得的财产依法回转。",
    paragraphs: [
      "申请执行人同意延期等法定情形，可以中止执行；中止原因消失后恢复。中止本身不免除债务，也不要求重新取得一份同样的判决。执行依据被撤销等法定情形，则应依法终结相应执行。",
      "执行完毕后，据以执行的裁判等法律文书因错误被撤销，对已执行财产，法院应裁定责令取得人返还，拒不返还的强制执行。这就是执行回转，不必为同一笔已执行财产另行起诉取得返还判决。",
    ],
    pitfall: "把中止当成永远不用还，或认为钱已经执行交付就永远不能返还。",
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
export const civilProcedureExecutionTopics: FaultTopic[] = topicDrafts.map(
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
export const civilProcedureExecutionChapters = topicDrafts.map((topic) => ({
  id: topic.chapterId,
  title: topic.title,
  section: "民事诉讼法",
  topicIds: [topic.id],
}));
export const civilProcedureExecutionExercises =
  civilProcedureExecutionTopics.flatMap((topic) => topic.exercises);
export const civilProcedureExecutionContentPack = {
  revision: civilProcedureExecutionRevision,
  snapshot: {
    topics: civilProcedureExecutionTopics,
    sources: civilProcedureExecutionSources,
  },
};
export const civilProcedureExecutionDefaultQueues = {
  objective: civilProcedureExecutionExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureExecutionExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureExecutionQuestion(id: string) {
  const question = civilProcedureExecutionExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilProcedureExecutionTopicForQuestion(id: string) {
  return civilProcedureExecutionTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilProcedureExecutionSameCaseQuestions(id: string) {
  const question = civilProcedureExecutionQuestion(id);
  return question
    ? structuredClone(
        civilProcedureExecutionExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilProcedureExecutionChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilProcedureExecutionChapters.find(
    (c) => c.id === chapterId,
  );
  return chapter
    ? civilProcedureExecutionTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
