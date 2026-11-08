import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

/** Original cases; this module publishes content without registering review. */
export const civilStipulatedLiabilityRevision =
  "civil-stipulated-liability-2026-10-06.v1";
const codeUrl =
  "https://flk.npc.gov.cn/detail?id=ff808081729d1efe01729d50b5c500bf";
const interpretationUrl = "https://www.court.gov.cn/fabu/xiangqing/419382.html";

export const civilStipulatedLiabilitySources = {
  "civil-stipulated-penalty-law": {
    title: "《民法典》第585条：约定违约金与依法请求调整",
    url: codeUrl,
    note: "2026-10-06读取已留存的人大官方附件，并采用本组前置法源核验。约定低于损失可依法请求增加，过分高于损失可请求适当减少；本组只辨请求和审查，不计算裁量金额或展开全部迟延责任。",
  },
  "civil-stipulated-adjustment-interpretation": {
    title: "最高法合同编通则解释第64条、第65条第一款：调整请求与综合衡量",
    url: interpretationUrl,
    note: "最高法官网2023-12-05刊载，法释〔2023〕13号，自同日起施行。2026-10-06按本组前置核验读取请求、相应举证、不得调整约定及以损失为基础综合衡量的规则。解释另有一般过高判断与恶意违约边界，本组不作比例换算或裁量额题，不把高于损失一概等同必须减少。",
  },
  "civil-stipulated-deposit-law": {
    title: "《民法典》第586—588条：定金交付、罚则条件与条款选择",
    url: codeUrl,
    note: "2026-10-06读取同一人大附件第586—588条，并采用本组前置核验。定金合同自实际交付时成立；法定20%效力上限与违约金调整是不同规则。罚则须结合违约方及合同目的，违约金与定金条款择一适用；本组不扩定金类型、复杂结算或全部担保。",
  },
} satisfies ContentSources;

const common =
  "本案为独立虚构案例，当事人以本人名义订立普通合同，具备相应民事行为能力，主合同已经成立且有效。";
const lowFacts =
  common +
  "夏禾向方炜购买一批办公桌，约定10月6日交齐，并有效约定迟交应付的一笔违约金。方炜漏排订单，10月9日才交齐；夏禾为此支付了三天必要替代租桌费用。题设给定这些费用真实、由此次迟交造成且属于本案可赔损失，合计高于约定违约金，不要求另算损失范围。方炜只愿按原约定数额支付，夏禾希望增加违约金。本问只判断依法请求调整的入口，不考管辖或最终增加数额。";
const highFacts =
  common +
  "蓝沁向魏临购买50把普通折叠椅，约定9月7日14时交齐供9月10日的活动使用，并约定迟交一日支付一笔违约金，条款另写‘任何情况下不得调整’。魏临登记错配送地址，发现后立即调车，9月8日14时交齐。蓝沁的9月10日活动正常使用了这批椅子；迟交使她支出一笔临时仓库预约取消费用，其余损失在本题已排除。双方不争议该费用是本次违约造成的实际损失，票据及履约记录齐全，也承认约定违约金高于这项损失，但是否过分高及如何调整仍有争议。蓝沁起诉请求支付约定全额，魏临以抗辩明确请求适当减少，并提交上述损失、登记错误及及时补送等材料。蓝沁答复：‘既然合同写了不得调整，法院就不能审查你的减额请求。’本问不要求给出最终调整比例或金额。";
const deliveryFacts =
  common +
  "池遥向迟恩购买24套餐盘，双方已明确数量、价款与送货日期。另签定金约定，明确以价款10%的一笔违约定金担保履行，约定池遥次日给付；双方没有把交定金作为主合同成立或生效条件。截至本问时，定金给付日尚未到，池遥没有转账、交现金或以其他方式实际给付，迟恩只收到她的承诺和签字。池遥认为：‘定金条款已经签好，定金合同现在就成立，只是款还没交。’本问只判断当前定金合同的成立时点，不处理后来是否违约。";
