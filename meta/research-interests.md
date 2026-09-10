# 研究兴趣（公开摘要）

维护对象：Yutian Zhu（GitHub: [rubatotree](https://github.com/rubatotree)）

> 本文件只记录**可公开**的学术身份与研究方向，供日报策展加权。勿写入未公开实验细节、内部会议纪要或私人联系方式。

## 身份（公开）
- 中科大 CS → 北大计院硕
- 现：北大 Graphics Intelligence / Graphics and Interaction Lab（李胜老师）— Embodied AI、3DGS、Neural Rendering
- 曾：中科大 GCL（刘利刚老师）— Neural Rendering、Monte Carlo PDE
- 博客仓：https://github.com/rubatotree/blog
- 学术主页仓：https://github.com/rubatotree/academic

## 当前课题焦点（公开表述）
围绕 **PTIR-GS / Real→Sim→Real**：手机等真实采集 → 可仿真资产 → 下游具身 / 控制。

策展时的内部加权（**不要**在日报正文标 `[A]/[B]/[C]`）：
1. **拆分与绑定自动化**：可编辑动态 3DGS、绑骨/蒙皮、结构感知 Real2Sim（SC-GS 一脉）
2. **正向 / 批渲染效率**：大规模示教需要海量帧；ReSTIR、Radiance Cache、光探针、生成式后处理等
3. **逆渲染真实感 · 鲁棒性 · 材质**：手机采集几何、材质先验、前馈 3DGS、反射/透明、可重光照出口

## 博客驱动
每日通过 `blog` / `academic` 的 **GitHub commits**（而非仅网页）校准兴趣；有新博文则调整权重。新兴趣板块可补读旧文，不限「昨日上新」。

## 更新约定
兴趣漂移时，优先改本文件与 `LONG_TERM_MEMORY.md`，再改定时任务 prompt；勿把私人草稿直接贴进公开仓。

## 随手兴趣笔记
轻度、易变的兴趣记在 [`interest-notes.md`](./interest-notes.md)（例如产品试用触发的扫描欲）。日报写作前应扫一眼；正式主线仍以上文课题焦点为准。Cream 于每日 **05:00 HKT** 汇总当天讨论并更新该文件。

## 近期博客校准
- 2026-09-10：[MiracleAug 博文](https://rubatotree.github.io/blog/posts/miracle-aug-1/) — agentic 具身数据增强走通后的公开卡点（复杂几何建模成本、无示教轨迹校验、Mesh vs 3DGS 瑕疵感、**正向/批渲染开销**、防御性编程）；开放问题是图形学 ↔ LLM 互相替难点。批渲染项提高卡点②权重。细节见 [`interest-notes.md`](./interest-notes.md)。

## 相关开源（维护者）
- [MiracleAug skill](https://github.com/rubatotree/miracle-aug-skill)：GPT-6 Astra（或同级）驱动的机器人示教增强数据生成（Blender 重建 + 同步轨迹）；细节与试拍见 [`interest-notes.md`](./interest-notes.md)。

## 圈内新闻关注（2026-09-10 起）
除上述论文主线，每日关注 **LLM、Agent、图形学、具身智能** 圈内的新闻与社区反应，不限于与主课题直接相关的事件。重点看模型/产品、开源与工具、评测复现、会议和行业动态，以及实际使用反馈、认可与质疑。四领域均纳入检索，按重要性精选，不强求每日各有一条；事实与社区观点分别给来源。版式与证据规则见 `digest-spec.md`。
