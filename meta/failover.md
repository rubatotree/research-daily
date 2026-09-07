# 多 Bot 故障转移

维护同一公开仓 `rubatotree/research-daily` 时，用本机制避免「主 Bot 当天没跑」导致断更。

**权威状态机：** [`failover.json`](./failover.json)（本说明是人读版；自动读写以 JSON 为准）。

## 原则

1. **公开代号，私有认领**  
   - 仓内只登记 **bot 代号**（如 `Cream`）与顺序。  
   - 「我是哪个代号」只写在**该 Bot 自己的私有长期记忆**里。  
   - **禁止**在公开仓 / 接管 Prompt 里写死「你就是 Cream」——继任者会误认身份。  
   - 每个 Bot 更新本表时，只能用**自己私有记忆中的代号**签名事件。

2. **主责 + 顺位**  
   - `bots[].order` 越小越优先。  
   - `active_owner` = 当前应对「今日发布」负责的代号。

3. **定时与宽限**  
   - 计划发布时间：每天 **06:00**（`Asia/Hong_Kong`），cron `0 6 * * *`。  
   - **故障转移间隔：30 分钟**（`failover_grace_minutes: 30`）。  
   - 若到 **06:30** 仍无「今日发布成功」记录（见判定），则由下一顺位 Bot **启动接管并发布**。

## 成功判定（须同时尽量满足）

- 存在 `digests/YYYY-MM-DD.md`，其中 `YYYY-MM-DD` = **今日发布日（HKT）**  
- `digests/index.json` 含该日条目  
- `failover.json` 中 `last_success.publish_date` = 该日，且 `last_success.bot` 已写入  
- 事件日志追加了 `type: publish`（或等价 `heartbeat` 且明确今日已发布）

## 自动维护（每个参与 Bot 必须做）

### A. 06:00 主发布任务成功后
1. 用**自己的代号**写入：
   - `active_owner` = 自己  
   - `last_success` = `{ bot, publish_date, at (ISO HKT), commit }`  
2. 向 `events` **追加**一条（不要删历史；可截断保留最近 ~100 条）：
   - `{ at, type: "publish", bot, detail }`  
3. 与日报一并 `git push`（本 JSON 是公开运维状态，**不含密钥**）。

### B. 06:30 故障转移检查（所有登记 Bot）
1. 拉取最新 `main`，读 `failover.json` + 是否已有今日 digest。  
2. **已成功** → 保持安静，或仅在 JSON 损坏时修复；**不要**重复整篇日报。  
3. **未成功** → 计算应接管者：
   - 从 `active_owner` 的 `order` 起，找下一个 `status=active` 的 Bot；若 `active_owner` 当天已失败，则 `order+1`；若已是最大 order，可回到 order 1 做最后自愈（避免全灭），但须在 `events` 写明 `failover`。  
4. **仅当自己的代号 == 应接管者** 时：
   - 追加 `type: "failover"` / `claim`  
   - 将 `active_owner` 设为自己  
   - **执行完整日报发布流水线**（与主任务相同）  
   - 成功后再写 `publish`  
5. 若自己不是应接管者 → **不要抢跑**。

### C. 登记新 Bot
1. 维护者给新 Bot 一个**唯一代号**，只写入该 Bot 私有记忆。  
2. 在 `bots` 数组追加 `{ code, order, role: "standby", status: "active" }`。  
3. 追加 `events`：`type: "register"`。  
4. 新 Bot 安装：每日 06:00（可选，若为 standby 可只跑 06:30 检查）+ **必须** 06:30 故障转移检查。

## 事件类型约定

| type | 含义 |
|------|------|
| `init` | 表初始化 |
| `register` | 新 Bot 入册 |
| `publish` | 今日日报发布成功 |
| `heartbeat` | 确认健康 / 表修复（非完整发布） |
| `failover` | 触发顺位转移 |
| `claim` | 声明接管今日发布 |
| `release` | 主动交还（少用） |
| `fail` | 尝试失败（可写简短公开原因，勿含密钥/路径） |

## 隐私

- 事件 `detail` 只写公开可述原因（如 `missing digests/2026-09-08.md after grace`）。  
- 禁止写入 token、额度、本机路径、私有 agent id。详见 `privacy.md`。

## 与长期记忆

机制摘要亦写入 `LONG_TERM_MEMORY.md`；接管 Prompt 只描述**机制与读表规则**，不写死某读者的代号。
