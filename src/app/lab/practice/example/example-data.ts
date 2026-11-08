import { createHash } from "node:crypto";
import savedExample from "../../../../content/fictional-learning-process-20261009.json";
import { currentQuestionTeacher } from "../../../../domain/current-question-teacher";
import { inquiryReplySchema } from "../../../../domain/question-inquiry";
import { EXAMPLE_REFERENCE_PRACTICE_HREF } from "../../../../domain/learning-example-source";

export const LEARNING_EXAMPLE_SHA256 =
  "0ef52e3b7feb7e115837054ddd49726bbb968b2e0955f8612f6ab987713c0ba0";
export const EXAMPLE_PRACTICE_HREF = EXAMPLE_REFERENCE_PRACTICE_HREF;

/** One explicitly fictional public corpus, imported statically. No filesystem
 * lookup, learner state, account, provider or path selected from a URL. */
export function readLearningProcessExample(raw: unknown = savedExample) {
  const serialized = JSON.stringify(raw);
  if (
    !serialized ||
    createHash("sha256").update(serialized).digest("hex") !==
      LEARNING_EXAMPLE_SHA256
  )
    throw Error("learning-example-frozen-content-changed");
  const data = structuredClone(raw as typeof savedExample);
  const initialView = currentQuestionTeacher(
    data.initial.result,
    data.initial.original,
  );
  const reanswerView = currentQuestionTeacher(
    data.reanswer.result,
    data.reanswer.original,
  );
  const inquiry = inquiryReplySchema.parse(data.clarification.reply);
  if (
    data.fictional !== true ||
    !inquiry.result ||
    inquiry.result.identity.text !== data.clarification.text ||
    inquiry.result.identity.questionId !== data.question.id ||
    inquiry.result.identity.questionRevision !== data.question.revision ||
    initialView.binding.questionId !== data.question.id ||
    reanswerView.binding.questionId !== data.question.id ||
    initialView.binding.questionRevision !== data.question.revision ||
    reanswerView.binding.questionRevision !== data.question.revision
  )
    throw Error("learning-example-question-binding");
  // The fixed process shows the later answer followed the displayed explanation.
  // This local process note never replaces the saved model feedback.
  initialView.learningAdvice = {
    text: "目前只根据这一题，先说清你最终选‘全免’还是‘减责’，再补上理由；已经答对的两点不用重写成相反结论。",
    priorAttemptIds: [],
    scope: "same_question_same_revision_local_only",
    currentWithSupport: true,
  };
  reanswerView.learningAdvice = {
    text: "这次看过前面的解释后，三个要点都答到了；接着另选一道同知识点的题，不看参考再试一次。",
    priorAttemptIds: [data.initial.original.id],
    scope: "same_question_same_revision_local_only",
    currentWithSupport: true,
  };
  return {
    question: { ...data.question },
    initial: { ...data.initial, view: initialView },
    clarification: { text: data.clarification.text, reply: inquiry },
    reanswer: { ...data.reanswer, view: reanswerView },
  };
}

export type LearningProcessExample = ReturnType<
  typeof readLearningProcessExample
>;
