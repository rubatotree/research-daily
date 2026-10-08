# 研究兴趣（公开摘要）

维护对象：Yutian Zhu（GitHub: [rubatotree](https://github.com/rubatotree)）

> 本文件只记录**可公开**的学术身份与研究方向，供日报策展加权。勿写入未公开实验细节、内部会议纪要或私人联系方式。

## 身份（公开）
- 中科大 CS → 北大计院硕
- 现：北大 Graphics Intelligence / Graphics and Interaction Lab（李胜老师）— Embodied AI、3DGS、Neural Rendering
- 曾：中科大 GCL（刘利刚老师）— Neural Rendering、Monte Carlo PDE
- 博客仓：https://github.com/rubatotree/blog
- 学术主页仓：https://github.com/rubatotree/academic

## 近期首要研究主线（2026-10-08 起）

维护者明确将 **真实场景中的 3DGS 逆向渲染、可重光照资产质量与渲染效率**提升为首要研究与日报选题方向，替代 2026-09-11 的 MiracleAug / Agent 驱动 Real2Sim2Real 主线。该优先级持续有效，直至维护者明确调整；旧兴趣笔记中的 strong / active 标记及旧任务文案不得覆盖此次明确调整。

日报优先跟踪：RGB 真实采集条件下的几何、材质与光照解耦；缺乏可靠深度或法线先验时的重建鲁棒性；室内不完整场景与目标物体的可重光照资产质量；高斯光线追踪与可微逆渲染的效率、收敛和数值稳定性。重点论文优先讲清原理与实验，减少泛化的具身论文罗列。

**相关工作跟踪规则：**
- 优先报道与上述问题直接重合或能补足其关键环节的论文、开源代码及可核验复现；不等到正式发表才收录。初始公开阅读线索包括 PTIR-GS、PGSR、GRay、SRT-GS、IRGS 及其引用和后续工作；名称仅作检索线索，写稿时核实原文、版本、代码与实际前提。
- 对重点工作说明输入观测与相机条件，深度/法线等先验的来源及可靠性，输出几何/材质/光照与可编辑性，优化参数、目标与梯度路径，数据集、基线、消融及时间/显存成本；未披露的字段写未披露。
- 区分新视角拟合、几何/材质分解、重光照和资产编辑的证据；不能由漂亮渲染推断物理正确。加速应注明覆盖前向、反向、初始化还是端到端流程，并核对质量、采样数、硬件与停止条件。
- 对辐射场与物理光传输、间接光照、环境光表示、近远场近似及缓存等公开研究，讲清成立条件、偏差与方差、视角相关性、可见性、重光照范围和优化稳定性；不得把私有研究假设写成已证明的等价关系或已验证改进。
- 有实质更新时在速览优先提示：推进了什么，解决哪个逆渲染瓶颈，哪些机制可复用，已有公开方法重合在哪里，仍缺什么验证。区分作者自报、代码可核验与独立复现，不依流行程度判断技术有效性。
- 同一工作按开源、复现、新评测或真机结果等进展继续跟踪，注明原始日期与更新日期；无新证据时不重复展开，不制造竞争焦虑，不为固定数量注水。

**次要持续关注：** 已有策略训练相关的高信号方法、评测和部署进展，以及 MiracleAug、aDSL、SimFoundry 等公开 Agent / Real2Sim 工作；绑定、动态资产与具身数据增强不再占据首要论文位置。保留既有对标仓顺带检查，但仅在实质更新时简写。四领域新闻仍按重要性精选，不设数量配额。不据此次选题调整自动改变任何实验或训练任务。

## 主线内部阅读加权
围绕真实采集 → 几何与外观解耦 → 可重光照、可编辑的 3DGS 资产。

以下为图形学方向内部加权，优先收录能服务上述主线的进展（**不要**在日报正文标 `[A]/[B]/[C]`）：
1. **逆渲染鲁棒性与资产质量**：真实室内与不完整采集；目标物体几何、材质、光照分解；弱先验与失效案例；重光照和编辑评测。
2. **几何质量与高斯光追效率**：表面/法线质量、高斯形状与初始化、光线求交和加速结构；同时评估几何误差与渲染质量。
3. **逆渲染效率与光传输估计**：可微渲染、梯度估计、收敛加速、间接光照与辐射缓存、物理与近似表示的误差及适用边界。
4. **次要方向**：绑定、4DGS、Agent 场景生成与具身策略；仅高信号更新展开。批渲染与光传输复用仍作为相关基础研究线索。

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

## Cream 私聊兴趣加权（2026-09-27）
- **低成本 / 低端机具身 × 合成数据 demo（加权重）：** 跟 on-device VLA / edge robotics runtimes、弱算力合成数据管线、量化蒸馏、student/hobbyist robot stacks；对照 Jetson Thor / Cosmos Edge 时写明「工业边缘 ≠ 学生低端机」。可与 MiracleAug 合成示教交叉，勿压过主菜、勿写成已验证产品结论。细节见 [`interest-notes.md`](./interest-notes.md)。

## notes / blog 校准摘要（2026-09-23 起；2026-09-26 / 2026-10-04 增补）
- **阅读加权（轻）：** VLA 过程监督与 Agent 仿真示范中的显式语言中间量（对照：视频后标注）；公开文献入口见 [`interest-notes.md`](./interest-notes.md)。概念层动机，未验证，不替换当前逆渲染主线。
- **阅读加权（轻 · 2026-09-26）：** 已知运动学约束下、同轨迹动态高斯的新视角渲染与运动一致性（对照：新轨迹合成 / 静态编辑后重规划）；公开文献入口见 [`interest-notes.md`](./interest-notes.md)。来自 notes tip `0630f94` 校准，勿复制开题草稿。
- **阅读加权（轻 · 2026-10-04）：** notes tip `207a3b2` 校准——3DGS 部件修复在运动学/接触约束与完好参考条件生成上的文献缺口；批渲染（splat 栅格 vs Cycles/EEVEE）数量级对照加固卡点②；SO-101 公开 URDF 作低成本臂运动学入口。细节见 [`interest-notes.md`](./interest-notes.md)；勿复制 notes 正文或私有外推数字。
- **blog 草稿（勿引用正文）：** 维护者在写 SIGGRAPH Asia 2026 论文笔记 I（`draft: true`，tip 仍 `8d722e0`）。日报只可跟文中已公开的论文本身，不得复述未发布草稿判断。

## 对标仓（公开 · 写日报时顺带扫）
- [hku-sail/Real2Sim_GPT6_ASTRA](https://github.com/hku-sail/Real2Sim_GPT6_ASTRA)：GPT-6 Astra 三视角 RGB→Blender Real2Sim／重放；与 MiracleAug 同族对照。**所有**日报 Bot 写稿时检查自上次日报以来的 commits；有实质更新则在日报中**简短描述**，无更新不提。**不另设盯梢任务。** 见 [`interest-notes.md`](./interest-notes.md)。

## 相关开源（维护者）
- [MiracleAug skill](https://github.com/rubatotree/miracle-aug-skill)：GPT-6 Astra（或同级）驱动的机器人示教增强数据生成（Blender 重建 + 同步轨迹）；细节与试拍见 [`interest-notes.md`](./interest-notes.md)。

## 圈内新闻关注（2026-09-10 起）
除上述论文主线，每日关注 **LLM、Agent、图形学、具身智能** 圈内的新闻与社区反应，不限于与主课题直接相关的事件。重点看模型/产品、开源与工具、评测复现、会议和行业动态，以及实际使用反馈、认可与质疑。四领域均纳入检索，按重要性精选，不强求每日各有一条；事实与社区观点分别给来源。版式与证据规则见 `digest-spec.md`。
