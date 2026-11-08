import type { ContentSources, UnitExercise } from "./fault-unit";

// Reviewed publication. The candidate edition and original authored gold remain immutable.
export const criminalProcedureLegalityRevision =
  "crimpro-legality-process-2026-10-16.v1";
export const criminalProcedureLegalityPreparation = {
  status: "bounded-content-review-approved",
  registeredInProduct: true,
  independentContentReviewApproved: true,
  sourceCheckedAt: "2026-10-16",
  fullCurrentValidityAuditCompleted: false,
  independentCases: 2,
  writtenQuestions: 2,
  objectiveQuestions: 0,
  newKnowledgeCards: 0,
  modelCalls: 0,
  existingCoverageReused: [
    "crimpro-tortured-confession-choice",
    "crimpro-tortured-confession-explain",
    "crimpro-document-collection-choice",
    "crimpro-document-collection-explain",
  ],
  distinctiveChanges: [
    "申请方线索义务与公诉方取证合法性证明责任，非有罪举证责任",
    "证人证言而非被告供述；签章说明单独证明的限制；调查后仍不能排除而非已查实非法取证",
  ],
} as const;
export const criminalProcedureLegalitySources: ContentSources = {
  "crimpro-legality-law58-60": {
    title: "《刑事诉讼法》2018修正第56、58—60条",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "2026-10-16直接核读南山区政府公开文本，页面2024-07-03发布、来源深圳市公安局，修正日期为2018-10-26。第58条区分申请线索或材料与法庭调查，第59条由人民检察院证明收集合法性，第60条规定经法庭审理确认或者不能排除第56条非法取证情形时排除；第56条覆盖刑讯供述及暴力、威胁取得的证人证言。未把网页编辑条文标签当原文。本批两题只考给定程序阶段下的责任和处理，不讨论最终定罪、重复供述或二审救济。",
  },
  "crimpro-legality-authorized-text": {
    title: "新华社受权发布《刑事诉讼法》证据章",
    url: "https://www.xinhuanet.com/politics/2018-10/27/c_1123620821_5.htm",
    note: "2018-10-27受权发布，2026-10-16直接核读第56、58、59、60条，与政府公开文本对应。作为法律原文交叉依据，不把旧公布页等同截至读取日的完整现行效力证明。案例、参考和评分边界为自编教学材料，2026-10-16主控已对本批两题及15份先验完成有界内容独审，不是官方真题或阅卷细则。",
  },
  "crimpro-legality-interpretation127-135-137": {
    title: "最高法刑诉法解释第127、135、137条：线索、合法性证明与排除",
    url: "https://www.court.gov.cn/zixun/xiangqing/286491.html",
    note: "2026-10-16直接核读最高法2021-02-04公布的法释〔2021〕1号正文。2020-12-07通过、2021-01-26公布令，2021-03-01施行。第127条列举相关线索或材料；第135条规定公诉人证明收集合法性的方法，签章说明材料不能单独作为合法根据；第137条对应调查后确认或不能排除非法取证时排除。另核123、125、128—136及655条限定上下文，不将申请时限、调查顺序、出庭程序列作本题必答。未核完此后全部修改清理，不宣称2027全年有效。",
  },
  "crimpro-legality-directory-cutoff": {
    title: "现行有效法律目录（截至2026-08-28）",
    url: "https://www.samr.gov.cn/fgs/sjdt/art/2026/art_93a4fbac2ce14ab6baab60b0cd452ef4.html",
    note: "沿用本项目2026-10-16已读的官方转载目录，刑事诉讼法列2018修正。目录截至2026-08-28不是读取日，更不是全年效力结论；本轮不改既有核验记录，不以检索未命中认定不存在后续修订。",
  },
};
export const criminalProcedureLegalityQuestions: UnitExercise[] = [
  {
    id: "crimpro-legality-clues-burden-explain-v1",
    caseId: "CRIMPRO-LEGALITY-CLUES-1",
    relatedTopicIds: ["crimpro-illegal-evidence-exclusion"],
    kind: "subjective",
    title: "体检记录与排除申请",
    facts:
      "本案为独立教学虚构。成年被告人岳岚被提起公诉。开庭前，她申请排除侦查阶段的一份有罪供述，具体写明某日下午、某办案区第三讯问室以及讯问笔录所列的两名侦查人员，称二人连续殴打自己，要求承认取走公司款项，自己为停止殴打才作出该供述。她同时提交次日体检记录，其中记载上臂有新鲜淤青，未记载伤痕形成原因。\n\n目前尚未查实伤痕是否由所称殴打造成、该供述是否因此形成。申请提出时间及形式没有争议，法院审查后对取证合法性有疑问，已经决定在庭审中调查。公诉人提出：“谁申请排除，谁就应先把刑讯逼供证明成立；被告人证明不了，检方不用再证明这份供述怎样取得。”",
    prompt:
      "岳岚提出排除申请时承担什么提供线索或材料的要求，是否必须先证明刑讯逼供已经成立？在已决定进行的合法性调查中，应由谁证明什么？结合本案简要说明。",
    hint: "",
    answer: "",
    reference:
      "岳岚申请排除时，应提供涉嫌非法取证的相关线索或者材料。本案已指出人员、时间、地点、殴打方式及所涉供述，并提交体检记录，供法院审查；这不等于她必须先把刑讯事实和供述形成联系证明成立。法院现已决定调查，应由人民检察院通过公诉人证明这份供述收集的合法性，不能因岳岚尚未证明刑讯就免除检方的责任。提供线索并不自动意味着供述应被排除，本问尚未给出调查结论。",
    criteria: [
      {
        id: "legality-application-clues",
        label: "提供相关线索或材料，不先承担证明刑讯成立的责任",
        meaning:
          "联系岳岚已指明讯问人员、过程并提交体检记录，说明申请方须提供相关线索或者材料，不必先将刑讯逼供事实证明成立。",
        acceptable:
          "“她已经把哪次讯问、怎么被打说清，还交了伤痕记录，这是给调查提供线索，不是让她先把刑讯坐实”即可。无需把人员、时间、地点、方式、内容逐项重抄，也不要求必须同时提交所有类型的线索和材料。",
        boundary:
          "只说被告不必证明而未回答相关线索或材料的要求，按实际遗漏处理；不能把她提出申请解释成完全无需线索，也不能要求先证明刑讯成立才进入本题已决定的调查。体检记载不自动证明殴打及因果联系，不要求推断伤的实际原因。",
      },
      {
        id: "legality-prosecution-proof",
        label: "人民检察院证明该供述收集合法",
        meaning:
          "在本案已决定进行的合法性调查中，由人民检察院通过公诉人证明所涉供述收集的合法性，不能把这项责任转给岳岚。",
        acceptable:
          "“现在该检方说明并用证据证明这份口供是合法取得的，不能等她先证明被打”即可；‘公诉人’‘检察院’‘检方’均可，题设指代清楚时不用重写供述编号。",
        boundary:
          "只说检方证明有罪，未回答取证合法性，不足以完整表达本项；明确说被告人必须证明取证违法、否则检方无需证明合法性，与本项相反。不要求列举所有举证方法、要求侦查人员一定出庭或预先决定排除、定罪。",
      },
    ],
    sources: [
      "crimpro-legality-law58-60",
      "crimpro-legality-authorized-text",
      "crimpro-legality-interpretation127-135-137",
    ],
  },
  {
    id: "crimpro-legality-unresolved-testimony-explain-v1",
    caseId: "CRIMPRO-LEGALITY-TESTIMONY-UNRESOLVED-1",
    relatedTopicIds: ["crimpro-illegal-evidence-exclusion"],
    kind: "subjective",
    title: "签章说明之后的证言",
    facts:
      "本案为另一独立教学虚构。在谢珩被控故意伤害的公诉案件中，检方提交证人姚萱在侦查阶段作出的指认证言。辩护人已依法提出排除申请，提供相关线索，称侦查人员曾以殴打姚萱本人相威胁，迫使她按照要求指认。法院对这一取证问题进行法庭调查。\n\n公诉人为证明该证言取得合法，提交了由有关侦查人员签名、办案单位盖章的说明，内容是“询问依法进行，没有暴力、威胁”。这份说明是检方就取证合法性提出的唯一证明材料。法庭已依法完成必要调查、听取控辩意见，仍不能排除该证言系以所指暴力威胁等非法方法收集，但也没有作出威胁行为已经查实的认定。本问只讨论这一份证言，不要求判断谢珩是否有罪。",
    prompt:
      "仅有上述签名盖章的说明，能否据此认定该证言收集合法？在题设已经完成合法性调查、仍不能排除所述非法取证的状态下，应如何处理这份证言，是否必须等到威胁取证已经被查实才排除？",
    hint: "",
    answer: "",
    reference:
      "不能仅凭这份说明认定收集合法。签名盖章并不使说明成为可以单独证明取证合法的根据，检方的合法性证明不能止于该材料。本案法庭已完成合法性调查，仍不能排除该证人证言系以暴力威胁等非法方法收集，应当排除，不能作为判决依据；不要求先进一步查实威胁取证确已发生。这里判断的是所涉证言的使用，不据此决定其他证据或全案是否有罪。",
    criteria: [
      {
        id: "legality-statement-not-alone",
        label: "签章说明不能单独证明取证合法",
        meaning:
          "联系检方仅提交签名盖章的合法性说明，说明签章不等于合法性已获证明，该说明不能单独作为认定取证过程合法的根据。",
        acceptable:
          "“有签名有章也不能只靠这张说明就算取证合法”足够，结论和理由可合成一句；无需指控说明虚假或要求某一种固定的额外证据。",
        boundary:
          "不把‘不能单独证明’扩成此类说明一概没有任何证据作用；是否签章已由题设给定，不另要求复述形式条件。明确说只要手续齐全就可单独证明合法性，与本项相反。",
      },
      {
        id: "legality-unresolved-exclusion",
        label: "调查后仍不能排除非法取证，应排除该证言",
        meaning:
          "联系合法性调查已完成而仍不能排除暴力威胁收集证言的状态，明确该证言应排除，不必以先查实非法取证为前提。",
        acceptable:
          "“调查完还排不掉威胁取证的可能，这份证言就不能拿来判，不用非等查实才排”即可；‘不能作为判决依据’可表达排除的处理，不强制使用‘排除’一词或条号。",
        boundary:
          "不把调查刚开始的疑问直接当最终排除条件；本题已给定必要调查完成。明确说因威胁尚未查实所以仍可采用，或必须由被告证明威胁成立后才排除，与本项相反。未讨论其他证据、最终有罪无罪、侦查人员责任、赔偿与二审救济不扣分。",
      },
    ],
    sources: [
      "crimpro-legality-law58-60",
      "crimpro-legality-authorized-text",
      "crimpro-legality-interpretation127-135-137",
    ],
  },
];
export const criminalProcedureLegalityTrace = [
  {
    criterionId: "legality-application-clues",
    promptPart:
      "岳岚提出排除申请时承担什么提供线索或材料的要求，是否必须先证明刑讯逼供已经成立？",
    givenFact:
      "申请写明涉嫌人员、讯问时间地点、殴打方式及对应供述；体检记录仅记载伤痕，未查实成因。",
    sourceId: "crimpro-legality-law58-60",
    provisions: ["刑诉法第58条第2款", "刑诉法解释第127条"],
    contrast: "具体线索已提出，不等于申请人必须先完成非法取证事实的终局证明。",
  },
  {
    criterionId: "legality-prosecution-proof",
    promptPart: "在已决定进行的合法性调查中，应由谁证明什么？",
    givenFact:
      "法院已决定调查供述收集合法性；公诉人试图以被告未证明刑讯为由免除己方责任。",
    sourceId: "crimpro-legality-law58-60",
    provisions: ["刑诉法第59条第1款", "刑诉法解释第135条"],
    contrast: "证明对象是这份供述收集合法性，不能只回答普通公诉有罪证明责任。",
  },
  {
    criterionId: "legality-statement-not-alone",
    promptPart: "仅有上述签名盖章的说明，能否据此认定该证言收集合法？",
    givenFact: "证明合法性的唯一材料为经侦查人员签名、单位盖章的说明。",
    sourceId: "crimpro-legality-interpretation127-135-137",
    provisions: ["刑诉法解释第135条第3款"],
    contrast: "形式签章齐备与实质证明充分不同，不因有章即完成证明。",
  },
  {
    criterionId: "legality-unresolved-exclusion",
    promptPart:
      "在题设已经完成合法性调查、仍不能排除所述非法取证的状态下，应如何处理这份证言，是否必须等到威胁取证已经被查实才排除？",
    givenFact:
      "法庭已完成必要调查，仍不能排除暴力威胁取证，未积极查实威胁发生。",
    sourceId: "crimpro-legality-law58-60",
    provisions: ["刑诉法第56条第1款、第60条", "刑诉法解释第125、137条"],
    contrast:
      "不同于既有刑讯事实已查实的旧案；调查后的不能排除也产生排除后果。",
  },
] as const;
export function criminalProcedureLegalityPromptMaterial(id: string) {
  const q = criminalProcedureLegalityQuestions.find((q) => q.id === id);
  if (!q) return undefined;
  return {
    id: q.id,
    revision: criminalProcedureLegalityRevision,
    caseId: q.caseId,
    relatedTopicIds: [...(q.relatedTopicIds ?? [])],
    kind: q.kind,
    title: q.title,
    facts: q.facts,
    prompt: q.prompt,
  };
}
