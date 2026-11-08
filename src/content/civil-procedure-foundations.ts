import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

// Ten original fictional cases, paired as choice and full written forms.
export const civilProcedureFoundationsRevision =
  "civil-procedure-foundations-2026-10-28.v1";
export const civilProcedureFoundationsSources: ContentSources = {
  "civpro-foundations-claims": {
    title: "《民事诉讼法》第13、54条：处分、抗辩与反诉",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-28核对2023年修正、2024-01-01施行全文。原告处分自己的请求，被告可反驳或另提反诉；原创教学案例，不是官方试题。",
  },
  "civpro-foundations-counterclaim": {
    title: "《民诉法解释》第232、233条：反诉时间与关联",
    url: "https://www.court.gov.cn/fabu/xiangqing/353651.html",
    note: "2026-10-28核对2022修正官方全文。法庭辩论结束前提出；同一法律关系、请求有因果联系或相同事实的合并，无关联或应由其他法院专属管辖的反诉不予受理并告知另诉。",
  },
  "civpro-foundations-composition": {
    title: "《民事诉讼法》第40—43条：独任与合议",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-28核对。基层符合条件的一审可以独任，发回重审必须另行组成合议庭；双方同意不排除法定限制。",
  },
  "civpro-foundations-retrial-personnel": {
    title: "《民诉法解释》第45条：重审另行组成合议庭",
    url: "https://www.court.gov.cn/fabu/xiangqing/353651.html",
    note: "2026-10-28核对2022修正全文。参加过一个审判程序的人员原则上不得再参加该案其他程序；题设只考二审发回重审，不扩到再审后再次上诉的例外。",
  },
  "civpro-foundations-recusal": {
    title: "《民事诉讼法》第47—49条：回避申请与决定",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-28核对。代理人的近亲属、开庭后得知事由、口头申请、院长决定以及决定前暂停参与分别判断；题设不含紧急措施和复议阶段。",
  },
  "civpro-foundations-level": {
    title: "《民事诉讼法》第18—21条：级别管辖",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-28核对。基层一审为原则，中院等法定范围为例外；不将所有涉外案件归为重大涉外。题设给定适用管辖安排，不教授未经核定的地方金额门槛。",
  },
  "civpro-foundations-foreign-level": {
    title: "《最高人民法院关于涉外民商事案件管辖若干问题的规定》第1—4、6条",
    url: "https://www.court.gov.cn/zixun/xiangqing/379181.html",
    note: "法释〔2022〕18号，2023-01-01施行，2026-10-28核对正式全文。基层原则及中院、高院、集中和特别管辖例外；不把普通金额较小的涉外案件称为适用小额诉讼。",
  },
  "civpro-foundations-level-transfer": {
    title: "《民事诉讼法》第39条及《民诉法解释》第42条：上级法院向下交审",
    url: "https://www.court.gov.cn/fabu/xiangqing/353651.html",
    note: "2026-10-28核对现行民诉法第39条与2022修正解释第42条。限尚未开庭、当事人人数众多且不便诉讼、确有必要下交；须报上级法院批准，批准后裁定交审。普通减额问题不纳本包，不引用废止批复。",
  },
  "civpro-foundations-agreement": {
    title: "《民事诉讼法》第35条：协议管辖",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-28核对。书面选择与争议有实际联系地点的法院，不违反级别和专属管辖；本包与2025批复结合，限非涉外普通财产权益争议。",
  },
  "civpro-foundations-jurisdiction-2025": {
    title: "《关于部分民事案件管辖适用法律有关问题的批复》第一至三项",
    url: "https://www.court.gov.cn/zixun/xiangqing/485241.html",
    note: "法释〔2025〕15号，2025-12-31施行；2026-10-28核对同页公告后正式五项全文。题目使用实际联系与能依法确定具体法院的地域约定；主题说明保留不得排除专门管辖要求，不以介绍稿代替正文。",
  },
  "civpro-foundations-transfer": {
    title: "《民事诉讼法》第37、130条：移送及管辖异议",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-28核对。受移送法院不得再次自行移送；答辩期间管辖异议成立的，应移送有管辖权法院。",
  },
  "civpro-foundations-designation": {
    title: "《民事诉讼法》第38条：指定管辖",
    url: "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html",
    note: "2026-10-28核对。法院之间管辖争议先协商，协商不成报共同上级；与两个法院均有管辖权时原告通常可选择不同。",
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
    id: "civpro-foundations-payment-counterclaim",
    topicId: "civpro-claims-counterclaim",
    title: "拒付尾款与另要赔偿",
    facts:
      "海辰公司起诉明川公司，要求支付同一批设备的尾款8万元。明川在答辩中提交转账凭证，称尾款已经付清，请求驳回海辰的请求。同时，明川在一审法庭辩论结束前另交诉状，要求海辰赔偿该批设备质量问题造成的维修费2万元。两项争议都来自这份设备买卖合同，受诉法院对相关请求均有管辖权，不涉及专属管辖。",
    prompt:
      "明川的两项主张分别属于抗辩还是反诉？维修费请求应否与尾款请求合并审理？",
    reference:
      "“尾款已经付清”是抗辩，用来说明海辰不应再获付款。“另赔维修费2万元”是反诉，它要求法院判海辰向明川给付。维修费与尾款都来自同一份买卖合同，反诉又在法庭辩论结束前提出，应合并审理。能合并审理，并不表示维修费已经得到支持，仍要查明质量问题和损失。",
    answer: "b",
    options: [
      {
        text: "两项都是抗辩，法院无需处理赔偿请求。",
        explanation: "维修费请求要求原告向被告另作给付，有独立请求。",
      },
      {
        text: "尾款已付是抗辩，维修费是反诉；本案应合并审理。",
        explanation: "分别看是否只反驳原告请求，以及是否提出关联的独立请求。",
      },
      {
        text: "只要被告提出任何主张，就一律属于反诉。",
        explanation: "单纯反驳原告诉讼请求不等于反诉。",
      },
      {
        text: "维修费必须另行起诉，因为它与尾款的金额不同。",
        explanation: "金额不同不影响两项请求基于同一合同而合并审理。",
      },
    ],
    points: [
      {
        label: "分清抗辩与反诉",
        meaning:
          "说明尾款已付仅用于驳回原告请求，属于抗辩；要求原告另赔维修费是独立的反诉。",
        boundary:
          "不能把所有答辩意见都当作反诉，也不能把独立给付请求仅当作抗辩。",
      },
      {
        label: "关联反诉合并审理",
        meaning:
          "联系两项请求出自同一合同、反诉在法庭辩论结束前提出且不存在管辖障碍，说明应合并审理。",
        boundary: "只判断受理与合并，不要求预先认定维修费赔偿成立。",
      },
    ],
    sources: ["civpro-foundations-claims", "civpro-foundations-counterclaim"],
  },
  {
    id: "civpro-foundations-unrelated-counterclaim",
    topicId: "civpro-claims-counterclaim",
    title: "借款案中提出另一场事故",
    facts:
      "许林起诉陈松，请求返还借款6万元。陈松在一审法庭辩论结束前提出反诉，要求许林赔偿两年前骑车撞坏他相机的损失1万元。双方确认：借款与骑车事故分别发生，借款不是为赔偿该事故而形成，两件事没有其他联系。陈松要求法院判许林另外支付这1万元，并非只用它抵减借款。",
    prompt:
      "法院能否把相机赔偿请求作为本案反诉受理？陈松应通过什么途径主张该赔偿？",
    reference:
      "这项反诉不予受理，法院应告知陈松另行起诉。借款与骑车损坏相机来自两件独立的事，法律关系、事实和请求之间没有关联。虽然双方当事人相同，也在法庭辩论结束前提出，但这些还不足以把两件事放在同一案中审理。",
    answer: "d",
    options: [
      {
        text: "双方当事人相同，所有赔偿请求都应合并。",
        explanation: "相同当事人只是条件之一，还要审查请求之间的关联。",
      },
      {
        text: "在法庭辩论结束前提出，就必须作为反诉受理。",
        explanation: "提出时间合适不能替代关联性要求。",
      },
      {
        text: "不作为反诉受理，也不允许陈松另行起诉。",
        explanation: "本案不合并不等于否定其另行请求赔偿的诉权。",
      },
      {
        text: "裁定不予受理该反诉，告知陈松另行起诉。",
        explanation: "两项请求没有关联，另案处理事故赔偿。",
      },
    ],
    points: [
      {
        label: "本案不受理这项反诉",
        meaning: "联系借款与骑车事故互不关联，说明应裁定不予受理该反诉。",
        boundary: "不能仅凭当事人相同或提出时间适当就认定可以合并。",
      },
      {
        label: "赔偿请求另行起诉",
        meaning:
          "说明法院应告知陈松就相机损失另行起诉，不因本案不受理反诉就认定赔偿权消灭。",
        boundary: "题干是请求另外给付，不考查抵销抗辩是否成立。",
      },
    ],
    sources: ["civpro-foundations-counterclaim"],
  },
  {
    id: "civpro-foundations-remand-panel",
    topicId: "civpro-court-composition-recusal",
    title: "发回重审后还由原法官审吗",
    facts:
      "一件买卖纠纷一审由周法官独任审理。二审法院撤销原判，将案件发回原基层法院重审。双方都希望快些结束，书面同意仍由熟悉材料的周法官一人审理。法院正准备确定重审的审判组织。",
    prompt: "能否依双方同意，仍由周法官独任审理？重审应怎样组成审判组织？",
    reference:
      "不能继续由周法官独任审理。发回重审必须另行组成合议庭，原来参加一审的周法官也不能再参加这次重审。双方同意尽快处理，不能改变这项审判组织要求。",
    answer: "a",
    options: [
      {
        text: "另行组成合议庭，周法官不再参加本次重审。",
        explanation: "发回重审要求另组合议庭，原审参加人员不得再参加。",
      },
      {
        text: "双方都同意，就可由周法官继续独任。",
        explanation: "当事人同意不能排除发回重审的法定组织要求。",
      },
      {
        text: "另找一位法官独任即可，无需合议庭。",
        explanation: "更换一名法官仍不满足另行组成合议庭的要求。",
      },
      {
        text: "只要把周法官改为审判长，再加两人就可以。",
        explanation: "原来参加一审的人员不能通过改变庭内职务继续参加重审。",
      },
    ],
    points: [
      {
        label: "重审另组合议庭",
        meaning: "联系二审发回重审，说明须另行组成合议庭，不能再由一人独任。",
        boundary: "当事人同意、案件材料熟悉或追求效率均不能替代合议庭。",
      },
      {
        label: "原审法官不再参加",
        meaning: "说明周法官曾参加本案一审，不能再参加该案发回重审的审理。",
        boundary: "只说换成合议庭而仍让原法官参加，未答到人员应更换这一点。",
      },
    ],
    sources: [
      "civpro-foundations-composition",
      "civpro-foundations-retrial-personnel",
    ],
  },
  {
    id: "civpro-foundations-judge-recusal",
    topicId: "civpro-court-composition-recusal",
    title: "开庭后才知道法官与律师的关系",
    facts:
      "合议庭审理一件租金纠纷。原告在第一次开庭后才得知，参加审理的赵法官是被告委托律师的亲姐姐。案件尚未结束法庭辩论，也没有需要赵法官采取紧急措施的事项。原告随即向法院口头说明上述关系，申请赵法官回避。赵法官不是法院院长。",
    prompt:
      "原告此时口头申请回避是否可以？由谁决定，在决定作出前赵法官应否继续参与本案？",
    reference:
      "可以申请。赵法官是对方律师的近亲属，应当回避；原告是在开庭后才知道这层关系，只要在法庭辩论终结前提出即可，也可以口头申请。是否回避由院长决定。决定作出前，赵法官应暂停参与本案，本题没有紧急事项的例外。",
    answer: "c",
    options: [
      {
        text: "已经开庭，任何回避申请都已过期。",
        explanation: "开庭后才知道回避事由的，仍可在法庭辩论终结前提出。",
      },
      {
        text: "只能书面申请，口头提出的无须处理。",
        explanation: "法律允许口头或者书面申请回避。",
      },
      {
        text: "申请可以提出，由院长决定；决定前赵法官暂停参与。",
        explanation: "近亲属关系、申请时间和程序均应分别判断。",
      },
      {
        text: "赵法官自行决定申请是否成立，并照常审到判决。",
        explanation: "审判人员的回避由院长决定，决定前原则上暂停参与本案。",
      },
    ],
    points: [
      {
        label: "回避理由与申请有效",
        meaning:
          "联系法官与对方代理人是近亲属、开庭后才知情且尚未辩论终结，说明此时可口头申请回避。",
        boundary:
          "不能把开始审理后发现的事由一律当成申请过期，也不能强求书面。",
      },
      {
        label: "院长决定并暂停参与",
        meaning: "说明由院长决定赵法官是否回避，在决定前赵法官暂停参与本案。",
        boundary: "本题没有紧急措施；不考对回避决定不服的复议阶段。",
      },
    ],
    sources: ["civpro-foundations-recusal"],
  },
  {
    id: "civpro-foundations-foreign-ordinary",
    topicId: "civpro-level-jurisdiction",
    title: "有外国公司就必须去中院吗",
    facts:
      "一家境内贸易公司起诉外国公司，要求支付12万元普通货款。双方对交易经过无争议，案件不复杂，也没有重大影响。本案金额低于当地适用的中院一审金额标准，不涉及跨区域集中管辖，也不属于知识产权、海事海商等特别管辖案件。原告却提出：只要被告是外国公司，一审就必须由中级法院审理。",
    prompt:
      "原告关于一审法院级别的说法是否正确？本案应按什么原则确定级别管辖？",
    reference:
      "原告说得不对，普通涉外民商事案件并非一律由中院一审。本案金额较小、案情不复杂、没有重大影响，题设也已排除特别和集中管辖障碍，应由有管辖权的基层法院受理。判断级别要看法定范围和适用标准，不能只看一方是不是外国公司。",
    answer: "b",
    options: [
      {
        text: "只要有外国公司参加，就一律由中院一审。",
        explanation: "有涉外因素与属于中院管辖的重大涉外案件不同。",
      },
      {
        text: "本案由有管辖权的基层法院受理，涉外身份本身不足以升到中院。",
        explanation: "结合案情和已给定的管辖安排确定，不按国籍一刀切。",
      },
      {
        text: "外国公司是被告，必须直接向最高法院起诉。",
        explanation: "外国公司的身份不能直接决定最高法院一审。",
      },
      {
        text: "普通涉外案件只能仲裁，人民法院不能受理。",
        explanation: "是否属于法院受理范围不能这样由涉外身份直接否定。",
      },
    ],
    points: [
      {
        label: "涉外不等于中院一审",
        meaning:
          "指出外国公司作为当事人不当然使案件成为中院一审案件，否定原告的一刀切说法。",
        boundary: "不能把所有涉外民商事案件都当成重大涉外案件。",
      },
      {
        label: "本案适用基层管辖",
        meaning:
          "结合金额、复杂程度、影响以及题设给定的适用安排，说明本案由有管辖权的基层法院受理。",
        boundary:
          "不要求背诵各地区金额门槛；不把金额较小误作适用小额诉讼程序。",
      },
    ],
    sources: ["civpro-foundations-level", "civpro-foundations-foreign-level"],
  },
  {
    id: "civpro-foundations-downward-transfer",
    topicId: "civpro-level-jurisdiction",
    title: "中院能自行把一审交给基层吗",
    facts:
      "一件普通民事案件依法由中级法院一审，已经受理，尚未开庭。案件当事人人数众多，多数住在该市一个偏远县，往返中院参加诉讼很不方便。中院认为确有必要交该县基层法院审理，各方当事人也表示同意。中院尚未向其上级高院报批，准备直接向县法院发出交审裁定。",
    prompt:
      "中院能否仅凭各方同意直接把案件交给县法院？依法下交应履行什么审批程序？",
    reference:
      "不能直接下交。即使人数众多、参加诉讼不便，也有当事人同意，中院仍须报请其上级高院批准。获批后，再作出裁定把案件交给该县基层法院审理。双方同意不能替代法定审批。",
    answer: "d",
    options: [
      {
        text: "各方当事人同意，中院就可以直接交县法院审理。",
        explanation: "当事人同意不能替代上级法院批准。",
      },
      {
        text: "只需县法院院长同意，无须向高院报批。",
        explanation: "批准主体是中院的上级法院，不是接收案件的县法院。",
      },
      {
        text: "法律一律禁止中院把自己管辖的一审案件交基层审理。",
        explanation: "确有必要且依法获批的，可以下交。",
      },
      {
        text: "先报上级高院批准，获批后再裁定交县法院审理。",
        explanation: "本案情形可依法报请下交，但不能省略批准程序。",
      },
    ],
    points: [
      {
        label: "不能仅凭同意自行下交",
        meaning:
          "说明中院不能仅凭当事人同意或诉讼不便就自行下交，也不是一概禁止依法下交。",
        boundary:
          "不能以便利为由省略审批；不要求重新判断题设已确定的原始级别管辖。",
      },
      {
        label: "向高院报批后裁定交审",
        meaning:
          "联系确有必要下交及中院的层级，说明须报其上级高院批准，获批后再裁定交县基层法院审理。",
        boundary:
          "不把县法院同意或中院院长决定当作上级批准；无需背诵报批天数。",
      },
    ],
    sources: ["civpro-foundations-level-transfer"],
  },
  {
    id: "civpro-foundations-agreement-district",
    topicId: "civpro-jurisdiction-agreement",
    title: "合同只写了管辖地域",
    facts:
      "两家境内公司在甲市松林区当面签订纸质设备买卖合同，另有手写条款：发生争议，由甲市松林区有管辖权的人民法院处理。双方盖章确认。2026年因普通货款发生纠纷，按案件性质、金额及当地安排，可以确定由松林区人民法院一审，不涉及专属或专门管辖。被告称条款没有写法院全称，应当无效。",
    prompt: "被告的理由能否成立？应否按这份协议确定管辖？",
    reference:
      "不能只因没写法院全称就认定无效。松林区是实际签订合同的地点，与争议有联系；条款写明地域后，结合案件性质和金额，也能确定松林区人民法院。应按这份协议确定管辖。",
    answer: "a",
    options: [
      {
        text: "协议有效，应由能依法确定的松林区人民法院管辖。",
        explanation: "实际签约地有联系，地域约定足以确定具体法院。",
      },
      {
        text: "缺少法院完整名称，协议一定无效。",
        explanation: "能根据地域和法定规则确定法院时，不必机械要求全称。",
      },
      {
        text: "只能约定被告住所地法院，不能约定签约地法院。",
        explanation: "合同签订地也是法律允许的实际联系地点。",
      },
      {
        text: "条款有效，因此可以忽略级别管辖任意选法院。",
        explanation: "有效约定仍须服从级别、专属和专门管辖规则。",
      },
    ],
    points: [
      {
        label: "签约地具有实际联系",
        meaning: "联系双方在松林区实际签约，说明该地属于可协议选择的地点。",
        boundary:
          "不能把协议选择范围缩成仅被告住所地，也不能只凭写在合同里就假定实际联系。",
      },
      {
        label: "地域明确足以确定法院",
        meaning:
          "联系地域、案件性质及金额可以确定具体法院，说明不能仅因未写全称否定协议，应按约定管辖。",
        boundary:
          "题干已排除级别、专属和专门管辖障碍，不要求当事人补写法院全称。",
      },
    ],
    sources: [
      "civpro-foundations-agreement",
      "civpro-foundations-jurisdiction-2025",
    ],
  },
  {
    id: "civpro-foundations-agreement-unrelated",
    topicId: "civpro-jurisdiction-agreement",
    title: "只因交通方便而选法院",
    facts:
      "2026年，两家境内公司的普通家具买卖发生争议。双方住所、签约、交货以及家具所在地都在甲区或乙区。合同却约定由丙区法院管辖，只因为丙区高铁站方便。没有证据显示丙区与交易、财产或争议有其他实际联系。卖方在丙区法院起诉，买方在答辩期内提出管辖异议。丙区也不具有本案其他法定管辖依据。",
    prompt: "丙区法院能否仅凭合同条款管辖？买方异议成立后，应怎样处理案件？",
    reference:
      "不能。丙区仅仅交通方便，与这笔交易和争议没有实际联系，该管辖约定无效。买方及时提出异议，丙区又没有其他管辖依据，法院应将案件移送有管辖权的法院，按法定规则确定去哪里审理。双方签字同意本身不能补上实际联系。",
    answer: "c",
    options: [
      {
        text: "双方签过字，就可以选择全国任何法院。",
        explanation: "书面同意不能免除实际联系要求。",
      },
      {
        text: "交通方便就是法律上的实际联系，丙区应继续审。",
        explanation: "方便出行不等于该地点与争议存在实际联系。",
      },
      {
        text: "该约定无效；丙区应移送有管辖权的法院。",
        explanation: "约定没有实际联系，且本案不存在其他管辖依据。",
      },
      {
        text: "约定无效，所以卖方永远不能再起诉。",
        explanation: "管辖约定无效不等于实体请求或起诉权消失。",
      },
    ],
    points: [
      {
        label: "无实际联系的约定无效",
        meaning:
          "联系丙区只有交通便利、没有与争议实际联系的证据，说明该管辖协议无效。",
        boundary: "不能把双方书面同意、出行方便当作实际联系。",
      },
      {
        label: "依管辖异议移送",
        meaning:
          "联系买方及时异议、丙区无其他管辖依据，说明应移送有管辖权的法院，按法定规则处理。",
        boundary:
          "不要求背出甲乙具体哪一家；不能把协议无效等同于实体败诉或不能起诉。",
      },
    ],
    sources: [
      "civpro-foundations-agreement",
      "civpro-foundations-jurisdiction-2025",
      "civpro-foundations-transfer",
    ],
  },
  {
    id: "civpro-foundations-transfer-disagreement",
    topicId: "civpro-transfer-designation",
    title: "接到移送案件后仍有异议",
    facts:
      "甲区法院受理货款纠纷后，认定本院没有管辖权，依法作出移送裁定，将案件移送乙区法院。乙区法院收到材料后认为：甲区判断错误，本案应由同市丙区法院管辖。乙区准备直接把卷宗转寄丙区，不再报请上级法院处理。三家法院均为该市中级法院辖下的基层法院。",
    prompt:
      "乙区法院能否再自行把案件移送丙区？认为自己没有管辖权时应怎么处理？",
    reference:
      "不能再自行移送。乙区作为受移送法院应当接收案件；如果认为本院没有管辖权，应报请上级法院指定管辖，由上级法院解决分歧。不能把案卷在基层法院之间来回转送。",
    answer: "b",
    options: [
      {
        text: "只要乙区认为丙区有管辖权，就可以直接再移送。",
        explanation: "受移送法院有分歧时必须报请指定，不能再自行移送。",
      },
      {
        text: "乙区不得再自行移送，应报请上级法院指定管辖。",
        explanation: "通过指定管辖解决受移送法院的异议。",
      },
      {
        text: "乙区可以退还给原告，让原告重新选择法院起诉。",
        explanation: "不能以法院之间的管辖分歧让当事人重新起诉。",
      },
      {
        text: "乙区收到后只能无条件审到判决，不能提出管辖分歧。",
        explanation: "应当接收不等于不能报请上级法院指定管辖。",
      },
    ],
    points: [
      {
        label: "不得再次自行移送",
        meaning:
          "联系乙区是受移送法院，说明它不能直接再向丙区移送，也不能把案件退给原告重诉。",
        boundary: "不能把首次移送规则原样用于受移送法院的再次转送。",
      },
      {
        label: "报请上级指定",
        meaning: "说明乙区应接收案件，并将管辖分歧报请上级法院指定管辖。",
        boundary:
          "不要求乙区先作实体判决；报请指定不等于自行决定丙区必须受理。",
      },
    ],
    sources: ["civpro-foundations-transfer"],
  },
  {
    id: "civpro-foundations-common-superior",
    topicId: "civpro-transfer-designation",
    title: "两家法院协商不成",
    facts:
      "同一市的东区法院与西区法院就一件民事案件应由谁管辖发生争议。双方已经协商，仍不能达成一致。两家都是基层法院，共同的直接上级是该市中级人民法院。东区提出由本院院长最后决定，西区则主张让原告在两家之间任选一家，直接终结这场争议。",
    prompt:
      "这场争议应由谁解决，通过什么程序解决？两家法院提出的做法是否合适？",
    reference:
      "应报请两家法院的共同上级，也就是该市中级人民法院指定管辖。法院之间先协商，协商不成再报共同上级。单方院长不能替另一家法院作决定，也不能用让原告任选一家代替指定管辖。",
    answer: "d",
    options: [
      {
        text: "由东区法院院长决定，西区必须服从。",
        explanation: "同级法院之间不存在一方院长支配另一法院的关系。",
      },
      {
        text: "只要原告选一家，法院之间的争议就自动消失。",
        explanation: "这不是已确定两家都有管辖权时的通常选择问题。",
      },
      {
        text: "凡基层法院之间争议，均直接报最高人民法院。",
        explanation: "应按共同上级确定，不是一律逐级越过直接报最高法院。",
      },
      {
        text: "报请该市中级人民法院指定管辖。",
        explanation: "两家基层法院的管辖争议协商不成，由共同上级解决。",
      },
    ],
    points: [
      {
        label: "协商不成报请指定",
        meaning:
          "联系两院已经协商失败，说明应报请指定管辖，而非由单方或当事人代替解决。",
        boundary:
          "不把存在争议的情形混同于两个法院均有管辖权、原告通常可以选择的情形。",
      },
      {
        label: "找两院的共同上级",
        meaning:
          "联系两家基层法院均属同一市中院，说明应报该市中院，而非当然报最高法院。",
        boundary:
          "认可‘共同上级的市中级人民法院’等自然表述，不要求具体公文名称。",
      },
    ],
    sources: ["civpro-foundations-designation"],
  },
];

