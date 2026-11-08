import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

// Eight original fictional cases, each offered as a choice and a full written answer.
export const civilProcedurePartiesRevision =
  "civil-procedure-parties-2026-10-28.v1";
const law = "https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html";
const interpretation = "https://www.court.gov.cn/zixun/xiangqing/353651.html";
export const civilProcedurePartiesSources: ContentSources = {
  "civpro-parties-capacity": {
    title: "《民事诉讼法》第51、60条：当事人与法定代理",
    url: law,
    note: "2026-10-28定向核对2023年修正、2024-01-01施行的官方全文。第60条区分本人当事人地位与法定代理；多个已确定法定代理人互相推诿时，由法院指定其中一人。原创教学案例，不是官方试题。",
  },
  "civpro-parties-joint": {
    title: "《民事诉讼法》第55条：共同诉讼与诉讼行为效力",
    url: law,
    note: "2026-10-28核对。共同标的与同类标的分别判断；普通共同诉讼的合并须法院认为适当、当事人同意，独立权利义务下的诉讼行为不对其他人发生效力。",
  },
  "civpro-parties-joinder": {
    title: "《民诉法解释》第72—74条：共有人与必要共同诉讼人追加",
    url: interpretation,
    note: "2026-10-28核对最高法2022年修正全文。共有财产权受侵害时其余共有权人是共同诉讼人；既不愿参加又未放弃实体权利的，仍应追加。不是要求任何有经济联系的人都参加。",
  },
  "civpro-parties-third": {
    title: "《民事诉讼法》第59条：两类第三人",
    url: law,
    note: "2026-10-28核对。区分对原争议标的提出独立请求与案件结果存在法律上的利害关系。此包处理参加诉讼，不扩成生效裁判后的第三人撤销之诉。",
  },
  "civpro-parties-third-procedure": {
    title: "《民诉法解释》第81、82、237条：参加方式、上诉与原告撤诉",
    url: interpretation,
    note: "2026-10-28核对最高法2022年修正全文。有独立请求权第三人自行起诉参加；无独立请求权第三人可以申请或由法院通知参加，无管辖权异议权，被判承担民事责任时有上诉权。原告获准撤诉后，已参加的独立请求另案继续审理，不要求重新起诉。",
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
    id: "civpro-parties-child-camera",
    topicId: "civpro-litigation-capacity-legal-representation",
    title: "孩子的相机被借走以后",
    facts:
      "外祖父把一台相机赠给6岁的林禾，并已交付。邻居郑某向林禾借用相机，约定一周后归还，逾期多次催要仍不归还。林禾的母亲准备向法院起诉，要求郑某把相机还给林禾。",
    prompt: "诉状中应把谁列为原告？林禾的母亲应以什么身份参加诉讼？",
    reference:
      "林禾应当是原告，相机是他的，要追回的也是他的财产。母亲作为法定代理人，代林禾起诉和参加诉讼。林禾年幼不能自己实施诉讼行为，但仍然可以是这场诉讼的当事人。",
    answer: "b",
    options: [
      {
        text: "母亲是原告，因为实际办理起诉手续的是母亲。",
        explanation: "办理手续的人与请求返还财产的权利人可以不同。",
      },
      {
        text: "林禾是原告，母亲作为法定代理人代他诉讼。",
        explanation: "财产权属于孩子，母亲代表孩子实施诉讼行为。",
      },
      {
        text: "林禾和母亲必须一同列为共同原告。",
        explanation:
          "题中母亲没有自己的返还请求，法定代理不使她成为共同权利人。",
      },
      {
        text: "等林禾能够独立参加诉讼后，才能起诉。",
        explanation: "法定代理制度允许孩子现在就通过代理人参加诉讼。",
      },
    ],
    points: [
      {
        label: "林禾是原告",
        meaning: "联系相机属于林禾、请求返还其财产，说明林禾是原告。",
        boundary: "不能仅因母亲办手续就将母亲当作财产权人或共同原告。",
      },
      {
        label: "母亲代孩子诉讼",
        meaning: "说明6岁的林禾由母亲作为法定代理人实施诉讼行为。",
        boundary: "不能要求等成年后再起诉，也不要求孩子另签授权委托书。",
      },
    ],
    sources: ["civpro-parties-capacity"],
  },
  {
    id: "civpro-parties-guardians-decline",
    topicId: "civpro-litigation-capacity-legal-representation",
    title: "父母都说应该由对方出面",
    facts:
      "11岁的周宁遭商场坠落物砸伤，拟向商场请求赔偿。法院已查明周宁的父母均为其监护人，资格没有争议。父亲称自己出差多，应由母亲代孩子诉讼；母亲称父亲更熟悉事故，也不肯出面。双方一直互相推诿，尚未委托其他代理人。",
    prompt:
      "法院应怎样解决由谁代周宁诉讼的问题？这样处理会不会改变周宁的原告身份？",
    reference:
      "法院应在父母中指定一人代周宁诉讼。两人都是已经确定的法定代理人，互相推诿时由法院作出指定，案件可以继续推进。原告仍是周宁，被指定的父亲或母亲是法定代理人。",
    answer: "d",
    options: [
      {
        text: "必须等父母自行协商一致，法院才能继续处理案件。",
        explanation: "多个法定代理人互相推诿时，法院可以指定其中一人。",
      },
      {
        text: "直接让周宁自行诉讼，父母均退出。",
        explanation: "周宁仍需由法定代理人代为实施诉讼行为。",
      },
      {
        text: "指定父母中一人，并把该人改列为原告。",
        explanation: "指定的是代理人，受侵害的权利仍属于周宁。",
      },
      {
        text: "指定父母中一人代为诉讼，周宁仍是原告。",
        explanation: "解决代理人推诿，不改变孩子的当事人地位。",
      },
    ],
    points: [
      {
        label: "法院指定其中一人",
        meaning:
          "联系父母均具备监护资格而互相推诿，说明法院应指定其中一人代为诉讼。",
        boundary: "此处不是监护资格争议，不要求先请居委会重新确定监护人。",
      },
      {
        label: "孩子仍是当事人",
        meaning: "说明指定父亲或母亲作法定代理人，周宁的原告身份不变。",
        boundary: "不能把法定代理人的指定理解成更换原告或转让孩子的赔偿请求。",
      },
    ],
    sources: ["civpro-parties-capacity"],
  },
  {
    id: "civpro-parties-coowners-joinder",
    topicId: "civpro-joint-litigation",
    title: "只有一位共有人起诉",
    facts:
      "许川、许宁和许禾共同共有一座仓库，产权登记也载明三人的名字。邻居在仓库院内砌墙，占去了部分共用场地。许川起诉要求拆墙、恢复场地。许宁和许禾收到法院联系后表示：不想来回跑法院，但也没有放弃对这处共有财产的权利。",
    prompt: "许宁和许禾应否参加本案？他们不愿来法院，是否就可以不列为当事人？",
    reference:
      "应将许宁、许禾追加为共同原告。这场诉讼涉及三人的共有财产权，属于必要共同诉讼。他们虽然不愿出庭，却没有放弃实体权利，仍应列为共同原告；不参加诉讼不妨碍法院依法审理和判决。",
    answer: "a",
    options: [
      {
        text: "应追加二人为共同原告；不愿参加且未放弃实体权利，仍应列入。",
        explanation: "共有财产权受到侵害，其他共有权人应参加必要共同诉讼。",
      },
      {
        text: "只要许川起诉，就已经代表另外两人，无需列明二人。",
        explanation: "共有人起诉不等于自动取得代表所有共有人的诉讼资格。",
      },
      {
        text: "二人不愿出庭，应一律按放弃共有财产权处理。",
        explanation: "不愿参加诉讼与放弃实体权利不同，本案二人明确没有放弃。",
      },
      {
        text: "须取得二人同意合并后，才能让他们成为共同原告。",
        explanation: "把必要共同诉讼误用了普通共同诉讼的同意合并条件。",
      },
    ],
    points: [
      {
        label: "其余共有人应参加",
        meaning:
          "联系共有财产权受侵害，认定必要共同诉讼，应追加其他两人为共同原告。",
        boundary: "不将许川单独起诉理解为自动代表另外两名共有人。",
      },
      {
        label: "不出庭不等于放弃权利",
        meaning:
          "联系二人未放弃实体权利，说明即使不愿参加仍应列为共同原告，其不参加不妨碍审理。",
        boundary: "可以合并说明追加与继续审理；不要求计算共有份额或赔偿金额。",
      },
    ],
    sources: ["civpro-parties-joint", "civpro-parties-joinder"],
  },
  {
    id: "civpro-parties-separate-buyers",
    topicId: "civpro-joint-litigation",
    title: "一起审理的两份买卖合同",
    facts:
      "程安和杜越各自向同一家商店购买一台打印机，分别签约、付款，彼此没有共同购买或共同付款安排。两人分别以自己的机器存在质量问题为由起诉要求退货退款。法院认为合并审理适当，三方均同意。庭审中，程安承认自己的机器没有质量问题并撤回请求，杜越仍坚持自己的机器有故障。",
    prompt:
      "本案属于哪一种共同诉讼？程安的承认和撤回请求，会不会直接约束杜越？",
    reference:
      "这是普通共同诉讼。两人各有独立的买卖合同和退款请求，只因争议属于同一种类，才在法院认为适当、当事人同意后合并审理。程安的承认和撤回只影响他自己的请求，杜越的请求仍应独立审理。",
    answer: "c",
    options: [
      {
        text: "这是必要共同诉讼，程安的承认也对杜越发生效力。",
        explanation: "两人各有独立合同与权利义务，并非共同享有同一请求。",
      },
      {
        text: "这是普通共同诉讼，但同意合并就意味着接受对方的一切诉讼行为。",
        explanation: "同意合并审理不等于把独立的权利义务合成一项。",
      },
      {
        text: "这是普通共同诉讼，程安的行为不直接约束杜越。",
        explanation:
          "权利义务独立时，一人的诉讼行为不对其他共同诉讼人发生效力。",
      },
      {
        text: "只要程安撤回请求，合并审理的两个请求就都应结束。",
        explanation: "杜越没有撤回请求，他的案件仍需独立判断。",
      },
    ],
    points: [
      {
        label: "同类请求合并审理",
        meaning:
          "联系各自独立的合同、同类请求及法院和当事人同意，认定普通共同诉讼。",
        boundary: "不能只因被告相同或一起开庭就认定必要共同诉讼。",
      },
      {
        label: "程安的行为不约束杜越",
        meaning:
          "说明二人权利义务独立，程安的承认和撤回不直接影响杜越的请求，该请求继续独立审理。",
        boundary: "不因合并审理推定杜越也承认无故障或已撤诉。",
      },
    ],
    sources: ["civpro-parties-joint"],
  },
  {
    id: "civpro-parties-painting-claim",
    topicId: "civpro-third-independent-claim",
    title: "争画的人又来了一位",
    facts:
      "甲起诉乙，请求返还一幅山水画；乙称该画已经由甲卖给自己。审理期间，丙拿出购买凭证和寄存记录，主张画一直是自己的，只是交给甲保管，要求取回这幅画。法院尚未认定画的所有权。",
    prompt:
      "丙若要法院审理自己的返还请求，应以什么诉讼地位、通过什么方式参加本案？",
    reference:
      "丙可以作为有独立请求权的第三人，向受诉法院起诉，以甲、乙为被告，请求返还画作。他主张的是自己对这幅画的权利，与甲、乙的主张相冲突。参加诉讼后，画到底归谁仍要由法院审理认定。",
    answer: "d",
    options: [
      {
        text: "丙只能作为证人，帮助法院决定甲乙谁胜诉。",
        explanation: "丙提出了自己的返还请求，不只是提供证言。",
      },
      {
        text: "丙只要申请成为无独立请求权第三人，就能据此要求法院判画归自己。",
        explanation:
          "丙对争议画作提出独立权利主张，应以起诉方式提出自己的请求。",
      },
      {
        text: "丙必须等甲乙案件判决生效后，再提出自己的权利主张。",
        explanation: "审理期间即可通过独立请求参加，不必等到裁判生效。",
      },
      {
        text: "丙可作为有独立请求权第三人，向受诉法院起诉甲乙，请求返还画作。",
        explanation: "他对原案争议标的主张自己的独立权利。",
      },
    ],
    points: [
      {
        label: "提出的是自己的独立请求",
        meaning:
          "联系丙主张画属于自己并要求返还，认定有独立请求权第三人的地位。",
        boundary: "认可实质表达，不要求仅背名称；地位判断不等于已认定画归丙。",
      },
      {
        label: "向受诉法院起诉参加",
        meaning:
          "说明丙应向正在审理本案的法院，对甲乙双方提出自己的返还请求，以起诉方式参加。",
        boundary:
          "不能仅作为证人或只依附其中一方；不能将法院强制通知丙提出独立诉请当作参加方式。",
      },
    ],
    sources: ["civpro-parties-third", "civpro-parties-third-procedure"],
  },
  {
    id: "civpro-parties-withdrawal-independent",
    topicId: "civpro-third-independent-claim",
    title: "原告撤诉，第三人的请求怎么办",
    facts:
      "陆某起诉赵某，要求返还一张古琴。吴某主张古琴属于自己，已向同一法院起诉陆某、赵某，要求二人返还，法院已受理其请求并让其作为有独立请求权第三人参加。后来陆某申请撤诉，法院准许。吴某没有撤回自己的请求。",
    prompt:
      "陆某获准撤诉后，吴某的请求应怎样处理？继续审理时，三人的诉讼地位分别是什么？",
    reference:
      "吴某的请求应继续审理，无须重新起诉。吴某成为另案原告，陆某、赵某成为另案被告。陆某撤回的是自己的请求，吴某已经提出的独立请求仍然存在。",
    answer: "b",
    options: [
      {
        text: "原告撤诉使整案结束，吴某须重新提交起诉状才能主张权利。",
        explanation:
          "独立请求已经受理，原告撤诉后可直接按新的诉讼地位继续审理。",
      },
      {
        text: "继续审理吴某的请求，吴某为另案原告，陆某和赵某为另案被告。",
        explanation: "原告撤诉不使第三人已经提出的独立请求一并消失。",
      },
      {
        text: "吴某直接替代陆某成为原告，只有赵某继续作被告。",
        explanation: "吴某原本对陆某、赵某双方提出请求，二人均成为另案被告。",
      },
      {
        text: "陆某可以代吴某一并撤回请求，吴某无需另作表示。",
        explanation: "吴某的独立请求不能由陆某处分。",
      },
    ],
    points: [
      {
        label: "独立请求继续审理",
        meaning:
          "说明吴某已提出并被受理的独立请求继续审理，无须因陆某撤诉而重新起诉。",
        boundary: "不把陆某撤诉理解为吴某的请求也自动撤回。",
      },
      {
        label: "转换后的原被告",
        meaning: "明确吴某为另案原告，原来的陆某和赵某双方均为另案被告。",
        boundary: "不能遗漏陆某的被告地位；可用自然语言表达角色转换。",
      },
    ],
    sources: ["civpro-parties-third", "civpro-parties-third-procedure"],
  },
  {
    id: "civpro-parties-supplier-interest",
    topicId: "civpro-third-no-independent-claim",
    title: "供货商与买卖诉讼的关系",
    facts:
      "青屿酒店向景源公司购买冷柜，使用后多次停机。酒店起诉景源公司，请求退货并赔偿损失，景源公司认为故障来自明河公司供应的压缩机。两公司的供货合同约定：若压缩机质量问题导致景源向客户退赔，明河应向景源承担相应责任。明河否认压缩机存在缺陷，想参加酒店与景源之间的诉讼，但不主张冷柜或酒店付款归自己所有。",
    prompt: "明河可否作为第三人参加本案？属于哪一类第三人，依据是什么？",
    reference:
      "明河可以申请作为无独立请求权第三人参加，法院也可以通知它参加。它没有对酒店与景源争议的财产提出自己的独立请求，但压缩机是否有缺陷、景源是否须向客户退赔，会影响供货合同约定的追偿责任，因此本案处理结果与它有法律上的利害关系。是否最终需要追偿、承担多少责任，仍要依法审理。",
    answer: "a",
    options: [
      {
        text: "可作为无独立请求权第三人参加，本案结果会影响其对景源的合同责任。",
        explanation: "参与依据是具体的法律利害关系，而不是一般供货往来。",
      },
      {
        text: "应作为有独立请求权第三人，因为明河否认压缩机有缺陷。",
        explanation: "反对缺陷认定不等于对原案争议标的提出自己的独立请求。",
      },
      {
        text: "只要酒店没有把明河列为被告，明河就只能作证，不能参加诉讼。",
        explanation:
          "有法律上利害关系而无独立请求时，仍可以申请或经法院通知参加。",
      },
      {
        text: "明河参加就必然与景源共同向酒店承担退赔责任。",
        explanation:
          "参加诉讼的地位不直接决定实体责任，更不能直接推出共同退赔。",
      },
    ],
    points: [
      {
        label: "无独立请求权第三人",
        meaning:
          "说明明河没有独立请求，但可申请或由法院通知，以无独立请求权第三人身份参加。",
        boundary:
          "对缺陷认定持异议不等于提出独立财产权请求；不要求两种参加方式都逐字列出。",
      },
      {
        label: "结果影响合同追偿责任",
        meaning:
          "联系压缩机缺陷及客户退赔会触发上游供货合同责任，说明其与本案结果存在法律上利害关系。",
        boundary:
          "只有一般商业往来或关心胜负不足以说明这一关系；不要求在本题先判明河最终赔偿。",
      },
    ],
    sources: ["civpro-parties-third", "civpro-parties-third-procedure"],
  },
  {
    id: "civpro-parties-third-appeal",
    topicId: "civpro-third-no-independent-claim",
    title: "被判承担责任的第三人",
    facts:
      "某设备合同纠纷采用一审普通程序审理，恒川厂已依法作为无独立请求权第三人参加。开庭前，恒川厂以法院没有地域管辖权为由提出管辖权异议。后来一审判决恒川厂承担2万元民事责任，恒川厂不服，准备在法定期间内上诉。原告称：“第三人既然不能提管辖权异议，也不能上诉。”",
    prompt:
      "恒川厂是否有权提出上述管辖权异议？对判令自己承担责任的一审判决，能否上诉？",
    reference:
      "恒川厂没有管辖权异议权，但可以上诉。它是无独立请求权第三人，依法不能提出管辖权异议；一审判决已要求它承担民事责任，它可以通过上诉争议这项责任。这两种权利应分别判断。",
    answer: "c",
    options: [
      {
        text: "既然可能承担责任，就当然可以提出管辖权异议，也可以上诉。",
        explanation:
          "无独立请求权第三人没有管辖权异议权，不能从可能承担责任推出该权利。",
      },
      {
        text: "两项权利都没有，第三人只能接受一审处理。",
        explanation: "被判承担民事责任的无独立请求权第三人有权上诉。",
      },
      {
        text: "没有管辖权异议权，但可对判令自己承担责任的一审判决上诉。",
        explanation: "参加地位与被判责任后的上诉救济，应分开判断。",
      },
      {
        text: "可以提出管辖权异议，但只有原告、被告能对责任判决上诉。",
        explanation: "把两种权利的规则颠倒了。",
      },
    ],
    points: [
      {
        label: "无管辖权异议权",
        meaning: "根据恒川厂无独立请求权第三人的身份，说明其没有管辖权异议权。",
        boundary: "不能把地域管辖可能有争议当作它当然享有异议权的依据。",
      },
      {
        label: "被判担责可以上诉",
        meaning: "联系一审已判恒川厂承担2万元民事责任，说明它可以上诉。",
        boundary:
          "不能从没有管辖权异议权推导没有上诉权；不要求评价2万元实体责任是否正确。",
      },
    ],
    sources: ["civpro-parties-third-procedure"],
  },
];

