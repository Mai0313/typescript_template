<center>

# TypeScript Project Template

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

🚀 A production-ready TypeScript project template to help developers bootstrap new Node.js projects fast. It includes modern tooling, testing infrastructure, Docker, and a complete CI/CD suite.

Click [Use this template](https://github.com/Mai0313/ts_template/generate) to start a new repository from this scaffold.

Other Languages: [English](README.md) | [繁體中文](README.zh-TW.md) | [简体中文](README.zh-CN.md)

## ✨ Highlights

- Modern `src/` layout with TypeScript strict mode
- Fast dependency management via npm
- Code quality suite: ESLint, Prettier, TypeScript
- Strict typing with comprehensive type checking
- Vitest for testing with coverage reporting (80% threshold)
- TypeDoc for automatic API documentation generation
- CLI framework using Commander.js with Zod validation
- Docker multi-stage builds with Node.js Alpine
- GitHub Actions: tests (Node 18/20/22), quality checks, docs deployment, package publishing, Docker image publishing to GHCR
- Built-in services via docker-compose (Redis/PostgreSQL/MongoDB/MySQL)
- Makefile for common development tasks
- Example CLI with sub-commands demonstrating best practices

## 🚀 Quick Start

Prerequisites:

- Node.js 18 or higher
- npm 9 or higher

Local setup:

```bash
npm install              # Install dependencies
npm run build            # Build the project
npm test                 # Run tests
npm run check            # Run all checks (type-check + format + lint)
```

Run the example CLI:

```bash
npm run cli greet
# or after building:
node dist/cli.js greet
```

Use as a template (recommended for new projects):

1. Click **Use this template** to create your repository
2. Replace names everywhere:

```bash
# Replace package name
find . -type f \( -name "*.ts" -o -name "*.json" -o -name "*.md" \) -exec sed -i 's/ts_template/your-package-name/g' {} +

# Replace display title
find . -type f \( -name "*.ts" -o -name "*.json" -o -name "*.md" \) -exec sed -i 's/TypeScript Template/Your Project Title/g' {} +
```

3. Update metadata in `package.json`

## 🧰 Commands Reference

```bash
# Development
make help               # List available make targets
make clean              # Clean caches, artifacts and generated docs
make format             # Format code with Prettier and ESLint
make format-check       # Check formatting without fixing
make build              # Build the project
make dev                # Run in development mode
make test               # Run tests
make test-coverage      # Run tests with coverage
make check              # Run all checks (type + format + lint)

# Git submodules (if you use them)
make submodule-init     # Init and update all submodules
make submodule-update   # Update all submodules to remote

# Documentation
make gen-docs           # Generate API documentation
make serve-docs         # Serve documentation locally
```

## 📚 Documentation

- Documentation is generated using TypeDoc
- Generate and view locally:

```bash
npm run docs:generate   # Generate docs
npm run docs:serve      # Serve at http://localhost:3000
```

## 🐳 Docker and Local Services

`docker-compose.yaml` includes optional services for local development: `redis`, `postgresql`, `mongodb`, `mysql`, and an example `app` service that runs the CLI.

Create a `.env` file to configure ports and credentials (defaults shown):

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

Run services:

```bash
docker compose up -d redis postgresql mongodb mysql

# Or run the example app container
docker compose up -d app
```

## 📦 Packaging and Distribution

Build the project:

```bash
npm run build
```

Publish to npm (requires proper authentication):

```bash
npm publish
```

CI builds automatically run on tags matching `v*`, building the package and uploading to GitHub Release. To automate releases to npm, add the `NPM_TOKEN` secret in your repository settings.

### Run your CLI locally and from npm

- Local (from this repo):

```bash
npm run cli
# or
node dist/cli.js
```

- From npm with `npx` after publishing:

```bash
npx ts-template greet
```

## 🔁 CI/CD Actions Overview

All workflows live in `.github/workflows/`. This section explains what each action does and when it runs.

- **Tests** (`test.yml`)
  - Trigger: Pull requests to `main` or `release/*`
  - Runs Vitest on Node.js 18/20/22 with coverage reporting
  - Comments coverage summary on PRs

- **Code Quality Check** (`code-quality-check.yml`)
  - Trigger: Pull requests
  - Runs TypeScript type checking, ESLint, and Prettier

- **Docs Deploy** (`deploy.yml`)
  - Trigger: Push to `main` and tags `v*`
  - Builds TypeDoc site and publishes to GitHub Pages
  - Setup: Enable GitHub Pages in repository settings

- **Build and Release** (`build_release.yml`)
  - Trigger: Tags `v*` push or manual workflow dispatch
  - Builds multi-platform executables using pkg
  - Publishes package to npm (requires `NPM_TOKEN` secret)
  - Uploads artifacts to GitHub Release

- **Publish Docker Image** (`build_image.yml`)
  - Trigger: Push to `main` and tags `v*`
  - Builds and pushes Docker image to GHCR

## 🧩 Example CLI

The project demonstrates a CLI application with:

- Multiple sub-commands using Commander.js
- Schema validation using Zod
- Structured logging with different levels
- Response formatting (JSON and text output)

```bash
npm run cli greet "World" --format json
npm run cli example --verbose
```

## 🤝 Contributing

- Open issues/PRs
- Follow the coding style (ESLint, Prettier, TypeScript)
- Use Conventional Commit messages

## 📄 License

MIT — see `LICENSE`.
