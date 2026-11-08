import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

/** Isolated original teaching draft. This module does not register or publish it. */
export const civilAgencyRevision = "civil-agency-2026-10-05.v2";

const codeUrl = "https://www.cac.gov.cn/2020-06/01/c_1592561777268319.htm";
const interpretationUrl = "https://www.court.gov.cn/fabu/xiangqing/347221.html";
const sourceBoundary =
  "2026-10-05重核原公布条文；官方现行数据库及2025司法部全文本轮仍未可读，定向检索未形成可引用的最新适用或废改证据。2026现行合并文本及修订/废止状态仍未证，不能据未搜到废止认定有效；仅用于独立准备，未登记。";

export const civilAgencySources = {
  "civil-agency-code-authority": {
    title: "《民法典》第161、162条：可代理性与行为归属",
    url: codeUrl,
    note: `中央网信办网站转载新华社2020-06-01公布文本。第161、162条原文已读；以下知识与题解为教学概括。${sourceBoundary}`,
  },
  "civil-agency-code-unauthorized": {
    title: "《民法典》第171条：无权代理、追认与相对人保护",
    url: codeUrl,
    note: `已读第171条四款；本包设问仅覆盖对本人效力与追认，不要求行为人履行/赔偿或过错比例。${sourceBoundary}`,
  },
  "civil-agency-code-apparent": {
    title: "《民法典》第172条、第173条第2项：表见代理与取消委托",
    url: codeUrl,
    note: `第172条及第173条第2项原文已读；取消委托终止实际代理权，有理由相信的判断同时对照总则编解释第28条。${sourceBoundary}`,
  },
  "civil-agency-code-arrival": {
    title: "《民法典》第137条：有相对人意思表示的生效时间",
    url: codeUrl,
    note: `原文已读。本包仅用非对话书面通知到达这一规则，不考数据电文特别约定。${sourceBoundary}`,
  },
  "civil-agency-interpretation-apparent": {
    title: "总则编司法解释第28条：表见代理条件与举证责任",
    url: interpretationUrl,
    note: `最高人民法院正式全文，法释〔2022〕6号，2022-03-01施行；第25—29、39条已读。第28条要求外观及相对人不知无权且无过失，并分别规定举证责任。${sourceBoundary}`,
  },
  "civil-agency-interpretation-ratification": {
    title: "总则编司法解释第29条：追认意思表示的生效时间",
    url: interpretationUrl,
    note: `第29条连接民法典第137条；不能把本人心中同意或写好函件当成对相对人已生效。${sourceBoundary}`,
  },
} satisfies ContentSources;

export const civilAgencyPreparation = {
  subjectId: "civil-law",
  themeId: "civil-agency",
  title: "民法 / 总则 / 代理",
  status: "isolated-draft-unregistered",
  readyForRegistration: false,
  applicableStage: "客观辨析与自由短答；非官方试题或官方阅卷细则",
  syllabusBoundary: "未核2027正式完整大纲，不宣称覆盖民法全科或年度细目。",
  legalStatusBoundary: sourceBoundary,
  rubricIdentity: "自编教学逐项要求；不设总分，不预测正式考试分数。",
  modelReviewStatus: "未接模型；0真实API、0付费。",
  scope:
    "只判断代理行为对被代理人是否发生效力及必要的追认/表见代理条件；不考损害赔偿、合同履行争议、职务代理、转委托或无权处分。",
} as const;

// All four cases are newly written and factually separate. The two paired questions
// in C2 and C4 share caseId: they are two forms of one case, not independent samples.
const commonFacts =
  "本案为虚构；各方均具备与行为相应的民事行为能力，除代理权限争议外，合同不存在其他效力障碍。";

