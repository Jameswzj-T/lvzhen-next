import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

// Eight original cases fill gaps found across the first nine civil-procedure packages.
export const civilProcedureGapFillRevision =
  "civil-procedure-gap-fill-2026-10-30.v1";
export const civilProcedureGapFillSources: ContentSources = {
  "civpro-gap-representatives": {
    title: "《民事诉讼法》（2023年修正）第56、57条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-30核读现行法及所列解释。区别一般代表行为与放弃请求、和解等处分；未登记权利人仍须在时效内起诉，不能直接拿他人的判决执行。 原创虚构教学案例，不是官方真题。",
  },
  "civpro-gap-registration-check": {
    title: "《民诉法解释》（2022年修正）第80条",
    url: "https://www.quanzhou.gov.cn/zfb/xxgk/zfxxgkzl/fgwj/sfjs/202304/t20230412_2868534.htm",
    note: "2026-10-30核读现行法及所列解释。法院认定未登记权利人的请求成立后，裁定适用已有判决、裁定；登记不是永久失权的门槛。 原创虚构教学案例，不是官方真题。",
  },
  "civpro-gap-service": {
    title: "《民事诉讼法》（2023年修正）第89、95条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-30核读现行法及所列解释。留置送达可在住所留文书并拍照录像记录，不一律需要见证人；国内普通程序公告送达为30日。 原创虚构教学案例，不是官方真题。",
  },
  "civpro-gap-litigation-stop": {
    title: "《民事诉讼法》（2023年修正）第153、154条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5220330/content.html",
    note: "2026-10-30核读现行法及所列解释。普通财产诉讼等待继承人表态与离婚诉讼一方死亡，分别中止、终结；不是执行程序。 原创虚构教学案例，不是官方真题。",
  },
  "civpro-gap-arbitration-nonexecution": {
    title: "《仲裁法》（2025年修订）第10、71、76条",
    url: "https://legalinfo.moj.gov.cn/pub/sfbzhfx/zt/2025nzt0120/xcgvxxddzcf/202509/t20250915_525094.html",
    note: "2026-10-30核读现行法及所列解释。2026-03-01起施行。国内裁决以伪造证据为依据，可依法审查不予执行；其后重新仲裁需双方重新达成协议，也可向法院起诉。不是实体上诉或凭一方指控自动拒绝执行。 原创虚构教学案例，不是官方真题。",
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
    id: "civpro-gap-authority",
    topicId: "civpro-gap-representatives",
    title: "代表人签字，能替所有人少要钱吗",
    facts:
      "2026年，18名旅客因同一次包车服务取消，分别向同一公司请求返还费用并赔偿损失。法院经审查合并审理，18人共同推选林舟、许宁作为诉讼代表人。两人提交订单、参加质证后，公司提出只付各人请求金额的七成，余款全部放弃。两名代表人未经征求其他旅客意见便签下和解方案，其余旅客发现后明确反对。法院尚未制作调解书。",
    prompt:
      "两名代表人参加质证的行为与签署七成和解方案，对其他旅客是否都有效？",
    reference:
      "参加质证等一般诉讼行为对被代表的旅客有效，七成和解不能凭两名代表人的签字就约束他们。旅客推选了代表人，可以由他们参加诉讼；但和解同时放弃了三成请求，必须取得被代表人的同意。本题没有取得同意，其他旅客还明确反对，不能直接按该方案替他们结案。",
    answer: "b",
    options: [
      {
        text: "两种行为都有效，推选代表人等于允许其任意处分请求",
        explanation: "推选本身不包含对和解、放弃请求的概括同意。",
      },
      {
        text: "一般诉讼行为有效；七成和解仍须取得被代表旅客的同意",
        explanation: "区分参加诉讼与处分请求，后者有额外同意要求。",
      },
      {
        text: "两种行为都无效，每名旅客都必须亲自参加每次质证",
        explanation: "代表人制度允许一般诉讼行为对被代表人发生效力。",
      },
      {
        text: "只要公司同意，其他旅客是否同意不影响和解约束力",
        explanation: "公司不能代替被代表的旅客同意放弃请求。",
      },
    ],
    points: [
      {
        label: "一般诉讼行为有效",
        meaning:
          "结合共同推选代表人，说明提交证据、参加质证等一般诉讼行为对被代表人有效。",
        boundary: "不用逐一列完代表人可实施的全部行为。",
      },
      {
        label: "和解须经被代表人同意",
        meaning:
          "联系未经同意且其他旅客反对，说明两名代表人不能自行放弃三成请求、使七成和解约束他们。",
        boundary: "只判断本题未获同意的情形，不要求讨论事后追认程序。",
      },
    ],
    sources: ["civpro-gap-representatives"],
  },
  {
    id: "civpro-gap-registration",
    topicId: "civpro-gap-representatives",
    title: "没有登记的人，后来还能起诉吗",
    facts:
      "某地同批民宿预订被取消，受影响旅客人数在起诉时尚未确定。法院依代表人诉讼程序公告登记，并对登记旅客作出生效赔偿判决。周岚因当时在外地没有参加登记，半年后在诉讼时效期间内，带着同一批次的订单、付款及取消通知另行起诉。法院审查确认她也符合该批请求的条件。公司以她没有登记为由主张不再赔付；周岚则想直接拿别的旅客的判决申请执行。",
    prompt: "未登记是否使周岚失去救济？她应当如何利用已有判决？",
    reference:
      "周岚仍可在诉讼时效内起诉，没有登记不等于丧失请求权。她不能直接拿其他旅客的判决申请执行；应先提出自己的请求。法院已认定她的请求成立，应裁定适用已有判决，作为她获得救济的依据。",
    answer: "d",
    options: [
      {
        text: "没有登记就永久失去赔偿请求权",
        explanation: "未登记的权利人在诉讼时效内仍可起诉。",
      },
      {
        text: "不必起诉，直接把别人的判决交执行法院即可",
        explanation: "已有判决不会自动成为未登记者可以直接使用的执行依据。",
      },
      {
        text: "可以起诉，但法院不得考虑已有判决",
        explanation: "符合法定条件时应裁定适用已有判决、裁定。",
      },
      {
        text: "可以及时起诉，法院认定请求成立后裁定适用已有判决",
        explanation: "既保留未登记者的救济，也要求确认其自身请求符合条件。",
      },
    ],
    points: [
      {
        label: "未登记仍可及时起诉",
        meaning: "联系周岚在时效内提出同批次请求，说明未登记不使其永久失权。",
        boundary: "不要求计算题目未争议的具体时效起止日。",
      },
      {
        label: "先确认请求，再适用已有裁判",
        meaning:
          "说明不能直接执行别人的判决，应在法院认定其自身请求成立后裁定适用已有判决。",
        boundary: "不要求使用“扩张效力”等术语；不能省掉自身请求的审查。",
      },
    ],
    sources: ["civpro-gap-representatives", "civpro-gap-registration-check"],
  },
  {
    id: "civpro-gap-service-refusal",
    topicId: "civpro-gap-service",
    title: "门开了，拒签就送不成吗",
    facts:
      "国内普通民事案件中，法院工作人员到被告陈原住所送达起诉状副本和开庭传票。陈原本人开门，得知来意后说“我不签，官司就开不了”，拒绝接收。工作人员将文书留在其住所内，全程录像记录身份核对、说明来意、拒收及留置过程，并记载在卷，没有另请居委会人员或同事到场见证。",
    prompt: "这次送达是否完成？没有另请见证人是否使送达无效？",
    reference:
      "这次送达已经完成。陈原在住所拒收，法院把文书留在住所并完整录像记录送达过程，符合留置送达的法定方式。拍照、录像记录是法律允许的另一种办法，不是每次都必须再请见证人；拒签不能阻止这次送达生效。",
    answer: "a",
    options: [
      {
        text: "已经完成，住所留置并录像记录符合留置送达方式",
        explanation: "法律允许以拍照、录像记录留置过程，不一律要求另请见证人。",
      },
      {
        text: "尚未完成，所有民事文书都必须本人签字",
        explanation: "法定留置送达可以在拒收情形下完成。",
      },
      {
        text: "尚未完成，只能改用公告送达",
        explanation: "已经满足留置方式，不需要因此改公告。",
      },
      {
        text: "留置必须有居委会人员签名，录像不能代替",
        explanation: "把邀请见证与拍照录像两种方式错误地叠加成必须同时具备。",
      },
    ],
    points: [
      {
        label: "留置送达已完成",
        meaning: "联系本人在住所拒收、文书留在住所且录像记录，判断已经送达。",
        boundary: "不要求陈原事后真的阅读文书，也不按是否签字作为唯一条件。",
      },
      {
        label: "录像方式不另强制见证",
        meaning: "说明本题采用法定拍照录像方式，不因未另外邀请见证人而无效。",
        boundary: "不要求展开其他形式的送达。",
      },
    ],
    sources: ["civpro-gap-service"],
  },
  {
    id: "civpro-gap-service-publication",
    topicId: "civpro-gap-service",
    title: "失去联系后，公告要等多久",
    facts:
      "国内货款纠纷适用普通程序，被告高远在境内有住所，不涉及涉外送达。法院多次到其住所和原工作地查找，均获知已长期离开且无人知道去向；邮寄被退回，其他法定送达方式也无法实现。法院将查找和送达经过记入案卷，发出公告。原告说发出公告当日就算送达；朋友翻出旧教材，说必须经过60日。",
    prompt: "本案能否公告送达？经过多长时间视为送达？",
    reference:
      "可以公告送达。法院已核实高远下落不明，其他法定方式也无法送达，并记录了经过。国内普通程序下，自发出公告之日起经过30日视为送达，既不是发布当天，也不是旧教材中的60日。",
    answer: "c",
    options: [
      {
        text: "只要原告希望尽快开庭，就可在公告当日视为送达",
        explanation: "公告送达有适用条件和法定等待期间。",
      },
      {
        text: "可以公告，但国内案件一律要经过60日",
        explanation: "现行民诉法规定的国内公告送达期间是30日。",
      },
      {
        text: "可以公告，自发出公告之日起经过30日视为送达",
        explanation: "本题具备公告条件，应按现行国内公告期间处理。",
      },
      {
        text: "本人没有签字，任何公告都无法完成送达",
        explanation: "公告送达是法定送达方式，不以本人签字为条件。",
      },
    ],
    points: [
      {
        label: "公告条件满足",
        meaning: "联系下落不明、其他方式无法送达及查找记录，说明可以公告送达。",
        boundary:
          "下落不明和其他方式无法送达是法定择一条件，不要求学生把两者都当成缺一不可。",
      },
      {
        label: "适用国内30日期间",
        meaning: "明确发出公告后经过30日视为送达，纠正当天生效或60日说法。",
        boundary: "不要求计算未给出的具体日历日期，不扩大到涉外公告。",
      },
    ],
    sources: ["civpro-gap-service"],
  },
  {
    id: "civpro-gap-stay-heirs",
    topicId: "civpro-gap-litigation-stop",
    title: "追讨借款期间，原告去世了",
    facts:
      "沈岸起诉要求杜青返还8万元借款。案件还在一审审理中，尚未作出裁判，沈岸因病去世，留下配偶和成年女儿两名继承人。法院通知两人后，她们表示需要查看账目，再决定是否参加诉讼，尚未放弃相关权利。杜青请求立即终结案件。一个月后，两名继承人都向法院表示愿意参加并继续主张这笔借款。",
    prompt: "等待继承人表态时应如何处理？两人决定参加后，案件如何继续？",
    reference:
      "等待继承人表态时应中止诉讼，不能因沈岸去世就立即终结。这是借款财产争议，继承人尚未决定是否参加，需要先等她们表态。两人后来明确参加，中止原因已经消除，应恢复诉讼，继续审理借款是否成立、是否应返还。",
    answer: "b",
    options: [
      {
        text: "原告一去世就终结，继承人后来表态也不能改变",
        explanation:
          "普通财产诉讼需先区分是否有继承人及其是否参加，不能一律终结。",
      },
      {
        text: "先中止等待表态，两人决定参加后恢复审理",
        explanation: "本题中止原因随后消除，应恢复诉讼。",
      },
      {
        text: "无需等待，直接判杜青不必还款",
        explanation: "原告死亡不是认定借款不存在的依据。",
      },
      {
        text: "先中止，但恢复诉讼必须让两人另行重新起诉",
        explanation: "中止原因消除后恢复原诉讼，不要求以重起诉替代。",
      },
    ],
    points: [
      {
        label: "先中止等待继承人表态",
        meaning:
          "联系借款财产争议、继承人存在且未表态，判断应中止而非立即终结。",
        boundary: "不要求扩展继承份额或遗产债务责任。",
      },
      {
        label: "原因消除后恢复诉讼",
        meaning:
          "联系两人已明确参加，说明应恢复本案审理，不能因此直接认定杜青胜诉。",
        boundary: "不要求预先判断借款实体争议结果。",
      },
    ],
    sources: ["civpro-gap-litigation-stop"],
  },
  {
    id: "civpro-gap-end-divorce",
    topicId: "civpro-gap-litigation-stop",
    title: "离婚尚未判决，一方去世了",
    facts:
      "林汐诉请与季川离婚，一审法院还未作出判决。审理中季川因事故死亡。季川的母亲到法院表示愿意接着参加，希望法院判决两人不应离婚；林汐则要求按原请求继续判离。本案不含另行提起的财产给付诉讼。",
    prompt:
      "法院应继续审理、暂时中止，还是终结这起离婚诉讼？季川的母亲能否接替他继续争离婚？",
    reference:
      "应裁定终结这起离婚诉讼。离婚案件一方死亡，法律规定终结；不需要等待继承人参加。季川的母亲不能接替他继续争离婚，林汐也不能要求法院再按原案判离。",
    answer: "d",
    options: [
      {
        text: "由母亲继承季川的诉讼地位，继续争是否离婚",
        explanation: "离婚这种身份诉讼不能由继承人接替继续。",
      },
      {
        text: "先中止，等遗产分完后必须恢复离婚审理",
        explanation: "一方死亡是本题终结诉讼的事由，不是等待遗产处理的中止。",
      },
      {
        text: "法院应直接判决准许离婚，以满足原告请求",
        explanation: "应作终结诉讼裁定，不是继续判离婚。",
      },
      {
        text: "终结诉讼，母亲不能接替死者继续争离婚",
        explanation: "一方死亡使本离婚诉讼依法终结。",
      },
    ],
    points: [
      {
        label: "依法终结离婚诉讼",
        meaning: "联系审理中一方死亡，明确应终结，不是继续判离或中止等待。",
        boundary: "不要求讨论题目排除的独立财产给付诉讼。",
      },
      {
        label: "继承人不能接替继续离婚",
        meaning: "说明母亲即使愿意参加，也不能继承死者的离婚诉讼地位继续本案。",
        boundary: "不要求评价其是否有继承权。",
      },
    ],
    sources: ["civpro-gap-litigation-stop"],
  },
  {
    id: "civpro-gap-nonexecution-evidence",
    topicId: "civpro-gap-arbitration-nonexecution",
    title: "裁决用了伪造的验收单",
    facts:
      "2026年5月，两家境内公司依有效仲裁协议解决设备货款争议。仲裁庭以青河公司提交的验收单为关键依据，裁决云渡公司支付货款。裁决进入法院执行后，云渡公司在法定期间内提出不予执行申请，提交原始电子档案、鉴定材料等，证明验收单签名系伪造。法院组成合议庭审查，已经核实该验收单系伪造且确为裁决依据。青河公司称仲裁一裁终局，法院只能执行。",
    prompt:
      "青河公司的说法是否成立？法院应如何处理这份国内仲裁裁决的执行申请？",
    reference:
      "青河公司的说法不成立，法院应裁定不予执行。裁决所根据的证据是伪造的，属于法定不予执行事由；本题法院合议庭已经审查核实。一裁终局不排除这种司法审查，但也不是只要败诉方声称证据有假就自动不执行。",
    answer: "a",
    options: [
      {
        text: "法院应裁定不予执行，一裁终局不排除法定执行审查",
        explanation:
          "伪造证据确为裁决依据，且已经合议庭审查核实，符合本题事由。",
      },
      {
        text: "只要有有效仲裁协议，法院在任何情况下都只能执行",
        explanation: "仲裁法明确规定法定不予执行审查。",
      },
      {
        text: "法院应把申请作为普通上诉，改判云渡公司胜诉",
        explanation: "不予执行审查不是实体争议的普通第二审。",
      },
      {
        text: "云渡一提交指控就应自动不执行，无须法院核实",
        explanation: "当事人需提出证据，法院应依法审查核实。",
      },
    ],
    points: [
      {
        label: "识别法定不予执行事由",
        meaning:
          "联系裁决依据的验收单被伪造，说明属于法定不予执行事由，一裁终局不排除此审查。",
        boundary: "不要求列举其他无关事由，不评价设备实际是否合格。",
      },
      {
        label: "经核实后裁定不予执行",
        meaning:
          "联系合议庭已经核实，明确应裁定不予执行，而非普通上诉改判或凭指控自动处理。",
        boundary: "不要求计算题目已明确合法的申请期间。",
      },
    ],
    sources: ["civpro-gap-arbitration-nonexecution"],
  },
  {
    id: "civpro-gap-nonexecution-remedy",
    topicId: "civpro-gap-arbitration-nonexecution",
    title: "不予执行以后，还能拿旧条款再仲裁吗",
    facts:
      "两家境内公司的一份2026年货款仲裁裁决已被法院依法裁定不予执行。收款方仍要追讨该笔货款，想用原合同中的仲裁条款直接再次申请仲裁。另一方明确表示不再同意仲裁，双方没有达成新的仲裁协议。收款方担心原合同有仲裁条款，就再也不能起诉；对方则说不予执行等于货款债务已经消失。",
    prompt: "收款方应如何继续解决同一货款争议？对方所说债务已经消失是否正确？",
    reference:
      "收款方可以向法院起诉；若想再次仲裁，需要双方重新达成仲裁协议。本题对方不同意，不能只凭原条款直接再仲裁。不予执行也不等于认定货款债务消失，是否欠款及数额仍需在依法启动的新程序中解决。",
    answer: "c",
    options: [
      {
        text: "原条款一直有效，收款方可以单方面反复申请仲裁",
        explanation: "对已被不予执行的裁决所涉同一争议，再仲裁须重新达成协议。",
      },
      {
        text: "已有仲裁条款，法院永远不能受理同一纠纷",
        explanation: "依法不予执行后，法律允许向法院起诉。",
      },
      {
        text: "可以起诉；再仲裁须重新达成协议，债务并未因此自动消失",
        explanation: "区分裁决的执行结果、重新解决途径和实体债务。",
      },
      {
        text: "不予执行已免除货款债务，无须再处理",
        explanation: "不予执行不是认定实体债务不存在的裁判。",
      },
    ],
    points: [
      {
        label: "明确后续解决途径",
        meaning: "说明本案可起诉，再仲裁须重新达成协议，不能只依旧条款。",
        boundary:
          "不要求确定具体地域管辖法院，也不泛化为所有仲裁条款一律失效。",
      },
      {
        label: "不予执行不等于免债",
        meaning: "说明不予执行不直接消灭货款债务，实体争议仍需依法处理。",
        boundary: "不要求提前认定收款方实体上必然胜诉。",
      },
    ],
    sources: ["civpro-gap-arbitration-nonexecution"],
  },
];

