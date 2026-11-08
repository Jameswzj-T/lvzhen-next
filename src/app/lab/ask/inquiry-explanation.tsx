import type { InquiryReply } from "@/domain/question-inquiry";
import d from "../_components/reading-document.module.css";

export function InquiryExplanation({
  text,
  reply,
  pending,
  showQuestion = true,
}: {
  text: string;
  reply: InquiryReply | null;
  pending: boolean;
  showQuestion?: boolean;
}) {
  const result = reply?.result;
  return (
    <section
      className={d.document}
      aria-label="这次疑问的解释"
      data-inquiry-explanation
    >
      {showQuestion && (
        <>
          <h2 className={d.heading}>你的问题</h2>
          <blockquote className={d.original}>{text}</blockquote>
        </>
      )}
      {(pending || !result) && (
        <p className={d.paragraph} role="status">
          {pending ? "正在想一想这道题……" : reply?.message}
        </p>
      )}
      {result && (
        <>
          <h3 className={d.subheading}>
            {result.kind === "insufficient_basis"
              ? "目前能说清的部分"
              : "这道题可以这样理解"}
          </h3>
          <p
            className={d.paragraph}
            style={{ whiteSpace: "pre-wrap" }}
            data-inquiry-answer
          >
            {result.explanation}
          </p>
          {result.uncertainty && (
            <p className={d.paragraph} data-inquiry-uncertainty>
              还说不准的是：{result.uncertainty}
            </p>
          )}
          <details className={d.answerDetails}>
            <summary>查看依据与后台记录</summary>
            <p className={d.note}>
              这份疑问单独保存，没有覆盖答卷或改变掌握记录。解释来自
              DeepSeek；引用核对不等于专业审校，未发送其他历史答卷。
            </p>
            {reply?.message && <p className={d.note}>{reply.message}</p>}
            {result.basis.map((item, i) => {
              const source = result.sources.find(
                (s) => s.sourceId === item.sourceId,
              );
              return (
                <div key={i}>
                  <blockquote className={d.original}>{item.quote}</blockquote>
                  {source && (
                    <p className={d.note}>
                      <a href={source.url} target="_blank" rel="noreferrer">
                        {source.title}
                      </a>{" "}
                      · {source.scope}
                    </p>
                  )}
                </div>
              );
            })}
          </details>
        </>
      )}
    </section>
  );
}
