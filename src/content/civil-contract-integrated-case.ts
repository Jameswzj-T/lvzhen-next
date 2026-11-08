import type { ContentSources, UnitExercise } from "./fault-unit";

/** One authored fictional case with three complete written subquestions. */
export const civilContractIntegratedRevision =
  "civil-contract-integrated-case-2026-10-06.v1";

const codeUrl =
  "https://flk.npc.gov.cn/detail?id=ff808081729d1efe01729d50b5c500bf";

export const civilContractIntegratedSources = {
  "civil-integrated-performance-law": {
    title: "《民法典》第526条：先后履行顺序与拒绝履行请求",
    url: codeUrl,
    note: "2026-10-06直接读取既有留存的全国人大官方附件第526条。本问只判断约定先交货、后付款且尚未交货时的暂拒付款，不扩不安抗辩、免除价款或解除清算。",
  },
  "civil-integrated-delivery-law": {
    title: "《民法典》第577、580条：非金钱债务的交付请求",
    url: codeUrl,
    note: "2026-10-06直接读取同一官方附件，并核固镇县司法局官网所载条文。第580条的继续履行请求保留法定除外情形；本案以通用现货、通常运输、受领条件及及时请求分析，补偿提议不由卖方单方替代交货义务。",
  },
  "civil-integrated-rental-law": {
    title: "《民法典》第584、591条：已知用途、合理费用与扩大损失",
    url: codeUrl,
    note: "2026-10-06直接读取同一官方附件，并核固镇县司法局官网所载条文。本问分别判断为按期展览支出的合理租赁费用和可免费及时归还却延期导致的新增费用，不计算金额或结算全部损失。第584条的订约预见规则用于说明已知展览用途，不能新增题外独立必答。",
  },
} satisfies ContentSources;

const caseId = "civil-contract-booth-case";
const facts = [
  "甲公司计划于9月12日至13日举办产品展览，并于次月开设门店。甲与乙公司订立了一份有效的买卖合同，购买一批通用展示桌，既用于本次展览，也用于门店开业后的长期陈列。合同约定，乙于9月10日中午前将符合约定的展示桌送到甲指定场所，甲于9月11日支付全部价款。签约时，乙知道展览日期及展示桌的上述用途。活动结束至门店开业前，甲不需要使用展示桌。",
  "乙为了优先处理另一笔订单，没有按约定安排送货。9月11日，甲仍未收到展示桌，乙却催甲支付价款。甲回复，收到展示桌之前暂不付款，并要求乙尽快交货。此时乙仓库中有足量符合约定的现货，正常装运即可送达，运输费用与订约时没有明显变化；甲指定的场所也可以正常接收。乙仍表示目前不安排交货。",
  "甲随后向两家能在开幕前送达的租赁公司询价，选择了报价较低、数量满足展览需要的一家，约定从9月12日开始租用。租赁价格与当地同类展示桌的通常价格一致，甲用租来的展示桌完成了展览。租赁合同约定按天计费，租赁公司已与甲确认，可以在9月13日展览结束后免费上门取回全部展示桌；如届时交还，9月14日起不再计费。",
  "9月13日展览结束后，甲让租赁公司暂缓取回，表示要等乙处理与自己的争议。租赁公司提醒甲，延期归还会继续按天收费，甲仍将租来的展示桌空置在场内。",
  "9月14日，甲再次要求乙按买卖合同交付展示桌，以备门店开业使用。乙答复，自己愿意补偿甲因本次迟延产生的损失，所以不再交货。甲没有接受这一处理方案，继续要求交货。乙的现货和通常运输条件仍与前述情况相同。",
  "数日后，甲才将租来的展示桌归还。租赁公司因此另收取了展览结束后的租赁费。甲要求乙承担其支付的全部租赁费，包括展览期间的费用和上述新增费用。",
].join("\n\n");

