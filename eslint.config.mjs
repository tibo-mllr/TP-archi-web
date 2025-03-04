import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginNext from "@next/eslint-plugin-next";
import pluginPrettier from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      "react-hooks": pluginReactHooks,
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  {
    rules: {
      "prefer-const": "error",
      "prefer-destructuring": "warn",
      "import/no-extraneous-dependencies": [
        "off",
        {
          packageDir: ["./packages/shared-types"],
        },
      ],
      "class-methods-use-this": "warn",
      "max-classes-per-file": ["error", 1],
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        { allowExpressions: true },
      ],
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  pluginPrettier,
];

