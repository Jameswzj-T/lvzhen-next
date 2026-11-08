import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

/** Original cases. This module only publishes content, never registers review. */
export const civilContractRemediesRevision =
  "civil-contract-remedies-2026-10-06.v1";

const codeUrl =
  "https://flk.npc.gov.cn/detail?id=ff808081729d1efe01729d50b5c500bf";
const interpretationUrl = "https://www.court.gov.cn/fabu/xiangqing/419382.html";

export const civilContractRemediesSources = {
  "civil-remedy-continued-law": {
    title: "《民法典》第577、580条：继续履行与非金钱债务的例外",
    url: codeUrl,
    note: "2026-10-06直接读取已留存的人大官方附件所列条文，有效记录沿用2026-10-05法源核验。本组只训练仍可交付与原物已经毁损不能交付的边界，不展开赔偿数额、物权风险或全部履行例外；不代表2027完整大纲或后续规范全量核验。",
  },
  "civil-remedy-delay-law": {
    title: "《民法典》第563条第一款第三项、第565条：迟延催告与解除通知",
    url: codeUrl,
    note: "同一官方附件，2026-10-06直接读取。只训练迟延主要债务、催告后合理期限届满仍未履行这一解除路径，以及依法通知到达的时点；合理期限按题设给定，不创造统一天数，不展开其他解除原因或解除后的结算。",
  },
  "civil-remedy-notice-interpretation": {
    title: "最高法合同编通则解释第53条：通知不能替代解除权",
    url: interpretationUrl,
    note: "最高人民法院2023-12-05发布原文，法释〔2023〕13号；2026-10-06直接读取第53条。享有解除权与通知到达要分别核对，不把收到通知或没有异议直接当成解除条件成立；本组不考异议期限或诉讼解除。",
  },
} satisfies ContentSources;

const common =
  "本案为独立虚构案例，双方以本人名义订立普通动产买卖，具备相应民事行为能力，合同已经成立且有效。";
const stockFacts =
  common +
  "余萱向季朗购买40盏标准台灯，已按约付清价款，约定10月8日交齐。季朗仓库中已备齐约定型号，交付没有法律障碍，普通配送费用也没有异常；他只是漏排了这笔订单，到10月9日仍未交货。余萱当日要求按约交齐，仍需要这些台灯。季朗提出给一笔迟交赔偿，并认为这样便可不再交货；余萱没有同意变更履行安排或解除合同。双方未约定用赔偿代替交货。本问只判断余萱能否请求继续交付。";
const terminationFacts =
  common +
  "唐苒向许舟购买12张标准折叠桌，已经付清价款，约定11月1日交齐。许舟届时未交，唐苒11月2日送达催告，要求最迟11月12日交齐；该催告只要求履行，没有写逾期自动解除。题设给定这段催告期间为本案合理履行期限，不考合理期限的裁量。到11月12日结束，许舟仍一张未交。唐苒11月13日9时寄出明确解除本合同的书面通知，通知10时到达许舟事先指定的收件地址，由许舟本人收取，他12时拆阅；此前没有其他解除通知。唐苒随即行使权利，不存在解除权行使期限争议。本问只判断这一迟延催告路径及此次通知的解除时点，不处理退款或赔偿。";
const impossibleFacts =
  common +
  "沈蔚向陆弥购买一件已经完成、仅此一件的原作陶瓷雕塑，已付清价款，约定12月6日交付该原作；合同未约定以复制品或另一件作品替代。陆弥在交付前搬运时将它打碎，碎片又被碾成粉末，已无法恢复成该原作；不存在另一件相同原作可交付。到了交付日，陆弥没有交出该雕塑。沈蔚认为：‘既然卖方已经违约，法院就必须判他继续交付这件原作。’本问仅评析这一继续原物交付的推论，不分析赔偿数额、合同终止、所有权或风险负担。";
