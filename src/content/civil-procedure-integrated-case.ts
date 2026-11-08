import type { ContentSources, UnitExercise } from "./fault-unit";

/** One original fictional civil-procedure case with three complete questions. */
export const civilProcedureIntegratedRevision =
  "civil-procedure-integrated-case-2026-10-06.v1";

const lawUrl =
  "https://fgw.sh.gov.cn/cmsres/95/95d5fd4cc4bb4c8292ea9684def3fa02/0212340e50e0b014b7a206164f270398.pdf";
const interpretationUrl = "https://www.court.gov.cn/fabu/xiangqing/353651.html";

export const civilProcedureIntegratedSources = {
  "civpro-integrated-party-law": {
    title: "《民事诉讼法》2023年修正文本第122条第一项：原告与本案的关系",
    url: lawUrl,
    note: "上海市发展和改革委员会官网公开全文；2026-10-06直接读取该项。本问只判断本人交易、本人请求与他人帮忙录入诉状的关系，不判退款最终成立或全部起诉条件。",
  },
  "civpro-integrated-venue-law": {
    title: "《民事诉讼法》2023年修正文本第22条第一款：公民的一般地域连接",
    url: lawUrl,
    note: "2026-10-06直接读取同一官方全文。住所地与经常居住地不一致时，一般规则按经常居住地；只评析户籍未迁能否支持本问的唯一连接点推论，不穷尽合同等其他管辖路径。",
  },
  "civpro-integrated-residence-interpretation": {
    title: "最高法民诉解释2022年修正文本第3、4条：住所地与经常居住地",
    url: interpretationUrl,
    note: "2026-10-06直接读取最高法公开页第3、4条及2022年修正标记。户籍所在地、离开住所地至起诉时连续居住一年以上及住院就医排除均按所列条文；本题给定两年日常居住，不另设天数计算。",
  },
  "civpro-integrated-objection-law": {
    title: "《民事诉讼法》2023年修正文本第130条：及时异议的审查与处理",
    url: lawUrl,
    note: "2026-10-06直接读取两款，主要采用第一款的审查及成立移送、不成立驳回异议；第二款未提出异议的前提用于比较。本问不考全部例外、答辩期限计算或异议最终是否成立。",
  },
  "civpro-integrated-objection-interpretation": {
    title: "最高法民诉解释2022年修正文本第223条第一款：及时异议后实体答辩",
    url: interpretationUrl,
    note: "2026-10-06直接读取该款。答辩期内已提出管辖异议，又针对起诉内容答辩的，仍须审查异议；不把实体答辩一律视为撤回，也不要求本问重写一般地域理由。",
  },
} satisfies ContentSources;

const caseId = "civpro-filing-jurisdiction-case";
const facts = [
  "本案为一个独立虚构案例，人物和地点均为虚构，各方都是境内普通成年公民。邢禾向闻杉购买一套二手摄影灯并支付3000元。交易和邢禾付款在题设中均为真实发生；两人后来对设备交付状况和款项是否已经部分退还发生争议。双方没有仲裁或选定法院的协议，本案不涉及不动产权利、涉外或专门法院事项，相应基层法院级别适当。",
  "闻杉的户籍仍在芦林县，但他早已离开那里；至邢禾起诉当天，闻杉已经在栖桥区连续工作和日常居住两年，起诉时仍住在该区。这段居住不是住院就医，闻杉正常工作生活，没有被监禁或被采取强制性教育措施。",
  "邢禾准备以本人名义请求闻杉返还3000元。她请朋友孟初把自己提供的诉求、事实和理由录入并打印成起诉状；原告栏写的是邢禾，邢禾自行核对内容并签名。孟初不是本次交易的一方，没有取得邢禾的交易权益，也没有以自己名义提出请求；他仅帮忙录入，不代邢禾签名或作诉讼代理人。",
  "9月10日，邢禾自行向芦林县法院递交这份起诉状，将闻杉列为被告。法院受理后，闻杉于9月20日依法收到起诉状副本。",
  "9月25日，闻杉向法院提交明确的管辖权异议，说明自己起诉时长期居住在栖桥区的情况，并请求法院审查地域问题。他同时提交了针对设备交付和部分款项已退还的书面实体答辩。题设确认，提出异议时仍在提交答辩状期间；闻杉没有撤回异议。",
  "截至题设时点，法院尚未对管辖异议是否成立作出裁定，也没有对设备交付和退款争议作出实体裁判。",
].join("\n\n");

