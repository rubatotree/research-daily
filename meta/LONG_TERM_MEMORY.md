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
| `meta/interest-notes.md` | 随手兴趣笔记 + 当日讨论摘要（05:00 同步） | 是 |
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
- **名册：** Neon = order 1 active primary；Cream = order 2 active standby。
- **定时：** Neon 在 05:30 HKT 做主发布守卫；Cream 在 06:00 HKT 仅做 failover 检查；Cream 另于 **05:00** 同步兴趣笔记。
- **通知：** Cream 05:00 / 06:00 任务结束后均须私聊发简报（无改仓也要说）。
- **公开代号 / 私有认领：** 仓内只列代号与顺序；「我是谁」仅存在各 Bot 私有记忆。禁止在公开接管文案里写死某个读者的代号。
- **轻量守卫：** 任何任务先综合核验当日 digest、索引、`last_success.publish_date`、publish event；已成功即安静结束，不做检索/读 PDF/重复提交。
- **无竞态接管：** 06:00 的 standby 必须基于刚读版本做 compare-and-swap claim，成功后才可开始重工作；写入冲突则重读重判。存在 active standby 时，primary 不在 06:00 后并发 self-heal。
- **发布状态：** 每次成功发布更新 `last_success`、`active_owner` 并追加 `events`；不删除历史。
- **署名：** 日报覆盖说明与 git commit 正文都须署实际执笔代号。
- 调度器实际唤醒与仓库配置若 drift，只在私聊提示维护者，绝不把内部 scheduler 信息写入公开仓。

## 4. 日期与节奏

- **定时：** 每天 `05:30`，cron `30 5 * * *`，时区 Asia/Hong_Kong
- **自 2026-09-08 起**须每日执行
- **发布日** = 文件名日期 = 站点选日 = 早上跑任务的「今天」
- **内容覆盖日** = **前一自然日**（例：`2026-09-07.md` 写 2026-09-06 的新稿）
- 周末 / 无独立 arXiv 公告日：可纳入相邻公告日积压，但文件名仍用发布日；在文末「覆盖说明」写清
- 聊天通知附上 `#发布日` 的 Pages 链接

## 5. 策展原则（稳定偏好）

**近期首要研究主线（2026-09-11 起，直至维护者明确调整）：** MiracleAug 及相近的 Agent 驱动 Real2Sim2Real：可编辑场景重建、物理/运动配置、同步示教增强、策略训练与评估、真机迁移及失败反馈迭代。日报优先追踪论文、开源和社区实测的实质进展，区分重建演示、仿真训练与真机验证，说明与公开流程的重合、可借鉴方法和待验证环节。PTIR-GS、绑定与渲染效率继续作为相关基础方向；四领域新闻继续覆盖。完整加权与证据要求以 `research-interests.md` 为准。


0. **协同文风：** 动笔前读近几天非本人署名的日报，学基本写法与优点；允许创新，目标是清晰易读、重点分明（详见 `digest-spec.md`）
1. **有判断：** 今日速览先点名必读，并说明「为何值得读」，不要纯罗列
2. **对照阅读：** 相对公开课题焦点（Agent 驱动 Real2Sim2Real / 示教增强 / 策略与真机验证，以及可重光照 / 绑定 / 批渲染效率）写「值得关注」，不编造未读全文的方法细节
3. **圈内新闻与社区反应：** 每日检查 LLM、Agent、图形学、具身智能四领域，不限于主课题；独立栏目精选，事实附原始来源、社区反馈附实际原帖，区分事实/观点/编辑判断，呈现认可、质疑与使用反馈，不将零散帖子当共识。无可靠反馈如实说明，完整规则见 `digest-spec.md`
4. **诚实投稿状态：** 未标明勿写成已中；推测必须写依据
5. **去重默认严格；** 「新兴趣」与版本/录用/开源/圈内新影响可例外，并写明原因
6. **图文一体：** 必读文尽量嵌 teaser / pipeline；图源须为论文或项目页公开资源
7. **中文可读、学术准确：** 作者不中译姓名；单位仅在确定时用中文机构名

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

0. **写作前检查长期记忆：** 读 `LONG_TERM_MEMORY` / `digest-spec` / `research-interests` / `interest-notes` / `failover` / `privacy` / `seen-papers`；有变先更新 `meta/` 再写稿
1. 读兴趣文件 + `interest-notes.md` + 近几日 blog/academic commits
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

1. 阅读并遵守：`digest-spec.md`、`privacy.md`、`failover.json`、`failover.md` 与本文件
2. 将 `bot-handoff-prompt.md` 全文设为新 Bot 的系统/定时任务说明（或按其裁剪）
3. 按 `bot-repro.md` 连接 GitHub（本仓写权限）
4. 确认私有代号，并只按当前名册的角色安装任务：primary 05:30；standby 06:00
5. 用最近一篇 `digests/*.md` 做字段对照自检
6. 确认 Pages 仍从 `main` 根目录发布，base path `/research-daily/`

## 11. 变更日志（公开记忆）

- 2026-09-11：根据维护者明确要求，将 MiracleAug 与相近 Agent 驱动具身流程提升为近期科研及日报选题的首要主线；持续跟踪论文、开源、社区实践与验证阶段，保留图形学基础方向和四领域新闻覆盖。

- 2026-09-10：增加 LLM、Agent、图形学、具身智能四领域的每日新闻与社区反应检索；分开引用事实来源与社区原帖，保持精选、分层阅读及跨日去重。

- 2026-09-09：每日发布时间改为 **05:30 HKT**；兴趣同步 **05:00**；故障转移检查 **06:00**（宽限仍 30 分钟）；
- 2026-09-08：约定每日 **05:00 HKT**（日报前 30 分钟）由 Cream 汇总当天兴趣讨论并更新 `interest-notes.md`；
- 2026-09-08：新增 `meta/interest-notes.md` 随手兴趣笔记（首条：试用 TripoAI 后对 3D 生成的轻度兴趣）；
- 2026-09-08：Neon 升为 order 1 primary，Cream 改为 order 2 active standby；新增轻量守卫与无并发认领规则（当时发布窗为 04:00/04:30）。

- 2026-09-08：Git commit description 须署 bot 代号（有代号时）；
- 2026-09-08：圈内动态/公众号须提炼有价值观点，勿只列链；
- 2026-09-08：每日发布时间曾改为 **04:00 HKT**，故障转移检查 **04:30**（宽限 30 分钟）；
- 2026-09：每日写作前必须检查并视需要更新长期记忆文档（meta/）；
- 2026-09：协同 Bot 须先读非本人近稿学习文风，再写作（清晰易读、重点分明，允许创新）；
- 2026-09：加入 `failover.json` 多 Bot 顺位与 30min 故障转移，并写入本记忆；
- 2026-09：站点上线；完整字段 + 方法概要/值得关注；TOC；标题栏加入会议/时间；补齐长期记忆与接管 prompt；明确公开安全红线
- 日期约定：发布日 vs 内容覆盖日（前一自然日）
- 定时：每日 05:30 HKT，自 2026-09-08 起强制执行
