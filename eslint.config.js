import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import unusedImports from "eslint-plugin-unused-imports";
import _import from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/dist",
      "**/node_modules",
      "**/coverage",
      "**/.DS_Store",
      "**/build",
      "**/*.config.js",
      "**/*.config.ts",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:prettier/recommended",
    ),
  ),
  {
    plugins: {
      "unused-imports": unusedImports,
      "import": fixupPluginRules(_import),
      "@typescript-eslint": typescriptEslint,
      "prettier": fixupPluginRules(prettier),
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "prettier/prettier": "warn",
      "no-unused-vars": "off",
      "unused-imports/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_.*?$",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "import/order": [
        "warn",
        {
          "groups": [
            "type",
            "builtin",
            "object",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "pathGroups": [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          "newlines-between": "always",
          "alphabetize": {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "padding-line-between-statements": [
        "warn",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
        {
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: "*",
        },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
    },
  },
  {
    files: ["**/*.test.ts", "**/*.spec.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-console": "off",
    },
  },
];

