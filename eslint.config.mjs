import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["node_modules", "public", "webpack.config.js", "eslint.config.mjs", "babel.config.js", "jest.config.js"] },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs.recommended,
  { plugins: { "@stylistic": stylistic } },
  {
    rules: {
      "@stylistic/indent": ["error", 4],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/brace-style": ["none"],
    }
  }
];