import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";
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
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: react,
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@stylistic": stylistic,
      tsdoc: tsdoceslint,
    },
    rules: {
      "react/display-name": ["error"],
      "react/jsx-key": ["error"],
      "react/jsx-no-comment-textnodes": ["error"],
      "react/jsx-no-duplicate-props": ["error"],
      "react/jsx-no-target-blank": ["error"],
      "react/jsx-no-undef": ["error"],
      "react/jsx-uses-react": ["error"],
      "react/jsx-uses-vars": ["error"],
      "react/no-children-prop": ["error"],
      "react/no-danger-with-children": ["error"],
      "react/no-deprecated": ["error"],
      "react/no-direct-mutation-state": ["error"],
      "react/no-find-dom-node": ["error"],
      "react/no-is-mounted": ["error"],
      "react/no-render-return-value": ["error"],
      "react/no-string-refs": ["error"],
      "react/no-unescaped-entities": ["error"],
      "react/no-unknown-property": ["error"],
      "react/no-unsafe": ["error"],
      // "react/prop-types": ["error"],
      "react/require-render-return": ["error"],
      "jsx-a11y/alt-text": ["error"],
      "jsx-a11y/lang": ["error"],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": ["error"],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "tsdoc/syntax": "error",
    },
  },
);
