---
title: "Hermes Agent vs OpenClaw：一次彻底的架构进化"
date: 2026-04-22 18:00:00
tags:
  - AI Agent
  - Hermes
  - OpenClaw
  - 工具对比
categories:
  - 工具评测
---

OpenClaw（也叫 Clawdbot、Molbot）是许多人接触 AI Agent 的起点，而 Hermes Agent 正是它的官方继任者。本文从架构、记忆、技能、自动化、配置五个维度深入对比两者差异，并附完整迁移指南。

> 版本说明：Hermes v0.10.0 | OpenClaw (legacy) — 更新于 2026-04-22

<!-- more -->

---

## 1. 背景关系

### 血缘关系

Hermes Agent 与 OpenClaw 有着直接的继承关系。OpenClaw 是早期项目，Hermes 是其继任者，官方提供了一键迁移工具：

```bash
hermes claw migrate
```

### 命名对应

| OpenClaw | Hermes | 说明 |
|-----------|--------|------|
| `~/.openclaw/` | `~/.hermes/` | 主配置目录 |
| `clawdbot.json` | `config.yaml` | 主配置文件 |
| `workspace/SOUL.md` | `~/.hermes/SOUL.md` | 人格定义 |
| `workspace/MEMORY.md` | `~/.hermes/memories/MEMORY.md` | 长期记忆 |
| `workspace/AGENTS.md` | `AGENTS.md` (项目内) | Agent 指令 |
| `~/.agents/skills/` | `~/.hermes/skills/` | 技能目录 |

---

## 2. 核心架构对比

| 维度 | OpenClaw | Hermes Agent |
|------|----------|--------------|
| **编程语言** | Python | Python |
| **核心设计** | 单体架构 | 模块化架构 |
| **工具调用** | 基础工具集 | 50+ 内置工具，可扩展 |
| **子代理** | 有限支持 | `delegate_task` 多子代理并行 |
| **上下文压缩** | 简单 | 自动上下文压缩 + 缓存 |
| **前缀缓存** | 无 | Anthropic Prompt Caching 支持 |
| **检查点/回滚** | 无 | 内置 `/rollback` |
| **批量处理** | 无 | `batch_runner.py` 并行处理 |

### Hermes 独有特性

- **自动检查点** — 文件修改前自动快照
- **前缀缓存** — 减少 token 消耗
- **多子代理并行** — 最多 3 个并发
- **事件钩子系统** — 生命周期自定义
- **插件系统** — Tool interception、Guardrails
- **API Server** — OpenAI 兼容接口
- **IDE 集成 (ACP)** — VS Code / Zed / JetBrains
- **RL Training** — 轨迹数据生成

---

## 3. 功能特性对比

### 3.1 记忆系统

| 特性 | OpenClaw | Hermes |
|------|----------|--------|
| MEMORY.md | ✅ | ✅（增强） |
| USER.md | ✅ | ✅（增强） |
| 会话搜索 | 基础 | **FTS5 全文搜索** + LLM 摘要 |
| 外部记忆 Provider | 无 | **8 种**（Honcho / Mem0 / Holographic…） |
| 记忆容量管理 | 基础 | **严格字符限制** + 自动整合 |
| 安全扫描 | 无 | **Prompt Injection 扫描** |

### 3.2 技能系统

| 特性 | OpenClaw | Hermes |
|------|----------|--------|
| 技能格式 | 简单 | **SKILL.md 标准格式** |
| 技能市场 | 无 | **agentskills.io 兼容** |
| 技能自动加载 | 基础 | **智能匹配 + 自动加载** |
| 官方技能数量 | 少量 | **50+ 内置技能** |
| 技能分类 | 扁平 | **15+ 分类** |

### 3.3 自动化

| 特性 | OpenClaw | Hermes |
|------|----------|--------|
| 定时任务（Cron） | 外部 | **内置完整 Cron 系统** |
| 任务调度 | 无 | **自然语言描述** |
| 定时任务交付 | 有限 | **多平台推送**（飞书/微信/Telegram…） |
| 代码执行 | 基础 | **沙箱 Python RPC** |
| 工作流编排 | 无 | **子代理 + 事件钩子** |

### 3.4 媒体与 Web

