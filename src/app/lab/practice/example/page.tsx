import type { Metadata } from "next";
import { readLearningProcessExample } from "./example-data";
import { exampleSteps, LearningExampleView } from "./example-view";

export const metadata: Metadata = {
  title: "示例学习过程 · 律真",
  description: "只读查看一份虚构答卷的原答、同题澄清和独立重答。",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ step?: string | string[] }>;
}) {
  const requested = (await searchParams).step;
  const step =
    exampleSteps.find((item) => item.id === requested)?.id ?? "initial";
  return (
    <LearningExampleView example={readLearningProcessExample()} step={step} />
  );
}
