<div align="center" markdown="1">

# TypeScript 项目模板

[![npm version](https://img.shields.io/npm/v/ts-template.svg)](https://www.npmjs.com/package/ts-template)
[![node](https://img.shields.io/badge/-Node.js_18%7C20%7C22-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/-TypeScript_5.6+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?logo=prettier&logoColor=black)](https://prettier.io/)
[![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![tests](https://github.com/Mai0313/ts_template/actions/workflows/test.yml/badge.svg)](https://github.com/Mai0313/ts_template/actions/workflows/test.yml)
[![code-quality](https://github.com/Mai0313/ts_template/actions/workflows/code-quality-check.yml/badge.svg)](https://github.com/Mai0313/ts_template/actions/workflows/code-quality-check.yml)
[![license](https://img.shields.io/badge/License-MIT-green.svg?labelColor=gray)](https://github.com/Mai0313/ts_template/blob/main/LICENSE)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Mai0313/ts_template/pulls)

</div>

🚀 帮助 TypeScript 开发者「快速建立新项目」的模板。内置现代化工具链、测试基础设施、Docker 与完整 CI/CD 工作流程。

点击 [使用此模板](https://github.com/Mai0313/ts_template/generate) 后即可开始。

其他语言: [English](README.md) | [繁體中文](README.zh-TW.md) | [简体中文](README.zh-CN.md)

## ✨ 重点特色

- 现代 `src/` 布局 + TypeScript 严格模式
- npm 快速依赖管理
- 代码质量套件：ESLint、Prettier、TypeScript
- 严格类型检查
- Vitest 测试框架 + 覆盖率报告（门槛 80%）
- TypeDoc 自动生成 API 文档
- 使用 Commander.js 与 Zod 验证的 CLI 框架
- Docker 多阶段构建（Node.js Alpine）
- GitHub Actions：测试（Node 18/20/22）、质量检查、文档部署、包发布、Docker 镜像推送至 GHCR
- docker-compose 内置服务（Redis/PostgreSQL/MongoDB/MySQL）
- Makefile 提供常用开发命令
- 示例 CLI 展示最佳实践

## 🚀 快速开始

需求：

- Node.js 18 或更高版本
- npm 9 或更高版本

本机安装：

```bash
npm install              # 安装依赖
npm run build            # 构建项目
npm test                 # 执行测试
npm run check            # 执行所有检查（类型 + 格式 + lint）
```

执行示例 CLI：

```bash
npm run cli greet
# 或构建后：
node dist/cli.js greet
```

作为模板使用（推荐）：

1. 点击「使用此模板」建立新仓库
2. 全局替换名称：

```bash
# 包名称
find . -type f \( -name "*.ts" -o -name "*.json" -o -name "*.md" \) -exec sed -i 's/ts_template/your-package-name/g' {} +

# 项目显示标题
find . -type f \( -name "*.ts" -o -name "*.json" -o -name "*.md" \) -exec sed -i 's/TypeScript Template/Your Project Title/g' {} +
```

3. 更新 `package.json` 中的元数据

## 🧰 命令一览

```bash
# 开发
make help               # 显示 Makefile 命令列表
make clean              # 清理缓存、产物与产生的文档
make format             # 使用 Prettier 与 ESLint 格式化代码
make format-check       # 检查格式化但不修复
make build              # 构建项目
make dev                # 开发模式执行
make test               # 执行测试
make test-coverage      # 执行测试与覆盖率报告
make check              # 执行所有检查（类型 + 格式 + lint）

# Git 子模块（如有使用）
make submodule-init     # 初始化与更新所有子模块
make submodule-update   # 更新所有子模块至远端

# 文档
make gen-docs           # 生成 API 文档
make serve-docs         # 本地提供文档服务
```

## 📚 文档系统

- 使用 TypeDoc 生成文档
- 本机生成与预览：

```bash
npm run docs:generate   # 生成文档
npm run docs:serve      # 于 http://localhost:3000 提供服务
```

## 🐳 Docker 与本机服务

`docker-compose.yaml` 内提供本机开发常见服务：`redis`、`postgresql`、`mongodb`、`mysql`，以及演示 `app` 服务（执行 CLI）。

建立 `.env` 设置连接参数（默认如下）：

```bash
REDIS_PORT=6379
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432
MONGO_PORT=27017
MONGO_USER=admin
MONGO_PASSWORD=admin
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=mysql
MYSQL_USER=mysql
MYSQL_PASSWORD=mysql
MYSQL_PORT=3306
```

启动服务：

```bash
docker compose up -d redis postgresql mongodb mysql

# 或启动演示 app
docker compose up -d app
```

## 📦 打包与发布

构建项目：

```bash
npm run build
```

发布到 npm（需要适当的认证）：

```bash
npm publish
```

CI 会在建立 `v*` 标签时自动打包并上传到 GitHub Release。若要自动发布到 npm，请在 repository 设置中新增 `NPM_TOKEN` secret。

### 在本机与 npm 执行你的 CLI

- 本机（源码仓）：

```bash
npm run cli
# 或
node dist/cli.js
```

- 发布到 npm 后，通过 `npx`：

```bash
npx ts-template greet
```

## 🔁 CI/CD 工作流程总览

所有流程位于 `.github/workflows/`，以下为触发时机与用途：

- **Tests**（`test.yml`）
  - 触发：对 `main`、`release/*` 的 PR
  - 执行 Vitest（Node 18/20/22）并产生覆盖率报告
  - 在 PR 上留下覆盖率摘要

- **Code Quality**（`code-quality-check.yml`）
  - 触发：PR
  - 执行 TypeScript 类型检查、ESLint 与 Prettier

- **Docs Deploy**（`deploy.yml`）
  - 触发：推送到 `main` 与 `v*` 标签
  - 构建 TypeDoc 网站并发布到 GitHub Pages
  - 需在 GitHub 启用 Pages

- **Build and Release**（`build_release.yml`）
  - 触发：`v*` 标签推送或手动触发
  - 使用 pkg 构建多平台可执行文件
  - 发布包到 npm（需设置 `NPM_TOKEN` secret）
  - 上传产物至 GitHub Release

- **Publish Docker Image**（`build_image.yml`）
  - 触发：推送到 `main` 与 `v*` 标签
  - 构建并推送 Docker 镜像至 GHCR

## 🧩 示例 CLI

项目展示 CLI 应用程序功能：

- 使用 Commander.js 的多个子命令
- 使用 Zod 进行 schema 验证
- 结构化日志记录
- 响应格式化（JSON 与文本输出）

```bash
npm run cli greet "World" --format json
npm run cli example --verbose
```

## 🤝 贡献

- 欢迎 Issue/PR
- 请遵循代码风格（ESLint、Prettier、TypeScript）
- PR 标题遵循 Conventional Commits

## 📄 授权

MIT — 详见 `LICENSE`。
