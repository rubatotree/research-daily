# 如何复现 / 接管「科研日报」Bot

本页是操作清单；**完整可粘贴 Prompt** 见 [`bot-handoff-prompt.md`](./bot-handoff-prompt.md)。  
**不含任何密钥。** 公开安全见 [`privacy.md`](./privacy.md)。

## 角色
- 名称：科研日报
- 时区：Asia/Hong_Kong
- 定时：每天 06:00，cron `0 6 * * *`（自 2026-09-08 起须每日执行）

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
1. 读 `meta/*` 兴趣与规范；读 blog/academic 近期 commits → 兴趣校准
2. 读 `seen-papers.json` → 去重
3. 扫 arXiv / Ke-Sen / 媒体 /（可选）X → 策展
4. 写完整 markdown（**`### 短名 · Venue/arXiv · 日期`**）+ 下载公开配图
5. 更新 `seen-papers.json` 与 `digests/index.json`（含 `content_day`）
6. 提交推送到本仓；GitHub Pages 更新子站
7. 私聊通知维护者并附 `#发布日` 链接

## 新建 Bot 时
1. 新建助手，名称「科研日报」
2. 将 `bot-handoff-prompt.md` 中「接管 Prompt」设为系统/定时说明
3. 克隆本仓作为权威记忆与产出目录
4. 连接 GitHub（本仓写权限）；可选 X
5. 用最近样例 digest 校验：标题栏会议/时间、速览锚点、方法概要、覆盖说明、编写署名、无隐私泄漏
6. 阅读近几天**非本人**署名日报以学习文风（清晰易读、重点分明；允许创新）
7. 启用 cron `0 6 * * *` 与 `30 6 * * *`

## 站点
- https://rubatotree.github.io/research-daily/
- 本地：`python3 -m http.server` 于仓库根目录