export const civilContractIntegratedQuestions: UnitExercise[] = [
  {
    id: "civil-contract-booth-case-q1",
    caseId,
    relatedTopicIds: ["civil-contract-performance-defense"],
    kind: "subjective",
    title: "第1问",
    facts,
    prompt:
      "9月11日，甲在尚未收到展示桌的情况下暂不支付价款，是否有依据？请结合合同约定和当时的情况说明理由。",
    hint: "",
    reference:
      "甲暂不付款有依据。第526条针对互负债务且有先后履行顺序的合同：应先履行的一方未履行时，后履行一方可以拒绝其履行请求。本案约定乙9月10日先交货、甲9月11日后付款，乙催款时仍未完成交付，所以甲作为后履行一方可以暂拒付款。仓库有货只是具备交货条件，不等于已向甲交付；不能把甲此时的暂拒倒置为乙先前不交货的原因。这一结论是针对当时履行状态的拒绝，不等于甲永久免除价款义务。本问只需说明规则、先后顺序及未交付对暂拒付款的联系，无须同时分析继续交货、租赁费用或解除清算。",
    criteria: [
      {
        id: "civil-integrated-q1-order-rule",
        label: "先后履行顺序下的拒绝依据",
        meaning:
          "互负债务且有先后履行顺序时，应先履行的一方未履行，后履行一方可以拒绝其履行请求。",
        acceptable:
          "可以用‘约定先送货再付款，前一项没有完成，后面应付款的人可以先不付’等义表达；规则可与本案事实合写，不要求专门使用某个抗辩名称或第526条号。",
        boundary:
          "不能把任何合同争议一律视为拒付依据，也不能写成后履行一方可无条件永久免除付款。已说明暂拒依据时，不强迫另写永久义务提醒；本问不要求列举其他抗辩、赔偿或解除规则。",
      },
      {
        id: "civil-integrated-q1-current-delivery",
        label: "联系先交货约定与尚未交付",
        meaning:
          "联系乙应先交货而催款时仍未向甲交付、甲付款在后的事实，说明甲当时暂不支付价款有依据。",
        acceptable:
          "‘乙约定先交桌子，付款日还没交，所以甲能暂缓付款’已表达必要联系；无须逐一重抄日期，也不要求额外说明有库存与已交付的区别。",
        boundary:
          "必须联系本案先后顺序及尚未交付，不能只有抽象抗辩名称或仅说双方有争议。不能把仓库有货当作已经交付；不从其他小问原答补足本问未写的联系，也不把第2、3问理由计作本问要求。",
      },
    ],
    sources: ["civil-integrated-performance-law"],
  },
  {
    id: "civil-contract-booth-case-q2",
    caseId,
    relatedTopicIds: ["civil-contract-continued-performance"],
    kind: "subjective",
    title: "第2问",
    facts,
    prompt:
      "9月14日，甲是否仍可以要求乙按合同交付展示桌？乙提出补偿迟延造成的损失，对这一请求有何影响？请说明理由。",
    hint: "",
    reference:
      "甲仍可要求乙按合同交付；乙单方提出补偿迟延损失，不当然排除这一请求。第577条列明继续履行、补救或赔偿等违约责任，第580条进一步允许对未履行的非金钱债务请求履行，并保留不能履行、不适于强制履行或履行费用过高、未在合理期限内请求等法定除外情形。本案是通用展示桌，乙有足量合格现货，装运、费用和甲受领条件正常；甲及时且持续请求交货，并未接受乙用补偿替代交货的方案。展览虽已结束，展示桌仍有次月门店长期陈列的用途，不能仅因一次展览结束就认定交付已经失去意义。题设没有显示上述履行障碍，乙愿意补偿不足以让其自行免除交付义务。无需重新论证第1问付款暂拒，也不要求在本问计算赔偿额、判断全部解除权或处理双方最终清算。",
    criteria: [
      {
        id: "civil-integrated-q2-delivery-rule",
        label: "交付请求与单方补偿提议的关系",
        meaning:
          "未履行的非金钱债务在没有法定除外情形时仍可请求履行；卖方单方表示愿意赔偿，不当然替代交付义务或排除买方的交付请求。",
        acceptable:
          "‘能够继续交的货，买方仍可要求按约交，卖方不能自己选择赔钱就不交了’等义表达可以；可在一段联系事实的论证中同时表达规则和补偿提议的影响。",
        boundary:
          "不要求背出第580条全部例外或逐项报条号。不能说赔偿与履行在任何情形都只能由违约方择一，也不能把继续履行写成无任何例外；不另拆一个‘补偿不能自行替代交付’的结论重复计分。",
      },
      {
        id: "civil-integrated-q2-delivery-application",
        label: "联系本案交货条件与仍存用途",
        meaning:
          "联系现货和正常运输可支持继续交付、甲仍有门店用途且持续请求而未接受替代方案，说明本案甲仍可请求交货，乙的补偿提议不足以排除该请求。",
        acceptable:
          "‘桌子有现货，仍能正常送到，甲还要用于门店并坚持收货，乙愿赔钱不能让他不交’足以表达必要联系；允许综合写法，不要求逐字抄写所有运输、日期或受领细节。",
        boundary:
          "需将可继续交付与本案仍要交货的事实联系起来，不能只复述抽象规则。未单列合理期限、运输费用、全部例外或门店开业具体日期，不单独作漏答；不能因展览结束就忽略给定的后续用途。本问不重列付款抗辩，不从第1问原答自动补足。",
      },
    ],
    sources: ["civil-integrated-delivery-law"],
  },
  {
    id: "civil-contract-booth-case-q3",
    caseId,
    relatedTopicIds: [
      "civil-contract-loss-mitigation",
      "civil-contract-loss-scope",
    ],
    kind: "subjective",
    title: "第3问",
    facts,
    prompt:
      "对甲请求乙承担的展览期间租赁费和展览结束后新增的租赁费，应当分别如何处理？请结合案情说明理由，无须计算具体金额。",
    hint: "",
    reference:
      "应分开处理，不能把全部租赁费一律转由乙承担，也不能因甲后来的留租而否定前段合理费用。展览期间，乙迟交且仍不安排送货，甲为使展览按期进行而租用足够数量的替代展示桌，比较报价后选择较低且符合当地通常价格的方案，实际用于展览。这属于因防止迟交损失扩大而支出的合理费用，第591条第二款规定由违约方负担，故该部分应由乙承担。乙订约时已知道展览日期和用途，也支持第584条所述订约预见范围内的通常租用费用分析，不能另造异常损失或复杂数额。展览结束后至门店开业前甲不需要使用这些租桌，租赁公司已能免费及时取回并停止以后计费；甲却要求暂缓取回，经收费提醒仍让桌子空置，从而产生本可避免的新增租赁费。按第591条第一款，未采取适当措施而扩大的部分不得再请求乙赔偿。乙先违约不等于甲可任由费用继续累积。这两项判断只处理题问的租赁费，不要求结算全部损失、价款或其他责任。",
    criteria: [
      {
        id: "civil-integrated-q3-reasonable-rental",
        label: "展览期间合理租赁费的承担",
        meaning:
          "甲因乙迟交而为按期展览采取临时租赁，数量和费用与需要相称且属通常价格，属于防止损失扩大而支出的合理费用，该部分应由乙负担。",
        acceptable:
          "‘为了展览按期举办而按正常价格租足够的桌子，是减少迟交影响的合理支出，乙应承担这段租费’等义表达可以；不强迫逐一列出两次询价、条号或所有日期。",
        boundary:
          "须表达临时租用对避免迟交影响的联系及费用合理性，不能只有‘卖方违约，所以什么都赔’。第584条预见分析是给定已知用途的补充说明，未独立写出不算漏答；不要求金额、全部损失类型或甲的最终收益。",
      },
      {
        id: "civil-integrated-q3-avoidable-extension",
        label: "展览后本可避免的新增租赁费",
        meaning:
          "展览结束后租桌无使用需要，已有免费及时取回并停止计费的办法，甲仍延期归还造成可避免的新增费用；未采取适当措施而扩大的这一部分不能再请求乙赔偿。",
        acceptable:
          "‘展会完就能免费退还，甲不用却拖着不退，多出来的租费本可避免，不能让乙承担’已表达规则与事实的联系；可以和前段合理费用写在同一段中。",
        boundary:
          "需要区分本可避免的新增部分与此前合理租费，不能因后段未减损就写全部租费均不赔，也不能因乙先违约就写全部必赔。无需列租赁公司所有提醒、逐日金额或另添其他责任；不从前两问原答推定本问已经作出费用区分。",
      },
    ],
    sources: ["civil-integrated-rental-law"],
  },
];