export const civilProcedureIntegratedQuestions: UnitExercise[] = [
  {
    id: "civpro-filing-jurisdiction-case-q1",
    caseId,
    relatedTopicIds: ["civpro-filing-conditions"],
    kind: "subjective",
    title: "第1问",
    facts,
    prompt:
      "闻杉以‘起诉状是孟初录入的，邢禾不能作为原告’为由反对邢禾起诉。这个理由能否成立？请结合各人在本次交易和起诉中的身份说明。",
    hint: "",
    reference:
      "这个理由不能成立。第122条第一项要求原告与本案有直接利害关系，判断的是提出请求的人与争议的关系，不是按谁录入文字决定原告。邢禾是本次交易的买方和付款人，以本人名义请求返还自己的交易款项，起诉状也将她列为原告并由她确认、签名；题设支持她与该争议存在直接利害关系。孟初只是帮助录入，没有变成原告或取得邢禾的交易权益，他不是交易一方不能用来否定邢禾的原告条件。这里只排除所引理由，不由此认定全部起诉条件已经满足、退款请求必然成立，也不评价诉讼代理人的完整资格。",
    criteria: [
      {
        id: "civpro-integrated-q1-party-identity",
        label: "识别请求人自己的利益及录入人的角色",
        meaning:
          "原告是否与本案有直接利害关系应联系请求人本人的交易权益；邢禾是买方、付款人并以本人名义请求退款，孟初仅帮忙录入而非原告，不能以录入人不是交易方否定邢禾作为原告。",
        acceptable:
          "‘买灯付钱、要回自己款项的是邢禾，她才是诉状里的原告；孟初只替她敲字，这不改变邢禾与争议的关系’等义表达足够。可一段综合说明，不要求固定‘直接利害关系’术语或第122条号。",
        boundary:
          "需要识别本案实际请求人及其与交易的关系，不能只按录入者身份判断，也不能仅写一个抽象条件而不联系邢禾。无需同时列出全部起诉条件、评价孟初代理资格、重复签名细节或判退款最终成立；本问只有这一原告关系维度，不把每个身份描述拆成新必答。",
      },
    ],
    sources: ["civpro-integrated-party-law"],
  },
  {
    id: "civpro-filing-jurisdiction-case-q2",
    caseId,
    relatedTopicIds: ["civpro-general-territorial-venue"],
    kind: "subjective",
    title: "第2问",
    facts,
    prompt:
      "有人认为，闻杉户籍未迁，本案的地域选择就必须只按芦林县。仅就这个理由，结合闻杉起诉时的居住情况说明能否成立，并指出本问应识别的一般连接点。",
    hint: "",
    reference:
      "仅凭户籍未迁作出这个推论不能成立。解释第3条以公民户籍所在地界定住所地；第22条对公民的一般地域规则在住所地与经常居住地不一致时，按经常居住地识别连接点。解释第4条进一步规定，公民离开住所地至起诉时已连续居住一年以上的地方是经常居住地，住院就医地除外。闻杉已经离开芦林县，起诉时仍在栖桥区连续日常居住两年且非住院就医，符合本问的经常居住条件，所以一般连接点应识别为栖桥区。户籍未迁不足以将这一判断固定在芦林县。本问只评析这个理由和一般连接点，不穷尽合同等其他法定路径，也不由此直接判定第3问异议最终成立或某法院在所有路径下都无管辖权。",
    criteria: [
      {
        id: "civpro-integrated-q2-residence-rule",
        label: "不同住所与经常居住地时的一般规则",
        meaning:
          "公民住所地与经常居住地不一致时，一般地域规则按经常居住地识别；经常居住地结合离开住所地至起诉时的连续居住情况判断，住院就医地除外，不能只凭户籍未迁坚持原地点。",
        acceptable:
          "可以把规则与题中起诉时连续两年、非就医的事实合写，表达已形成另一经常居住地并按后者识别即可；不要求单独抄写定义句、报第22条号或固定规则名称。",
        boundary:
          "仍须表达两个地点不同后按经常居住地的规则。已用题中两年非就医事实说明条件时，未另外写‘一年以上’句不作独立漏答；不强迫列其他管辖路径、特殊被告名单或全套法院。",
      },
      {
        id: "civpro-integrated-q2-current-location",
        label: "联系起诉时居住事实识别栖桥区",
        meaning:
          "闻杉已离开芦林县，起诉时仍在栖桥区连续日常居住两年且非就医，支持栖桥区为本问经常居住地和一般连接点；户籍未迁不能单独拉回芦林县。",
        acceptable:
          "‘人已在栖桥连续生活两年，起诉时还在那里，又不是就医，一般连接点不能只看未迁的户籍’可综合承接两项；无需逐一复述工作和居住两种描述。",
        boundary:
          "需联系本案哪个地点及连续居住情况，不能只有抽象名称。无需判断退款、认定异议必然成立或论证合同等其他全部管辖路径；不自动从第3问原答补足本问缺少的地点和事实联系。",
      },
    ],
    sources: [
      "civpro-integrated-venue-law",
      "civpro-integrated-residence-interpretation",
    ],
  },
  {
    id: "civpro-filing-jurisdiction-case-q3",
    caseId,
    relatedTopicIds: ["civpro-jurisdiction-response"],
    kind: "subjective",
    title: "第3问",
    facts,
    prompt:
      "法院能否仅因闻杉已经作实体答辩，就跳过对其管辖权异议的审查？请结合题设说明，并说明审查后异议成立与不成立应分别如何处理。",
    hint: "",
    reference:
      "不能跳过审查。闻杉在提交答辩状期间提出了明确的管辖异议，且没有撤回；同时就设备交付、退款作实体答辩，不等于他未提出异议。解释第223条第一款明确，这种及时提出异议又答辩的情况，仍须按第130条第一款审查。未提出异议而应诉的规则不能抹去本案已经提出的及时异议。审查后若异议成立，应裁定将案件移送有管辖权的法院；若异议不成立，应裁定驳回该管辖异议，不能将此写成驳回原告退款请求。这里只说明应审及两种程序结果，不要求先认定本案异议最终成立，不从第2问的一般连接点自动补出全部实际管辖结论，也不判断设备或退款的实体责任。",
    criteria: [
      {
        id: "civpro-integrated-q3-review-objection",
        label: "及时异议仍须审查",
        meaning:
          "闻杉已在答辩期内明确提出且未撤回管辖异议，同时进行实体答辩不等于未提出异议或自动撤回，法院仍须审查这次异议。",
        acceptable:
          "‘他按时提了异议，只是另外答了退款问题，这不能把异议消掉，法院还得审’足以表达规则与案情联系；不要求重抄日期、地名、全部实体答辩内容或固定第223条号。",
        boundary:
          "需联系及时异议与实体答辩并存，不能写所有实体答辩都无条件产生放弃效果。无需重述第2问地域分析、未异议应诉的全部例外或作撤回的另行程序判断；不把同一应审理由拆成两条重复要求。",
      },
      {
        id: "civpro-integrated-q3-procedural-outcomes",
        label: "区分审查后的两种程序结果",
        meaning:
          "异议成立时裁定移送有管辖权的法院，异议不成立时裁定驳回管辖异议。",
        acceptable:
          "‘审后有理由就裁定移送到有权法院，没有理由就裁定驳回这份管辖异议’等义表达可以；无须确定具体接收法院或重复写退款责任提醒。",
        boundary:
          "题问两种处理结果，不能只说继续审理而不区分，也不能把驳回异议误写成驳回退款请求。未单独注明不判断实体责任不算漏答；不要求判本案异议最终成立、列上诉时限、重复全部法院或完成全套移送手续。",
      },
    ],
    sources: [
      "civpro-integrated-objection-law",
      "civpro-integrated-objection-interpretation",
    ],
  },
];

