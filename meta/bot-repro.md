# 如何复现 / 接管「科研日报」Bot

本页是操作清单；**完整可粘贴 Prompt** 见 [`bot-handoff-prompt.md`](./bot-handoff-prompt.md)。  
**不含任何密钥。** 公开安全见 [`privacy.md`](./privacy.md)。

## 角色与调度
- 名称：科研日报；时区：Asia/Hong_Kong
- 当前名册由 `meta/failover.json` 权威定义：Cream = order 1 active primary，06:00；Neon = order 2 active standby，仅 06:30 failover 检查（Cream 另 05:00 兴趣笔记同步）。
- 不要为同一 Bot 默认同时安装主任务和 standby 任务。角色变更时先更新仓库名册，再同步该 Bot 的私有调度器。

## 必备连接
- **GitHub**：推送本仓；只读 `rubatotree/blog`、`rubatotree/academic`（看 commits）
  - 需要：对本仓 `main` 的写权限；Pages 已从 `main` 根目录发布
- **可选：X**：圈内关键词检索；注意额度；**永不把额度写进仓**

## 仓内长期记忆（请全部阅读）

| 路径 | 用途 |
|------|------|
| `meta/LONG_TERM_MEMORY.md` | 产品与策展长期记忆 |
| `meta/bot-handoff-prompt.md` | 完整接管 Prompt |
| `meta/digest-spec.md` | 字段、标题栏、版式 |
| `meta/research-interests.md` | 兴趣加权 |
| `meta/privacy.md` | 公开安全红线 |
| `meta/seen-papers.json` | 已收录论文（去重） |
| `meta/bot-repro.md` | 本说明 |
| `digests/YYYY-MM-DD.md` | 每日正文 |
| `digests/YYYY-MM-DD/figs/` | 当日配图 |
| `digests/index.json` | 日期索引（站点用） |

## 生成流水线（意图级）
0. **轻量守卫（所有任务先做）**：读最新 `failover.json`、`digests/index.json`、当日 digest；综合核验今日是否成功。成功则立即结束。
1. primary 确认当前名册资格、窗口且今日缺稿，并按 v4 协议成功 CAS claim 后，读完整长期记忆、blog/academic commits 与 `seen-papers.json`。
2. 扫 arXiv / Ke-Sen / 媒体 /（可选）X → 漏斗式策展。
3. 写完整 markdown（**`### 短名 · Venue/arXiv · 日期`**）+ 合法公开配图。
4. 更新 `seen-papers.json`、`digests/index.json` 与 `failover.json`（`last_success`、`active_owner`、publish event）。
5. 按 failover.md 复核当日租约、窗口和 claim_id，清空 claim；以最新已验证 main 为唯一父提交，将所有产物与成功状态用一个逻辑 commit 非强制 fast-forward 推送 main，commit 正文署 `编写：<代号>`；私聊通知维护者。
6. standby 仅在名册规定的 failover 检查时刻（Neon / order 2 为 06:30）启动；若仍缺稿，必须基于刚读取的版本 CAS claim；未成功 claim 不得做检索/写作。

## 新建 Bot 时
1. 新建助手，名称「科研日报」
2. 将 `bot-handoff-prompt.md` 中「接管 Prompt」设为系统/定时说明
3. 克隆本仓作为权威记忆与产出目录
4. 连接 GitHub（本仓写权限）；可选 X
5. 用最近样例 digest 校验：标题栏会议/时间、速览锚点、方法概要、覆盖说明、编写署名、故障说明（仅接管稿）、无隐私泄漏
6. 阅读近几天**非本人**署名日报以学习文风（清晰易读、重点分明；允许创新）
7. 只按其名册角色启用一个任务：primary 使用 `30 5 * * *`；standby 使用 `0 6 * * *`，并实现 failover.md v4 的有限租约、CAS claim 与发布前隔离检查

## 站点
- https://rubatotree.github.io/research-daily/
- 本地：`python3 -m http.server` 于仓库根目录
