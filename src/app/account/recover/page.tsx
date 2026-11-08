import { connection } from "next/server";
import { runtimeConfig } from "@/runtime/config";
import RecoverForm from "./recover-form";
export default async function RecoverPage() {
  await connection();
  return <RecoverForm local={runtimeConfig().mode === "local"} />;
}