const cureFacts =
  common +
  "梁澈向林沅购买一套标准书架，已经付清价款，约定10月10日送到。林沅漏排配送，届时未交。梁澈10月11日发出并送达催告，要求在10月20日结束前送到；题设给定这段催告期间为本案合理履行期限，催告没有写合同自动解除。林沅收后答复会在这段时间内配送，书架仍可正常交付，梁澈原定11月才搬入的新居使用计划未受影响。10月12日梁澈又向林沅送达立即解除通知，理由是‘原交货日已经过了，而且你也收到了催告，所以现在就可按迟延催告规则解除’。双方没有约定解除事由，也未协商一致解除，题设没有拒绝履行、履行不能或合同目的不能实现等其他解除事实。本问仅评析所引迟延催告路径，不处理其他请求。";

const stockReference =
  "选B。余萱已经付清价款，季朗的交货义务到期未履行；继续履行属于第577条的违约责任方式。交付是非金钱债务，第580条允许请求履行并规定例外。约定型号已备齐、交付可行，余萱在迟交次日提出请求，题设没有相应例外。季朗单方面提出赔偿，且余萱没有同意用赔偿替代交货，不能据此排除她请求按约交齐的权利。本问不计算赔偿或认定最终全部责任。";
const terminationReference =
  "选D。交齐折叠桌是本合同的主要债务；许舟迟延交货，经催告后在题设合理期限届满仍未履行，符合第563条第一款第三项的解除条件。唐苒随后依法发出明确解除通知，第565条及合同编通则解释第53条支持通知到达时解除。因此为11月13日10时，不是原交货日、催告期结束日、寄出时或拆阅时。催告没有附逾期自动解除内容，不能把11月12日期满直接当作此次解除时点。本问不要求结算退款或赔偿。";

const stockQuestion: UnitExercise = {
  id: "civil-contract-stock-delivery-remedy",
  caseId: "CIVIL-REMEDY-DELIVERY-1",
  relatedTopicIds: ["civil-contract-continued-performance"],
  kind: "objective",
  choiceMode: "single",
  title: "赔一笔钱，就可以不交台灯吗",
  facts: stockFacts,
  prompt: "仅就继续交付请求，哪项最符合题设？",
  options: [
    {
      id: "a",
      text: "余萱应先接受季朗提出的赔偿，才能再要求交货。",
      explanation: "题设没有以先接受赔偿作为继续履行请求的条件。",
    },
    {
      id: "b",
      text: "约定台灯仍可按约交付，余萱可请求交齐；季朗的单方赔偿提议不能替代这项请求。",
      explanation:
        "对应已经到期未交、履行仍可行、买方及时请求且未同意替代安排的事实。",
    },
    {
      id: "c",
      text: "原交货日已经过去，余萱应改走赔偿，不能再请求交齐。",
      explanation: "迟延本身不排除继续履行，仍须核对履行是否可能及其他例外。",
    },
    {
      id: "d",
      text: "季朗是否交货由他在交货和赔偿之间自行选择，余萱只能接受其选择。",
      explanation: "把违约方的单方提议当成替代约定义务的依据。",
    },
  ],
  answer: "b",
  hint: "先核对原交货义务与目前交付条件，再看双方是否同意替代安排。",
  reference: stockReference,
  sources: ["civil-remedy-continued-law"],
};

