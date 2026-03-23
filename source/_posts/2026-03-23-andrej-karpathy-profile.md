---
title: Andrej Karpathy 完整档案：从斯坦福到 OpenAI、Tesla 与 Eureka Labs
date: 2026-03-23 14:00:00
tags:
  - AI
  - Deep Learning
  - 人物访谈
  - OpenAI
  - Tesla
categories:
  - 技术资源
---

Andrej Karpathy 是当今 AI 领域最具影响力的研究者、教育家和实践者之一。本文整理了他的完整职业轨迹、开源项目、教育理念以及他对 AI 发展的核心观点。

<!-- more -->

---

## 个人简介

| 项目 | 内容 |
|------|------|
| **全名** | Andrej Karpathy |
| **出生** | 1986年10月23日，斯洛伐克布拉迪斯拉发（当时属捷克斯洛伐克） |
| **国籍** | 斯洛伐克裔加拿大人（15岁移居加拿大多伦多） |
| **职业** | AI 研究者、教育家、创业者 |
| **荣誉** | MIT Technology Review「35岁以下创新者」（2020）、TIME「AI领域最具影响力100人」（2024） |

### 教育背景

| 学位 | 学校 | 时间 | 导师/方向 |
|------|------|------|-----------|
| 学士 | 多伦多大学 | 2009 | 计算机科学与物理学 |
| 硕士 | 英属哥伦比亚大学 | 2011 | 导师 Michiel van de Panne，物理仿真与运动技能学习 |
| 博士 | 斯坦福大学 | 2015 | 导师 Fei-Fei Li，连接图像与自然语言的深度学习模型 |

> **趣事**：早年以 YouTube 频道 **badmephisto** 发布魔方教程而广为流传；博士期间设计并主讲了斯坦福第一门深度学习课程 **CS231n**。

---

## 职业时间线

| 时间 | 职位 | 说明 |
|------|------|------|
| 2011、2013、2015 | Google/DeepMind 实习 | 无监督/监督学习与强化学习 |
| 2015–2017 | OpenAI 研究科学家 | **创始成员之一** |
| 2017–2022 | Tesla 人工智能总监 | Autopilot Vision 负责人，向 Elon Musk 汇报 |
| 2023–2024 | 重返 OpenAI | 研究科学家，聚焦 midtraining 与合成数据 |
| 2024–至今 | Eureka Labs 创始人 | AI + 教育，首款课程 LLM101n |
| **当前状态** | 自由职业 | 2025年末再次离开 OpenAI，专注 Eureka Labs；活跃于 X/Twitter、GitHub、YouTube |

---

## 项目与开源（精选）

### 深度学习框架与工具

