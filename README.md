# TokenMind Studio

> AI 时代的数字智慧空间

基于 Hexo 构建的个人技术博客，专注于分享技术见解和经验。

## 技术栈

- **Hexo** 6.3.0 - 静态博客生成器
- **Node.js** - 运行环境
- **GitHub Pages** - 托管平台
- **Landscape** - 博客主题

## 快速开始

### 环境要求

- Node.js (推荐 v14 或更高版本)
- npm 或 yarn

### 安装依赖

```bash
cd blog
npm install
```

## 使用方法

### 本地预览

启动本地开发服务器，实时预览博客：

```bash
npm run server
```

访问 http://localhost:4000 查看博客。

### 生成静态文件

将 Markdown 文章编译为静态 HTML：

```bash
npm run build
```

生成的文件位于 `blog/public/` 目录。

### 部署到 GitHub Pages

一键部署到 GitHub Pages：

```bash
npm run deploy
```

### 清理生成文件

清理之前生成的静态文件：

```bash
npm run clean
```

## 写作指南

### 创建新文章

在 `blog/source/_posts/` 目录下创建 Markdown 文件，或使用 Hexo 命令：

```bash
cd blog
npx hexo new "文章标题"
```

### 文章格式

每篇文章需要包含 Front Matter：

```markdown
---
title: 文章标题
date: 2026-03-26 10:00:00
tags: [标签1, 标签2]
categories: 分类名称
---

文章正文内容...
```

## 项目结构

```
blog/
├── source/          # 博客源文件
│   └── _posts/      # 文章目录
├── themes/          # 主题文件
│   └── landscape/   # Landscape 主题
├── scaffolds/       # 文章模板
├── _config.yml      # Hexo 配置文件
└── package.json     # 项目依赖
```

## 在线访问

博客地址：https://iyangjialin.github.io

## 许可证

ISC License

---

**作者**: iyangjialin
