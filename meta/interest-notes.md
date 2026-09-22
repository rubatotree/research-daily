# 兴趣随手笔记

随手记录维护者**当前在瞄什么**（试用产品、路过的想法、想扫一眼的前沿），以及与 Bot 的**当日讨论摘要**。  
供日报策展做轻量加权与「新兴趣相关」补读；**不是**正式课题清单。

约定：
- 可公开、可删改；勿写密钥 / 未公开实验 / 私人联系方式（见 `privacy.md`）
- 主课题仍以 `research-interests.md` 为准；本文件权重通常更低，除非条目写明「加权重」
- 日报写作前应扫一眼本文件；有新笔记可在「新兴趣相关」收录前沿概览（不限昨日上新）
- 每条建议带日期；过时可标 `archived` 或删掉
- **同步节奏：** Cream 在每日兴趣同步（平台 cron **04:45**）汇总当天讨论并更新本文件；平时聊天可随时追加兴趣，不须等同步点。同步结束后**须私聊用户**简报主要新增；无新增也要说明「今日无新增」。

---

## 2026-09-22 · 当日讨论摘要

1. **新兴趣：Blender 社区动态，尤其 3DGS 原生表示接入** — 详见下方专题。维护者要求日报侧留意 Blender 社区最新动态，重点跟 **3D Gaussian Splatting 接入 Blender 原生表示 / 导入渲染管线**（不再只靠第三方插件）。

---

## 2026-09-22 · Blender 社区 · 原生 3DGS 表示（强兴趣 · 加权重）