| 特性 | OpenClaw | Hermes |
|------|----------|--------|
| 浏览器自动化 | 基础 | **多后端**（Browserbase / Browser Use / CDP / Chromium） |
| 语音模式 | TTS 基础 | **完整语音对话** |
| 语音通话（Discord） | 无 | ✅ |
| 图片生成 | 无 | **8 种模型**（FLUX / GPT-Image / Ideogram…） |
| Vision 多模态 | 基础 | **增强 + clipboard paste** |
| YouTube 处理 | 无 | ✅ |
| GIF 搜索 | 无 | ✅ |

### 3.5 开发工具

| 特性 | OpenClaw | Hermes |
|------|----------|--------|
| GitHub 集成 | 基础 | **完整 PR/Issue 工作流** |
| 代码审查 | 基础 | **独立审查子代理 + 自动修复** |
| TDD 支持 | 无 | **RED-GREEN-REFACTOR 流程** |
| 系统调试 | 无 | **4 阶段根因调查** |
| 计划模式 | 无 | **plan + writing-plans** |
| MCP 协议 | 无 | ✅ |

---

## 4. 记忆系统对比

### OpenClaw 记忆

```
workspace/MEMORY.md          # 每日记忆文件
workspace/USER.md            # 用户画像
workspace/memory/*.md        # 日记式记忆
```

### Hermes 记忆（三层架构）

```
┌─────────────────────────────────────────┐
│            SYSTEM PROMPT                 │
│  SOUL.md (人格) │ MEMORY.md │ USER.md   │
└─────────────────────────────────────────┘
                    ↓
         session_search (FTS5)
                    ↓
      外部 Provider (Honcho/Mem0/...)
```

### 关键改进

| 改进点 | OpenClaw | Hermes |
|--------|----------|--------|
| 容量限制 | 无硬性限制 | **严格字符限制防膨胀** |
| 去重机制 | 无 | **自动去重** |
| 安全扫描 | 无 | **Injection 扫描** |
| 记忆融合 | 简单追加 | **智能合并 + 整合** |
| 搜索能力 | 无 | **全文搜索 + LLM 摘要** |

---

## 5. 技能系统对比

### OpenClaw 技能

```
workspace/skills/           # 工作区技能
~/.agents/skills/           # 跨项目技能
```

### Hermes 技能结构

```
~/.hermes/skills/
├── SKILL.md                # 技能定义（YAML frontmatter + Markdown）
├── references/             # 参考文档
├── templates/              # 模板文件
└── scripts/                # 脚本
```

### 技能文件格式（SKILL.md）

```yaml
---
name: my-skill
description: 技能描述
version: 1.0.0
tags: [tag1, tag2]
related_skills: [other-skill]
---

# 技能名称

## 触发条件
何时使用此技能

## 使用步骤
1. 步骤一
2. 步骤二
```

### Hermes 技能分类（50+）

```
├── software-development/     # TDD、调试、计划、审查
├── github/                   # GitHub 全套
├── devops/                   # Webhook
├── mlops/                    # 训练、推理、评测
│   ├── models/               # CLIP / Whisper / Stable Diffusion
│   ├── training/             # Axolotl / TRL / Unsloth
│   ├── inference/            # vLLM / llama.cpp / GGUF
│   └── evaluation/           # lm-evaluation-harness / W&B
├── productivity/             # Notion / Google Workspace / PowerPoint
├── media/                    # YouTube / 音乐 / GIF
├── creative/                 # ASCII 艺术 / 文生图
├── gaming/                   # Minecraft / Pokemon
├── autonomous-ai-agents/     # Claude Code / Codex / OpenCode
├── note-taking/              # Obsidian
├── research/                 # arXiv / 博客监控
└── social-media/             # X/Twitter
```

---

## 6. 配置体系对比

### OpenClaw 配置

```json
// clawdbot.json
{
  "agents": {
    "defaults": {
      "model": "claude-3-5-sonnet",
      "timeoutSeconds": 300
    }
  },
  "channels": {},
  "mcp": {}
}
```

### Hermes 配置

```yaml
# config.yaml
agent:
  max_turns: 60
  verbose: off
  reasoning_effort: medium

memory:
  memory_enabled: true
  user_profile_enabled: true
  memory_char_limit: 2200
  user_char_limit: 1375

providers:
  primary: anthropic
  fallbacks:
    - openrouter
    - google

platforms:
  feishu:
    enabled: true
  weixin:
    enabled: true
```

