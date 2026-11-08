import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

// Sixteen original fictional cases, paired as choice and full written forms.
export const civilProcedureFirstInstanceRevision =
  "civil-procedure-first-instance-2026-10-29.v1";
export const civilProcedureFirstInstanceSources: ContentSources = {
  "civpro-first-instance-period-post-basis": {
    title: "《民事诉讼法》第85条第4款；《民事诉讼法》第171条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。上诉状在法定期间届满前交邮，邮路耗时不计入期间；不能只因法院收到时已过期即认定逾期。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-period-extension-basis": {
    title: "《民事诉讼法》第86条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。实际受洪灾等不可抗拒事由阻断而耽误期限的，可在障碍消除后十日内申请顺延；准否由法院决定，不自动顺延。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-service-household-basis": {
    title: "《民事诉讼法》第88条第1款相关节录及第2款；《民诉法解释》第133条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。本人不在时，可将传票交给同住成年家属签收；其在送达回证签收之日为送达日。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-service-electronic-basis": {
    title: "《民事诉讼法》第90条；《民诉法解释》第136条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。经同意且能确认收悉，可电子送达判决书；受送达人要求纸质判决，法院应当提供。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-preservation-pretrial-basis": {
    title: "《民事诉讼法》第104条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。情况紧急且不立即保全会造成难以弥补损害，可向法定法院申请诉前财产保全；申请人应提供担保。 法院接受后须48小时内裁定，采取措施后30日内不依法起诉或申请仲裁应解除。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-advance-execution-basis": {
    title:
      "《民事诉讼法》第109条引句及第1项；《民事诉讼法》第110条；《民诉法解释》第169条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。追索赡养费的案件已受理，申请人急需生活费，权利义务明确且被申请人有能力履行，可依申请先予执行，不必等终审判决。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-filing-repeat-basis": {
    title: "《民诉法解释》第247条；《民诉法解释》第248条",
    url: "https://www.quanzhou.gov.cn/zfb/xxgk/zfxxgkzl/fgwj/sfjs/202304/t20230412_2868534.htm",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。同一当事人对同一诉讼标的、相同请求原样再诉，前案已有生效实体裁判且无新事实，属于重复起诉；未受理时裁定不予受理，已受理时驳回起诉。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-filing-corrected-basis": {
    title:
      "《民事诉讼法》第122条；《民诉法解释》第209条；《民诉法解释》第212条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。此前仅因被告不明确不予受理，现已补正且满足起诉条件、无第127条障碍，应予受理；前裁定不是实体败诉。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-withdrawal-counterclaim-basis": {
    title: "《民事诉讼法》第148条第1款；《民诉法解释》第239条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。原告申请撤诉并不自动结束本诉，须法院裁定是否准许。 即便本诉获准撤诉，对已经合法受理且未撤回的反诉仍应继续审理。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-default-defendant-basis": {
    title: "《民事诉讼法》第147条；《民诉法解释》第241条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。被告经合法传票传唤无正当理由不到庭，可以依法缺席判决。 法院仍须审理双方诉辩和已交证据，原告不因被告缺席自动胜诉。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-mediation-repent-basis": {
    title:
      "《民事诉讼法》第100条第3款；《民事诉讼法》第101条；《民事诉讼法》第102条；《民诉法解释》第149条；《民诉法解释》第151条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。普通延期给付纠纷的调解书须双方签收才生效；送达签收前一方反悔，法院应继续审理并及时判决。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-settlement-nonperformance-basis": {
    title: "《民事诉讼法》第247条；《民诉法解释》第214条第1款",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。仅有双方自行和解协议及准许撤诉裁定，不能将私协议直接作为给付义务的强制执行依据。 协议未履行时可以依法起诉；不限定为只能以和解协议起诉。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-simple-conversion-basis": {
    title: "《民事诉讼法》第170条；《民诉法解释》第258条第2、3款",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。简易审理中发现案件已复杂到不宜简易，应在审理期限届满前裁定转为普通程序。 转为普通程序后审限仍从原立案之日计算，不从转换当天重新起算。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-small-final-basis": {
    title:
      "《民事诉讼法》第165条第1款；《民事诉讼法》第166条；《民诉法解释》第272条",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。基层法院审理符合条件、低于法定金额门槛的简单金钱给付案，依法适用小额诉讼并一审终审，不能按普通一审判决再上诉。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-judgment-appeal-term-basis": {
    title:
      "《民事诉讼法》第171条；《民事诉讼法》第157条第1款引句及第1至4项、第2款",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。国内普通地方一审判决上诉期15日；依法可上诉的一审裁定为10日，均以送达为准，不从宣判或知悉案情起算。 原创教学案例，人物与金额为虚构，不是官方试题。",
  },
  "civpro-first-instance-preservation-reconsideration-basis": {
    title:
      "《民事诉讼法》第111条；《民诉法解释》第171条第1句；《民事诉讼法》第157条第1款引句及第1至4项、第2款",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-29核对2023年修正民事诉讼法及2022年民诉法解释。对财产保全裁定不服，应向作出裁定的法院申请复议一次，不是上诉；复议期间不停止执行。 原创教学案例，人物与金额为虚构，不是官方试题。",
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
    id: "civpro-first-instance-period-post",
    topicId: "civpro-periods",
    title: "上诉状寄出后晚到了几天",
    facts:
      "沈禾不服普通程序一审判决。双方对依法计算的上诉期限最后一日没有争议，均为9月18日。沈禾9月17日将上诉状交邮寄往原审法院，地址正确，留有当天的寄件凭证。法院9月21日收到。对方认为法院收到时期限已过，上诉已经来不及了。",
    prompt:
      "这份上诉状是否因9月21日才送到法院而逾期？应根据哪一个时间事实判断？",
    reference:
      "这份上诉没有逾期。沈禾在9月17日已经交邮，早于9月18日期满。诉讼期间不包括在途时间，期满前交邮的诉讼文书不算过期，应核对交邮日期，不能只看法院收件日期。",
    answer: "b",
    options: [
      {
        text: "只要法院收到时超过期限，上诉就一律逾期。",
        explanation: "期满前交邮的文书，不因在途时间变成逾期。",
      },
      {
        text: "9月17日已在期满前交邮，不因9月21日才收到而逾期。",
        explanation: "关键是期满前交邮，在途时间不计入。",
      },
      {
        text: "必须由对方同意，才能把交邮日当作提交时间。",
        explanation: "这是法定期间规则，不取决于对方同意。",
      },
      {
        text: "只要寄过上诉状，不论哪一天寄出，都不会逾期。",
        explanation: "交邮须发生在期满前，不能抹去这一条件。",
      },
    ],
    points: [
      {
        label: "本次上诉没有逾期",
        meaning: "说明本次不因9月21日收到而逾期。",
        boundary: "不要求另算15日；题设已经确定期满日。",
      },
      {
        label: "以期满前交邮为依据",
        meaning:
          "联系9月17日交邮早于9月18日期满，说明在途时间不计入，不能只按法院收到日期判断。",
        boundary: "不要求固定术语；不能把所有迟寄文书都算作及时。",
      },
    ],
    sources: ["civpro-first-instance-period-post-basis"],
  },
  {
    id: "civpro-first-instance-period-extension",
    topicId: "civpro-periods",
    title: "洪灾中耽误了提交期限",
    facts:
      "赵宁所在区域遭遇突发洪灾，通信和交通中断，无法按期提交法院要求的材料。障碍消除后的第8日，他带着相关证明向法院申请顺延期限。对方认为，只要期限已经过去，无论遇到什么情况都不能再申请。",
    prompt: "赵宁还能申请顺延期限吗？提出申请后，期限是否自动顺延？",
    reference:
      "可以申请。洪灾造成无法按期提交，属于可以说明的耽误理由；赵宁又在障碍消除后的第8日提出，仍在法定10日内。但提出申请不等于已经获准，是否顺延要由法院审查决定。",
    answer: "d",
    options: [
      {
        text: "所有期限一旦过去，都不能再申请顺延。",
        explanation: "法律为不可抗拒事由等正当理由保留申请机会。",
      },
      {
        text: "洪灾发生后，期限自动延长，不必申请。",
        explanation: "仍须在法定时间内申请，由法院决定。",
      },
      {
        text: "是否顺延完全由对方当事人决定。",
        explanation: "批准权属于法院。",
      },
      {
        text: "可在障碍消除后的10日内申请，是否准许由法院决定。",
        explanation: "第8日提出尚在申请期限内，获准与否仍需审查。",
      },
    ],
    points: [
      {
        label: "具备及时申请的条件",
        meaning:
          "联系洪灾造成的实际障碍及消除后第8日，说明可在消除后10日内申请顺延。",
        boundary: "不要求背条号，不接受把10日从洪灾发生日计算。",
      },
      {
        label: "须由法院决定",
        meaning: "说明申请不自动延长期限，是否准许由法院审查决定。",
        boundary: "不能把对方同意或申请人声明当成法院决定。",
      },
    ],
    sources: ["civpro-first-instance-period-extension-basis"],
  },
  {
    id: "civpro-first-instance-service-household",
    topicId: "civpro-service",
    title: "本人不在家时谁可以签收",
    facts:
      "法院向被告林安送达开庭传票。林安当天外出，和他长期同住的28岁姐姐在住所接收，核对文书后在送达回证上签名并写明5月8日。林安5月11日才回家看到传票，认为必须由自己签字，5月8日不能算送达。",
    prompt: "姐姐的签收是否有效？本案以哪一天作为送达日期？",
    reference:
      "姐姐可以代为签收，她是林安的同住成年家属，林安本人当时不在。送达日期是姐姐在送达回证上签收的5月8日，不是林安回家看到传票的5月11日。",
    answer: "a",
    options: [
      {
        text: "签收有效，以姐姐在送达回证上签收的5月8日为送达日。",
        explanation: "本人不在时，同住成年家属可依法签收。",
      },
      {
        text: "凡是亲属都可以签收，即使未成年或并不同住。",
        explanation: "法定条件是同住成年家属，不能扩大到所有亲属。",
      },
      {
        text: "签收无效，任何诉讼文书都只能由本人接收。",
        explanation: "法律允许符合条件的代收。",
      },
      {
        text: "签收有效，但必须以林安实际看到文书的5月11日计算。",
        explanation: "依法代收时，以代收人在回证上签收日期为准。",
      },
    ],
    points: [
      {
        label: "同住成年家属可签收",
        meaning: "联系本人外出、姐姐成年且长期同住，说明签收有效。",
        boundary: "不是一般亲属关系就足够，也不需要另行取得特别诉讼授权。",
      },
      {
        label: "签收日就是送达日",
        meaning: "指出5月8日为送达日期，而非本人5月11日实际阅读之日。",
        boundary: "认可直接说以姐姐回证签收日为准，不强求再重复日期。",
      },
    ],
    sources: ["civpro-first-instance-service-household-basis"],
  },
  {
    id: "civpro-first-instance-service-electronic",
    topicId: "civpro-service",
    title: "电子判决书后还能要纸质版吗",
    facts:
      "普通民事案件中，陆遥在送达地址确认书中明确同意法院通过指定诉讼平台账户送达文书，包括判决书。判决电子文书已发送到该账户，系统能确认其收悉，陆遥也打开阅读。随后他提出需要纸质判决书，工作人员称既然同意电子送达，就不能再要纸质版。",
    prompt:
      "这种电子方式能否用于送达判决书？陆遥提出纸质需求后，法院应怎样处理？",
    reference:
      "可以电子送达。陆遥已经同意，所用平台也能够确认收悉，判决书不属于一律禁止电子送达的文书。陆遥提出需要纸质判决书时，法院应当提供，不能用他先前同意电子送达来拒绝。",
    answer: "c",
    options: [
      {
        text: "判决书永远不能电子送达，陆遥同意也没有用。",
        explanation: "现行法允许符合条件的电子送达判决书。",
      },
      {
        text: "电子送达可以，但同意后就丧失索要纸质文书的权利。",
        explanation: "受送达人提出纸质需求时，法院应提供。",
      },
      {
        text: "可以电子送达，提出需要纸质判决书的，法院应当提供。",
        explanation: "电子送达条件和纸质文书需求分别处理。",
      },
      {
        text: "法院可以不经任何同意直接电子送达全部文书。",
        explanation: "本题适用的电子送达以受送达人同意等条件为前提。",
      },
    ],
    points: [
      {
        label: "电子方式可送达判决",
        meaning: "联系明确同意及能够确认收悉，说明本次电子送达判决书可以。",
        boundary: "不沿用判决书一律不能电子送达的旧口径。",
      },
      {
        label: "按需提供纸质文书",
        meaning: "说明陆遥提出需要纸质判决书后，法院应当提供。",
        boundary: "不是必须撤销已完成的电子送达，也不是由对方当事人批准。",
      },
    ],
    sources: ["civpro-first-instance-service-electronic-basis"],
  },
  {
    id: "civpro-first-instance-preservation-pretrial",
    topicId: "civpro-preservation-advance",
    title: "起诉前发现对方正在转走财产",
    facts:
      "一笔货款已到期，商家获悉债务公司正在将仅剩的可供清偿财产转至关联公司；若等起诉后再处理，追偿可能受到难以弥补的损害。商家尚未起诉，准备向有权法院申请冻结与请求相当的财产，并能提供担保。有人建议他先冻结，之后一直不诉讼也不仲裁，等对方付款即可。",
    prompt:
      "商家能否在起诉前申请财产保全，担保有什么要求？采取措施后一直不诉讼、不仲裁，能否继续保全？",
    reference:
      "可以申请诉前财产保全。财产正在被转走，情况紧急，不立即保全可能造成难以弥补的损害；申请人应提供担保。法院采取保全措施后，申请人须在30日内依法起诉或申请仲裁，否则法院应解除保全，不能靠冻结无限期搁着纠纷。",
    answer: "b",
    options: [
      {
        text: "任何财产保全都必须先起诉，紧急转移财产也不例外。",
        explanation: "法律允许符合条件的紧急诉前财产保全。",
      },
      {
        text: "符合紧急条件可诉前申请并提供担保，采取措施后须在30日内依法起诉或申请仲裁，否则应解除。",
        explanation: "诉前保全既有紧急和担保条件，也有后续启动程序的期限。",
      },
      {
        text: "能否提供担保完全无关，诉前申请不需要担保。",
        explanation: "诉前财产保全的申请人应当提供担保。",
      },
      {
        text: "只要法院已经冻结，就可以永远不诉讼也不仲裁。",
        explanation: "30日内不依法启动相应程序，应当解除。",
      },
    ],
    points: [
      {
        label: "诉前申请与担保",
        meaning:
          "联系紧急转移财产及难以弥补的损害，说明可在起诉前申请，申请人应提供担保。",
        boundary: "只考财产保全，不混入上一包证据保全；不要求背全管辖入口。",
      },
      {
        label: "30日内启动程序",
        meaning:
          "说明法院采取措施后30日内须依法起诉或申请仲裁，否则应解除保全。",
        boundary: "不把30日从获悉风险之日计算；不要求必须同时起诉和仲裁。",
      },
    ],
    sources: ["civpro-first-instance-preservation-pretrial-basis"],
  },
  {
    id: "civpro-first-instance-advance-execution",
    topicId: "civpro-preservation-advance",
    title: "生活费能否等不到判决先支付",
    facts:
      "周老太起诉儿子要求给付赡养费，案件已经受理。儿子承认赡养义务及约定的月付数额，也有稳定收入和足够存款，却一直未支付。周老太现已无钱购买必需药物和生活用品，请求法院先让儿子支付眼前必要的费用。",
    prompt: "法院能否依申请先予执行？这种申请是否一律必须先提供担保？",
    reference:
      "法院可以依申请裁定先予执行。案件属于追索赡养费，双方义务和数额明确，拖到判决后会严重影响周老太的生活，儿子又有履行能力，符合本题的条件。法院可以根据情况责令提供担保，并不是所有先予执行申请都一律先担保；若法院已经责令提供而申请人不提供，则应驳回申请。",
    answer: "d",
    options: [
      {
        text: "在所有民事案件中，未拿到生效判决一律不能先行执行。",
        explanation: "先予执行就是对法定紧迫需求提供的程序措施。",
      },
      {
        text: "只要是父母告子女，不论义务是否明确、子女能否履行都必须先执行。",
        explanation: "仍须检查权利义务、生活影响和履行能力等条件。",
      },
      {
        text: "本案可以先予执行，但法律要求每一件申请都必须先担保。",
        explanation: "法院可以责令提供担保，不是所有申请当然必须。",
      },
      {
        text: "本案可依申请先予执行，是否责令担保由法院依法判断。",
        explanation: "本案满足赡养费、明确义务、严重生活影响及履行能力条件。",
      },
    ],
    points: [
      {
        label: "本案具备先予执行条件",
        meaning:
          "联系追索赡养费、义务明确、不先付将严重影响生活、儿子有履行能力，说明可依申请先予执行。",
        boundary:
          "不要求照抄四项名称；认可事实和结论连贯表达，不把有血缘关系单独当作全部条件。",
      },
      {
        label: "担保并非一律必需",
        meaning:
          "说明法院可责令担保，不是每件申请一律必须；若已责令仍不提供，应驳回。",
        boundary:
          "指出担保属于法院依法决定而非自动强制，即可表达核心；不强求把未发生的拒绝提供情形展开。",
      },
    ],
    sources: ["civpro-first-instance-advance-execution-basis"],
  },
  {
    id: "civpro-first-instance-filing-repeat",
    topicId: "civpro-filing-repeat",
    title: "换个标题再起诉同一笔借款",
    facts:
      "陈启曾起诉杜安返还同一笔借款，法院已作实体判决并发生法律效力。陈启不服，又向法院提交起诉状，仍要求杜安返还同一笔本金，双方、法律关系、事实和请求都没有变化，只把起诉状标题换成“重新追偿”。没有发生新的借款、还款或其他事实。",
    prompt: "这是否属于重复起诉？如果法院还未受理，应怎样处理？",
    reference:
      "属于重复起诉。双方当事人、争议标的和请求都与已经生效裁判处理的案件相同，换标题并没有形成一个新纠纷。法院尚未受理的，应裁定不予受理；已经受理的，裁定驳回起诉。不服原生效裁判，应依法寻求相应救济，不能把同一案件原样再起诉。",
    answer: "a",
    options: [
      {
        text: "属于重复起诉，尚未受理的应裁定不予受理。",
        explanation: "同一争议已有生效实体裁判，改标题不会改变诉的同一性。",
      },
      {
        text: "标题变了就是新诉，法院必须重新实体审判。",
        explanation: "应看当事人、标的和请求，不能只看标题。",
      },
      {
        text: "应再次受理，再作一份实体判决驳回全部请求。",
        explanation: "重复起诉应按程序处理，不是重新审判同一实体争议。",
      },
      {
        text: "所有曾经起诉过的人，以后对同一被告都永远不能再起诉。",
        explanation: "限制针对重复的同一争议，不是禁止其他新的纠纷。",
      },
    ],
    points: [
      {
        label: "识别重复起诉",
        meaning:
          "联系相同双方、同一借款争议及相同请求，且已有生效裁判，说明换标题仍属重复起诉。",
        boundary:
          "不把任何同一双方的新纠纷都视为重复，也不要求原样背出三个要件。",
      },
      {
        label: "使用程序性处理",
        meaning: "指出尚未受理应裁定不予受理，不是再次作实体败诉判决。",
        boundary:
          "题目只问未受理阶段；补充已受理应驳回起诉可以，但不是必答项。",
      },
    ],
    sources: ["civpro-first-instance-filing-repeat-basis"],
  },
  {
    id: "civpro-first-instance-filing-corrected",
    topicId: "civpro-filing-repeat",
    title: "补齐被告信息后重新起诉",
    facts:
      "许清第一次起诉修理店时，只写“某个维修的人”，法院通知补正后仍无法明确具体被告，遂裁定不予受理。之后许清查明经营者名称、登记信息和联系地址，重新起诉。现在被告能够明确，具体请求、事实理由以及其他起诉条件也均已具备。对方称，前次裁定生效后就不能再告了。",
    prompt:
      "这次起诉是否应当受理？前次不予受理裁定是否意味着该纠纷永远不能再起诉？",
    reference:
      "这次应当受理。前次不予受理，是因为没有明确的被告，法院并未对维修责任作实体判断。现在许清补齐了信息，已符合起诉条件，不能再用原来已经消除的程序障碍拒绝受理。受理后，维修责任仍由法院依法审理。",
    answer: "c",
    options: [
      {
        text: "只要有过不予受理裁定，就永久禁止再次起诉。",
        explanation: "程序障碍消除后，符合条件的起诉应依法受理。",
      },
      {
        text: "必须先把旧裁定撤销，法院才可以受理任何新材料。",
        explanation: "现行解释允许裁定不予受理后，符合起诉条件时再次起诉。",
      },
      {
        text: "现在符合起诉条件，应受理；旧裁定不是对维修责任的实体判决。",
        explanation: "应区分程序障碍与已生效的实体裁判。",
      },
      {
        text: "法院应直接判许清胜诉，不必再审查维修事实。",
        explanation: "受理只是进入审理，不能代替实体判断。",
      },
    ],
    points: [
      {
        label: "条件补齐后应受理",
        meaning: "联系被告已经明确、其余起诉条件也具备，说明本次应受理。",
        boundary:
          "不要求撤销先前正确作出的不予受理裁定，不忽略仍需满足全部起诉条件。",
      },
      {
        label: "旧裁定不永久阻止再诉",
        meaning:
          "说明旧裁定解决的是未明确被告这一程序障碍，未作实体判断；障碍消除后可再起诉。",
        boundary:
          "不要求重复说明胜败标准；不能概括为任何生效实体判决都可以原样重诉。",
      },
    ],
    sources: ["civpro-first-instance-filing-corrected-basis"],
  },
  {
    id: "civpro-first-instance-withdrawal-counterclaim",
    topicId: "civpro-withdrawal-default",
    title: "原告想撤诉，被告的反诉怎么办",
    facts:
      "甲公司起诉乙公司支付设备尾款，乙公司就同一合同提出质量损失的反诉，法院已经依法受理并决定合并审理。宣判前，甲公司提交撤诉申请，法院尚未作出裁定。甲公司随即称，既然自己不告了，本诉和乙公司的反诉都已经结束。",
    prompt:
      "甲公司提交申请后，本诉是否已经自动结束？如果法院准许撤回本诉，乙公司的反诉是否也一并结束？",
    reference:
      "本诉还没有自动结束。宣判前申请撤诉，是否准许要由法院裁定，甲公司递交申请不能代替法院决定。即使本诉获准撤回，已经依法受理的乙公司反诉仍继续审理，不由甲公司替乙公司撤掉。",
    answer: "b",
    options: [
      {
        text: "原告申请撤诉，当天本诉和反诉就全部结束。",
        explanation: "是否准许撤诉须裁定，反诉也不随本诉自动结束。",
      },
      {
        text: "本诉须经法院裁定准许撤回，已受理的反诉仍可继续审理。",
        explanation: "两项程序后果应分别处理。",
      },
      {
        text: "只要被告提出反诉，原告在任何情况下都不能申请撤诉。",
        explanation: "反诉的存在不取消原告提出撤诉申请的权利。",
      },
      {
        text: "法院准许原告撤诉后，被告反诉必然归零，必须重新起诉。",
        explanation: "已经受理的反诉继续审理，不必仅因本诉撤回而重来。",
      },
    ],
    points: [
      {
        label: "撤诉须经法院裁定",
        meaning: "说明申请本身不自动结束本诉，是否准许由法院裁定。",
        boundary: "不要求推断本题法院最终一定批准或不批准。",
      },
      {
        label: "反诉不随本诉撤回结束",
        meaning: "说明即使本诉获准撤回，已依法受理的乙公司反诉仍应继续审理。",
        boundary: "不要求乙重新起诉，也不能由甲代替乙撤回反诉。",
      },
    ],
    sources: ["civpro-first-instance-withdrawal-counterclaim-basis"],
  },
  {
    id: "civpro-first-instance-default-defendant",
    topicId: "civpro-withdrawal-default",
    title: "被告不来，原告就一定赢吗",
    facts:
      "普通货款纠纷中，被告公司已依法收到法院开庭传票，送达手续和时间均无争议。开庭当天，被告没有正当理由不到庭，也没有委托代理人出庭。原告到庭后称，既然对方不来，自己的欠款金额和全部利息请求都应直接照单支持。",
    prompt: "法院可否缺席判决？是否应当因此直接支持原告的全部请求？",
    reference:
      "法院可以缺席判决。被告经合法传票传唤，没有正当理由不到庭，不会使案件只能停下来。但缺席不等于承认了原告的所有说法，法院仍要审查证据、欠款金额和利息依据，再决定哪些请求成立。",
    answer: "d",
    options: [
      {
        text: "被告不来，法院永远不能继续审理。",
        explanation: "合法传唤后无正当理由不到庭，可以依法缺席判决。",
      },
      {
        text: "被告不来，就视为原告每一句陈述都已经被证明。",
        explanation: "缺席不是对全部事实和请求的当然认可。",
      },
      {
        text: "应将原告的起诉按撤诉处理。",
        explanation: "本题不到庭的是被告，不能套用原告不到庭的规则。",
      },
      {
        text: "可以缺席判决，但原告的证据和请求仍要依法审查。",
        explanation: "程序可继续，实体结果仍须审理确定。",
      },
    ],
    points: [
      {
        label: "可以依法缺席判决",
        meaning: "联系被告合法传票传唤后无正当理由不到庭，说明可以缺席判决。",
        boundary: "不增加必须先拘传所有被告的条件，本题是普通公司货款纠纷。",
      },
      {
        label: "缺席不等于当然败诉",
        meaning: "说明仍要审查原告证据及欠款、利息依据，不直接支持全部请求。",
        boundary: "不要求预测最终确切金额，也不把缺席等同事实自认。",
      },
    ],
    sources: ["civpro-first-instance-default-defendant-basis"],
  },
  {
    id: "civpro-first-instance-mediation-repent",
    topicId: "civpro-mediation-settlement",
    title: "调解书还没签收，一方反悔了",
    facts:
      "普通货款案件中，双方在法院主持下商定一个月后分期付款，法院据此制作调解书。双方未约定在调解协议上签名即生效，也不属于可以不制作调解书的情形。调解书尚未送达并由双方签收，被告已明确表示反悔，请求法院继续审理。原告认为只要谈好过，法院就应强制按调解结果执行。",
    prompt: "这份调解书是否已经生效？面对被告反悔，法院接下来应怎样处理？",
    reference:
      "调解书还没有生效。本题适用通常的调解书生效规则，要经双方签收；不能因为曾经谈妥，就认定已有可以强制执行的调解书。送达前一方反悔，法院应继续依法审理、及时判决，不应强迫其接受尚未生效的调解结果。",
    answer: "a",
    options: [
      {
        text: "调解书尚未生效，送达前一方反悔后应依法及时判决。",
        explanation: "本题不存在签名即生效等特别情形，双方未签收。",
      },
      {
        text: "曾谈妥过就永远不能反悔，未签收也直接执行。",
        explanation: "不能跳过本题适用的调解书生效条件。",
      },
      {
        text: "一方反悔就必须驳回原告起诉，法院不再审理。",
        explanation: "调解未成并不消灭原来的实体争议，仍须审理裁判。",
      },
      {
        text: "法院必须先强制付款，等执行完再判断调解书是否生效。",
        explanation: "没有生效执行依据，不能倒置程序。",
      },
    ],
    points: [
      {
        label: "调解书尚未生效",
        meaning:
          "联系双方尚未签收且无特别生效情形，说明调解书未生效，不能据此执行。",
        boundary: "不把本题规则扩大为所有调解一律必须制作并签收调解书。",
      },
      {
        label: "反悔后及时裁判",
        meaning:
          "说明送达前一方反悔，应继续依法审理、及时判决，而非强制调解或直接驳回起诉。",
        boundary: "认可通俗的继续审理判决，不强求固定表述。",
      },
    ],
    sources: ["civpro-first-instance-mediation-repent-basis"],
  },
  {
    id: "civpro-first-instance-settlement-nonperformance",
    topicId: "civpro-mediation-settlement",
    title: "私下和解撤诉后，对方没付款",
    facts:
      "承揽费纠纷审理中，双方自己签订和解协议，约定被告下月付款。法院没有制作调解书，原告据此申请撤诉并获准。协议没有经过司法确认、公证赋予强制执行效力等处理。付款日过后被告仍未履行，原告拿着这份私下协议和准许撤诉裁定，要求法院直接扣划被告存款。",
    prompt:
      "这些文件能否直接作为强制执行付款的依据？原告可以怎样继续主张权利？",
    reference:
      "不能仅凭这份私下和解协议和准许撤诉裁定，直接强制执行付款。撤诉裁定结束的是原来的诉讼，没有判令被告支付这笔钱。对方不履行和解后，原告可以依法起诉，请求法院审理相关给付争议；符合起诉条件的，应予受理。",
    answer: "c",
    options: [
      {
        text: "私下协议只要双方签字，就自动等同生效法院调解书。",
        explanation: "民事协议的效力与能否直接申请强制执行不是一回事。",
      },
      {
        text: "撤诉后对方不履行，也永远不能再起诉。",
        explanation: "准许撤诉不当然永久禁止依法再诉。",
      },
      {
        text: "不能据此直接扣款，可以依法起诉解决未履行的给付争议。",
        explanation: "本题没有直接强制执行依据，但仍可通过诉讼救济。",
      },
      {
        text: "准许撤诉裁定本身就是命令被告付款的执行依据。",
        explanation: "准许撤诉没有确定付款义务的执行内容。",
      },
    ],
    points: [
      {
        label: "缺少直接执行依据",
        meaning:
          "联系只有私下和解协议和准许撤诉裁定，说明不能直接强制执行付款。",
        boundary: "不是说协议毫无法律约束力，而是它不自动成为强制执行依据。",
      },
      {
        label: "可以依法另行起诉",
        meaning: "说明可以依法起诉解决未履行争议，符合条件应受理。",
        boundary:
          "不要求只能按和解协议起诉，不排除依法基于原关系主张；不能要求自动恢复已结束的原案。",
      },
    ],
    sources: ["civpro-first-instance-settlement-nonperformance-basis"],
  },
  {
    id: "civpro-first-instance-simple-conversion",
    topicId: "civpro-simple-small",
    title: "简易程序审到一半变复杂了",
    facts:
      "基层法院原按简易程序审理一件设备价款争议。审理中发现多批交付涉及不同合同，双方对结算范围分歧明显，证据核对也远比立案时掌握的复杂。法院已确认不宜继续适用简易程序，目前尚未超过简易程序审限。一方提出，即使改用普通程序，也应从改用之日重新给法院计算全部审限。",
    prompt:
      "法院应怎样转换审理程序？转为普通程序后，审限是否从转换当天重新起算？",
    reference:
      "法院应在简易程序审限届满前裁定转为普通程序，并将审判人员和相关事项书面通知双方。转换程序不会把之前的审理时间清零，案件审限仍从法院立案之日计算，不从转换当天重新起算。",
    answer: "b",
    options: [
      {
        text: "一旦采用简易程序，不论案件后来多复杂都不能转换。",
        explanation: "发现不宜适用时，应依法转为普通程序。",
      },
      {
        text: "裁定转为普通程序并通知双方，审限仍从立案之日计算。",
        explanation: "转换方式和审限起算分别有法定规则。",
      },
      {
        text: "可以转为普通程序，审限一律从转换当天重新计算。",
        explanation: "审限不因转换程序而从零开始。",
      },
      {
        text: "只能先驳回原告起诉，要求按普通程序重新起诉。",
        explanation: "同一案件依法转换程序，不要求另行起诉。",
      },
    ],
    points: [
      {
        label: "依法裁定转换程序",
        meaning: "联系已经不宜按简易审理，说明应裁定转为普通程序并通知当事人。",
        boundary:
          "明确需要裁定转普通即可表达核心；不强求写出审判人员通知的全部细节。",
      },
      {
        label: "审限仍从立案日起算",
        meaning: "说明转换不清零，审限仍从立案之日计算，不是转换日。",
        boundary: "不要求计算具体剩余天数或讨论本题未发生的延长审批。",
      },
    ],
    sources: ["civpro-first-instance-simple-conversion-basis"],
  },
  {
    id: "civpro-first-instance-small-final",
    topicId: "civpro-simple-small",
    title: "四万元货款判决能否普通上诉",
    facts:
      "某基层法院审理一件4万元普通货款给付纠纷。题设给定，该省已公布的上年度就业人员年平均工资为10万元。合同、交货和欠款事实清楚，权利义务明确，争议不大；不存在涉外、需要鉴定、下落不明、反诉等不适用小额诉讼的情形。法院依法适用小额诉讼程序作出判决，败诉方准备像普通一审判决一样提出上诉。",
    prompt:
      "本案适用小额诉讼的金额和案件条件是否具备？对这个小额诉讼判决能否按普通程序提起上诉？",
    reference:
      "具备。4万元低于题设年平均工资10万元的50%，案件又是基层法院审理的简单金钱给付纠纷，且没有小额诉讼的排除情形。依法适用小额诉讼实行一审终审，这份判决不能像普通一审判决那样上诉；不服时是否符合其他法定救济条件，另按相关规则判断。",
    answer: "d",
    options: [
      {
        text: "金额必须低于年平均工资的30%，本案只能普通审理。",
        explanation:
          "现行法定标准为上年度就业人员年平均工资的50%，不能沿用旧比例。",
      },
      {
        text: "只要金额少，任何人身关系或涉外案件都能适用小额。",
        explanation: "小额诉讼还有案件类型和法定排除条件。",
      },
      {
        text: "本案符合小额条件，但任何一审判决都可普通上诉。",
        explanation: "依法适用小额诉讼的一审终审是法定例外。",
      },
      {
        text: "本案符合小额条件，依法一审终审，不能普通上诉。",
        explanation: "金额、案件性质和程序效力均符合题设。",
      },
    ],
    points: [
      {
        label: "符合小额适用条件",
        meaning:
          "联系4万元低于10万元的50%，且为基层简单金钱给付案、无排除情形，说明可适用小额。",
        boundary: "不把虚构统计值当作全国通用金额，不要求罗列每一种排除事由。",
      },
      {
        label: "一审终审不能普通上诉",
        meaning: "说明依法小额诉讼判决实行一审终审，不能按普通上诉处理。",
        boundary: "不要求展开再审，也不能把不能上诉说成不存在任何法定救济。",
      },
    ],
    sources: ["civpro-first-instance-small-final-basis"],
  },
  {
    id: "civpro-first-instance-judgment-appeal-term",
    topicId: "civpro-rulings-remedies",
    title: "判决和不予受理裁定的上诉期",
    facts:
      "方禾有两个互不关联的国内民事案件。甲案按普通程序作出一审判决，乙案则作出不予受理裁定。两份文书今天分别依法送达给方禾。他准备对两案都上诉，认为只要都是法院文书，法定上诉期限就应完全一样。本题没有涉外或小额诉讼情形。",
    prompt:
      "甲案判决、乙案不予受理裁定的法定上诉期限各是多少？它们的期限分别与哪个送达行为相联系？",
    reference:
      "甲案判决的上诉期是判决书送达之日起15日；乙案不予受理裁定可以上诉，上诉期是裁定书送达之日起10日。两案分别根据各自文书的送达计算，不是所有裁判文书都用同一个期限；按日计算时，送达当天不计入。",
    answer: "a",
    options: [
      {
        text: "甲案15日、乙案10日，分别从各自文书送达计算。",
        explanation: "应先分清一审判决与可以上诉的裁定。",
      },
      {
        text: "两案都是15日，裁定没有独立上诉期限。",
        explanation: "可以上诉的一审裁定为10日。",
      },
      {
        text: "两案都是10日，判决和裁定期限相同。",
        explanation: "普通一审判决为15日。",
      },
      {
        text: "不予受理裁定从来不能上诉，乙案没有救济入口。",
        explanation: "不予受理属于依法可以上诉的裁定。",
      },
    ],
    points: [
      {
        label: "判决上诉期为15日",
        meaning: "说明甲案从判决书送达起有15日上诉期。",
        boundary: "不要求推算具体截止日期，不适用小额一审终审规则。",
      },
      {
        label: "不予受理裁定为10日",
        meaning: "说明乙案不予受理裁定可上诉，期限为裁定书送达起10日。",
        boundary: "不能扩大为所有裁定都能上诉，不要求背全部可上诉裁定种类。",
      },
    ],
    sources: ["civpro-first-instance-judgment-appeal-term-basis"],
  },
  {
    id: "civpro-first-instance-preservation-reconsideration",
    topicId: "civpro-rulings-remedies",
    title: "冻结裁定不服，复议会先解冻吗",
    facts:
      "普通货款诉讼中，法院依申请裁定冻结被告账户内与请求数额相当的资金。被告认为没有必要冻结，准备对该保全裁定寻求救济，并要求自己一提出救济申请就先停止冻结。本题只讨论针对保全裁定本身的救济，不涉及执行人员超范围操作。",
    prompt:
      "被告对保全裁定不服，应走什么救济程序？提出申请后，裁定的执行是否自动停止？",
    reference:
      "可以向作出保全裁定的法院申请复议一次，不是对这份保全裁定提起普通上诉。复议期间不停止裁定执行，提出复议本身不会自动解冻。法院依法审查后，再作相应处理。",
    answer: "c",
    options: [
      {
        text: "保全裁定一律只能提普通上诉，不能复议。",
        explanation: "法律规定可申请复议一次。",
      },
      {
        text: "可以申请复议，而且只要递交申请就必须立即解冻。",
        explanation: "复议期间不停止裁定执行。",
      },
      {
        text: "可以申请复议一次，复议期间不停止执行。",
        explanation: "救济入口与执行是否停止应分开判断。",
      },
      {
        text: "保全裁定不允许当事人提出任何异议或救济。",
        explanation: "法律明确保留复议救济。",
      },
    ],
    points: [
      {
        label: "申请复议一次",
        meaning: "说明对保全裁定不服可以申请复议一次，而不是普通上诉。",
        boundary: "不要求背复议具体期限；不能混为对执行行为的异议。",
      },
      {
        label: "复议不自动停执行",
        meaning: "说明复议期间不停止裁定执行，不因申请就自动解冻。",
        boundary: "不等于保全永远不能依法变更或解除。",
      },
    ],
    sources: ["civpro-first-instance-preservation-reconsideration-basis"],
  },
];
const topicDrafts = [
  {
    id: "civpro-periods",
    chapterId: "CIVPRO-PERIODS",
    title: "诉讼期间与顺延",
    headline: "期满前交邮不算迟；实际耽误期限，要及时申请顺延。",
    paragraphs: [
      "期间按日计算时，开始当天不计入；最后一天是法定休假日的，顺延至休假日后的第一日。诉讼文书在期满前交邮，不把路上的时间算成逾期。",
      "因不可抗拒事由或其他正当理由耽误期限，可以在障碍消除后10日内申请顺延，是否准许由法院决定。先分清原本就未逾期，还是已经耽误后申请补救。",
    ],
    pitfall: "把法院收件日当作唯一标准，或认为有正当理由就会自动延长期限。",
  },
  {
    id: "civpro-service",
    chapterId: "CIVPRO-SERVICE",
    title: "直接送达与电子送达",
    headline: "看清谁能签收、何时送达，以及电子文书的适用条件。",
    paragraphs: [
      "本人不在时，同住成年家属可以签收，回证上的签收日期就是送达日期。不是所有亲属、邻居都能仅凭关系代收。",
      "经同意，可用能够确认收悉的电子方式送达。判决书、裁定书、调解书也可以依法电子送达；受送达人需要纸质文书的，法院应提供。",
    ],
    pitfall: "沿用判决书不能电子送达的旧口径，或把实际阅读日一律当作送达日。",
  },
  {
    id: "civpro-preservation-advance",
    chapterId: "CIVPRO-PRESERVATION-ADVANCE",
    title: "财产保全与先予执行",
    headline: "保全先稳住财产；先予执行解决等不到最终判决的法定急需。",
    paragraphs: [
      "情况紧急、延误会造成难以弥补的损害，可以诉前申请财产保全并提供担保。法院接受后48小时内裁定；采取措施后30日内不依法起诉或仲裁，应解除保全。",
      "追索赡养费等法定案件，权利义务明确、不先执行将严重影响生活或生产经营、对方有履行能力，可依申请先予执行。法院可以责令担保，并非每案一律要求。",
    ],
    pitfall:
      "把冻结财产当成已经判原告胜诉，或把诉前财产保全的担保规则照搬给全部先予执行。",
  },
  {
    id: "civpro-filing-repeat",
    chapterId: "CIVPRO-FILING-REPEAT",
    title: "重复起诉与程序补正后再诉",
    headline: "同一争议已有生效实体裁判，不能原样再诉；程序障碍补齐后另看。",
    paragraphs: [
      "后诉与前诉当事人、诉讼标的相同，请求相同或实质否定前诉裁判结果等条件具备时，属于重复起诉。未受理应不予受理，已经受理应驳回起诉，法律另有规定的除外。",
      "前次裁定不予受理或驳回起诉，只是起诉条件未具备的，再次起诉时符合条件应受理。要区分实体争议已经裁判，与被告信息等程序条件后来补齐。",
    ],
    pitfall: "把所有再诉都当重复起诉，或者只换名称就企图绕过生效实体裁判。",
  },
  {
    id: "civpro-withdrawal-default",
    chapterId: "CIVPRO-WITHDRAWAL-DEFAULT",
    title: "撤诉、反诉与缺席判决",
    headline: "当事人不继续参加，不等于法院不再审，也不等于对方当然胜诉。",
    paragraphs: [
      "宣判前申请撤诉，是否准许由法院裁定。原告撤回本诉，已经受理的反诉仍继续审理，不由原告替被告一并撤掉。",
      "被告经合法传票传唤，无正当理由不到庭，可缺席判决。法院仍要审查原告的证据和请求，缺席不自动证明全部事实。",
    ],
    pitfall: "把申请撤诉当作已经获准，或把被告缺席当成原告全部请求自动成立。",
  },
  {
    id: "civpro-mediation-settlement",
    chapterId: "CIVPRO-MEDIATION-SETTLEMENT",
    title: "法院调解与自行和解",
    headline: "先确定手里是什么文书，才能判断是否生效、能否直接执行。",
    paragraphs: [
      "通常的法院调解书经双方签收后生效。送达前一方反悔，应及时判决；依法不需调解书、约定签章即生效等特别情形另按规定判断。",
      "自行和解协议不自动等同于生效法院调解书。仅有私下协议与准许撤诉裁定，不能直接强制执行给付；不履行时可依法起诉。",
    ],
    pitfall:
      "把所有和解都当成可直接执行的法院调解书，或认为调解失败后就应驳回原来的起诉。",
  },
  {
    id: "civpro-simple-small",
    chapterId: "CIVPRO-SIMPLE-SMALL",
    title: "简易程序转换与小额诉讼",
    headline: "案件复杂了要依法转程序；依法适用小额诉讼实行一审终审。",
    paragraphs: [
      "简易审理中发现不宜继续适用，应在审限届满前裁定转普通程序并通知双方。审限仍从立案之日计算，不从转换日清零。",
      "基层简单金钱给付案件，标的额在本省上年度就业人员年平均工资50%以下且无排除情形，适用小额诉讼，一审终审。涉外、需要鉴定、提出反诉等情形不能仅凭金额小就套用。",
    ],
    pitfall:
      "把旧30%标准沿用到现行规则，或把小额诉讼当成可以照常上诉的普通一审。",
  },
  {
    id: "civpro-rulings-remedies",
    chapterId: "CIVPRO-RULINGS-REMEDIES",
    title: "判决、裁定与救济方式",
    headline: "先看文书种类和程序，别把上诉与复议混用。",
    paragraphs: [
      "普通国内民事一审判决，上诉期为送达起15日；不予受理、管辖权异议、驳回起诉等可上诉裁定，为送达起10日。依法不准上诉或过期无人上诉的裁判发生效力。",
      "对保全或先予执行裁定不服，可以申请复议一次，复议期间不停止执行。不是所有裁定都走普通上诉，也不是一申请救济就自动停执行。",
    ],
    pitfall: "只看文书来自法院就用同一期限，或认为复议会当然解冻财产。",
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
export const civilProcedureFirstInstanceTopics: FaultTopic[] = topicDrafts.map(
  (topic) => {
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
  },
);
export const civilProcedureFirstInstanceChapters = topicDrafts.map((topic) => ({
  id: topic.chapterId,
  title: topic.title,
  section: "民事诉讼法",
  topicIds: [topic.id],
}));
export const civilProcedureFirstInstanceExercises =
  civilProcedureFirstInstanceTopics.flatMap((topic) => topic.exercises);
export const civilProcedureFirstInstanceContentPack = {
  revision: civilProcedureFirstInstanceRevision,
  snapshot: {
    topics: civilProcedureFirstInstanceTopics,
    sources: civilProcedureFirstInstanceSources,
  },
};
export const civilProcedureFirstInstanceDefaultQueues = {
  objective: civilProcedureFirstInstanceExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureFirstInstanceExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureFirstInstanceQuestion(id: string) {
  const question = civilProcedureFirstInstanceExercises.find(
    (q) => q.id === id,
  );
  return question ? structuredClone(question) : undefined;
}
export function civilProcedureFirstInstanceTopicForQuestion(id: string) {
  return civilProcedureFirstInstanceTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilProcedureFirstInstanceSameCaseQuestions(id: string) {
  const question = civilProcedureFirstInstanceQuestion(id);
  return question
    ? structuredClone(
        civilProcedureFirstInstanceExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilProcedureFirstInstanceChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilProcedureFirstInstanceChapters.find(
    (c) => c.id === chapterId,
  );
  return chapter
    ? civilProcedureFirstInstanceTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