const topicDrafts = [
  {
    id: "civpro-gap-representatives",
    chapterId: "CIVPRO-GAP-REPRESENTATIVES",
    title: "代表人诉讼",
    headline: "代表人可以代为诉讼，处分他人请求仍要取得同意。",
    paragraphs: [
      "人数众多的共同诉讼，可以推选代表人。一般诉讼行为对被代表人有效；变更、放弃请求、承认对方请求或者和解，须经被代表人同意。",
      "起诉时人数未定的同类争议，可以公告登记。未登记的人在诉讼时效内仍可起诉；法院认定其请求成立后，裁定适用已有判决、裁定。",
    ],
    pitfall:
      "把推选代表人理解为可以任意减免赔偿，或者认为未登记便永久失去请求权。",
  },
  {
    id: "civpro-gap-service",
    chapterId: "CIVPRO-GAP-SERVICE",
    title: "留置送达与公告送达",
    headline: "拒收有拒收的办法，确实找不到人才考虑公告。",
    paragraphs: [
      "受送达人在住所拒收诉讼文书时，可以依法留置。将文书留在住所并用拍照、录像记录送达过程，是法定方式之一，不必一律再找见证人。",
      "国内普通程序中，受送达人下落不明，或者其他法定方式无法送达，可以公告；发出公告经过30日视为送达。不能仅因不方便就跳到公告。",
    ],
    pitfall: "认为拒绝签字就无法送达，或把国内公告期限写成旧法60日。",
  },
  {
    id: "civpro-gap-litigation-stop",
    chapterId: "CIVPRO-GAP-LITIGATION-STOP",
    title: "诉讼中止与终结",
    headline: "暂时等条件的是中止，依法结束本案的是终结。",
    paragraphs: [
      "财产诉讼中一方死亡，需要等待继承人表明是否参加时，中止诉讼；原因消除后恢复。死亡本身不等于财产争议消失。",
      "离婚案件一方死亡，应终结诉讼，继承人不能接替死者继续要求离婚。这和财产诉讼等待继承人的处理不同。",
    ],
    pitfall: "看到当事人死亡就一律终结，或者在离婚案件中等待继承人接着打官司。",
  },
  {
    id: "civpro-gap-arbitration-nonexecution",
    chapterId: "CIVPRO-GAP-ARBITRATION-NONEXECUTION",
    title: "仲裁裁决不予执行",
    headline: "一裁终局仍有法定审查，不予执行后可重新选择解决途径。",
    paragraphs: [
      "国内仲裁裁决进入执行后，被申请人可提出法定不予执行事由及证据。法院经合议庭核实裁决所据证据伪造等事由，应裁定不予执行；仅说判得不公平不够。",
      "裁决被依法裁定不予执行后，可以起诉，也可以按双方重新达成的仲裁协议申请仲裁。不能单凭原协议要求同一争议再仲裁，也不表示债务已被免除。",
    ],
    pitfall: "把不予执行当作普通上诉，或认为原仲裁条款足以自动启动第二次仲裁。",
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
export const civilProcedureGapFillTopics: FaultTopic[] = topicDrafts.map(
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
export const civilProcedureGapFillChapters = topicDrafts.map((topic) => ({
  id: topic.chapterId,
  title: topic.title,
  section: "民事诉讼法",
  topicIds: [topic.id],
}));
export const civilProcedureGapFillExercises =
  civilProcedureGapFillTopics.flatMap((topic) => topic.exercises);
export const civilProcedureGapFillContentPack = {
  revision: civilProcedureGapFillRevision,
  snapshot: {
    topics: civilProcedureGapFillTopics,
    sources: civilProcedureGapFillSources,
  },
};
export const civilProcedureGapFillDefaultQueues = {
  objective: civilProcedureGapFillExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureGapFillExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureGapFillQuestion(id: string) {
  const question = civilProcedureGapFillExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilProcedureGapFillTopicForQuestion(id: string) {
  return civilProcedureGapFillTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilProcedureGapFillSameCaseQuestions(id: string) {
  const question = civilProcedureGapFillQuestion(id);
  return question
    ? structuredClone(
        civilProcedureGapFillExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilProcedureGapFillChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilProcedureGapFillChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilProcedureGapFillTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
