import type { ContentSource } from "@/content/fault-unit";
import d from "./reading-document.module.css";

// Only shorten the displayed document name. The caller supplies the sources
// already listed for this question/topic; no article or legal mapping is inferred.
export function ReferenceSources({
  sources,
}: {
  sources: (ContentSource & { id: string })[];
}) {
  if (!sources.length) return null;
  return (
    <div data-reference-sources>
      <p className={d.sources}>
        参考依据：
        {sources.map((source, index) => (
          <span key={source.id}>
            {index > 0 ? "、" : ""}
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.title.match(/《[^》]+》/)?.[0] ?? source.title}
            </a>
          </span>
        ))}
      </p>
      <details className={d.sourceDetails}>
        <summary>查看资料说明与核对范围</summary>
        {sources.map((source) => (
          <article key={source.id}>
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.title}
            </a>
            <p>{source.note}</p>
          </article>
        ))}
      </details>
    </div>
  );
}
