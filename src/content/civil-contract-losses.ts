import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

/** Original teaching cases. Publication here does not enable model review. */
export const civilContractLossesRevision =
  "civil-contract-losses-2026-10-06.v1";

const codeUrl =
  "https://flk.npc.gov.cn/detail?id=ff808081729d1efe01729d50b5c500bf";
const interpretationUrl = "https://www.court.gov.cn/fabu/xiangqing/419382.html";

export const civilContractLossesSources = {
  "civil-loss-scope-law": {
    title: "《民法典》第584条：违约损失、可得利益与订约预见边界",
    url: codeUrl,
    note: "2026-10-06直接读取已留存的人大官方附件第584条，并与固镇县司法局官网所载条文核对。本组只练有给定依据的履行利益和订约时的预见范围，不展开复杂损失计算、违约金或全部赔偿规则。",
  },
  "civil-loss-scope-interpretation": {
    title: "最高法合同编通则解释第60条第一款、第63条第一款：净利益与预见判断",
    url: interpretationUrl,
    note: "最高法官网2023-12-05刊载，法释〔2023〕13号，自同日起施行。2026-10-06直接读取这两款：可得利益计算须考虑合理成本，预见判断结合订约目的、主体、内容、交易类型、习惯及磋商过程。本组不展开替代交易差额、持续合同或违约金调整。",
  },
  "civil-loss-mitigation-law": {
    title: "《民法典》第591条：防止扩大损失与合理费用",
    url: codeUrl,
    note: "2026-10-06直接读取同一人大官方附件第591条两款，并核固镇县司法局官网所载条文。只排除因未采取适当措施而扩大的损失，防止扩大损失支出的合理费用由违约方负担；不把未减损泛化为全部损失均不赔。",
  },
} satisfies ContentSources;

const common =
  "本案为独立虚构案例，当事人以本人名义订立普通合同，具备相应民事行为能力，合同已经成立且有效。";
const resaleFacts =
  common +
  "佟宁向程越采购一批标准绘画纸，约定6月8日交货。订约时佟宁把已经签好的转售合同交给程越查看，其中载明6月10日交给下游客户，并附上进价、配送等合理成本清单及扣除后的转售净利润；程越看过并确认了解这个转售安排。程越到期把应交佟宁的这批货交给另一个客户，未向佟宁交货。佟宁立即查询替代货源并与下游协商，但在约定交付前确实没有可行补救，转售合同因此未能履行。题设给定转售安排及成本记录真实，按约履行本可获得这笔净利润，未获得它的原因就是本次迟交，不考利润数额或其他损失。程越认为：‘下游的钱还没入账，这笔利润不能算赔偿范围里的损失。’";
const specialFacts =
  common +
  "谷青向长期零售家用打印机的田绍购买一台普通打印机，约定7月5日前送到。磋商只涉及家庭打印、型号、价格和送货时间；谷青没有说明自己已另与第三人约定当晚交付一份限时资料。第三人合同载有一种远超本机价款及此类普通交易通常损失的高额迟交费用。田绍没有接触过该合同，双方没有类似既往交易或相应交易习惯，订单、包装及交付方式也没有特别用途提示。田绍漏排订单，7月5日没有送货，谷青在迟交后才把第三人合同交给他。题设给定谷青已因这次迟交向第三人实际支付该项异常高额费用，凭证真实；本问仅审这项请求的订约预见边界，不处理减损、其他损失或赔偿数额。谷青主张：‘费用是真实的，又是迟交造成的，所以田绍就应赔偿这笔异常高额费用的全部。’";
const growthFacts =
  common +
  "高恬向严祺购买仓库用遮雨篷布，订约时已说明要防止纸箱淋雨，约定8月4日9时送到。严祺漏派配送，到期没有交货。下午降雨时一箱纸板已被淋坏；在此之前确实没有能及时取得的替代防护或存放位置，这箱已经无法恢复，其损失与迟交的联系在本题不争议。14时邻户临时腾空同院的一间干燥库房，明确表示可免费使用。高恬当时知道这个安排，通道畅通，现有工人只需十分钟就能把其余仍干燥的纸箱搬入，雨水还要一小时才会浸到这些纸箱，也没有搬运安全障碍。高恬却决定不搬，理由是‘卖方先违约，我就等他赔’，结果其余纸箱随后也被淋坏。本问只判断后续本可通过这次移库避免的扩大损失，不要求结算第一箱损失。";