const terminationQuestion: UnitExercise = {
  id: "civil-contract-delayed-delivery-termination",
  caseId: "CIVIL-REMEDY-TERMINATION-1",
  relatedTopicIds: ["civil-contract-delay-termination"],
  kind: "objective",
  choiceMode: "single",
  title: "催告之后，解除发生在什么时候",
  facts: terminationFacts,
  prompt:
    "按题设给定的迟延、催告与后续通知，哪项正确说明本合同是否及何时解除？",
  options: [
    {
      id: "a",
      text: "11月1日未交齐时解除，催告和后续通知只是在补办手续。",
      explanation:
        "本题采用催告后合理期限内仍未履行的路径，原到期未交不直接完成这一解除。",
    },
    {
      id: "b",
      text: "11月12日催告期结束时解除，因为具备解除条件便无需再看通知。",
      explanation:
        "催告没有写逾期自动解除，取得解除权与依法行使该权利不是同一时点。",
    },
    {
      id: "c",
      text: "11月13日12时拆阅后解除，收到但尚未打开还不算生效。",
      explanation: "本题明确通知已经到达并由本人收取，生效不等到拆阅。",
    },
    {
      id: "d",
      text: "已具备所考迟延催告解除条件，11月13日10时解除通知到达时解除。",
      explanation: "分别对应催告合理期届满仍未交货及后续明确解除通知到达。",
    },
  ],
  answer: "d",
  hint: "分开标记原到期、催告期结束、发出、到达与拆阅，不把它们合成一个时点。",
  reference: terminationReference,
  sources: ["civil-remedy-delay-law", "civil-remedy-notice-interpretation"],
};

const impossibleQuestion: UnitExercise = {
  id: "civil-contract-unique-item-impossible",
  caseId: "CIVIL-REMEDY-IMPOSSIBLE-1",
  relatedTopicIds: ["civil-contract-continued-performance"],
  kind: "subjective",
  title: "已经毁成粉末的唯一原作",
  facts: impossibleFacts,
  prompt:
    "沈蔚的推论能否成立？请说明非金钱债务继续履行的相关边界，并联系原作的具体状态写出理由。",
  hint: "违约责任可以成立，但本问要求的那件原物还能不能实际交付，需要另外判断。",
  reference:
    "推论不能成立。原作交付属于非金钱债务；第580条允许对方请求履行，但事实上不能履行是例外，不能仅凭已经违约便断言必须判继续交付原物。本案约定只交付唯一原作，它已被毁成无法恢复的粉末，也没有另一件相同原作，无法完成所请求的原作交付。事实履行不能否定了这项继续交付推论；本问不要求由此作出赔偿、合同终止或全部责任结论。",
  criteria: [
    {
      id: "civil-remedy-impossible-rule",
      label: "非金钱债务履行不能的边界",
      meaning:
        "非金钱债务可请求继续履行，但事实上不能履行属于例外；违约本身不足以推出必须继续交付原物。",
      acceptable:
        "‘还要看能不能交，事实上已经交不了的非金钱义务是例外’等义表达可以；规则可与原作毁损事实合写，无须固定术语、条号或列出其他两类例外。",
      boundary:
        "把只要违约就必须继续原物交付当作规则，与本项相反。不要求另写金钱债务比较、免责分析、合同终止程序或赔偿提醒；反驳结论可融入规则和案情理由，不另设第三个结论句。",
    },
    {
      id: "civil-remedy-impossible-application",
      label: "联系唯一原作已经无法恢复",
      meaning:
        "合同只交付该唯一原作，它已经毁成粉末、无法恢复，没有另一件相同原作；这些事实支持该项原作交付事实上不能履行，不能按沈蔚所说要求必须判继续交付。",
      acceptable:
        "‘买的是这一件，已经碎成恢复不了的粉末，又没有同一件可交，所以不能要求照旧交出原作’可以综合承接两项；不要求逐字重复搬运过程、日期或付清价款。",
      boundary:
        "只背不能履行例外却不联系这件原作的状态与交付对象不足；不能把合同暗改为允许交复制品。无需证明赔偿数额、全部违约责任、物权风险或合同必然已经解除，也不把缺一条其他处理提醒作为漏答。",
    },
  ],
  sources: ["civil-remedy-continued-law"],
};

