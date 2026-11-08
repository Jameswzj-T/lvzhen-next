import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

// Twenty original fictional cases, paired as choice and full written forms.
export const civilProcedureRemediesSpecialRevision =
  "civil-procedure-remedies-special-2026-10-29.v1";
export const civilProcedureRemediesSpecialSources: ContentSources = {
  "civpro-remedies-special-appeal-scope-basis": {
    title: "《民事诉讼法》第175条；《民诉法解释》第321条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。二审围绕上诉请求；只对可独立处理的利息部分上诉，不主动改动双方均未上诉的本金部分。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-appeal-new-counterclaim-basis": {
    title: "《民诉法解释》第326条",
    url: "https://www.quanzhou.gov.cn/zfb/xxgk/zfxxgkzl/fgwj/sfjs/202304/t20230412_2868534.htm",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。二审才提出的独立反诉可以自愿调解，调解不成且未获双方同意一并审理，应告知另行起诉。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-appeal-basic-facts-basis": {
    title: "《民事诉讼法》第177条第1款引句及第3项",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。原判认定基本事实不清，可裁定撤销原判发回重审，也可由二审查清后改判。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-appeal-remand-once-basis": {
    title: "《民事诉讼法》第177条第2款",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。同一案已发回重审，原审重审判决后再上诉，二审不得再次发回，应自行依法处理。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-retrial-new-evidence-basis": {
    title:
      "《民事诉讼法》第211条引句及第1项；《民事诉讼法》第216条；《民诉法解释》第386条第1款引句及第1项",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。足以推翻原判的新证据属于法定再审事由；自知道或应知道该事由起4个月申请，虽距生效超过6个月，仍未超过该事由的特别申请期间。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-retrial-execution-basis": {
    title: "《民事诉讼法》第210条末句；《民事诉讼法》第217条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。仅提交再审申请不停止原判执行；不能把提出申请与法院已经裁定再审混同。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-supervision-after-rejection-basis": {
    title:
      "《民事诉讼法》第220条第1款引句及第1项；《民诉法解释》第381条第1款引句及第1项",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。法院驳回再审申请后，可向检察院申请检察建议或者抗诉；不是对驳回裁定普通上诉或向法院无限重复再审申请。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-supervision-same-level-basis": {
    title: "《民事诉讼法》第219条第1、2款",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。地方同级检察院发现同级法院生效判决有法定再审事由，可向同级法院提出再审检察建议并报上级备案，也可提请上级检察院抗诉；不能自己对同级法院直接抗诉。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-public-interest-body-basis": {
    title: "《民事诉讼法》第58条第1款；《消费者权益保护法》第47条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。大量消费者权益受到侵害并损害社会公共利益，法律授权的机关或有关组织可起诉；普通个人不能仅凭热心直接以公益原告起诉。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-public-interest-private-basis": {
    title: "《民诉法解释》第286条",
    url: "https://www.quanzhou.gov.cn/zfb/xxgk/zfxxgkzl/fgwj/sfjs/202304/t20230412_2868534.htm",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。公益案已受理，不妨碍同一侵权行为的直接受害人另提自己的私益赔偿请求。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-third-party-revocation-basis": {
    title: "《民事诉讼法》第59条第3款；《民诉法解释》第293条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。符合第59条前两款第三人身份，非归责未参加且有证据表明生效裁判内容错误损害其民事权益，可在知道或应知道受损起6个月内向作出生效裁判的法院提第三人撤销之诉。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-third-party-fault-basis": {
    title: "《民事诉讼法》第59条第3款；《民诉法解释》第293条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。明知诉讼且收到参加通知，具备参加条件却故意拒绝参加，不满足不能归责本人的条件，不能仅凭事后不满走第三人撤销之诉。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-missing-return-basis": {
    title: "《民事诉讼法》第193条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。被宣告失踪者重新出现，本人或者利害关系人申请后，法院应以新判决撤销原宣告失踪判决。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-capacity-recovery-basis": {
    title: "《民事诉讼法》第201条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。法院已认定无民事行为能力者的原因完全消除，经本人、利害关系人或有关组织申请并由法院查实，应作新判决撤销原判决；医学诊断本身不自动替代该程序。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-mediation-confirmation-basis": {
    title: "《民事诉讼法》第205条；《民事诉讼法》第206条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。依法设立人民调解组织主持的有效协议，双方在生效后第20日共同向有权法院申请司法确认，未过30日；法院须依法审查，非自动盖章确认。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-security-disputed-basis": {
    title: "《民事诉讼法》第208条；《民诉法解释》第370条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。实现担保物权申请中，对债权是否存在等有整体实质性争议，应裁定驳回申请并告知另诉；这不是实体确认债权不存在。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-payment-conditions-basis": {
    title: "《民事诉讼法》第225条；《民诉法解释》第427条第1款",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。到期、数额确定的金钱债权，符合全部条件可向有权基层法院申请支付令，不以债务人事先同意为前提。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-payment-objection-basis": {
    title:
      "《民事诉讼法》第227条第2款；《民事诉讼法》第228条；《民诉法解释》第435条引句及第4项",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。收到后第10日提出书面实体异议，处于法定15日内；法院形式审查认为成立，应裁定终结督促、支付令失效，依法转诉讼，申请人不同意提诉的除外。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-notice-lost-bill-basis": {
    title:
      "《民事诉讼法》第229条第1款；《民诉法解释》第442条；《民事诉讼法》第230条；《民事诉讼法》第233条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。可背书转让汇票的遗失前最后持有人，可向票据支付地基层法院申请公示催告。 受理后应先止付、公告；无人申报时依申请作出宣告票据无效判决，受理并不立即使票据无效。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-remedies-special-notice-right-claim-basis": {
    title: "《民事诉讼法》第232条；《民诉法解释》第449条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29按现行民事诉讼法及对应正式规则核对。公告期内利害关系人出示同一张票据申报，经核对一致，应裁定终结公示催告并通知；申请人或申报人可另行起诉，程序终结不把票据权利自动判给申报人。 原创教学案例，人物与金额为虚构，不是官方试题。",
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
    id: "civpro-remedies-special-appeal-scope",
    topicId: "civpro-appeal-scope",
    title: "只对利息提出上诉",
    facts:
      "设备买卖案一审判令买方支付本金10万元及利息。买方只对利息起算日提出上诉，卖方没有上诉，双方均确认本金10万元无争议。二审审查中不存在一审判决违反法律禁止性规定、损害国家利益、社会公共利益或他人合法权益的情况。卖方仍希望二审顺便把本金提高到12万元，但未提出法定期间内的上诉请求。",
    prompt: "二审应围绕什么范围审理？能否按卖方的想法顺便增加本金？",
    reference:
      "二审应围绕利息起算日这一上诉请求，审查相关事实和法律。本金部分没有上诉请求，本题也没有需要依职权审查的例外，二审不应顺便把本金提高到12万元。上诉不是把全案所有部分重新开放一遍。",
    answer: "b",
    options: [
      {
        text: "只要进入二审，一审所有请求都必须重新审一遍。",
        explanation: "二审通常围绕上诉请求，不自动全面重审。",
      },
      {
        text: "围绕利息起算日审查，本题不能顺便增加无人上诉的本金。",
        explanation: "二审以具体上诉请求为审理范围，题设排除了依职权审查例外。",
      },
      {
        text: "卖方没有上诉，所以利息问题也不能审。",
        explanation: "买方已经就利息依法提出上诉。",
      },
      {
        text: "本金、利息同属一笔债务，二审可直接增加本金而不问上诉范围。",
        explanation: "关联不等于可以无视当事人的上诉请求和本题排除的例外。",
      },
    ],
    points: [
      {
        label: "围绕利息上诉审查",
        meaning: "联系买方仅争利息起算日，说明二审围绕该请求的事实与法律审查。",
        boundary: "不要求复述全部例外或条号。",
      },
      {
        label: "本题不增加本金",
        meaning: "说明双方未对本金提出上诉，且无题设例外，不能顺便提高本金。",
        boundary: "不概括成二审任何时候都不得审查未上诉事项。",
      },
    ],
    sources: ["civpro-remedies-special-appeal-scope-basis"],
  },
  {
    id: "civpro-remedies-special-appeal-new-counterclaim",
    topicId: "civpro-appeal-scope",
    title: "到二审才提出质量反诉",
    facts:
      "一审审理甲要求乙支付设备尾款的案件，乙当时没有提出反诉。乙上诉后，首次要求甲赔偿另一项设备质量损失，并作为反诉提交二审法院。二审尝试就新反诉调解，未能达成协议；甲明确不同意由二审一并审理这个新请求。",
    prompt:
      "二审对这个新反诉应怎样处理？是否因此就认定乙的质量损失主张不成立？",
    reference:
      "应告知乙就新反诉另行起诉。二审中新提出的反诉可以先调解，调解不成，且双方未同意由二审一并审理，就不应直接在二审裁判该项反诉。另行起诉是程序上的安排，不是认定乙的质量损失主张没有道理。",
    answer: "d",
    options: [
      {
        text: "二审必须不经甲同意，立即判决新反诉。",
        explanation: "法律给一并裁判保留双方同意条件。",
      },
      {
        text: "二审不直接审理，就应判乙永久失去这笔赔偿权。",
        explanation: "程序分开处理不决定实体请求胜败。",
      },
      {
        text: "只要出现新反诉，就必须把原来整个案件发回重审。",
        explanation: "新反诉调解不成通常告知另诉，不是当然全案发回。",
      },
      {
        text: "告知乙另行起诉，不因此认定质量损失主张在实体上不成立。",
        explanation: "调解不成且无双方同意一并审理，转由另诉解决新反诉。",
      },
    ],
    points: [
      {
        label: "告知新反诉另行起诉",
        meaning:
          "联系二审才提出、调解不成、甲不同意一并审理，说明应告知乙另诉。",
        boundary: "不要求概括所有新增请求，只判断本题反诉。",
      },
      {
        label: "程序处理不等于实体败诉",
        meaning:
          "说明另诉并不认定质量损失主张不成立，具体责任在相应诉讼中审理。",
        boundary: "不要求预测反诉最终胜败。",
      },
    ],
    sources: ["civpro-remedies-special-appeal-new-counterclaim-basis"],
  },
  {
    id: "civpro-remedies-special-appeal-basic-facts",
    topicId: "civpro-appeal-disposition",
    title: "交货数量没有查清",
    facts:
      "供货案一审判令买方支付全部货款。二审发现，决定价款的实际交货数量没有查清，原判据以计算总价的基本事实不清。案件没有遗漏当事人、违法缺席等严重程序问题，二审也尚未把交货数量查明。上诉人认为只要属于基本事实不清，就只能发回重审。这是本案第一次进入二审，此前没有发回重审。",
    prompt:
      "基本事实不清时，二审有哪些处理途径？能否在尚未查清数量的情况下直接按猜测改判金额？",
    reference:
      "二审有两条法定途径：裁定撤销原判、发回重审，或者由二审查清事实后改判，不是只能发回。若选择自己审理，就要先查清交货数量等基本事实，再确定货款，不能在数量仍不清楚时猜一个金额改判。",
    answer: "a",
    options: [
      {
        text: "可以撤销发回，也可以查清事实后改判；不能凭猜测确定金额。",
        explanation: "基本事实不清有两种处理方式，自行改判须先查清。",
      },
      {
        text: "只能发回，二审没有自行查清事实后改判的权力。",
        explanation: "法律明确保留查清事实后改判的途径。",
      },
      {
        text: "只要认为一审不对，二审可以直接估算一个数额改判。",
        explanation: "事实认定仍须有证据和查明过程。",
      },
      {
        text: "只要不是严重程序错误，就必须维持原判。",
        explanation: "基本事实不清也需要依法纠正。",
      },
    ],
    points: [
      {
        label: "说明两种处理途径",
        meaning: "指出撤销发回重审，或者二审查清事实后改判，两者均为法定途径。",
        boundary: "本题不是遗漏当事人等严重程序违法，不套用必须发回情形。",
      },
      {
        label: "改判前须查清基本事实",
        meaning:
          "说明若由二审自行改判，应先查清交货数量，不能在数量不清时猜测金额。",
        boundary: "认可结合查清事实后再定金额的自然表述，不强求分句。",
      },
    ],
    sources: ["civpro-remedies-special-appeal-basic-facts-basis"],
  },
  {
    id: "civpro-remedies-special-appeal-remand-once",
    topicId: "civpro-appeal-disposition",
    title: "已经发回过一次",
    facts:
      "运输费案件第一次上诉时，二审因基本事实不清，裁定撤销原判并发回重审。原审法院重新审理后作出新判决，当事人再次上诉。第二次二审仍认为费用计算的部分基础事实需要核实，准备以此再发回原审法院审一次。",
    prompt: "第二次二审能否再次发回重审？尚需核实的事实应怎样处理？",
    reference:
      "不能再次发回。案件已经发回重审并作出新判决，再次上诉后，二审不得把案件又发回。本案仍有事实需要核实，应由二审依法查清后作出裁判，不能让案件在两级法院之间反复往返。",
    answer: "c",
    options: [
      {
        text: "只要还有不清楚的事实，就可无限次发回。",
        explanation: "已有发回重审后再上诉这一事实，不能忽略次数限制。",
      },
      {
        text: "既然不得再次发回，就只能维持原判。",
        explanation: "不能再发回不等于必须维持错误裁判。",
      },
      {
        text: "不得再次发回，应由二审依法查清后作出裁判。",
        explanation: "重审判决再次上诉后，法律限制重复发回。",
      },
      {
        text: "第二次上诉应自动转成当事人申请再审。",
        explanation: "本次仍是对重审一审判决依法提起的上诉。",
      },
    ],
    points: [
      {
        label: "不得再次发回",
        meaning: "联系已经发回重审后又作判决、再次上诉，说明二审不得再次发回。",
        boundary: "不需要讨论本题未涉及的再审程序。",
      },
      {
        label: "由二审查清并裁判",
        meaning:
          "说明仍应由二审依法核实事实并作出裁判，而非当然维持或让原审反复重审。",
        boundary: "不要求预判核实后的胜败和具体金额。",
      },
    ],
    sources: ["civpro-remedies-special-appeal-remand-once-basis"],
  },
  {
    id: "civpro-remedies-special-retrial-new-evidence",
    topicId: "civpro-retrial-application",
    title: "后来恢复的银行记录",
    facts:
      "公司起诉许安返还借款，一审认定尚未还款，判决已生效。审理时银行系统发生事故，无法恢复一笔关键历史交易，许安曾申请调取也未能取得。判决生效8个月后，银行首次恢复备份并通知许安：原来借款到期前，他已按公司指定账号足额转账，记录载有明确借款编号，与本案直接对应。许安收到记录4个月后，向有权法院以这份新证据申请再审。此前他没有办法取得或得知这份恢复记录。",
    prompt:
      "这类新证据能否成为申请再审的依据？能否仅因判决生效已超过6个月，就认定申请必然超期？",
    reference:
      "可以作为申请再审的依据。这份后来取得的银行记录直接证明本案借款已足额偿还，与原判认定未还款相反，具有推翻原判的作用。对这类足以推翻原判的新证据，申请期限从知道或者应当知道该事由起算6个月。许安收到恢复记录4个月后申请，按题设没有超过这一期限，不能只看判决生效已超过6个月。",
    answer: "b",
    options: [
      {
        text: "生效超过6个月后发现任何新证据，都绝对不能申请再审。",
        explanation: "符合特定新证据事由的，适用知悉事由后的起算规则。",
      },
      {
        text: "可依据新证据申请，期限按知道或应当知道该事由起算6个月审查。",
        explanation: "新证据事由有特殊起算规则，不能机械只看原判生效日。",
      },
      {
        text: "只要有任何新材料，不论是否影响原判，都应再审。",
        explanation: "要求新证据足以推翻原裁判，非无关材料。",
      },
      {
        text: "拿到新证据就自动撤销原判，不用法院审查。",
        explanation: "申请及证据仍须由法院依法审查。",
      },
    ],
    points: [
      {
        label: "新证据能动摇原判",
        meaning:
          "联系恢复记录足额还款且对应本笔借款，与未还款的原判相反，说明可据此申请再审。",
        boundary: "不是有新文件就当然再审；本题不要求学生亲自鉴定银行材料。",
      },
      {
        label: "适用知悉事由起算",
        meaning:
          "说明这类事由从知道或应当知道起6个月，取得记录4个月后申请未超期。",
        boundary:
          "不把一切再审事由的期限都改成任意知悉时间，也不要求推算具体日期。",
      },
    ],
    sources: ["civpro-remedies-special-retrial-new-evidence-basis"],
  },
  {
    id: "civpro-remedies-special-retrial-execution",
    topicId: "civpro-retrial-application",
    title: "递交再审申请后能否停执行",
    facts:
      "两家公司借款纠纷的二审判决已经生效，债权公司正在申请执行。债务公司刚向有权法院递交再审申请，法院尚在审查，还没有裁定再审，也没有作出任何停止执行的裁定。债务公司据此要求执行人员立即撤销账户冻结，称“再审申请一交，原判就不能执行了”。",
    prompt: "递交再审申请是否自动停止原判执行？是否意味着原判已经被撤销？",
    reference:
      "不会自动停止执行。现在只是提出再审申请，法院尚未裁定再审，原生效判决仍可依法执行，不能仅凭申请就要求解冻。提出申请也没有撤销原判；是否再审、原判是否需要改变，都要经过相应审查和裁判。",
    answer: "d",
    options: [
      {
        text: "一递交再审申请，所有执行措施都应自动撤销。",
        explanation: "申请再审依法不停止原判执行。",
      },
      {
        text: "递交申请虽然不停止执行，但原判已自动作废。",
        explanation: "原判不会因申请而失效。",
      },
      {
        text: "只要原判进入执行，当事人就永远不能申请再审。",
        explanation: "执行本身不排除依法申请再审。",
      },
      {
        text: "申请不自动停止执行，也不等于原判已撤销。",
        explanation: "当事人申请再审与法院依法决定再审、改变裁判，是不同阶段。",
      },
    ],
    points: [
      {
        label: "申请不自动停止执行",
        meaning:
          "联系尚未裁定再审、无停止执行决定，说明仅递交申请不能要求自动解冻。",
        boundary: "不混同法院决定再审后的中止执行规则。",
      },
      {
        label: "原判没有自动撤销",
        meaning: "说明申请本身不撤销原判，改变裁判仍须依法审查和裁判。",
        boundary: "不要求复述审判监督全部流程。",
      },
    ],
    sources: ["civpro-remedies-special-retrial-execution-basis"],
  },
  {
    id: "civpro-remedies-special-supervision-after-rejection",
    topicId: "civpro-procuratorial-supervision",
    title: "再审申请被驳回以后",
    facts:
      "借款案生效判决认定林禾应当还款。林禾认为主要还款凭证被漏看，依法向法院申请再审，法院已经作出驳回再审申请的裁定。收到裁定一个月后，林禾准备向有权检察院提交该裁定和证据，请求检察监督。他此前没有向检察院申请过监督。朋友说，法院驳回以后就再也不能申请检察监督了。",
    prompt:
      "林禾此时能否向检察院申请监督？提交申请是否意味着检察院必须抗诉、原判随即撤销？",
    reference:
      "可以向检察院申请检察建议或者抗诉。法院已经驳回再审申请，属于法律明确允许当事人申请检察监督的情形。申请后，检察院还要依法审查，决定是否提出检察建议或者抗诉；不是一收材料就必须抗诉，更不会由申请本身自动撤销原判。",
    answer: "a",
    options: [
      {
        text: "可以申请检察建议或抗诉，由检察院审查决定，不是申请即抗诉。",
        explanation: "法院驳回再审申请属于法定监督申请入口。",
      },
      {
        text: "法院驳回再审申请以后，所有检察监督入口都永久关闭。",
        explanation: "驳回再审申请恰是法律列举的申请条件之一。",
      },
      {
        text: "只要申请人坚持原判有错，检察院就必须立即抗诉。",
        explanation: "仍需依法审查是否符合提出监督意见的条件。",
      },
      {
        text: "向检察院交材料当天，原判就自动撤销。",
        explanation: "申请监督不自行改变生效裁判。",
      },
    ],
    points: [
      {
        label: "驳回后可申请检察监督",
        meaning: "联系法院已驳回再审申请，说明可以申请检察建议或者抗诉。",
        boundary: "认可直接说申请检察监督，不强求两种方式逐字齐列。",
      },
      {
        label: "监督是否提出须审查",
        meaning:
          "说明检察院依法审查后决定，不因提出申请就必须抗诉或自动撤销原判。",
        boundary: "不要求背三个月审查期限。",
      },
    ],
    sources: ["civpro-remedies-special-supervision-after-rejection-basis"],
  },
  {
    id: "civpro-remedies-special-supervision-same-level",
    topicId: "civpro-procuratorial-supervision",
    title: "同级检察院应走哪条监督路线",
    facts:
      "甲区检察院审查后发现，甲区法院的一份生效民事判决赖以认定基本事实的主要证据系伪造，符合应当再审的法定情形。甲区检察院准备直接以自己的名义向甲区法院提出民事抗诉。这里讨论的是生效民事裁判监督，不涉及刑事抗诉。",
    prompt:
      "甲区检察院能否按所述方式直接向同级法院抗诉？依法可以采用哪些监督方式？",
    reference:
      "不能把同级检察院直接向同级法院抗诉作为本案路线。甲区检察院可以向甲区法院提出再审检察建议，并报上级检察院备案；也可以提请上级检察院提出抗诉。要区分同级检察建议与上级检察院抗诉，不能把两种权限混在一起。",
    answer: "c",
    options: [
      {
        text: "甲区检察院可以直接对甲区法院的生效判决抗诉，层级没有限制。",
        explanation: "法定抗诉层级与同级检察建议有区别。",
      },
      {
        text: "只有最高人民检察院能监督民事生效判决。",
        explanation: "地方检察机关依法也有监督权限。",
      },
      {
        text: "可以提出同级再审检察建议，或提请上级检察院抗诉，不能按拟议方式直接同级抗诉。",
        explanation: "民事裁判监督的两条路线及机关层级不同。",
      },
      {
        text: "只要发现伪造证据，甲区检察院就能自行撤销法院判决。",
        explanation: "检察机关通过法定监督程序提出意见，不直接撤销法院裁判。",
      },
    ],
    points: [
      {
        label: "不能直接同级抗诉",
        meaning: "说明甲区检察院不能照拟议方式直接向甲区法院提出民事抗诉。",
        boundary: "不套用刑事抗诉规则。",
      },
      {
        label: "区分两条法定路线",
        meaning: "说明可向同级法院提出再审检察建议，或者提请上级检察院抗诉。",
        boundary: "两条路线均需表达；报备细节可作补充，不强求条号。",
      },
    ],
    sources: ["civpro-remedies-special-supervision-same-level-basis"],
  },
  {
    id: "civpro-remedies-special-public-interest-body",
    topicId: "civpro-public-interest",
    title: "谁能为众多消费者提公益诉讼",
    facts:
      "一家连锁健身企业长期使用统一条款，规定任何门店关闭都不退预付卡余额，涉及大量现有和未来消费者。省级消费者协会收集了合同、关店公告和投诉凭证，拟请求法院判令停止使用损害众多消费者权益的条款。没有购买过该企业服务的市民周宁也很关心这件事，准备仅凭普通个人身份提起同样的民事公益诉讼。",
    prompt:
      "省级消费者协会与周宁，谁具有本题这类公益诉讼的法定起诉资格？热心公益是否就能代替主体资格？",
    reference:
      "省级消费者协会具有法律规定的相关起诉资格，可以就侵害众多消费者合法权益的行为依法提起公益诉讼。周宁仅凭热心市民的个人身份，不具有本题这类民事公益诉讼的法定主体资格。关心公共利益可以投诉、提供线索或支持依法维权，但不能代替法律规定的起诉资格。",
    answer: "b",
    options: [
      {
        text: "任何个人只要自称维护公共利益，都能提起同样的公益诉讼。",
        explanation: "公益目的不能代替法定主体资格。",
      },
      {
        text: "省级消费者协会依法有相关资格，周宁不能仅凭热心个人身份提该类公益诉讼。",
        explanation: "公益诉讼的起诉主体须有法律依据。",
      },
      {
        text: "消费者协会只有自己买过卡并受损，才可能起诉。",
        explanation: "公益主体的法定资格不是以其自身购买受损为前提。",
      },
      {
        text: "这类事项只能由检察院起诉，法律规定的组织一律不能起诉。",
        explanation: "法律允许有关机关、组织依法提起公益诉讼。",
      },
    ],
    points: [
      {
        label: "识别消协的法定资格",
        meaning:
          "说明省级消费者协会可就本题侵害众多消费者权益的行为依法提起公益诉讼。",
        boundary: "只判断主体资格，不要求预判全部请求必获支持。",
      },
      {
        label: "个人热心不代替资格",
        meaning:
          "说明周宁普通个人身份、热心公益本身不足以取得该类公益诉讼主体资格。",
        boundary: "不扩大为个人不能维护自己的民事权益或提供公益线索。",
      },
    ],
    sources: ["civpro-remedies-special-public-interest-body-basis"],
  },
  {
    id: "civpro-remedies-special-public-interest-private",
    topicId: "civpro-public-interest",
    title: "公益案受理后，自己的损失怎么办",
    facts:
      "法院已受理省级消费者协会针对某连锁商家统一侵权条款提起的公益诉讼。消费者许清因同一行为实际损失3000元，持有付款凭证，准备另行起诉请求退还自己的款项。商家称已有公益案在审，任何消费者都不能再就自己的损失起诉。许清的私人赔偿请求符合普通民事起诉条件。",
    prompt:
      "公益案在审是否阻止许清另行主张个人赔偿？公益诉讼受理是否已经等于法院确认他应获3000元？",
    reference:
      "不会阻止。公益诉讼维护社会公共利益，不妨碍同一侵权行为的受害人依法起诉，主张自己的损失。许清符合普通民事起诉条件，可以另行主张3000元；但公益案已经受理，不等于这笔个人赔偿已被判给他，具体损失和责任仍须依法审理。",
    answer: "d",
    options: [
      {
        text: "已有公益诉讼，全部个人请求都不得再进入法院。",
        explanation: "法律明确保留受害人的私益诉讼。",
      },
      {
        text: "公益案一受理，许清便可直接申请强制执行3000元。",
        explanation: "受理不是针对其个人请求作出的执行依据。",
      },
      {
        text: "许清只能让消协把他列为公益诉讼的共同原告，不能自己起诉。",
        explanation: "普通个人受害人可以通过私益诉讼主张自己的权利。",
      },
      {
        text: "许清可依法另行起诉，个人3000元请求仍须审理。",
        explanation: "公益诉讼与受害人的个人请求可以分别处理。",
      },
    ],
    points: [
      {
        label: "私益诉讼仍可提起",
        meaning: "说明公益案受理不妨碍许清就个人损失依法起诉。",
        boundary: "不要求加入公益诉讼，不混为其他主体重复提公益案。",
      },
      {
        label: "个人赔偿仍须审理",
        meaning: "说明受理公益案不直接确认3000元归许清，个人请求仍需依法审理。",
        boundary: "不要求另算赔偿金额。",
      },
    ],
    sources: ["civpro-remedies-special-public-interest-private-basis"],
  },
  {
    id: "civpro-remedies-special-third-party-revocation",
    topicId: "civpro-third-party-revocation",
    title: "判决把案外人的画判给了别人",
    facts:
      "沈禾将自己购买的一幅画交甲保管。甲、乙后来诉讼争夺这幅画，却向法院隐瞒沈禾的存在，法院在沈禾未参加时作出生效判决，将画的所有权判归乙。沈禾直到收到乙索画的消息才知道诉讼，此前没有收到通知，也没有其他应当知悉的线索。购画付款和交甲保管的原始记录均载明画由沈禾购买、交甲保管；原判却把甲当作所有人，将画判归乙。知道权益受损4个月后，他准备提起第三人撤销之诉；未曾就该画申请执行异议。",
    prompt:
      "沈禾能否按本题事实提起第三人撤销之诉？应向哪家法院、在什么期间内提出？",
    reference:
      "可以。沈禾对画有独立权利，因为被隐瞒而未能参加原诉讼，并非自己放弃参加；他又有证据证明生效判决的归属处理错误并损害其权益。应自知道或者应当知道权益受损之日起6个月内，向作出原生效判决的法院起诉。本题知悉后4个月提出，尚在该期间内。",
    answer: "a",
    options: [
      {
        text: "可在知悉或应知受损起6个月内，向作出原生效判决的法院起诉。",
        explanation:
          "第三人资格、非本人原因未参加及错误裁判损害权益均有题设依据。",
      },
      {
        text: "只要原判生效，未参加诉讼的权利人就永远没有救济。",
        explanation: "第三人撤销之诉就是法定的特定救济入口。",
      },
      {
        text: "可以随时起诉，没有任何期间要求。",
        explanation: "法定期限为知道或应当知道权益受损起6个月。",
      },
      {
        text: "必须向最高人民法院起诉，因为基层法院不能撤销自己的裁判。",
        explanation: "该诉讼由作出原生效裁判的法院受理。",
      },
    ],
    points: [
      {
        label: "符合第三人撤销条件",
        meaning:
          "联系对画的独立权利、被隐瞒而无过错未参加、原判错误损害权益，说明可提撤销之诉。",
        boundary: "不要求重复每份凭证名称，不等于起诉就自动撤销。",
      },
      {
        label: "法院与期间正确",
        meaning:
          "说明向作出原生效判决的法院提出，知悉或应知受损起6个月内，本案4个月及时。",
        boundary: "不从原诉讼开始或任意迟延知晓之日重新计算。",
      },
    ],
    sources: ["civpro-remedies-special-third-party-revocation-basis"],
  },
  {
    id: "civpro-remedies-special-third-party-fault",
    topicId: "civpro-third-party-revocation",
    title: "明知诉讼却故意不参加",
    facts:
      "顾宁知道甲、乙正在诉讼争夺一台他主张所有权的机器。法院已明确告知案件及申请参加诉讼的方式，他能够正常联系法院，却表示“先让他们争，我不参加”。顾宁没有被列入原案当事人，也没有客观障碍。原判生效后，他得知机器被判归乙，4个月后以自己没有参加原案为由提起第三人撤销之诉，并称只要还没过6个月就一定能起诉。",
    prompt:
      "顾宁故意不参加的情形，是否符合第三人撤销之诉对未参加原因的要求？仅在6个月内起诉是否就足够？",
    reference:
      "不符合。第三人撤销之诉要求因不能归责于本人的事由未参加原诉讼；顾宁明知诉讼、能够参加，却自己决定不参加，不能只用“原案没有我”满足这个条件。6个月是期限要求，不会替代其他起诉条件。即使他在4个月内提出，也不能补足本题缺少的非本人原因。",
    answer: "c",
    options: [
      {
        text: "没有被列为当事人就足够，不必考虑他为何没有参加。",
        explanation: "未参加的原因是否可归责本人是关键条件。",
      },
      {
        text: "只要对机器提出过所有权主张，就可以故意观望后再撤销原判。",
        explanation: "独立权利主张并不免除其他法定条件。",
      },
      {
        text: "不符合非本人原因未参加的要求，在6个月内也不能补足这一条件。",
        explanation: "及时提出与具备法定起诉条件是两回事。",
      },
      {
        text: "4个月已经超过第三人撤销之诉的一般法定6个月期限。",
        explanation: "本案问题在未参加原因，不是把4个月算成超6个月。",
      },
    ],
    points: [
      {
        label: "故意不参加可归责本人",
        meaning:
          "联系顾宁明知且无障碍仍主动不参加，说明不符不能归责本人的要求。",
        boundary: "不把所有未参加者都视为有过错，应依本题事实判断。",
      },
      {
        label: "期限不替代其他条件",
        meaning:
          "说明在知悉受损6个月内提出只解决期间，不能弥补未参加原因的缺失。",
        boundary: "不得虚构本题已经超期。",
      },
    ],
    sources: ["civpro-remedies-special-third-party-fault-basis"],
  },
  {
    id: "civpro-remedies-special-missing-return",
    topicId: "civpro-special-status",
    title: "被宣告失踪的人回来了",
    facts:
      "林安长期与家人失去联系，法院依法宣告其失踪。两年后，林安回到原住所，能够出示证件并说明去向，家人也确认是本人。林安希望撤销失踪宣告，有人告诉他，只能由当初申请宣告失踪的亲属提出，自己无权申请。",
    prompt:
      "林安本人能否申请撤销失踪宣告？法院核实其重新出现后，应怎样处理原判决？",
    reference:
      "林安本人可以申请，利害关系人也可以提出，不限于当初的申请人。法院核实被宣告失踪的人确已重新出现后，应作出新判决，撤销原来的失踪宣告判决。回家这个事实说明需要改变宣告，但仍应通过法院的新判决办理。",
    answer: "b",
    options: [
      {
        text: "只能由当初申请宣告失踪的那一个亲属申请。",
        explanation: "法律也允许本人及其他利害关系人申请。",
      },
      {
        text: "本人或利害关系人可申请，法院核实后作新判决撤销失踪宣告。",
        explanation: "申请主体并不限于原申请人，撤销由法院通过新判决完成。",
      },
      {
        text: "本人已经回家，原法院判决立即自动从法律上撤销，无须任何处理。",
        explanation: "应由法院依申请核实并作出新判决。",
      },
      {
        text: "宣告失踪一旦生效，即便本人回来也永远不能撤销。",
        explanation: "重新出现时有法定撤销程序。",
      },
    ],
    points: [
      {
        label: "本人有申请资格",
        meaning: "指出林安本人可以申请撤销失踪宣告，不限于原申请人。",
        boundary: "认可同时提到利害关系人，不强求罗列所有亲属。",
      },
      {
        label: "新判决撤销原判",
        meaning: "说明法院核实重新出现后应作新判决撤销原失踪宣告。",
        boundary: "不要求重述最初失踪年限，不把实际回家等同原判自动撤销。",
      },
    ],
    sources: ["civpro-remedies-special-missing-return-basis"],
  },
  {
    id: "civpro-remedies-special-capacity-recovery",
    topicId: "civpro-special-status",
    title: "病情恢复后怎样改变能力认定",
    facts:
      "赵宁成年后因疾病长期不能辨认自己的行为，法院依法判决认定其为无民事行为能力人。经治疗，他现已恢复完整辨认自己的行为及其后果的能力，能够独立处理生活和财产事务，有医疗材料和其他证据。原判在作出时并无错误，赵宁准备自己申请改变现有认定，家属说只有监护人能够申请，而且只能按原判错误去申请再审。",
    prompt:
      "赵宁本人能否提出申请？法院证实原认定原因已消除时，应按什么方式处理原判？",
    reference:
      "赵宁本人可以申请，利害关系人或者有关组织也可以申请。法院证实无民事行为能力的原因已经消除，应作出新判决，撤销原判决。本案是后来状况恢复，不必硬说当初判错再走再审；医疗材料用于支持申请，也不能代替法院的新判决。",
    answer: "d",
    options: [
      {
        text: "只能由原监护人申请，本人永远无权提出。",
        explanation: "法律明确允许被认定者本人申请。",
      },
      {
        text: "必须证明当初认定错误，否则后来恢复也无法改变。",
        explanation: "本案依据是原因消除，不是追究原判是否错误。",
      },
      {
        text: "任何一张诊断证明都自动撤销法院原判，不必申请或审查。",
        explanation: "法院须依法审查证实原因已经消除。",
      },
      {
        text: "本人可以申请，法院证实原因消除后作新判决撤销原判。",
        explanation: "能力认定原因消除有特别程序处理，不限监护人申请。",
      },
    ],
    points: [
      {
        label: "本人可以提出申请",
        meaning: "说明赵宁可以自己申请，不限于监护人。",
        boundary: "不要求展开诉讼代理和鉴定的细节。",
      },
      {
        label: "原因消除以新判决处理",
        meaning:
          "说明法院证实原因消除后作新判决撤销原判，而非必须认定原判错误再审。",
        boundary: "不把诊断证明当成自动撤销裁判；认可明确新判决撤销的表达。",
      },
    ],
    sources: ["civpro-remedies-special-capacity-recovery-basis"],
  },
  {
    id: "civpro-remedies-special-mediation-confirmation",
    topicId: "civpro-judicial-confirmation-security",
    title: "人民调解协议怎样取得执行依据",
    facts:
      "相邻店铺因漏水维修费发生普通民事纠纷，经依法设立的人民调解委员会自行调解达成付款协议，双方签字后协议生效。第20日，双方共同向该调解委员会所在地有管辖权的基层法院申请司法确认，材料齐全。付款方认为，只要双方共同申请，法院就只能照章确认，不能审查协议内容。",
    prompt:
      "双方此时共同申请是否符合期间和申请主体要求？法院能否不审查就直接确认，确认有效后拒不付款时如何处理？",
    reference:
      "符合要求。司法确认应由双方在调解协议生效后30日内共同申请，本题第20日共同提出，且法院有管辖权。法院仍须依法审查，符合法律规定才裁定协议有效。经确认后，一方拒不履行或未全部履行，对方可以据该有效裁定申请执行；共同申请本身还不是强制执行依据。",
    answer: "a",
    options: [
      {
        text: "20日内双方共同申请符合要求，法院须审查；确认有效后拒不履行可申请执行。",
        explanation: "申请、司法审查、获得执行依据是相接的不同步骤。",
      },
      {
        text: "任何一方可在任意时间单独申请司法确认，法院都必须受理。",
        explanation: "本题适用双方自协议生效起30日内共同申请。",
      },
      {
        text: "双方同意后法院只能盖章，不得审查协议合法性。",
        explanation: "司法确认仍须依法审查。",
      },
      {
        text: "人民调解协议无论是否司法确认，都绝不能通过法院执行。",
        explanation: "经司法确认有效后，法定条件下可申请执行。",
      },
    ],
    points: [
      {
        label: "共同申请及时且合规",
        meaning:
          "联系生效第20日、双方共同向有权法院提出，说明符合30日内共同申请要求。",
        boundary: "不要求背全所有司法确认管辖入口。",
      },
      {
        label: "审查确认后可申请执行",
        meaning:
          "说明法院须审查，裁定确认有效后不履行可申请执行，不是共同申请即当然确认。",
        boundary:
          "认可把依法确认与拒不履行后执行连贯表达，不要求重复每种履行不足情形。",
      },
    ],
    sources: ["civpro-remedies-special-mediation-confirmation-basis"],
  },
  {
    id: "civpro-remedies-special-security-disputed",
    topicId: "civpro-judicial-confirmation-security",
    title: "担保申请遇到整个债权有争议",
    facts:
      "甲公司持登记抵押材料，向担保财产所在地的有权法院申请拍卖乙公司的厂房。乙提出债权从未实际发生，提交银行记录等材料，甲则提交另一套交易凭证。法院审查后确认，双方对整个被担保债权是否存在有实质争议，没有可以单独处理的无争议部分，需要通过诉讼进一步查明。",
    prompt:
      "法院在这件实现担保物权申请中应怎样处理？驳回这次申请是否就等于已经判定甲没有债权？",
    reference:
      "应裁定驳回实现担保物权申请，并告知甲可以提起诉讼。整个债权是否存在有实质争议，不能仅凭抵押登记就在这个简便程序中直接拍卖。本次驳回解决的是程序适用问题，不等于已经判定债权不存在；甲可以在诉讼中提交证据、请求依法处理。",
    answer: "c",
    options: [
      {
        text: "只要有抵押登记，任何债权争议都无须审查，立即拍卖。",
        explanation: "登记不替代对债权及担保物权实现条件的审查。",
      },
      {
        text: "驳回这次申请，就意味着甲以后永远不能主张该债权。",
        explanation: "不符该简便程序不等于实体败诉。",
      },
      {
        text: "驳回申请并告知可起诉，不直接判定甲的债权不存在。",
        explanation: "整体实质争议须通过诉讼解决，不能在特别程序中强行执行。",
      },
      {
        text: "法院必须在这个特别程序里完整判决争议债权归属，不得告知另诉。",
        explanation: "有整体实质争议时应依法驳回申请并告知诉讼途径。",
      },
    ],
    points: [
      {
        label: "整体实质争议转诉讼",
        meaning:
          "联系整个债权存在实质争议、无可分无争议部分，说明裁定驳回申请并告知起诉。",
        boundary: "不把本题扩大为任何轻微或部分异议都必须全部驳回。",
      },
      {
        label: "驳回申请不判实体败诉",
        meaning:
          "说明甲仍可通过诉讼主张债权，本次处理不等于债权已被认定不存在。",
        boundary: "不要求预测另诉最终结果。",
      },
    ],
    sources: ["civpro-remedies-special-security-disputed-basis"],
  },
  {
    id: "civpro-remedies-special-payment-conditions",
    topicId: "civpro-payment-order",
    title: "到期欠款能否申请支付令",
    facts:
      "林禾向甲公司供货后，甲出具书面结算单，确认到期应付6万元，林禾的供货义务已全部完成。双方没有其他债务纠纷，不存在仍待林禾对待给付的事项。甲在境内正常经营，地址明确，文书可以送达。林禾没有申请诉前保全，其余支付令申请条件均满足。他希望先用督促程序催收，但甲表示不愿同意他申请。",
    prompt: "林禾可否申请支付令，应向哪类法院提出？是否必须先取得甲同意？",
    reference:
      "可以向有管辖权的基层法院申请支付令。这是到期、确定的金钱给付，林禾已完成自己的给付义务，双方没有其他债务纠纷，支付令也能送达。申请不以甲事先同意为条件；法院依法受理和审查，甲收到支付令后仍可依法提出书面异议。",
    answer: "b",
    options: [
      {
        text: "只能请求交付房屋，金钱债务不能申请支付令。",
        explanation: "支付令适用于符合条件的金钱或有价证券给付。",
      },
      {
        text: "可以向有管辖权的基层法院申请，无须先取得甲同意。",
        explanation: "条件符合可申请督促程序，同时保留债务人的法定异议权。",
      },
      {
        text: "必须先获得甲签字同意，法院才有权收申请。",
        explanation: "申请条件中没有债务人事先同意这一项。",
      },
      {
        text: "只要申请支付令，就立即剥夺甲提出任何异议的权利。",
        explanation: "债务人收到支付令后可依法提出书面异议。",
      },
    ],
    points: [
      {
        label: "符合支付令申请条件",
        meaning:
          "联系到期确定的金钱债务、没有其他债务纠纷、也没有待履行的对待给付义务、能够送达，说明可向有权基层法院申请。",
        boundary: "不要求逐字复述全部题设排除条件，须体现本案为何可用该程序。",
      },
      {
        label: "不以债务人同意为前提",
        meaning: "说明无须甲先同意，甲仍保留收到支付令后的法定异议权。",
        boundary: "核心为不需事先同意，不强求另背15日。",
      },
    ],
    sources: ["civpro-remedies-special-payment-conditions-basis"],
  },
  {
    id: "civpro-remedies-special-payment-objection",
    topicId: "civpro-payment-order",
    title: "收到支付令后提出还款异议",
    facts:
      "陈启申请支付令，要求杜安归还借款。杜安收到后第10日向法院提出书面异议，说明该笔款项已经偿还并提交相应付款材料。法院依法审查，认为对债务本身的异议成立。陈启不同意杜安的还款说法，明确愿意通过诉讼继续解决。",
    prompt:
      "支付令和督促程序此时应怎样处理？争议接下来是否还可以通过诉讼解决？",
    reference:
      "杜安在收到支付令后的15日内提出书面实体异议，法院审查认为成立，应裁定终结督促程序，支付令自行失效。陈启明确愿意继续诉讼，案件转入诉讼程序，再审理是否已经还款。支付令失效不是判陈启的债权必然不存在。",
    answer: "d",
    options: [
      {
        text: "第10日提出已经超过法定15日，所以可以忽略异议。",
        explanation: "10日在15日期限内。",
      },
      {
        text: "支付令发出后无论异议是否成立，都必须先执行完。",
        explanation: "成立的法定异议会导致督促程序终结及支付令失效。",
      },
      {
        text: "支付令失效即判定从未欠款，债权人永远不能再诉。",
        explanation: "这是程序效果，不是实体债权已经被否定。",
      },
      {
        text: "终结督促程序，支付令失效；依本题意愿转入诉讼处理债务争议。",
        explanation:
          "及时且成立的书面异议阻止按支付令执行，争议可在诉讼中审理。",
      },
    ],
    points: [
      {
        label: "及时异议导致支付令失效",
        meaning:
          "联系收到后第10日书面实体异议且经审查成立，说明终结督促程序、支付令失效。",
        boundary: "法定异议期是15日，不把题中第10日写成法定10日。",
      },
      {
        label: "本案转入诉讼审理",
        meaning:
          "联系陈启明确愿意继续诉讼，说明转入诉讼判断债务，不因支付令失效直接判无债。",
        boundary: "不扩大为申请人不同意起诉时也必须转入。",
      },
    ],
    sources: ["civpro-remedies-special-payment-objection-basis"],
  },
  {
    id: "civpro-remedies-special-notice-lost-bill",
    topicId: "civpro-public-notice",
    title: "遗失可以背书转让的汇票",
    facts:
      "甲公司是某纸质汇票的合法持票人，该汇票依法可以背书转让。汇票在搬迁中遗失，甲已保留票号、金额、出票人和背书记录。票据约定支付地在乙区，甲公司住所地在丙区。甲希望通过法院程序防止他人持遗失票据领款，并恢复依法请求付款的途径。",
    prompt: "甲可申请什么程序，应向哪里提出？法院受理后是否立即宣告票据无效？",
    reference:
      "甲可以向票据支付地乙区的基层法院申请公示催告。受理后并不是马上宣告票据无效，法院要通知支付人停止支付，并公告催促利害关系人申报权利，公告期间不得少于60日。无人申报时，法院还须根据申请人的申请作出宣告票据无效的判决。",
    answer: "a",
    options: [
      {
        text: "向乙区基层法院申请公示催告；受理后先公告等程序，不立即宣告无效。",
        explanation: "地点以票据支付地为准，除权判决须依法定程序作出。",
      },
      {
        text: "只能向甲自己住所地丙区的任何法院申请，不看支付地。",
        explanation: "法定申请法院为票据支付地基层法院。",
      },
      {
        text: "法院一收到申请，这张票据马上自动无效。",
        explanation: "受理、止付、公告和后续判决不是同一步。",
      },
      {
        text: "任何普通欠条遗失，都当然可以照此申请公示催告。",
        explanation:
          "本题以依法可背书转让的票据为前提，不能随意扩展到普通欠条。",
      },
    ],
    points: [
      {
        label: "程序和法院正确",
        meaning:
          "联系依法可背书转让汇票遗失，说明向支付地乙区基层法院申请公示催告。",
        boundary: "不要求把普通债权确认诉讼当作唯一方式。",
      },
      {
        label: "受理不立即宣告无效",
        meaning:
          "说明受理后须经过公告催告等程序，无人申报并依法申请后才作除权判决。",
        boundary: "不强求背60日或所有通知细节，核心是受理不等于立即无效。",
      },
    ],
    sources: ["civpro-remedies-special-notice-lost-bill-basis"],
  },
  {
    id: "civpro-remedies-special-notice-right-claim",
    topicId: "civpro-public-notice",
    title: "公告期间有人拿着票据来申报",
    facts:
      "甲因汇票遗失申请公示催告，法院已受理并公告。公告期间，乙持票据原件向法院申报权利。法院核对后确认，乙提交的正是本案被申请公示催告的同一张汇票。甲、乙对票据应归谁以及乙如何取得发生争执。甲要求法院继续等公告期满后宣告票据无效，乙则认为申报成功就等于法院已经判票款归自己。",
    prompt: "法院此时应否继续公示催告并作除权判决？票据权利争议应如何解决？",
    reference:
      "应裁定终结公示催告程序，并通知申请人和支付人，不能无视同一票据的权利申报继续作除权判决。甲、乙对票据权利有争议，可以向法院起诉，通过诉讼解决。终结公示催告只说明该简便程序不再继续，不是自动把票据权利判给乙。",
    answer: "c",
    options: [
      {
        text: "必须等满公告期后宣告票据无效，任何申报都不予理会。",
        explanation: "收到符合条件的权利申报应依法终结程序。",
      },
      {
        text: "乙一申报，法院便已最终确认票款属于乙，无须再审。",
        explanation: "权利申报不是实体归属判决。",
      },
      {
        text: "终结公示催告，权利争议可以诉讼解决，不自动判乙胜诉。",
        explanation:
          "真实同一票据的申报会终结程序，但票据权利归属仍需依法解决。",
      },
      {
        text: "甲、乙都不得再向法院起诉，只能私下协商。",
        explanation: "申请人或者申报人可以向法院起诉。",
      },
    ],
    points: [
      {
        label: "申报后终结公示催告",
        meaning:
          "联系乙持同一票据原件在公告期内申报，说明应裁定终结而非继续除权。",
        boundary: "本题已经核对票据相同，不要求学生假设是另一张票。",
      },
      {
        label: "争议另由诉讼解决",
        meaning: "说明甲乙可起诉解决票据权利争议，终结不自动认定乙有权。",
        boundary: "不要求预测取得是否合法及票款最终归谁。",
      },
    ],
    sources: ["civpro-remedies-special-notice-right-claim-basis"],
  },
];

const topicDrafts = [
  {
    id: "civpro-appeal-scope",
    chapterId: "CIVPRO-APPEAL-SCOPE",
    title: "二审范围与新增反诉",
    headline: "二审围绕上诉请求；新增反诉另有处理规则。",
    paragraphs: [
      "二审审查上诉请求涉及的事实和法律。未提出上诉请求的部分通常不审；原判违反法律禁止性规定，或损害国家利益、社会公共利益、他人合法权益的除外。",
      "原审被告到二审才提出独立反诉，法院可以自愿调解。调解不成，告知另行起诉；双方同意二审一并审理的，也可以一并裁判。",
    ],
    pitfall:
      "把没有上诉的独立请求顺便加进二审，或把告知另诉误认为该请求已经败诉。",
  },
  {
    id: "civpro-appeal-disposition",
    chapterId: "CIVPRO-APPEAL-DISPOSITION",
    title: "二审裁判与发回限制",
    headline: "基本事实没查清，可以发回或查清改判；同一案件不能反复发回。",
    paragraphs: [
      "第一次二审发现原判认定基本事实不清，可以撤销原判、发回重审，也可以查清事实后改判。不能在事实仍不清楚时任意估算一个结果。",
      "原审法院对发回重审的案件重新判决后，当事人再次上诉，二审法院不得再次发回，应审理并作出裁判。",
    ],
    pitfall: "把基本事实不清一律说成只能发回，或以此为由第二次发回。",
  },
  {
    id: "civpro-retrial-application",
    chapterId: "CIVPRO-RETRIAL-APPLICATION",
    title: "再审事由、期间与执行",
    headline: "申请再审要有法定事由；提出申请不会自动停止执行。",
    paragraphs: [
      "新证据足以推翻原判，可以成为再审事由。一般申请期是裁判生效后6个月；新证据等法定特殊情形，从知道或者应当知道该情形起算6个月。",
      "提出再审申请，不停止生效裁判的执行。法院决定再审后，依法裁定中止原裁判的执行；赡养费、劳动报酬等法定案件可以不中止。申请受理与决定再审是两个阶段。",
    ],
    pitfall: "只看裁判生效时间而漏掉特殊起算点，或把申请再审当成已经撤销原判。",
  },
  {
    id: "civpro-procuratorial-supervision",
    chapterId: "CIVPRO-PROCURATORIAL-SUPERVISION",
    title: "检察监督的申请与方式",
    headline: "再审申请被驳回后，可以申请检察监督；检察院审查后决定如何处理。",
    paragraphs: [
      "法院驳回再审申请，是当事人申请检察建议或者抗诉的法定入口之一。提出申请不等于检察院必然抗诉，更不等于原判已经改判。",
      "地方检察院发现同级法院生效裁判有法定再审事由，可向同级法院提出再审检察建议，也可提请上级检察院抗诉。不要把同级检察建议与上级检察院抗诉混为一谈。",
    ],
    pitfall: "认为法院驳回再审后再无救济，或认为检察院收到申请就必须改掉原判。",
  },
  {
    id: "civpro-public-interest",
    chapterId: "CIVPRO-PUBLIC-INTEREST",
    title: "公益诉讼与个人请求",
    headline: "公益诉讼保护公共利益；个人的赔偿请求仍可依法另诉。",
    paragraphs: [
      "公益诉讼须由法律规定的机关和有关组织等法定主体提起。消费公益诉讼中，中国消费者协会以及省、自治区、直辖市消费者协会有法定起诉资格。普通个人不能只凭热心公益取得这一资格。",
      "公益诉讼已被受理，不影响受害人就自己的损失依法起诉。公益案件保护公共利益，不会自动为每个受害人生成可直接申请执行的个人赔偿金额。",
    ],
    pitfall: "以公益案件已经受理为由，拒绝符合起诉条件的个人赔偿诉讼。",
  },
  {
    id: "civpro-third-party-revocation",
    chapterId: "CIVPRO-THIRD-PARTY-REVOCATION",
    title: "第三人撤销之诉",
    headline: "应参加却因不可归责于自己的原因未参加，才可能用撤销之诉救济。",
    paragraphs: [
      "符合条件的第三人，因不能归责于自己的原因未参加诉讼，且有证据证明生效裁判相关内容错误、损害其民事权益，可以提起撤销之诉。向作出生效裁判的法院起诉，期间为知道或应当知道权益受损之日起6个月。",
      "明知诉讼、有能力参加，却自己决定不参加，不能只因后来结果不利就使用这条救济。起诉期限内提出，也仍要满足其他条件。",
    ],
    pitfall:
      "只检查是否在6个月内，却漏掉未参诉原因、第三人地位和实际权益受损。",
  },
  {
    id: "civpro-special-status",
    chapterId: "CIVPRO-SPECIAL-STATUS",
    title: "宣告失踪与恢复行为能力",
    headline: "情况改变后，由法院用新的判决撤销原来的宣告或认定。",
    paragraphs: [
      "被宣告失踪的人重新出现，经本人或利害关系人申请，法院应作出新判决，撤销失踪宣告。不是只有当初申请宣告失踪的人才能申请撤销。",
      "被认定无民事行为能力的人，恢复到具有完全民事行为能力的状态，可以由本人或利害关系人申请。法院查实后作出新判决撤销原判；医学证明是证据，不能自动替代法院判决。",
    ],
    pitfall: "把后来情况改变一律当成原判当时判错，要求只能走再审。",
  },
  {
    id: "civpro-judicial-confirmation-security",
    chapterId: "CIVPRO-JUDICIAL-CONFIRMATION-SECURITY",
    title: "司法确认与实现担保物权",
    headline: "调解协议可以依法申请确认；担保权实现程序处理不了实质争议。",
    paragraphs: [
      "依法设立的调解组织达成协议后，双方应在协议生效起30日内共同向有管辖权的法院申请司法确认。法院审查确认有效后，一方拒绝或未完全履行，另一方可以申请执行。",
      "申请实现担保物权，法院要审查债权和担保权。存在实质争议的，应驳回申请并告知起诉；只有部分存在实质争议的，可以就无争议部分裁定准许。驳回特别程序申请，不等于判定债权不存在。",
    ],
    pitfall:
      "把共同提交协议当作自动确认，或把担保登记当成可以跳过债权争议的理由。",
  },
  {
    id: "civpro-payment-order",
    chapterId: "CIVPRO-PAYMENT-ORDER",
    title: "支付令的申请与异议",
    headline: "条件合适可申请支付令；债务人可以依法提出书面异议。",
    paragraphs: [
      "请求给付金钱或有价证券，债权债务关系明确且满足法定条件、双方没有其他债务纠纷、支付令能够送达债务人，可向有管辖权的基层法院申请支付令。无需先征得债务人同意。",
      "债务人收到支付令后15日内可以提出书面异议。法院审查异议成立，应终结督促程序，支付令失效；转入诉讼程序，申请支付令的一方不同意提起诉讼的除外。异议成立不等于已经认定债务消灭。",
    ],
    pitfall:
      "认为提出异议就判债务人胜诉，或认为支付令一送到就可以无视法定异议期执行。",
  },
  {
    id: "civpro-public-notice",
    chapterId: "CIVPRO-PUBLIC-NOTICE",
    title: "公示催告与权利申报",
    headline: "票据遗失先公示；有人提出真实权利争议，就转由诉讼解决。",
    paragraphs: [
      "可以背书转让的票据被盗、遗失或者灭失，符合条件的持票人可向票据支付地基层法院申请公示催告。公告期不少于60日；无人申报时，法院依申请作出除权判决，不是申请当天就宣告票据无效。",
      "利害关系人申报并交出与申请所涉相同的票据，经核实后，法院终结公示催告程序并通知双方。谁享有票据权利，发生争议可以起诉解决；申报者不因持票申报就自动胜诉。",
    ],
    pitfall:
      "把公示催告当成直接判定票据归谁的普通诉讼，或把终结程序当成否定失票人全部权利。",
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
export const civilProcedureRemediesSpecialTopics: FaultTopic[] =
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
export const civilProcedureRemediesSpecialChapters = topicDrafts.map(
  (topic) => ({
    id: topic.chapterId,
    title: topic.title,
    section: "民事诉讼法",
    topicIds: [topic.id],
  }),
);
export const civilProcedureRemediesSpecialExercises =
  civilProcedureRemediesSpecialTopics.flatMap((topic) => topic.exercises);
export const civilProcedureRemediesSpecialContentPack = {
  revision: civilProcedureRemediesSpecialRevision,
  snapshot: {
    topics: civilProcedureRemediesSpecialTopics,
    sources: civilProcedureRemediesSpecialSources,
  },
};
export const civilProcedureRemediesSpecialDefaultQueues = {
  objective: civilProcedureRemediesSpecialExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureRemediesSpecialExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureRemediesSpecialQuestion(id: string) {
  const question = civilProcedureRemediesSpecialExercises.find(
    (q) => q.id === id,
  );
  return question ? structuredClone(question) : undefined;
}
export function civilProcedureRemediesSpecialTopicForQuestion(id: string) {
  return civilProcedureRemediesSpecialTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilProcedureRemediesSpecialSameCaseQuestions(id: string) {
  const question = civilProcedureRemediesSpecialQuestion(id);
  return question
    ? structuredClone(
        civilProcedureRemediesSpecialExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilProcedureRemediesSpecialChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilProcedureRemediesSpecialChapters.find(
    (c) => c.id === chapterId,
  );
  return chapter
    ? civilProcedureRemediesSpecialTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
