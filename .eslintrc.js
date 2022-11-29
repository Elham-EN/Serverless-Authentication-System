/* eslint-disable quote-props */
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: [
      // "tsconfig.json",
      // "tsconfig.dev.json",
      // "./packages/**/tsconfig.json",
      // "./packages/**/tsconfig.dev.json",
    ],
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "import/no-unresolved": 0,
    "object-curly-spacing": "off",
    "@typescript-eslint/object-curly-spacing": "warn",
    quotes: "off",
    "@typescript-eslint/quotes": "warn",
  },
};