const electionFacts =
  common +
  "苏荷向裴岸购买一套供10月12日晚特定演出使用的专用灯光组件，合同明确这一单场用途及10月11日交齐、安装完成的截止时间。双方有效约定迟交致该场用途不能实现时的一笔违约金，并另明确约定以价款10%的违约定金担保履行。苏荷已经按约实际交付全部该定金，裴岸收到并确认其定金性质；余款在交齐安装后才到期，苏荷已备好场地并按约完成自己的到期义务。裴岸漏排装运，到10月11日一件未交，且明确告知只能在演出结束后的10月13日交货。没有不可抗力或苏荷妨碍履行，演出前也确实无法取得替代组件，这次约定的单场使用目的因此不能实现。苏荷提出：‘这次违约既符合违约金约定，也有定金，所以应同时给我约定违约金并按定金罚则双倍返还。’本问只处理这两条款的选择，不结算本金、额外损失或其他救济。";

const lowQuestion: UnitExercise = {
  id: "civil-contract-low-penalty-request",
  caseId: "CIV-STIPULATED-LOW-1",
  relatedTopicIds: ["civil-contract-penalty-adjustment"],
  kind: "objective",
  choiceMode: "single",
  title: "约定违约金低于已确认的损失",
  facts: lowFacts,
  prompt: "对夏禾希望增加违约金的请求入口，哪项最符合题设？",
  options: [
    {
      id: "a",
      text: "夏禾可以自行把原条款金额改为自己希望的数额，再直接要求方炜按新数额付款。",
      explanation: "混淆依法提出调整请求与当事人单方改写约定金额。",
    },
    {
      id: "b",
      text: "夏禾可依法向人民法院或者仲裁机构请求增加，不能把提出请求等同于自行改额。",
      explanation:
        "对应第585条第二款的入口；题设已给定约定低于造成的损失，不要求算最终调整额。",
    },
    {
      id: "c",
      text: "夏禾须先解除已收货的合同，才可以依法请求增加迟交违约金。",
      explanation: "第585条第二款未将先解除合同设为增加请求的前提。",
    },
    {
      id: "d",
      text: "办公桌既已全部交齐，迟交违约金只能按原数额，损失高低不再有审查意义。",
      explanation: "后续交齐不封死针对迟交违约金依法提出调整的入口。",
    },
  ],
  answer: "b",
  hint: "区分有效约定、依法请求调整和当事人自己改额，不急着计算结果。",
  reference:
    "选B。第585条第二款规定，约定违约金低于造成的损失时，人民法院或者仲裁机构可以根据当事人的请求予以增加。本案给定有效违约金约定、迟交及可赔实际损失，且损失高于约定金额，夏禾可以依法提出增加请求；不是自行修改条款，也不以先解除或尚未收齐货物为条件。请求是否及增加多少仍须依法处理，本问不把申请等同于按某一数额自动增加。",
  sources: ["civil-stipulated-penalty-law"],
};

const highQuestion: UnitExercise = {
  id: "civil-contract-high-penalty-review",
  caseId: "CIV-STIPULATED-HIGH-1",
  relatedTopicIds: ["civil-contract-penalty-adjustment"],
  kind: "subjective",
  title: "写了不得调整的迟交条款",
  facts: highFacts,
  prompt:
    "蓝沁所引理由能否阻止减额请求的审查？请结合魏临提出的抗辩、损失与履约事实，说明请求入口和法院应如何判断；无需确定调整数额。",
  hint: "先看正式提出了什么请求，再分开已经高于损失与最终过高认定、综合衡量。",
  reference:
    "该理由不能阻止依法审查。第585条第二款允许对过分高于损失的违约金请求适当减少；合同编通则解释第64条允许通过抗辩提出调整请求，仅以合同写不得调整为由拒绝审查不成立。魏临已明确抗辩请求减额并提交材料，过高主张须有相应举证，不能把原约定当作不经审查的终局答案。根据第65条第一款，法院以违约造成的损失为基础，结合本案履行情形、过错及背景等综合衡量：损失为已确认的预约取消费用，椅子次日交齐，活动仍照常使用，登记错误发现后及时补送。这些事实是审查所提过高争议的依据；不能只说高于损失便自动按某比例减少，也不能只按合同价或条款一句话定结果。本问不要求算出最终减额、列齐所有因素或另行处理其他责任。",
  criteria: [
    {
      id: "civil-stipulated-high-request",
      label: "抗辩调整请求与不得调整约定的边界",
      meaning:
        "当事人可通过抗辩依法请求适当减少过高违约金；本案魏临已明确提出减额请求，不能仅凭合同的不得调整文字阻止审查。",
      acceptable:
        "‘他已经用抗辩申请审查过高，合同写死金额也不能封掉依法调整的入口’等义表达可以；可与损失及履约事实合写，不要求固定条号、再提一次反诉或另列独立否定结论。",
      boundary:
        "不能把请求入口说成没有明确减额请求法院也必须自动调额，或把不得调整文字当作足以阻止审查。不要求在此题另背双方全部举证规则、管辖、完整程序或固定提醒，参考中的相应举证不另加第三项。",
    },
    {
      id: "civil-stipulated-high-assessment",
      label: "以损失为基础联系具体履约情况",
      meaning:
        "应以已确认的预约取消损失为基础，结合次日交齐、活动正常使用、登记错误及时补送等实际履行情形，综合审查是否过分高及如何适当处理，不能仅因存在高于损失的差额就自动作固定调整。",
      acceptable:
        "‘要看这次实际取消费和后来交齐、活动没受影响、错误及时补送等情况来判断过高，不能拿合同那句话跳过比较’可综合承接两项；不要求逐项复述全部事实或列出解释中的每个因素。",
      boundary:
        "只说违约金高却不联系已查明损失与本案履约情况不足；不能把高于损失一律写成当然按固定比例减少。若已结合题内损失及有关履约事实说明应当审查过高，不因未单列‘最后由法院裁量’提醒算漏答；不要求最终比例、金额或其他责任结论。",
    },
  ],
  sources: [
    "civil-stipulated-penalty-law",
    "civil-stipulated-adjustment-interpretation",
  ],
};