const topicDrafts = [
  {
    id: "civpro-litigation-capacity-legal-representation",
    title: "诉讼行为能力与法定代理",
    chapterId: "CIVPRO-LITIGATION-CAPACITY",
    headline: "孩子可以是当事人，由法定代理人代他诉讼。",
    paragraphs: [
      "谁的权利需要保护，先看谁是当事人。孩子的财产权受侵害，孩子可以是原告。",
      "无诉讼行为能力的人，由监护人作为法定代理人代为诉讼。法定代理人有数人而互相推诿时，法院指定其中一人。",
    ],
    pitfall: "把出面办手续的父母当作原告，或以孩子年幼为由要求等到成年。",
  },
  {
    id: "civpro-joint-litigation",
    title: "必要与普通共同诉讼",
    chapterId: "CIVPRO-JOINT-LITIGATION",
    headline: "共同标的要一起审，同类请求合并后仍可能各自独立。",
    paragraphs: [
      "共有财产权受侵害等需要共同审理的案件，遗漏的必要共同诉讼人应追加。应追加的原告既不愿参加又未放弃实体权利，仍应列入。",
      "各有独立权利义务、争议仅属同一种类时，法院认为合并适当且当事人同意，可以合并为普通共同诉讼。其中一人的诉讼行为不对其他人发生效力。",
    ],
    pitfall: "只因一同开庭就认为一人的承认、撤回请求会约束所有人。",
  },
  {
    id: "civpro-third-independent-claim",
    title: "有独立请求权第三人",
    chapterId: "CIVPRO-THIRD-INDEPENDENT",
    headline: "对原案争议标的提出自己的请求，通过起诉参加。",
    paragraphs: [
      "第三人认为原、被告争议的财产属于自己，可以向受诉法院起诉原案双方，提出独立请求。能参加诉讼不等于实体主张已经成立。",
      "独立请求第三人已经参加后，原告获准撤诉，其请求仍继续审理：第三人成为另案原告，原案双方成为另案被告。",
    ],
    pitfall: "把独立请求第三人当成证人，或认为原告撤诉后他的请求也自动结束。",
  },
  {
    id: "civpro-third-no-independent-claim",
    title: "无独立请求权第三人",
    chapterId: "CIVPRO-THIRD-NO-INDEPENDENT",
    headline: "没有自己的独立请求，但案件结果影响其法律上的权利义务。",
    paragraphs: [
      "第三人对原案争议标的不提出独立请求，但案件结果与其有法律上利害关系，可以申请参加或由法院通知参加。一般商业往来、关心胜负还不够。",
      "无独立请求权第三人没有管辖权异议权；被一审判决承担民事责任时，有权上诉。参加诉讼与最终担责是两回事。",
    ],
    pitfall:
      "把一般经济联系当成法律利害关系，或把没有管辖权异议权理解成不能上诉。",
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
export const civilProcedurePartiesTopics: FaultTopic[] = topicDrafts.map(
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
export const civilProcedurePartiesChapters = topicDrafts.map((topic) => ({
  id: topic.chapterId,
  title: topic.title,
  section: "民事诉讼法",
  topicIds: [topic.id],
}));
export const civilProcedurePartiesExercises =
  civilProcedurePartiesTopics.flatMap((topic) => topic.exercises);
export const civilProcedurePartiesContentPack = {
  revision: civilProcedurePartiesRevision,
  snapshot: {
    topics: civilProcedurePartiesTopics,
    sources: civilProcedurePartiesSources,
  },
};
export const civilProcedurePartiesDefaultQueues = {
  objective: civilProcedurePartiesExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedurePartiesExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedurePartiesQuestion(id: string) {
  const question = civilProcedurePartiesExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilProcedurePartiesTopicForQuestion(id: string) {
  return civilProcedurePartiesTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function civilProcedurePartiesSameCaseQuestions(id: string) {
  const question = civilProcedurePartiesQuestion(id);
  return question
    ? structuredClone(
        civilProcedurePartiesExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilProcedurePartiesChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = civilProcedurePartiesChapters.find((c) => c.id === chapterId);
  return chapter
    ? civilProcedurePartiesTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
