# 律真

免费、开源的法考练习工具，按 MIT 许可提供。网站计划部署在 **https://lvzhen.net**；当前源码不代表该域名已经上线。网站提供题目和学习体验，使用者自备模型账号并承担模型费用。

首版以预览版提供，适合配合教材做练习。AI 讲解和题库会持续修正；当前学习记录保存在本浏览器，跨设备需要自己导出、导入文件。

## 可以做什么

- 从知识目录进入，按章节连续做选择题、主观题和完整写作；无需逐题返回目录。
- 先看逐项解答，再看考点和案情点拨；主观原答交给 AI 解释做对了什么、还要补什么。
- 对已登记答疑资料的题目继续提问。资料未齐备的题会明确提示，不假装已经接通。
- 自动保存本浏览器中的原答、草稿、讲解和位置，支持 JSON 导出、导入。当前公共版无需账号，记录不会自动跨设备同步。
- 首页提供可选的今日安排，接着草稿、回练需要补充的地方，也能直接自由选题。安排按实际提交更新，允许跳过。
- 在 `/records` 的“我的学习”回看各科原答、保存的讲解和疑问；知识点显示已看、已练及还需练，并能找到对应依据。不凭一次答对计算掌握率。

当前十科队列共2570题，包含1421道选择、1149道自由作答。题量是产品练习范围；年度完整范围及专业审校仍须继续核对，练习不代表正式考试评分。

## 自己的 API Key

打开 `/settings/model`，填写并保存自己的 DeepSeek Key。首版支持 `deepseek-flash`、显式关闭 thinking；材料、判定与反馈沿用当前基线。

Key 保存在当前浏览器的 localStorage，关闭后仍保留，可以更换或删除。它不进入账号、学习 JSON 或备份。请求 AI 时，本站后端临时接收 Key 并转发到官方固定端点，不写入数据库或日志；Key 没有额外的本地加密，勿在不受信任的设备保存。保存 Key 不会测试调用或收费。

没有 Key 也能做题、看固定参考和保存原答。AI 仅在主动提交评阅或提问时调用；请求失败不自动重发。网站不代收模型费用，余额、调用明细以自己的模型平台账单为准。服务商 API 协议适用于各自账号，本项目不是服务商的官方产品。

## 本地开发

使用 Node.js 22.23.1 或受项目支持的 Node 24，安装 pnpm 11。项目的 `devEngines.runtime` 指定24.20.0；pnpm可能下载项目运行时。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

访问 `http://127.0.0.1:3107`，到模型设置填自己的 Key 即可使用 BYOK。无需准备本机开发者的 Key 文件或评测 artifacts。已有本机开发模式保留，仅设置了自己的 Key 的请求走 BYOK。

## 部署到自己的 HTTPS 网站

公共模式无需数据库、SMTP或运营者模型 Key。学习内容在浏览器保存；服务器提供 Next.js 页面和请求转发。使用 `LVZHEN_ENV=public` 和自己的 `LVZHEN_APP_ORIGIN`。该地址必须是实际访问用的 HTTPS 域名，不能信任任意转发头。

先在目标 Linux 主机运行 `sh deploy/public/inspect-host.sh`，查看系统、剩余内存/磁盘、容器和22/80/443等端口的占用。脚本不安装软件、不调用模型、不读取环境密钥或学习数据，也不更改服务；SSH部分只显示公开主机指纹。已有站点与服务先保留，资源是否够用以当前机器的检查结果为准。

Docker + Caddy 示例位于 `deploy/public/`。域名解析到已准备的服务器后，从干净的公开源码目录执行：

```sh
LVZHEN_DOMAIN=lvzhen.net docker compose -f deploy/public/compose.yaml up -d --build
```

Caddy处理HTTPS，Node只对容器网络开放3000端口；服务器需要能连接 DeepSeek 官方接口。不要在反向代理、监控或错误采集中记录 Authorization 头、Key或请求正文。此模板尚需在实际 Linux 主机完成容器和域名验收，不能把本机构建成功当作已经部署。

