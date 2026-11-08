# 长案评阅题卡

当前表格评阅（`/lab/scoring/table/write`）从这里加载案例。`catalog.json` 按显示顺序列出文件夹；每个文件夹是一道五问长案：

| 文件 | 用途 |
| --- | --- |
| `card.md` | 题卡：案情、五个设问（原答留空）、采分表、必要法律材料。模型只收到其中的案情、设问、判定要求和法律材料 |
| `samples.json` | 调用前冻结的模拟／真人答卷与预期标签，只用于本地核对，不发给模型 |
| `manifest.json` | 案例编号、标题及题卡、样本、全局提示词的指纹 |
| `sources.md` | 法律依据的定向核对记录（有则附） |

题卡冻结后不原地修改；改动会使加载报 `card-drift`。确需修正时：改 `card.md`，删除该案 `manifest.json`，运行 `pnpm tsx checks/freeze-scoring-card.ts <文件夹> <编号> <标题>` 重新冻结，并在 PROJECT_STATUS.md 说明原因。新增案例：建文件夹、写 `card.md` 与 `samples.json`、冻结，再把文件夹名加进 `catalog.json`。

诈骗、放火两案迁移自 `evals/deepseek-order-transfer-2026-09-29/`，仓库案迁移自 `evals/table-warehouse-2026-09-29/`；原目录保留作当时的调用记录。
