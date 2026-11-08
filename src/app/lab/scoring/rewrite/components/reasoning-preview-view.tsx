import React from "react";
import Link from "next/link";
import type { ReasoningReadback } from "@/evaluation/rewrite-comparison/reasoning-readback";
import type { ReasoningPreview } from "@/evaluation/rewrite-comparison/reasoning-preview";
import d from "../../../_components/reading-document.module.css";
import s from "./component.module.css";
import p from "./reasoning-preview.module.css";

export default function ReasoningPreviewView({
  entry,
  reviewed,
}: {
  entry: ReasoningPreview;
  reviewed?: ReasoningReadback;
}) {
  return (
    <main className={`${s.page} ${d.document} ${p.page}`}>
      <nav className={p.nav} aria-label="预览返回">
        <Link prefetch={false} href="/lab/assessment?paper=cap-contract-v2">
          去日常练习这道题
        </Link>
        <Link prefetch={false} href="?sample=UB02&flow=rewrite">
          返回本机重答与对照
        </Link>
        <Link prefetch={false} href="/lab/practice?view=library">
          题库
        </Link>
      </nav>
      <p className={d.note}>
        {reviewed
          ? "本机反馈回看 · 固定虚构样本 · 两份已审读"
          : "本机测试预览 · 全新虚构样本 · 尚未发送"}
      </p>
      <h1>
        {reviewed ? "两份重答，理由改对了吗" : "先看清这2次测试要发送什么"}
      </h1>
      <p className={d.paragraph}>
        这次测试只检查一个完整小问中，两项关键理由有没有改正：有限责任形式、内部人员亲自实施，是否被误用来排除单位犯罪。
        公司用款表达正确，不能代替这两项推理；题设未知的事实保留条件判断，不当成学生漏答。
      </p>
      {reviewed ? (
        <section className={s.boundary} aria-label="已审读结果范围">
          <h2>本批已结束，下面是人工审读后的局部反馈</h2>
          <p>
            这两份是开发者编写的虚构原答与重答。反馈只确认公司形式与单位意志的两项理由；完整原文保留，新保存的其他重答仍尚未评阅。
          </p>
          <p>
            第一份：用途改了，但理由仍错。第二份：两项理由已纠正，未知条件保留。点击下面的小结可对照完整原文。
          </p>
          <nav className={p.nav} aria-label="两份结果小结">
            {reviewed.samples.map((sample) => (
              <a key={sample.id} href={`#${sample.id}-feedback`}>
                {sample.title}
              </a>
            ))}
          </nav>
          <p className={d.note}>
            本批已完成2次；输入{reviewed.inputTokens}、输出
            {reviewed.outputTokens} token，按实际usage和高峰价保守估算¥
            {reviewed.estimatedCny.toFixed(8)}
            ，非账单实扣。本页没有发送或自动评分功能。
          </p>
        </section>
      ) : (
        <section
          className={s.boundary}
          aria-label="发送状态"
          id="preview-only-status"
        >
          <h2>当前仅供核对，不会启动测试</h2>
          <p>
            这里没有正在运行的评阅，也不会自动排队。展开材料、勾选阅读项或刷新，不会生成授权、开始有效时窗或发送请求。
          </p>
          <p>
            后续实际发送路线尚未开放。以前的批准记录保留；本页不要求你再次提交同一句批准。
          </p>
        </section>
      )}
      <details className={p.details} open={!reviewed}>
        <summary>
          {reviewed
            ? "本批冻结范围与费用预留（历史说明）"
            : "本次范围与费用上限"}
        </summary>
        <section aria-label="次数与总上限">
          <h2 className={d.heading}>本次范围与费用上限</h2>
          <dl className={p.budget}>
            <dt>数据</dt>
            <dd>
              LRF01／LRF02：下面完整列出的虚构题干、原答、独立重答及公开法源
            </dd>
            <dt>服务模型</dt>
            <dd>DeepSeek · {entry.model} · 非思考模式</dd>
            <dt>本批上限</dt>
            <dd>
              最多{entry.budget.maximumCalls}次；每次预留¥
              {entry.budget.perCallCny.toFixed(2)}；合计不超过¥
              {entry.budget.totalCny.toFixed(2)}
            </dd>
            <dt>执行方式</dt>
            <dd>
              串行，先审第一份完整回执再决定第二份；失败不自动重试，未知用量停止
            </dd>
            <dt>有效时窗规则</dt>
            <dd>
              {reviewed ? (
                "本批于2026-10-03 04:25:42–05:25:42 UTC的一小时时窗内完成，两次已用完。"
              ) : (
                <>
                  后续若由本人明确确认，从实际确认起{entry.windowHours}
                  小时；当前没有新窗口或倒计时
                </>
              )}
            </dd>
          </dl>
          <p className={d.note}>
            两次仍计入原¥{entry.budget.aggregateCny}／
            {entry.budget.aggregateCalls}次总预算。冻结时已有
            {entry.budget.usedCallsAtFreeze}次，按已知usage估算¥
            {entry.budget.estimatedCnyAtFreeze.toFixed(8)}
            ；执行前须重新核账。这些是历史记录和费用预留，不是本次实际扣费。
          </p>
          <p className={d.note}>
            不发送你的真实原答、其他私人材料、参考答案或人工事前判据；不改旧答、分数、掌握记录、账本或停止证据。
          </p>
        </section>
      </details>
      <section aria-label="完整虚构题干与小问">
        <h2 className={d.heading}>{entry.question.title}</h2>
        <p className={d.paragraph}>{entry.question.facts}</p>
        <p className={d.paragraph}>{entry.question.prompt}</p>
        <details className={p.details}>
          <summary>本问要求、条件边界与版本</summary>
          <p>{entry.scopePrompt}</p>
          <ul>
            {entry.question.criteria.map((c) => (
              <li key={c.id}>
                {c.title}：{c.requirement}
              </li>
            ))}
          </ul>
          <p>{entry.caseBoundary.statement}</p>
          <p>{entry.caseBoundary.feedback}</p>
          <p className={d.note}>
            题目版本：{entry.question.exerciseRevision}；本批判断版本：
            {entry.ruleVersion}。本批不据此判整问正确、打分或认定掌握。
          </p>
        </details>
      </section>
      {entry.samples.map((sample, index) => (
        <section
          key={sample.id}
          className={p.sample}
          aria-label={`${sample.id}完整虚构输入`}
        >
          <h2 className={d.heading}>
            测试{index + 1} · {sample.id}
          </h2>
          <p className={d.note}>
            {index === 0
              ? "检验是否会把款项表达改善误当作关键推理改正。"
              : "检验是否能识别针对性理由，同时保留有依据的条件判断。"}
          </p>
          <h3 className={d.subheading}>虚构原答</h3>
          <p className={d.original} data-frozen-original={sample.id}>
            {sample.original}
          </p>
          <h3 className={d.subheading}>全新虚构重答</h3>
          <p className={d.original} data-frozen-rewrite={sample.id}>
            {sample.rewrite}
          </p>
          {reviewed && (
            <section
              id={`${sample.id}-feedback`}
              className={s.boundary}
              aria-label={`${sample.id}已审读反馈`}
              data-reviewed-feedback={sample.id}
            >
              <h3 className={d.subheading}>{reviewed.samples[index].title}</h3>
              <p className={d.note}>
                人工审读采用 · 仅公司形式与单位意志理由 · 不计分、不写掌握
              </p>
              <p className={d.paragraph}>{reviewed.samples[index].expressed}</p>
              <h4>重答已表达的用途原句</h4>
              <blockquote className={d.original}>
                {reviewed.samples[index].benefitQuote}
              </blockquote>
              <p className={d.paragraph}>{reviewed.samples[index].feedback}</p>
              <h4>原答中的理由</h4>
              <blockquote className={d.original}>
                {reviewed.samples[index].originalReasonQuote}
              </blockquote>
              <h4>重答中的理由</h4>
              <blockquote className={d.original}>
                {reviewed.samples[index].rewriteReasonQuote}
              </blockquote>
              <p className={d.note}>
                人工整理的练习提示：{reviewed.samples[index].practice}
              </p>
              <p className={d.note}>
                停产后是否已以犯罪为主要活动仍需事实支撑；题设未知条件不补成已证实，也不算学生漏答。这里只确认两项目标理由，不是整问已改正。
              </p>
              <details className={p.details}>
                <summary>回执与审读来源</summary>
                <p className={d.note}>
                  DeepSeek真实回执：{reviewed.samples[index].responseId}
                  ；审读时间：{reviewed.samples[index].reviewAtUtc}
                  。模型泛化说明留在原回执，未作为新增漏项或扣分依据。
                </p>
              </details>
            </section>
          )}
          <p className={d.note}>
            冻结时最坏费用估算¥{sample.worstCostCny.toFixed(6)}
            ，本次预留仍为¥0.30；不是实际usage或账单。
          </p>
          <details className={p.details}>
            <summary>
              {reviewed ? "本次已发送的冻结请求与指纹" : "完整待发送请求与指纹"}
            </summary>
            <p className={d.note}>请求指纹：{sample.requestHash}</p>
            <pre className={s.raw}>{sample.requestJSON}</pre>
          </details>
        </section>
      ))}
      <section aria-label="公共法源">
        <h2 className={d.heading}>两份请求共用的公开法源</h2>
        {entry.publicSources.map((source) => (
          <article key={source.id}>
            <h3 className={d.subheading}>{source.title}</h3>
            <p className={d.paragraph}>{source.text}</p>
            <a href={source.url} target="_blank" rel="noreferrer">
              查看官方来源
            </a>
          </article>
        ))}
      </section>
      {!reviewed && (
        <details className={`${s.card} ${p.details}`}>
          <summary>查看本人确认前的核对步骤</summary>
          <p>
            下面仅帮助阅读，没有提交或保存确认的功能；勾选不会生效，离开页面不保留这些勾选。
          </p>
          <label className={p.check}>
            <input type="checkbox" />
            我已看过两份完整虚构输入及公开法源。
          </label>
          <label className={p.check}>
            <input type="checkbox" />
            我已了解最多2次、总上限¥0.60及后续一小时规则。
          </label>
          <label className={p.check}>
            <input type="checkbox" />
            我已了解不会发送我的真实答案，也不会据此自动打分或认定掌握。
          </label>
          <p id="send-unavailable">
            实际确认与发送尚未开放。后续由本人明确启动前，还须核对冻结材料、当前价格、剩余额度及正常执行权限；检查不通过就不发送。
          </p>
          <button
            type="button"
            disabled
            aria-describedby="send-unavailable"
            className={p.noSend}
          >
            确认并开始这2次测试（暂未开放）
          </button>
        </details>
      )}
      <details className={p.details}>
        <summary>材料冻结与费用依据</summary>
        <p className={d.note}>
          冻结时间：{entry.frozenAtUtc}；材料指纹：{entry.manifestHash}
        </p>
        <p className={d.note}>
          费用依据核对时间：{entry.budget.pricingCheckedAtUtc}
          ，采用峰值保守估算；实际执行前需重新核对。
        </p>
        <a href={entry.budget.priceUrl} target="_blank" rel="noreferrer">
          DeepSeek官方价格说明
        </a>
      </details>
    </main>
  );
}