也可以自行安装依赖后构建：`pnpm build`。运行 standalone 产物时，将 `.next/static` 复制到 `.next/standalone/.next/static`，有 `public/` 资源时也复制过去；在 standalone 目录设置上面两个环境变量后运行 `node server.js`。这是 Node 应用，不能只把目录上传到静态网页空间。

Ubuntu 上也可使用 `deploy/public/standalone/` 的 systemd、环境和 Caddy 模板。Node standalone 已在目标 Linux/x64 主机完成构建与本机 HTTP 验证；Docker 容器运行、正式服务和公网 HTTPS 仍须各自验收。构建统一使用 `pnpm build` 中的 `next build --webpack`。

该模板约定 Node 安装在 `/opt/lvzhen/runtime/`，standalone 产物放在 `/opt/lvzhen/releases/<版本>/`，`/opt/lvzhen/current` 指向当前版本。先创建无登录权限的 `lvzhen` 服务账号及其可写目录 `/var/cache/lvzhen`，让产物中的 `.next/cache` 指向该缓存目录；其他发布文件保持只读。将 `lvzhen.env.example` 填好后存为 `/etc/lvzhen/public.env`，其中只含公开模式配置，不填写模型 Key。

将 `lvzhen.service` 安装到 `/etc/systemd/system/`，将此目录的 Caddyfile 安装到 Caddy 的配置位置；域名与 `LVZHEN_APP_ORIGIN` 必须一致。正式启用前核对已有服务和端口，执行 `systemd-analyze verify` 与 `caddy validate`，先检查本机页面，再检查真实 HTTPS、静态资源和一次完整浏览器流程。Caddy 安装与服务管理按[官方说明](https://caddyserver.com/docs/install#debian-ubuntu-raspbian)执行。升级时保留上一个发布目录；需要回退时，将 `current` 指回旧版本并重启应用。浏览器保存的学习记录由用户自己的备份恢复，不随服务器版本回退。

公开版的评阅和答疑共用请求门槛。默认同一 Node 进程同时处理最多8个模型请求，同一个 Key 同时最多2个、每分钟最多60个新请求；重复读取或读取已取得的结果不占新的模型名额。可通过 `LVZHEN_AI_MAX_CONCURRENT`、`LVZHEN_AI_PER_KEY_CONCURRENT`、`LVZHEN_AI_PER_KEY_PER_MINUTE` 调整，范围分别是1–64、1–总并发、1–600；修改后重启服务。超出门槛会在调用模型前返回，程序不排队或自动重发。

单进程最多暂存512份近期结果，完成或失败后保留10分钟；正在处理的请求不会因经过保留时间而重新发送。API Key不写入这个索引，只使用摘要区分请求。这里是内存中的运行窗口，服务重启后清空，多进程/多副本各有自己的窗口，不能视为跨机器的全局去重。浏览器已经保存的讲解仍可回看；未存下的结果可能无法恢复，重新读取不会发起模型调用，用户再次主动请求则可能再次计费。上线时先运行单个应用实例。

## 从工作仓导出开源包

```sh
node scripts/export-public.mjs /absolute/path/to/a-new-directory
```

导出器只复制白名单中的源码与配置，排除凭据、本机数据库、artifacts、真人答卷和内部fixture，并将仅供私有回放的默认数据置空。它不复制Git历史、不删除或修改工作仓数据，已有目标目录会拒绝覆盖。发布前核对 `PUBLIC_MANIFEST.json` 与 `NOTICE.md`；第三方来源的链接不等于对其内容拥有再许可权。

公开包保留纯合成的 BYOK、学习档案、今日安排与导入检查，可执行 `pnpm test`。软件检查不证明模型法律判断100%准确。安装与部署请同时参阅 [Next.js自托管说明](https://nextjs.org/docs/app/guides/self-hosting) 和 [Caddy配置说明](https://caddyserver.com/docs/caddyfile)。

## 许可与内容

代码和有权许可的原创教学内容使用 [MIT](LICENSE)。[NOTICE.md](NOTICE.md)说明第三方来源、依赖及排除范围。真人学习数据与私人模型回执不属于开源包。