export const civilAgencyCaseFacts = {
  "civil-agency-C1":
    commonFacts +
    "2026年9月10日，姚宁给苏泊一份书面委托，写明‘请以我的名义，在9月15日前购买一台二手相机，价款不超过8000元’。9月12日，苏泊向相机店出示该委托，谈定价款7200元。合同载明买方姚宁、签约代理人苏泊，苏泊在代理人栏签字。采购的物品、日期和价款均与委托一致。",
  "civil-agency-C2":
    commonFacts +
    "2026年9月1日，晓蘅请许安为她的一次摄影活动联系场地，只准询价，并明确说‘合同最后由我决定、由我来签’；场地经营者陶初也看过这段书面安排。9月3日，许安仍以晓蘅名义与陶初签下18000元的场地租赁合同。9月4日，陶初向晓蘅送达催告，请她在收到通知后30日内追认。9月9日9时，晓蘅签署写明认可9月3日该份合同的追认函并交给快递员；10时30分，函件到达陶初事先指定的通信地址，陶初收到函件；11时陶初拆阅。此前无人向对方发出撤销通知，晓蘅也没有以其他方式确认该合同。",
  "civil-agency-C3":
    commonFacts +
    "孟榆是以个人名义出售自家梨子的果农，委托独立跑单人杜遥签订销售合同。孟榆曾亲自向收购者吕易介绍杜遥，并交付本人签名的授权书：2026年9月1日至11月30日，可按通常价格代售，每份合同不超过300箱。吕易此前按该授权与杜遥签过两份合同，孟榆均交货并收款。9月20日，孟榆通知杜遥取消委托，却未收回授权书，也未告诉吕易。9月22日，杜遥向吕易出示同一份真实授权书，以孟榆名义签下一份100箱、通常价格的销售合同。吕易核对了授权书的期限、数量范围和此前履行记录，未收到取消委托的通知，也未见到与此前交易不同的异常情形。孟榆随后以已经取消委托为由拒绝承认该次代理行为。",
  "civil-agency-C4":
    commonFacts +
    "邱蔚因自宅水管改造，请朋友曹浅代为联系施工者、收集报价，明确没有交给曹浅签约权。曹浅以邱蔚名义与施工者叶承签下改造合同，邱蔚事后明确拒绝追认。叶承现提供一张家装平台截图，曹浅账号被标为‘房主联系人’，旁边列有‘委托确认.pdf’的文件名，但原文件尚未取得，截图也没有显示授权范围。现阶段尚不清楚页面及该文件由谁制作、邱蔚是否确认过其内容，也不清楚叶承签约前是否收到过‘必须由邱蔚确认合同’的通知及他核验授权的经过。曹浅在签约时确实没有代理权，争议仍处于收集资料阶段，尚未完成举证和事实认定。",
} as const;

export const civilAgencyCases = [
  {
    id: "civil-agency-C1",
    title: "限定价款的相机委托",
    usage: "training",
    exerciseIds: ["civil-agency-authorized-purchase"],
    facts: civilAgencyCaseFacts["civil-agency-C1"],
  },
  {
    id: "civil-agency-C2",
    title: "只准询价与后来到达的追认函",
    usage: "training",
    exerciseIds: [
      "civil-agency-ratification-time",
      "civil-agency-ratification-explain",
    ],
    facts: civilAgencyCaseFacts["civil-agency-C2"],
  },
  {
    id: "civil-agency-C3",
    title: "没有收回的梨子销售授权书",
    usage: "training",
    exerciseIds: ["civil-agency-retained-letter"],
    facts: civilAgencyCaseFacts["civil-agency-C3"],
  },
  {
    id: "civil-agency-C4",
    title: "打不开的委托确认文件",
    usage: "transfer-holdout",
    exerciseIds: [
      "civil-agency-digital-evidence-choice",
      "civil-agency-digital-evidence-explain",
    ],
    facts: civilAgencyCaseFacts["civil-agency-C4"],
  },
] as const;

const ratificationReference =
  "许安签约时仅能询价，不能代晓蘅订约，陶初也知道这一限制。因此该时点属于无权代理，依第171条尚不对晓蘅发生效力；不是签完后就由她受约束，也不是合同永久不能被补正。晓蘅后来明确认可的是同一份合同，可以追认。依总则编解释第29条连接第137条，非对话书面追认在9月9日10时30分到达陶初时生效；9时写好并寄出尚不足，11时实际拆阅也不是本题的生效时点。追认生效后，这份代理合同可以对晓蘅发生效力。本问不要求另算行为人的赔偿或相对人的责任。";

const apparentReference =
  "依第173条第2项，孟榆9月20日取消委托后，杜遥在9月22日已无实际代理权。载明期限尚未届满的真实授权书、孟榆曾亲自介绍及此前按授权履行的交易形成了代理权外观；吕易核验期限、数量和此前履行记录，未获撤权信息，交易也没有异常，题设支持其不知道杜遥已无权且无过失。结合民法典第172条及总则编解释第28条，本案可以认定表见代理，代理行为对孟榆发生效力，无须再以孟榆追认为成立条件。这不是杜遥重新获得了实际授权，也不能泛化成持有任何授权书都可成立表见代理。";

