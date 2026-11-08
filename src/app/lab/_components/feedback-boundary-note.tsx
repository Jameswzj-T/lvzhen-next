import { procurementContentNote } from "@/content/criminal-procurement-content-corrections";
import { feedbackBoundaryNote } from "@/content/criminal-feedback-boundary-corrections";

export function FeedbackBoundaryNote({ questionId }: { questionId: string }) {
  const note =
    feedbackBoundaryNote(questionId) ?? procurementContentNote(questionId);
  if (!note) return null;
  return (
    <aside aria-label="本问作答范围说明">
      <h4>{note.previousVersion ? "旧版作答范围澄清" : "本问作答范围"}</h4>
      <p>{note.scope}</p>
      {note.previousVersion && (
        <p>
          下方保留当时的题目与参考；原答、旧评分契约和已有评分未被改写。以上按新版说明澄清题外要求，不追溯重新计分。
        </p>
      )}
      <details>
        <summary>补充学习（不作为额外必答项）</summary>
        <p>{note.supplement}</p>
      </details>
    </aside>
  );
}
