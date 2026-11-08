"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  demoScenarios,
  type DemoScenario,
} from "@/evaluation/graph/demo-fixtures";
import type { DemoRequest, GraphDemoResult } from "@/evaluation/graph/service";
import styles from "./graph.module.css";

const nodeNames: Record<string, string> = {
  prepare_run: "准备题目与原答",
  dispatch_groups: "按小问分发",
  collect_groups: "等待各组汇合",
  score_and_render: "固定规则计分",
  persist_result: "保存本次结果",
  prepare_context: "准备本组材料",
  read_group: "首次读取",
  validate_reading: "程序检查",
  route_review: "决定是否局部复核",
  review_group: "独立复核",
  validate_review: "检查复核输出",
  resolve_group: "合并本组结果",
};
export function GraphDemo({
  presets,
}: {
  presets: {
    id: "short" | "long";
    title: string;
    facts: string;
    question: string;
    answer: string;
  }[];
}) {
  const [kind, setKind] = useState<"short" | "long">("long");
  const [scenario, setScenario] = useState<DemoScenario>("normal");
  const [result, setResult] = useState<GraphDemoResult | null>(null);
  const [active, setActive] = useState<DemoRequest | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const runId = params.get("run"),
      kind = params.get("kind"),
      scenario = params.get("scenario");
    if (
      !runId ||
      (kind !== "short" && kind !== "long") ||
      !demoScenarios.some((s) => s.id === scenario)
    )
      return;
    const request: DemoRequest = {
      runId,
      kind,
      scenario: scenario as DemoScenario,
      action: "inspect",
    };
    let live = true;
    setKind(kind);
    setScenario(request.scenario);
    setActive(request);
    setBusy(true);
    fetch("/api/lab/scoring/graph", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Lvzhen-Scoring": "1" },
      body: JSON.stringify(request),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        if (live) setResult(data);
      })
      .catch(() => {
        if (live) setError("暂未读到已保存的运行，可以继续同一次运行。");
      })
      .finally(() => {
        if (live) setBusy(false);
      });
    return () => {
      live = false;
    };
  }, []);
  const preset = presets.find((p) => p.id === kind)!;
  const change = () => {
    setResult(null);
    setActive(null);
    setError("");
    window.history.replaceState(null, "", window.location.pathname);
  };
  async function run(resume = false) {
    const request: DemoRequest =
      resume && active
        ? { ...active, action: "resume" }
        : { runId: crypto.randomUUID(), kind, scenario, action: "run" };
    setActive(request);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${new URLSearchParams({ run: request.runId, kind: request.kind, scenario: request.scenario })}`,
    );
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/lab/scoring/graph", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lvzhen-Scoring": "1",
        },
        body: JSON.stringify(request),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "运行失败；可继续同一次运行。");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className={styles.page}>
      <header>
        <Link href="/lab/scoring/case">← 主观题练习</Link>
        <span>本机 · 流程实验室</span>
      </header>
      <h1>看清一份答案如何被评阅</h1>
      <p className={styles.intro}>
        真实 LangGraph
        主图与子图，使用预设模型响应。这里验证分工、分支和恢复，不评判自由作答，也不证明真实模型的质量或速度。模型费用为
        0。
      </p>
      <section className={styles.controls}>
        <label>
          题目
          <select
            value={kind}
            disabled={busy}
            onChange={(e) => {
              change();
              setKind(e.target.value as "short" | "long");
            }}
          >
            <option value="short">一道短答</option>
            <option value="long">一个五问长案</option>
          </select>
        </label>
        <label>
          查看情形
          <select
            value={scenario}
            disabled={busy}
            onChange={(e) => {
              change();
              setScenario(e.target.value as DemoScenario);
            }}
          >
            {demoScenarios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
        <button disabled={busy} onClick={() => void run()}>
          {busy ? "流程运行中…" : "运行这份样例"}
        </button>
        {active &&
          (error ||
            result?.state === "paused" ||
            result?.state === "recoverable" ||
            result?.state === "running") && (
            <button disabled={busy} onClick={() => void run(true)}>
              继续同一次运行
            </button>
          )}
      </section>
      {error && (
        <p role="alert" className={styles.warning}>
          {error}
        </p>
      )}
      <details className={styles.card}>
        <summary>{preset.title} · 查看题目与预设原答</summary>
        <p>{preset.facts}</p>
        <p>{preset.question}</p>
        <h3>预设原答</h3>
        <p>{preset.answer}</p>
      </details>
      {!result && (
        <div className={styles.empty}>
          选择一个情形运行。你会看到每组如何读取、哪些要点进入复核，以及代码最后如何处理。
        </div>
      )}
      {result && (
        <>
          <div className={styles.summary}>
            <div>
              <small>本次流程</small>
              <strong>
                {result.state === "completed"
                  ? "已完成"
                  : result.state === "paused"
                    ? "已保存断点"
                    : result.state === "running"
                      ? "仍在运行"
                      : "等待恢复"}
              </strong>
            </div>
            <div>
              <small>预设调用记录</small>
              <strong>
                {result.calls === null ? "读取中" : `${result.calls} 次`}
                {result.unknownCalls
                  ? ` · ${result.unknownCalls} 次无回执`
                  : ""}
              </strong>
            </div>
            <div>
              <small>工程样例分数</small>
              <strong>
                {result.score
                  ? result.score.total === null
                    ? `待核对 · 已确定 ${result.score.confirmed} 分`
                    : `${result.score.total} / ${result.score.max}`
                  : "尚未计分"}
              </strong>
            </div>
          </div>
          <section className={styles.card}>
            <h2>主流程</h2>
            <ol className={styles.flow}>
              {result.trace.map((t) => (
                <li key={t.node}>
                  <b>{nodeNames[t.node] ?? t.node}</b>
                  <span>{t.detail}</span>
                </li>
              ))}
            </ol>
          </section>
          <h2>每个小问的处理记录</h2>
          <div className={styles.groups}>
            {result.groups.map((g, index) => (
              <details
                className={styles.card}
                key={g.groupId}
                open={g.status !== "completed"}
              >
                <summary>
                  {kind === "short" ? "短答" : `第 ${index + 1} 问`}
                  <span className={styles.tag}>
                    {g.status === "completed"
                      ? "处理完成"
                      : g.status === "pending"
                        ? "仍有待核对"
                        : "读取失败"}
                  </span>
                </summary>
                <ol className={styles.flow}>
                  {g.trace.map((t) => (
                    <li key={t.node}>
                      <b>{nodeNames[t.node] ?? t.node}</b>
                      <span>{t.detail}</span>
                    </li>
                  ))}
                </ol>
                <p className={styles.note}>
                  两次一致也可能同时理解错误。这里展示的是流程决定，不是正确性证明。
                </p>
              </details>
            ))}
          </div>
          {result.score && (
            <section className={styles.card}>
              <h2>代码计分结果</h2>
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>采分项</th>
                      <th>结果</th>
                      <th>反馈</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.score.items.map((p) => (
                      <tr key={p.id}>
                        <td>{p.title}</td>
                        <td>
                          {p.earned === null
                            ? "待核对"
                            : `${p.earned} / ${p.max}`}
                        </td>
                        <td>{p.feedback}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
          <p className={styles.note}>
            运行编号：{result.runId}
            。断点与调用回执保存在本机数据库；不写入考生学习记录。
          </p>
        </>
      )}
    </main>
  );
}
