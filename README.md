# research-daily · 科研日报

Yutian Zhu（@rubatotree）的计算机图形学 / 具身智能科研日报站点与长期记忆仓。

- **站点（GitHub Pages）：** https://rubatotree.github.io/research-daily/
- **博客校准仓：** https://github.com/rubatotree/blog
- **学术主页仓：** https://github.com/rubatotree/academic

## 目录

```
digests/           # 每日 markdown + 配图
  index.json       # 日期列表（站点读取）
  YYYY-MM-DD.md
  YYYY-MM-DD/figs/
meta/
  digest-spec.md       # 日报规范
  research-interests.md
  seen-papers.json     # 已收录论文（去重）
  bot-repro.md         # Bot 复现说明
index.html         # 子站：选日期 + 渲染 markdown
```

## 本地预览

任意静态服务器即可，例如：

```bash
cd research-daily
python3 -m http.server 8080
# 打开 http://127.0.0.1:8080/
```

注意：若以 `/research-daily/` 为 base 部署到用户站，请保持本仓 Pages 的 base path 为 `/research-daily/`。
