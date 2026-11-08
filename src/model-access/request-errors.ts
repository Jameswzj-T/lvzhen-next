export type PublicModelRequestCode =
  "server_busy" | "key_busy" | "key_rate" | "request_changed" | "configuration";

export class PublicModelRequestError extends Error {
  constructor(
    public readonly code: PublicModelRequestCode,
    public readonly retryAfter = 1,
  ) {
    super(code);
    this.name = "PublicModelRequestError";
  }
}

// Route bundles can contain separate class constructors while sharing one Node global.
export function isPublicModelRequestError(
  error: unknown,
): error is PublicModelRequestError {
  return (
    error instanceof Error &&
    error.name === "PublicModelRequestError" &&
    "code" in error &&
    [
      "server_busy",
      "key_busy",
      "key_rate",
      "request_changed",
      "configuration",
    ].includes(String(error.code))
  );
}
export function publicModelRequestMessage(error: PublicModelRequestError) {
  return {
    server_busy:
      "网站当前请求较多，本次没有发送给模型，也不会因此产生模型费用。请稍后手动再试。",
    key_busy:
      "你的账号还有 AI 请求正在处理。本次没有再发出请求，请等前一项结束后再试。",
    key_rate: "这一分钟的 AI 请求较多，本次没有发送给模型。请稍后手动再试。",
    request_changed:
      "这份原答或疑问的内容已经变化，本次没有发出新的模型请求。请重新打开对应内容。",
    configuration:
      "AI 服务的运行配置暂不可用，本次没有发送给模型。请联系网站维护者。",
  }[error.code];
}
