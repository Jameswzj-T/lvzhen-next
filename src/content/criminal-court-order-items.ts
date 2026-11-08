import type { ContentSources } from "./fault-unit";
import { choice } from "./criminal-package-one/authoring";
import { courtOrderTopic, courtOrderTopicId } from "./criminal-court-order";

// Question-only addition. The earlier teaching revision and its two cases stay intact.
export const courtOrderItemRevision =
  "criminal-court-order-items-2026-10-03.v1";
export const courtOrderItemSources: ContentSources = {
  courtOrderItemsLaw: {
    title: "《中华人民共和国刑法》第三百零九条第（二）、（三）项",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5212248/content.html",
    note: "2026-10-03直接定向读取税总标注全文有效、收录至修正案（十二）的正文，第（二）项列殴打司法工作人员或诉讼参与人，第（三）项另列不听制止和严重扰乱条件。自编虚构题仅核能否以无人预先制止直接排除第（二）项，不给最终定罪、刑罚或伤势门槛，不声称专业或官方评分验收。",
  },
};

export const courtOrderItemCases = [
  choice(
    "cl17-court-order-assault-no-warning",
    courtOrderTopicId,
    "殴打路径是否必须先有制止",
    "成年甲在人民法院审理一件民事案件时，为阻止审理，故意当庭连续拳打正在主持庭审的审判长，随后被法警控制。甲动手前，法庭没有向他发出制止指令。甲辩称，只有不听法庭制止才可能构成扰乱法庭秩序罪，既然此前没人制止，就应直接排除该罪。题设没有进一步展开伤势及其他犯罪判断事实。",
    "仅核对甲提出的这一排除理由与第309条第（二）、（三）项的明文条件，下列判断正确的是？本题不要求给出最终定罪或刑罚。",
    [
      [
        "理由成立，第（二）项的殴打也必须先有制止并拒不听从。",
        "把第（三）项言语侵害路径的不听制止条件移到了第（二）项；第（二）项没有这一明文条件。",
      ],
      [
        "理由不能成立，不能仅因没有预先制止就排除第（二）项的殴打路径。",
        "第（二）项规定殴打司法工作人员或者诉讼参与人，须依该项审查当庭行为；第（三）项的不听制止条件不能机械移用。",
      ],
      [
        "理由不能成立，但第（二）项明文规定必须先证明轻伤以上才能审查。",
        "第（二）项没有写这一伤势门槛，不能另造明文条件；本题也没有要求对伤势和最终定罪作判断。",
      ],
      [
        "理由成立，本条只适用于刑事案件，民事庭审中的殴打均被排除。",
        "第309条未把适用范围限于刑事庭审，民事案件的法庭秩序语境不能因此直接排除；仍须审查具体行为。",
      ],
    ],
    "b",
    "选B。第309条第（二）项列的是殴打司法工作人员或者诉讼参与人；不听法庭制止是第（三）项言语侵害路径的明文条件。题设为民事庭审中故意当庭殴打审判长，不能仅因动手前没有制止指令，就直接排除第（二）项。应保留法庭秩序语境并核对具体行为及相应犯罪条件，不能由本问对该理由的否定直接替代最终定罪。也不另加条文没有规定的轻伤门槛。",
    { sources: ["courtOrderItemsLaw"] },
  ),
];

export const courtOrderItemSnapshot = {
  topics: [
    {
      ...courtOrderTopic,
      sources: Object.keys(courtOrderItemSources),
      exercises: courtOrderItemCases.map(({ exercise }) => exercise),
    },
  ],
  sources: courtOrderItemSources,
};
