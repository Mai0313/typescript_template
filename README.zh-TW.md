<center>

# TypeScript 專案模板

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

</center>

🚀 幫助 TypeScript 開發者「快速建立新專案」的模板。內建現代化工具鏈、測試基礎設施、Docker 與完整 CI/CD 工作流程。

點擊 [使用此模板](https://github.com/Mai0313/ts_template/generate) 後即可開始。

其他語言: [English](README.md) | [繁體中文](README.zh-TW.md) | [简体中文](README.zh-CN.md)

## ✨ 重點特色

- 現代 `src/` 佈局 + TypeScript 嚴格模式
- npm 快速依賴管理
- 程式碼品質套件：ESLint、Prettier、TypeScript
- 嚴格型別檢查
- Vitest 測試框架 + 覆蓋率報告（門檻 80%）
- TypeDoc 自動生成 API 文件
- 使用 Commander.js 與 Zod 驗證的 CLI 框架
- Docker 多階段建置（Node.js Alpine）
- GitHub Actions：測試（Node 18/20/22）、品質檢查、文件部署、套件發布、Docker 映像推送至 GHCR
- docker-compose 內建服務（Redis/PostgreSQL/MongoDB/MySQL）
- Makefile 提供常用開發指令
- 範例 CLI 展示最佳實踐

## 🚀 快速開始

需求：

- Node.js 18 或更高版本
- npm 9 或更高版本

本機安裝：

```bash
npm install              # 安裝依賴
npm run build            # 建置專案
npm test                 # 執行測試
npm run check            # 執行所有檢查（型別 + 格式 + lint）
```

執行範例 CLI：

```bash
npm run cli greet
# 或建置後：
node dist/cli.js greet
```

作為模板使用（推薦）：

1. 點擊「使用此模板」建立新倉庫
2. 全域替換名稱：

```bash
# 套件名稱
find . -type f \( -name "*.ts" -o -name "*.json" -o -name "*.md" \) -exec sed -i 's/ts_template/your-package-name/g' {} +

# 專案顯示標題
find . -type f \( -name "*.ts" -o -name "*.json" -o -name "*.md" \) -exec sed -i 's/TypeScript Template/Your Project Title/g' {} +
```

3. 更新 `package.json` 中的中繼資料

## 🧰 指令一覽

```bash
# 開發
make help               # 顯示 Makefile 指令列表
make clean              # 清理快取、產物與產生的文件
make format             # 使用 Prettier 與 ESLint 格式化程式碼
make format-check       # 檢查格式化但不修復
make build              # 建置專案
make dev                # 開發模式執行
make test               # 執行測試
make test-coverage      # 執行測試與覆蓋率報告
make check              # 執行所有檢查（型別 + 格式 + lint）

# Git 子模組（如有使用）
make submodule-init     # 初始化與更新所有子模組
make submodule-update   # 更新所有子模組至遠端

# 文件
make gen-docs           # 生成 API 文件
make serve-docs         # 本地提供文件服務
```

## 📚 文件系統

- 使用 TypeDoc 生成文件
- 本機生成與預覽：

```bash
npm run docs:generate   # 生成文件
npm run docs:serve      # 於 http://localhost:3000 提供服務
```

## 🐳 Docker 與本機服務

`docker-compose.yaml` 內提供本機開發常見服務：`redis`、`postgresql`、`mongodb`、`mysql`，以及示範 `app` 服務（執行 CLI）。

建立 `.env` 設定連線參數（預設如下）：

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

啟動服務：

```bash
docker compose up -d redis postgresql mongodb mysql

# 或啟動示範 app
docker compose up -d app
```

## 📦 打包與發佈

建置專案：

```bash
npm run build
```

發佈到 npm（需要適當的認證）：

```bash
npm publish
```

CI 會在建立 `v*` 標籤時自動打包並上傳到 GitHub Release。若要自動發布到 npm，請在 repository 設定中新增 `NPM_TOKEN` secret。

### 在本機與 npm 執行你的 CLI

- 本機（來源碼倉）：

```bash
npm run cli
# 或
node dist/cli.js
```

- 發佈到 npm 後，透過 `npx`：

```bash
npx ts-template greet
```

## 🔁 CI/CD 工作流程總覽

所有流程位於 `.github/workflows/`，以下為觸發時機與用途：

- **Tests**（`test.yml`）
  - 觸發：對 `main`、`release/*` 的 PR
  - 執行 Vitest（Node 18/20/22）並產生覆蓋率報告
  - 在 PR 上留下覆蓋率摘要

- **Code Quality**（`code-quality-check.yml`）
  - 觸發：PR
  - 執行 TypeScript 型別檢查、ESLint 與 Prettier

- **Docs Deploy**（`deploy.yml`）
  - 觸發：推送到 `main` 與 `v*` 標籤
  - 建置 TypeDoc 網站並發布到 GitHub Pages
  - 需在 GitHub 啟用 Pages

- **Build and Release**（`build_release.yml`）
  - 觸發：`v*` 標籤推送或手動觸發
  - 使用 pkg 建置多平台可執行檔
  - 發布套件到 npm（需設定 `NPM_TOKEN` secret）
  - 上傳產物至 GitHub Release

- **Publish Docker Image**（`build_image.yml`）
  - 觸發：推送到 `main` 與 `v*` 標籤
  - 建置並推送 Docker 映像至 GHCR

## 🧩 範例 CLI

專案展示 CLI 應用程式功能：

- 使用 Commander.js 的多個子命令
- 使用 Zod 進行 schema 驗證
- 結構化日誌記錄
- 回應格式化（JSON 與文字輸出）

```bash
npm run cli greet "World" --format json
npm run cli example --verbose
```

## 🤝 貢獻

- 歡迎 Issue/PR
- 請遵循程式風格（ESLint、Prettier、TypeScript）
- PR 標題遵循 Conventional Commits

## 📄 授權

MIT — 詳見 `LICENSE`。
