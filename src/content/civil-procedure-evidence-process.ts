import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

// Ten original fictional cases, paired as choice and full written forms.
export const civilProcedureEvidenceProcessRevision =
  "civil-procedure-evidence-process-2026-10-29.v1";
export const civilProcedureEvidenceProcessSources: ContentSources = {
  "civpro-evidence-process-electronic": {
    title: "《民事诉讼证据规定》第14、15条及《民诉法解释》第104条",
    url: "https://www.court.gov.cn/fabu/xiangqing/212721.html",
    note: "2026-10-29核对现行法、2022民诉解释及2019证据规定官方全文。即时通信属于电子数据；直接输出的打印件可视为原件，但还须审查真实完整性、关联及证明力。 原创教学案例，不是官方试题。",
  },
  "civpro-evidence-process-copies": {
    title: "《民事诉讼证据规定》第11、90条及《民诉法解释》第111条",
    url: "https://www.court.gov.cn/fabu/xiangqing/212721.html",
    note: "2026-10-29核对现行法、2022民诉解释及2019证据规定官方全文。无法与原件核对的复制件不能单独定案；不将其扩大为所有复制件一律无效或不得提交。 原创教学案例，不是官方试题。",
  },
  "civpro-evidence-process-investigation": {
    title: "《民事诉讼法》第67条、《民诉法解释》第94、95条及《证据规定》第20条",
    url: "https://www.court.gov.cn/fabu/xiangqing/353651.html",
    note: "2026-10-29核对现行法、2022民诉解释及2019证据规定官方全文。涉及他人隐私且客观无法自取，可在举证期限届满前书面申请法院调查；线索、关联、理由和必要性须明确。 原创教学案例，不是官方试题。",
  },
  "civpro-evidence-process-document-order": {
    title: "《民诉法解释》第112条及《民事诉讼证据规定》第45—48条",
    url: "https://www.court.gov.cn/fabu/xiangqing/212721.html",
    note: "2026-10-29核对现行法、2022民诉解释及2019证据规定官方全文。法院责令后，控制账簿者无正当理由拒交，可以认定对方所主张的书证内容真实，不是全案当然胜诉。 原创教学案例，不是官方试题。",
  },
  "civpro-evidence-process-witness": {
    title: "《民事诉讼法》第76条及《民事诉讼证据规定》第68条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对现行法、2022民诉解释及2019证据规定官方全文。因健康原因不能出庭，经法院许可可以视频作证；作证方式获准不等于陈述已被认定真实。 原创教学案例，不是官方试题。",
  },
  "civpro-evidence-process-appraiser": {
    title: "《民事诉讼法》第81条：鉴定人出庭与费用返还",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对现行法、2022民诉解释及2019证据规定官方全文。采用2023年修正法现行第81条。依法通知后拒不出庭，鉴定意见不得作定案根据；支付鉴定费者可要求返还。 原创教学案例，不是官方试题。",
  },
  "civpro-evidence-process-examination": {
    title: "《民事诉讼证据规定》第60条及《民诉法解释》第103、104条",
    url: "https://www.court.gov.cn/fabu/xiangqing/212721.html",
    note: "2026-10-29核对现行法、2022民诉解释及2019证据规定官方全文。庭前实际发表过质证意见的证据视为质证过；仅认可的路径还需庭审说明，不将程序完成等同实体事实确定。 原创教学案例，不是官方试题。",
  },
  "civpro-evidence-process-legality": {
    title: "《民诉法解释》第104—106条及《民事诉讼证据规定》第15、87、99条",
    url: "https://www.court.gov.cn/fabu/xiangqing/353651.html",
    note: "2026-10-29核对现行法、2022民诉解释及2019证据规定官方全文。以严重侵权、违反法律禁止或严重违背公序良俗的方法获取的证据排除；未告知不独立构成一律排除理由。 原创教学案例，不是官方试题。",
  },
  "civpro-evidence-process-deadline": {
    title: "《民事诉讼法》第68条及《民诉法解释》第101、102条",
    url: "https://www.court.gov.cn/fabu/xiangqing/353651.html",
    note: "2026-10-29核对现行法、2022民诉解释及2019证据规定官方全文。故意逾期、对方提出异议且涉及案件基本事实：应当采纳并依法制裁迟交；仍须质证。不要把未异议、客观原因或非基本事实情形混同。 原创教学案例，不是官方试题。",
  },
  "civpro-evidence-process-preservation": {
    title: "《民事诉讼法》第84条及《民事诉讼证据规定》第25—27条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对现行法、2022民诉解释及2019证据规定官方全文。采用现行第84条。紧急诉前保全可向证据所在地、被申请人住所地或有案件管辖权的法院申请；不是提前认定责任。 原创教学案例，不是官方试题。",
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
    id: "civpro-evidence-process-chat-print",
    topicId: "civpro-evidence-originals",
    title: "聊天记录打印出来以后",
    facts:
      "顾宁起诉要求安禾支付设计费，提交双方即时通信记录。记录从顾宁仍在使用的手机中直接导出，按完整顺序打印，能够识别双方账号，没有剪接或改写。安禾承认账号是自己的，但对其中几句话的意思和最终是否完成设计仍有争议。",
    prompt:
      "这份聊天记录属于哪类证据，直接打印的材料能否视为原件？符合原件要求是否就能直接认定顾宁应得全部设计费？",
    reference:
      "聊天记录属于电子数据，直接从原记录导出的打印材料可以视为原件。符合原件要求，只是解决了提交形式的问题。法院还要核对记录是否真实完整、内容说明了什么，并结合其他材料判断设计是否完成，不能因此直接支持全部设计费。",
    answer: "b",
    options: [
      {
        text: "一打印到纸上，就只属于普通书证，不能再按电子数据审查。",
        explanation: "载体换成纸张，不改变即时通信信息属于电子数据的性质。",
      },
      {
        text: "属于电子数据，直接输出的打印件可视为原件，但仍需审查它能证明什么。",
        explanation: "原件形式与事实认定是不同问题。",
      },
      {
        text: "电子数据永远不能打印提交，必须把手机交由法院长期保管。",
        explanation: "规则允许直接来源于电子数据的打印件等视为原件。",
      },
      {
        text: "既然可视为原件，顾宁请求的全部费用就应立即支持。",
        explanation: "提交形式合格不等于全部实体请求已获证明。",
      },
    ],
    points: [
      {
        label: "电子数据及其原件形式",
        meaning:
          "说明即时通信记录属于电子数据，本题直接导出的打印材料可以视为原件。",
        boundary:
          "不能只因打印在纸上就否认电子数据性质，也不要求必须长期扣留手机。",
      },
      {
        label: "仍需审查内容与证明作用",
        meaning:
          "联系对设计完成情况仍有争议，说明原件形式不等于全部费用已获证明，还须审查真实完整性、内容及其他材料。",
        boundary:
          "不要求重新作鉴定或列全真实性因素；不能把形式合格说成当然胜诉。",
      },
    ],
    sources: ["civpro-evidence-process-electronic"],
  },
  {
    id: "civpro-evidence-process-copy-alone",
    topicId: "civpro-evidence-originals",
    title: "只有一张无法核对的复印件",
    facts:
      "房东罗澄主张一份租赁合同约定租期为一年，只提交了一张合同复印件。承租人否认该复印件上关于租期的内容。罗澄目前未能提供原件供核对，也没有其他证据印证这一年的约定，法院尚未认定复印件内容可靠。",
    prompt: "能否仅凭这张复印件认定双方约定了一年租期？罗澄可以怎样补充证据？",
    reference:
      "目前不能只凭这张复印件认定一年租期。它无法与原件核对，又受到对方否认，没有其他证据印证，不能单独作为定案依据。罗澄可以找到原件供核对，或补充能印证租期的通信记录等其他证据。这不等于所有复印件都不能用。",
    answer: "d",
    options: [
      {
        text: "复印件在民事诉讼中一律不得提交。",
        explanation:
          "限制是不能仅凭本题这种无法核对的复制件定案，不是一概禁止复制件。",
      },
      {
        text: "只要复印件看起来完整，就足以单独认定租期。",
        explanation: "表面完整不能解决原件无法核对及内容受争议的问题。",
      },
      {
        text: "承租人一否认，就必须认定双方从未约定租期。",
        explanation: "现有证据不足不等于相反事实已经得到证明。",
      },
      {
        text: "不能仅凭该件定案，应补原件核对或其他印证材料。",
        explanation: "明确本件的使用限制，同时保留补强的途径。",
      },
    ],
    points: [
      {
        label: "本件不能单独定案",
        meaning:
          "联系复印件无法核对原件、内容有争议且无印证，说明不能仅据它认定一年租期。",
        boundary: "不能把这一限制扩大成所有复印件一律无效或一律不能提交。",
      },
      {
        label: "提出可行的补强办法",
        meaning:
          "指出补原件供核对，或补充能印证租期的其他材料，至少一种办法即可。",
        boundary: "不要求同时列出两种办法，也不要求固定的证据名称。",
      },
    ],
    sources: ["civpro-evidence-process-copies"],
  },
  {
    id: "civpro-evidence-process-bank-records",
    topicId: "civpro-evidence-obtaining",
    title: "银行不向本人以外的人提供流水",
    facts:
      "张宁起诉李程返还代收款。李程称已按张宁指示转给王某，王某否认收到。张宁想核对这笔具体转账，向银行申请查看王某账户在转账日期的入账记录，被银行以涉及他人账户隐私为由拒绝。举证期限尚未届满，张宁掌握开户银行、账户和转账日期等线索。",
    prompt:
      "张宁可以申请法院调查这笔记录吗？应在什么时候、以什么方式提出申请？",
    reference:
      "可以申请。这笔入账记录与争议中的转账直接有关，涉及他人账户隐私，张宁无法自己取得。应在举证期限届满前向法院提交书面申请，说明记录线索、要证明的事实以及自行取证受阻的原因。法院审查必要性后依法调查，不是替张宁无范围地查询他人全部流水。",
    answer: "a",
    options: [
      {
        text: "可在举证期限届满前书面申请法院调查，说明线索及取证障碍。",
        explanation: "有明确关联和客观取证障碍，可以依法申请。",
      },
      {
        text: "涉及他人隐私，就连法院也绝对不能调查。",
        explanation: "隐私保护不等于法院依法调查取证被一概禁止。",
      },
      {
        text: "法院必须在没有申请、没有线索时替原告搜索所有账户。",
        explanation: "调查应有明确目的和必要范围，不是无条件替代当事人举证。",
      },
      {
        text: "等举证期限届满后再随口要求银行交资料即可。",
        explanation: "本题的申请应在举证期限届满前以书面方式向法院提出。",
      },
    ],
    points: [
      {
        label: "具备申请调查的理由",
        meaning:
          "联系该记录与特定转账有关、银行因他人隐私不予提供，说明存在客观取证障碍，可以申请法院调查。",
        boundary:
          "不把任何没拿到材料都等同法院必须代查，也不要求先认定转账是否真实发生。",
      },
      {
        label: "期限内书面申请",
        meaning:
          "说明在举证期限届满前向法院书面申请，并交代证据线索或要证明的事实及不能自行取得的原因。",
        boundary:
          "不要求抄全申请书栏目或具体账户号码；不能用庭后口头要求替代本题程序。",
      },
    ],
    sources: ["civpro-evidence-process-investigation"],
  },
  {
    id: "civpro-evidence-process-withheld-ledger",
    topicId: "civpro-evidence-obtaining",
    title: "法院命交的账簿仍不提交",
    facts:
      "代销结算纠纷中，原告程兰主张被告公司的账簿记载已经收到20万元代销货款。她在举证期限内书面申请法院责令公司提交有关账页，并说明该账簿由公司保管。公司承认账簿在自己手上。法院审查后已责令提交，公司却无正当理由拒不提交。双方对可扣除的费用另有争议。",
    prompt:
      "公司拒交账簿，法院可以怎样处理程兰关于账簿内容的主张？是否因此就应支持她的全部结算请求？",
    reference:
      "法院可以认定程兰所主张的账簿内容真实，也就是账簿记载已收到20万元货款。公司控制书证，在法院责令后仍无正当理由拒交，要承担这种不利后果。但程兰的全部结算请求是否成立，还要审查可扣费用等争议，不能把一项书证内容的认定扩大为全案当然胜诉。",
    answer: "c",
    options: [
      {
        text: "公司拒交后，法院只能放弃审查该笔收款。",
        explanation: "无正当理由拒交法院责令提交的书证，可以产生不利后果。",
      },
      {
        text: "只要拒交，原告任何金额和请求都必须全部支持。",
        explanation: "不利认定有具体范围，不自动覆盖所有实体争议。",
      },
      {
        text: "可认定所主张的账簿内容真实，其他结算问题仍需审查。",
        explanation: "区分拒交书证的后果与全部请求的最终判断。",
      },
      {
        text: "法院必须证明公司已经毁掉账簿，才可作任何不利认定。",
        explanation:
          "拒不提交与毁灭书证并非同一个必要前提，本题已满足无正当理由拒交的条件。",
      },
    ],
    points: [
      {
        label: "拒交书证的不利认定",
        meaning:
          "联系公司控制账簿、法院责令后无正当理由拒交，说明法院可以认定程兰所主张的账簿内容真实。",
        boundary:
          "认可‘可按账簿记载已收20万元处理’等表达；不要求认定公司毁灭证据。",
      },
      {
        label: "不自动支持全部请求",
        meaning:
          "联系可扣费用仍有争议，说明该后果限于有关书证内容，全部结算请求仍要依法审查。",
        boundary: "不能把‘可以认定’写成法院必须支持原告一切主张。",
      },
    ],
    sources: ["civpro-evidence-process-document-order"],
  },
  {
    id: "civpro-evidence-process-remote-witness",
    topicId: "civpro-witness-appraisal",
    title: "住院证人能视频作证吗",
    facts:
      "运输纠纷的目击证人沈安因重病正在住院，医生证明其目前不能前往法院，但能够清楚表达。法院核实健康情况后，许可他通过实时视频接受法官和双方当事人询问，并核验身份、制作笔录。被告仍认为，证人没有坐在法庭里，证言就一律不能用。",
    prompt:
      "沈安采用视频方式作证是否可以？法院能否因为已经许可视频，就不再审查证言是否可靠？",
    reference:
      "可以。沈安因健康原因不能到庭，经过法院许可，可以通过视频方式作证；没有亲自坐在法庭里，不是排除证言的理由。但许可的是作证方式，不是预先认可证言内容。法院仍要结合询问情况和其他证据判断他说的话是否可靠。",
    answer: "b",
    options: [
      {
        text: "证人只要不到法庭，任何证言都一律不能使用。",
        explanation: "法律允许有正当理由并经法院许可的替代作证方式。",
      },
      {
        text: "本案可以视频作证，证言内容仍需审查。",
        explanation: "健康原因和法院许可解决出庭方式，可信性还需另作判断。",
      },
      {
        text: "任何证人都可自行选择不出庭，也不必告诉法院。",
        explanation: "本题有健康原因且已获法院许可，不能无条件推广。",
      },
      {
        text: "法院准许视频，就必须把其全部陈述当作事实。",
        explanation: "许可程序不等于全部内容已经得到证明。",
      },
    ],
    points: [
      {
        label: "合法的视频作证方式",
        meaning:
          "联系重病不能到庭、能够表达且已获法院许可，说明本案可视频作证。",
        boundary: "不能仅因未到法庭排除，也不能认为所有证人都可自行选择远程。",
      },
      {
        label: "仍审查证言可信性",
        meaning:
          "说明法院仍须结合询问和其他证据审查内容，不能把许可视频当成认可全部陈述。",
        boundary: "不要求预判证人在本案一定说真话或一定说假话。",
      },
    ],
    sources: ["civpro-evidence-process-witness"],
  },
  {
    id: "civpro-evidence-process-appraiser-absence",
    topicId: "civpro-witness-appraisal",
    title: "鉴定人收到了通知却拒绝出庭",
    facts:
      "房屋维修纠纷中，法院委托形成了一份质量鉴定意见，原告已经支付鉴定费。被告对关键检测方法提出具体异议。法院依法通知签署该意见的鉴定人出庭，相关出庭费用已安排，鉴定人却无正当理由明确拒绝出庭，只说报告上有章，不接受询问。",
    prompt:
      "这份鉴定意见还能作为认定事实的依据吗？已经支付鉴定费的原告能否要求退费？",
    reference:
      "这份鉴定意见不能作为认定事实的依据。鉴定人应法院通知出庭接受询问，却拒不出庭，不能仅靠报告盖章来替代。已经支付鉴定费的原告可以要求返还鉴定费用。案件中的维修质量仍要根据合法可用的证据查明。",
    answer: "d",
    options: [
      {
        text: "报告有盖章，鉴定人就永远不必出庭。",
        explanation: "当事人提出异议且法院依法通知时，盖章不能替代出庭。",
      },
      {
        text: "报告照常使用，只要对鉴定人作口头批评即可。",
        explanation: "拒不出庭会影响该鉴定意见作为认定事实依据的资格。",
      },
      {
        text: "意见不能使用，但支付方无权要求返还鉴定费。",
        explanation: "法律明确赋予支付鉴定费用的当事人要求返还的权利。",
      },
      {
        text: "意见不得作为认定事实依据，支付方可要求返还鉴定费。",
        explanation: "两项程序后果均符合本题条件。",
      },
    ],
    points: [
      {
        label: "拒不出庭使意见不能作依据",
        meaning:
          "联系具体异议、法院依法通知后鉴定人拒不出庭，说明该意见不得作为认定事实的根据。",
        boundary: "不是一有异议就当然无效；本题关键是依法通知后的拒不出庭。",
      },
      {
        label: "支付方可要求返还费用",
        meaning: "说明已支付鉴定费的原告可以要求返还鉴定费用。",
        boundary: "不要求判定最终承担所有诉讼费用的人，也不要求法院自动退费。",
      },
    ],
    sources: ["civpro-evidence-process-appraiser"],
  },
  {
    id: "civpro-evidence-process-pretrial-recognition",
    topicId: "civpro-evidence-examination",
    title: "庭前已经核对过的签收单",
    facts:
      "法官主持的庭前证据交换中，买卖双方已经围绕一份签收单的真实性、合法性和关联性发表质证意见，相关意见完整记入笔录。双方确认单据是收货员签的，但对它能够证明的交货数量仍有争议。正式开庭时，法官说明了这份证据及庭前意见，没有让双方把同样的话再说一遍。",
    prompt:
      "该签收单能否仅因庭上没有重复质证就被排除？交货数量是否因此已经没有争议？",
    reference:
      "不能因为庭上没有重复一遍就排除。双方已在法院主持的庭前证据交换中发表质证意见，这份证据视为质证过。交货数量的争议仍然存在，法院要结合单据内容和其他证据判断；完成质证不等于所有待证事实都已确定。",
    answer: "a",
    options: [
      {
        text: "已在庭前依法发表质证意见，可视为质证过，数量争议仍需审查。",
        explanation: "区分是否完成质证与证据究竟证明什么。",
      },
      {
        text: "只要没有当庭逐字重说，就属于未经质证，必须排除。",
        explanation: "忽略了审理前准备阶段已经发表质证意见的规则。",
      },
      {
        text: "完成质证后，签收单支持的一切主张都必然成立。",
        explanation: "质证程序完成不等于证明结果已全部确定。",
      },
      {
        text: "承认单据签名真实，就等于承认卖方主张的全部数量。",
        explanation: "题中双方仍对数量有明确争议。",
      },
    ],
    points: [
      {
        label: "庭前意见可视为质证",
        meaning:
          "联系双方在法院主持的证据交换中已发表并记录质证意见，说明可视为已质证，不因未重复而排除。",
        boundary: "本题不是私下交换材料，也不是未经任何质证直接采纳。",
      },
      {
        label: "数量争议仍需判断",
        meaning:
          "说明质证完成不等于交货数量无争议，仍应结合内容及其他证据审查。",
        boundary: "不把签名真实性的认可扩大为对所有待证事实的认可。",
      },
    ],
    sources: ["civpro-evidence-process-examination"],
  },
  {
    id: "civpro-evidence-process-conversation-recording",
    topicId: "civpro-evidence-examination",
    title: "没有事先告知的商谈录音",
    facts:
      "林舟与周宁在公司接待室当面核对一笔普通货款，林舟用自己的手机录下自己参加的完整谈话，没有事先告知周宁。谈话没有涉及私人生活，也没有胁迫、诱导对方作虚假陈述、侵入私人空间或窃取他人设备的情形；双方没有作调解或和解让步。诉讼中，周宁只以没有同意录音为由要求将其排除。",
    prompt:
      "能否仅凭周宁未同意就排除该录音？提交后还应审查哪些与证据使用有关的问题？",
    reference:
      "不能只因未事先征得周宁同意就排除。本题是林舟记录自己参与的普通货款商谈，给出的情形没有显示严重侵犯权益、违反法律禁止性规定或严重违背公序良俗的取证方法。录音提交后，仍要核对是否真实完整、是否经过剪接、与争议有什么关系，再判断它能证明什么。",
    answer: "c",
    options: [
      {
        text: "凡未得到对方同意的录音，一律属于非法证据。",
        explanation: "取证合法性不能只看是否事先同意。",
      },
      {
        text: "只要录到了对自己有利的话，就可以免于审查真实性。",
        explanation: "有利内容不等于真实、完整或与待证事实有关。",
      },
      {
        text: "本案不能仅因未同意而排除，仍须审查录音真实性和证明作用。",
        explanation: "使用条件与最终证明力应分别判断。",
      },
      {
        text: "任何秘密取得的材料都绝对合法，法院必须采信。",
        explanation: "严重侵权、违反禁止性规定等取证方法仍会导致排除。",
      },
    ],
    points: [
      {
        label: "未告知不当然排除",
        meaning:
          "结合本人参加普通商谈及给定取证情形，说明不能仅以未征得同意就认定非法排除。",
        boundary: "不要求逐字列全排除条文，但不能反过来说所有秘密录音都合法。",
      },
      {
        label: "审查记录及其证明作用",
        meaning:
          "指出仍须审查真实性、完整性或有无剪接，并判断与争议的关联和证明作用。",
        boundary: "不要求鉴定成为必经程序，也不能从可提交推导对方当然败诉。",
      },
    ],
    sources: ["civpro-evidence-process-legality"],
  },
  {
    id: "civpro-evidence-process-late-basic-evidence",
    topicId: "civpro-evidence-timing-preservation",
    title: "故意拖到最后才交的验收单",
    facts:
      "设备安装纠纷的核心是工程是否已按约验收。一份关键验收单一直保存在原告手中。法院指定的举证期限已届满，原告才提交，并承认此前没有取证障碍，故意不交是想让对方来不及准备。对方明确反对逾期提交，要求法院不予采纳。法院审查确认这份材料与案件基本事实有关，准备安排对方查看并质证。",
    prompt:
      "法院应否仅因故意逾期就不采纳这份证据？对原告故意迟交的行为应怎样处理？",
    reference:
      "这份证据与案件基本事实有关，法院应当采纳，并安排对方质证，不能仅因故意逾期就弃用。但原告故意迟交仍要承担程序上的后果，法院应依法予以训诫、罚款。采纳材料和处罚迟交行为可以同时进行，采纳也不等于直接认定验收已经完成。",
    answer: "b",
    options: [
      {
        text: "故意逾期提交的证据，无论多重要都必须永远弃用。",
        explanation: "涉及案件基本事实的证据，有应当采纳的规则。",
      },
      {
        text: "应采纳并依法质证，同时依法训诫、罚款。",
        explanation: "保留必要证据与处理故意迟交并不冲突。",
      },
      {
        text: "只要证据重要，故意拖延就不应承担任何后果。",
        explanation: "涉及基本事实不使迟交行为免责。",
      },
      {
        text: "既然应采纳，就无需质证，直接认定原告胜诉。",
        explanation: "采纳不替代质证和证明力审查。",
      },
    ],
    points: [
      {
        label: "基本事实证据应采纳",
        meaning:
          "联系材料涉及工程验收这一基本事实，说明应当采纳并依法质证，不因故意迟交一律排除。",
        boundary:
          "不能把任何逾期证据都无条件采纳，也不要求直接认定验收事实成立。",
      },
      {
        label: "迟交行为仍受处理",
        meaning:
          "联系原告故意留证据突袭，说明法院应依法训诫、罚款，不能因材料被采纳就免除程序后果。",
        boundary:
          "不要求同时采取两种措施或算出罚款金额，不把迟交处罚等同于实体请求必败。",
      },
    ],
    sources: ["civpro-evidence-process-deadline"],
  },
  {
    id: "civpro-evidence-process-pretrial-preservation",
    topicId: "civpro-evidence-timing-preservation",
    title: "起诉前即将拆除的故障部件",
    facts:
      "一台生产设备损坏后，买卖双方对原因发生争议。设备现放在甲区维修厂，厂方已通知第二天拆除并报废故障部件，拆除后很难再查明原来的破损状态。买方尚未起诉，卖方住所地在乙区。买方希望法院尽快固定现状，保留以后查明原因的材料。",
    prompt:
      "买方现在能否申请证据保全，还是必须先起诉？可以向哪一类法院申请，至少说明一种？",
    reference:
      "现在就可以申请诉前证据保全。部件明天就要拆除报废，证据可能灭失，情况紧急，不必等起诉以后。买方可以向证据所在地的甲区法院申请，也可向被申请人住所地乙区法院或对案件有管辖权的法院申请。保全先固定材料，不是提前判定设备是谁的责任。",
    answer: "d",
    options: [
      {
        text: "只有案件立案后，法院才可能保全证据。",
        explanation: "法律允许情况紧急时申请诉前证据保全。",
      },
      {
        text: "必须等部件全部报废，才能证明有保全必要。",
        explanation: "保全目的就是避免证据灭失或以后难以取得。",
      },
      {
        text: "只能去买方自己住所地法院，不考虑证据和对方所在地。",
        explanation: "申请法院范围有明确规则，不随意依申请人方便确定。",
      },
      {
        text: "可立即申请诉前保全，例如向证据所在地甲区法院提出。",
        explanation: "本案有紧迫灭失风险，证据所在地属于允许的申请地点。",
      },
    ],
    points: [
      {
        label: "符合紧急诉前保全条件",
        meaning:
          "联系第二天拆除报废及以后难以查明，说明买方可以在起诉前申请证据保全。",
        boundary:
          "不能要求先让证据毁损，也不能把保全直接当成对卖方责任的认定。",
      },
      {
        label: "指出有权受理的法院",
        meaning:
          "说明可向证据所在地甲区法院、被申请人住所地乙区法院或对案件有管辖权法院申请，至少一种即可。",
        boundary: "无需同时写出三类法院，不接受仅凭申请人方便随意选法院。",
      },
    ],
    sources: ["civpro-evidence-process-preservation"],
  },
];
const topicDrafts = [
  {
    id: "civpro-evidence-originals",
    chapterId: "CIVPRO-EVIDENCE-ORIGINALS",
    title: "证据原件与电子数据",
    headline: "先分清证据类型和提交形式，再看材料能证明什么。",
    paragraphs: [
      "即时通信、电子邮件等属于电子数据。直接来源于电子数据的打印件、可显示识别的输出材料等，可以视为原件；还要保留记录来源和完整性，方便核验。",
      "无法与原件核对的普通复制件不能单独定案，可以结合其他证据审查。‘不能单独用’不同于‘任何复制件都不能用’，形式合格也不同于已经证明全部请求。",
    ],
    pitfall:
      "把打印的电子记录一律降为不能用的复印件，或把原件资格当成当然胜诉。",
  },
  {
    id: "civpro-evidence-obtaining",
    chapterId: "CIVPRO-EVIDENCE-OBTAINING",
    title: "调查取证与书证提出",
    headline: "客观拿不到的材料可依法申请调取；对方拒交书证，也有处理办法。",
    paragraphs: [
      "因客观原因不能自行取得、与争议有关的证据，可以在举证期限届满前书面申请法院调查收集。申请要说清证据线索、证明目的和取证障碍。",
      "书证由对方控制时，可申请法院责令提交。无正当理由拒不提交的，法院可以认定申请人所主张的书证内容真实，但不自动支持申请人的全部实体请求。",
    ],
    pitfall: "以为法院必须无范围代查一切，或把拒交一份书证等同于全案败诉。",
  },
  {
    id: "civpro-witness-appraisal",
    chapterId: "CIVPRO-WITNESS-APPRAISAL",
    title: "证人作证与鉴定人出庭",
    headline: "不能到庭要看理由和许可；依法应出庭却拒绝，会有不同后果。",
    paragraphs: [
      "证人因健康、交通等正当原因不能到庭，经法院许可可以采用书面、视频等方式作证。作证方式合法，不等于法院不再核对证言内容。",
      "当事人对鉴定意见有异议或法院认为有必要时，鉴定人应出庭。经法院通知仍拒不出庭，鉴定意见不得作为认定事实依据，支付费用的当事人可以要求返还鉴定费。",
    ],
    pitfall:
      "把证人和鉴定人的不到庭混为一谈，或认为鉴定报告盖章就无需接受询问。",
  },
  {
    id: "civpro-evidence-examination",
    chapterId: "CIVPRO-EVIDENCE-EXAMINATION",
    title: "质证与取证合法性",
    headline: "证据要依法接受审查，不能只凭一个形式特征决定是否使用。",
    paragraphs: [
      "当事人在法院审理前准备阶段已发表质证意见的证据，视为质证过。质证要关注真实、合法、与争议的关联以及证明作用，不要求机械重复。",
      "以严重侵害合法权益、违反法律禁止性规定或严重违背公序良俗的方法取得的证据，应予排除。未事先告知的录音不因此一律非法，合法取得也仍需审查是否真实完整。",
    ],
    pitfall: "把未经同意等同于一律非法，或把完成质证等同于对全部事实达成一致。",
  },
  {
    id: "civpro-evidence-timing-preservation",
    chapterId: "CIVPRO-EVIDENCE-TIMING-PRESERVATION",
    title: "举证期限与证据保全",
    headline: "按时举证；证据快要消失时，及时申请固定。",
    paragraphs: [
      "故意或重大过失逾期提交的证据，原则上不予采纳；但与案件基本事实有关的，应当采纳，并依法训诫、罚款。采纳证据与处罚拖延行为可以并行。",
      "情况紧急，证据可能灭失或以后难以取得时，可以在起诉或申请仲裁前申请保全。可向证据所在地、被申请人住所地或对案件有管辖权的法院提出。",
    ],
    pitfall: "认为逾期证据一律失效，或非要等起诉、等证据毁损后才想起申请保全。",
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
export const civilProcedureEvidenceProcessTopics: FaultTopic[] =
  topicDrafts.map((topic) => {
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
  });
export const civilProcedureEvidenceProcessChapters = topicDrafts.map(
  (topic) => ({
    id: topic.chapterId,
    title: topic.title,
    section: "民事诉讼法",
    topicIds: [topic.id],
  }),
);
export const civilProcedureEvidenceProcessExercises =
  civilProcedureEvidenceProcessTopics.flatMap((topic) => topic.exercises);
export const civilProcedureEvidenceProcessContentPack = {
  revision: civilProcedureEvidenceProcessRevision,
  snapshot: {
    topics: civilProcedureEvidenceProcessTopics,
    sources: civilProcedureEvidenceProcessSources,
  },
};
export const civilProcedureEvidenceProcessDefaultQueues = {
  objective: civilProcedureEvidenceProcessExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureEvidenceProcessExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureEvidenceProcessQuestion(id: string) {
  const question = civilProcedureEvidenceProcessExercises.find(
    (q) => q.id === id,
  );
  return question ? structuredClone(question) : undefined;
}
export function civilProcedureEvidenceProcessTopicForQuestion(id: string) {
  return civilProcedureEvidenceProcessTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilProcedureEvidenceProcessSameCaseQuestions(id: string) {
  const question = civilProcedureEvidenceProcessQuestion(id);
  return question
    ? structuredClone(
        civilProcedureEvidenceProcessExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilProcedureEvidenceProcessChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilProcedureEvidenceProcessChapters.find(
    (c) => c.id === chapterId,
  );
  return chapter
    ? civilProcedureEvidenceProcessTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
