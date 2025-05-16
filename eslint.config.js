import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import tsdoceslint from "eslint-plugin-tsdoc"
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import stylisticTs from "@stylistic/eslint-plugin-ts";

export default tseslint.config(
  { ignores: ["coverage", "dist", "src/components/ui"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@stylistic/ts": stylisticTs,
      "tsdoc": tsdoceslint
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@stylistic/ts/indent": ["error", 2],
      "@stylistic/ts/quotes": ["error", "double"],
      "tsdoc/syntax": "error",
    },
  },
);