const deliveryQuestion: UnitExercise = {
  id: "civil-contract-deposit-not-delivered",
  caseId: "CIV-STIPULATED-DELIVERY-1",
  relatedTopicIds: ["civil-contract-deposit-remedies"],
  kind: "objective",
  choiceMode: "single",
  title: "定金约定签好了，款还没有交",
  facts: deliveryFacts,
  prompt: "关于当前定金合同是否成立，哪项最符合题设？",
  options: [
    {
      id: "a",
      text: "已经签好明确的定金约定，定金合同已成立，实际交款仅属于履行问题。",
      explanation: "忽略第586条关于实际交付时成立的特别规定。",
    },
    {
      id: "b",
      text: "定金尚未交付，所以原餐盘买卖主合同也尚未成立。",
      explanation:
        "题设给定主合同成立有效，未把交定金作为主合同成立或生效条件，不能混同两者。",
    },
    {
      id: "c",
      text: "须等将来发生不履行，才能判断定金合同何时成立。",
      explanation: "将定金合同成立与后来定金罚则的适用条件混为一谈。",
    },
    {
      id: "d",
      text: "目前只有明确约定而无实际交付，定金合同尚未成立；题设给定的主合同效力不因此改变。",
      explanation: "分别核定金的实际交付时点及已给定的主合同效力。",
    },
  ],
  answer: "d",
  hint: "区分主合同、定金约定与真正交付的时点，当前并没有实际给付。",
  reference:
    "选D。第586条规定定金合同自实际交付定金时成立；签字及承诺不能代替该实际交付。本案定金给付日尚未到，也没有任何实际交款，因而当前定金合同尚未成立。主合同已成立有效且未以交定金为成立、生效条件，是另外给定的事实，不能因未交定金而反推主合同不成立，也无须等发生违约才判断成立时点。本问不处理以后是否违约或罚则。",
  sources: ["civil-stipulated-deposit-law"],
};