const topicDrafts = [
  {
    id: "civpro-claims-counterclaim",
    title: "诉讼请求、抗辩与反诉",
    chapterId: "CIVPRO-CLAIMS-COUNTERCLAIM",
    headline: "反驳对方的请求是抗辩，要求对方向自己给付可能是反诉。",
    paragraphs: [
      "原告可以放弃或变更自己的诉讼请求；被告既可以反驳，也可以另提反诉。只说欠款已付、不应再付，是抗辩；要求原告另赔一笔损失，是独立请求。",
      "反诉还要看关联与管辖：在法庭辩论结束前提出，基于相同法律关系、相关联的请求或相同事实，且不存在应由其他法院专属管辖等障碍的，可以合并审理。无关联的独立争议，应另行起诉。",
    ],
    pitfall: "把被告所有意见都叫反诉，或认为同一对当事人的任何争议都能合并。",
  },
  {
    id: "civpro-court-composition-recusal",
    title: "审判组织与回避",
    chapterId: "CIVPRO-COMPOSITION-RECUSAL",
    headline: "合议庭和回避要求由法律确定，双方同意不能全部替代。",
    paragraphs: [
      "基层法院符合条件的一审案件可以独任；发回重审则必须另行组成合议庭，原来参加审理的人员不再参加重审。",
      "法官是当事人或代理人的近亲属等情形，应当回避。开庭后才知道事由，可以在法庭辩论终结前口头或书面申请；决定前原则上暂停该人员参与本案。",
    ],
    pitfall:
      "把‘双方都同意’当作任何案件均可独任的理由，或认为开庭后发现的回避事由一律来不及提出。",
  },
  {
    id: "civpro-level-jurisdiction",
    title: "级别管辖与上级法院交审",
    chapterId: "CIVPRO-LEVEL-JURISDICTION",
    headline: "先依法确定法院级别；上级向下交审，也要走批准程序。",
    paragraphs: [
      "基层法院原则上管辖第一审民事案件，法律另有规定的除外。涉外身份不等于重大涉外案件，还须检查金额、复杂程度、影响和专门、集中管辖规定。",
      "上级法院确有必要把自己管辖的一审案件交下级审理，须报其上级法院批准。人数众多、不便诉讼等符合条件的案件，可以在开庭前依法报请，批准后裁定交审。",
    ],
    pitfall:
      "有外国公司就认为必须中院一审，或把各方同意当作可以自行改变法定管辖的依据。",
  },
  {
    id: "civpro-jurisdiction-agreement",
    title: "协议管辖的实际联系与明确程度",
    chapterId: "CIVPRO-JURISDICTION-AGREEMENT",
    headline: "选定地点要与争议有实际联系，条款能依法确定法院就有意义。",
    paragraphs: [
      "合同和其他财产权益纠纷可以书面选择与争议有实际联系地点的法院，但不能违反级别、专属、专门管辖。双方签字，不代表全国法院都能随意选。",
      "非涉外案件中，条款只写地域，但结合案件性质、金额能确定具体法院的，不能仅因没写法院全称就认定无效。选择法定列举五地之外的地点，却没有实际联系证据的，约定无效。",
    ],
    pitfall: "一边机械要求法院全称，一边又把任意地点的书面约定都认作有效。",
  },
  {
    id: "civpro-transfer-designation",
    title: "移送管辖与指定管辖",
    chapterId: "CIVPRO-TRANSFER-DESIGNATION",
    headline: "受移送法院有分歧，报上级解决；不能让案件来回转送。",
    paragraphs: [
      "法院发现受理案件不属于本院管辖，应移送有管辖权的法院。受移送法院应接收；认为自己仍无管辖权的，报请上级法院指定，不能再自行移送。",
      "法院之间发生管辖争议，先协商；协商不成，报共同上级法院指定。有管辖权的法院因特殊原因不能行使管辖权，也由上级法院指定。",
    ],
    pitfall:
      "让受移送法院继续转送，或把协商不成的争议交给一方院长、原告自行决定。",
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
export const civilProcedureFoundationsTopics: FaultTopic[] = topicDrafts.map(
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
export const civilProcedureFoundationsChapters = topicDrafts.map((topic) => ({
  id: topic.chapterId,
  title: topic.title,
  section: "民事诉讼法",
  topicIds: [topic.id],
}));
export const civilProcedureFoundationsExercises =
  civilProcedureFoundationsTopics.flatMap((topic) => topic.exercises);
export const civilProcedureFoundationsContentPack = {
  revision: civilProcedureFoundationsRevision,
  snapshot: {
    topics: civilProcedureFoundationsTopics,
    sources: civilProcedureFoundationsSources,
  },
};
export const civilProcedureFoundationsDefaultQueues = {
  objective: civilProcedureFoundationsExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureFoundationsExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureFoundationsQuestion(id: string) {
  const question = civilProcedureFoundationsExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilProcedureFoundationsTopicForQuestion(id: string) {
  return civilProcedureFoundationsTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilProcedureFoundationsSameCaseQuestions(id: string) {
  const question = civilProcedureFoundationsQuestion(id);
  return question
    ? structuredClone(
        civilProcedureFoundationsExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilProcedureFoundationsChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilProcedureFoundationsChapters.find(
    (c) => c.id === chapterId,
  );
  return chapter
    ? civilProcedureFoundationsTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