const holdoutReference =
  "曹浅没有实际代理权，邱蔚也明确拒绝追认，不能走权限内代理或事后追认路径。现有材料不足以直接认定表见代理：‘房主联系人’可能仅表示联系职责，文件名不能证明真实授权内容与范围。需要取得原文件，查明页面和文件的来源、邱蔚是否确认及呈现了何种权限，同时查叶承是否已收到本人确认合同的限制通知、是否面对异常或遗漏了必要核验。若可信材料呈现本次签约权的外观，且叶承不知道无权并无过失，可依第172条对邱蔚发生效力；若无签约权限外观，或者叶承知道无权或有过失，不能据表见代理约束邱蔚。依解释第28条，叶承承担代理权外观的举证责任，邱蔚承担证明叶承不符合不知无权且无过失条件的举证责任。当前只是收集资料阶段，不能把未知条件补写成已成立，也不能把尚未取得材料直接等同于裁判时证明失败。本问不要求赔偿责任或施工合同的其他争议。";

const ratificationCriteria: Criterion[] = [
  {
    id: "civil-agency-ratification-initial",
    label: "签约时没有订约权",
    meaning:
      "把只准询价、本人保留签约决定和陶初知悉限制联系起来，说明许安签约时无权，未经追认尚不对晓蘅发生效力。",
    acceptable:
      "‘询价不能代签，她当时还没被这份合同约束’等义分析可接受；不要求引用条号、使用效力待定术语或另论表见代理。",
    boundary:
      "只写‘无权代理’但未说明对本人效力，为部分表达；写了权限事实却把签约时的合同说成已约束晓蘅，保留事实识别并指出相反结论。仅说永久无效不能代替未经追认不发生效力。遗漏不代补；明确同时断言已有约束与未发生效力且未区分时点，标明矛盾。",
  },
  {
    id: "civil-agency-ratification-arrival-effect",
    label: "认可同一合同，追认到达后发生效力",
    meaning:
      "晓蘅认可具体合同构成追认；书面非对话通知在9月9日10时30分到达陶初时生效，追认生效后合同可以对晓蘅发生效力。",
    acceptable:
      "‘她后来认下这个合同，信10点半收到后就能约束她’可接受；如先指出追认可补正，再正确说明到达时间，同样成立。写‘追认使该合同对本人发生效力’无需再重复一个最终结论句。",
    boundary:
      "只写追认后约束本人但漏到达时间，或只写10时30分却不说明追认及合同效果，按已表达含义给部分反馈。9时作成/寄出与11时拆阅不能替代本题到达时点。不能将补分依赖扩至上一项；初始判断错误不抹去正确的追认分析。若答案补写此前撤销、未送达等相反事实，指出改写事实；相关条件真不明时才能保留待核，本题已有到达事实。",
  },
];