const costFacts =
  common +
  "乔安与杜澜订立仓库屋顶维修合同，约定10月20日18时前封好敞开的屋顶。杜澜收款后擅自撤走工人，届时没有按约修复。18时天气预报称当晚将有大雨，仓库中的书箱继续留在那里会被淋湿；乔安立即催促，杜澜答复不能在降雨前补做。乔安随即联系附近两处封闭干燥库房及搬运人员，对比当晚报价，选择较低且能及时完成的一家。她在雨前把书箱搬入，雨后移回，只支付实际需要的一晚临时库租及必要往返搬运费用，价格在当地正常区间，票据真实，操作没有安全障碍。书箱因而未被淋坏，合同没有约定乔安自行承担这类防扩费用。杜澜主张：‘车和库房是你自己找的，书也没坏，这笔费用应该由你自己承担。’本问只判断上述临时搬运、存放费用的承担，不处理全部修缮费用或其他责任。";

const resaleQuestion: UnitExercise = {
  id: "civil-contract-known-resale-profit",
  caseId: "CIVIL-LOSS-RESALE-1",
  relatedTopicIds: ["civil-contract-loss-scope"],
  kind: "objective",
  choiceMode: "single",
  title: "还没入账的转售净利润",
  facts: resaleFacts,
  prompt: "仅就这笔转售利益的赔偿范围，哪项最符合题设？",
  options: [
    {
      id: "a",
      text: "转售款尚未入账，这笔利益不属于可赔损失，只能考虑已经支付的费用。",
      explanation: "把尚未实际收到误作排除履行后可得利益的充分理由。",
    },
    {
      id: "b",
      text: "可把扣除合理成本且有给定依据的转售净利益纳入范围审查，不能仅因未入账排除。",
      explanation:
        "对应可得利益、已说明的转售安排及给定成本和因果事实，不直接计算全部赔偿。",
    },
    {
      id: "c",
      text: "应把下游合同的全部转售价款视为损失，进价和配送成本无需考虑。",
      explanation: "把销售收入当作净利益，忽略第60条第一款所述合理成本。",
    },
    {
      id: "d",
      text: "虽曾交过转售合同，赔偿范围仍只按程越在违约发生后实际知道的情况判断。",
      explanation:
        "第584条采用订立合同时预见到或应当预见到的边界，不移到违约后的认识。",
    },
  ],
  answer: "b",
  hint: "区分转售收入与净利益，再看卖方订约时接触了哪些具体信息。",
  reference:
    "选B。第584条的违约损失可以包括合同履行后可获得的利益，不能因为钱还没有实际入账就一律排除。合同编通则解释第60条第一款进一步说明要扣除合理成本。本案给定转售本可履行、扣除成本后的净利润可核、损失由本次迟交造成，订约时程越已查看并了解转售合同及成本清单；结合第63条第一款的订约预见判断，可以将该净利益纳入赔偿范围审查。这里不是将全部转售价款当成损失，也没有把收到转售款作为前提；本问不要求算出最终赔偿额。",
  sources: ["civil-loss-scope-law", "civil-loss-scope-interpretation"],
};