const cureQuestion: UnitExercise = {
  id: "civil-contract-cure-period-not-expired",
  caseId: "CIVIL-REMEDY-CURE-1",
  relatedTopicIds: ["civil-contract-delay-termination"],
  kind: "subjective",
  title: "催告第二天就发解除通知",
  facts: cureFacts,
  prompt:
    "梁澈所引理由能否支持10月12日按迟延催告路径解除？请联系该路径的条件、催告期间及本次通知写出理由。",
  hint: "已经迟交、已经收到催告，与催告后合理期限已过仍未履行，是不同事实。",
  reference:
    "不能仅按所引理由支持此次解除。第563条第一款第三项的路径要求迟延主要债务，经催告后在合理期限内仍未履行；仅迟交和收到催告还不够。10月12日仍在给定的、截至10月20日的合理履行期间内，林沅又未拒绝履行，本案没有所给其他解除事实，不能把尚未届满写成催告期满仍未履行。解除通知已到达也不能补足这一解除权条件；第565条依法通知的规则及合同编通则解释第53条要与解除权是否具备一并理解。本问只反驳当前所引路径，不要求处理其他请求或预测期满后的事实。",
  criteria: [
    {
      id: "civil-remedy-cure-rule",
      label: "催告后的合理期限条件",
      meaning:
        "迟延主要债务的这一解除路径须经催告后在合理期限内仍未履行；已经迟交、已经催告不等于该条件已经满足，解除通知到达不能替代解除权。",
      acceptable:
        "‘得给催告后的合理履行时间，不能刚催完就靠再发解除通知补成条件’等义表达可以；可与10月12日仍在期间内的事实综合论证，无须固定条号、另列独立‘通知不够’提醒或逐字复述法条。",
      boundary:
        "仍须表达催告后合理期间内未履行这一条件，不能只说一般要通知。若已解释合理期间未满所以现在通知也不能按本路径解除，不因未单独抄解除通知规则或列一个结论句作漏答；不要求背出其他解除原因清单。",
    },
    {
      id: "civil-remedy-cure-application",
      label: "联系10月12日仍在催告期间内",
      meaning:
        "给定合理催告期截至10月20日，10月12日仍未届满；题述仍可交付、没有拒绝履行或其他解除事实，不能按所引迟延催告路径认定本次通知已使合同解除。",
      acceptable:
        "‘给他的时间还没到，通知虽收到了也不能把这个空缺补上，不能靠迟交和已催告就现在解除’联系本案时间关系即可；不要求把所有排除事实逐项列全或重复具体日历数值。",
      boundary:
        "不能把10月12日改写为已经过了10月20日；只说条件不够而未联系本案未届满事实不足。不要求另外提出催告方案、计算统一合理天数、判未来会否解除或列退款、赔偿责任；书架仍可交付等背景不另拆成第三个必答点。",
    },
  ],
  sources: ["civil-remedy-delay-law", "civil-remedy-notice-interpretation"],
};