| 项目 | 年份 | 描述 |
|------|------|------|
| [ConvNetJS](https://github.com/karpathy/convnetjs) | 2014 | 浏览器原生卷积神经网络库（纯 JavaScript），支持网络在线训练与演示 |
| [arxiv-sanity](https://github.com/karpathy/arxiv-sanity-lite) | - | 论文检索与可视化工具，支持相似度排序、推荐与专题聚合 |
| [char-rnn](https://github.com/karpathy/char-rnn) | - | 字符级语言模型（Torch/NumPy）；《The Unreasonable Effectiveness of RNNs》配套代码 |

### 教育导向项目

| 项目 | 年份 | 描述 |
|------|------|------|
| [micrograd](https://github.com/karpathy/micrograd) | 2022 | 极简自动微分引擎与小型神经网络库（PyTorch 风格 API） |
| [nanoGPT](https://github.com/karpathy/nanoGPT) / [llm.c](https://github.com/karpathy/llm.c) | - | 从零开始的 GPT 预训练与底层实现；教学导向 |
| [MicroGPT](https://github.com/karpathy/microgpt) | 2026 | 约243行纯Python的极简GPT（无框架依赖），强调算法可读性 |
| **Zero to Hero** | - | Neural Networks: Zero to Hero 系列课程与代码仓库（从零到GPT） |

### 前沿研究项目

| 项目 | 年份 | 描述 |
|------|------|------|
| [AutoResearch](https://github.com/karpathy/autoresearch) | 2026 | ≈630行训练代码的单GPU自主研究闭环系统；2天700+次实验，自动发现并应用20+改进 |
| [nanochat](https://github.com/karpathy/nanochat) | 2026 | 轻量对话模型（类Llama+旋转嵌入、QK Norm），极低成本训练与端到端部署 |

---

## 社交媒体与主页

| 平台 | 链接 | 说明 |
|------|------|------|
| **X (Twitter)** | [@karpathy](https://x.com/karpathy) | 主要发声平台，技术观点与行业洞察 |
| **YouTube** | [@AndrejKarpathy](https://www.youtube.com/@AndrejKarpathy) | 教育视频，Zero to Hero 系列 |
| **GitHub** | [@karpathy](https://github.com/karpathy) | 开源项目与代码 |
| **个人主页** | [karpathy.ai](https://karpathy.ai) | 博客与项目汇总 |
| **Eureka Labs** | [eurekalabs.ai](https://eurekalabs.ai) | AI 教育平台 |

---

## 博客与写作

### 当前主博客（Bear blog）

- **地址**：[karpathy.ai/blog](https://karpathy.ai/blog/)
- **特点**：直接编写 HTML/CSS，无框架/追踪/RSS，轻量化发布
- **近期文章**：
  - *Founding fathers on today's America*（2024-12-16）
  - *I love calculator*（2024-09-08）
  - *Licklider 1960*（2023-12-27）

### GitHub 博客（早期经典）

- **地址**：[karpathy.github.io](https://karpathy.github.io/)
- **代表作**：
  - [Software 2.0](https://karpathy.github.io/2017/05/11/softmax/)（2017）- 软件范式的转变
  - [A Recipe for Training Neural Networks](https://karpathy.github.io/2019/04/25/recipe/)（2019）- 神经网络训练指南
  - [The Unreasonable Effectiveness of Recurrent Neural Networks](https://karpathy.github.io/2015/05/21/rnn-effectiveness/)（2015）- RNN 经典文章
  - [A Survival Guide to a PhD](https://karpathy.github.io/2016/09/07/phd/)（2016）- 读博生存指南

---

## 播客与访谈（精选）

### 深度访谈

| 节目 | 时间 | 主题 |
|------|------|------|
| **Dwarkesh Podcast** | 2025 | 代理演进、认知缺陷与"九个九"可靠性路径；预告 AGI 时间尺度约十年 |
| **No Priors** | 2024/2026 | 代码代理、AutoResearch 与"loopy era"，人类角色从执行到指挥的转型 |
| **Lex Fridman Podcast** | 2022 | 深度学习与自动驾驶实践 |
| **Robot Brains** | 2021 | AI 与机器人进展 |

### 技术演讲

| 活动 | 时间 | 主题 |
|------|------|------|
| **Tesla AI Day** | 2021 | Autopilot 感知栈、数据闭环与工程化 |
| **Autonomy Day** | 2019 | 自动驾驶技术架构 |
| **State of GPT @ Microsoft Build** | 2023 | 大模型基础与应用 |
| **GPU Mode / YC AI Startup School** | 2024/2025 | 开源、教育与实践 |

---

## YouTube 频道内容

- **频道**：[@AndrejKarpathy](https://www.youtube.com/@AndrejKarpathy)
- **两条主线**：
  - **通用受众**：*Deep Dive into LLMs like ChatGPT*、*How I Use LLMs*
  - **技术路线**：**Zero to Hero** 播放列表（从零到GPT，含代码实现）
- **必看视频**：*Intro to Large Language Models*、*Neural Networks: Zero to Hero* 系列

---

## 当前动态与理念（2026）

### Eureka Labs

AI 原生教育平台；倡导 AI 教学助手与个性化学习路径。

### Vibe Coding（2025年提出）

> **核心理念**：以自然语言描述驱动、由 AI 编码工具完成实现的编程范式。

这一概念引发编程社区广泛讨论，重新定义了人机协作模式。

### 代理工程与多代理协作

- 强调从"手动编码"转向"多代理指挥与编排"
- 重视系统设计、提示工程与模型分工适配（model speciation）

### AutoResearch 与自主科研

AI 代理可独立编辑、运行、评估与迭代，形成可扩展的研究集群，大幅提升科研效率。

### 物理世界作为下一阶段

> 数字领域"数据悬垂"会逐渐耗尽，未来增长将更多依赖传感器与执行器的原子世界集成。

---

## 学术贡献

### 博士论文

- **Connecting Images and Natural Language**（2016）

### 代表论文

| 论文 | 会议 | 年份 |
|------|------|------|
| PixelCNN++ | ICLR | 2017 |
| World of Bits | ICML | 2017 |
| DenseCap | CVPR (Oral) | 2016 |
| Deep Visual-Semantic Alignments | CVPR (Oral) | 2015 |
| ImageNet ILSVRC | IJCV | 2015 |

---

## 为什么 Andrej Karpathy 重要？

Karpathy 的独特之处在于他不仅是一位研究者，更是一位卓越的**教育者**和**实践者**。他在三个关键维度上塑造了现代 AI 的发展：

### 1. 教育维度

通过 CS231n 课程和 Zero to Hero 系列，他将复杂的深度学习概念转化为易于理解的教学内容，培养了整整一代 AI 从业者。

### 2. 工程维度

在 Tesla，他领导构建了大规模自动驾驶系统，展示了深度学习在现实世界中的应用；在 OpenAI，他参与推动了 GPT 系列模型的发展。

### 3. 开源维度

他坚持"从零开始"的教学理念，通过开源项目让每个人都有机会理解和实现先进技术。

更重要的是，Karpathy 一直在**搭建桥梁**——在研究与工程之间、算法与系统之间、产品与教育之间。他不是用某一项单一成就定义自己，而是通过持续的努力，将 AI 技术从实验室推向工业界，再通过教育和开源让更多人参与进来。

---

## 参考链接

- [官方网站](https://karpathy.ai)
- [GitHub](https://github.com/karpathy)
- [Twitter/X](https://x.com/karpathy)
- [YouTube](https://www.youtube.com/@AndrejKarpathy)
- [Eureka Labs](https://eurekalabs.ai)

---

*最后更新：2026年3月23日*
