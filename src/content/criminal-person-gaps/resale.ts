import type { ContentSources, FaultTopic } from "../fault-unit";
import { choice, written } from "../criminal-package-one/authoring";
import { personKnowledge, personSources } from "../criminal-person/knowledge";

export const resaleRevision = "criminal-trafficked-resale-2026-09-30.v1";
const topicId = "buying-trafficked";
const context = {
  exam: true,
  sources: ["resaleLaw"],
  related: ["human-trafficking", "multiple-crimes"],
};
export const resaleCases = [
  choice(
    "person-resale-later-purpose",
    topicId,
    "收买之后改变主意",
    "成年甲明知一名七周岁儿童被他人拐卖，起初为自己抚养而付款接收，当时没有再出售的打算。数月后，甲另外产生出卖该儿童的想法，收取另一人的价款后将儿童交给对方，所得与当初支付的价款相同。本题仅评价这段收买与出卖，没有另行伤害、非法拘禁等独立行为。",
    "就题设两段行为的罪名及罪数，哪项判断正确？",
    [
      [
        "先后有收买和出卖动作，必须将两个罪分别定罪并罚。",
        "不能跳过第二百四十一条第五款对收买后又出卖的特别规定。",
      ],
      [
        "最初为了抚养，只能按收买处理，后来出卖不影响定性。",
        "最初没有出卖目的不抹去后来另起故意并出卖的行为。",
      ],
      [
        "依第二百四十一条第五款，按第二百四十条的拐卖儿童罪定罪处罚，不把该收买和又出卖机械并罚。",
        "将先收买、后另起出卖故意的事实与特别条款相连。",
      ],
      [
        "没有赚取差价，所以收买和出卖均不构成犯罪。",
        "取得差价不是该特别规则的必要条件，不能以没有获利推翻题设行为。",
      ],
    ],
    "c",
    "甲先明知被拐卖而收买，后来另起出卖故意并实际出卖同一儿童，直接适用第二百四十一条第五款，依第二百四十条按拐卖儿童罪定罪处罚。不能仅按动作数将这段收买与出卖机械数罪并罚，也不能因最初想抚养或未赚差价而免责。本题未给出其他独立侵害，不对题外罪数作判断。",
    context,
  ),
  written(
    "person-resale-purpose-timeline",
    topicId,
    "出卖目的形成的时间",
    "案一：成年甲明知一名儿童已被他人拐卖，最初为自己抚养而付价接收，没有再卖的打算；后来另起出售的想法，收款并将该儿童交给新的买受者。案二：成年乙从一开始就打算转卖，明知另一名儿童被拐卖，仍为出售而付价接收，随后收款转卖。两名儿童均为七周岁，仅评价各自收买和出卖这段行为；没有另行伤害、非法拘禁等独立行为。",
    "分别说明两案适用的条款与理由；是否应因为都有收买、出卖两个动作，就一律将收买罪与拐卖罪并罚？",
    "案一最初是明知被拐卖而收买，后来才形成出卖目的并实际又出卖，依第二百四十一条第五款转按第二百四十条的拐卖儿童罪定罪处罚。案二从收买时已有出卖目的，其收买即属于第二百四十条列举的拐卖行为之一，后续出售不使同一拐卖过程机械拆成收买罪与拐卖罪并罚。两案定罪均指向拐卖儿童，但依据的行为与目的时间线不同。不能把第二百四十一条关于收买后另行强奸、拘禁等的并罚规则挪用到这里；若另有独立侵害，仍应依法另作评价，本题未作该设定。",
    [
      [
        "案一后来又出卖",
        "最初无出卖目的的收买，后来另起出卖故意并出卖同一儿童，依第二百四十一条第五款按第二百四十条定罪。",
        "不能因为最初想抚养就始终只按收买处理。",
      ],
      [
        "案二原有出卖目的",
        "案二收买时已有出卖目的，收买本身属于第二百四十条列举的拐卖行为之一。",
        "区分原有与后起目的，不将二者的起始适用依据混为一谈。",
      ],
      [
        "同段行为不机械并罚",
        "本题两案均不能仅按收买、出卖两个动作将收买罪与拐卖罪机械并罚，结合各案适用条款说明即可。",
        "不要求另列题外犯罪名称；不能误套收买后另行强奸、拘禁等的并罚规则，也不推广为有独立侵害仍永不并罚。",
      ],
    ],
    context,
  ),
];
export const resaleSources: ContentSources = {
  ...personSources,
  resaleLaw: {
    title: "《中华人民共和国刑法》第二百四十条、第二百四十一条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5212248/content.html",
    note: "2026-09-30直读税总法规库刑法正文，对照第240条出卖目的及列举行为、第241条第4款并罚与第5款收买后又出卖。仅补这项明文规则，不穷尽拐卖加重、其他侵害和复杂共犯。旧题已有收买后拘禁并罚，故不重复新增该基本情形；案例均克制虚构。",
  },
};
export const resaleKnowledge = {
  [topicId]: {
    rule: `${personKnowledge[topicId].rule} 最初无出卖目的，后来另起出售故意并又出卖，依第241条第五款按第240条处理；从收买时就为出售，收买已是第240条列举行为之一。`,
    omission: `${personKnowledge[topicId].omission} 收买后又出卖的特别规则与收买后另行强奸、拘禁的并罚条款要分开；不按动作数机械并罚，也不因没有赚差价否定出卖。题外独立侵害仍依法评价。`,
  },
};
export const hasResaleKnowledge = (id: string) => id === topicId;
export function expandResaleKnowledge(topic: FaultTopic): FaultTopic {
  if (!hasResaleKnowledge(topic.id)) return topic;
  const content = resaleKnowledge[topicId];
  return {
    ...topic,
    goal: content.rule,
    paragraphs: [content.rule, content.omission],
    pitfall: content.omission,
    recall: {
      ...topic.recall,
      reference: `${content.rule}\n${content.omission}`,
    },
    sources: [...new Set([...topic.sources, "resaleLaw"])],
  };
}
