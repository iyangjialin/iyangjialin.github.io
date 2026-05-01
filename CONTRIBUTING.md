# 贡献指南

感谢您对 TokenMind Studio 的关注！本指南将帮助您了解如何为项目做出贡献。

---

## 分支策略

我们采用 GitFlow 简化版分支策略：

```
main (保护分支，仅通过 PR 合并)
├── develop (开发分支)
│   ├── feature/xxx (功能分支)
│   └── fix/xxx (修复分支)
└── hotfix/xxx (紧急热修复)
```

### 分支命名规范

| 分支类型 | 命名格式 | 示例 |
|---------|---------|------|
| 功能分支 | `feature/功能描述` | `feature/user-auth` |
| 修复分支 | `fix/问题描述` | `fix/login-bug` |
| 热修复分支 | `hotfix/问题描述` | `hotfix/critical-error` |

---

## Commit 规范

### 格式要求

```
<type>(<scope>): <描述>

[可选的详细说明]

[可选的关闭Issue信息]
```

### Type 类型

| Type | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat(search): 添加全文搜索功能` |
| `fix` | Bug修复 | `fix(theme): 修复深色模式闪烁问题` |
| `docs` | 文档变更 | `docs: 更新 README` |
| `style` | 代码格式调整 | `style(code): 格式化代码风格` |
| `refactor` | 重构 | `refactor: 优化图片加载逻辑` |
| `perf` | 性能优化 | `perf: 提升首屏加载速度` |
| `test` | 测试相关 | `test: 添加单元测试` |
| `chore` | 构建/工具变更 | `chore: 升级依赖版本` |

### 正确示例

```
feat(post): 添加文章评论功能

- 支持 Markdown 评论格式
- 添加评论通知功能
- 集成防垃圾评论机制

Closes #123
```

### 错误示例

```
- "fixed stuff"
- "updates"
- "bug fix"
- "asdfghjkl"
```

---

## Pull Request 流程

### 创建 PR 前的准备

1. **同步最新代码**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature
   ```

2. **确保代码质量**
   - [ ] 代码遵循 ESLint 规范
   - [ ] 新功能已添加测试
   - [ ] 运行 `npm test` 确保测试通过

3. **提交代码**
   ```bash
   git add .
   git commit -m "feat(scope): your feature description"
   git push origin feature/your-feature
   ```

### PR 描述要求

创建 PR 时，请使用 PR 模板并填写以下信息：

- **描述**：简要说明这次改动的目的和内容
- **改动类型**：选择对应的类型标签
- **测试**：说明如何测试这些改动
- **截图**：如有 UI 改动，请添加截图

### PR 检查清单

- [ ] PR 大小尽量 < 400 行改动
- [ ] 遵循 Commit 规范
- [ ] 代码风格一致
- [ ] 有必要的测试
- [ ] 文档已更新
- [ ] 无敏感信息泄露
- [ ] 至少 1 人 approval

---

## 文章发布规范

### 发布新文章

1. 创建文章文件：`source/_posts/YYYY-MM-DD-article-title.md`
2. 使用正确的 Front Matter：

   ```yaml
   ---
   title: "文章标题"
   date: YYYY-MM-DD HH:MM:SS
   tags:
     - 标签1
     - 标签2
   categories:
     - 分类1
     - 分类2
   ---
   ```

3. 如需自定义 URL，使用 `slug` 字段：

   ```yaml
   slug: custom-url-slug
   ```

4. 本地测试后使用 `npm run deploy` 发布

### 文章命名规范

- 文件名格式：`YYYY-MM-DD-title.md`
- 包含完整日期，方便归档
- 标题使用简洁的英文 slug

---

## 代码规范

### JavaScript/TypeScript

- 遵循项目现有的 ESLint 配置
- 使用 Prettier 格式化代码
- 添加必要的 JSDoc 注释
- 导出函数时注明参数和返回值类型

### Markdown

- 使用中文标点符号
- 标题层级清晰（避免跳级）
- 代码块指定语言类型
- 图片使用相对路径或图床链接

---

## 安全注意事项

### 不要提交的内容

- `.env` 和其他包含密钥的文件
- `node_modules/` 目录
- 构建产物（`public/`、`dist/`）
- IDE 配置文件（个人设置）
- 日志文件和调试信息

### 敏感信息处理

所有敏感信息（API 密钥、数据库密码等）必须：

1. 存储在 `.env` 文件中
2. `.env` 文件已添加到 `.gitignore`
3. 在 GitHub Secrets 中配置生产环境密钥

---

## 获取帮助

如果您在贡献过程中遇到问题：

1. 查看 [Wiki 文档](https://github.com/iyangjialin/iyangjialin.github.io/wiki)
2. 提交 [Issue](https://github.com/iyangjialin/iyangjialin.github.io/issues)
3. 联系项目维护者

---

再次感谢您的贡献！让我们一起让 TokenMind Studio 变得更好 🎉
