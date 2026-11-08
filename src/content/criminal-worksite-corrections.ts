import { longCases } from "./criminal-capstone/long-cases";
import { capstoneSources } from "./criminal-capstone/sources";

export const worksiteCorrectionRevision =
  "criminal-worksite-corrections-2026-09-24.v1";
export const worksiteCorrectionSources = capstoneSources;

const original = longCases.find((c) => c.id === "cap-worksite")!;
const facts = [
  "甲是某施工项目的实际负责人。设备检验报告和现场停工通知均要求更换已经出现裂纹的吊装连接件，报告载明继续吊装可能导致构件坠落。甲签收后，为赶交付期限，在项目群写下‘今晚只吊轻件、载重减半，再加一根保险索；非操作人员先撤出吊装区’，仍以扣薪、立即辞退相要挟，要求操作员乙继续作业。乙读过报告，按甲的安排减载、加索并作业。连接件断裂时，保险索也被坠落构件扯断，造成留在作业位置的一名工人死亡、两名工人受伤。技术调查确认违规吊装直接造成事故，减载和加索均不能替代更换连接件。",
  ...original.facts.split("\n\n").slice(1),
].join("\n\n");

// The entire five-question case gets a new shared stem and IDs. Old responses
// and the former scoring-card hold remain attached to the published v1 case.
export const revisedWorksiteCase = {
  id: "cap-worksite-v2",
  title: original.title,
  facts,
  cases: original.cases.map((old, i) => {
    const exercise = old.exercise;
    if (exercise.kind !== "subjective")
      throw new Error("Worksite case must be subjective");
    const id = `cap-worksite-v2-q${i + 1}`;
    const revisedReason =
      "甲乙明知继续吊装存在危险，仍违规指挥、操作；但减载、加索和撤离非操作人员等行为，是判断二人试图避免伤亡而非放任伤亡的事实依据。不得只由故意违规推出共同故意造成伤亡。";
    const criteria = (exercise.criteria ?? []).map((point, index) =>
      i === 3 && index === 0
        ? {
            ...point,
            id: `${id}-p${index + 1}`,
            meaning: revisedReason,
            acceptable: `意思相当且能联系本案事实即可：${revisedReason}`,
          }
        : { ...point, id: `${id}-p${index + 1}` },
    );
    return {
      ...old,
      replaces: exercise.id,
      exercise: {
        ...exercise,
        id,
        caseId: "cap-worksite-v2",
        title: `${original.title} · 第${i + 1}问（新版）`,
        facts,
        criteria,
        ...(i === 3
          ? {
              reference:
                "共同指挥与操作不等于共同故意造成伤亡。甲乙看过危险警示仍继续作业，但减载、加索及安排人员撤离，是其试图避免伤亡的事实依据；对事故结果可按各自过失、义务和因果联系分别评价。依刑法第二十五条，共同过失不以共同犯罪论处。若另有放任伤亡的证据，应另审，不能仅凭共同违规直接认定或排除。",
            }
          : {}),
      },
    };
  }),
};

export const worksiteCorrections = revisedWorksiteCase.cases;
