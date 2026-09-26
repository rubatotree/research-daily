# 研究兴趣（公开摘要）

维护对象：Yutian Zhu（GitHub: [rubatotree](https://github.com/rubatotree)）

> 本文件只记录**可公开**的学术身份与研究方向，供日报策展加权。勿写入未公开实验细节、内部会议纪要或私人联系方式。

## 身份（公开）
- 中科大 CS → 北大计院硕
- 现：北大 Graphics Intelligence / Graphics and Interaction Lab（李胜老师）— Embodied AI、3DGS、Neural Rendering
- 曾：中科大 GCL（刘利刚老师）— Neural Rendering、Monte Carlo PDE
- 博客仓：https://github.com/rubatotree/blog
- 学术主页仓：https://github.com/rubatotree/academic

## 近期首要研究主线（2026-09-11 起）

维护者明确将 **MiracleAug 及相近的 Agent 驱动 Real2Sim2Real 工作的推进**放在接下来一段时间科研的主要位置。该优先级持续有效，直至维护者明确调整；不要因旧的加权列表或单条轻度兴趣笔记自动降级。

日报优先跟踪：通用 LLM/VLM Agent 调用 Blender、仿真器与机器人学习工具，从视频/示教重建可编辑场景，配置运动学与物理属性，生成观测—动作同步的增强数据，训练和评估策略，以及利用执行失败反馈继续改进数据、场景或策略。覆盖自动场景生成、示教/轨迹增强、模仿学习、RL 后训练、sim-to-real 与真机闭环。表示不限于 Mesh、3DGS/4DGS 或世界模型；与该流程直接相关的视觉推理和 agent-program / DSL 设计也纳入重点。

**相关工作跟踪规则：**
- 优先报道与上述流程直接重合或能补足其关键环节的论文、开源代码、产品能力和社区实测；不等到正式论文发表才收录。保留图形学基础方向与 LLM、Agent、图形学、具身四领域新闻的广泛检查。
- 对重点工作说明输入条件（纯视频，或额外 action / 标定 / URDF）、输出表示与可编辑性、人工干预、增强后的动作/接触有效性、训练与评估设置、时间/算力成本；未披露的字段明确留空或写未披露。
- 分清实际达到的阶段：视觉重建与重放、可交互物理仿真、增强数据生成、仿真策略训练/评估、真机迁移验证。区分作者自报、代码可核验和独立复现；不能由画面相似推断物理正确或真机有效。
- 有实质更新时在速览优先提示，简述“较上次推进了什么、与 MiracleAug 公开流程重合在哪里、哪些部件或实验可借鉴、还缺什么验证”。不能仅因方向相近推断跟随关系，也不依据演示就宣布创新性已被覆盖。
- 同一工作按开源、复现、新评测或真机结果等进展继续跟踪，注明原始日期与更新日期；无新证据时不重复展开，不制造竞争焦虑，不为固定数量注水。

**初始检索线索（不是已经验证的能力清单）：** aDSL、Thinking with Visual Primitives、SimFoundry、World Labs Atlas / Real-to-Sim-to-Real，以及通用 Agent + Blender / Isaac Sim + 示教增强 / 策略训练的社区实践；对标仓 [hku-sail/Real2Sim_GPT6_ASTRA](https://github.com/hku-sail/Real2Sim_GPT6_ASTRA)（写稿时顺带扫，有更新再简写）。每次核实具体项目、机构、版本与原始来源，避免名称混淆。详细公开基线以 [MiracleAug 仓库](https://github.com/rubatotree/miracle-aug-skill) 为准。

## 图形学基础方向（持续关注，次于上述近期主线）
围绕 **PTIR-GS / Real→Sim→Real**：手机等真实采集 → 可仿真资产 → 下游具身 / 控制。

以下为图形学方向内部加权，优先收录能服务上述主线的进展（**不要**在日报正文标 `[A]/[B]/[C]`）：
1. **拆分与绑定自动化**：可编辑动态 3DGS、绑骨/蒙皮、结构感知 Real2Sim（SC-GS 一脉）
2. **正向 / 批渲染效率**：大规模示教需要海量帧；ReSTIR、Radiance Cache、光探针、生成式后处理等
3. **逆渲染真实感 · 鲁棒性 · 材质**：手机采集几何、材质先验、前馈 3DGS、反射/透明、可重光照出口

## notes 与 blog 联合校准（每日必做）

`rubatotree/notes` 是 Agent 科研对话笔记及维护者科研零散想法的整理仓库，与 `rubatotree/blog` 同等重点关注；`academic` 继续用于公开身份与成果核验。Neon、Cream 及后续所有维护 Bot 均执行：

- 每日兴趣同步及实际写稿前，检查 notes 与 blog 自上次成功检查以来的 commits，并阅读相关变更正文，不能只看提交标题或网页。首次接入时先了解当前研究状态，再按需阅读近期笔记。
- 根据新增研究问题、阅读线索和明确偏好调整选题权重；区分用户意图、自述观察、Agent 建议、待验证假设与已验证结果，零散想法不自动替换既定主线。
- 私有运行记录保留成功读取的版本和日期；读取失败不推进检查点，并如实说明，不能当作没有更新。
- notes 的可访问性不等于公开授权；具体研究设想、实验细节、草稿、私人信息及笔记正文不得直接复制到公开日报或 meta。这里只公开通用规则，可公开的兴趣摘要仍遵守 `privacy.md`。
- Cream 的既有每日兴趣同步纳入同样检查；Neon 及接管写稿者仍核对源仓增量。发布任务先执行成功守卫和认领，已发布即退出；独立兴趣同步继续按原职责执行。

## 更新约定
兴趣漂移时，优先改本文件与 `LONG_TERM_MEMORY.md`，再改定时任务 prompt；勿把私人草稿直接贴进公开仓。

## 随手兴趣笔记
轻度、易变的兴趣记在 [`interest-notes.md`](./interest-notes.md)（例如产品试用触发的扫描欲）。日报写作前应扫一眼；正式主线仍以上文课题焦点为准。Cream 于每日兴趣同步（平台 cron **04:45**）汇总当天讨论并更新该文件。

## 近期博客校准
- 2026-09-10：[MiracleAug 博文](https://rubatotree.github.io/blog/posts/miracle-aug-1/) — agentic 具身数据增强走通后的公开卡点（复杂几何建模成本、无示教轨迹校验、Mesh vs 3DGS 瑕疵感、**正向/批渲染开销**、防御性编程）；开放问题是图形学 ↔ LLM 互相替难点。批渲染项提高卡点②权重。细节见 [`interest-notes.md`](./interest-notes.md)。

## 社区兴趣加权（2026-09-22 起）
- **Blender 社区 · 原生 3DGS：** 跟 Blender 5.3+ 将 3D Gaussian Splats 作为 PointCloud 原生类型（导入 PLY/SPZ、Geometry Nodes、Workbench/EEVEE/Cycles）。写稿前核 [5.3 Rendering notes](https://developer.blender.org/docs/release_notes/5.3/rendering/)；关注导出、性能、颜色空间、变换/绑骨后续。与 MiracleAug / agentic Blender 管线交叉，但勿写成已解决 Real2Sim 资产问题。细节见 [`interest-notes.md`](./interest-notes.md)。

## notes / blog 校准摘要（2026-09-23 起；2026-09-26 增补）
- **阅读加权（轻）：** VLA 过程监督与 Agent 仿真示范中的显式语言中间量（对照：视频后标注）；公开文献入口见 [`interest-notes.md`](./interest-notes.md)。概念层动机，未验证，不替换 MiracleAug 主线。
- **阅读加权（轻 · 2026-09-26）：** 已知运动学约束下、同轨迹动态高斯的新视角渲染与运动一致性（对照：新轨迹合成 / 静态编辑后重规划）；公开文献入口见 [`interest-notes.md`](./interest-notes.md)。来自 notes tip `0630f94` 校准，勿复制开题草稿。
- **blog 草稿（勿引用正文）：** 维护者在写 SIGGRAPH Asia 2026 论文笔记 I（`draft: true`，tip 仍 `8d722e0`）。日报只可跟文中已公开的论文本身，不得复述未发布草稿判断。

## 对标仓（公开 · 写日报时顺带扫）
- [hku-sail/Real2Sim_GPT6_ASTRA](https://github.com/hku-sail/Real2Sim_GPT6_ASTRA)：GPT-6 Astra 三视角 RGB→Blender Real2Sim／重放；与 MiracleAug 同族对照。**所有**日报 Bot 写稿时检查自上次日报以来的 commits；有实质更新则在日报中**简短描述**，无更新不提。**不另设盯梢任务。** 见 [`interest-notes.md`](./interest-notes.md)。

## 相关开源（维护者）
- [MiracleAug skill](https://github.com/rubatotree/miracle-aug-skill)：GPT-6 Astra（或同级）驱动的机器人示教增强数据生成（Blender 重建 + 同步轨迹）；细节与试拍见 [`interest-notes.md`](./interest-notes.md)。

## 圈内新闻关注（2026-09-10 起）
除上述论文主线，每日关注 **LLM、Agent、图形学、具身智能** 圈内的新闻与社区反应，不限于与主课题直接相关的事件。重点看模型/产品、开源与工具、评测复现、会议和行业动态，以及实际使用反馈、认可与质疑。四领域均纳入检索，按重要性精选，不强求每日各有一条；事实与社区观点分别给来源。版式与证据规则见 `digest-spec.md`。