export const civilContractRemediesTopics: FaultTopic[] = [
  {
    id: "civil-contract-continued-performance",
    title: "违约后的继续履行",
    headline: "迟交仍可请求交付，但先核履行是否可能",
    goal: "根据仍可交付或唯一原物已毁损的事实，说明继续履行请求的依据与例外。",
    prerequisite:
      "先分清合同已经成立、效力与履行阶段；本组给定合同成立有效，买方已付款，可接在合同履行抗辩后学习。",
    minutes: "8–12",
    paragraphs: [
      "合同义务到期未履行，不只是问‘有没有违约’，还要看对方请求什么救济。第577条列有继续履行、补救、赔偿等责任方式；违约方提出赔偿，不等于单方面改掉原约定义务。",
      "交付物品是非金钱债务。第580条原则上允许请求履行，但规定法律上或事实上不能履行、标的不适于强制履行或费用过高、债权人未在合理期限内请求等例外。本组只练仍可交付与事实上不能交付这条边界，不把所有例外都称为已练过。",
      "把唯一原物毁成无法恢复的粉末，和有现货只是迟交，不能得出同样的继续交付结论。否定某项继续交付请求也不等于否定所有违约责任；其他责任须按其条件另行判断，本组不计算赔偿或展开合同终止。",
    ],
    example: {
      title: stockQuestion.title,
      facts: stockQuestion.facts,
      analysis: stockQuestion.reference,
    },
    pitfall:
      "把赔偿提议当作单方选择不再交货，或只看违约而忽略那件原物已经无法交付。",
    recall: {
      prompt:
        "有现货只是迟交，与唯一原物已经毁损不能恢复，对继续交付请求有什么不同？",
      reference:
        "仍可按约交付且没有相关例外时，可以请求继续交付。唯一原物已毁损无法恢复时，所请求的非金钱义务事实上不能履行，不能仅凭违约要求必须继续交付原物；这不直接处理所有其他责任。",
    },
    sources: ["civil-remedy-continued-law"],
    exercises: [stockQuestion, impossibleQuestion],
  },
  {
    id: "civil-contract-delay-termination",
    title: "迟延催告与合同解除",
    headline: "先核解除条件，再核通知到达",
    goal: "辨析迟延主要债务的催告路径；区分催告期未满与期满仍未履行，识别后续解除通知的到达时点。",
    prerequisite:
      "知道合同义务何时应履行；本组给定合同成立有效和合理催告期间，不要求先学习全部解除原因。",
    minutes: "8–12",
    paragraphs: [
      "第563条第一款第三项规定一个迟延解除路径：主要债务迟延，经催告后在合理期限内仍未履行。迟交、收到催告与合理期限已过仍未履行要分别核对。合理期限须结合交易判断，本组明确给定，不用案例天数编成统一门槛。",
      "已经具备解除权，还要依法行使。第565条规定通知到达时解除；本组的催告只要求履行，随后另发明确解除通知，不能把催告期满、寄出或拆阅当成这次通知的到达。法条另有通知附期限自动解除的安排，本组未采用，不混入本题。",
      "收到解除通知不能制造原本欠缺的解除权。合同编通则解释第53条要求审查是否享有解除权；本组给的催告期尚未届满时，不能只凭迟交、已催告和再发通知推出按这条路径已经解除。这不是说所有解除都必须先催告，其他法定或约定原因不在本组训练范围。",
    ],
    example: {
      title: terminationQuestion.title,
      facts: terminationQuestion.facts,
      analysis: terminationQuestion.reference,
    },
    pitfall: "把一迟交就解除、收到催告就解除、发出通知就解除当成同一种结论。",
    recall: {
      prompt:
        "迟延主要债务经催告时，要核什么条件？条件具备后，另发的明确解除通知何时起作用？",
      reference:
        "核合理催告期内是否仍未履行；该路径条件欠缺不能由通知补足。条件已具备且依法另行通知解除时，以通知到达为时点。本组催告未附逾期自动解除内容，也不穷尽其他解除路径。",
    },
    sources: ["civil-remedy-delay-law", "civil-remedy-notice-interpretation"],
    exercises: [terminationQuestion, cureQuestion],
  },
];

export const civilContractRemediesChapter = {
  id: "CIVIL-CONTRACT-REMEDIES",
  title: "违约后的继续履行与迟延解除",
  section: "民法",
  topicIds: civilContractRemediesTopics.map((topic) => topic.id),
};

export const civilContractRemediesContentPack = {
  revision: civilContractRemediesRevision,
  snapshot: {
    topics: civilContractRemediesTopics,
    sources: civilContractRemediesSources,
  },
};

export const civilContractRemediesDefaultQueues = {
  objective: [stockQuestion.id, terminationQuestion.id],
  subjective: [impossibleQuestion.id, cureQuestion.id],
};

const exercises = civilContractRemediesTopics.flatMap(
  (topic) => topic.exercises,
);
export const civilContractRemediesQuestion = (
  id: string,
): UnitExercise | undefined => exercises.find((question) => question.id === id);
export const civilContractRemediesTopicForQuestion = (
  id: string,
): FaultTopic | undefined =>
  civilContractRemediesTopics.find((topic) =>
    topic.exercises.some((question) => question.id === id),
  );
export const civilContractRemediesSameCaseQuestions = (
  id: string,
): UnitExercise[] => {
  const question = civilContractRemediesQuestion(id);
  return question?.caseId
    ? exercises.filter((other) => other.caseId === question.caseId)
    : [];
};