### 配置迁移映射

| OpenClaw | Hermes | 备注 |
|----------|--------|------|
| `agents.defaults.model` | `model` | 直接映射 |
| `agents.defaults.timeoutSeconds` | `agent.max_turns` | 值除以 10 |
| `agents.defaults.sandbox.backend` | `terminal.backend` | |
| `session.reset.mode` | `session_reset.mode` | |
| `mcp.servers.*` | `mcp_servers.*` | 直接映射 |
| `browser.cdpUrl` | `browser.cdp_url` | |
| `approvals.exec.mode` | `approvals.mode` | 值映射 |

---

## 7. 消息平台支持

| 平台 | OpenClaw | Hermes |
|------|----------|--------|
| **飞书** | 有限 | ✅ 完整支持 |
| **微信** | 有限 | ✅ 完整支持 |
| Telegram | ✅ | ✅ |
| Discord | ✅ | ✅ |
| Slack | ✅ | ✅ |
| WhatsApp | ✅ | ✅ |
| Signal | ✅ | ✅ |
| Matrix | ✅ | ✅ |
| Mattermost | ✅ | ✅ |
| Home Assistant | 有限 | ✅ |
| 自建 Web | 无 | ✅ API Server |

### Hermes 独有接入

- **飞书 / 微信** 完整集成
- **Open WebUI / LobeChat / LibreChat** 支持
- **VS Code / Zed / JetBrains** 集成（ACP 协议）

---

## 8. 迁移指南

### 一键迁移

```bash
# 预览迁移内容
hermes claw migrate --dry-run

# 完整迁移（包含密钥）
hermes claw migrate --preset full --yes

# 仅迁移用户数据（不含密钥）
hermes claw migrate --preset user-data
```

### 迁移内容清单

| 内容 | 状态 |
|------|------|
| SOUL.md | ✅ 自动迁移 |
| MEMORY.md / USER.md | ✅ 自动迁移 + 合并去重 |
| 技能 | ✅ 迁移到 `skills/openclaw-imports/` |
| 模型配置 | ✅ |
| MCP 服务器 | ✅ |
| TTS 设置 | ✅ |
| 消息平台 Token | ✅（需要 `--preset full`） |
| Cron 任务 | ⚠️ 需手动重建 |
| 插件 | ⚠️ 需手动配置 |
| HEARTBEAT / BOOTSTRAP | ⚠️ 存档后手动处理 |

### 迁移后检查

```bash
hermes status              # 检查 API 认证
hermes memory status       # 查看记忆状态
hermes skills list         # 确认技能加载
systemctl --user restart hermes-gateway   # 重启网关
```

---

## 9. 总结

### 何时选 Hermes

如果你有以下任意一项需求，Hermes 都是更好的选择：

- 需要**飞书/微信**原生集成
- 需要**多子代理**并行处理复杂任务
- 需要 **TDD / 系统调试 / 代码审查**等工程实践
- 需要**定时任务 + 多平台推送**
- 需要**图片生成 / 语音对话**
- 需要 **MCP 协议**支持
- 需要 **RL 训练数据**生成
- 想要持续更新和新功能

### 核心差异总结

| 维度 | OpenClaw | Hermes |
|------|----------|--------|
| **定位** | 基础 Agent | **全能助手平台** |
| **技能生态** | 简单 | **50+ 官方技能** |
| **自动化** | 基础 | **完整 Cron + Hooks** |
| **记忆** | 文件式 | **三层架构 + Provider** |
| **开发工具** | 基础 | **TDD / 调试 / 审查 / 计划** |
| **媒体** | 有限 | **语音 / 图像 / 视频** |
| **扩展性** | 有限 | **插件 + MCP** |
| **活跃度** | 维护中 | **活跃开发** |

### 从 OpenClaw 迁移的理由

1. **飞书/微信原生支持** — OpenClaw 有限，Hermes 完整集成
2. **活跃开发** — 新功能持续更新
3. **更完善的工程实践** — TDD、调试、代码审查内置
4. **更强大的记忆** — 三层架构 + 外部 Provider
5. **多子代理** — 复杂任务并行处理
6. **完整自动化** — Cron + Hooks + 事件驱动

---

*数据来源：Hermes Agent 官方文档 v0.10.0*
