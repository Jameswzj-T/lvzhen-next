import type { ContentSources, UnitExercise } from "./fault-unit";
import {
  civilProcedureFoundationsTopics,
  civilProcedureFoundationsSources,
} from "./civil-procedure-foundations";
import {
  civilProcedureFirstInstanceTopics,
  civilProcedureFirstInstanceSources,
} from "./civil-procedure-first-instance";
import {
  civilProcedureRemediesSpecialTopics,
  civilProcedureRemediesSpecialSources,
} from "./civil-procedure-remedies-special";
import {
  civilProcedureExecutionTopics,
  civilProcedureExecutionSources,
} from "./civil-procedure-execution";
import {
  civilProcedureArbitrationTopics,
  civilProcedureArbitrationSources,
} from "./civil-procedure-arbitration";
import { civilProcedureProofBurdenTopics } from "./civil-procedure-evidence-registration";
import { civilProcedureProofBurdenSources } from "./civil-procedure-proof-burden";

// Two original fictional cases. Question answers remain independent.
export const civilProcedureCrossChapterRevision =
  "civil-procedure-cross-chapter-2026-10-30.v1";
export const civilProcedureCrossChapterSources = {
  "civpro-cross-venue": {
    title: "民事诉讼法第35条：协议管辖",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-30核对现行2023修正文本。境内财产权益纠纷须有实际联系，协议不得违反级别及专属管辖。",
  },
  "civpro-cross-preservation": {
    title: "民事诉讼法第104条：诉前保全",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "情形紧急、提供担保及采取措施后30日内起诉或申请仲裁；不把请求法院处理误作自动取得款项。",
  },
  "civpro-cross-admission": {
    title: "最高法关于民事诉讼证据的若干规定第3、8、9条",
    url: "https://www.court.gov.cn/fabu/xiangqing/212721.html",
    note: "2019修正、2020施行。书面答辩中的明确自认与撤销条件；仅撤回说法不等于满足撤销自认条件。",
  },
  "civpro-cross-appeal": {
    title: "最高法民诉解释第326条：二审新增独立诉请",
    url: "https://www.court.gov.cn/fabu/xiangqing/353651.html",
    note: "2022修正。调解不成另行起诉；双方同意二审一并审理的，二审可以一并裁判。",
  },
  "civpro-cross-execution": {
    title: "民事诉讼法第236、238条：执行异议",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "区分执行行为异议后10日复议与案外人标的异议后15日异议之诉；后者须与原判无关。15日审查不是提出异议的统一期限。",
  },
  "civpro-cross-execution-court": {
    title: "最高法民诉解释第302、303条：案外人执行异议之诉",
    url: "https://www.court.gov.cn/fabu/xiangqing/353651.html",
    note: "2022修正。执行法院管辖；案外人异议被驳回，与原判无关的排除执行请求，适用裁定送达之日起15日。",
  },
  "civpro-cross-arb-agreement": {
    title: "仲裁法第30、31条：仲裁协议独立性及效力异议",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026年3月1日起施行。合同效力与仲裁协议分开；并行异议中法院裁定优先，开庭审理案件须首次开庭前提出。",
  },
  "civpro-cross-arb-evidence": {
    title: "仲裁法第58条：国内仲裁中的证据保全",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "由仲裁机构将申请提交证据所在地基层法院。与涉外第79条区分。",
  },
  "civpro-cross-arb-partial": {
    title: "仲裁法第68、70条：先行裁决与生效",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "部分事实清楚可以先行裁决；裁决作出即生效。未裁决部分继续审理。",
  },
  "civpro-cross-arb-absence": {
    title: "仲裁法第54条：当事人缺席",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "经书面通知而无正当理由缺席，申请人与被申请人处理不同，不等于自动胜诉。",
  },
  "civpro-cross-arb-remedies": {
    title: "仲裁法第71、72、77条：撤销与执行中止",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "收到裁决三个月内向机构所在地中院申请；申请执行与申请撤销并存时中止，撤销申请被驳回则恢复。",
  },
} satisfies ContentSources;
export const civilProcedureCrossChapterQuestions: UnitExercise[] = [
  {
    id: "civpro-cross-sale-q1",
    caseId: "civpro-cross-sale-case",
    relatedTopicIds: ["civpro-jurisdiction-agreement"],
    kind: "subjective",
    title: "第1问",
    facts:
      "本案为原创虚构案例。2026年4月，住所地在青浦县的禾原公司向住所地在新澄区的沐川公司出售一批包装设备，价款30万元。双方签署的书面合同约定，合同纠纷由禾原公司住所地法院处理；没有仲裁条款。两地名称均为虚构，双方均为境内公司，基层法院级别适当，本案不涉及专属管辖。禾原公司的住所地一直没有变更。\n\n5月6日货物运到沐川公司仓库。付款期限届满后，沐川以部分设备不合要求为由拒付。禾原准备起诉时，拿到了沐川正在注销主要收款账户并转移设备的材料，向青浦县法院申请诉前财产保全，并提供法院要求的担保。法院审查后采取了保全措施。禾原于采取措施后的第20日向该院起诉，请求支付30万元货款。\n\n沐川在答辩期间提出管辖异议，理由是自己住所地在新澄区；同一份盖章答辩状又明确写明“已收到禾原于5月6日交付的全部设备，但其中部分不合要求”。庭审时，沐川改称并未收货，要求禾原重新证明交付。禾原不同意其撤销原先的承认；沐川没有提出受胁迫、重大误解的证据，现有证据也未显示收货这一承认不真实。\n\n一审审理后判决沐川支付货款。沐川及时上诉。禾原此前只请求货款，到了二审才提出一项独立的逾期付款损失请求。二审法院依法调解未成；沐川明确不同意由二审一并审理这一新增请求。\n\n二审终结、货款判决生效后，案件进入执行。沐川认为执行法院冻结的金额超过执行依据所确定的数额；仓储公司则就被查封的一台设备提出书面异议，主张设备归自己所有，请求排除执行。货款判决没有判定这台设备的权属。执行法院分别审查后裁定驳回了两份异议，双方均不服。",
    prompt:
      "沐川仅以自己住所地在新澄区为由提出管辖异议，能否成立？请说明青浦县法院能否依合同约定管辖。",
    hint: "",
    reference:
      "异议不能成立，青浦县法院有管辖权。合同以书面方式选定了禾原住所地法院，禾原是本案原告，该地点与争议有实际联系。题设中法院级别适当，也没有专属管辖问题，这项约定有效。沐川的住所地在别处，不妨碍双方约定的法院受理。",
    criteria: [
      {
        id: "civpro-cross-sale-q1-1",
        label: "判断约定有效",
        meaning:
          "双方以书面方式选定原告禾原住所地法院，地点明确且与争议有实际联系；题设不存在级别或专属管辖障碍。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
      {
        id: "civpro-cross-sale-q1-2",
        label: "适用于本案的管辖结果",
        meaning:
          "青浦县法院可依有效约定管辖，仅以沐川住所地在新澄区不足以支持异议。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
    ],
    sources: ["civpro-cross-venue"],
  },
  {
    id: "civpro-cross-sale-q2",
    caseId: "civpro-cross-sale-case",
    relatedTopicIds: ["civpro-preservation-advance"],
    kind: "subjective",
    title: "第2问",
    facts:
      "本案为原创虚构案例。2026年4月，住所地在青浦县的禾原公司向住所地在新澄区的沐川公司出售一批包装设备，价款30万元。双方签署的书面合同约定，合同纠纷由禾原公司住所地法院处理；没有仲裁条款。两地名称均为虚构，双方均为境内公司，基层法院级别适当，本案不涉及专属管辖。禾原公司的住所地一直没有变更。\n\n5月6日货物运到沐川公司仓库。付款期限届满后，沐川以部分设备不合要求为由拒付。禾原准备起诉时，拿到了沐川正在注销主要收款账户并转移设备的材料，向青浦县法院申请诉前财产保全，并提供法院要求的担保。法院审查后采取了保全措施。禾原于采取措施后的第20日向该院起诉，请求支付30万元货款。\n\n沐川在答辩期间提出管辖异议，理由是自己住所地在新澄区；同一份盖章答辩状又明确写明“已收到禾原于5月6日交付的全部设备，但其中部分不合要求”。庭审时，沐川改称并未收货，要求禾原重新证明交付。禾原不同意其撤销原先的承认；沐川没有提出受胁迫、重大误解的证据，现有证据也未显示收货这一承认不真实。\n\n一审审理后判决沐川支付货款。沐川及时上诉。禾原此前只请求货款，到了二审才提出一项独立的逾期付款损失请求。二审法院依法调解未成；沐川明确不同意由二审一并审理这一新增请求。\n\n二审终结、货款判决生效后，案件进入执行。沐川认为执行法院冻结的金额超过执行依据所确定的数额；仓储公司则就被查封的一台设备提出书面异议，主张设备归自己所有，请求排除执行。货款判决没有判定这台设备的权属。执行法院分别审查后裁定驳回了两份异议，双方均不服。",
    prompt:
      "禾原在起诉前申请财产保全，需要满足哪些主要条件？它在法院采取措施后第20日起诉，是否满足保全后的起诉时间要求？",
    hint: "",
    reference:
      "本案有财产转移的紧迫风险，且禾原已按法院要求提供担保，可以在起诉前申请财产保全。诉前保全须因情况紧急，不立即申请会使合法权益受到难以弥补的损害，申请人还必须提供担保。采取措施后30日内应依法起诉或申请仲裁，禾原第20日起诉符合要求。逾期仍未起诉或申请仲裁，法院应解除保全。",
    criteria: [
      {
        id: "civpro-cross-sale-q2-1",
        label: "诉前保全的紧急性与担保",
        meaning:
          "结合账户注销、设备转移说明情况紧急、不立即保全可能造成难以弥补损害，并指出应提供担保。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
      {
        id: "civpro-cross-sale-q2-2",
        label: "保全后的起诉期限",
        meaning:
          "应在采取保全措施后30日内起诉或申请仲裁，第20日起诉符合要求；不能从申请日或收到通知之日起另算。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
    ],
    sources: ["civpro-cross-preservation"],
  },
  {
    id: "civpro-cross-sale-q3",
    caseId: "civpro-cross-sale-case",
    relatedTopicIds: ["civpro-proof-burden"],
    kind: "subjective",
    title: "第3问",
    facts:
      "本案为原创虚构案例。2026年4月，住所地在青浦县的禾原公司向住所地在新澄区的沐川公司出售一批包装设备，价款30万元。双方签署的书面合同约定，合同纠纷由禾原公司住所地法院处理；没有仲裁条款。两地名称均为虚构，双方均为境内公司，基层法院级别适当，本案不涉及专属管辖。禾原公司的住所地一直没有变更。\n\n5月6日货物运到沐川公司仓库。付款期限届满后，沐川以部分设备不合要求为由拒付。禾原准备起诉时，拿到了沐川正在注销主要收款账户并转移设备的材料，向青浦县法院申请诉前财产保全，并提供法院要求的担保。法院审查后采取了保全措施。禾原于采取措施后的第20日向该院起诉，请求支付30万元货款。\n\n沐川在答辩期间提出管辖异议，理由是自己住所地在新澄区；同一份盖章答辩状又明确写明“已收到禾原于5月6日交付的全部设备，但其中部分不合要求”。庭审时，沐川改称并未收货，要求禾原重新证明交付。禾原不同意其撤销原先的承认；沐川没有提出受胁迫、重大误解的证据，现有证据也未显示收货这一承认不真实。\n\n一审审理后判决沐川支付货款。沐川及时上诉。禾原此前只请求货款，到了二审才提出一项独立的逾期付款损失请求。二审法院依法调解未成；沐川明确不同意由二审一并审理这一新增请求。\n\n二审终结、货款判决生效后，案件进入执行。沐川认为执行法院冻结的金额超过执行依据所确定的数额；仓储公司则就被查封的一台设备提出书面异议，主张设备归自己所有，请求排除执行。货款判决没有判定这台设备的权属。执行法院分别审查后裁定驳回了两份异议，双方均不服。",
    prompt:
      "沐川后来改口，禾原是否就必须重新证明已经交付设备？请说明原答辩状中承认收货的效力，以及其与设备质量争议的关系。",
    hint: "",
    reference:
      "禾原不因沐川单方面改口，就必须重新证明收货事实。沐川在书面答辩中明确承认已收齐设备，这是对自己不利事实的自认，禾原对该事实免于举证。撤销自认需要对方同意，或者证明自认是在受胁迫、重大误解下作出，本案均不具备。承认收到设备只解决交付事实，并不等于承认设备质量合格；质量争议仍需另行审查。",
    criteria: [
      {
        id: "civpro-cross-sale-q3-1",
        label: "收货自认及改口的效力",
        meaning:
          "书面明确承认收货形成自认，禾原对收货事实免于举证；对方不同意，且没有受胁迫或重大误解等撤销依据，单方改口不使自认失效。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
      {
        id: "civpro-cross-sale-q3-2",
        label: "收货与质量分别判断",
        meaning:
          "收货自认不涵盖设备质量合格，质量抗辩须另行查明，不能因自认收货直接认定质量争议也败诉。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
    ],
    sources: ["civpro-cross-admission"],
  },
  {
    id: "civpro-cross-sale-q4",
    caseId: "civpro-cross-sale-case",
    relatedTopicIds: ["civpro-appeal-scope"],
    kind: "subjective",
    title: "第4问",
    facts:
      "本案为原创虚构案例。2026年4月，住所地在青浦县的禾原公司向住所地在新澄区的沐川公司出售一批包装设备，价款30万元。双方签署的书面合同约定，合同纠纷由禾原公司住所地法院处理；没有仲裁条款。两地名称均为虚构，双方均为境内公司，基层法院级别适当，本案不涉及专属管辖。禾原公司的住所地一直没有变更。\n\n5月6日货物运到沐川公司仓库。付款期限届满后，沐川以部分设备不合要求为由拒付。禾原准备起诉时，拿到了沐川正在注销主要收款账户并转移设备的材料，向青浦县法院申请诉前财产保全，并提供法院要求的担保。法院审查后采取了保全措施。禾原于采取措施后的第20日向该院起诉，请求支付30万元货款。\n\n沐川在答辩期间提出管辖异议，理由是自己住所地在新澄区；同一份盖章答辩状又明确写明“已收到禾原于5月6日交付的全部设备，但其中部分不合要求”。庭审时，沐川改称并未收货，要求禾原重新证明交付。禾原不同意其撤销原先的承认；沐川没有提出受胁迫、重大误解的证据，现有证据也未显示收货这一承认不真实。\n\n一审审理后判决沐川支付货款。沐川及时上诉。禾原此前只请求货款，到了二审才提出一项独立的逾期付款损失请求。二审法院依法调解未成；沐川明确不同意由二审一并审理这一新增请求。\n\n二审终结、货款判决生效后，案件进入执行。沐川认为执行法院冻结的金额超过执行依据所确定的数额；仓储公司则就被查封的一台设备提出书面异议，主张设备归自己所有，请求排除执行。货款判决没有判定这台设备的权属。执行法院分别审查后裁定驳回了两份异议，双方均不服。",
    prompt:
      "二审法院应如何处理禾原新提出的独立逾期付款损失请求？如果双方都同意由二审一并审理，处理方式有何不同？",
    hint: "",
    reference:
      "本案应告知禾原就新增请求另行起诉。原审原告在二审增加独立诉讼请求，可以先调解；本案调解未成，沐川也不同意一并审理，二审不能直接把新增请求作为原判内容来裁判。如果双方都同意由二审一并审理，二审法院可以一并裁判。",
    criteria: [
      {
        id: "civpro-cross-sale-q4-1",
        label: "本案新增请求另诉",
        meaning:
          "二审新增独立请求可调解，本案调解不成且对方不同意一并审理，应告知另行起诉。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
      {
        id: "civpro-cross-sale-q4-2",
        label: "双方同意时的例外",
        meaning:
          "双方均同意二审一并审理的，二审法院可以一并裁判，不要求必须另诉。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
    ],
    sources: ["civpro-cross-appeal"],
  },
  {
    id: "civpro-cross-sale-q5",
    caseId: "civpro-cross-sale-case",
    relatedTopicIds: ["civpro-execution-conduct", "civpro-execution-outsider"],
    kind: "subjective",
    title: "第5问",
    facts:
      "本案为原创虚构案例。2026年4月，住所地在青浦县的禾原公司向住所地在新澄区的沐川公司出售一批包装设备，价款30万元。双方签署的书面合同约定，合同纠纷由禾原公司住所地法院处理；没有仲裁条款。两地名称均为虚构，双方均为境内公司，基层法院级别适当，本案不涉及专属管辖。禾原公司的住所地一直没有变更。\n\n5月6日货物运到沐川公司仓库。付款期限届满后，沐川以部分设备不合要求为由拒付。禾原准备起诉时，拿到了沐川正在注销主要收款账户并转移设备的材料，向青浦县法院申请诉前财产保全，并提供法院要求的担保。法院审查后采取了保全措施。禾原于采取措施后的第20日向该院起诉，请求支付30万元货款。\n\n沐川在答辩期间提出管辖异议，理由是自己住所地在新澄区；同一份盖章答辩状又明确写明“已收到禾原于5月6日交付的全部设备，但其中部分不合要求”。庭审时，沐川改称并未收货，要求禾原重新证明交付。禾原不同意其撤销原先的承认；沐川没有提出受胁迫、重大误解的证据，现有证据也未显示收货这一承认不真实。\n\n一审审理后判决沐川支付货款。沐川及时上诉。禾原此前只请求货款，到了二审才提出一项独立的逾期付款损失请求。二审法院依法调解未成；沐川明确不同意由二审一并审理这一新增请求。\n\n二审终结、货款判决生效后，案件进入执行。沐川认为执行法院冻结的金额超过执行依据所确定的数额；仓储公司则就被查封的一台设备提出书面异议，主张设备归自己所有，请求排除执行。货款判决没有判定这台设备的权属。执行法院分别审查后裁定驳回了两份异议，双方均不服。",
    prompt:
      "沐川和仓储公司的异议分别针对什么？两者在收到驳回异议裁定后，应分别通过什么途径、在什么期限内继续救济？",
    hint: "",
    reference:
      "沐川质疑超额冻结，针对的是执行行为；收到驳回异议裁定后，可以在10日内向上一级法院申请复议。仓储公司主张设备属于自己、要求排除执行，属于案外人对执行标的提出的实体异议。原货款判决没有处理设备权属，仓储公司应在收到驳回裁定后15日内向执行法院提起案外人执行异议之诉。两类争议的对象不同，救济途径和期限也不同。",
    criteria: [
      {
        id: "civpro-cross-sale-q5-1",
        label: "执行行为异议后复议",
        meaning:
          "沐川针对超额冻结的执行行为，不服驳回裁定，应在送达之日起10日内向上一级法院申请复议。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
      {
        id: "civpro-cross-sale-q5-2",
        label: "案外人标的异议后起诉",
        meaning:
          "仓储公司主张设备所有权排除执行，与原货款判决无关，驳回后应在送达之日起15日内向执行法院提起案外人执行异议之诉。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
    ],
    sources: ["civpro-cross-execution", "civpro-cross-execution-court"],
  },
  {
    id: "civpro-cross-arbitration-q1",
    caseId: "civpro-cross-arbitration-case",
    relatedTopicIds: ["civpro-arbitration-agreement"],
    kind: "subjective",
    title: "第1问",
    facts:
      "本案为原创虚构案例。2026年4月，境内的岑海公司与榆港公司签订设备供货合同，书面约定由海沅仲裁委员会解决合同争议。海沅仲裁委员会为题设中依法设立、选定明确的仲裁机构，所在地为澄州市。双方没有另行约定仲裁地，合同签订、履行和本案仲裁均在境内，没有涉外因素。\n\n供货后发生价款争议，岑海向该委员会申请仲裁，请求榆港支付50万元。榆港主张供货合同无效，所以仲裁条款也当然无效，并在首次开庭前向有管辖权的法院申请确认仲裁协议无效。岑海则请求仲裁机构确认协议有效；机构和仲裁庭尚未作出效力决定，法院已经依法受理榆港的申请。有关申请处理后，仲裁程序继续进行。\n\n仲裁期间，记录交货情况的仓储服务器将被更换，原始记录有灭失风险，证据位于禾岚县。岑海向仲裁机构提交了证据保全申请。\n\n开庭前，榆港书面确认其中20万元货款已经到期且无争议，双方也已就这部分完成举证质证；其余30万元仍涉及设备质量鉴定，不能同时查清。榆港经书面通知，没有正当理由而缺席庭审。岑海按时出席，请求先处理已经查清的20万元。\n\n仲裁庭后来分别处理了上述请求，最后一份裁决于2026年8月10日送达榆港。榆港未履行最后一份裁决，岑海就这一份裁决向法院申请执行。9月20日，榆港以法定撤销事由向澄州市中级法院申请撤销这一份裁决，中级法院依法受理，执行法院也已获知。中级法院最终裁定驳回该撤销申请。",
    prompt:
      "榆港所说“合同无效，仲裁条款也当然无效”是否成立？本案的仲裁协议效力应由谁先作判断，榆港提出异议的时间是否适当？",
    hint: "",
    reference:
      "不成立。仲裁协议独立存在，供货合同被认定无效，也不当然使仲裁条款无效，条款自身的效力应单独审查。本案一方向法院申请、一方向仲裁机构申请，且机构、仲裁庭尚未作出决定、法院已受理，应由法院作出裁定。榆港在首次开庭前提出效力异议，符合本案开庭审理的提出时间要求。",
    criteria: [
      {
        id: "civpro-cross-arbitration-q1-1",
        label: "仲裁条款独立判断",
        meaning: "合同无效不当然导致仲裁协议无效，仲裁协议自身的效力单独审查。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
      {
        id: "civpro-cross-arbitration-q1-2",
        label: "本案异议的主体与时间",
        meaning:
          "在题设机构及仲裁庭未作决定、法院已受理的并行申请中由法院裁定；首次开庭前提出符合要求。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
    ],
    sources: ["civpro-cross-arb-agreement"],
  },
  {
    id: "civpro-cross-arbitration-q2",
    caseId: "civpro-cross-arbitration-case",
    relatedTopicIds: ["civpro-arbitration-tribunal-preservation"],
    kind: "subjective",
    title: "第2问",
    facts:
      "本案为原创虚构案例。2026年4月，境内的岑海公司与榆港公司签订设备供货合同，书面约定由海沅仲裁委员会解决合同争议。海沅仲裁委员会为题设中依法设立、选定明确的仲裁机构，所在地为澄州市。双方没有另行约定仲裁地，合同签订、履行和本案仲裁均在境内，没有涉外因素。\n\n供货后发生价款争议，岑海向该委员会申请仲裁，请求榆港支付50万元。榆港主张供货合同无效，所以仲裁条款也当然无效，并在首次开庭前向有管辖权的法院申请确认仲裁协议无效。岑海则请求仲裁机构确认协议有效；机构和仲裁庭尚未作出效力决定，法院已经依法受理榆港的申请。有关申请处理后，仲裁程序继续进行。\n\n仲裁期间，记录交货情况的仓储服务器将被更换，原始记录有灭失风险，证据位于禾岚县。岑海向仲裁机构提交了证据保全申请。\n\n开庭前，榆港书面确认其中20万元货款已经到期且无争议，双方也已就这部分完成举证质证；其余30万元仍涉及设备质量鉴定，不能同时查清。榆港经书面通知，没有正当理由而缺席庭审。岑海按时出席，请求先处理已经查清的20万元。\n\n仲裁庭后来分别处理了上述请求，最后一份裁决于2026年8月10日送达榆港。榆港未履行最后一份裁决，岑海就这一份裁决向法院申请执行。9月20日，榆港以法定撤销事由向澄州市中级法院申请撤销这一份裁决，中级法院依法受理，执行法院也已获知。中级法院最终裁定驳回该撤销申请。",
    prompt:
      "岑海向仲裁机构提出证据保全后，应由谁把申请交给哪一级、哪个地点的法院？仲裁庭能否自行强制查扣服务器？",
    hint: "",
    reference:
      "应由仲裁机构将申请提交禾岚县的基层法院，由法院决定并实施保全。原始记录面临灭失风险，适合申请证据保全；本案属于国内仲裁，法定接收法院是证据所在地基层法院。仲裁庭不能自行以强制查扣服务器的方式实施司法保全。",
    criteria: [
      {
        id: "civpro-cross-arbitration-q2-1",
        label: "证据风险和法院连接点",
        meaning:
          "原始记录有灭失风险，可申请证据保全，本案提交证据所在地禾岚县的基层法院。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
      {
        id: "civpro-cross-arbitration-q2-2",
        label: "机构移送与法院实施",
        meaning:
          "仲裁机构负责提交申请，保全由法院依法决定实施，不能由仲裁庭自行强制查扣。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
    ],
    sources: ["civpro-cross-arb-evidence"],
  },
  {
    id: "civpro-cross-arbitration-q3",
    caseId: "civpro-cross-arbitration-case",
    relatedTopicIds: ["civpro-arbitration-hearing-resolution"],
    kind: "subjective",
    title: "第3问",
    facts:
      "本案为原创虚构案例。2026年4月，境内的岑海公司与榆港公司签订设备供货合同，书面约定由海沅仲裁委员会解决合同争议。海沅仲裁委员会为题设中依法设立、选定明确的仲裁机构，所在地为澄州市。双方没有另行约定仲裁地，合同签订、履行和本案仲裁均在境内，没有涉外因素。\n\n供货后发生价款争议，岑海向该委员会申请仲裁，请求榆港支付50万元。榆港主张供货合同无效，所以仲裁条款也当然无效，并在首次开庭前向有管辖权的法院申请确认仲裁协议无效。岑海则请求仲裁机构确认协议有效；机构和仲裁庭尚未作出效力决定，法院已经依法受理榆港的申请。有关申请处理后，仲裁程序继续进行。\n\n仲裁期间，记录交货情况的仓储服务器将被更换，原始记录有灭失风险，证据位于禾岚县。岑海向仲裁机构提交了证据保全申请。\n\n开庭前，榆港书面确认其中20万元货款已经到期且无争议，双方也已就这部分完成举证质证；其余30万元仍涉及设备质量鉴定，不能同时查清。榆港经书面通知，没有正当理由而缺席庭审。岑海按时出席，请求先处理已经查清的20万元。\n\n仲裁庭后来分别处理了上述请求，最后一份裁决于2026年8月10日送达榆港。榆港未履行最后一份裁决，岑海就这一份裁决向法院申请执行。9月20日，榆港以法定撤销事由向澄州市中级法院申请撤销这一份裁决，中级法院依法受理，执行法院也已获知。中级法院最终裁定驳回该撤销申请。",
    prompt:
      "仲裁庭能否先裁决已查清的20万元货款？该裁决何时生效，是否必须等另外30万元也处理完？",
    hint: "",
    reference:
      "可以先裁决20万元。该部分事实已查清并完成举证质证，仲裁庭可以先行裁决，质量鉴定未完成的30万元继续审理。先行裁决自作出之日起生效，不必等待其余争议全部结束。",
    criteria: [
      {
        id: "civpro-cross-arbitration-q3-1",
        label: "部分事实清楚可以先行裁决",
        meaning:
          "20万元部分事实已清楚，可以先行裁决；余下30万元另行继续审理，不把全案未查清作为一律禁止理由。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
      {
        id: "civpro-cross-arbitration-q3-2",
        label: "先行裁决生效时间",
        meaning: "先行裁决作出即生效，无需等待剩余30万元的最终裁决。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
    ],
    sources: ["civpro-cross-arb-partial"],
  },
  {
    id: "civpro-cross-arbitration-q4",
    caseId: "civpro-cross-arbitration-case",
    relatedTopicIds: ["civpro-arbitration-hearing-resolution"],
    kind: "subjective",
    title: "第4问",
    facts:
      "本案为原创虚构案例。2026年4月，境内的岑海公司与榆港公司签订设备供货合同，书面约定由海沅仲裁委员会解决合同争议。海沅仲裁委员会为题设中依法设立、选定明确的仲裁机构，所在地为澄州市。双方没有另行约定仲裁地，合同签订、履行和本案仲裁均在境内，没有涉外因素。\n\n供货后发生价款争议，岑海向该委员会申请仲裁，请求榆港支付50万元。榆港主张供货合同无效，所以仲裁条款也当然无效，并在首次开庭前向有管辖权的法院申请确认仲裁协议无效。岑海则请求仲裁机构确认协议有效；机构和仲裁庭尚未作出效力决定，法院已经依法受理榆港的申请。有关申请处理后，仲裁程序继续进行。\n\n仲裁期间，记录交货情况的仓储服务器将被更换，原始记录有灭失风险，证据位于禾岚县。岑海向仲裁机构提交了证据保全申请。\n\n开庭前，榆港书面确认其中20万元货款已经到期且无争议，双方也已就这部分完成举证质证；其余30万元仍涉及设备质量鉴定，不能同时查清。榆港经书面通知，没有正当理由而缺席庭审。岑海按时出席，请求先处理已经查清的20万元。\n\n仲裁庭后来分别处理了上述请求，最后一份裁决于2026年8月10日送达榆港。榆港未履行最后一份裁决，岑海就这一份裁决向法院申请执行。9月20日，榆港以法定撤销事由向澄州市中级法院申请撤销这一份裁决，中级法院依法受理，执行法院也已获知。中级法院最终裁定驳回该撤销申请。",
    prompt:
      "对榆港本次缺席，仲裁庭可以如何处理，是否因此必须支持岑海全部请求？如果经书面通知、无正当理由缺席的改为申请人岑海，处理有何不同？",
    hint: "",
    reference:
      "榆港是被申请人，经书面通知、无正当理由未到庭，仲裁庭可以缺席裁决，但仍须审查岑海的请求和证据，不会仅凭缺席就支持全部请求。如果这样缺席的是申请人岑海，可以视为撤回仲裁申请。申请人与被申请人的缺席后果不同。",
    criteria: [
      {
        id: "civpro-cross-arbitration-q4-1",
        label: "被申请人缺席不等于自动败诉",
        meaning:
          "榆港经书面通知、无正当理由缺席，可作缺席裁决，仍须审查请求及证据，不当然支持申请人全部请求。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
      {
        id: "civpro-cross-arbitration-q4-2",
        label: "申请人缺席可按撤回处理",
        meaning: "若相同缺席情形发生在申请人岑海，可视为撤回仲裁申请。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
    ],
    sources: ["civpro-cross-arb-absence"],
  },
  {
    id: "civpro-cross-arbitration-q5",
    caseId: "civpro-cross-arbitration-case",
    relatedTopicIds: ["civpro-arbitration-judicial-review"],
    kind: "subjective",
    title: "第5问",
    facts:
      "本案为原创虚构案例。2026年4月，境内的岑海公司与榆港公司签订设备供货合同，书面约定由海沅仲裁委员会解决合同争议。海沅仲裁委员会为题设中依法设立、选定明确的仲裁机构，所在地为澄州市。双方没有另行约定仲裁地，合同签订、履行和本案仲裁均在境内，没有涉外因素。\n\n供货后发生价款争议，岑海向该委员会申请仲裁，请求榆港支付50万元。榆港主张供货合同无效，所以仲裁条款也当然无效，并在首次开庭前向有管辖权的法院申请确认仲裁协议无效。岑海则请求仲裁机构确认协议有效；机构和仲裁庭尚未作出效力决定，法院已经依法受理榆港的申请。有关申请处理后，仲裁程序继续进行。\n\n仲裁期间，记录交货情况的仓储服务器将被更换，原始记录有灭失风险，证据位于禾岚县。岑海向仲裁机构提交了证据保全申请。\n\n开庭前，榆港书面确认其中20万元货款已经到期且无争议，双方也已就这部分完成举证质证；其余30万元仍涉及设备质量鉴定，不能同时查清。榆港经书面通知，没有正当理由而缺席庭审。岑海按时出席，请求先处理已经查清的20万元。\n\n仲裁庭后来分别处理了上述请求，最后一份裁决于2026年8月10日送达榆港。榆港未履行最后一份裁决，岑海就这一份裁决向法院申请执行。9月20日，榆港以法定撤销事由向澄州市中级法院申请撤销这一份裁决，中级法院依法受理，执行法院也已获知。中级法院最终裁定驳回该撤销申请。",
    prompt:
      "榆港9月20日申请撤销8月10日收到的裁决，是否在法定期间内、法院是否选对？该撤销申请提出后及最终被驳回后，执行程序分别如何处理？",
    hint: "",
    reference:
      "申请未超期，向澄州市中级法院提出也正确。现行仲裁法规定，自收到裁决之日起3个月内，可以向仲裁机构所在地的中级法院申请撤销；本案8月10日收到、9月20日申请，仍在期间内。岑海申请执行，榆港申请撤销时，执行法院应裁定中止对这份裁决的执行。撤销申请被驳回后，恢复执行；提出申请本身并不等于裁决已经被撤销。",
    criteria: [
      {
        id: "civpro-cross-arbitration-q5-1",
        label: "撤销期间和法院",
        meaning:
          "收到裁决之日起3个月内向仲裁机构所在地中院申请，本案9月20日未超期，澄州市中院正确。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
      {
        id: "civpro-cross-arbitration-q5-2",
        label: "撤销申请与执行衔接",
        meaning:
          "针对最后一份裁决，一方申请执行、另一方申请撤销时中止执行；撤销申请被驳回后恢复执行。",
        acceptable:
          "意思清楚并说明本案适用理由即可；可合写，不以术语、原句或排列顺序作为判断条件。",
        boundary:
          "认可等义表达；规则须联系本问事实，不要求固定句式或法条编号。",
      },
    ],
    sources: ["civpro-cross-arb-remedies"],
  },
];
const cases = [
  {
    id: "civpro-cross-sale-case",
    key: "sale-lawsuit",
    title: "一笔货款的诉讼经过",
    facts:
      "本案为原创虚构案例。2026年4月，住所地在青浦县的禾原公司向住所地在新澄区的沐川公司出售一批包装设备，价款30万元。双方签署的书面合同约定，合同纠纷由禾原公司住所地法院处理；没有仲裁条款。两地名称均为虚构，双方均为境内公司，基层法院级别适当，本案不涉及专属管辖。禾原公司的住所地一直没有变更。\n\n5月6日货物运到沐川公司仓库。付款期限届满后，沐川以部分设备不合要求为由拒付。禾原准备起诉时，拿到了沐川正在注销主要收款账户并转移设备的材料，向青浦县法院申请诉前财产保全，并提供法院要求的担保。法院审查后采取了保全措施。禾原于采取措施后的第20日向该院起诉，请求支付30万元货款。\n\n沐川在答辩期间提出管辖异议，理由是自己住所地在新澄区；同一份盖章答辩状又明确写明“已收到禾原于5月6日交付的全部设备，但其中部分不合要求”。庭审时，沐川改称并未收货，要求禾原重新证明交付。禾原不同意其撤销原先的承认；沐川没有提出受胁迫、重大误解的证据，现有证据也未显示收货这一承认不真实。\n\n一审审理后判决沐川支付货款。沐川及时上诉。禾原此前只请求货款，到了二审才提出一项独立的逾期付款损失请求。二审法院依法调解未成；沐川明确不同意由二审一并审理这一新增请求。\n\n二审终结、货款判决生效后，案件进入执行。沐川认为执行法院冻结的金额超过执行依据所确定的数额；仓储公司则就被查封的一台设备提出书面异议，主张设备归自己所有，请求排除执行。货款判决没有判定这台设备的权属。执行法院分别审查后裁定驳回了两份异议，双方均不服。",
    questionIds: [
      "civpro-cross-sale-q1",
      "civpro-cross-sale-q2",
      "civpro-cross-sale-q3",
      "civpro-cross-sale-q4",
      "civpro-cross-sale-q5",
    ],
    chapter: {
      id: "CIVPRO-CROSS-SALE",
      title: "一笔货款的诉讼经过",
      section: "民事诉讼法",
      topicIds: [
        "civpro-jurisdiction-agreement",
        "civpro-preservation-advance",
        "civpro-proof-burden",
        "civpro-appeal-scope",
        "civpro-execution-conduct",
        "civpro-execution-outsider",
      ],
    },
  },
  {
    id: "civpro-cross-arbitration-case",
    key: "arbitration-remedies",
    title: "供货争议进入仲裁之后",
    facts:
      "本案为原创虚构案例。2026年4月，境内的岑海公司与榆港公司签订设备供货合同，书面约定由海沅仲裁委员会解决合同争议。海沅仲裁委员会为题设中依法设立、选定明确的仲裁机构，所在地为澄州市。双方没有另行约定仲裁地，合同签订、履行和本案仲裁均在境内，没有涉外因素。\n\n供货后发生价款争议，岑海向该委员会申请仲裁，请求榆港支付50万元。榆港主张供货合同无效，所以仲裁条款也当然无效，并在首次开庭前向有管辖权的法院申请确认仲裁协议无效。岑海则请求仲裁机构确认协议有效；机构和仲裁庭尚未作出效力决定，法院已经依法受理榆港的申请。有关申请处理后，仲裁程序继续进行。\n\n仲裁期间，记录交货情况的仓储服务器将被更换，原始记录有灭失风险，证据位于禾岚县。岑海向仲裁机构提交了证据保全申请。\n\n开庭前，榆港书面确认其中20万元货款已经到期且无争议，双方也已就这部分完成举证质证；其余30万元仍涉及设备质量鉴定，不能同时查清。榆港经书面通知，没有正当理由而缺席庭审。岑海按时出席，请求先处理已经查清的20万元。\n\n仲裁庭后来分别处理了上述请求，最后一份裁决于2026年8月10日送达榆港。榆港未履行最后一份裁决，岑海就这一份裁决向法院申请执行。9月20日，榆港以法定撤销事由向澄州市中级法院申请撤销这一份裁决，中级法院依法受理，执行法院也已获知。中级法院最终裁定驳回该撤销申请。",
    questionIds: [
      "civpro-cross-arbitration-q1",
      "civpro-cross-arbitration-q2",
      "civpro-cross-arbitration-q3",
      "civpro-cross-arbitration-q4",
      "civpro-cross-arbitration-q5",
    ],
    chapter: {
      id: "CIVPRO-CROSS-ARBITRATION",
      title: "供货争议进入仲裁之后",
      section: "民事诉讼法",
      topicIds: [
        "civpro-arbitration-agreement",
        "civpro-arbitration-tribunal-preservation",
        "civpro-arbitration-hearing-resolution",
        "civpro-arbitration-judicial-review",
      ],
    },
  },
];
export const civilProcedureCrossChapterCases = cases.map((item) => ({
  ...item,
  questions: civilProcedureCrossChapterQuestions.filter(
    (q) => q.caseId === item.id,
  ),
}));
export const civilProcedureCrossChapterQuestion = (id: string) => {
  const q = civilProcedureCrossChapterQuestions.find((q) => q.id === id);
  return q ? structuredClone(q) : undefined;
};
export const civilProcedureCrossChapterCaseForQuestion = (id: string) =>
  civilProcedureCrossChapterCases.find((c) => c.questionIds.includes(id));
export const civilProcedureCrossChapterContentPack = {
  revision: civilProcedureCrossChapterRevision,
  snapshot: {
    topics: [
      ...civilProcedureFoundationsTopics,
      ...civilProcedureFirstInstanceTopics,
      ...civilProcedureRemediesSpecialTopics,
      ...civilProcedureExecutionTopics,
      ...civilProcedureArbitrationTopics,
      ...civilProcedureProofBurdenTopics,
    ]
      .filter((t) =>
        civilProcedureCrossChapterQuestions.some(
          (q) => q.relatedTopicIds?.[0] === t.id,
        ),
      )
      .map((t) => ({
        ...t,
        exercises: civilProcedureCrossChapterQuestions.filter(
          (q) => q.relatedTopicIds?.[0] === t.id,
        ),
      })),
    sources: {
      ...civilProcedureFoundationsSources,
      ...civilProcedureFirstInstanceSources,
      ...civilProcedureRemediesSpecialSources,
      ...civilProcedureExecutionSources,
      ...civilProcedureArbitrationSources,
      ...civilProcedureProofBurdenSources,
      ...civilProcedureCrossChapterSources,
    },
  },
};
