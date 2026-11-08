import type { ContentSources, UnitExercise } from "./fault-unit";

// Reviewed publication. The original candidate and authored gold remain immutable.
export const civilProcedureEvidenceRevision =
  "civpro-evidence-proof-2026-10-16.v1";
export const civilProcedureEvidencePreparation = {
  status: "bounded-content-review-approved",
  registeredInProduct: true,
  independentContentReviewApproved: true,
  sourceCheckedAt: "2026-10-16",
  fullCurrentValidityAuditCompleted: false,
  independentCases: 4,
  writtenQuestions: 4,
  objectiveQuestions: 0,
  newKnowledgeCards: 0,
  modelCalls: 0,
} as const;

export const civilProcedureEvidenceSources: ContentSources = {
  "civpro-evidence-admission-3-4-8": {
    title: "最高法《关于民事诉讼证据的若干规定》2019修正第3、4、8条",
    url: "https://www.court.gov.cn/fabu/xiangqing/212721.html",
    note: "2026-10-16核读最高法2019-12-26公布文本（2020-05-01施行），并与知识产权法庭2020-07-14转载第3、4、8条交叉。第3条为明确承认不利事实，第4条要求审判人员说明并询问后仍不明确表态，第8条保留不适用自认及与已查明事实不符的边界。已查看最高法2019年至2026年的解释目录及指定修订文件；国家法律法规库详情返回403，2020年116件废止目录图片未成功读到，未完成全部后续清理，不宣称全年现行效力核定。题目自编，2026-10-16主控对本批普通财产争议的四题完成有界独审；不是官方真题或阅卷细则。",
  },
  "civpro-evidence-interpretation-92-108-109": {
    title: "最高法民诉法解释2022修正第92、108、109条",
    url: "https://www.court.gov.cn/zixun/xiangqing/353651.html",
    note: "2026-10-16核读最高法2022-04-02公布的第二次修正全文，2022-04-10施行。第92条为自认及例外，第108条为普通待证事实的高度可能性及裁判认定，第109条为欺诈等指定事实的排除合理怀疑。与民事证据规定第3、4、8、86条对应。后续修订清理范围及未核部分另存本批公开核验记录；不将旧公布页或搜索未命中当作截至2026全年有效证明。仅拟用于双方普通财产争议，不含生态侵权、身份公益或民刑交叉专门规则。",
  },
  "civpro-evidence-fraud-86": {
    title: "最高法《关于民事诉讼证据的若干规定》2019修正第86条",
    url: "https://www.court.gov.cn/fabu/xiangqing/212721.html",
    note: "2026-10-16直接核读第86条第一款，欺诈等指定事实须达到能够排除合理怀疑的证明程度；与民诉法解释第109条交叉。该标准针对欺诈待证事实，不把所有民事事实提高标准，也不在本题判断刑事有罪、撤销期限或欺诈是否实际证成。2019修正自2020-05-01施行，现行效力核验限制同本批记录。",
  },
};
export const civilProcedureEvidenceQuestions: UnitExercise[] = [
  {
    id: "civpro-admission-receipt-explain-v1",
    caseId: "CIVPRO-ADMISSION-RECEIPT-1",
    relatedTopicIds: ["civpro-proof-burden"],
    kind: "subjective",
    title: "庭审中的收货陈述",
    facts:
      "本案为独立教学虚构。林岚起诉要求郑闻支付20箱工具的货款。庭审中，法官询问交货情况，郑闻本人明确回答：“20箱我当天都收到了。”随后，他另称其中两箱存在质量问题，要求扣减价款；林岚否认质量有问题。\n\n双方均为有完全民事行为能力的成年人，本案仅涉及双方可以处分的财产利益，不涉及身份关系、国家或社会公共利益、他人权益以及法院应依职权调查的情形。郑闻对收货的承认未撤回，也与已查明事实不冲突。质量争议尚待审查。",
    prompt:
      "林岚还须就“郑闻收到这20箱工具”另行举证证明吗？这段收货陈述是否意味着林岚的全部货款请求都应获得支持？简要说明。",
    hint: "",
    answer: "",
    reference:
      "郑闻在诉讼中明确承认了对自己不利的收货事实，且没有不适用自认的情形，林岚对这一事实无须再举证证明。承认收货不等于认可全部货款请求；两箱工具的质量及其对价款的影响仍须审查，不能仅凭这段陈述直接支持全部请求。",
    criteria: [
      {
        id: "admission-receipt-proof",
        label: "明确承认收货使该事实免于另行证明",
        meaning:
          "联系郑闻在庭审中明确承认自己收货，说明林岚对这一不利于郑闻的事实无须再举证。",
        acceptable:
          "“他自己已经认了收到货，林岚不用再证明这件事”即可；不用写‘自认’术语、条号、箱数或逐一复述已排除的例外。",
        boundary:
          "未解释承认与免证的联系但结论正确，肯定结论；明确说仍必须由林岚另证收货才可认定，与本项相反。只判断收货，不要求证明合同全部要件。",
      },
      {
        id: "admission-receipt-scope",
        label: "承认收货不等于全部货款请求成立",
        meaning:
          "区分收货事实与全部货款请求：质量争议尚待审查，不能因承认收货直接支持全部货款。",
        acceptable:
          "“认收货不等于全认账，质量问题还没弄清”已同时表达范围与案情；不强制再说扣减多少或另写理由句。",
        boundary:
          "只判断这段陈述的效力范围，不要求确定质量是否有问题或最终应付多少。明确说承认收货即必须全额支持，与本项相反；未讨论质量责任分配不额外扣本项。",
      },
    ],
    sources: [
      "civpro-evidence-admission-3-4-8",
      "civpro-evidence-interpretation-92-108-109",
    ],
  },
  {
    id: "civpro-silence-unexplained-explain-v1",
    caseId: "CIVPRO-SILENCE-UNEXPLAINED-1",
    relatedTopicIds: ["civpro-proof-burden"],
    kind: "subjective",
    title: "没有回应的加修约定",
    facts:
      "本案为独立教学虚构。乔宁起诉向陶舒收取修理费，其中600元被乔宁解释为陶舒另行同意的加修项目。陶舒此前没有承认过这项约定。庭审中，乔宁两次说“她当时同意加做这项”，陶舒均未作回应。\n\n法官只是将双方发言情况记入笔录，尚未向陶舒说明对该事实不明确表态的法律后果，也没有询问她究竟承认还是否认，随后暂时转入其他事项。加修约定目前尚未被其他证据证明。本案仅涉及双方可以处分的财产利益，不涉及身份、公益或其他自认适用例外。",
    prompt:
      "现在能否仅凭陶舒的沉默，按她已经承认加修约定处理，使乔宁免于证明这一事实？如果继续核实她的态度，什么条件下仍不明确表态才可视为承认？",
    hint: "",
    answer: "",
    reference:
      "现在不能。陶舒只是未回应，法官尚未履行说明并询问的步骤，不能仅凭沉默视为承认并免除乔宁对这项约定的证明。审判人员说明不明确表态的后果并询问其态度后，陶舒仍既不承认也不否认，才符合本题所问的视为承认条件；这不等于现在已经证明加修约定不存在。",
    criteria: [
      {
        id: "silence-no-current-admission",
        label: "当前沉默不足以按承认处理",
        meaning:
          "联系尚未经说明并询问的事实，说明现在不能仅以陶舒沉默而视为承认，乔宁不会因此免于证明该约定。",
        acceptable:
          "“法官还没讲明白也没问她态度，光不说话不能当她认了”足够；‘不能当她认了’已回应免证前提，不强制重复乔宁姓名或再写不免证。",
        boundary:
          "明确把本案目前沉默直接当承认，与本项相反；不要求推断陶舒内心、认定她说谎或断言约定客观不存在。",
      },
      {
        id: "silence-explanation-inquiry",
        label: "说明并询问后仍不明确表态",
        meaning:
          "说明审判人员需先说明并询问，当事人此后仍对该不利事实既不承认也不否认，才可视为承认。",
        acceptable:
          "“讲清这样不表态有什么后果，再问她，还是不肯说认不认，才当作认了”可完整覆盖；无需条号或固定次序措辞。",
        boundary:
          "仅说‘再问一次’而无说明、或仅说明而无询问，按实际遗漏处理；明确主张沉默在任何情形下都绝不可能视为承认，与本项相反。未写本题未问的撤回自认程序不扣。",
      },
    ],
    sources: [
      "civpro-evidence-admission-3-4-8",
      "civpro-evidence-interpretation-92-108-109",
    ],
  },
  {
    id: "civpro-proof-ordinary-delivery-explain-v1",
    caseId: "CIVPRO-ORDINARY-DELIVERY-STANDARD-1",
    relatedTopicIds: ["civpro-proof-burden"],
    kind: "subjective",
    title: "展架是否已经交付",
    facts:
      "本案为独立教学虚构。邵平起诉要求许青支付一批定制展架的货款，双方承认合同有效，只争执邵平是否已经把展架交给许青。邵平提交送货记录及仓库人员的证言；许青对这些材料提出质疑，并说：“没有交货录像，就还可能根本没送到。只要还有合理怀疑，法院就不能认定交付。”\n\n这是双方普通买卖中的交付事实争议，不涉及欺诈、胁迫、恶意串通、赠与、口头遗嘱、法定推定或其他特殊证明标准，也没有关联刑事案件。题目只概述材料类型，未给出法院对其可信性和证明力的完整审查结果。",
    prompt:
      "法院认定本案“展架已经交付”，通常应达到什么证明程度？许青提出的“必须排除合理怀疑才能认定”能否作为本案的证明要求？只回答证明标准，不判断现有材料是否已经达标。",
    hint: "",
    answer: "",
    reference:
      "本案的普通交付事实适用高度可能性标准：法院结合证据及相关事实，确信该事实存在具有高度可能性时，应认定其存在。不能因这是民事争议就只要求略有可能，也不能把排除合理怀疑作为本案普通交付事实的必达要求。没有录像本身不自动决定是否达到证明标准；题设没有给出完整审查结果，本问不作实际达标结论。",
    criteria: [
      {
        id: "ordinary-high-probability",
        label: "普通交付事实适用高度可能性",
        meaning: "针对本案普通交付事实，说明应使法院确信其存在具有高度可能性。",
        acceptable:
          "“要让法院确信货很有可能确实交了”或‘达到高度可能性’可表达该标准；只说‘比没交稍微更可能’不足以替代。无需量化百分比、条号或逐项评证。",
        boundary:
          "肯定‘高度可能性’的准确表述，不强制逐字复写‘确信’。明确采用只要有一点可能或固定51%即可，与本项相反；实际证据是否达标不在必答范围。",
      },
      {
        id: "ordinary-no-special-threshold",
        label: "不把排除合理怀疑强加给普通交付事实",
        meaning:
          "说明本案不是适用特别证明标准的欺诈等事实，不能要求必须排除合理怀疑后才可认定交付。",
        acceptable:
          "“这只是普通交货争议，不必按他要求把合理疑问全排掉”即可。准确指出本案适用高度可能性，且未另加更高要求或明确表示未决，可以同时覆盖两项。",
        boundary:
          "本项独立检查是否不要求排除合理怀疑，不把第一项普通标准的准确性重复塞入本项。即使误把普通标准降为稍占优势，已表达不需更高标准的子结论仍肯定，降低标准的错误在第一项指出。明确说所有民事事实或本案交付都必须排除合理怀疑，与本项相反；明确未决仍为未决。未讨论录像、最终货款、证人资格不额外扣分。",
      },
    ],
    sources: ["civpro-evidence-interpretation-92-108-109"],
  },
  {
    id: "civpro-proof-fraud-standard-explain-v1",
    caseId: "CIVPRO-FRAUD-STANDARD-1",
    relatedTopicIds: ["civpro-proof-burden"],
    kind: "subjective",
    title: "旧设备交易中的隐瞒争议",
    facts:
      "本案为独立教学虚构。苏遥购买阮衡的一台旧印刷设备后，发现主部件曾严重损坏，起诉请求撤销买卖。她主张阮衡明知损坏却故意隐瞒，还提供虚假的检修记录诱使自己购买；阮衡否认知情和造假，认为只是使用年限较长。\n\n法院需要审查苏遥主张的欺诈事实，聊天记录和检修材料尚有争议，题设不预先确认欺诈成立。双方对价款已经支付没有争议；本案没有关联刑事案件、刑事裁判或其他特殊程序。苏遥认为：“既然是民事案件，欺诈事实也只要达到普通事实的高度可能性即可。”",
    prompt:
      "对苏遥主张的欺诈事实，证明程度只达到高度可能性是否足够，应适用什么标准？这一要求是否意味着本案所有其他普通待证事实也必须适用同样的较高标准？",
    hint: "",
    answer: "",
    reference:
      "不足够。欺诈事实属于法定特别证明标准的对象，应达到法院确信其存在的可能性能够排除合理怀疑；不能仅因是民事案件就降为普通事实的高度可能性。这一较高标准针对欺诈待证事实，不当然扩展到本案所有其他普通待证事实，也不等于在本案判断刑事有罪。题设未确认现有证据达标，不据此认定欺诈成立或直接决定撤销请求。",
    criteria: [
      {
        id: "fraud-reasonable-doubt",
        label: "欺诈事实须能够排除合理怀疑",
        meaning:
          "说明仅有普通高度可能性不足以认定本案欺诈事实，欺诈须达到能够排除合理怀疑的证明程度。",
        acceptable:
          "“关于故意骗她这件事，要把合理疑问排除，光是很可能有欺骗还不够”即可；无需背条号、说刑事证明标准或判断证据实际是否达标。",
        boundary:
          "只写排除合理怀疑即已表达特别标准，不再强制重写高度可能性不足。明确说因是民事案件所以欺诈也只需普通标准，与本项相反；不要求绝对确定、排除所有想象可能。",
      },
      {
        id: "fraud-fact-specific-scope",
        label: "较高标准不扩为所有普通事实的标准",
        meaning:
          "区别欺诈事实的较高要求与其他普通待证事实；不能因本案包含欺诈争点就让全部其他普通事实一律适用排除合理怀疑。",
        acceptable:
          "“加高要求的是欺诈这件事，别的普通事实不跟着加码”即可；无需逐个列出其他事实，也不要求重复价款已付。",
        boundary:
          "明确说只要有欺诈主张整案所有事实都必须适用同样较高标准，与本项相反。撤销期限、赔偿、举证责任分配、犯罪构成与定罪均非必答；不因未展开这些内容扣分。",
      },
    ],
    sources: [
      "civpro-evidence-fraud-86",
      "civpro-evidence-interpretation-92-108-109",
    ],
  },
];
export const civilProcedureEvidenceTrace = [
  {
    criterionId: "admission-receipt-proof",
    promptPart: "林岚还须就“郑闻收到这20箱工具”另行举证证明吗？",
    givenFact: "郑闻本人明确答称20箱都收到；无自认例外",
    sourceId: "civpro-evidence-admission-3-4-8",
    provision: "第3条、第8条",
  },
  {
    criterionId: "admission-receipt-scope",
    promptPart: "这段收货陈述是否意味着林岚的全部货款请求都应获得支持？",
    givenFact: "质量及价款争议独立存在，承认对象仅收货",
    sourceId: "civpro-evidence-interpretation-92-108-109",
    provision: "第92条：承认对象为不利事实",
  },
  {
    criterionId: "silence-no-current-admission",
    promptPart:
      "现在能否仅凭陶舒的沉默，按她已经承认加修约定处理，使乔宁免于证明这一事实？",
    givenFact: "法官尚未说明后果，也未询问态度",
    sourceId: "civpro-evidence-admission-3-4-8",
    provision: "第4条",
  },
  {
    criterionId: "silence-explanation-inquiry",
    promptPart: "什么条件下仍不明确表态才可视为承认？",
    givenFact: "尚缺说明并询问；设问明确要求后续条件",
    sourceId: "civpro-evidence-admission-3-4-8",
    provision: "第4条",
  },
  {
    criterionId: "ordinary-high-probability",
    promptPart: "通常应达到什么证明程度？",
    givenFact: "普通买卖交付争议，无列举特殊标准情形",
    sourceId: "civpro-evidence-interpretation-92-108-109",
    provision: "第108条第1款",
  },
  {
    criterionId: "ordinary-no-special-threshold",
    promptPart: "许青提出的“必须排除合理怀疑才能认定”能否作为本案的证明要求？",
    givenFact: "许青提出更高要求；题设排除特别标准",
    sourceId: "civpro-evidence-interpretation-92-108-109",
    provision: "第108条第1款、第109条",
  },
  {
    criterionId: "fraud-reasonable-doubt",
    promptPart: "证明程度只达到高度可能性是否足够，应适用什么标准？",
    givenFact: "苏遥主张故意隐瞒和虚假材料诱使交易，欺诈尚待证明",
    sourceId: "civpro-evidence-fraud-86",
    provision: "第86条第1款；民诉解释第109条",
  },
  {
    criterionId: "fraud-fact-specific-scope",
    promptPart: "是否意味着本案所有其他普通待证事实也必须适用同样的较高标准？",
    givenFact: "欺诈为特定争点，题设未设其他特殊标准",
    sourceId: "civpro-evidence-interpretation-92-108-109",
    provision: "第108条、第109条（特定事实列举）",
  },
] as const;

// A later preview can show only the question; authored gold stays in evals.
export function civilProcedureEvidencePromptMaterial(id: string) {
  const q = civilProcedureEvidenceQuestions.find(
    (question) => question.id === id,
  );
  if (!q) return undefined;
  return {
    id: q.id,
    revision: civilProcedureEvidenceRevision,
    caseId: q.caseId,
    relatedTopicIds: [...(q.relatedTopicIds ?? [])],
    title: q.title,
    kind: q.kind,
    facts: q.facts,
    prompt: q.prompt,
  };
}
