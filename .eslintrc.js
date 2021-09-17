const { resolve } = require("path");

const javascriptFileExtensions = [".js", ".jsx", ".ts", ".tsx"];

module.exports = {
  root: true,
  extends: [
    "airbnb",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:testing-library/recommended",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
  ],
  plugins: ["prettier", "react-hooks", "@typescript-eslint", "testing-library", "jest-dom"],
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": [1, { extensions: javascriptFileExtensions }],
    "react/jsx-wrap-multilines": ["error", { declaration: false, assignment: false }],
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-curly-newline": "off",
    "react/require-default-props": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-fragments": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-no-bind": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  overrides: [
    {
      files: ["*.stories.js", "*.stories.test.js"],
      rules: {
        "no-console": "off",
        "no-alert": "off",
        "no-any": 0,
        "react/prop-types": "off",
        "import/no-extraneous-dependencies": "off",
        "react/jsx-no-bind": "off",
      },
    },
    {
      files: ["*.test.js"],
      env: { jest: true },
      rules: {
        "import/no-unresolved": [2, { ignore: ["^testing-utils$"] }],
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      env: { browser: true, es6: true, node: true },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-types": [
          "error",
          {
            types: {
              object: false,
              Function: false,
            },
          },
        ],
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/@typescript-eslint",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
      plugins: ["@typescript-eslint"],
      settings: {
        "import/resolver": {
          typescript: {
            project: resolve(__dirname, "./packages/*/tsconfig.json"),
          },
        },
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {},
      webpack: {
        config: resolve(__dirname, "./config/eslint.webpack.js"),
      },
    },
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
};
