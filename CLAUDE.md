# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript project template designed to bootstrap production-ready Node.js projects quickly. The codebase follows a modern `src/` layout with comprehensive tooling for development, testing, documentation, and deployment.

**Package name**: `ts_template`
**Node.js support**: 18, 20, 22
**Package manager**: `npm`
**Documentation**: TypeDoc with markdown plugin

## Common Development Commands

### Environment Setup

```bash
npm install              # Install dependencies
npm ci                   # Clean install (for CI/CD)
```

### Running Tests

```bash
make test                # Run vitest
npm test                 # Direct vitest invocation
npm run test:watch       # Watch mode
npm run test:ui          # UI mode
npm run test:coverage    # Run with coverage
```

### Code Quality

```bash
make check               # Run all checks (type-check + format + lint)
npm run type-check       # TypeScript type checking
npm run lint             # ESLint with auto-fix
npm run lint:nofix       # ESLint without fixing
npm run format           # Format with Prettier
npm run format:check     # Check formatting only
```

### Documentation

```bash
make gen-docs            # Generate API docs
npm run docs:generate    # Generate TypeDoc documentation
npm run docs:serve       # Serve docs at http://localhost:3000
```

### CLI Entry Points

The project defines two CLI entry points (both execute the same function):

```bash
npm run cli              # Development mode with tsx
npm run dev              # Watch mode
node dist/cli.js         # After building
```

### Building and Publishing

```bash
npm run build            # Build TypeScript to dist/
npm publish              # Publish to npm (requires authentication)
```

### Running from npm

After publishing, the CLI can be run without installation:

```bash
npx ts-template greet World
```

### Maintenance

```bash
make clean               # Remove caches, artifacts, generated docs
```

## Project Architecture

### Source Layout

- **`src/`**: Main package code
  - `cli.ts`: CLI entry point with Commander.js and example commands
  - `index.ts`: Public API exports
  - `types/`: TypeScript type definitions and Zod schemas
  - `utils/`: Utility functions (logger, helpers)

### Testing Infrastructure

- **Test directory**: `tests/`
- **Test discovery**: Files matching `*.test.ts` or `*.spec.ts`
- **Coverage**: Minimum 80% required (lines, functions, branches, statements)
- **Reports**: Generated in `coverage/` (HTML, JSON, LCOV)
- **Framework**: Vitest with v8 coverage provider

### Documentation Generation

- **Tool**: TypeDoc with markdown plugin
- **Output**: `docs/api/`
- **Configuration**: `typedoc.json`
- **Features**: 
  - Automatic API documentation from TypeScript code
  - Markdown output for GitHub Pages compatibility
  - Category and group navigation
  - Version tracking

### Docker and Services

- **Dockerfile**: Multi-stage build with Node.js Alpine
- **docker-compose.yaml**: Includes optional services:
  - `redis` (port 6379)
  - `postgresql` (port 5432)
  - `mongodb` (port 27017)
  - `mysql` (port 3306)
  - `app`: Example service running the CLI
- **Configuration**: Via `.env` file (create from `.env.example`)

### CI/CD Workflows

All workflows are in `.github/workflows/`:

- **test.yml**: Runs Vitest on Node.js 18/20/22 for PRs to main/release/* (ignores markdown files)
- **code-quality-check.yml**: Runs TypeScript type checking, ESLint, and Prettier on PRs
- **deploy.yml**: Builds and deploys TypeDoc to GitHub Pages on push to main and tags `v*`
- **build_release.yml**: Builds executables with pkg and publishes to npm on tags `v*`
- **build_image.yml**: Builds and pushes Docker image to GHCR on main and tags `v*`
- **release_drafter.yml**: Maintains draft releases from Conventional Commits
- **auto_labeler.yml**: Auto-applies PR labels based on `.github/labeler.yml`
- **code_scan.yml**: Runs gitleaks for secret detection
- **semantic-pull-request.yml**: Enforces Conventional Commit PR titles

### Code Style and Linting

- **Linter**: ESLint 9 with flat config
- **Formatter**: Prettier
- **Line length**: 99 characters
- **Naming**: camelCase (functions/vars), PascalCase (classes/types), UPPER_CASE (constants)
- **Type hints**: Required on all public functions
- **Comments**: JSDoc style for public APIs
- **Per-file ignores**:
  - `**/*.test.ts`, `**/*.spec.ts`: Relaxed rules for test files
  - `**/*.config.js`, `**/*.config.ts`: Ignored by ESLint

### Dependency Management

```bash
npm install <package>              # Add production dependency
npm install <package> --save-dev   # Add development dependency
npm uninstall <package>            # Remove dependency
```

### Conventions

- **Commit style**: Conventional Commits enforced for PR titles
- **Versioning**: SemVer via npm version command
- **Changelog**: Can be generated via git-cliff
- **Branch naming**: feature/, fix/, docs/, chore/, etc.

## Testing Notes

- Tests use Vitest's global test APIs (describe, it, expect)
- Mock functions with vi.fn() and vi.spyOn()
- Coverage reports committed to `coverage/`
- Coverage thresholds: 80% for lines, functions, branches, statements

## Publishing Workflow

1. Update version: `npm version patch|minor|major`
2. Tag is created automatically by npm version
3. Push tag: `git push origin v*`
4. CI builds package and Docker image
5. Optional: Auto-publish to npm (requires NPM_TOKEN secret)
6. Executables uploaded to GitHub Release

## Documentation System

- **Serve locally**: `npm run docs:serve` (http://localhost:3000)
- **Deploy**: Automatic on push to main via GitHub Actions
- **API docs**: Auto-generated from TypeScript code and JSDoc comments
- **Format**: Markdown for GitHub Pages compatibility

## Package Configuration

- **Build tool**: TypeScript compiler (tsc) + tsc-alias for path mapping
- **Entry points**: Defined in `bin` field in package.json
- **Include in package**: `dist/` directory
- **Exclude**: Source files, tests, config files

## Important Paths

- Source code: `src/`
- Tests: `tests/`
- Build output: `dist/`
- Documentation: `docs/api/`
- Coverage reports: `coverage/`
- Cache: `.cache/`, `.eslintcache`

## Key Technologies

- **Runtime**: Node.js (18+)
- **Language**: TypeScript 5.6+
- **CLI Framework**: Commander.js
- **Validation**: Zod
- **Testing**: Vitest + @vitest/coverage-v8
- **Linting**: ESLint 9
- **Formatting**: Prettier
- **Documentation**: TypeDoc
- **Build**: tsc + tsc-alias
- **Development**: tsx (TypeScript executor)