const holdoutCriteria: Criterion[] = [
  {
    id: "civil-agency-holdout-route",
    label: "实际权限和追认均不足",
    meaning:
      "曹浅签约时无权，邱蔚拒绝追认；是否仍可对邱蔚发生效力，需要审查表见代理，不能把联系人身份当实际签约权。",
    acceptable:
      "‘朋友只是跑报价的，房主也没认账，要看有没有足以信赖的授权外观’即可；不要求把两种路径分别写成术语标题。",
    boundary:
      "只写无权代理为部分；仅据拒绝追认就断定不可能对本人有效，漏掉第172条的独立路径。反之称联系人标签就是实际授权，为相反分析。同一问任何位置表达该含义均可认可，不要求单列一段；未表达的含义不由参考答案或另一题代补，其他已成立的含义仍独立反馈。",
  },
  {
    id: "civil-agency-holdout-appearance",
    label: "截图与文件名不能证明完整签约权限外观",
    meaning:
      "说明联系人标签与文件名不足以直接证明本次签约权；至少联系材料真实性/来源、本人是否确认及内容和范围中影响本案结论的缺口。",
    acceptable:
      "可说‘先看文件是谁发的、到底让他做什么，联系人不等于能签约’；也接受有依据的暂定倾向，但必须说明目前还缺证明且该倾向不能当成已查明事实。",
    boundary:
      "仅说‘资料不够’而没有指出权限外观的具体缺口，为部分。凭一个PDF名称或平台标签直接认定表见代理，不成立；仅凭现阶段未取得原文件断言外观绝不存在，也超出材料。对外观评价仍有实质争议时保留待核，不把另一路有条件分析判成必错。",
  },
  {
    id: "civil-agency-holdout-reliance",
    label: "相对人的认识、过失及两种条件结论",
    meaning:
      "表见代理还需叶承不知无权且无过失，联系限制通知和核验经过的未知事实。外观与该条件均成立时代理有效；缺外观、知道无权或有过失时不能依第172条约束邱蔚。",
    acceptable:
      "不必逐字写‘善意无过失’；‘如果施工者已经知道要房主点头，他就不能靠截图把合同算给房主；如果外观可信又没有可疑情形，结果可能相反’可表达实质。其他有条件论证只要保留两个条件及事实依据，也接受。",
    boundary:
      "只写不知道，遗漏无过失或其事实判断，为部分；正确列出条件但不落到效力结论，也为部分。承认需要查通知却又把已通知当成确定事实，应指出冲突。‘叶承愿意相信就够了’或‘房主拒绝就推定叶承知道’均不成立。现有资料无法唯一确定，应允许条件分析与待核；不暗加责任比例、赔偿或罪名。",
  },
  {
    id: "civil-agency-holdout-proof",
    label: "区分两项条件的举证责任",
    meaning:
      "依解释第28条，叶承证明代理权外观；邱蔚证明叶承不符合不知道无权且无过失这一条件。指出当前未完成举证，不提前代替裁判认定。",
    acceptable:
      "‘施工者先证明看起来能代签的根据；房主若说他早知道或该发现没有权，要证明这一点’可接受。讲证据归谁提供并清楚区分对应事项即可。",
    boundary:
      "只说双方都要举证或只答其中一项，为部分；把两项都交给叶承/邱蔚，或将责任完全对调，为相反规则。表见代理实体条件分析正确仍保留，不因举证部分错而抹去前项。未提举证就是未见表达；不能将答卷中引用并反对的错误分配当成其最终主张。",
  },
];

