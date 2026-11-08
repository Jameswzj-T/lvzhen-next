import {
  allowLessonTrialRequest,
  evaluateLessonTrial,
} from "@/evaluation/lesson-feedback-trial";
import { lessonFeedbackRequest } from "@/evaluation/lesson-feedback-contract";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (!allowLessonTrialRequest(request))
    return Response.json({ error: "unavailable" }, { status: 403, headers });
  try {
    const text = await request.text();
    if (text.length > 40000)
      return Response.json(
        { error: "invalid-input" },
        { status: 413, headers },
      );
    const parsed = lessonFeedbackRequest.safeParse(JSON.parse(text));
    if (!parsed.success)
      return Response.json(
        { error: "invalid-input" },
        { status: 400, headers },
      );
    return Response.json(
      await evaluateLessonTrial(parsed.data, {
        repo: process.cwd(),
        fromUI: true,
      }),
      { headers },
    );
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503, headers });
  }
}
