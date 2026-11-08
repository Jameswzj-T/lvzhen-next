import { Annotation, START, END, StateGraph } from "@langchain/langgraph";
import {
  renderQuestionScopedPack,
  assessQuestionScopedTable,
  type QuestionScopedPack,
} from "../question-scoped-table";
import { wholeCaseRequest } from "../whole-case-table";
export type TableModelReply = {
  text: string;
  failure: string | null;
  durationMs: number;
  costCny: number | null;
};
const State = Annotation.Root({
  pack: Annotation<QuestionScopedPack>(),
  request: Annotation<ReturnType<typeof wholeCaseRequest>>(),
  reply: Annotation<TableModelReply>(),
  assessment: Annotation<ReturnType<typeof assessQuestionScopedTable> | null>(),
});
// A real, bounded graph: one reader, no retries or semantic repair loops.
export function buildTableTrialGraph(
  readModel: (
    request: ReturnType<typeof wholeCaseRequest>,
  ) => Promise<TableModelReply>,
) {
  return new StateGraph(State)
    .addNode("assemble", ({ pack }) => ({
      request: wholeCaseRequest(renderQuestionScopedPack(pack), "off"),
    }))
    .addNode("read_model", async ({ request }) => ({
      reply: await readModel(request),
    }))
    .addNode("validate_and_score", ({ pack, reply }) => ({
      assessment: reply.failure
        ? null
        : assessQuestionScopedTable(reply.text, pack),
    }))
    .addEdge(START, "assemble")
    .addEdge("assemble", "read_model")
    .addEdge("read_model", "validate_and_score")
    .addEdge("validate_and_score", END)
    .compile();
}
