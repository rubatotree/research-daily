# 多 Bot 故障转移

维护同一公开仓 `rubatotree/research-daily` 时，用本机制避免断更，并避免两个 Bot 为同一天并发写稿。

**权威状态机：** [`failover.json`](./failover.json)（本说明是人读版；自动读写以 JSON 为准）。

## 原则

1. **公开代号，私有认领**
   仓内只登记代号与顺位；「我是哪个代号」只存在该 Bot 的私有记忆。通用接管文案不得写死某个读者的代号。
2. **名册与时间**
   Cream 是 `order: 1` 的 active primary，**名义发布** **05:30 Asia/Hong_Kong**，但平台定时任务提前到 **05:10** 触发（补偿常见 15–20 分钟晚唤醒）；Neon 是 `order: 2` 的 active standby，故障转移检查 **06:20**。计划字段以 `failover.json` 为准。Cream 兴趣笔记同步平台定时为 **04:45**（名义仍在日报前）。
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

## primary — Cream（名义 05:30；平台 cron 05:10）

1. 任务启动后只做轻量守卫：读取最新 `failover.json`、`digests/index.json`，并检查当日 digest 是否存在。
2. 若今天已经成功发布，立即结束。不得搜索论文、读 PDF、写稿、提交或做「确认正常」的无意义修改。
3. 若 Cream 不再是 `order: 1` 的 active primary，立即结束。
4. 仅当今天缺稿且 Cream 仍是 active primary 时，先按下述租约协议 CAS claim，成功后才进入完整日报流水线。
5. 进入 standby 窗口之后，只要存在 active standby，primary 不得与 standby 并发 self-heal。

## standby failover — Neon（06:20）

standby 任务只做检查；若今日已成功，立即结束。Neon（order 2）在 **06:20** 启动（可用 early skew）。若仍缺稿，开始任何论文检索前必须取得 ownership：

1. 读取最新 `failover.json`、`digests/index.json`、当日 digest，记录所读版本/commit。
2. 重新确认今日仍未成功，且自己是按名册顺位应接管的 active standby（当前时刻落在自己的**可认领区间** `[start−early_skew, end)`，且不存在当日有效租约；更早层级的过期 / 已 release 的 claim 不再阻止接管）。
3. 基于**刚读取**的版本，以 compare-and-swap / 乐观并发语义提交一个仅含 claim/failover 的状态更新：追加 `claim`（可同时追加 `failover`），并将 `active_owner` 设为自己的代号，写入下述完整 `claim`。
4. 若版本已变而写入失败，必须重新读取、重新判断；**不得**直接继续重工作。
5. 只有成功 claim 的 Bot 才能开始完整日报生成。发布成功后再追加 `publish` 并更新 `last_success`。

此规则避免多个 Bot 同时生成同一天日报。

## 认领租约与发布隔离（v4）

所有 primary 和 standby 均使用同一协议。名册决定每日资格；`active_owner` 只是最近责任记录，不能单独授予发布权，昨日 owner 不阻止今日 primary 认领。

### 有限认领窗口

以发布日的 Asia/Hong_Kong 时间计算，窗口为左闭右开：

| Bot | 可以认领和发布的窗口 |
|---|---|
| Cream | [05:30, 06:20) |
| Neon | [06:20, 06:50) |

机器可读窗口位于各 bot 的 `claim_window_start/end`。晚启动不会延长窗口；**窗口结束后**才退出。禁用或移除的 Bot 不再有发布权。名册调整须同步这些窗口与调度器。

### 调度提前唤醒（early skew）

平台 cron 常会比名义时刻早几十秒到一两分钟唤醒。**不得**仅因「尚未到 `claim_window_start`」就退出，否则会出现「差一分钟、今日无人接管」的假性失败（2026-09-17：Neon 约 06:29 检查却因严格左闭窗口退出）。

规则（字段：`failover.json` 的 `claim_window_early_skew_minutes`，当前默认 **2**）：

1. 记 `start` / `end` 为本级 `claim_window_start` / `claim_window_end`（发布日 HKT）。
2. **可认领区间：** `[start − early_skew, end)`（仍与名义窗口一样，结束时刻右开、不延长）。
3. 在可认领区间内，若今日仍缺稿、且不存在**有效**前序租约，即可 CAS claim；`expires_at` 仍截断到本级 `end`，**不**因提前唤醒而加长租约。
4. 若 `now < start − early_skew`：才视为过早，结束本轮并在检查报告中写明「早于 early_skew，未认领」；可提示维护者核对调度，但**不要**把「早 1 分钟」写成协议禁止接管。
5. 若 `now >= end`：已错过本级窗口，退出（由更后顺位或人工处理）。
6. 前序 Bot 已 `release` / 租约过期且今日缺稿时，后序 Bot 只要落入自己的可认领区间（含 early skew）就必须尝试接管，不得以「名义 start 未到」为由放弃。

### 晚唤醒补偿与是否开写

