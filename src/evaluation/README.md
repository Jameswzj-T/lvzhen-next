# B-ENG-001 离线评阅边界

入口：在本工作树运行 `./checks/evaluation-offline.sh`。复用现有 TypeScript、Zod、Vitest，无新增依赖或包配置修改。工作树的 node_modules 可链接现有安装，只读使用。

- `inputSchema` 保存案例 ID／版本、设问、案情、具有 ID 的要点与规则依据，以及答卷 ID 和未经改写的学生原文。案例版本也固定该版要点／规则；变更内容应更新版本。
- `buildModelInput` 显式选择输入字段；不会复制额外的答卷预期、其他答案或历史。规则依据和教学要点本身是被测模型需要的数据。调用方不得把留出预期塞进这些字段；字段选择和提示指令不构成完备的提示注入防护。
- `validateResult` 检查结构、ID／版本、要点集合、状态及连续原文引用。covered／partial／contradicted 要求证据；missing／uncertain 可以没有证据。无评阅结果的 criteria 为空，不能含学生问题；needs_clarification 必须有澄清问题。没有总分。
- `runOffline` 在空白时跳过执行器，执行或返回校验失败归 system_error；原文、结果、测量分离保存。输入本身不合法则抛出 Zod 错误，不伪造已接收答卷。失败只记录固定类别，不保留任意异常文本。
- `createFakeExecutor` 仅返回调用方提供的固定夹具，不判断法律或匹配关键词。`Executor` 保留为离线边界，`runOffline` 只应注入离线执行器；B-ENG-003 的独立供应商适配见下文。
- 测量 source 为 offline_fake，其余均 null，包括调用次数、时间、token 和费用，不冒充真实调用。measurementSchema 预留 real_provider 来源；真实执行路径须自行采集完整费用；新增 provider 路径见下文，不改变原离线测量语义。

独立开发夹具测试否定、口语、局部正确、矛盾、信息不足的原文保存与状态传输，不证明这些状态语义正确。另有故意不可靠但结构合法的评阅，明确演示机械检查的边界。未读质量留出样本、未以现有预期答案调参、未进行真实模型调用或独立法律验收。

返修补充：`runOffline(input, executor, { timeoutMs })` 默认 5 秒，可配置为 1 至 2,147,483,647 的整数毫秒；非法配置在执行前拒绝。超时归 `system_error`，failure 为 `execution_timeout`；执行异常、校验异常及合法 `system_error` 返回统一归 `execution_or_validation_failed`。成功、失败及超时均清理计时器。此为异步逻辑超时，不能抢占同步阻塞，也不等于取消底层请求；本入口仍只用于离线执行器，不接真实请求。

## B-ENG-003：显式供应商协议与反馈转换

