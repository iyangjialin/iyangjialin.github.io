---
title: "Hermes Agent vs OpenClaw：基于官方文档的深度对比"
date: 2026-04-22 18:30:00
tags:
  - AI Agent
  - Hermes
  - OpenClaw
  - 工具对比
categories:
  - 工具评测
---

上一篇从迁移视角对比了 Hermes 与 OpenClaw，本篇直接对照两个项目的官方文档，从**学习能力、架构设计、功能矩阵**三个维度做更底层的分析。

> 数据来源：[zread.ai/NousResearch/hermes-agent](https://zread.ai/NousResearch/hermes-agent) · [zread.ai/openclaw/openclaw](https://zread.ai/openclaw/openclaw)  
> 更新时间：2026-04-22

<!-- more -->

---

## 1. 项目概览

### Hermes Agent

| 属性 | 值 |
|------|-----|
| **项目** | NousResearch/hermes-agent |
| **开发组织** | Nous Research |
| **编程语言** | Python 3.11+ |
| **许可证** | MIT |
| **当前版本** | v0.10.0 |
| **定位** | **自改进的 AI Agent 运行时** |
| **核心特性** | 闭合学习循环 · 模型无关 · 多 Provider 路由 |

> "Unlike conventional AI assistants that reset with every conversation, Hermes features a **closed learning loop** — it creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of your workflow over time."

### OpenClaw

| 属性 | 值 |
|------|-----|
| **项目** | openclaw/openclaw |
| **开发组织** | OpenClaw Community |
| **编程语言** | TypeScript |
| **许可证** | MIT |
| **定位** | **本地优先的多渠道 AI 助手** |
| **核心特性** | 本地运行 · 20+ 消息渠道 · 插件扩展 |

> "OpenClaw is an open-source personal AI assistant that runs entirely on your own hardware. Think of it as your own private AI operator, always on, always yours."

### 一句话总结

- **Hermes Agent** = 自改进的学习型 Agent
- **OpenClaw** = 本地优先的多渠道助手

---

## 2. 核心技术对比

| 维度 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| **语言** | Python 3.11+ | TypeScript |
| **架构哲学** | 模型无关运行时 | 本地优先控制平面 |
| **学习能力** | ✅ 闭合学习循环 | ❌ 无内置学习 |
| **核心范式** | 工具调用 + 记忆 + 压缩 | 消息网关 + 插件 |
| **会话模型** | AIAgent 对话引擎 | Pi Agent 会话模型 |

### Hermes 的学习循环

```
用户交互 → 经验积累 → 技能自创建 → 使用中改进 → 知识持久化 → 下次会话 recall
```

OpenClaw **每次会话都是白板**，没有内置学习机制。

---

## 3. 架构设计对比

### Hermes Agent 架构

```
┌─────────────────────────────────────────────────┐
│              Hermes Agent Runtime                 │
├─────────────────────────────────────────────────┤
│  AIAgent Conversation Engine                     │
│  ├── Tool Registry (50+ 内置工具)                │
│  ├── Memory Manager (三层记忆)                   │
│  ├── Context Compressor (自动压缩)               │
│  ├── Skills System (SKILL.md 标准)               │
│  └── Multi-Provider Router                       │
├─────────────────────────────────────────────────┤
│  Subagent Delegation (最多 3 并发子代理)          │
│  MCP Integration                                 │
│  Plugin Architecture                             │
└─────────────────────────────────────────────────┘
            ↓ 多平台交付
    飞书 · 微信 · Telegram · Discord · ...
```

### OpenClaw 架构（Hub-and-Spoke）

```
                ┌─────────────────┐
                │  Pi Agent Runtime│
                └────────┬────────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
  ┌───────▼───────┐      │    ┌─────────▼───────┐
  │ Model Providers│      │    │  Clients         │
  │ OpenAI        │      │    │  CLI             │
  │ Anthropic     │      │    │  Web Chat        │
  │ Google        │      │    │  macOS/iOS/Android│
  │ Ollama/Local  │      │    └──────────────────┘
  │ 30+ more      │      │
  └───────────────┘      │
                ┌────────┴────────────────────┐
                │                             │
    ┌───────────▼──────┐         ┌────────────▼──────┐
    │ Messaging Channels│         │ Gateway (WS)      │
    │ WhatsApp          │         │ ws://127.0.0.1    │
    │ Telegram          │         │    :18789         │
    │ Slack / Discord   │         └───────────────────┘
    │ Signal / 20+ more │
    └───────────────────┘
```

### 核心架构差异

| 差异点 | Hermes Agent | OpenClaw |
|--------|-------------|----------|
| **中心组件** | AIAgent 引擎 | Gateway WebSocket |
| **绑定方式** | 工具 + 记忆 | 消息通道 |
| **数据流向** | 用户 → Agent → 工具 | 用户 → Gateway → Agent → Provider |
| **本地化** | 可选 | **核心设计原则** |
| **端口** | 无固定端口 | `ws://127.0.0.1:18789` |

---

## 4. 功能特性逐项对比

### 4.1 学习与记忆

| 特性 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| **学习循环** | ✅ 闭合学习 · 自创技能 · 使用中改进 | ❌ 无 |
| **长期记忆** | ✅ MEMORY.md + USER.md + FTS5 | ❌ 简单文件存储 |
| **会话搜索** | ✅ FTS5 全文 + LLM 摘要 | ❌ 基础历史 |
| **跨会话 recall** | ✅ | ❌ |
| **记忆容量管理** | ✅ 严格限制 + 自动整合 | ❌ 无 |
| **记忆安全扫描** | ✅ Injection 扫描 | ❌ 无 |
| **外部记忆 Provider** | ✅ 8 种（Honcho / Mem0 / Holographic…） | ❌ 无 |

**结论**：Hermes 记忆系统远超 OpenClaw。

### 4.2 Agent 能力

| 特性 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| **核心引擎** | AIAgent Conversation Engine | Pi Agent |
| **多 Agent 路由** | ✅ 子代理委托系统 | ✅ Multi-Agent Routing |
| **并行工具执行** | ✅ | ❌ 顺序执行 |
| **上下文压缩** | ✅ 自动 Context Compression Engine | ✅ Context Engine |
| **会话检查点** | ✅ 自动快照 + `/rollback` | ❌ 无 |
| **对话历史** | SQLite FTS5 | 基础支持 |

### 4.3 消息平台

| 平台 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| **飞书** | ✅ 原生集成 | ❌ 无 |
| **微信** | ✅ 原生集成 | ❌ 无 |
| Telegram | ✅ | ✅ |
| Discord | ✅ | ✅ |
| Slack | ✅ | ✅ |
| WhatsApp | ✅ | ✅ |
| Signal | ✅ | ✅ |
| Matrix | ✅ | ❌ |
| Mattermost | ✅ | ❌ |
| Home Assistant | ✅ | ❌ |
| **平台总数** | 10+ | 20+ |

**结论**：OpenClaw 支持更多小众平台，但 Hermes 覆盖了飞书/微信这个关键差异。

### 4.4 开发工具

| 特性 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| **TDD 支持** | ✅ RED-GREEN-REFACTOR | ❌ 无 |
| **系统调试** | ✅ 4 阶段根因调查 | ❌ 基础 |
| **代码审查** | ✅ 独立审查子代理 | ❌ 基础 |
| **计划模式** | ✅ plan + writing-plans | ❌ 无 |
| **子代理开发** | ✅ subagent-driven-development | ❌ 无 |
| **GitHub 集成** | ✅ 完整 PR/Issue 工作流 | 基础 |

### 4.5 自动化

| 特性 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| **Cron 定时任务** | ✅ 完整内置 | ✅ Cron Jobs |
| **Webhook** | ✅ | ✅ |
| **自然语言任务描述** | ✅ | ❌ |
| **多平台结果推送** | ✅ 飞书/微信/Telegram | 有限 |
| **代码执行** | ✅ 沙箱 Python RPC | ❌ |
| **Batch 处理** | ✅ 并行批处理 | ❌ 无 |

### 4.6 媒体能力

| 特性 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| **语音模式** | ✅ 完整语音对话 | ✅ Voice Wake and Talk |
| **Discord 语音** | ✅ | ❌ |
| **图片生成** | ✅ 8 种模型 | ❌ 无 |
| **Vision 多模态** | ✅ | 基础 |
| **浏览器自动化** | ✅ 多后端 | ✅ CDP 集成 |
| **YouTube 处理** | ✅ | ❌ 无 |
| **GIF 搜索** | ✅ | ❌ 无 |

### 4.7 扩展性

| 特性 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| **技能格式** | SKILL.md（agentskills.io 兼容） | ClawHub |
| **插件系统** | ✅ Plugin Architecture | ✅ Plugin SDK |
| **MCP 协议** | ✅ 完整支持 | ❌ 无 |
| **IDE 集成** | ✅ VS Code / Zed / JetBrains（ACP） | ❌ 无 |
| **API Server** | ✅ OpenAI 兼容 | ❌ 无 |
| **Provider 路由** | ✅ 多 Provider 智能路由 | ✅ Provider Failover |

---

## 5. 记忆与学习系统

### Hermes 的闭合学习循环

```
用户交互
   ↓
经验积累
   ↓
技能自创建 ──→ 使用中持续改进
   ↓
知识持久化
   ↓
下次会话 recall
   ↑
（循环）
```

**自改进机制的四个关键**：

- **技能自创建**（Skill Self-Improvement）：从每次交互中提炼可复用技能
- **使用中持续改进**（Nudges）：运行时主动优化已有技能
- **主动持久化**（nudges itself to persist knowledge）：不依赖用户触发
- **历史搜索**：FTS5 全文检索跨会话记忆

### OpenClaw 的记忆

OpenClaw 没有学习机制——消息历史存入基础 SQLite，每次会话重新开始，上下文不跨会话传递。

---

## 6. 技能系统对比

### Hermes 技能系统

```
~/.hermes/skills/
├── SKILL.md           # YAML frontmatter + Markdown
├── references/        # 参考文档
├── templates/         # 模板
└── scripts/           # 脚本

# agentskills.io 兼容标准
```

**技能自动加载**：智能匹配任务 → 自动加载相关技能 → 执行

**技能分类（50+）**：

| 分类 | 代表方向 |
|------|----------|
| software-development | TDD / 调试 / 计划 / 审查 |
| github | 完整 PR/Issue 工作流 |
| mlops | 训练 / 推理 / 评测 / 云端部署 |
| productivity | Notion / Google Workspace / PowerPoint |
| media | YouTube / 音乐 / GIF |
| autonomous-ai-agents | Claude Code / Codex / OpenCode |
| note-taking | Obsidian |
| research | arXiv / 博客监控 |
| social-media | X/Twitter |

### OpenClaw 技能系统

```
workspace/skills/       # 工作区技能
~/.agents/skills/       # 跨项目技能
~/.openclaw/skills/     # 托管/共享技能

# 来源：ClawHub 市场
```

### 技能对比

| 维度 | Hermes | OpenClaw |
|------|--------|----------|
| 格式标准化 | ✅ agentskills.io | 社区格式 |
| 自动加载 | ✅ 智能匹配 | 手动加载 |
| 自改进 | ✅ 使用中持续改进 | ❌ 无 |
| 技能数量 | 50+ | 有限 |
| 技能分类 | 15+ 分类 | 扁平 |

---

## 7. 生态与扩展性

### Hermes 生态

| 类别 | 内容 |
|------|------|
| **Provider** | Nous Portal / OpenRouter（200+）/ Anthropic / NVIDIA NIM / OpenAI / Google / Mistral / Bedrock / 任意 OpenAI 兼容端点 |
| **插件** | Memory Provider / Context Engine Plugin |
| **MCP** | 完整 MCP 协议支持 |
| **IDE** | VS Code / Zed / JetBrains（ACP） |
| **API** | OpenAI 兼容 HTTP endpoint |
| **RL** | 轨迹数据生成用于强化学习 |

### OpenClaw 生态

| 类别 | 内容 |
|------|------|
| **Provider** | OpenAI / Anthropic / Google / Ollama 本地 / 30+ |
| **插件** | Plugin SDK |
| **应用** | macOS App / iOS App / Android App |
| **渠道** | 20+ 消息平台 |
| **技能市场** | ClawHub |

### 扩展性对比

| 能力 | Hermes | OpenClaw |
|------|--------|----------|
| MCP 协议 | ✅ | ❌ |
| IDE 集成 | ✅ ACP | ❌ |
| API Server | ✅ OpenAI 兼容 | ❌ |
| 本地运行 | 可选 | **核心原则** |
| 强化学习 | ✅ RL Research Environments | ❌ |
| 技能市场 | ClawHub（兼容） | ✅ |

---

## 8. 适用场景分析

### 选 Hermes Agent 当：

- 需要**飞书/微信**集成
- 需要 **AI 自学习、自改进**能力
- 需要 **TDD、代码审查**等工程实践
- 需要**多子代理并行**处理
- 需要 **MCP 协议**扩展
- 需要 **RL 训练数据**生成
- 需要 **OpenAI 兼容 API**
- 需要 **Vision / 语音 / 图片生成**
- 需要**上下文压缩**节省 token
- 追求**活跃开发**和持续新功能

### 选 OpenClaw 当：

- 强需求**本地运行**（数据不离开机器）
- 需要 **20+ 消息平台**支持（含小众平台）
- 需要 **macOS / iOS / Android** 原生 App
- 熟悉 **TypeScript/JavaScript** 生态
- 只需简单的**消息 Bot** 功能
- 偏好**成熟稳定**的早期项目

---

## 9. 总结

### 核心定位

| | Hermes Agent | OpenClaw |
|--|-------------|----------|
| **Slogan** | "Self-improving AI agent" | "Local-first, multi-channel AI assistant" |
| **关键词** | 学习 · 自改进 · 模型无关 | 本地 · 多渠道 · 插件化 |
| **语言** | Python | TypeScript |
| **阶段** | 活跃开发（v0.10.0） | 成熟稳定 |

### 功能矩阵评分

| 类别 | Hermes | OpenClaw | 胜出 |
|------|--------|----------|------|
| 学习能力 | ★★★★★ | ★☆☆☆☆ | **Hermes** |
| 记忆系统 | ★★★★★ | ★★☆☆☆ | **Hermes** |
| 飞书/微信 | ✅ | ❌ | **Hermes** |
| 本地化 | ★★★☆☆ | ★★★★★ | **OpenClaw** |
| 平台覆盖 | ★★★★☆ | ★★★★★ | **OpenClaw** |
| 开发工具 | ★★★★★ | ★★☆☆☆ | **Hermes** |
| 自动化 | ★★★★☆ | ★★★☆☆ | **Hermes** |
| 媒体能力 | ★★★★★ | ★★★☆☆ | **Hermes** |
| 扩展性 | ★★★★★ | ★★★★☆ | **Hermes** |
| 原生 App | ❌ | ✅ | **OpenClaw** |

### 最终建议

> **需要飞书/微信，或需要 AI 自学习能力 → 选 Hermes Agent**  
> **强需本地运行、20+ 消息平台、原生移动 App → 选 OpenClaw**  
> **需要最强开发工具链（TDD / 调试 / 审查）→ 选 Hermes Agent**

---

*数据来源：zread.ai/NousResearch/hermes-agent · zread.ai/openclaw/openclaw*
