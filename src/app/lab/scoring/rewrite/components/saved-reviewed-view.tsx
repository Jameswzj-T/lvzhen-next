import Link from "next/link";
import {
  reviewedFeedbackHref,
  type ReviewedFeedbackSample,
} from "@/domain/reviewed-feedback";
import type { TableAvailability } from "@/evaluation/table-trial/contract";
import type { ReviewedReceiptPreview } from "@/evaluation/rewrite-comparison/reviewed-receipts-preview";
import { LearningFrame } from "../../../_components/learning-frame";
import s from "./reviewed-learning.module.css";

export default function SavedReviewedView({
  entry,
  learningContext,
}: {
  entry: ReviewedReceiptPreview;
  learningContext?: {
    returnHref: string;
    fromRun?: string;
    availability: TableAvailability;
  };
}) {
  const assisted = entry.id === "assisted";
  const currentAnswer = assisted
    ? entry.sources[entry.sources.length - 1]
    : null;
  const reasoningQuote =
    "因为这是有限责任公司，然后这是公司内部人员的行为，不能上升到整个公司的角度。";
  const returnHref =
    learningContext?.returnHref ?? "/lab/assessment?paper=cap-contract-v2";
  const state = learningContext?.availability.state;
  const serviceLabel =
    state === "ready"
      ? "这份保存反馈未重新评阅"
      : state === "paused"
        ? "当前自动评阅已暂停"
        : state === "unknown"
          ? "自动评阅状态待确认"
          : "当前不提供自动评阅";
  const content = (
    <main id={learningContext ? "learning-main" : undefined} className={s.page}>
      <nav className={s.back} aria-label="返回学习">
        <Link prefetch={false} href={returnHref} data-return-to-learning>
          ← 返回本题练习
        </Link>
        <Link prefetch={false} href="/lab/practice?view=library">
          题库
        </Link>
      </nav>
      <header className={s.heading}>
        <h1>
          {assisted ? "单位犯罪｜回看这份答卷" : "单位犯罪｜虚构作答对照"}
        </h1>
        <p className={s.state} data-feedback-use-state>
          已保存答卷的人工复核反馈 · {serviceLabel}
        </p>
      </header>
      <div className={s.content}>
        <div>
          <section className={s.question} aria-labelledby="reviewed-question">
            <h2 id="reviewed-question">本问</h2>
            <p className={s.prompt} data-visible-question>
              {entry.prompt}
            </p>
            <details className={s.details}>
              <summary>查看完整案情与法条依据</summary>
              <p>{entry.facts}</p>
              {entry.publicSources.map((source) => (
                <p key={source.id}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title}
                  </a>
                </p>
              ))}
            </details>
          </section>
          <div data-source-answers>
            {currentAnswer ? (
              <section className={s.answer}>
                <h2>参考 AI 示范后修改的答卷</h2>
                <p className={s.answerText} data-original-answer>
                  {currentAnswer.text}
                </p>
                <details className={s.details}>
                  <summary>查看此前参考的 AI 示范</summary>
                  <p className={s.caption}>
                    这份示范不作为标准答案；两份材料不是两次独立作答。
                  </p>
                  {entry.sources.slice(0, -1).map((source) => (
                    <p className={s.answerText} key={source.label}>
                      {source.text}
                    </p>
                  ))}
                </details>
              </section>
            ) : (
              entry.sources.map((source) => (
                <section className={s.answer} key={source.label}>
                  <h2>{source.label}</h2>
                  <p className={s.answerText}>{source.text}</p>
                </section>
              ))
            )}
          </div>
        </div>
        <div className={s.focus} data-reviewer-notes>
          <h2>{assisted ? "这次先改这一点" : "人工复核说明"}</h2>
          {assisted && currentAnswer ? (
            <>
              <p className={s.caption}>以下为人工复核，不是模型自行修正。</p>
              <blockquote className={s.quote}>
                {currentAnswer.text.includes(reasoningQuote)
                  ? reasoningQuote
                  : currentAnswer.text}
              </blockquote>
              <p>
                仅凭“有限责任公司”或“内部人员实施”，不能直接排除单位犯罪。需要结合本案的公司决策和这笔款项服务谁，说明判断理由。
              </p>
              <ol className={s.steps}>
                <li>先写本案结论，再联系负责人决策与款项用途说明理由。</li>
                <li>
                  区分单位责任与直接责任人员的责任，不能只因是个人实施就排除单位。
                </li>
                <li>
                  公司后来的主要活动未由题设明确，可以作条件判断，无须补造事实。
                </li>
              </ol>
              <section className={s.withdrawal} data-visible-withdrawal>
                <h3>一条旧批评已撤回</h3>
                <p>
                  你已写明款项放入公司。旧模型把“个人实施行为”和“款项归个人”混为一谈，这条批评已撤回。
                </p>
              </section>
              <p className={s.caption}>
                这是本次优先修改的方向，不代表全部问题；这份反馈不改旧分数，也不据此认定已经掌握。
              </p>
            </>
          ) : (
            entry.reviewerNotes.map((note, i) => <p key={i}>{note}</p>)
          )}
          <div className={s.action}>
            {entry.id === "UB02" && (
              <p>
                <Link
                  prefetch={false}
                  href="/lab/scoring/rewrite/components?sample=UB02&flow=rewrite"
                  data-local-rewrite-flow
                >
                  用这份虚构原答走一遍重答与对照（本机候选）
                </Link>
              </p>
            )}
            <Link
              prefetch={false}
              href={returnHref}
              className={s.primary}
              data-rewrite-learning-action
            >
              回到本题，自己再写一次
            </Link>
            <p>
              {learningContext?.fromRun
                ? "返回这份练习，可保存独立重答并对照原答。重答尚未评阅。"
                : "进入本题练习。完成原答后可保存独立重答；不会自动评阅。"}
            </p>
          </div>
        </div>
      </div>
      <section className={s.history} aria-label="反馈详情">
        <details className={s.details}>
          <summary>查看已采用的逐项反馈</summary>
          <p className={s.caption}>
            “已定位”只说明某一项表达，不等于整问答对；以下保留人工采用的模型原文。
          </p>
          <div data-reviewed-content>
            {entry.columns.map((column) => (
              <section key={column.key}>
                <h2>{column.label}</h2>
                {column.items.map((item) => (
                  <article
                    className={s.item}
                    key={item.key}
                    data-adopted-item={item.key}
                  >
                    <h3>{item.title}</h3>
                    {item.status && <p>{item.status}</p>}
                    {item.feedback && (
                      <p data-model-feedback>{item.feedback}</p>
                    )}
                    {item.evidence.map((e, i) => (
                      <div key={i} data-adopted-evidence>
                        {e.sourceLabel && (
                          <p className={s.caption}>引文来源：{e.sourceLabel}</p>
                        )}
                        <blockquote>{e.quote}</blockquote>
                        <p>{e.meaning}</p>
                      </div>
                    ))}
                  </article>
                ))}
              </section>
            ))}
          </div>
        </details>
        <details className={s.details} data-manual-withdrawals>
          <summary>查看未采用判断与完整复核说明</summary>
          <p className={s.caption}>这些旧判断不作为答错、扣分或掌握结论。</p>
          {entry.withheld.map((item) => (
            <article
              className={s.item}
              key={item.key}
              data-withheld-item={item.key}
            >
              <h3>{item.title}</h3>
              <p>{item.reason}</p>
            </article>
          ))}
          {entry.reviewerNotes.map((note, i) => (
            <p key={i}>{note}</p>
          ))}
          <p className={s.caption} data-provenance>
            {entry.provenance}。程序只核对版本和引文绑定，不能代替语义审查。
          </p>
        </details>
        <details className={s.details}>
          <summary>查看两份虚构对照样本</summary>
          <nav className={s.samples} aria-label="已审读记录">
            {[
              ["UB01", "行为与受益"],
              ["UB02", "矛盾与条件"],
              ["assisted", "本次 AI 辅助修改"],
            ].map(([id, label]) => (
              <Link
                key={id}
                prefetch={false}
                href={
                  learningContext
                    ? reviewedFeedbackHref(
                        id as ReviewedFeedbackSample,
                        learningContext.fromRun,
                      )
                    : `?sample=${id}`
                }
                aria-current={id === entry.id ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
            {!learningContext && (
              <Link prefetch={false} href="?sample=R14">
                此前候选
              </Link>
            )}
          </nav>
        </details>
        <details className={s.details} data-raw-history>
          <summary>原始模型回执与记录版本</summary>
          <p>原始回执包含未采用内容，仅供追溯；刷新只读取记录，不调用模型。</p>
          <pre className={s.raw}>{entry.rawModelOutput}</pre>
          <div className={s.version} data-record-version>
            <p>
              回执：{entry.responseId}
              收到：{entry.receivedAt}
              评阅版本：{entry.reviewVersion}
              回看版本：{entry.displayVersion}
            </p>
            <p>
              请求指纹：{entry.requestHash}
              原回执指纹：{entry.receiptHash}
              审读指纹：{entry.reviewHash}
            </p>
            {learningContext && (
              <p>自动评阅状态：{learningContext.availability.message}</p>
            )}
          </div>
        </details>
      </section>
    </main>
  );
  return learningContext ? (
    <LearningFrame section="practice">{content}</LearningFrame>
  ) : (
    content
  );
}
