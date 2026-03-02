import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "tailwind.config.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  ...pluginVue.configs["flat/essential"].map((config) => ({
    ...config,
    files: ["**/*.vue"],
  })),
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
);
