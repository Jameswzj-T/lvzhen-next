import { civilContractPerformanceTopic } from "./civil-insecurity-stages-registration";

/** Current learning copy includes the later registered remedies questions.
 * Historical topics, questions, source snapshots and grading tasks stay intact. */
export const civilContractPerformanceReadingTopic = {
  ...civilContractPerformanceTopic,
  goal: "联系履行顺序和风险证据，判断何时可以拒绝或中止履行、何时应恢复，以及合理期限后可以采取什么救济。",
  paragraphs: [
    ...civilContractPerformanceTopic.paragraphs.slice(0, 2),
    "应先履行的一方，有确切证据证明对方存在严重亏损、转移财产逃债等法定风险，可以中止履行，并应及时通知对方。仅有无出处的传闻不够；通知也不需要先取得对方同意。对方提供适当担保后，应恢复履行（第527、528条）。",
    "依法中止后，对方在合理期限内既未恢复履行能力，也未提供适当担保，中止方可以解除合同，并可请求对方承担违约责任。具备解除权不等于合同已自动解除，还须依法行使。先有确切风险再中止、取得担保后恢复、合理期限后进一步救济，是三个不同阶段。",
  ],
  recall: {
    prompt: "风险出现后，何时可中止、何时应恢复，合理期限后还可怎样处理？",
    reference:
      "先履行方凭确切风险证据中止，并及时通知；对方提供适当担保后应恢复。合理期限内既未恢复能力也未提供适当担保，可以依法解除并请求违约责任，不能把有解除权直接当成合同已经解除。",
  },
};