const specialQuestion: UnitExercise = {
  id: "civil-contract-undisclosed-special-loss",
  caseId: "CIVIL-LOSS-SPECIAL-1",
  relatedTopicIds: ["civil-contract-loss-scope"],
  kind: "subjective",
  title: "迟交后才出示的特殊费用合同",
  facts: specialFacts,
  prompt:
    "谷青所引理由能否支持异常高额费用的全部赔偿请求？请说明相关预见边界，并联系订约时给定的信息写出理由。",
  hint: "真实发生和因果联系之外，还要把判断时点放回订约时的交易情况。",
  reference:
    "所引理由不能支持全部请求。第584条即使承认因违约造成的损失，也以违约方订约时预见到或应当预见到的损失为界；不是只要费用实际发生且有因果联系就全赔。合同编通则解释第63条第一款要求结合订约目的、主体、内容、交易类型、习惯和磋商情况判断。本案是普通家用打印机交易，特殊第三人合同及异常高额费用未在订约时说明，既往交易、习惯、订单和交付情况也未给田绍相应提示；迟交后才出示不能倒推订约时已能预见。依据题设，这种异常高额部分超出所述预见边界，不能仅按谷青的理由转由田绍全部负担。未告知不等于任何损失都不可赔，通常损失也不因本结论一概排除；本问不要求确定全部其他请求或赔偿金额。",
  criteria: [
    {
      id: "civil-loss-special-rule",
      label: "订约时的损失预见边界",
      meaning:
        "违约损失赔偿以违约方订立合同时预见到或应当预见到的损失为界；费用真实并有因果联系，仍不足以推出异常高额费用全部可赔。",
      acceptable:
        "‘还得看订约时按这种交易能不能预料到这类损失，不能有真实支出就全赔’等义表达可以；可与本案普通交易及特殊安排合写，不要求固定条号或单独列一个反驳结论句。",
      boundary:
        "不能只以后来实际知道费用来替代订约时的预见判断。未提条号、全部损失类型、金额或额外处理提醒不单独算漏答；也不能把预见条件说成只有书面明示才可赔。",
    },
    {
      id: "civil-loss-special-application",
      label: "联系普通交易与未显露的特殊高额安排",
      meaning:
        "订约时只有普通家用打印机交易信息，特殊第三人合同和异常高额费用未说明，其他交易情况又无相应提示；这些事实不能支持田绍当时预见或应当预见这项异常高额损失，迟交后出示不补足该边界，所引理由不足以支持全部请求。",
      acceptable:
        "‘订约时只是普通家用购机，隐藏的高额第三人安排从其他交易信息也看不出来，迟交后拿出来不能当作当时可预见，所以不能凭实际支付要求全部转嫁’可综合承接两项；不要求逐项列全包装、订单、既往交易等提示缺失。",
      boundary:
        "只说没告知便不可赔、却不联系本案普通交易和没有其他特殊提示的事实不足；不能外推成所有未告知损失均排除。无需另写通常损失的完整结算、减损方案、第三人合同效力或其他责任提醒，参考中的提醒不增加第三项必答。",
    },
  ],
  sources: ["civil-loss-scope-law", "civil-loss-scope-interpretation"],
};

const growthQuestion: UnitExercise = {
  id: "civil-contract-avoidable-loss-growth",
  caseId: "CIVIL-LOSS-GROWTH-1",
  relatedTopicIds: ["civil-contract-loss-mitigation"],
  kind: "objective",
  choiceMode: "single",
  title: "可以移入干燥库房的纸箱",
  facts: growthFacts,
  prompt: "对后续本可移库避免的扩大损失，哪项最符合题设？",
  options: [
    {
      id: "a",
      text: "严祺先迟交，后续纸箱又确实损坏，因此这一扩大部分应全部由严祺赔偿。",
      explanation: "忽略违约后已有明确、可行且适当的防扩措施。",
    },
    {
      id: "b",
      text: "遮雨篷布尚未送到，高恬就无需考虑已经可用的移库安排。",
      explanation: "原义务未履行不免除对方采取适当措施防止损失扩大的要求。",
    },
    {
      id: "c",
      text: "高恬拒绝挪箱，使先前已经淋坏的第一箱也当然不能请求赔偿。",
      explanation: "把扣除本可避免的扩大损失扩成一切此前损失均不赔。",
    },
    {
      id: "d",
      text: "不能就未采取适当移库措施所扩大的这部分请求赔偿，但不由此否定此前全部损失。",
      explanation:
        "对应剩余纸箱尚干燥、时间充足、免费可安全挪入，却明知不搬的事实及第591条第一款。",
    },
  ],
  answer: "d",
  hint: "分开已发生的损失与后来能及时防止的部分，检查措施是否确实可用。",
  reference:
    "选D。第591条第一款要求违约后采取适当措施防止损失扩大，未采取而扩大的部分不得请求赔偿。高恬明知同院库房已腾空、免费可用，剩余纸箱仍干燥，工人和安全通道均具备，十分钟移库有充足时间避免一小时后的浸湿；她却只因卖方先违约而不搬。所问后续部分因未采取这项适当措施而扩大，不能转由严祺赔偿。此前已经无法恢复的第一箱不能因这次后来拒绝移库就当然被一并排除，本问不结算它的赔偿。",
  sources: ["civil-loss-mitigation-law"],
};

