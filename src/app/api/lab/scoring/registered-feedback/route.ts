import { createLocalRegisteredQuestionFeedbackHandler } from "../../../../../evaluation/registered-question-feedback-local";
import { createOwnKeyFeedbackHandler } from "@/model-access/feedback-handler";
import { usesOwnModelKey } from "@/model-access/access";
export const runtime = "nodejs";
const local = createLocalRegisteredQuestionFeedbackHandler();
const ownKey = createOwnKeyFeedbackHandler();
export const POST = (request: Request) =>
  usesOwnModelKey(request) ? ownKey(request) : local(request);