export const civilAgencyExercises: UnitExercise[] = [
  {
    id: "civil-agency-authorized-purchase",
    caseId: "civil-agency-C1",
    relatedTopicIds: ["civil-agency-authority"],
    optional: true,
    kind: "objective",
    choiceMode: "single",
    title: "谁被相机合同约束",
    facts: civilAgencyCaseFacts["civil-agency-C1"],
    prompt: "仅就代理规则，哪项准确说明该购买行为对谁发生效力？",
    options: [
      {
        id: "a",
        text: "对苏泊发生效力，因为实际谈价和签字的人是苏泊。",
        explanation:
          "忽略买方及代理名义；代理人实际签字不把本人变成合同外的人。",
      },
      {
        id: "b",
        text: "对姚宁发生效力，因为苏泊在权限内以姚宁名义订约。",
        explanation:
          "物品、期限、价款均在授权范围内，并以本人名义实施，符合第162条。",
      },
      {
        id: "c",
        text: "姚宁与苏泊共同作为买方，因为两人都参与了采购安排。",
        explanation: "题设只有姚宁是买方；委托与代理签字不自动生成共同买方。",
      },
      {
        id: "d",
        text: "尚不对姚宁发生效力，须等姚宁收到相机后另作追认。",
        explanation: "这是权限内代理，没有给其效果另加收货后追认的条件。",
      },
    ],
    answer: "b",
    hint: "核对授权范围与合同上写明的买方，不只看谁动手签字。",
    reference:
      "选B。委托允许在9月15日前以姚宁名义购买不超过8000元的二手相机；9月12日7200元的合同符合范围，买方也写明姚宁。依第162条，该代理购买行为对姚宁发生效力。苏泊在代理人栏签字不使其成为买方，也无需另外追认。",
    sources: ["civil-agency-code-authority"],
  },
  {
    id: "civil-agency-ratification-time",
    caseId: "civil-agency-C2",
    relatedTopicIds: ["civil-agency-unauthorized"],
    optional: true,
    kind: "objective",
    choiceMode: "single",
    title: "追认函何时生效",
    facts: civilAgencyCaseFacts["civil-agency-C2"],
    prompt: "下列关于本案追认及对晓蘅效力的判断，哪项正确？",
    options: [
      {
        id: "a",
        text: "许安签约时已有代理效果，晓蘅后来写函只是再次确认。",
        explanation:
          "只准询价没有订约权，陶初也知道限制，签约时不能直接约束本人。",
      },
      {
        id: "b",
        text: "追认在9时晓蘅签署并寄出时生效，因为同意已写成文字。",
        explanation:
          "形成并寄出非对话通知尚未到达相对人，不是本题第137条的生效时点。",
      },
      {
        id: "c",
        text: "追认在10时30分到达陶初时生效，合同可因此对晓蘅发生效力。",
        explanation: "在催告期限内明确认可同一合同，书面通知到达后追认生效。",
      },
      {
        id: "d",
        text: "追认在11时陶初实际拆阅时生效，收到但未阅读仍不能生效。",
        explanation:
          "题设是非对话书面意思表示，规则是到达；不能改成必须实际拆阅。",
      },
    ],
    answer: "c",
    hint: "分开写好、寄出、到达和拆阅；追认方式与生效时点要对应。",
    reference: "选C。" + ratificationReference,
    sources: [
      "civil-agency-code-unauthorized",
      "civil-agency-code-arrival",
      "civil-agency-interpretation-ratification",
    ],
  },
  {
    id: "civil-agency-retained-letter",
    caseId: "civil-agency-C3",
    relatedTopicIds: ["civil-agency-apparent"],
    optional: true,
    kind: "objective",
    choiceMode: "single",
    title: "已经撤权的售梨合同",
    facts: civilAgencyCaseFacts["civil-agency-C3"],
    prompt: "仅就代理行为的效力，哪项最符合已给事实？",
    options: [
      {
        id: "a",
        text: "杜遥实际代理权已经终止，但本次可成立表见代理，对孟榆发生效力。",
        explanation:
          "真实未收回的授权书及先前履行形成外观，核验和无异常支持吕易不知无权且无过失。",
      },
      {
        id: "b",
        text: "授权书期限还没到，杜遥的实际代理权继续存在，所以是权限内代理。",
        explanation:
          "内部撤销已经终止实际授权；书面外观未消失与实际权利仍存不同。",
      },
      {
        id: "c",
        text: "孟榆拒绝承认后，就不能再依据代理权外观使合同对其发生效力。",
        explanation:
          "表见代理符合条件时无需再追认，本人的拒绝不能替代第172条的判断。",
      },
      {
        id: "d",
        text: "吕易未在9月22日重新电话问孟榆，就足以认定其有过失。",
        explanation:
          "应结合真实授权、前期履行、核验与交易异常整体判断；本题不能凭未额外打电话直接推过失。",
      },
    ],
    answer: "a",
    hint: "实际撤权与相对人看到的授权外观可以不同，还要审查相对人的认识和核验。",
    reference: "选A。" + apparentReference,
    sources: [
      "civil-agency-code-apparent",
      "civil-agency-interpretation-apparent",
    ],
  },
  {
    id: "civil-agency-digital-evidence-choice",
    caseId: "civil-agency-C4",
    relatedTopicIds: ["civil-agency-unauthorized", "civil-agency-apparent"],
    optional: true,
    kind: "objective",
    choiceMode: "single",
    title: "一张截图是否足够",
    facts: civilAgencyCaseFacts["civil-agency-C4"],
    prompt: "在尚未完成补证与事实认定的阶段，下列判断哪项准确？",
    options: [
      {
        id: "a",
        text: "平台列出了委托确认文件，就足以直接认定本次表见代理。",
        explanation:
          "文件名不能证明谁授权、授权什么，也没有解决叶承是否知道或有过失。",
      },
      {
        id: "b",
        text: "邱蔚拒绝追认，代理行为便不可能通过其他代理规则对其发生效力。",
        explanation: "拒绝追认排除该追认路径，仍需独立判断第172条。",
      },
      {
        id: "c",
        text: "叶承只须证明自己没有听说撤权；联系人截图的来源和内容不影响效力。",
        explanation:
          "本案不是撤权外观已查明；外观本身、是否知道无权及无过失均需分别考虑。",
      },
      {
        id: "d",
        text: "现材料不足以直接认定表见代理，应核签约权外观以及叶承的认识和核验经过。",
        explanation:
          "同时保留外观与不知无权且无过失的条件，未把缺失事实补成确定结论。",
      },
    ],
    answer: "d",
    hint: "文件名、联系人身份和本次代签权限之间，哪段事实还没有得到证明？",
    reference: "选D。" + holdoutReference,
    sources: [
      "civil-agency-code-unauthorized",
      "civil-agency-code-apparent",
      "civil-agency-interpretation-apparent",
    ],
  },
  {
    id: "civil-agency-ratification-explain",
    caseId: "civil-agency-C2",
    relatedTopicIds: ["civil-agency-unauthorized"],
    optional: true,
    kind: "subjective",
    title: "从仅询价到事后追认",
    facts: civilAgencyCaseFacts["civil-agency-C2"],
    prompt:
      "许安签约时，该合同是否对晓蘅发生效力？晓蘅后来的追认何时生效，对合同约束晓蘅有何影响？请结合事实自行写出理由。不要求赔偿分析。",
    hint: "分别说明签约时的权限，以及后来认可同一合同的通知何时生效。",
    reference: ratificationReference,
    criteria: ratificationCriteria,
    sources: [
      "civil-agency-code-unauthorized",
      "civil-agency-code-arrival",
      "civil-agency-interpretation-ratification",
    ],
  },
  {
    id: "civil-agency-digital-evidence-explain",
    caseId: "civil-agency-C4",
    relatedTopicIds: ["civil-agency-unauthorized", "civil-agency-apparent"],
    optional: true,
    kind: "subjective",
    title: "签约权限还缺哪段证据",
    facts: civilAgencyCaseFacts["civil-agency-C4"],
    prompt:
      "现有资料是否足以直接认定该代理行为对邱蔚发生效力？请说明需要核实的关键事实、不同核实结果如何影响结论，以及表见代理两项条件各由谁承担举证责任。可作有条件分析，不预设未知事实的答案；不要求赔偿分析。",
    hint: "把代理权外观与叶承是否知道无权、有无过失分开，再对应举证事项。",
    reference: holdoutReference,
    criteria: holdoutCriteria,
    sources: [
      "civil-agency-code-unauthorized",
      "civil-agency-code-apparent",
      "civil-agency-interpretation-apparent",
    ],
  },
];

