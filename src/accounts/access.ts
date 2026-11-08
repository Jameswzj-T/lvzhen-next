import { allowApplicationRequest } from "../runtime/access";
export function localAccountAccess(request: Request) {
  return allowApplicationRequest(request);
}
export const privateReply = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
