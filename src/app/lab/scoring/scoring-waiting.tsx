"use client";
import { useEffect, useState } from "react";
import s from "./scoring.module.css";

export function ScoringWaiting({ composite = false }: { composite?: boolean }) {
  const [longer, setLonger] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLonger(true), 10000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <p className={s.waiting} role="status">
      <span className={s.waitingDot} aria-hidden="true" />
      {longer
        ? "这次稍久，仍在评阅，请稍候。"
        : composite
          ? "正在核对这份综合答案，结果会保留在这里。"
          : "正在核对得分点，通常约需 5–10 秒。"}
    </p>
  );
}
