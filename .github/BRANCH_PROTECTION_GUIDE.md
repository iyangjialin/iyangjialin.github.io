# GitHub 分支保护规则设置指南

本指南将帮助您在 GitHub 仓库中配置分支保护规则，确保代码质量和协作规范。

---

## 设置步骤

### 1. 访问仓库设置

1. 进入您的 GitHub 仓库：`https://github.com/iyangjialin/iyangjialin.github.io`
2. 点击 **Settings**（设置）标签
3. 在左侧菜单中选择 **Branches**（分支）

### 2. 添加分支保护规则

点击 **Add rule**（添加规则）按钮

#### 基本配置

| 配置项 | 推荐值 | 说明 |
|-------|-------|------|
| **Branch name pattern** | `main` | 要保护的分支名称 |
| **Require pull request reviews before merging** | ✅ 启用 | 必须有 PR review 才能合并 |
| **Required approving reviews** | `1` | 最少需要 1 人 approval |
| **Dismiss stale reviews** | ✅ 启用 | 新提交自动 dismissed 老 review |

#### 推荐开启的选项

```
✅ Require pull request reviews before merging
    ✅ Require approvals: 1
    ✅ Dismiss stale reviews
    ✅ Require review from Code Owners

✅ Require status checks to pass before merging
    ✅ Require branches to be up to date before merging

✅ Require signed commits

✅ Do not allow bypassing the above settings

❌ Allow force pushes (建议禁用)
❌ Allow deletions (建议禁用)
```

### 3. 状态检查（可选）

如果您配置了 GitHub Actions，可以添加状态检查：

```
✅ Require status checks to pass before merging
    勾选需要的检查项，例如：
    ✅ lint
    ✅ test
    ✅ build
```

---

## 具体设置页面示例

```
Branch protection rules
│
├── Add rule
│   └── Branch name pattern: main
│
├── ✓ Require a pull request before merging
│   ├── ✓ Require approvals: 1
│   ├── ✓ Dismiss stale reviews
│   ├── ✓ Require review from Code Owners
│   └── ✓ Require latest branch to be up to date
│
├── ✓ Require status checks to pass before merging
│   ├── ✓ build
│   └── (其他 CI 检查...)
│
├── ✓ Require signed commits
│
├── ✓ Include administrators
│
└── Do not allow bypassing the above settings
```

---

## 图文教程

### 第一步：进入分支设置
```
Repository → Settings → Branches → Add rule
```

### 第二步：配置保护规则
1. 输入分支名称模式：`main`
2. 勾选 **Require pull request reviews before merging**
3. 设置 Required approvals 为 `1`
4. 勾选 **Require review from Code Owners**

### 第三步：保存规则
点击 **Create** 或 **Save changes**

---

## 常见问题

### Q: 管理员也需要通过 PR 吗？
A: 勾选 "Include administrators" 后，管理员也需要通过 PR 才能合并代码。这是推荐的安全做法。

### Q: 如何临时绕过保护规则？
A: 不推荐绕过。如果确实需要，可以：
1. 临时修改保护规则
2. 执行紧急操作
3. 立即恢复保护规则
4. 在 commit message 中说明原因

### Q: 如何测试保护规则是否生效？
A: 尝试直接 push 到 main 分支：
```bash
git checkout main
git commit -m "test"
git push origin main
```
应该会收到错误提示。

---

## GitHub CLI 设置（可选）

如果您使用 GitHub CLI，也可以通过命令行配置：

```bash
# 查看现有规则
gh api repos/iyangjialin/iyangjialin.github.io/branches/main/protection

# 配置保护规则
gh api --method PUT repos/iyangjialin/iyangjialin.github.io/branches/main/protection \
  -f required_status_checks='{"strict":true,"contexts":["build"]}' \
  -f enforce_admins=true \
  -f required_pull_request_reviews='{"required_approving_review_count":1}'
```

---

## 验证设置

设置完成后，可以验证保护规则是否生效：

1. 创建一个新分支并修改代码
2. 创建 PR 到 main
3. 尝试不通过 review 直接合并（应该被阻止）
4. 添加 approval 后尝试合并（应该可以）

---

如有问题，请参考 GitHub 官方文档：
https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches
