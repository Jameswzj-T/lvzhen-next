import {
  allowScoringTrialRequest,
  evaluateScoringTrial,
} from "@/evaluation/scoring-trial";
import { scoringTrialRequest } from "@/evaluation/scoring-trial-contract";
import { scoringTrialMaterial } from "@/evaluation/scoring-trial-catalog";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (!allowScoringTrialRequest(request))
    return Response.json({ error: "unavailable" }, { status: 403, headers });
  let input;
  try {
    const text = await request.text();
    if (text.length > 20000)
      return Response.json(
        { error: "invalid-input" },
        { status: 413, headers },
      );
    input = scoringTrialRequest.parse(JSON.parse(text));
    if (
      scoringTrialMaterial(input.caseId, input.exerciseRevision)
        .exerciseRevision !== input.exerciseRevision
    )
      throw new Error("question-revision-mismatch");
  } catch {
    return Response.json({ error: "invalid-input" }, { status: 400, headers });
  }
  try {
    return Response.json(
      await evaluateScoringTrial(input, { repo: process.cwd() }),
      { headers },
    );
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503, headers });
  }
}