新增 `provider.ts` 与 `feedback.ts`，不导入页面，不更改学习记录格式。协议对照 [DeepSeek Chat Completions 官方文档](https://api-docs.deepseek.com/api/create-chat-completion/)（2026-09-08）：非流式 POST、system/user messages、JSON object 输出、finish_reason 和 usage。本适配是 JSON Chat Completions 协议实现；没有宣称已验证所有兼容供应商，具体模型、地域、参数组合仍需后续实测。

- `runChatCompletion(input, config, options)`：config 明确完整 HTTPS endpoint、model、总 timeoutMs 和 maxTokens；可选 temperature、thinking、reasoningEffort 集中在此配置。options 必须注入 transport 和内存 credential，无环境变量或文件读取。URL 禁止内嵌用户名、密码、查询与 fragment。非法输入／配置在调用前拒绝；固定错误类别只用于已经接收的答卷处理失败。
- `Transport` 含 `source`（offline_fake 或 real_provider）和 `send(request)`。请求仅含已白名单化的单份题目／答卷，不含额外预期或其他答卷。`createFetchTransport(fetchImpl)` 需显式传入 fetch；创建／导入均无网络副作用。真实来源还必须传 `allowRealCall: true`，该标记由后续已获授权的调用方设置，不代表本模块能替代产品授权检查。只允许可信调用方构造 transport；任意实现伪报 source 无法由协议适配器识别。
- fetch transport 的 Promise 覆盖 HTTP 响应及完整 body 读取，禁止重定向。内部 AbortController 联动外部 AbortSignal 和总超时；transport 无视 signal 时，Promise race 仍停止等待。没有重试或备用路径。JavaScript 同步阻塞不能被计时器抢占，但返回前再次检查总耗时，超限不会返回成功。
- failure 固定分类：aborted、timeout、transport_error、http_error、response_parse_error、response_shape_error、refused、truncated、unexpected_finish、result_parse_error、result_validation_error、provider_system_error。这些均给出无学生判定的 system_error，原始答卷独立返回；错误体、异常文本、headers 和凭据不写入返回记录。
- 测量记录请求 model 与服务商实际返回 model、responseId、systemFingerprint、完整耗时、一次调用计数与 token 明细。指纹不当作模型版本，无法取得独立版本时 modelVersion 为 null。DeepSeek 的缓存 hit/miss 及兼容响应的 cached_tokens、reasoning_tokens 分开记录；不存在或无效的数值为 null，不按文字估算。离线 transport 的来源保持 offline_fake，费用始终 null；其中返回 token 只是夹具数据，不能报告为真实消耗。
- `calculateCost(usage, actualModel, price)` 只有显式、带来源 URL／核对日期、匹配返回模型的价格配置才计算。inputBilling 明确 uniform 或 cache_split；分档缓存缺少命中数／价格则未知。outputIncludesReasoning 必须明确为 true，避免重复加算 reasoning；其他计费口径暂不支持。数值关系矛盾时保持未知。价格为调用方核验的配置，没有默认价格或自动抓价；总服务费用、失败请求实际账单仍可能未知。
- `toFeedback(input, raw)` 在展示边界重新使用 validateResult，返回关联 ID、原文、要点证据、实质问题、术语建议和澄清状态。未作答／系统失败无错误清单，没有掌握率或总分。合法结构仍可能有语义误判，这由独立语义评测检验。

本批检查：`pnpm exec vitest run src/evaluation`、`pnpm typecheck`。不依赖 QA 留出数据。真实供应商连接、凭据、模型语义质量、真实延迟和账单、浏览器反馈接入均未测试。

## B-ENG-004：批次演练

`batch.ts` 导出 `batchInputSchema`、`batchPlanSchema`、`validateBatch` 与 `runBatch`；`batch-files.ts` 提供独占文件输出。输入包契约严格为 `{schemaVersion:1,batchId:"B-004",samples:[{sampleId,group,input}]}`。1–12 份非空答卷，sampleId 唯一；额外字段（包括嵌套 expected）在整批发送前拒绝。输入在校验时复制，发送仍经过单份白名单，不传 sampleId/group 或同包其他答卷。只用自造协议夹具开发，未读取 QA 输入或预期。

离线复现（从仓库根目录执行，输出目录与 run-id 可自行指定）：

```sh
node checks/pilot-004-offline.cjs dry-run --input checks/pilot-004-demo.json --output /tmp/lvzhen-pilot-004 --run-id demo-001
node checks/pilot-004-offline.cjs offline --input checks/pilot-004-demo.json --output /tmp/lvzhen-pilot-004 --run-id demo-001
```

dry-run 仅校验并输出样本数、计划次数及原文件 SHA-256，不写结果或发送。offline 使用纯内存 fake transport，固定为待澄清，不判断法律；24 次是夹具调用次数，successes 是协议可转换数（含澄清），不是答对数或模型质量。入口没有 real 模式、Key 参数、默认 fetch 或凭据读取。它使用现有 TypeScript 在内存加载当前源码，必须另外完成类型检查。假费用预留为每次 0.01 FAKE、总上限 1 FAKE；这些只是命令入口明确提供的演练假设，真实费用始终 null。

计划要求显式提供：runId、mode、1–2 个唯一模型及完整 config、每模型 maxCalls（1–12）、maxTotalCalls（1–24）、每模型 price（可 null）、budget.currency/limit、每个模型与样本配对的 maxCost/basis，以及 saveTimeoutMs（1–5000）。单请求 timeoutMs 不超过 20000。校准先于留出；两个模型全局串行，样本顺序相同。限额可设得更低，未执行项由 manifest 与 summary.remaining 定位。本轮任何评阅失败均停止整批（比只停止该模型更保守），不自动重试或换模型。

真实路径仅供后续获准调用方显式注入：每个模型的可信 real_provider transport、内存 credentials、allowRealCall:true；本轮命令不能启用它。offline/real 与 transport.source 必须匹配。测试中的 real_provider 标记只用于内存夹具覆盖真实分支，不代表发生真实网络调用。

费用口径采用既有 priceSchema，并要求价格模型及币种匹配；缺口径时零后续发送。每次发送前，已知累计费用加调用方提供的保守 maxCost 不能超过预算；每笔费用未知、实际超过所报上界、下一次超过预算即停止。已发生费用与 unknownCostCalls 分列，knownCost 只是已知部分，存在未知时不能当整批总价。假模式只累计 fakeReservedCost。调用方须提供经核对的完整输入、输出余量及计费口径依据；basis 是调用方声明，运行器不自动证明它，不用字符数冒充 token 上界，也不能保证供应商账单封顶。

每次先独占写入 intent，再调用，完成反馈转换后写 result，之后才能发下一次。result 含样本身份、原答、结果及 failure、模型与计量、费用，以及 feedbackDurationMs（从该样本执行开始到反馈转换完成；不含落盘、上一条等待或页面展示）。manifest 保存输入、参数、假设及输入文件原始字节 SHA-256；不含 runtime/credentials。summary.json 是机器可读简报，CLI 同时打印简报。

文件夹按 runId 独占创建，文件用 wx 写入并 sync，不复用或覆盖旧输出；保存异常或等待超时停止发送，返回 save_failed，并在内存返回已完成记录。若 result 未落盘，先前 intent 的 pending_or_unknown 不能算零调用；若 summary 缺失，整批不能认定已完成。保存超时不能取消底层文件系统操作，迟到写入可能出现，但没有新请求。断电、进程强杀或损坏磁盘下的完整恢复未实现；不要仅凭缺结果推断未收费。

本轮支持的候选组合固定为 DeepSeek-V4-Flash 非思考（thinking=disabled，outputTokenParameter=max_tokens，无 reasoningEffort）与 Qwen3.8-Flash 非思考（reasoningEffort=none，outputTokenParameter=max_completion_tokens，无 thinking）。两者均 JSON object、非流式；其他思考模式或字段混用在批次入口拒绝。通用 provider 增加输出限制字段选择与 none 枚举，不自动识别供应商；批次外仍由调用方承担组合验证责任。

官方核对（2026-09-08）：[DeepSeek Chat Completions](https://api-docs.deepseek.com/api/create-chat-completion/)；[Qwen Chat 参数](https://help.aliyun.com/zh/model-studio/qwen-api-via-openai-chat-completions)；[Qwen3.8-Flash 模型能力](https://help.aliyun.com/zh/model-studio/qwen3-8-flash)。Qwen 文档支持 none 关闭思考及 max_completion_tokens，旧 max_tokens 不作为新接入字段；文档说明完整输出限制可能有最多 10 token 误差，调用方保守估算需包含余量。未核实实际账号、地域、别名稳定性或线上参数接受性；本轮不提供真实价格、输入 token 上界或真实调用许可。

## 原文编号引用（2026-09-09）

批次模板启用 `config.evidenceMode="segment_ids"`。供应商返回 `evidenceIds`，程序按本份原答的标点片段填回原文，再走已有 `validateResult`；前端与保存结果仍使用 `evidence` 字符串数组。完整原答始终一起发送，片段带 UTF-16 起止位置，未知编号、同要点重复编号、缺少必要引用都会拒绝。未设置该配置时保留旧的逐字引用协议，便于旧配置兼容。

模型配置、提示词及分段算法版本共同进入 release 标识；改动任一项须重新验证。编号存在仅保证引文来自原答，不保证它支持判断，也不防止模型在解释文字里误引或推理错误。语义质量仍需单独核对；片段边界不能作为忽略完整语境的理由。

## 2026-09-10 实测决定

保留现有原文编号协议，不增加主张/完整度输出字段。扩展字段候选在同题比较中未优于简单格式，代码、测试及运行结果归档在本机 artifacts/argument-v3-experiment-2026-09-10；未加入学生页面或默认模型服务。

开发资料另做原子要点版本，分开事实识别、应当预见关系和能够预见关系。该拆分在扩展候选的 4 答开发测试通过，在简单格式下仅 2/4 与新预期完全一致，不能声称单靠内容拆分已稳定解决。旧冻结题与预期不变，最新对照结果见 PROJECT_STATUS.md。
