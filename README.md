# research-daily · 科研日报

Yutian Zhu（[@rubatotree](https://github.com/rubatotree)）的计算机图形学 / 具身智能科研日报站点与**公开**长期记忆仓。

- **站点（GitHub Pages）：** https://rubatotree.github.io/research-daily/
- **博客校准仓：** https://github.com/rubatotree/blog
- **学术主页仓：** https://github.com/rubatotree/academic

本仓内容默认世界可读。密钥、未公开实验、私人信息请勿提交——见 [`meta/privacy.md`](meta/privacy.md)。

## 目录

```
digests/                    # 每日 markdown + 配图
  index.json                # 日期列表（站点读取）
  YYYY-MM-DD.md
  YYYY-MM-DD/figs/
meta/
  LONG_TERM_MEMORY.md       # 长期记忆主文档
  bot-handoff-prompt.md     # Bot 接管 Prompt（可复制）
  bot-repro.md              # 复现清单
  digest-spec.md            # 日报规范（含标题栏会议/时间）
  research-interests.md
  privacy.md                # 公开安全红线
  failover.json / .md        # 多 Bot 故障转移
  seen-papers.json
index.html                  # 子站
assets/                     # 样式与脚本
```

## Bot 接手

1. 读 [`meta/LONG_TERM_MEMORY.md`](meta/LONG_TERM_MEMORY.md)
2. 复制 [`meta/bot-handoff-prompt.md`](meta/bot-handoff-prompt.md) 中的接管 Prompt
3. 按 [`meta/bot-repro.md`](meta/bot-repro.md) 连接 GitHub 并启用每日 06:00（HKT）

## 本地预览

```bash
cd research-daily
python3 -m http.server 8080
# 打开 http://127.0.0.1:8080/
```

若部署在 `https://rubatotree.github.io/research-daily/`，保持 Pages 的 base path 为 `/research-daily/`。
