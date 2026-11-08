import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

// Sixteen original cases: jurisdiction, defense guarantees and coercive measures.
export const criminalProcedureFoundationsRevision =
  "criminal-procedure-foundations-2026-10-31.v1";
export const criminalProcedureFoundationsSources: ContentSources = {
  "crimpro-foundation-jurisdiction": {
    title: "《刑事诉讼法》（2018年修正）第20、21、25、26条",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "2026-10-31核读。区分第一审法院级别与地域；居住地须审判更适宜，最初受理规则适用于数个有管辖权的同级法院。 本组为原创虚构教学案例，不是官方真题。",
  },
  "crimpro-foundation-recusal": {
    title: "《刑事诉讼法》（2018年修正）第29、31、32条",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "2026-10-31核读。区分普通办案人与机关负责人；侦查人员回避决定前不能停止侦查，驳回可申请复议一次。 本组为原创虚构教学案例，不是官方真题。",
  },
  "crimpro-foundation-aid": {
    title: "《刑事诉讼法》（2018年修正）第35、278条",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "2026-10-31核读。可能无期死刑与未成年人未委托辩护人时，应通知法律援助机构指派律师，不能只安排值班律师。 本组为原创虚构教学案例，不是官方真题。",
  },
  "crimpro-foundation-files": {
    title: "《刑事诉讼法》（2018年修正）第40条",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "2026-10-31核读。辩护律师从审查起诉起可查阅摘抄复制案卷；其他辩护人需法院、检察院许可。 本组为原创虚构教学案例，不是官方真题。",
  },
  "crimpro-foundation-evidence": {
    title: "《刑事诉讼法》（2018年修正）第42、43条",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "2026-10-31核读。取得不在犯罪现场等三类证据须及时告知；向被害人及其近亲属、其提供的证人取证须法院检察院许可及本人同意。 本组为原创虚构教学案例，不是官方真题。",
  },
  "crimpro-foundation-summons": {
    title: "《刑事诉讼法》（2018年修正）第119条",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "2026-10-31核读。一般传唤拘传不超12小时，重大复杂且需拘留逮捕不超24小时；不得连续传唤拘传变相拘禁，须保证饮食和必要休息。 本组为原创虚构教学案例，不是官方真题。",
  },
  "crimpro-foundation-duration": {
    title: "《刑事诉讼法》（2018年修正）第79、99条",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "2026-10-31核读。取保最长12个月，监居最长6个月，期间不得中断侦查起诉审理；期限届满依法解除或变更，不得口头续期。 本组为原创虚构教学案例，不是官方真题。",
  },
  "crimpro-foundation-residence": {
    title: "《刑事诉讼法》（2018年修正）第74、75条",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "2026-10-31核读。固定住处原则上在住处执行；国安、恐怖活动案有碍侦查且经上一级公安批准可指定；不得羁押场所或专门办案场所执行，除无法通知外24小时通知家属。 本组为原创虚构教学案例，不是官方真题。",
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
    id: "crimpro-foundation-venue",
    topicId: "crimpro-foundation-jurisdiction",
    title: "案发地与居住地都能审，怎样确定法院",
    facts:
      "周宁在青河区实施盗窃后，返回一直居住的安城区。案件依法由基层法院一审。安城区有主要证人和周宁的常住住所，相关法院已确认由安城区审判更为适宜。青河区、安城区两法院均有管辖权，青河区法院先受理。本案没有需要移送主要犯罪地审判的情况。周宁要求仅因自己住在安城区，就必须把案件移过去。",
    prompt: "两地法院为什么都可能有管辖权？本案应由哪家法院审判？",
    reference:
      "青河区是犯罪地，安城区是经确认审判更适宜的被告人居住地，两地法院都有管辖权。青河区法院先受理，本案又没有需要移送的情形，应由青河区法院审判。周宁不能仅凭居住地要求必须移送。",
    answer: "c",
    options: [
      {
        text: "犯罪地之外的法院一律无权审理",
        explanation: "被告人居住地审判更适宜时，也可以管辖。",
      },
      {
        text: "被告人提出要求后，必须移到其居住地",
        explanation: "居住地不是被告人可以单方指定的审判地。",
      },
      {
        text: "两地均有管辖权，本案由最初受理的青河区法院审判",
        explanation: "地域根据与同级法院之间的先受理规则都适用。",
      },
      {
        text: "任一法院只要先收到材料，即使无管辖权也能审判",
        explanation: "最初受理规则以数家同级法院都有管辖权为前提。",
      },
    ],
    points: [
      {
        label: "说明两地管辖根据",
        meaning: "对应青河犯罪地和安城居住地审判更适宜，说明两地均可管辖。",
        boundary: "只写居住地一律能审，未表达更适宜条件，不视为完整。",
      },
      {
        label: "确定最初受理法院",
        meaning: "根据两同级法院均有管辖权且青河先受理，明确本案由青河审判。",
        boundary: "不要求列出题干已排除的移送例外。",
      },
    ],
    sources: ["crimpro-foundation-jurisdiction"],
  },
  {
    id: "crimpro-foundation-level",
    topicId: "crimpro-foundation-jurisdiction",
    title: "可能判无期的案件，能放在基层法院吗",
    facts:
      "检察机关审查一宗抢劫案时，结合已查明的事实和法定刑，认为被告人赵原可能被判处无期徒刑，准备提起公诉。该案并非全省性或全国性重大案件。有人建议，先让犯罪地基层法院作一审判决，判完后再由中级法院决定是否改判无期徒刑。",
    prompt: "该案第一审应由哪一级法院管辖？所提建议是否正确？",
    reference:
      "应由中级法院一审。判断级别管辖时看案件是否可能判处无期徒刑、死刑，本题已经符合这一条件。不能先交基层法院判完，再用二审补上本应由中级法院一审的程序。",
    answer: "a",
    options: [
      {
        text: "由中级法院一审，不能先交基层法院审判",
        explanation: "可能判无期徒刑即属于中级法院法定一审范围。",
      },
      {
        text: "一切案件都先由基层法院判，中级法院只负责二审",
        explanation: "中级法院也有法定第一审管辖范围。",
      },
      {
        text: "必须等基层法院实际判出无期，才能确定管辖",
        explanation: "级别管辖要在一审前确定，不以先作错误判决为条件。",
      },
      {
        text: "凡可能判无期的，一律由高级法院一审",
        explanation: "本题不具备高级法院一审的全省性重大案件条件。",
      },
    ],
    points: [
      {
        label: "中级法院一审",
        meaning: "明确本案由中级人民法院进行第一审。",
        boundary: "不能把中级法院描述为本案只能二审。",
      },
      {
        label: "说明级别依据",
        meaning: "联系可能判处无期徒刑，否定先基层一审、再交中院补正的建议。",
        boundary: "无需预测最终刑罚，不要求列全其他级别管辖。",
      },
    ],
    sources: ["crimpro-foundation-jurisdiction"],
  },
  {
    id: "crimpro-foundation-recusal-director",
    topicId: "crimpro-foundation-recusal",
    title: "被申请回避的是公安局长",
    facts:
      "林川因涉嫌诈骗被侦查。他发现主持本案侦查工作的县公安局局长，是本案被害人的哥哥，遂提出回避申请。局长认为自己能够公正办案，准备亲自签署驳回决定；办案民警则建议由该局副局长代为决定。",
    prompt: "林川是否有权申请回避？应由哪个机关决定局长的回避？",
    reference:
      "林川有权申请。局长是被害人的近亲属，属于应当回避的情形。公安机关负责人的回避，应由同级人民检察院的检察委员会决定，不能由局长本人或本局副局长决定。",
    answer: "d",
    options: [
      {
        text: "局长承诺公正，就无须受理申请",
        explanation: "近亲属关系属于法定回避情形。",
      },
      {
        text: "由局长本人判断自己能否继续办案",
        explanation: "被申请回避的公安机关负责人不能自行决定。",
      },
      {
        text: "由该公安局副局长代为决定",
        explanation: "法律将此决定权交给同级检察院检察委员会。",
      },
      {
        text: "林川可以申请，由同级检察院检察委员会决定",
        explanation: "对应法定事由和负责人的决定主体。",
      },
    ],
    points: [
      {
        label: "认定回避事由和申请权",
        meaning: "联系局长是被害人哥哥，说明林川有权申请且存在法定回避事由。",
        boundary: "不要求证明局长已经实际偏袒。",
      },
      {
        label: "找准决定主体",
        meaning: "明确同级人民检察院检察委员会决定，不是公安局内部负责人。",
        boundary: "仅写检察院而未指明检察委员会，属于主体说明未完整。",
      },
    ],
    sources: ["crimpro-foundation-recusal"],
  },
  {
    id: "crimpro-foundation-recusal-pending",
    topicId: "crimpro-foundation-recusal",
    title: "回避申请提出后，侦查要不要暂停",
    facts:
      "许青对负责盗窃案的侦查员申请回避，公安机关负责人尚未作出决定。此时一名目击证人即将离开当地，侦查员准备依法询问。许青认为，只要提出回避，侦查员就必须停办；数日后申请被驳回，许青还想要求复查这一决定。",
    prompt: "决定前能否继续侦查？申请被驳回后，许青有什么救济？",
    reference:
      "决定前应继续侦查，提出回避申请不会自动停止侦查员的工作。申请被驳回后，许青可以依法申请复议一次。不能把回避申请当作停止侦查的开关，也不是驳回以后就没有救济。",
    answer: "b",
    options: [
      {
        text: "申请一提出，侦查员必须暂停全部侦查",
        explanation: "法律规定作出回避决定前，侦查人员不能停止侦查。",
      },
      {
        text: "决定前继续侦查，驳回后可以申请复议一次",
        explanation: "分别说明侦查的进行和对驳回决定的救济。",
      },
      {
        text: "可以继续侦查，但驳回决定不得再提出任何异议",
        explanation: "当事人有申请复议一次的权利。",
      },
      {
        text: "申请回避自动生效，驳回后才能恢复侦查",
        explanation: "提出申请不等于已经决定回避。",
      },
    ],
    points: [
      {
        label: "决定前继续侦查",
        meaning:
          "明确回避决定作出前侦查人员不能停止侦查，本题可以继续依法询问。",
        boundary: "这里讨论侦查人员，不要求把同一规则扩张到审判人员。",
      },
      {
        label: "驳回后复议一次",
        meaning: "说明许青可以对驳回回避申请的决定申请复议一次。",
        boundary: "不要求条号或未问的具体申请期限。",
      },
    ],
    sources: ["crimpro-foundation-recusal"],
  },
  {
    id: "crimpro-foundation-aid-minor",
    topicId: "crimpro-foundation-aid",
    title: "父母有钱，未成年人还需要法律援助吗",
    facts:
      "17岁的陆辰因涉嫌盗窃接受侦查，未委托辩护人。父母有稳定收入，认为案情简单，不想花钱请律师。办案机关已经知道陆辰的年龄，却提出只有家里困难的孩子才会通知法律援助机构安排律师。",
    prompt:
      "父母的收入和意见能否成为不通知法律援助的理由？办案机关应怎样处理？",
    reference:
      "不能。陆辰是未成年人，又没有委托辩护人，办案机关应通知法律援助机构指派律师为他辩护。这个保障不以经济困难为前提，父母认为案情简单也不能将它省略。",
    answer: "c",
    options: [
      {
        text: "家庭有收入，不符合法律援助条件",
        explanation: "未成年人未委托辩护人的通知辩护不以经济困难为前提。",
      },
      {
        text: "父母认为案情简单，就可以完全不安排辩护",
        explanation: "父母意见不能取消法定辩护保障。",
      },
      {
        text: "应通知法律援助机构指派律师，收入并不改变这一要求",
        explanation: "年龄和未委托辩护人是本案的关键条件。",
      },
      {
        text: "必须等陆辰成年后，才考虑为其安排律师",
        explanation: "保障应在当前刑事程序中落实。",
      },
    ],
    points: [
      {
        label: "识别强制通知条件",
        meaning: "联系陆辰17岁且未委托辩护人，说明应获得通知辩护保障。",
        boundary: "不要求穷尽其他法律援助情形。",
      },
      {
        label: "通知机构指派律师",
        meaning:
          "明确办案机关应通知法律援助机构指派律师，不能因收入或父母意见省略。",
        boundary: "不能以仅让家属到场或值班咨询替代律师辩护。",
      },
    ],
    sources: ["crimpro-foundation-aid"],
  },
  {
    id: "crimpro-foundation-aid-life",
    topicId: "crimpro-foundation-aid",
    title: "可能判无期，一次法律咨询够不够",
    facts:
      "成年被告人顾森被指控抢劫，法院结合案情认为可能判处无期徒刑。顾森没有委托辩护人，家境并不困难。开庭前，一名值班律师曾为他提供过半小时法律咨询。承办法官打算据此不再通知法律援助机构安排辩护律师。",
    prompt: "已有值班律师咨询，能否省去通知辩护？法院应如何处理？",
    reference:
      "不能省去。顾森可能被判无期徒刑，又没有委托辩护人，法院应通知法律援助机构指派律师为他辩护。值班律师的一次法律咨询不能替代律师辩护；是否家境困难不影响本案这项要求。",
    answer: "a",
    options: [
      {
        text: "应通知指派辩护律师，值班咨询不能替代",
        explanation: "可能判无期且未委托辩护人，符合应当通知辩护的条件。",
      },
      {
        text: "只要有过一次法律咨询，就视为已经获得律师辩护",
        explanation: "法律帮助与辩护人的职责并不相同。",
      },
      {
        text: "顾森不是未成年人，因此法院没有通知义务",
        explanation: "可能无期死刑也是独立的应当通知情形。",
      },
      {
        text: "只有最终判决宣告无期之后，才能安排律师",
        explanation: "辩护保障须在审理中实现，不能等到判后。",
      },
    ],
    points: [
      {
        label: "明确需要律师辩护",
        meaning:
          "联系可能无期且未委托，判断法院应当通知辩护，非经济困难才适用。",
        boundary: "不要求确定最终刑罚。",
      },
      {
        label: "说明咨询不能替代及安排方式",
        meaning: "说明值班咨询不能代替辩护，法院应通知法律援助机构指派律师。",
        boundary: "不否定值班律师可提供法律帮助。",
      },
    ],
    sources: ["crimpro-foundation-aid"],
  },
  {
    id: "crimpro-foundation-files-lawyer",
    topicId: "crimpro-foundation-files",
    title: "进入审查起诉，律师能不能复制案卷",
    facts:
      "盗窃案已移送检察院审查起诉。辩护律师余禾提出查阅、摘抄、复制本案案卷材料的申请。工作人员只允许查看公安机关起诉意见书，称其他证据材料须等到法院开庭后才能看，所有材料也只能看、不能复制。",
    prompt: "这两项限制是否正确？余律师现在有哪些阅卷权利？",
    reference:
      "两项限制都不正确。案件已经进入审查起诉，余律师可以查阅、摘抄、复制本案案卷材料，范围不只起诉意见书，也不用等开庭。把复制一概禁止，同样不符合法定阅卷权。",
    answer: "d",
    options: [
      {
        text: "进入审查起诉也只能看起诉意见书",
        explanation: "法定范围是本案案卷材料。",
      },
      {
        text: "可以看全部案卷，但法律一律禁止复制",
        explanation: "律师依法有摘抄、复制案卷材料的权利。",
      },
      {
        text: "只能等到法院开庭后申请阅卷",
        explanation: "起点是检察院开始审查起诉之日。",
      },
      {
        text: "现在可查阅、摘抄、复制本案案卷，不能作题述限制",
        explanation: "阶段和方式都符合法律要求。",
      },
    ],
    points: [
      {
        label: "说清阅卷起点和范围",
        meaning: "联系已进入审查起诉，说明可查阅本案案卷，不仅限于起诉意见书。",
        boundary: "不要求判断侦查阶段其他信息了解权。",
      },
      {
        label: "认可摘抄复制权",
        meaning: "明确律师也可以摘抄、复制，不能只让看而一概禁止复制。",
        boundary: "不要求复述具体技术操作流程。",
      },
    ],
    sources: ["crimpro-foundation-files"],
  },
  {
    id: "crimpro-foundation-files-relative",
    topicId: "crimpro-foundation-files",
    title: "亲属担任辩护人，阅卷规则是否一样",
    facts:
      "一宗普通刑事案件已进入法院审理。被告人的姐姐韩月不是律师，已依法受委托担任辩护人，身份没有争议。她要求查阅、摘抄、复制本案案卷，认为既然弟弟同意，就无需法院再许可。工作人员则称非律师辩护人永远不能阅卷。",
    prompt: "韩月和工作人员的说法各有什么问题？韩月怎样才能依法阅卷？",
    reference:
      "两人的说法都不准确。其他辩护人并非永远不能阅卷，但须经法院、检察院许可。本案在审判阶段，韩月应向法院申请许可；获得许可后，可以查阅、摘抄、复制案卷。弟弟同意不能替代法院许可。",
    answer: "b",
    options: [
      {
        text: "只要被告人同意，其他辩护人就无需任何许可",
        explanation: "其他辩护人阅卷仍受法定许可要求约束。",
      },
      {
        text: "韩月可以申请法院许可，获准后查阅、摘抄、复制",
        explanation: "本案处于审判阶段，向法院申请。",
      },
      {
        text: "不是律师，无论如何都不得阅卷",
        explanation: "其他辩护人经法院、检察院许可也可阅卷。",
      },
      {
        text: "即使法院许可，也只能看起诉书",
        explanation: "法律允许获准的其他辩护人查阅、摘抄、复制案卷材料。",
      },
    ],
    points: [
      {
        label: "纠正两种绝对说法",
        meaning:
          "说明非律师并非永远不能阅卷，但被告人同意不等于可以免经法定许可。",
        boundary: "不再讨论题干已确认的辩护人资格。",
      },
      {
        label: "依法申请许可后阅卷",
        meaning: "明确本案向法院申请许可，获准后可查阅、摘抄、复制本案案卷。",
        boundary: "只要求本案正确路径，不要求列出检察阶段程序。",
      },
    ],
    sources: ["crimpro-foundation-files"],
  },
  {
    id: "crimpro-foundation-evidence-alibi",
    topicId: "crimpro-foundation-evidence",
    title: "找到不在场证据，能否留到开庭再交",
    facts:
      "公安机关正在侦查一起夜间仓库盗窃案。辩护律师找到经过核实的外地医院留观记录、监控及医护人员说明，显示犯罪嫌疑人案发当晚在外地医院接受治疗。律师准备将这些不在犯罪现场的证据一直保留到开庭，作为突然提出的辩护材料。",
    prompt: "律师能否一直留到开庭才告知？依法应怎样处理？",
    reference:
      "不能一直留到开庭。辩护律师收集到犯罪嫌疑人不在犯罪现场的证据，应及时告知公安机关、人民检察院。及时告知是这类证据的法定义务；是否足以排除嫌疑，还需要办案机关核实，不能因为要核实就一直不告知。",
    answer: "a",
    options: [
      {
        text: "应及时告知公安机关、人民检察院，不能一直等到开庭",
        explanation: "不在犯罪现场属于法律特别规定的及时告知证据。",
      },
      {
        text: "只要对嫌疑人有利，都必须等开庭再提出",
        explanation: "有利与否不决定可以规避法定及时告知义务。",
      },
      {
        text: "律师自己认为可靠，便可要求公安不经核实立即撤案",
        explanation: "及时告知不等于证据免经核实或当然撤案。",
      },
      {
        text: "只有检方证据需要披露，律师对此类证据没有义务",
        explanation: "刑诉法对这类辩方证据规定了及时告知。",
      },
    ],
    points: [
      {
        label: "识别及时告知义务",
        meaning: "联系本案取得不在犯罪现场的证据，否定留到开庭的做法。",
        boundary: "本问不考所有辩方证据的一般提交期限。",
      },
      {
        label: "说清告知对象和时间",
        meaning:
          "说明应及时告知公安机关、人民检察院，而非只对当事人或等开庭告知法官。",
        boundary: "不要求认定这批证据最终必然导致撤案。",
      },
    ],
    sources: ["crimpro-foundation-evidence"],
  },
  {
    id: "crimpro-foundation-evidence-witness",
    topicId: "crimpro-foundation-evidence",
    title: "被害人提供的证人，同意谈话就够了吗",
    facts:
      "抢劫案进入审查起诉后，辩护律师准备向被害人提供的证人秦宁收集材料。秦宁愿意接受询问，但检察院、法院均尚未许可。律师认为只要秦宁同意就可进行。另一同事说，即便秦宁不愿意，只要取得检察院许可也能要求其必须接受律师询问。",
    prompt: "两种说法是否正确？律师向秦宁收集材料需要满足什么条件？",
    reference:
      "两种说法都不对。秦宁是被害人提供的证人，辩护律师取证需要人民检察院或者人民法院许可，还要秦宁本人同意。只有本人同意不够，只有办案机关许可也不够，律师不能强迫他接受询问。",
    answer: "c",
    options: [
      {
        text: "只要秦宁同意，便不再需要办案机关许可",
        explanation: "这类证人适用额外的法院或检察院许可要求。",
      },
      {
        text: "取得检察院许可后，可强迫秦宁接受律师询问",
        explanation: "本人同意也是独立条件，许可不产生强迫权。",
      },
      {
        text: "须法院或检察院许可，并经秦宁本人同意",
        explanation: "两项条件同时满足才能依法向其收集材料。",
      },
      {
        text: "辩护律师在任何情况下都不得向这类证人取证",
        explanation: "法律允许在满足许可和同意条件后取证。",
      },
    ],
    points: [
      {
        label: "辨明特殊取证对象",
        meaning:
          "联系秦宁是被害人提供的证人，说明须法院或检察院许可，不能只凭本人同意。",
        boundary: "不要求先取得法院和检察院两家共同许可。",
      },
      {
        label: "保留本人同意要求",
        meaning: "说明许可之外仍须秦宁同意，律师不能强迫其配合。",
        boundary: "不把法庭通知证人出庭与律师调查取证混为一谈。",
      },
    ],
    sources: ["crimpro-foundation-evidence"],
  },
  {
    id: "crimpro-foundation-summons-ordinary",
    topicId: "crimpro-foundation-summons",
    title: "普通案件的传唤也能持续24小时吗",
    facts:
      "公安机关传唤涉嫌普通盗窃的方青到案。案件事实单一，并非特别重大、复杂，也不需要对其采取拘留、逮捕措施。传唤已持续12小时，办案人员还想再问两小时，称法律最高允许24小时，只要没有超过24小时就可以。",
    prompt: "能否以此继续传唤？24小时上限在什么情况下才适用？",
    reference:
      "不能。普通传唤、拘传最长12小时，本案已经到限，应结束传唤。24小时只适用于案情特别重大、复杂且需要采取拘留、逮捕措施的情况；本案不符合这些条件，不能直接套用。",
    answer: "b",
    options: [
      {
        text: "任何刑事案件的传唤都可以持续24小时",
        explanation: "24小时是有专门条件的上限。",
      },
      {
        text: "本案适用12小时上限，不能仅因还没问完就延长",
        explanation: "既不重大复杂，也无拘留逮捕需要，不符合例外。",
      },
      {
        text: "有口头批准即可把普通传唤延长到24小时",
        explanation: "口头批准不能替代法定实体条件。",
      },
      {
        text: "只有拘传受期限限制，传唤没有限制",
        explanation: "传唤和拘传都受本条期限约束。",
      },
    ],
    points: [
      {
        label: "确定本案12小时上限",
        meaning:
          "联系普通案件且无需拘留逮捕，明确已到12小时应结束，不能再问两小时。",
        boundary: "不要求推算具体钟点。",
      },
      {
        label: "完整说明24小时条件",
        meaning: "说明须案情特别重大复杂，并且需要采取拘留、逮捕措施。",
        boundary: "只写复杂或只写需要拘留，条件不完整。",
      },
    ],
    sources: ["crimpro-foundation-summons"],
  },
  {
    id: "crimpro-foundation-summons-continuous",
    topicId: "crimpro-foundation-summons",
    title: "换一张传唤手续，能重新计时吗",
    facts:
      "普通盗窃案中，侦查人员传唤夏宁11小时后，未让他离开讯问室，立即换发一张传唤手续，继续询问10小时。两段期间夏宁一直由民警看管，只吃过一份饭，没有获得必要休息；本案不符合24小时的特别情形。办案人员称每次都不到12小时，因此程序合法。",
    prompt: "换发手续能否使这段连续控制合法？饮食和休息方面还有什么要求？",
    reference:
      "不能。夏宁始终没有恢复自由，换手续后继续控制，是以连续传唤变相拘禁，不能把时间重新计算为另一次。传唤期间还必须保证饮食和必要休息；给过一份饭，不能代替对必要休息的保障。",
    answer: "d",
    options: [
      {
        text: "每张手续不到12小时，所以全部合法",
        explanation: "要看是否连续控制，不能用换手续规避期限。",
      },
      {
        text: "只要嫌疑人没有喊累，便无须安排休息",
        explanation: "保障必要休息是法定义务。",
      },
      {
        text: "给过饭就已完成所有生活保障",
        explanation: "饮食与必要休息都需要保障。",
      },
      {
        text: "连续换手续不能规避期限，还须保障饮食和必要休息",
        explanation: "既有变相拘禁问题，也有休息保障问题。",
      },
    ],
    points: [
      {
        label: "识别连续传唤变相拘禁",
        meaning: "结合始终未离开、持续看管，否定换手续重新计时的做法。",
        boundary: "不能只机械看两张手续各自时长。",
      },
      {
        label: "明确饮食与必要休息保障",
        meaning:
          "说明两项保障都要做到，本案没有必要休息不能因给过饭就视为合法。",
        boundary: "不要求按题干外标准计算一份饭是否足够。",
      },
    ],
    sources: ["crimpro-foundation-summons"],
  },
  {
    id: "crimpro-foundation-bail-expiry",
    topicId: "crimpro-foundation-duration",
    title: "同一侦查阶段取保到期，案件还没办完",
    facts:
      "公安机关在同一侦查阶段对叶初取保候审即将满12个月。案件尚未侦结，没有移送其他办案机关，也未依法作出变更措施的决定。办案人员口头告知叶初，因为案件没查完，原取保措施继续有效；叶初则认为期满就等于案件自动撤销。",
    prompt: "两种说法是否正确？期限届满应怎样处理？",
    reference:
      "两种说法都不正确。取保候审最长12个月，本题不能靠口头通知无限延续原措施。届满应依法解除或变更强制措施；解除取保不等于撤案，案件是否继续要按案件本身的情况依法处理。",
    answer: "a",
    options: [
      {
        text: "原措施不能口头续期，届满依法解除或变更，案件不自动撤销",
        explanation: "分别处理措施期限与案件去向。",
      },
      {
        text: "只要案子没有办完，同一取保可以一直延续",
        explanation: "案件未结不取消法定措施期限。",
      },
      {
        text: "取保满12个月，案件当然撤销",
        explanation: "强制措施期限与是否应撤案是不同问题。",
      },
      {
        text: "满12个月后只能继续原取保，不允许依法改变措施",
        explanation: "法律要求届满依法解除或变更，不能继续超期。",
      },
    ],
    points: [
      {
        label: "否定原措施超期延续",
        meaning:
          "指出取保最长12个月，同一阶段不能以未侦结口头续期，应依法解除或变更。",
        boundary: "题干排除移送新阶段，不要求讨论不同机关重新办理。",
      },
      {
        label: "区分解除措施与撤案",
        meaning: "明确措施届满不等于案件自动撤销，仍须依法处理案件。",
        boundary: "不要求预测本案最终起诉还是撤销。",
      },
    ],
    sources: ["crimpro-foundation-duration"],
  },
  {
    id: "crimpro-foundation-surveillance-duration",
    topicId: "crimpro-foundation-duration",
    title: "监视居住期间，侦查是否等期满再做",
    facts:
      "某普通刑事案件中，公安机关依法对莫林采取监视居住。承办人准备把该措施安排为8个月，并在前6个月暂停收集其他证据，等监视居住结束后再恢复侦查。案件没有其他法定停止侦查的原因。",
    prompt: "安排8个月是否正确？监视居住期间能否因此暂停侦查？",
    reference:
      "都不正确。监视居住最长6个月，不能直接安排8个月。监视居住期间不得中断案件的侦查、起诉、审理，不能把这6个月当作等待期；本案应继续侦查。",
    answer: "c",
    options: [
      {
        text: "监视居住和取保一样，最长都是12个月",
        explanation: "监视居住最长6个月。",
      },
      {
        text: "措施不满12个月即可，侦查也可以等结束后再做",
        explanation: "期限与办案继续要求两方面都错。",
      },
      {
        text: "监视居住最长6个月，期间应继续侦查",
        explanation: "措施期限与诉讼活动应当分清。",
      },
      {
        text: "最长6个月正确，但这6个月内应暂停所有侦查",
        explanation: "法律明确规定措施期间不得中断侦查等活动。",
      },
    ],
    points: [
      {
        label: "正确说明6个月上限",
        meaning: "明确监视居住最长6个月，安排8个月不合法。",
        boundary: "不能误用取保候审12个月期限。",
      },
      {
        label: "明确期间继续侦查",
        meaning: "说明不能因监视居住而停办，本案仍应继续侦查。",
        boundary: "不要求讨论题干已排除的其他停止原因。",
      },
    ],
    sources: ["crimpro-foundation-duration"],
  },
  {
    id: "crimpro-foundation-residence-ordinary",
    topicId: "crimpro-foundation-residence",
    title: "有固定住处，为办案方便改到招待所",
    facts:
      "公安机关依法决定对涉嫌普通诈骗的唐平监视居住。唐平在办案机关所在地有固定住处，也具备在该处执行的条件。办案人员嫌往返路途较远，准备改在一间普通招待所执行，仅以内部负责人同意和办案方便为理由。该案不涉及危害国家安全、恐怖活动犯罪。",
    prompt: "能否按题述理由指定居所？本案应在哪里执行？",
    reference:
      "不能。本案有固定住处，且不存在题述法定指定居所情形，应在唐平住处执行。办案方便、路途远或内部负责人同意，都不能代替指定居所的法律条件。",
    answer: "b",
    options: [
      {
        text: "只要不是看守所，就可以随意指定任何地点",
        explanation: "指定居所首先须符合法定条件。",
      },
      {
        text: "本案应在住处执行，方便办案不足以指定居所",
        explanation: "有固定住处且无适用例外，应遵守住处执行原则。",
      },
      {
        text: "内部负责人同意后，就不受指定居所条件限制",
        explanation: "内部同意不能取代法定事由。",
      },
      {
        text: "所有诈骗案都一律必须在指定居所执行",
        explanation: "普通诈骗并不因罪名本身进入这一例外。",
      },
    ],
    points: [
      {
        label: "确定住处执行原则",
        meaning: "结合唐平有固定住处且具备执行条件，明确本案在住处执行。",
        boundary: "不要求否定本案已经依法作出的监视居住决定本身。",
      },
      {
        label: "否定题述指定理由",
        meaning:
          "说明办案方便和内部同意不能代替法定指定居所条件，普通诈骗无所述特殊情形。",
        boundary: "不要求列全国安、恐怖活动例外的审批细节。",
      },
    ],
    sources: ["crimpro-foundation-residence"],
  },
  {
    id: "crimpro-foundation-residence-notice",
    topicId: "crimpro-foundation-residence",
    title: "获准指定居所后，地点和通知还受约束吗",
    facts:
      "钱程涉嫌恐怖活动犯罪，有固定住处。公安机关有具体根据认为在其住处执行监视居住会妨碍侦查，经上一级公安机关批准，决定指定居所执行。执行人员把钱程安置在公安机关专门办案场所，并计划一周后才通知家属。家属身份、联系方式已掌握，客观上能够通知；延后通知的唯一理由是笼统的办案保密。",
    prompt: "指定居所已获批准，是否就能按上述地点和通知安排执行？",
    reference:
      "不能。指定居所虽已符合本案的批准条件，执行地点仍不得是羁押场所或专门办案场所，应改用合法地点。家属可以通知，应在执行后24小时内通知，不能只以笼统保密为由拖到一周后。",
    answer: "d",
    options: [
      {
        text: "上一级批准后，地点和通知时间可自由决定",
        explanation: "批准并不取消执行环节的法定限制。",
      },
      {
        text: "不能放专门办案场所，但一律无需通知家属",
        explanation: "除无法通知外，应在执行后24小时内通知家属。",
      },
      {
        text: "只要24小时通知，就可以一直放专门办案场所",
        explanation: "合法通知不能弥补执行地点违法。",
      },
      {
        text: "专门办案场所不得使用，且本案应24小时内通知家属",
        explanation: "两项执行要求都需遵守。",
      },
    ],
    points: [
      {
        label: "纠正执行地点",
        meaning: "明确指定居所不得设在羁押场所或专门办案场所，本题地点应改正。",
        boundary: "题干已满足指定审批，不要求重新否定指定决定。",
      },
      {
        label: "正确通知家属",
        meaning: "联系能够通知，明确应执行后24小时内通知，笼统保密不能拖一周。",
        boundary: "不要求展开本案不存在的无法通知情形。",
      },
    ],
    sources: ["crimpro-foundation-residence"],
  },
];