const costQuestion: UnitExercise = {
  id: "civil-contract-reasonable-mitigation-cost",
  caseId: "CIVIL-LOSS-COST-1",
  relatedTopicIds: ["civil-contract-loss-mitigation"],
  kind: "subjective",
  title: "为防雨临时搬走书箱的费用",
  facts: costFacts,
  prompt:
    "杜澜所引理由能否成立，这笔防扩费用应由谁负担？请说明相关规则，并联系临时搬运、存放安排写出理由。",
  hint: "看支出为何发生、是否适当及合理，不只看是谁亲自联系或最终有没有淋坏。",
  reference:
    "理由不能成立，题述合理费用由违约方杜澜负担。第591条第二款规定，为防止损失扩大支出的合理费用由违约方负担。杜澜未按约封好屋顶且不能雨前补做，乔安才为避免书箱淋湿及时临时移库；她比较报价，选择可及时完成、价格正常的安排，只支出需要的一晚库租和必要往返搬运费用。这些事实支持支出确为防止损失扩大且合理。由乔安自己联系安排、措施成功使书箱没坏，均不能按杜澜所说将该费用留给她负担。本问只确定给定合理防扩费用的承担，不要求计算全部赔偿或其他修缮责任。",
  criteria: [
    {
      id: "civil-loss-cost-rule",
      label: "合理防扩费用由违约方负担",
      meaning:
        "当事人为防止损失扩大支出的合理费用，由违约方负担；自行安排或成功防止书箱损坏，不是将这类合理费用留给守约方负担的理由。",
      acceptable:
        "‘为防更多损失所花的合理费用归违约方，不能因为我自己安排且最终没坏就不承担’等义表达可以；负担结论可以融入规则和案情分析，不要求单独成句或抄写条号。",
      boundary:
        "仍须限定为防扩且合理的费用，不能把任何自行花费都说成由违约方承担。无须另列一般违约责任、全部赔偿项目、金额或固定提醒，结论不另拆为第三项。",
    },
    {
      id: "civil-loss-cost-application",
      label: "联系雨前临时移库的目的与合理安排",
      meaning:
        "未按约修好屋顶、雨前无法补做使书箱面临淋湿，乔安及时临时移库并比较报价，只支付必要且正常价格的短期存放和搬运费用；这些事实支持该项防扩支出合理，应由杜澜承担。",
      acceptable:
        "‘他没修好又赶不及补，雨前把书临时搬到附近干库房，比较报价后只花需要的费用，是合理防止损失的支出，应向杜澜请求负担’可一段承接两项；不要求逐动作、分别背出每项票据或费用名称。",
      boundary:
        "只背费用由违约方承担却不联系本案防雨目的及必要、正常的临时安排不足；也不能假设已经发生新的书籍损坏。本题不要求证明所有可选方案中绝对最低成本、解释保险或计算完整修缮结算，未单列这些提醒不作漏答。",
    },
  ],
  sources: ["civil-loss-mitigation-law"],
};

