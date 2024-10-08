// eslint.config.js
const tsdocPlugin = require("eslint-plugin-tsdoc");
const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    ignores: [
      "build/**/*",
      "node_modules/**/*",
      ".github",
      "bundle.*",
      "docs/**/*",
      "dist/**/*",
      "webpack.config.js",
      "documentation/**/*",
      "bundle.js",
      "eslint.config.js",
      "webpack.config.js",
      "*.min.js",
      "public/*",
      "coverage/*",
    ],
    plugins: {
      tsdoc: tsdocPlugin,
      "@typescript-eslint": typescriptEslintPlugin,
    },
    rules: {
      "tsdoc/syntax": "warn",
      camelcase: "off",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
];
