import type { ContentSources, FaultTopic } from "../fault-unit";
import { foundationSources } from "../criminal-foundation-topics";
import { packageOneCases } from "./index";

export const packageOneSources: ContentSources = {
  ...foundationSources,
  law: {
    title: "《刑法》第三至十九、二十二至三十一、三十七、九十三条及相关分则规定",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5212248/content.html",
    note: "国家税务总局法规库，收录至修正案（十二）。2026-09-14 至 15 日核对；本包分则涉及故意杀人、故意伤害、盗窃、职务侵占、毁坏财物和单位合同诈骗等。限定设问不等于已完成具体罪名全部教学。",
  },
  interpretation: {
    title: "法律解释方法在指导性案例中的运用",
    url: "https://www.spp.gov.cn/spp/llyj/202004/t20200419_459022.shtml",
    note: "最高检网站刊载理论文章，2020-04-19；本次取得检索正文。只参考法律用语与解释边界的论述，不移用其案例，非司法解释。",
  },
  conduct: {
    title: "《刑法》第十四至十六、二十二至二十三条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5212248/content.html",
    note: "本包据行为、罪过及不能抗拒等规定作教学应用；身体运动与可归责行为的概念区分属于解释，不声称条文逐字列出该定义。",
  },
  legality: {
    title: "刑事违法性判断必须遵循法秩序统一性原理",
    url: "https://www.spp.gov.cn/llyj/202302/t20230208_600368.shtml",
    note: "最高检网站理论文章，2023-02-08；本次取得检索正文，用于合法履职与整体违法性判断，不是法定免责清单。",
  },
  causalError: {
    title: "狭义的因果错误与故意归责的实现",
    url: "https://www.criminallaw.com.cn/article/default.asp?id=15316",
    note: "中国刑事法律网学术文章，2016-07-20；本次读取正文，记录因果偏差、提前与推迟结果及不同观点。仅作分类与论证参考，不采作者全部主张，不复制其桥墩等例题。争议题限定设问，不给未说明观点的唯一罪数结论。",
  },
  lawAwareness: {
    title: "违法性认识错误的社会根源及其应对",
    url: "https://www.spp.gov.cn/spp/llyj/202102/t20210202_508252.shtml",
    note: "最高检网站理论文章，2021-02-02；本次取得检索正文，直开失败。可避免性与具体信息条件的讨论参考，不作为司法解释或统一免责规则。",
  },
};

