# 科研日报 · 长期记忆（公开仓）

本文档是 **公开可克隆** 的长期记忆主文档，供继任 Bot / 人类维护者接手。  
**不含密钥。** 私密备注请留在用户私聊或本地非公开笔记，不要提交本仓。

---

## 1. 产品是什么

- **名称：** 科研日报（图形学 & 具身智能）
- **受众：** 维护者本人为主；站点公开，故默认按「可被外人阅读」写作
- **产出：** 每日一篇中文策展 digest + 配图，推送到 GitHub，经 Pages 展示
- **仓库：** https://github.com/rubatotree/research-daily
- **站点：** https://rubatotree.github.io/research-daily/

## 2. 人与角色

| 角色 | 公开信息 |
|------|----------|
| 维护者 | Yutian Zhu / GitHub `rubatotree` |
| Bot 名 | 科研日报 |
| 时区 | Asia/Hong_Kong（与 Asia/Shanghai 同为 UTC+8；定时按 HKT） |
| 语言 | 简体中文为主；论文题名/作者保留英文或拼音 |

实验室与课题的公开摘要见 `research-interests.md`。

## 3. 权威文件地图

| 路径 | 用途 | 公开？ |
|------|------|--------|
| `meta/digest-spec.md` | 字段、版式、标题栏、安全红线 | 是 |
| `meta/research-interests.md` | 兴趣与加权 | 是 |
| `meta/LONG_TERM_MEMORY.md` | 本文件：产品记忆 | 是 |
| `meta/bot-handoff-prompt.md` | **完整接管 prompt**（可粘贴给新 Bot） | 是 |
| `meta/bot-repro.md` | 复现清单（连接与步骤） | 是 |
| `meta/seen-papers.json` | 已收录论文去重账本 | 是（仅公开论文元数据） |
| `meta/privacy.md` | 公开写作红线速查 | 是 |
| `meta/failover.json` / `meta/failover.md` | 多 Bot 代号顺位、事件、30min 故障转移 | 是 |
| `digests/YYYY-MM-DD.md` | 当日正文 | 是 |
| `digests/YYYY-MM-DD/figs/` | 配图（来自论文公开图） | 是 |
| `digests/index.json` | 站点日期索引（含 `content_day`） | 是 |
| `index.html` + `assets/` | 白底站点、侧栏日历、折叠目录、KaTeX | 是 |

Bot 侧还可有一份本地 ledger 与仓内 `seen-papers.json` 同步；**同步内容仅限公开论文字段**（id、title、arxiv、首次收录日、可选 venue）。


## 3b. 多 Bot 故障转移（自动维护）

- **状态表：** `meta/failover.json`（人读说明：`meta/failover.md`）
- **计划发布：** 每天 06:00 HKT；**宽限 30 分钟** → 06:30 仍无今日成功发布则下一顺位 Bot 启动
- **公开代号 / 私有认领：** 仓内只列代号与顺序；「我是谁」仅存在各 Bot **私有**记忆。禁止在公开接管文案里写死某个读者的代号。
- **每次成功发布必须**更新 `last_success`、`active_owner`，并追加 `events`
- **06:30 检查：** 仅应接管者执行完整日报；他人不抢跑；已成功则安静

## 4. 日期与节奏

- **定时：** 每天 `06:00`，cron `0 6 * * *`，时区 Asia/Hong_Kong
- **自 2026-09-08 起**须每日执行
- **发布日** = 文件名日期 = 站点选日 = 早上跑任务的「今天」
- **内容覆盖日** = **前一自然日**（例：`2026-09-07.md` 写 2026-09-06 的新稿）
- 周末 / 无独立 arXiv 公告日：可纳入相邻公告日积压，但文件名仍用发布日；在文末「覆盖说明」写清
- 聊天通知附上 `#发布日` 的 Pages 链接

## 5. 策展原则（稳定偏好）

1. **有判断：** 今日速览先点名必读，并说明「为何值得读」，不要纯罗列
2. **对照阅读：** 相对公开课题焦点（可重光照 / 绑定 / 批渲染效率 / 具身数据）写「值得关注」，不编造未读全文的方法细节
3. **诚实投稿状态：** 未标明勿写成已中；推测必须写依据
4. **去重默认严格；** 「新兴趣」与版本/录用/开源/圈内新影响可例外，并写明原因
5. **图文一体：** 必读文尽量嵌 teaser / pipeline；图源须为论文或项目页公开资源
6. **中文可读、学术准确：** 作者不中译姓名；单位仅在确定时用中文机构名

## 6. 信息源优先级

1. arXiv（cs.GR 及关键词漏斗）+ [Ke-Sen](https://kesen.realtimerendering.com/) 类会议页
2. `rubatotree/blog`、`rubatotree/academic` 的 **git commits**
3. 公开搜索 / Scholar
4. 中文科技媒体（机器之心、量子位、新智元等）与 PaperWeekly 类
5. X 关键词检索（可选；**额度与过程永不入库**）

## 7. 站点 UX 约定（已实现）

- 白底极简；左侧可折叠：日历 + 时间轴 + 上/下篇
- 移动端顶栏：日期 + 上/下篇
- **目录**挂在 H1 下，默认折叠；收录 `h2`/`h3`，故论文 **venue·日期必须写进 `###` 标题**
- KaTeX：支持 `$…$` / `$$…$$` / `\(...\)` / `\[...\]`
- 无「AI 助手」式装饰文案

## 8. 发布流水线（意图级）

1. 读兴趣文件 + 近几日 blog/academic commits
2. 读 `seen-papers.json` 去重
3. 按覆盖窗口搜集候选；策展、下载公开配图
4. 写 `digests/发布日.md`（标题栏含 venue·时间）
5. 更新 `seen-papers.json`、`digests/index.json`
6. `git commit` + `push` 到 `rubatotree/research-daily` 的 `main`
7. 向用户发送简报 + 站点链接

失败时：宁可少收、标明数据完备性，**禁止编造**论文或录用状态。

## 9. 安全与隐私（再强调）

详见 `privacy.md`。公开仓 = 默认世界可读。  
密钥、额度、未公开实验、私人联系方式、内部工具标识 → **永不提交**。

## 10. 接手清单

1. 阅读并遵守：`digest-spec.md`、`privacy.md`、本文件
2. 将 `bot-handoff-prompt.md` 全文设为新 Bot 的系统/定时任务说明（或按其裁剪）
3. 按 `bot-repro.md` 连接 GitHub（本仓写权限）；可选连接 X
4. 用最近一篇 `digests/*.md` 做字段对照自检
5. 确认 Pages 仍从 `main` 根目录发布，base path `/research-daily/`

## 11. 变更日志（公开记忆）

- 2026-09：加入 `failover.json` 多 Bot 顺位与 30min 故障转移，并写入本记忆；
- 2026-09：站点上线；完整字段 + 方法概要/值得关注；TOC；标题栏加入会议/时间；补齐长期记忆与接管 prompt；明确公开安全红线
- 日期约定：发布日 vs 内容覆盖日（前一自然日）
- 定时：每日 06:00 HKT，自 2026-09-08 起强制执行