const electionQuestion: UnitExercise = {
  id: "civil-contract-deposit-penalty-election",
  caseId: "CIV-STIPULATED-ELECTION-1",
  relatedTopicIds: ["civil-contract-deposit-remedies"],
  kind: "subjective",
  title: "单场演出错过之后的两个条款",
  facts: electionFacts,
  prompt:
    "本案定金罚则路径是否具备题述条件？苏荷能否就同一次违约并用约定违约金与定金罚则？请联系实际给付、违约及使用目的说明理由。",
  hint: "先确认定金及收款方违约的条件，再辨两条款的选择，不扩全部结算。",
  reference:
    "定金罚则路径具备题述条件，但不能并用这两条款。依第586、587条，苏荷已实际给付明确的违约定金，数额为价款10%、在法定效力上限内；裴岸作为收受方未按约交货，明确只能演出后交，且无苏荷违约、不可抗力或及时替代可能，使订约时明确的单场演出目的不能实现。若选择定金路径，支持由收受方双倍返还，不是任何轻微迟交都当然如此。第588条第一款规定，同时约定违约金与定金时，对方可选择适用违约金或者定金条款，不能将同一次违约下的约定违约金和定金罚则无条件叠加。因此苏荷可择相应条款，但所述并用请求不能按该理由成立。本问只处理这两条款的选择；第588条第二款另规定，定金不足以弥补违约损失时，可请求赔偿超过定金数额的损失，不能外推成选择定金永远排除其他损失，本题不要求处理该项或本金全部清算。",
  criteria: [
    {
      id: "civil-stipulated-election-conditions",
      label: "有效给付与收受方违约致目的不能实现",
      meaning:
        "已有实际交付、明确性质且在法定上限内的违约定金；收受方裴岸未按约交货、只能演出后交，使明确的单场目的不能实现，题述条件支持若选择定金路径由收受方双倍返还。",
      acceptable:
        "‘定金确实交给卖方且数额有效，他只能在演出后交，使约定本场用途落空，所以选择定金可以主张收款方双倍返还’可以；可与两条款择一合写，不要求照抄10%、条号或逐个列全部排除背景。",
      boundary:
        "不能只说已经交定金或有任何迟延便够罚则，仍须联系本案收受方不履行与单场目的不能实现。只求基本路径，不要求手算双倍数额、列所有定金类型或把主合同解除程序另作必答；已正确说明实际给付数额有效，不因未另外背法定上限数字漏答。",
    },
    {
      id: "civil-stipulated-election-choice",
      label: "同次违约下违约金与定金条款择一",
      meaning:
        "同时有效约定违约金和定金时，受违约方可选择适用其中一种；本案不能据两条款均存在就并用约定违约金和双倍返还的定金罚则。",
      acceptable:
        "‘这次两条款能选一个，不是先拿约定违约金再叠定金罚则’等义表达可以；不要求替苏荷决定哪一种更划算、另列独立并用否定句或写计算步骤。",
      boundary:
        "不能无条件同时适用这两条款，也不能把择一外推为选择定金永远排除超额损失请求。题目不要求说明本金返还、超额损失的金额或全部清算；参考中的这些边界提醒不单独作为第三项必答，一段综合表达可承接两项。",
    },
  ],
  sources: ["civil-stipulated-deposit-law"],
};