- **触发：** 维护者明确要求翻 Blender 社区最新动态，尤其最新 **3DGS → Blender 原生表示** 线。
- **当前公开高信号（录入时快照，写稿前须再核官方 release notes）：**
  - **Blender 5.3**（alpha；完整版计划约 **2026-11-10**）加入 **原生 3D Gaussian Splat 导入与渲染**（[开发者文档 · Rendering](https://developer.blender.org/docs/release_notes/5.3/rendering/)，PR#163102）。
  - **表示：** PointCloud data-block 新增 `Type`：`Points` / **`3D Gaussian Splats`**；属性含 scale、quaternion、`radiance:base`、`radiance:sh_*` 等。
  - **导入：** PLY（自动检测 splat）、SPZ（至 v4）；Geometry Nodes：`Set Point Cloud Type`、`Import SPZ`；Import PLY 输出改名为 Geometry。
  - **渲染：** Workbench / EEVEE / Cycles 均可；默认 emissive。
  - **已知限制（官方）：** 性能仍不理想；sRGB 训练假设 vs 线性渲染在低不透明度/高 radiance 处偏差；Apply Transform 尚未正确处理 scale/rotation/SH；**尚无导出**。
  - 此前依赖 BlendSplat / KIRI 等插件；设计任务约 2026-06 由 Sergey 等推进（社区报道可参考，写稿时链回官方）。
- **与主线关系：** 直接撞上 MiracleAug / Astra+Blender / Real2Sim 资产入口——原生 splat 公民化后，agentic DCC 与示教增强可少一层插件依赖；仍须区分「能导入渲染」≠「可编辑绑骨 / 可导出仿真资产」。对照主线卡点①拆分绑定与②正向效率时可用。
- **日报怎么用：** 「新兴趣相关」或圈内可跟 **Blender 5.3 原生 3DGS**、官方 release notes / developer forum / 社区实测（性能、颜色、导出缺口）；有实质进展（beta、导出、rigging 行为落地）再升格速览。**勿压过** PTIR / MiracleAug 主菜；禁止编造未发布能力。
- **状态：** active · strong · watch-blender-native-3dgs · 加权重


## 2026-09-14 · 当日讨论摘要（晚间）

1. **对标仓：** [hku-sail/Real2Sim_GPT6_ASTRA](https://github.com/hku-sail/Real2Sim_GPT6_ASTRA) — 与 MiracleAug 同族；**写入公开规范，由各日报 Bot 写稿时顺带扫**，有更新则在日报中简短描述；**不另设盯梢任务／不额外私聊刷屏**。详见下方专题。

---

## 2026-09-14 · 对标仓：hku-sail/Real2Sim_GPT6_ASTRA（写日报时顺带扫）

- **仓库：** https://github.com/hku-sail/Real2Sim_GPT6_ASTRA  
- **定位（公开 README）：** 三视角机器人 RGB → Blender 场景重建与动作重放（`replay.blend`）；Efficient ASTRA 流水线文档；强调**仅 RGB、无标定/深度/真实关节**，视觉近似重放 ≠ 真机关节/动力学 GT。
- **与 MiracleAug 对照（公开层）：** 同属 Astra + Blender / Real2Sim 叙事；本仓更偏**固定三视角重建+重放+验证脚本**；MiracleAug 更偏 **agent skill + 任务一致示教增强/数据生成**。日报可交叉，勿混写能力边界。
- **公开基线（录入时 tip）：** commit `a1624d6`（2026-09-10）*Generalize ASTRA video reconstruction workflow*；此前有 three-stage ASTRA cascade、efficient pipeline 文档、bilingual README。无 GitHub Releases。
- **协作约定：** 各 Bot（Neon / Cream 等）在**写日报流水线**中检查该仓自上次日报以来的 commits；有实质更新 → 日报里简短描述；无更新 → 不提。**禁止**为此单独加盯梢 routine 或每日「无更新」私聊。禁止编造未公开实验对比。
- **状态：** active · digest-source · peer-to-MiracleAug · tip=`a1624d6`


## 2026-09-10 · 当日讨论摘要

1. **MiracleAug skill 开源与试跑（主线活动）** — 详见下方专题。用户发布 [rubatotree/miracle-aug-skill](https://github.com/rubatotree/miracle-aug-skill)，并拍摄较复杂具身场景试用该 skill。
2. **Agentic 数据增强 → 弱点驱动闭环（方向讨论）** — 将 skill 定位为 agentic data augmentation；下一步开放问题是自动测 policy 失败条件（视角/物体位姿/背景等），再按薄弱面定向调用增强并再训（「缺什么补什么」；与 DAgger 类回环同族）。**公开笔记不记录私人对话原文。**
3. **博客更新（强校准信号）** — 新文 [MiracleAug: 用 GPT-6 Astra 点燃具身数据增强的核弹吧](https://rubatotree.github.io/blog/posts/miracle-aug-1/)（仓 commit `6fad74d`）；详见下方「博客校准」条。

---

## 2026-09-09 · MiracleAug：Astra → 机器人增强数据（强信号）

- **仓库：** https://github.com/rubatotree/miracle-aug-skill  
  - 简介：GPT-6 Astra → Robot Augmentation Data Generation  
  - 定位：agent skill；单次示教 → 可编辑 Blender 重建 + 任务一致的增强示教（同步机器人轨迹）
- **能力摘要（公开 README）：** 视频 / 本地数据集 / HF episode 入口；先存可审 scene checkpoint，再按配额生成并校验原生数据集；强调度量几何、CAD/URDF 运动学、标定相机与运动、光/材质/环境/物体/轨迹强弱变化；未见表面与无关节输入时的运动须标为推断，不冒充录制 GT。
- **今日实践：** 拍摄**较复杂的具身场景**，尝试用该 skill 跑通管线（效果细节未公开写入；日报勿编造指标）。
- **方向延展（公开概念层）：** 工作本质可概括为 **agentic data augmentation**。现版偏「人指定增强类型与范围」；开放路线是更自动的闭环——先测当前 policy 在哪些条件易失败，再让系统判断最值得补的数据并调用 MiracleAug 定向生成后重训（「根据模型弱点主动造最有价值的数据」）。与此前示意的 **DAgger 类回环**同族，公开笔记记为兴趣加权，**勿写成已实现系统或组内计划。**
- **工程观察（定性、无数字）：** 复杂场景试跑中，几何复杂物体变多时，大模型侧迭代建模耗时明显上升——可作为 agentic reconstruction 瓶颈信号，供日报扫「复杂几何 / 部件级重建效率」时对照，**禁止编造耗时数字。**
- **与主线关系：** 承接「Astra + Blender 跑具身管线」试玩，落到可复用的开源 skill；日报「新兴趣相关」可跟 agentic DCC / Real2Sim 数据引擎 / 示教增强 / failure-driven 数据闭环交叉，**勿压过** PTIR 卡点策展，也勿写入未公开场景隐私、私人对话或实验数字。
- **状态：** active · strong · shipping · roadmap-open · **博客已公开**（见校准条）



## 2026-09-10 · 博客校准：MiracleAug 公开笔记（强信号）

- **文：** [MiracleAug: 用 GPT-6 Astra 点燃具身数据增强的核弹吧](https://rubatotree.github.io/blog/posts/miracle-aug-1/)  
  - 源仓：`content/posts/miracle-aug-1.typ` · commit `6fad74d`（`docs: Update miracle aug doc init`）  
  - 标签：计算机图形学 / 具身智能 / Agent / Blender · 日期 2026-09-10
- **公开主张（概念层）：** GPT-6 Astra + Blender 可走通具身数据增强管线中的几乎所有环节；开源 skill 见 [miracle-aug-skill](https://github.com/rubatotree/miracle-aug-skill)。
- **文中公开的卡点观察（供日报加权，勿编造数字）：**
  1. **复杂几何物体多** → 大模型迭代建模极耗 token/时间（与此前兴趣笔记定性观察一致）
  2. **无示教轨迹生成** → 物理正确性验证很久
  3. **Mesh 表示** 相对 3DGS 少「瑕疵感 / 随机性」（表示选择问题，也许可解）
  4. **正向 / Batch 渲染** 仍是重大开销（上千条示教缺好的批渲染）← **直接撞上 PTIR 卡点②正向效率**
  5. **防御性编程**（反复校验轨迹 / 压缩帧）放大时间与 token
- **开放研究问题（博文收束，日报可跟）：** 何处用传统图形学替掉 LLM 管线难点、何处用 LLM 替掉传统图形学难点、LLM 方法带来哪些新可能性。可与「弱点驱动造数 / DAgger 类回环」并列为 agentic 数据引擎交叉兴趣。
- **日报怎么用：** 「新兴趣相关」与圈内交叉可跟 agentic DCC / Real2Sim 数据增强 / batch rendering for demo fleets；**勿压过**拆分绑定 · 逆渲染主菜；禁止写入未公开实验数字或私人对话。
- **状态：** active · strong · blog-published · 校准主线权重↑（尤其批渲染）

## 2026-09-08 · 当日讨论摘要

与 Cream 聊天中触及的兴趣信号（供 9/9 日报参考）：

1. **3D 生成（轻度）** — 试用 TripoAI 后想了解前沿；Mesh+PBR vs 生成式 3DGS vs 仿真就绪三角前馈。详见专题条。
2. **GPT-6 Astra × 创作者舆论（路过）** — Blender 广告争议 + computer-use 操 DCC 兴奋；学术图形共同体暂无集体表态。
3. **3DGS 语义分割后部件修复（思路讨论）** — 分割部件破损/碎点；拟用 fail–GT pair 训 diffusion，可微渲染监督 + 拼回整场对齐原 3DGS。调研无整条同款（近邻 Clean-GS / PartGen / GSFix3D）。贴近卡点「拆分绑定」。
4. **GPT-Astra 跑通具身管线试玩（强信号）** — 把原 Real→Sim→Real 图里「重建 / 拆分绑定 / 数据增强」改成 **GPT-6 Astra + Blender 自动**；用户结论：效果「非常非常好」。日报可跟「agentic DCC + 具身数据引擎」交叉，仍勿写成已发表结论或泄露未公开实验数字。

---

## 2026-09-08 · 3D 生成（轻度兴趣）

- **触发：** 试用了 [Tripo AI](https://www.tripo3d.ai/)（文中常写作 Tripo / TripoAI 3D）一类 **图像/文本 → 3D 资产** 产品，开始想随便了解「最前沿在做什么」。
- **性质：** **只是兴趣**，不是把主线改成生成式 3D；PTIR-GS / Real2Sim / 可编辑动态资产仍是主加权。
- **想扫的方向（开放列表，可增删）：**
  - 前馈 / 大规模重建与生成：从单图、少图、视频到 mesh / 3DGS / 高斯–网格混合
  - 生成资产的**可编辑性、拓扑/绑骨友好性**（能否接 Real2Sim / 仿真）
  - 与具身数据管线的交界面：生成式资产当示教增强 / 场景填充时，几何与材质可信度如何
  - 开源基线 vs 闭源产品（Tripo、同类商业管线）各自卡在哪
  - （讨论补充）仿真就绪表示 vs 纯观感生成；产品级 mesh 管线 vs 学术前馈重建
- **日报怎么用：** 可在「新兴趣相关」放 1–3 条**前沿扫描**（近期顶会/预印本或重要开源），点明在做什么、和主线差在哪；勿冲淡绑定 / 逆渲染 / 批渲染主菜。
- **状态：** active · casual

---

## 2026-09-08 · 3DGS 分割部件修复（思路 · 讨论）

- **问题：** 现有语义分割得到的子 3DGS 常破损，且伴有零碎多余高斯。
- **设想：** 用分割 GT × 算法 fail 构造坏–好 pair 训 diffusion；坏部件进 diffusion 得修补结果，经可微渲染监督；修复中另将「在修部件 + 其它部件」拼回，与原完整 3DGS 渲染做一致性 loss。
- **文献印象：** 无整条同款；近邻为 Clean-GS/COB-GS（清理）、场景级 GS inpaint/repair（RI3D、GSFix3D 等）、PartGen（部件补全再拼）。
- **状态：** active · idea · 贴近主线卡点①拆分绑定

---

## 2026-09-08 · GPT-Astra × 具身管线试玩（强兴趣）

- **触发：** 直接用 GPT-6 Astra（+ Blender computer-use）尝试原先规划的具身 Real→Sim→Real 管线环节。
- **相对原图的变化（概念层）：** 重建 / 拆分与绑定 / 数据增强 从「自研可微渲染栈 + 手工绑骨」叙事，转向 **Astra 驱动 DCC 自动完成**；采集与 VLA / failure 回环仍在。
- **主观结论：** 效果非常好（用户原话量级）；冲击感强。
- **对研究的开放问题（公开可写）：**
  - 哪些卡点被「操 DCC 的智能体」绕开了，哪些仍要物理/可微渲染（材质、可重光照、批渲染效率、仿真接触精度）？
  - 生成/重建资产是否达到示教增强与 Sim2Real 所需的几何–材质可信度？
  - 与 PTIR-GS 主线是替代、互补，还是变成「上游资产入口」？
- **日报怎么用：** 「新兴趣相关」可扫 agentic 3D / Blender 工作流 / 具身数据引擎交叉工作；**禁止**写入未公开实验细节、组内计划或私人对话。
- **状态：** active · strong · watch