export const civilProcedureIntegratedCase = {
  id: caseId,
  title: "灯具交易后的来信",
  facts,
  questionIds: civilProcedureIntegratedQuestions.map((question) => question.id),
};

export function civilProcedureIntegratedQuestion(
  id: string,
): UnitExercise | undefined {
  const question = civilProcedureIntegratedQuestions.find(
    (candidate) => candidate.id === id,
  );
  return question ? structuredClone(question) : undefined;
}

export function civilProcedureIntegratedSameCaseQuestions(
  id: string,
): UnitExercise[] {
  return civilProcedureIntegratedQuestions.some(
    (question) => question.id === id,
  )
    ? structuredClone(civilProcedureIntegratedQuestions)
    : [];
}

/** Only the question's bare original material is exposed before saving. */
export function civilProcedureIntegratedPromptMaterial(id: string) {
  const question = civilProcedureIntegratedQuestion(id);
  return question
    ? {
        id: question.id,
        caseId: question.caseId,
        revision: civilProcedureIntegratedRevision,
        title: question.title,
        kind: question.kind,
        facts: question.facts,
        prompt: question.prompt,
      }
    : null;
}

/** All three complete prompts accompany one full shared original case. */
export function civilProcedureIntegratedWholePromptMaterial() {
  return {
    id: civilProcedureIntegratedCase.id,
    revision: civilProcedureIntegratedRevision,
    title: civilProcedureIntegratedCase.title,
    facts: civilProcedureIntegratedCase.facts,
    questions: civilProcedureIntegratedQuestions.map((question) => ({
      id: question.id,
      title: question.title,
      kind: question.kind,
      prompt: question.prompt,
    })),
  };
}