export const civilAgencyTransferHoldoutCaseIds: readonly string[] = [
  "civil-agency-C4",
];
export const civilAgencyTrainingExercises = civilAgencyExercises.filter(
  (q) => !civilAgencyTransferHoldoutCaseIds.includes(q.caseId ?? ""),
);
export const civilAgencyTransferHoldoutExercises = civilAgencyExercises.filter(
  (q) => civilAgencyTransferHoldoutCaseIds.includes(q.caseId ?? ""),
);

// The current product exports UnitExercise rather than a separately named
// SubjectiveExercise; this narrowed view preserves that exact structural contract.
export type SubjectiveExercise = UnitExercise & {
  kind: "subjective";
  criteria: Criterion[];
};
export const civilAgencySubjectiveExercises = civilAgencyExercises.filter(
  (q): q is SubjectiveExercise =>
    q.kind === "subjective" && Array.isArray(q.criteria),
);

export const civilAgencyTopics: FaultTopic[] = [
  {
    id: "civil-agency-authority",
    title: "代理权与行为归属",
    headline: "在谁的权限内，以谁的名义订约？",
    goal: "从具体授权范围和签约名义判断代理行为是否直接约束本人。",
    prerequisite: "知道合同可以由本人或代理人表达意思；不必先学整章合同法。",
    minutes: "5–7",
    paragraphs: [
      "民事主体可以通过代理人实施民事法律行为；依法律、约定或行为性质应由本人亲自实施的行为不能代理（第161条）。本主题只练可以代理的普通订约。",
      "代理人在权限内以被代理人名义实施行为，法律效果归于被代理人（第162条）。要同时核对授权事项、期限、价款等范围和签约名义；代理人亲自签字，不等于合同就归他本人。",
    ],
    example: {
      title: "限定价款的相机委托",
      facts: civilAgencyCaseFacts["civil-agency-C1"],
      analysis:
        "9月12日、7200元二手相机及姚宁的买方名义均符合委托，代理购买对姚宁发生效力。收货或另外追认不是本题新增条件。",
    },
    pitfall: "帮忙联系或实际签字，不足以单独说明有签约权或应由谁受约束。",
    recall: {
      prompt: "为何代理人签了字，合同仍可能直接约束本人？",
      reference:
        "关键是实际权限与本人名义，而非签字动作由谁完成；两者符合第162条时效果归本人。",
    },
    sources: ["civil-agency-code-authority"],
    exercises: civilAgencyTrainingExercises.filter((q) =>
      q.relatedTopicIds?.includes("civil-agency-authority"),
    ),
  },
  {
    id: "civil-agency-unauthorized",
    title: "无权代理与追认",
    headline: "签约时没有权，后来能否被本人认可？",
    goal: "区分未经追认不对本人发生效力与永久无效，并说明追认通知的生效时间。",
    prerequisite: "能核对实际代理权限与签约名义。",
    minutes: "7–10",
    paragraphs: [
      "没有代理权、超过权限或权终止后仍代理，未经本人追认，不对本人发生效力（第171条）。这不等于所有无权代理都永久无效；本人追认及表见代理要各按自身条件审查。",
      "相对人可以催告本人在收到通知起30日内追认；未作表示视为拒绝。被追认前，善意相对人可以通过通知撤销（第171条第2款）。不要把催告后沉默说成同意。",
      "本人向相对人作出的追认依解释第29条按第137条确定生效时间。此处书面非对话通知到达时生效；自己决定、写好或寄出，与相对人收到是不同阶段。",
    ],
    example: {
      title: "只准询价与后来到达的追认函",
      facts: civilAgencyCaseFacts["civil-agency-C2"],
      analysis: ratificationReference,
    },
    pitfall:
      "只准询价不含代签；本人后来认可同一合同，与原先就有代理权不能混同。",
    recall: {
      prompt: "为何追认函9时写好、11时拆阅，题设仍以10时30分为生效时点？",
      reference:
        "它是向相对人作出的非对话书面意思表示，题设10时30分已经到达，适用到达规则。",
    },
    sources: [
      "civil-agency-code-unauthorized",
      "civil-agency-code-arrival",
      "civil-agency-interpretation-ratification",
    ],
    exercises: civilAgencyTrainingExercises.filter((q) =>
      q.relatedTopicIds?.includes("civil-agency-unauthorized"),
    ),
  },
  {
    id: "civil-agency-apparent",
    title: "表见代理",
    headline: "实际无权，为什么仍可能约束本人？",
    goal: "联系权限外观和相对人的认识、过失判断效力；证据不足时保留条件。",
    prerequisite: "能先区分实际授权、无权代理与追认。",
    minutes: "7–10",
    paragraphs: [
      "第172条允许在实际无权时，因相对人有理由相信有权而使代理行为有效。解释第28条要求同时存在代理权外观，以及相对人不知道行为时无权且无过失。不能只问他是否愿意相信。",
      "真实授权书、本人介绍和此前履行可支持外观，但要对应本次事项、范围和交易情形。看见一张纸或一个身份标签，不自动说明能代签；收到明确限制或面对异常仍不核验，会影响认识和过失判断。",
      "发生争议时，相对人证明代理权外观，本人证明相对人不符合不知无权且无过失的条件（解释第28条）。材料不足应具体指出缺口，不用自己的推测补齐条件。",
    ],
    example: {
      title: "没有收回的梨子销售授权书",
      facts: civilAgencyCaseFacts["civil-agency-C3"],
      analysis: apparentReference,
    },
    pitfall:
      "实际代理权已终止与可信外观尚在可以并存；本人拒绝追认也不自动排除表见代理。",
    recall: {
      prompt: "表见代理为什么既看权限外观，又看相对人当时的认识与过失？",
      reference:
        "只有外观不足，只有不知道无权也不足；解释第28条要求两项同时满足，并分别分配举证责任。",
    },
    sources: [
      "civil-agency-code-apparent",
      "civil-agency-interpretation-apparent",
    ],
    exercises: civilAgencyTrainingExercises.filter((q) =>
      q.relatedTopicIds?.includes("civil-agency-apparent"),
    ),
  },
];

/** Proposed chapter data only; no fault-catalog/practice-set/default navigation write. */
export const civilAgencyChapter = {
  id: "CIV-AGENCY",
  title: "代理",
  section: "总则",
  topicIds: civilAgencyTopics.map((t) => t.id),
};
