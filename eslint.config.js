import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsdoceslint from "eslint-plugin-tsdoc";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "src/ui", "tests/coverage"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@stylistic": stylistic,
      tsdoc: tsdoceslint,
    },
    rules: {
      "react/display-name": 2,
      "react/jsx-key": 2,
      "react/jsx-no-comment-textnodes": 2,
      "react/jsx-no-duplicate-props": 2,
      "react/jsx-no-target-blank": 2,
      "react/jsx-no-undef": 2,
      "react/jsx-uses-react": 2,
      "react/jsx-uses-vars": 2,
      "react/no-children-prop": 2,
      "react/no-danger-with-children": 2,
      "react/no-deprecated": 2,
      "react/no-direct-mutation-state": 2,
      "react/no-find-dom-node": 2,
      "react/no-is-mounted": 2,
      "react/no-render-return-value": 2,
      "react/no-string-refs": 2,
      "react/no-unescaped-entities": 2,
      "react/no-unknown-property": 2,
      "react/no-unsafe": 0,
      // "react/prop-types": 2,
      "react/require-render-return": 2,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": ["error"],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "tsdoc/syntax": "error",
    },
  },
);
