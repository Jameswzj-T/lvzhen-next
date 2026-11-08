import { AccountLinkForm } from "@/accounts/link-form";
import { connection } from "next/server";
import { runtimeConfig } from "@/runtime/config";
export default async function VerifyPage() {
  await connection();
  return (
    <AccountLinkForm mode="verify" local={runtimeConfig().mode === "local"} />
  );
}