export const civilContractLossesTopics: FaultTopic[] = [
  {
    id: "civil-contract-loss-scope",
    title: "违约损失的范围与订约预见",
    headline: "可得利益可以在内，真实损失仍有预见边界",
    goal: "根据给定履行利益及订约信息，辨析尚未收入的净利益和未显露的异常高额损失。",
    prerequisite:
      "接合同成立、履行抗辩与违约救济；本组给定有效合同，不重考成立、解除或复杂金额计算。",
    minutes: "8–12",
    paragraphs: [
      "第584条的赔偿范围以违约造成的损失为基础，可以包括合同履行后本可获得的利益。没有收到这笔收入，不足以一律排除；同样，预想的好处也不能不看依据就全算损失。本组给定可核的转售及因果事实，练的是范围判断。",
      "履行利益要与总收入分开。合同编通则解释第60条第一款说明确定可得利益时要考虑并扣除合理成本，可以按净生产、经营或转售利益计算。本组给定成本与净利润，不要求自行推算复杂赔偿额。",
      "真实发生并有因果联系还不够，第584条把范围限定在违约方订约时预见到或应当预见到的损失。解释第63条第一款要求结合订约目的、主体、内容、交易类型、习惯及磋商情况判断；不能只问是否明示告知，也不能把迟交后才知道倒当作订约时可预见。",
    ],
    example: {
      title: resaleQuestion.title,
      facts: resaleQuestion.facts,
      analysis: resaleQuestion.reference,
    },
    pitfall:
      "把未到账一律排除，把销售收入直接当净利益，或认为费用真实且有因果就能不审订约预见而全赔。",
    recall: {
      prompt:
        "尚未实际收到的转售利益是否都排除？判断异常高额损失时，为什么要回到订约时的具体交易情况？",
      reference:
        "不一律排除，有依据的合同履行利益可以纳入，但要考虑合理成本及因果。损失赔偿仍受订约时预见到或应当预见到的范围限制，结合交易和磋商事实判断；既不只看实际支出，也不把所有未告知损失都排除。",
    },
    sources: ["civil-loss-scope-law", "civil-loss-scope-interpretation"],
    exercises: [resaleQuestion, specialQuestion],
  },
  {
    id: "civil-contract-loss-mitigation",
    title: "防止损失扩大与合理费用",
    headline: "可避免的扩大部分不转嫁，合理防扩费用看其目的和安排",
    goal: "根据措施是否及时可行，区分既有与扩大损失，并说明必要合理防扩费用的承担。",
    prerequisite:
      "理解违约损失须对应事实；本组只练第591条两款，不扩大过失相抵、违约金、定金或全部结算。",
    minutes: "8–12",
    paragraphs: [
      "第591条第一款要求一方违约后，另一方采取适当措施防止损失扩大。是否适当须看当时信息、时间、可行性、安全和成本，不能事后随意假设一种当时不可用的补救办法。本组把实际可用的安排给足。",
      "没有采取适当措施致使损失扩大的，不得就扩大的部分请求赔偿。要分开此前已经发生的损失和后来本可避免却继续增长的损失；不能以一次未减损就否定所有此前损失，也不能以对方先违约就放任扩大而全转给对方。",
      "第591条第二款同时规定，为防止损失扩大而支出的合理费用由违约方负担。及时临时存放、必要搬运等要联系防扩目的和实际安排判断合理性，不是任何支出都可转嫁；自行采取措施或成功避免了损坏，也不当然使合理费用只归自己负担。",
    ],
    example: {
      title: growthQuestion.title,
      facts: growthQuestion.facts,
      analysis: growthQuestion.reference,
    },
    pitfall:
      "先违约就让后来可避免的损失全赔，或防止损失扩大成功便认为没有合理费用可请求负担。",
    recall: {
      prompt:
        "未采取实际可行的适当措施，排除的是哪部分损失？为防扩大而合理支出的费用由谁负担？",
      reference:
        "排除因没有采取适当措施而扩大的损失，不一概排除既有全部损失。防止损失扩大支出的合理费用由违约方负担，仍须联系措施目的和安排判断，不能把所有自行支出都算进去。",
    },
    sources: ["civil-loss-mitigation-law"],
    exercises: [growthQuestion, costQuestion],
  },
];

export const civilContractLossesChapter = {
  id: "CIV-CONTRACT-LOSSES",
  title: "违约损失赔偿与减损",
  section: "民法",
  topicIds: civilContractLossesTopics.map((topic) => topic.id),
};
export const civilContractLossesContentPack = {
  revision: civilContractLossesRevision,
  snapshot: {
    topics: civilContractLossesTopics,
    sources: civilContractLossesSources,
  },
};
export const civilContractLossesDefaultQueues = {
  objective: [resaleQuestion.id, growthQuestion.id],
  subjective: [specialQuestion.id, costQuestion.id],
};
const exercises = civilContractLossesTopics.flatMap((topic) => topic.exercises);
export const civilContractLossesQuestion = (
  id: string,
): UnitExercise | undefined => exercises.find((question) => question.id === id);
export const civilContractLossesTopicForQuestion = (
  id: string,
): FaultTopic | undefined =>
  civilContractLossesTopics.find((topic) =>
    topic.exercises.some((question) => question.id === id),
  );
export const civilContractLossesSameCaseQuestions = (
  id: string,
): UnitExercise[] => {
  const question = civilContractLossesQuestion(id);
  return question?.caseId
    ? exercises.filter((other) => other.caseId === question.caseId)
    : [];
};

/** Bare first-answer facts and question; all answer-side material stays separate. */
export function civilContractLossesPromptMaterial(id: string) {
  const question = civilContractLossesQuestion(id);
  if (!question) return null;
  return {
    id: question.id,
    caseId: question.caseId,
    revision: civilContractLossesRevision,
    title: question.title,
    kind: question.kind,
    facts: question.facts,
    prompt: question.prompt,
    ...(question.options
      ? { options: question.options.map(({ id, text }) => ({ id, text })) }
      : {}),
  };
}
