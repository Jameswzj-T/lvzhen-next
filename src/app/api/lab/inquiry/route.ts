import { createQuestionInquiryHandler } from "../../../../evaluation/question-inquiry-local";
import { createOwnKeyInquiryHandler } from "@/model-access/inquiry-handler";
import { usesOwnModelKey } from "@/model-access/access";
export const runtime = "nodejs";
const local = createQuestionInquiryHandler();
const ownKey = createOwnKeyInquiryHandler();
export const POST = (request: Request) =>
  usesOwnModelKey(request) ? ownKey(request) : local(request);
