import { createLocalUnitFeedbackHandler } from "../../../../../evaluation/unit-feedback-local";
export const runtime = "nodejs";
// No shipped grant or automatic activation. Authorized local grants still need a user's explicit click.
export const POST = createLocalUnitFeedbackHandler();