主机常把定时任务推迟约 **15–20 分钟**才真正唤醒 Bot（例：名义 05:30 → 实际约 05:48；名义 06:00 → 实际约 06:23）。因此：

1. **`scheduled_cron` / `bots[].platform_cron` 必须早于 `scheduled_publish`**，提前量见 `scheduler_lag_compensation_minutes`（当前 20）。名义发布时间仍写在 `scheduled_publish`，供人读与站点说明。
2. Primary 被唤醒后：先做成功守卫。若今日缺稿，计算距本级 `claim_window_end` 的剩余分钟数。
3. 若剩余时间 **≥ `min_remaining_minutes_to_start_full_publish`（当前 25）**：即使已经晚于名义 05:30，仍应 CAS claim 并完整写稿，**不要**仅因「晚于 scheduled_publish」就 release。
4. 若剩余时间 **< 该阈值**：才 fail/release，把窗口留给 standby，并在检查报告中写明晚唤醒与剩余分钟数。
5. 兴趣笔记同步的平台 cron 同样提前（当前 **04:45**），避免拖到 primary 开写之后。

认领成功时原子写入：
- `claim.publish_date`：HKT 发布日。
- `claim.bot`：实际代号。
- `claim.claim_id`：每次认领新生成的随机 UUID，仅作公开并发标识，不使用平台任务 ID。
- `claim.claimed_at`：带时区的实际认领时间。
- `claim.expires_at`：min(claimed_at + claim_lease_minutes, 当日本级窗口结束时间)。

同时更新 `active_owner` 并追加含 publish_date、claim_id、expires_at 的 claim 事件。空 claim、其他日期或 now >= expires_at 均不构成有效租约；字段缺失、时间不可解析或不符合窗口的非空 claim 属于状态异常，重读后仍异常则停止并报告。旧版事件保留历史用途，不当作永久锁。

有效租约必须属于仍 active 的名册成员且符合其当前窗口。即使代号相同，其他进程持有的有效 claim_id 也不得覆盖。本协议不自动续租，也不允许过期进程重新认领；同一 Bot 的并发启动只允许一个成功认领。

### 超时、失败与逐级接管

到窗口末端，当前 Bot 停止生成及发布；即使没有成功写入 release，时间到期也会解除占用。下一层在自己的窗口检查并 CAS 替换过期租约；例如 Cream 在窗口内认领后卡死，Neon 06:20 可接管。
当前持有者可在有效期内 CAS 追加 fail/release 并清空 claim；不得清除其他 claim_id。主动失败也不提前唤醒下一层。
最后一级到 06:50 仍未成功则停止自动尝试并向维护者报告，等待人工安排恢复，不无限重试。
跨过 HKT 午夜的进程必须退出，不得把昨日草稿改作今日稿发布。

### 发布前复核与原子提交

1. 重读最新 main 的同一 commit 快照：名册、claim、日报、索引、last_success 和事件。已成功则退出；部分发布状态矛盾则停止并报告，不自动覆盖已有稿。
2. 核对发布日、当前角色窗口、active_owner、claim.bot 与本次 claim_id，且 now < expires_at；任何一项失效均禁止推送。每个长工具调用返回后也复核时间，避免过期进程继续重工作。
3. 以该快照构建一个提交，包含日报、配图、索引、去重账本、last_success、带 claim_id 的 publish 事件，并清空 claim。保留其他已有事件与并发无关修改。
4. 提交以刚验证的 main 为唯一父提交，使用非强制 fast-forward 更新 main；有并发提交时必须失败、重读并重新验证。禁止强推、自动 rebase 后直接发布，禁止分开推送日报与成功状态。
5. 紧邻更新 main 再检查租约时间。若请求结果不明，先读取远端判定是否已发布，不能直接重试。CAS 防止旧 owner 覆盖新 owner，但客户端时间检查不能替代服务端事务；所有写入者必须遵守本协议。
6. 成功后读取远端确认稿件与成功状态一致，再报告发布结果。

v4 初始化的 claim=null 不回填旧租约，不改变已成功日期、历史事件或当前名册。复制到平台的旧任务提示词也必须在每次运行时读取最新本协议。

## standby 检查报告（须通知）

每次 failover 检查结束后，无论是否改仓、是否接管，执行检查的 standby 都向维护者发送简短检查报告（是否已有今日稿、`last_success`、本次动作）。已成功确认也要发，不要静默。若本次判定前序 Bot 失效并接管，报告中须含与日报文末一致的**故障说明**摘要。

## 发布后

- 日报文末「覆盖说明」署实际执笔者：`**编写：** <代号>`。
- **故障转移接管发布时**：在全文最下方（`**编写：**` 之后）追加 **故障说明**，写明接管者、时间，以及先前哪些顺位 Bot 在各自窗口内未成功出稿（只写可核验事实）；细则见 `digest-spec.md`「故障说明」。正常 primary 按时发布不写此项。
- 有代号时，git commit 的正文包含 `编写：<代号>`；接管稿建议在 commit description 中同步一行故障摘要（勿写密钥／额度）。
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