export const civilContractIntegratedCase = {
  id: caseId,
  title: "开幕前的展台",
  facts,
  questionIds: civilContractIntegratedQuestions.map((question) => question.id),
};

export function civilContractIntegratedQuestion(
  id: string,
): UnitExercise | undefined {
  const question = civilContractIntegratedQuestions.find(
    (candidate) => candidate.id === id,
  );
  return question ? structuredClone(question) : undefined;
}

export function civilContractIntegratedSameCaseQuestions(
  id: string,
): UnitExercise[] {
  return civilContractIntegratedQuestions.some((question) => question.id === id)
    ? structuredClone(civilContractIntegratedQuestions)
    : [];
}

/** Allowlisted initial question material; explanatory fields stay answer-after. */
export function civilContractIntegratedPromptMaterial(id: string) {
  const question = civilContractIntegratedQuestion(id);
  return question
    ? {
        id: question.id,
        caseId: question.caseId,
        revision: civilContractIntegratedRevision,
        title: question.title,
        kind: question.kind,
        facts: question.facts,
        prompt: question.prompt,
      }
    : null;
}

/** Fresh full-case material with all three prompts and one complete stem. */
export function civilContractIntegratedWholePromptMaterial() {
  return {
    id: civilContractIntegratedCase.id,
    revision: civilContractIntegratedRevision,
    title: civilContractIntegratedCase.title,
    facts: civilContractIntegratedCase.facts,
    questions: civilContractIntegratedQuestions.map((question) => ({
      id: question.id,
      title: question.title,
      kind: question.kind,
      prompt: question.prompt,
    })),
  };
}
