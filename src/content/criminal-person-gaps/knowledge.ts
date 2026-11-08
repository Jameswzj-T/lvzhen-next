import type { ContentSources, FaultTopic } from "../fault-unit";
import { personKnowledge, personSources } from "../criminal-person/knowledge";

export const personGapSources: ContentSources = {
  ...personSources,
  personGapLaw: {
    title:
      "《中华人民共和国刑法》第十四、二十三、二十四、九十四、二百三十四、二百三十六及二百三十六条之一、二百三十七、二百四十六、二百四十七条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5212248/content.html",
    note: "2026-09-30通过权威网页工具读取国家税务总局法规库标注全文有效、收录至修正案（十二）的正文。本组只补年龄认识证据、明确的未遂/中止、成年对象公共场所当众、强制侮辱、证人暴力取证及公然侮辱的限定事实；不是全部加重、年度考纲或专业验收。均为克制虚构案例。",
  },
  minorSexualOpinion: {
    title: "两高两部《关于办理性侵害未成年人刑事案件的意见》（2023年）",
    url: "https://www.court.gov.cn/fabu/xiangqing/401012.html",
    note: "2026-09-30读取最高法2023-05-25发布正文，核对第17条年龄认识、第29条证据及第40条效力。2023-06-01施行并废止2013年《关于依法惩治性侵害未成年人犯罪的意见》（法发〔2013〕12号）。本文件是《意见》，不是法释〔2023〕3号《解释》；不将实际知道写成唯一认识路径，也不从事后年龄证明直接倒推行为时认识。",
  },
  offenseNames: {
    title: "两高《关于执行〈中华人民共和国刑法〉确定罪名的补充规定（六）》",
    url: "https://www.court.gov.cn/zixun/xiangqing/15891.html",
    note: "法释〔2015〕20号。2026-09-30读取最高法正文，核对第237条第一、二款现行罪名为强制猥亵、侮辱罪；强制侮辱可依具体行为选用，不把旧罪名或一般辱骂女性等同本罪。",
  },
  onlineDefamation: {
    ...personSources.onlineDefamation,
    url: "https://www.court.gov.cn/fabu/xiangqing/5680.html",
    note: "法释〔2013〕21号，2013-09-10施行。2026-09-30读取最高法正式正文第1至3条；同一网络诽谤信息浏览五千或转发五百的规定，不是所有侮辱行为的通用入罪线，也不自动等于公诉条件。本包未复制该解释中的真实案件。",
  },
};

export const personGapKnowledge: Record<
  string,
  { rule: string; omission: string }
> = {
  rape: {
    rule: `${personKnowledge.rape.rule} 奸淫幼女的年龄认识须依法综合审查知道或应当知道的证据，结合证明内容及其联系区分客观年龄与行为时认识，不能仅以侦查收集日期判断证明力。已着手后，因外力未得逞是未遂；既遂前仍能继续而自动放弃可成立中止。`,
    omission: `${personKnowledge.rape.omission} 未遂可以比照既遂犯从轻或减轻；中止无损害应免、有损害应减。未发生性关系或无明显外伤，不能直接推定没有任何损害。`,
  },
  "sexual-molestation": {
    rule: `${personKnowledge["sexual-molestation"].rule} 本组以强制脱衣等涉性羞辱事实，区分强制侮辱妇女与一般辱骂；基本犯不要求公然，报复动机也不当然排除。对成年对象，公共场所与当众均有事实支持时可适用第二款该项加重，不必同时聚众。`,
    omission: `${personKnowledge["sexual-molestation"].omission} 普通辱骂不能仅因对象为女性就套本罪；地点名为车站不等于当众。本卡不穷尽未成年人及其他全部加重规定。`,
  },
  "official-coercion": {
    rule: `${personKnowledge["official-coercion"].rule} 对证人暴力逼取证言与对嫌疑人、被告人逼取口供须区分。同一取证暴力直接致人伤残、死亡，依第247条转按伤害、杀人条款定罪并从重；本组只练重伤致残、因果明确的伤害情形。`,
    omission: `${personKnowledge["official-coercion"].omission} 基本犯罪不要求已有伤残死亡，也不能把任何轻伤直接当作伤残转换。转换定罪后，不把同一段行为及结果机械重复并罚。`,
  },
  "defamation-insult": {
    rule: `${personKnowledge["defamation-insult"].rule} 公然性、情节严重及告诉条件须分别核对；公开点名、反复羞辱与明确严重后果相结合，不能只从地点或一句骂语跳到犯罪。`,
    omission: `${personKnowledge["defamation-insult"].omission} 一对一未传播的一般骂语不能当然认定公然；不构罪不等于正当。侮辱与诽谤分开判断，特定网络诽谤数量不能机械套作所有侮辱的必要或充分条件。`,
  },
};
export const hasPersonGapKnowledge = (id: string) =>
  Object.hasOwn(personGapKnowledge, id);
export function expandPersonGapKnowledge(topic: FaultTopic): FaultTopic {
  const content = personGapKnowledge[topic.id];
  const addedSources =
    topic.id === "rape"
      ? ["minorSexualOpinion"]
      : topic.id === "sexual-molestation"
        ? ["offenseNames"]
        : [];
  return content
    ? {
        ...topic,
        goal: content.rule,
        paragraphs: [content.rule, content.omission],
        pitfall: content.omission,
        recall: {
          ...topic.recall,
          reference: `${content.rule}\n${content.omission}`,
        },
        sources: [
          ...new Set([...topic.sources, "personGapLaw", ...addedSources]),
        ],
      }
    : topic;
}