export const civilStipulatedLiabilityTopics: FaultTopic[] = [
  {
    id: "civil-contract-penalty-adjustment",
    title: "违约金的约定与依法请求调整",
    headline: "约定有作用，依法调整仍须请求与事实依据",
    goal: "辨析低于损失的增加请求及过高争议中的减额入口，结合给定损失和履约事实说明审查。",
    prerequisite:
      "接合同履行、违约救济和损失范围；本组不重新分析主合同成立效力，也不计算裁量金额。",
    minutes: "8–12",
    paragraphs: [
      "第585条允许约定一方违约时支付一定数额的违约金或损失赔偿额的计算方法。约定低于造成的损失时，可以依法向法院或者仲裁机构请求增加；过分高于造成的损失时，可依法请求适当减少。有效约定、自行改额与依法请求调整要分开。",
      "合同编通则解释第64条说明可通过反诉或抗辩提出调整请求，并有相应举证要求；合同写不得调整，不能仅凭这一文字拒绝依法审查。减少请求须具体提出，不能把有争议直接当作法院已自动定出新金额。本组书面案已给正式抗辩与材料，不展开全部诉讼步骤。",
      "第65条第一款以违约损失为基础，结合主体、交易、履行、过错及背景等综合衡量过高争议。解释另有一般判断及恶意违约边界，不能脱离具体事实机械化。本组不做比例换算，只联系给定损失及履约事实，区分可请求、是否过分高与最终如何调整。",
    ],
    example: {
      title: lowQuestion.title,
      facts: lowQuestion.facts,
      analysis: lowQuestion.reference,
    },
    pitfall: "把合同写不得调整当作封死入口，或只因高于损失就直接判固定减额。",
    recall: {
      prompt:
        "约定违约金低于损失时可以怎样提出请求？过高争议为什么不能只凭不得调整一句话或高于损失的差额下结论？",
      reference:
        "可依法请求法院或者仲裁机构增加，不是自行改额。过高减额可依法提出请求；不得调整约定不能单独阻止审查，要以损失为基础联系具体交易、履行等事实综合判断，不自动按某一数额或比例调整。",
    },
    sources: [
      "civil-stipulated-penalty-law",
      "civil-stipulated-adjustment-interpretation",
    ],
    exercises: [lowQuestion, highQuestion],
  },
  {
    id: "civil-contract-deposit-remedies",
    title: "定金的实际交付、适用与救济选择",
    headline: "成立看实际交付，罚则和两条款选择另核条件",
    goal: "区分仅签定金约定与实际交付；在给定罚则事实充分时说明违约金和定金条款的选择。",
    prerequisite:
      "主合同成立效力及约定义务已经给定，接违约救济；不扩全部担保或所有定金类型。",
    minutes: "8–12",
    paragraphs: [
      "第586条规定定金合同自实际交付时成立，明确约定与真实交付不是一件事。定金数额不得超过主合同标的额20%，超出部分不生定金效力，实际交付数额与约定不同还要按法条处理。本组一案全未交付，另一案在上限内明确交付，不做超额或复杂结算。主合同效力按题设另看，未交定金不当然使主合同不成立。",
      "第587条要求结合哪方违约及是否致使合同目的不能实现来适用定金罚则。给付方不履行或履行不合约致目的不能实现，无权请求返还；收受方具有该情形，双倍返还。必须先有明确的定金性质及有效实际给付，不能把普通预付款、订金自动套罚则，也不能把一切轻微迟交都当成目的落空。",
      "第588条第一款规定，同时约定违约金和定金时，受违约方可选择适用其中一种条款，不能就同一违约无条件叠加违约金与定金罚则。第二款另规定，定金不足以弥补违约损失时，可请求赔偿超过定金数额的损失，不能由择一说成其他损失永远不能请求。本组只辨两条款选择，不要求全部清算、精确金额或替当事人选最划算方案。",
    ],
    example: {
      title: deliveryQuestion.title,
      facts: deliveryQuestion.facts,
      analysis: deliveryQuestion.reference,
    },
    pitfall:
      "仅有定金条款就当作已实际给付，或只见迟交便直接套罚则，再把两个条款一并叠加。",
    recall: {
      prompt:
        "定金约定签好但未交付，与有效定金已经实际交付有何区别？两个条款同时存在时，何以还要分别核罚则条件和选择？",
      reference:
        "定金合同自实际交付时成立，主合同效力不能仅据未交定金反推。罚则还要核违约方及是否致合同目的不能实现；条件具备时可选择违约金或定金条款，不能无条件并用，也不把选择定金泛化成超额损失永远排除。",
    },
    sources: ["civil-stipulated-deposit-law"],
    exercises: [deliveryQuestion, electionQuestion],
  },
];

export const civilStipulatedLiabilityChapter = {
  id: "CIV-STIPULATED-LIABILITY",
  title: "约定违约责任：违约金与定金",
  section: "民法",
  topicIds: civilStipulatedLiabilityTopics.map((topic) => topic.id),
};
export const civilStipulatedLiabilityContentPack = {
  revision: civilStipulatedLiabilityRevision,
  snapshot: {
    topics: civilStipulatedLiabilityTopics,
    sources: civilStipulatedLiabilitySources,
  },
};
export const civilStipulatedLiabilityDefaultQueues = {
  objective: [lowQuestion.id, deliveryQuestion.id],
  subjective: [highQuestion.id, electionQuestion.id],
};
const exercises = civilStipulatedLiabilityTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilStipulatedLiabilityQuestion = (
  id: string,
): UnitExercise | undefined => exercises.find((question) => question.id === id);
export const civilStipulatedLiabilityTopicForQuestion = (
  id: string,
): FaultTopic | undefined =>
  civilStipulatedLiabilityTopics.find((topic) =>
    topic.exercises.some((question) => question.id === id),
  );
export const civilStipulatedLiabilitySameCaseQuestions = (
  id: string,
): UnitExercise[] => {
  const question = civilStipulatedLiabilityQuestion(id);
  return question?.caseId
    ? exercises.filter((other) => other.caseId === question.caseId)
    : [];
};

/** Whole first-answer question only; answer-side material is never projected. */
export function civilStipulatedLiabilityPromptMaterial(id: string) {
  const question = civilStipulatedLiabilityQuestion(id);
  if (!question) return null;
  return {
    id: question.id,
    caseId: question.caseId,
    revision: civilStipulatedLiabilityRevision,
    title: question.title,
    kind: question.kind,
    facts: question.facts,
    prompt: question.prompt,
    ...(question.options
      ? { options: question.options.map(({ id, text }) => ({ id, text })) }
      : {}),
  };
}
