# 多 Bot 故障转移

维护同一公开仓 `rubatotree/research-daily` 时，用本机制避免断更，并避免两个 Bot 为同一天并发写稿。

**权威状态机：** [`failover.json`](./failover.json)（本说明是人读版；自动读写以 JSON 为准）。

## 原则

1. **公开代号，私有认领**
   仓内只登记代号与顺位；「我是哪个代号」只存在该 Bot 的私有记忆。通用接管文案不得写死某个读者的代号。
2. **名册与时间**
   Neon 是 `order: 1` 的 active primary，正常任务仅在 **05:30 Asia/Hong_Kong** 启动；Cream 是 `order: 2` 的 active standby，仅在 **06:00** 做 failover 检查。计划字段以 `failover.json` 为准。Cream 另在 **05:00** 同步公开兴趣笔记（非发布任务）。
3. **状态与日志**
   `active_owner` 表示当前应对「今日发布」负责的代号。每次成功发布必须更新 `last_success`、`active_owner` 并**追加** `events`；不删除历史。
4. **公开安全**
   事件仅记录公开可述事实，绝不记录凭据、额度、内部自动化 ID、本机路径或调试细节。

## 成功判定

对发布日（HKT）`YYYY-MM-DD`，应综合确认：

- `digests/YYYY-MM-DD.md` 存在；
- `digests/index.json` 有当日条目；
- `last_success.publish_date` 等于当日；
- 有与上述状态基本一致的 `type: "publish"` 事件。

任一关键状态矛盾时视为**未确认成功**；先重新读取最新 main，不得凭单一信号重写日报。

## 05:30 primary — Neon

1. 任务启动后只做轻量守卫：读取最新 `failover.json`、`digests/index.json`，并检查当日 digest 是否存在。
2. 若今天已经成功发布，立即结束。不得搜索论文、读 PDF、写稿、提交或做「确认正常」的无意义修改。
3. 若 Neon 不再是 `order: 1` 的 active primary，立即结束。
4. 仅当今天缺稿且 Neon 仍是 active primary 时，才进入完整日报流水线。
5. 06:00 之后，只要存在 active standby，primary 不得与 standby 并发 self-heal。

## 06:00 standby failover — Cream

Cream 的 06:00 任务只做检查；若今日已成功，立即结束。若仍缺稿，开始任何论文检索前必须取得 ownership：

1. 读取最新 `failover.json`、`digests/index.json`、当日 digest，记录所读版本/commit。
2. 重新确认今日仍未成功，且 Cream 是按名册顺位应接管的 active standby。
3. 基于**刚读取**的版本，以 compare-and-swap / 乐观并发语义提交一个仅含 claim/failover 的状态更新：追加 `claim`（可同时追加 `failover`），并设 `active_owner: "Cream"`。
4. 若版本已变而写入失败，必须重新读取、重新判断；**不得**直接继续重工作。
5. 只有成功 claim 的 Bot 才能开始完整日报生成。发布成功后再追加 `publish` 并更新 `last_success`。

此规则避免 Neon 与 Cream 同时生成同一天日报。

## Cream 检查报告（须通知）

06:00 failover 检查结束后，无论是否改仓、是否接管，都向维护者发送简短检查报告（是否已有今日稿、`last_success`、本次动作）。已成功确认也要发，不要静默。

## 发布后

- 日报文末「覆盖说明」署实际执笔者：`**编写：** <代号>`。
- 有代号时，git commit 的正文包含 `编写：<代号>`。
- 每个任务运行都以仓库当前 `failover.json` 为权威；若平台唤醒时间和仓库计划发生漂移，只私聊提醒维护者同步调度器，不写入公开仓。

## 事件类型

| type | 含义 |
|---|---|
| `init` | 表初始化 |
| `register` | 新 Bot 入册或名册调整 |
| `claim` | 已用 CAS 成功认领当日 |
| `failover` | 触发顺位转移 |
| `publish` | 今日日报发布成功 |
| `heartbeat` | 公开健康确认 / 表修复 |
| `release` | 主动交还 |
| `fail` | 尝试失败（仅简短公开原因） |

详见 `meta/privacy.md`。
