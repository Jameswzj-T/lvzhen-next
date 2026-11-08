import type { Metadata } from "next";
import { ModelSettings } from "./model-settings";
import { SupportFrame } from "@/app/lab/_components/support-frame";
import { learningReturnHref } from "@/learning/navigation";
export const metadata: Metadata = { title: "模型设置 · 律真" };
export default async function ModelSettingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  return (
    <SupportFrame>
      <ModelSettings
        returnHref={learningReturnHref(
          typeof query.returnTo === "string" ? query.returnTo : undefined,
        )}
      />
    </SupportFrame>
  );
}
