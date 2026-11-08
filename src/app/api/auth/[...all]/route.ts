import { accountAuth } from "@/accounts/auth";
import { accountHandler } from "@/accounts/http";
export const runtime = "nodejs";
export const GET = accountHandler(accountAuth);
export const POST = GET;
