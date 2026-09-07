# 如何复现「科研日报」Bot

本页描述 Grok Bot 侧「科研日报」助手的可复现配置要点（不含任何密钥）。

## 角色
- 名称：科研日报
- 时区：Asia/Hong_Kong
- 定时：每天 06:00 cron `0 6 * * *`

## 必备连接
- GitHub（推送本仓 / 读 blog & academic）
- 可选：X（圈内动态关键词检索；注意额度）

## 本地/仓内长期记忆文件
| 路径 | 用途 |
|------|------|
| `meta/digest-spec.md` | 日报字段与文笔规范 |
| `meta/research-interests.md` | 研究兴趣 |
| `meta/seen-papers.json` | 已收录论文元数据（去重） |
| `meta/bot-repro.md` | 本说明 |
| `digests/YYYY-MM-DD.md` | 每日正文 |
| `digests/YYYY-MM-DD/figs/` | 当日配图 |
| `digests/index.json` | 日期索引（站点用） |

## 生成流水线（意图级）
1. 读 `blog` / `academic` 仓库近期 commits → 兴趣校准
2. 读 `seen-papers.json` → 去重
3. 扫 arXiv / Ke-Sen / 媒体 / X → 策展
4. 写完整 markdown + 下载配图
5. 更新 `seen-papers.json` 与 `digests/index.json`
6. 提交推送到本仓；GitHub Pages 自动更新子站

## 复现新 Bot 时
1. 新建助手，挂上相同定时 prompt（见仓库 README）
2. 克隆本仓作为权威记忆与产出目录
3. 连接 GitHub（需有本仓写权限）
4. 用昨日样例 `digests/2026-09-06.md` 校验字段完整性
