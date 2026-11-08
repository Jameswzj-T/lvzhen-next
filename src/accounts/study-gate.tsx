"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { accountChangeKey, currentLearner, type Learner } from "./client";

export function StudyGate({
  children,
}: {
  children: (user: Learner) => ReactNode;
}) {
  const [identity, setIdentity] = useState<{ user: Learner } | null>(null);
  const [failed, setFailed] = useState(false);
  const [revision, setRevision] = useState(0);
  const requestVersion = useRef(0);
  const refresh = useCallback(() => {
    requestVersion.current++;
    setIdentity(null);
    setFailed(false);
    setRevision((n) => n + 1);
  }, []);
  useEffect(() => {
    let active = true;
    async function verify() {
      const version = ++requestVersion.current;
      try {
        const user = await currentLearner();
        if (active && version === requestVersion.current)
          setIdentity((previous) =>
            previous && previous.user?.id === user?.id ? previous : { user },
          );
      } catch {
        // Refocusing must not discard current offline work when the connection fails.
        if (active && version === requestVersion.current) setFailed(true);
      }
    }
    void verify();
    function changed(e: StorageEvent) {
      if (e.key === accountChangeKey || e.key === null) refresh();
    }
    const focused = () => {
      void verify();
    };
    window.addEventListener("storage", changed);
    window.addEventListener("focus", focused);
    return () => {
      active = false;
      window.removeEventListener("storage", changed);
      window.removeEventListener("focus", focused);
    };
  }, [revision, refresh]);
  if (!identity)
    return (
      <main style={{ maxWidth: 620, margin: "80px auto", padding: 24 }}>
        <p role="status">
          {failed
            ? "暂时无法确认登录状态，已有记录保持原样。"
            : "正在打开你的学习空间……"}
        </p>
        {failed && <button onClick={refresh}>重新连接</button>}
        {failed && (
          <p>
            <button
              onClick={() => {
                requestVersion.current++;
                setIdentity({ user: null });
              }}
            >
              继续本地试学
            </button>
          </p>
        )}
        {failed && (
          <p>
            <a href="/account">查看账号</a>
          </p>
        )}
      </main>
    );
  return children(identity.user);
}
