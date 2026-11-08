import type { ContentSources, FaultTopic } from "../fault-unit";
import { generalSources } from "../criminal-general/knowledge";

export const executionSources: ContentSources = {
  ...generalSources,
  executionLaw: {
    title: "《中华人民共和国刑法》第四十一、四十四、四十七、六十九至八十六条",
    url: "https://tianjin.chinatax.gov.cn/11200000000/0300/030004/03000418/20240920152615743.shtml",
    note: "2026-09-30在用户本机Chrome读取天津市税务局公布、标注全文有效的刑法（至修正案十二），逐条核对本组刑种折抵、并罚、缓刑及减刑假释规则。本组为原创限定事实训练题，不涉及指定居所监视居住、特殊减刑间隔、日历端点或年度考纲完整性；法条核对不等于独立专业验收。",
  },
};
export const executionKnowledge: Record<
  string,
  { rule: string; omission: string }
> = {
  "sentence-credit": {
    rule: "管制、拘役、有期徒刑从判决执行之日起计算。先区分刑种：判决执行前先行羁押一日折抵管制二日，折抵拘役、有期徒刑各一日。再核对执行记录，同一羁押期间只计入一次。漏罪并罚决定新执行刑期后，已执行刑期应计入其中。",
    omission:
      "已执行刑期若已包含先行羁押，不可再从余刑另扣。缓刑考验期不等于已执行有期徒刑。本卡只讲通常羁押折抵；其他强制措施、特殊制度另查对应规则。",
  },
  "combined-sentence": {
    rule: "漏罪先并后减：原判刑罚与判决前漏罪并罚，再计入已执行刑期；新罪先减后并：前罪余刑与新罪并罚。普通有期徒刑并罚在最高单刑至总和之间，总和不满三十五年上限二十年，达到三十五年上限二十五年。",
    omission:
      "不能重复扣已执行刑期，也不能把范围上限当成唯一答案。徒刑与拘役并存执行徒刑；徒刑或拘役执行完毕后管制仍须执行。附加刑仍执行，同种合并、异种分别执行。",
  },
  suspension: {
    rule: "拘役或三年以下有期徒刑，同时满足情节较轻、悔罪、无再犯危险、社区无重大不良影响等条件，可以缓刑；未满十八岁、怀孕、已满七十五岁者符合前提应当缓刑。累犯和犯罪集团首要分子不得缓刑。拘役考验期为原判以上一年以下、至少二个月；有期徒刑为原判以上五年以下、至少一年，均从判决确定起算。考验期内新罪或发现漏罪应撤销并罚；严重违反监督规定或禁止令应撤销、执行原判。",
    omission:
      "度过的缓刑考验期不作为已执行徒刑折抵。严重违令但未构成新罪，不另造一罪并罚；轻微违规不能一概撤销。无撤销事由而期满是原判刑罚不再执行，附加刑仍须执行。",
  },
  "reduction-parole": {
    rule: "减刑是依法减少刑罚，假释是附条件提前释放，二者都须法院依法裁定。减刑后实际执行期限有底线：管制、拘役、有期徒刑不少于原判二分之一，无期不少于十三年，限制减刑死缓另有特别底线。通常假释时间门槛为有期徒刑执行原判一半、无期实际十三年，并须满足悔改、无再犯危险等条件，经法定程序，考虑社区影响。",
    omission:
      "累犯及因法定暴力犯罪被判十年以上徒刑、无期者不得假释；十年包括本数，累犯不另要求十年。财产判项有能力拒不履行与确无能力不能混同，年限和积分不能替代实质审查。最低执行期限不是自动释放日期。假释考验期：有期为余刑，无期十年，从假释日起算；无撤销事由而期满认为原判刑罚已执行完毕。考验期新罪按第七十一条、发现漏罪按第七十条并罚。",
  },
};
export const hasExecutionKnowledge = (id: string) =>
  Object.hasOwn(executionKnowledge, id);
export function expandExecutionKnowledge(topic: FaultTopic): FaultTopic {
  const content = executionKnowledge[topic.id];
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
        sources: [...new Set([...topic.sources, "executionLaw"])],
      }
    : topic;
}
