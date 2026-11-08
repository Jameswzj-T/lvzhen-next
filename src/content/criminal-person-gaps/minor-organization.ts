import type { ContentSources, FaultTopic } from "../fault-unit";
import { choice, written } from "../criminal-package-one/authoring";
import { capstoneKnowledge } from "../criminal-capstone/knowledge";
import { capstoneSources } from "../criminal-capstone/sources";

export const minorOrganizationRevision =
  "criminal-minor-organization-2026-09-30.v1";
const topicId = "organizing-minor-offenses";
const context = { exam: true, sources: ["minorOrganizationLaw"] };
export const minorOrganizationCases = [
  choice(
    "person-minor-voluntary-recruitment",
    topicId,
    "自愿参加能否免责",
    "成年甲查看真实身份证后，明知三名少年均为十六周岁，仍召集他们实施一次虚假抽奖骗款，安排各人分工，并要求所得交给自己。三人明白内容后自行同意，甲未殴打、威胁或限制三人离开。三人按安排共同骗得一名路人600元。当地诈骗入罪数额为5000元；没有其他取财行为或特殊入罪事实。甲辩称：没有强迫他们参加，所以自己不可能构成组织未成年人进行违反治安管理活动罪。",
    "仅就甲提出的这一辩解，哪项判断正确？",
    [
      [
        "辩解成立，该罪必须以暴力、胁迫组织未成年人。",
        "将第二百六十二条之一组织乞讨的手段条件误套到第二百六十二条之二。",
      ],
      [
        "辩解不成立；明知年龄而召集、分工并实际组织诈骗性质的治安违法，不因少年自愿参加而排除该罪。",
        "须根据实际组织及法定活动判断，第二百六十二条之二未以暴力、胁迫为必要。",
      ],
      [
        "所有组织者都只对未满十四岁的人承担本罪责任。",
        "第二百六十二条之二使用未成年人，不应照搬组织乞讨中的年龄条件。",
      ],
      [
        "只要最终不足5000元，组织者就一定没有刑事责任。",
        "基础诈骗的数额条件不能抹去组织未成年人治安违法的独立规定。",
      ],
    ],
    "b",
    "辩解不成立。甲明知三人均为未成年人，实际召集、安排分工并组织其实施诈骗性质的治安违法，不能因未殴打、威胁或少年自愿参加就排除第二百六十二条之二的责任。与第二百六十二条之一的组织乞讨不同，该条不以暴力、胁迫为必要。600元未达题定诈骗数额，不等于组织者绝无刑责。本题只补非强制组织的明确辩解，不增设人数、次数或严重情节的通用门槛。",
    context,
  ),
  written(
    "person-minor-two-organizing-rules",
    topicId,
    "不能互换的手段条件",
    "案一：成年甲核知三名少年均为十六周岁后，召集他们，安排分工实施一次虚假抽奖，三人自行同意并按安排共同骗得一名路人600元，所得交甲。甲没有对三人使用暴力、胁迫或限制人身自由。当地诈骗入罪数额为5000元，题目没有其他取财或特殊入罪事实。案二：成年乙安排三名十三周岁儿童在指定地点接受路人自愿施舍；未使用暴力、威胁、扣留、限制离开或其他强制手段，也没有诈骗、追讨纠缠等其他行为。只比较刑法第二百六十二条之一、之二，不判断题外责任。",
    "评价‘两案都没有暴力胁迫，因此当然都不适用这两条’的说法，说明两条的手段条件为什么不能相互搬用。",
    "该说法对两案一概排除不当。案一有明知未成年年龄、实际召集分工及实施诈骗性质治安违法的事实，第二百六十二条之二不以暴力、胁迫为必要，自行同意不能排除组织者责任。案二仅依现有事实缺少第二百六十二条之一要求的暴力、胁迫手段，不能直接按该条定罪。不能把第一条的手段条件搬到后一条，也不能从后一条不要求强制，反推所有组织儿童乞讨均适用；不符合这两条不意味着行为正当或题外责任一概不存在。",
    [
      [
        "案一非强制组织",
        "甲明知未成年年龄、召集分工并实际组织诈骗性质治安违法，不因三人自行同意而排除第二百六十二条之二。",
        "不能把基础诈骗数额或没有暴力当作组织者当然免责理由。",
      ],
      [
        "案二法定手段",
        "案二虽涉及不满十四周岁儿童乞讨，题设没有暴力、胁迫，不能据现有事实直接按第二百六十二条之一认定。",
        "对象和组织事实不能替代该条另有的手段要求，不偷补隐性胁迫。",
      ],
      [
        "区别与结论边界",
        "两条手段与活动条件不能互套；案二仅有接受自愿施舍，现有事实不足以按第二百六十二条之二补作定罪。",
        "不扩张到所有组织未成年人活动一律犯罪，亦不凭题外事实一概免除其他责任。",
      ],
    ],
    { ...context, related: ["child-abduction"] },
  ),
];
export const minorOrganizationSources: ContentSources = {
  ...capstoneSources,
  minorOrganizationLaw: {
    title: "《中华人民共和国刑法》第二百六十二条之一、第二百六十二条之二",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5212248/content.html",
    note: "2026-09-30经权威网页工具读取税总法规库现行刑法对应正文，直接对照组织乞讨与组织未成年人治安违法的手段、对象及活动。本组只补非强制组织的明确辨析；不凭换案例宣称新增全部规则，不设人数次数或严重情节通用线，不讨论其他罪数。均为虚构教育案例。",
  },
};
export const minorOrganizationKnowledge = {
  [topicId]: {
    rule: `${capstoneKnowledge[topicId].rule} 第二百六十二条之二不以暴力、胁迫为必要；明知年龄而实际招募、分工、指挥并组织实施规定活动，不能仅因少年自愿参加排除责任。`,
    omission: `${capstoneKnowledge[topicId].omission} 与第二百六十二条之一须以暴力、胁迫组织残疾人或不满十四周岁者乞讨的规定分开，不能互套手段和对象条件；不据此认定所有组织未成年人活动均犯罪。`,
  },
};
export const hasMinorOrganizationKnowledge = (id: string) => id === topicId;
export function expandMinorOrganizationKnowledge(
  topic: FaultTopic,
): FaultTopic {
  if (!hasMinorOrganizationKnowledge(topic.id)) return topic;
  const content = minorOrganizationKnowledge[topicId];
  return {
    ...topic,
    goal: content.rule,
    paragraphs: [content.rule, content.omission],
    pitfall: content.omission,
    recall: {
      ...topic.recall,
      reference: `${content.rule}\n${content.omission}`,
    },
    sources: [...new Set([...topic.sources, "minorOrganizationLaw"])],
  };
}
