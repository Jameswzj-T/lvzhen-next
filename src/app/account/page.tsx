import { connection } from "next/server";
import { runtimeConfig } from "@/runtime/config";
import AccountForm from "./account-form";
export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string }>;
}) {
  await connection();
  const target = (await searchParams).returnTo;
  if (runtimeConfig().mode === "public")
    return (
      <main
        style={{
          maxWidth: 640,
          margin: "64px auto",
          padding: 24,
          lineHeight: 1.9,
        }}
      >
        <a href="/lab/study">← 返回学习</a>
        <h1>你的学习空间</h1>
        <p>
          当前免费版无需注册。学习位置、原答、草稿和讲解保存在这个浏览器里，离开后可以接着学。
        </p>
        <p>
          换设备时，可以导出学习记录，再在新设备导入。模型 Key
          单独保存在浏览器，不会放进备份。
        </p>
        <p>
          <a href="/settings/model">模型设置</a> ·{" "}
          <a href="/records">学习记录与备份</a> ·{" "}
          <a href="/records/import">导入记录</a>
        </p>
      </main>
    );
  const returnTo =
    target === "records"
      ? "/records"
      : target === "study"
        ? "/lab/study"
        : target === "ask"
          ? "/lab/ask"
          : target === "practice"
            ? "/lab/practice"
            : target === "lesson"
              ? "/lab/lesson?view=map"
              : target === "lesson-import"
                ? "/records/import?source=lesson"
                : target === "records-import"
                  ? "/records/import"
                  : target === "unit"
                    ? "/units/fault"
                    : "/lab/study";
  return (
    <AccountForm local={runtimeConfig().mode === "local"} returnTo={returnTo} />
  );
}
