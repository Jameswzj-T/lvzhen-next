import { AccountLinkForm } from "@/accounts/link-form";
import { connection } from "next/server";
import { runtimeConfig } from "@/runtime/config";
export default async function ResetPage() {
  await connection();
  return (
    <AccountLinkForm mode="reset" local={runtimeConfig().mode === "local"} />
  );
}