const topicDrafts = [
  {
    id: "crimpro-foundation-jurisdiction",
    chapterId: "CRIMPRO-FOUNDATION-JURISDICTION",
    title: "刑事审判的级别与地域管辖",
    headline: "先确定哪一级法院，再判断哪个地方的法院能审。",
    paragraphs: [
      "第一审普通刑事案件一般由基层法院审理。危害国家安全、恐怖活动，以及可能判处无期徒刑、死刑的案件，由中级法院一审。",
      "通常由犯罪地法院管辖；由被告人居住地法院审判更适宜时，也可由该地法院管辖。几个同级法院都有管辖权，一般由最初受理的法院审判，必要时可移送主要犯罪地法院。",
    ],
    pitfall:
      "把最先收到材料当成取得管辖权，或把中级法院一审误认为已经经过一次上诉。",
  },
  {
    id: "crimpro-foundation-recusal",
    chapterId: "CRIMPRO-FOUNDATION-RECUSAL",
    title: "回避的决定与救济",
    headline: "谁被申请回避，决定了由谁作决定。",
    paragraphs: [
      "普通审判人员、检察人员、侦查人员的回避，分别由院长、检察长、公安机关负责人决定。院长的回避由本院审判委员会决定；检察长和公安机关负责人的回避，由同级检察院检察委员会决定。",
      "对侦查人员的回避作出决定前，侦查不能停止。回避申请被驳回，可以依法申请复议一次。",
    ],
    pitfall: "让被申请回避的负责人自己决定，或把提出回避等同于侦查自动停办。",
  },
  {
    id: "crimpro-foundation-aid",
    chapterId: "CRIMPRO-FOUNDATION-AID",
    title: "应当通知法律援助的情形",
    headline: "有些案件必须安排律师，不以家庭困难为前提。",
    paragraphs: [
      "未成年人没有委托辩护人的，公检法应通知法律援助机构指派律师。不能因为父母有钱、认为不需要律师，就省去这项程序。",
      "可能被判处无期徒刑、死刑而没有委托辩护人的，也应通知指派律师。值班律师的法律帮助不能代替应有的律师辩护。",
    ],
    pitfall:
      "把所有法律援助都理解为只有家庭贫困才能获得，或以一次值班咨询代替辩护。",
  },
  {
    id: "crimpro-foundation-files",
    chapterId: "CRIMPRO-FOUNDATION-FILES",
    title: "辩护人的阅卷权",
    headline: "律师阅卷从审查起诉开始；其他辩护人还须许可。",
    paragraphs: [
      "案件进入检察院审查起诉，辩护律师可以查阅、摘抄、复制案卷材料，不必等到开庭，也不限于起诉意见书。",
      "其他辩护人经法院、检察院许可，也可以查阅、摘抄、复制。亲属身份或被告人同意，不能替代这项许可。",
    ],
    pitfall:
      "把律师会见的起点当作阅卷的起点，或把其他辩护人的阅卷条件与律师完全混同。",
  },
  {
    id: "crimpro-foundation-evidence",
    chapterId: "CRIMPRO-FOUNDATION-EVIDENCE",
    title: "辩护律师的证据告知与取证",
    headline: "三类证据须及时告知，调查取证要分清对象。",
    paragraphs: [
      "收集到犯罪嫌疑人不在犯罪现场、未达刑事责任年龄，或属于依法不负刑责的精神病人的证据，应及时告知公安机关、检察院。不能留到开庭再突然提出。",
      "向一般证人或有关单位、个人收集材料，须经对方同意；向被害人、其近亲属及其提供的证人收集材料，还须法院或检察院许可。律师没有强迫证人配合的权力。",
    ],
    pitfall:
      "把所有有利材料都当成同一种告知义务，或认为有办案机关许可就可以强迫证人接受询问。",
  },
  {
    id: "crimpro-foundation-summons",
    chapterId: "CRIMPRO-FOUNDATION-SUMMONS",
    title: "传唤、拘传的时间与保障",
    headline: "一般不超过12小时，适用24小时须同时满足法定条件。",
    paragraphs: [
      "传唤、拘传一般不得超过12小时；案情特别重大、复杂，需要采取拘留、逮捕措施的，不得超过24小时。不是所有复杂案件都能用满24小时。",
      "不能通过连续传唤、拘传变相拘禁，还要保证饮食和必要休息。换一张手续，不能把同一段连续控制重新计时。",
    ],
    pitfall: "只看每张手续是否低于12小时，却忽视人一直没有恢复自由。",
  },
  {
    id: "crimpro-foundation-duration",
    chapterId: "CRIMPRO-FOUNDATION-DURATION",
    title: "取保候审与监视居住的期限",
    headline: "取保最长12个月，监视居住最长6个月，办案照常进行。",
    paragraphs: [
      "取保候审、监视居住期间，侦查、起诉、审理都应继续。措施期限不是等待期，案件不能因此搁置。",
      "期限届满，应依法解除或变更强制措施，不能只以案件没办完为由继续原措施。解除措施不等于撤销案件或宣告无罪。",
    ],
    pitfall: "把监视居住期限记成取保的12个月，或认为措施到期案件就自动结束。",
  },
  {
    id: "crimpro-foundation-residence",
    chapterId: "CRIMPRO-FOUNDATION-RESIDENCE",
    title: "监视居住的地点与家属通知",
    headline: "原则上在固定住处执行，指定居所须符合专门条件。",
    paragraphs: [
      "有固定住处的，原则上在住处执行；无固定住处的，可以指定居所。对涉嫌危害国家安全、恐怖活动犯罪，住处执行有碍侦查且经上一级公安机关批准的，也可以指定居所。",
      "指定居所不能设在羁押场所或专门办案场所。除无法通知外，应在执行后24小时以内通知家属；笼统说“保密”不能代替法定条件。",
    ],
    pitfall:
      "把案件严重或办案方便本身当作指定居所的理由，或者认为指定居所就不必通知家属。",
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
export const criminalProcedureFoundationsTopics: FaultTopic[] = topicDrafts.map(
  (topic) => {
    const related = cases.filter((item) => item.topicId === topic.id);
    const first = related[0];
    return {
      id: topic.id,
      title: topic.title,
      headline: topic.headline,
      goal: first.prompt,
      prerequisite: "知道刑事案件通常经过侦查、审查起诉和审判。",
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
export const criminalProcedureFoundationsChapters = topicDrafts.map(
  (topic) => ({
    id: topic.chapterId,
    title: topic.title,
    section: "刑事诉讼法",
    topicIds: [topic.id],
  }),
);
export const criminalProcedureFoundationsExercises =
  criminalProcedureFoundationsTopics.flatMap((topic) => topic.exercises);
export const criminalProcedureFoundationsContentPack = {
  revision: criminalProcedureFoundationsRevision,
  snapshot: {
    topics: criminalProcedureFoundationsTopics,
    sources: criminalProcedureFoundationsSources,
  },
};
export const criminalProcedureFoundationsDefaultQueues = {
  objective: criminalProcedureFoundationsExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: criminalProcedureFoundationsExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function criminalProcedureFoundationsQuestion(id: string) {
  const question = criminalProcedureFoundationsExercises.find(
    (q) => q.id === id,
  );
  return question ? structuredClone(question) : undefined;
}
export function criminalProcedureFoundationsTopicForQuestion(id: string) {
  return criminalProcedureFoundationsTopics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function criminalProcedureFoundationsSameCaseQuestions(id: string) {
  const question = criminalProcedureFoundationsQuestion(id);
  return question
    ? structuredClone(
        criminalProcedureFoundationsExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function criminalProcedureFoundationsChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = criminalProcedureFoundationsChapters.find(
    (c) => c.id === chapterId,
  );
  return chapter
    ? criminalProcedureFoundationsTopics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