type Card = {
  id: string;
  title: string;
  rule: string;
  omission: string;
  example: string;
  analysis: string;
  sources?: string[];
};
const cards: Card[] = [
  {
    id: "criminal-principles",
    title: "罪刑法定与刑法解释",
    rule: "定罪处刑须有法律依据。解释可以说明法条含义，但不能只因行为相似、危害较大，就越过条文允许的范围新增处罚。",
    omission:
      "没有逐项列举技术载体，不代表不能解释已有概念；有道德问题或违反内部规定，也不等于符合犯罪构成。",
    example: "平台给某种违约取名为犯罪，并写入用户守则。",
    analysis: "内部名称不能创设罪名，应另查刑事法律依据与具体事实。",
    sources: ["law", "interpretation"],
  },
  {
    id: "criminal-punishment-principles",
    title: "平等适用与罪责刑相适应",
    rule: "任何人犯罪都依法处理；刑罚要与其罪行和刑事责任相适应。依法考虑年龄、能力、作用等差别，符合平等适用，并非机械同罪同刑。",
    omission: "相同结果不代表相同责任；身份地位不能成为法律之外的特权。",
    example: "两个已成立的伤害案件，行为人年龄和承担的责任不同。",
    analysis: "应分别适用相应规则，不能只凭同一伤情要求完全相同处罚。",
  },
  {
    id: "criminal-extraterritorial",
    title: "属人与保护管辖",
    rule: "中国公民境外犯我国刑法规定之罪，原则上适用刑法；普通公民对应最高刑三年以下的，可以不追究。外国人在境外侵害我国国家或公民，保护管辖须审查最低刑三年以上及犯罪地可罚性。",
    omission:
      "最高刑与最低刑不要混用；国家工作人员和军人的境外犯罪另按第七条第二款。刑法适用根据与是否到案不是一回事。",
    example: "同是境外行为，一案行为人为中国公民，另一案是外国人侵害中国公民。",
    analysis: "分别找属人和保护管辖根据，不能共用同一个刑度门槛。",
  },
  {
    id: "criminal-treaty",
    title: "条约管辖、外国审判与外交豁免",
    rule: "条约罪行在我国承担的条约义务范围内适用刑法。境外经外国审判不当然阻止我国依法追究，已实际受刑的可免除或减轻。享有外交特权和豁免权者的刑事责任通过外交途径解决。",
    omission:
      "不是所有外国重罪都在条约管辖内；外国判过与已经实际受刑要分开；外交豁免不表示行为当然合法。",
    example: "一案只有外国判决，另一案已有实际执行的刑罚。",
    analysis:
      "不能都直接说成我国不得追究，境外实际受刑对应第十条的处罚调整空间。",
  },
  {
    id: "crime-threshold",
    title: "犯罪概念、法益与入罪边界",
    rule: "犯罪判断应结合具体构成、法益侵害或危险及责任。情节显著轻微、危害不大，不认为犯罪；犯罪成立后情节轻微而免予刑罚，是另一种处理。",
    omission:
      "有损害不等于有犯罪，赔偿也不自动消除犯罪；不能跳过合法救援等整体法律背景。",
    example: "符合规定的救援损坏了现场物品。",
    analysis: "不能仅由财物损坏先认定犯罪，须把合法履职背景纳入判断。",
    sources: ["law", "legality"],
  },
  {
    id: "criminal-conduct",
    title: "危害行为与犯罪构成",
    rule: "刑法不处罚单纯思想。判断行为要看具体实施、支配条件及法定要件；作为与不作为均可能受评价，不能把身体接触或消极不动本身当成犯罪。",
    omission:
      "预备须有准备工具、制造条件等行为；突然外力造成的身体运动，还须区分本人控制能力和此前有无可归责行为。",
    example: "某人被突然撞飞，身体又碰到旁人。",
    analysis: "先查谁制造和支配危险，不能只看最后是谁的身体接触了受害人。",
    sources: ["law", "conduct"],
  },
  {
    id: "mental-capacity",
    title: "精神障碍与醉酒的责任能力",
    rule: "看实施行为时的能力：依法鉴定确认不能辨认或控制的，不负刑责；尚未完全丧失的，应负刑责但可从轻或减轻；间歇性精神病人在正常时犯罪应负刑责。普通醉酒不是免责理由。",
    omission:
      "病名、既往住院、事后失忆都不能直接代替行为时能力判断；不负刑责与依法监护、医疗不是同一问题。",
    example: "同一个人有精神疾病病史，但某次行为时依法确认精神正常。",
    analysis: "不能只凭病史免责，应对应这次行为时的状态。",
  },
  {
    id: "personal-mitigation",
    title: "高龄与残障的法定从宽",
    rule: "已满七十五周岁者，故意犯罪可以、过失犯罪应当从轻或减轻。又聋又哑者或盲人犯罪，可以从轻、减轻或免除处罚。",
    omission:
      "可以、应当和免责有区别；不得把这几类具体规定扩大成所有高龄或残障者当然无罪。",
    example: "一名七十六周岁者被认定过失犯罪。",
    analysis: "其年龄对应应当从轻或减轻，不是自动免除刑事责任。",
  },
  {
    id: "special-subject",
    title: "特殊主体与职务身份",
    rule: "某些犯罪要求特定主体身份，应依实际职责、是否从事公务以及法律规定判断。没有该身份不表示行为合法，可能涉及其他犯罪；本人能否单独构成与共犯问题也须区分。",
    omission:
      "在企业工作、管理钱物，不自动等于国家工作人员；头衔和单位名称不能代替实际身份与权限。",
    example: "纯民营企业员工利用自己的保管权限侵占企业物品。",
    analysis: "应按实际身份和权限审查，不能因管理钱物就套用国家工作人员身份。",
  },
  {
    id: "purpose-motive",
    title: "犯罪目的与犯罪动机",
    rule: "目的指行为人想实现的结果，动机解释为何这样做。特定目的是否属于构成要件，须依具体犯罪判断；非法占有目的要结合取财、处分和归还安排。",
    omission:
      "用途良好不自动消除非法占有目的；事后归还不自动倒改先前目的；有意识地取物也不一定证明同样的占有目的。",
    example: "行为人拿走他人财物出售，准备把钱交给第三人使用。",
    analysis: "钱最终给谁不替代对擅自排除权利人、按己意处分财产的判断。",
  },
  {
    id: "causal-mistake",
    title: "因果过程的认识错误",
    rule: "先确认结果能客观归责于行为，再判断实际过程与预想的偏差是否影响故意评价。危险以不同的生理细节实现，不一定排除故意；完全独立的结果不能仅凭愿望归责。",
    omission:
      "区分客观上没有结果联系与主观上想错过程；不要求认识所有科学细节，也不把任何偏差一概当作不重要。",
    example: "同一危险行为通过两种相互关联的机制造成结果。",
    analysis: "看偏差是否仍在该危险实现范围，不只比较行为人给死因起的名称。",
    sources: ["law", "causalError"],
  },
  {
    id: "anticipated-result",
    title: "结果提前发生",
    rule: "结果比计划早，须看当时是否已经实行犯罪，以及实际结果与先行行为的联系。已实行杀害并由该行为致死，不因尚未完成计划的后续步骤而变成预备。",
    omission:
      "准备阶段造成结果与实行阶段提前完成不同；不能以行为人自己说的第一步、第二步代替法律评价。",
    example: "已实施直接危及生命的行为，却在计划的后续动作前出现死亡。",
    analysis:
      "先判断已实施行为的性质，再判断结果；不能仅因后续工具未用就认定中止。",
    sources: ["law", "causalError"],
  },
  {
    id: "late-result",
    title: "结果推迟发生与阶段认识",
    rule: "结果推迟发生，是先误以为已经造成结果，后续行为才真正导致结果。后行为的罪过，要以实施它时的认识为准；前后行为如何整体评价，还涉及因果关系和不同学说。",
    omission:
      "‘先以为已死’不代表后来一直这样认为；发现仍有生命迹象会改变后阶段的认识判断。不能只看最终死因而抹去前一行为。",
    example: "行为人原认为对象死亡，后又收到明确生命迹象。",
    analysis: "应按新信息重新判断后阶段认识，不机械套用持续误认的结论。",
    sources: ["law", "causalError"],
  },
  {
    id: "unlawfulness-mistake",
    title: "违法性认识错误",
    rule: "认识案件事实与知道法律评价是不同问题。不知罪名或刑期不当然排除故意；声称误以为合法时，要核对信息条件、具体告知、咨询及错误能否避免。",
    omission:
      "不懂法律术语与无法认识行为违法有别。是否影响责任，要结合具体错误、可避免性及采用的评价观点，不能一律免责或一律忽略。",
    example:
      "经营者签收了针对其行为的具体禁止告知，却仍用同行惯例解释自己以为合法。",
    analysis:
      "具体告知是判断其认识与错误可避免性的重要事实，但不能替代刑事法律依据及其他构成。",
    sources: ["law", "lawAwareness"],
  },
];

export const packageOneKnowledge = Object.fromEntries(
  cards.map((c) => [c.id, { rule: c.rule, omission: c.omission }]),
);
export const packageOneTopics: FaultTopic[] = cards.map((c) => ({
  id: c.id,
  title: c.title,
  headline: c.title,
  goal: c.rule,
  prerequisite: "可直接查看要点或进入练习。",
  minutes: "3–5",
  paragraphs: [c.rule, c.omission],
  pitfall: c.omission,
  example: { title: "一个区别", facts: c.example, analysis: c.analysis },
  recall: { prompt: "本知识的适用条件是什么？", reference: c.rule },
  sources: c.sources ?? ["law"],
  exercises: packageOneCases
    .filter((q) => q.topicId === c.id)
    .map((q) => q.exercise),
}));
