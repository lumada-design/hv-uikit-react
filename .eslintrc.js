const { resolve } = require("path");

const javascriptFileExtensions = [".js", ".jsx", ".ts", ".tsx"];
module.exports = {
  root: true,
  extends: [
    "airbnb",
    "prettier",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "plugin:storybook/recommended",
  ],
  plugins: ["prettier", "react-hooks", "@typescript-eslint", "testing-library", "jest-dom"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    babelOptions: {
      rootMode: "upward",
    },
  },
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: javascriptFileExtensions,
      },
    ],
    "react/jsx-wrap-multilines": [
      "error",
      {
        declaration: false,
        assignment: false,
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-curly-newline": "off",
    "react/require-default-props": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-fragments": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-no-bind": "off",
    "react/no-unstable-nested-components": [
      "warn",
      {
        allowAsProps: true,
      },
    ],
    "arrow-body-style": "off",
    "default-param-last": "off",
    "react/function-component-definition": "off",
    "no-restricted-exports": "off",
    "testing-library/render-result-naming-convention": "off",
    "react/jsx-no-useless-fragment": [
      "warn",
      {
        allowExpressions: true,
      },
    ],
    "prefer-regex-literals": [
      "warn",
      {
        disallowRedundantWrapping: true,
      },
    ],
    "default-case-last": "off",
    "class-methods-use-this": "off",
    "prefer-arrow-callback": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        "": "never",
      },
    ],
    "no-unused-vars": "warn",
  },
  overrides: [
    {
      files: ["*.stories.js", "*.stories.test.js"],
      rules: {
        "no-console": "off",
        "no-alert": "off",
        "no-any": 0,
        "react/prop-types": "off",
        "import/no-anonymous-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "react/jsx-no-bind": "off",
        "react/no-unstable-nested-components": "off",
        "import/no-relative-packages": "off",
      },
    },
    {
      files: ["*.test.js"],
      env: {
        jest: true,
      },
      rules: {
        "import/no-unresolved": [
          2,
          {
            ignore: ["^testing-utils$"],
          },
        ],
        "testing-library/prefer-screen-queries": "off",
        "testing-library/render-result-naming-convention": "warn",
        "testing-library/no-node-access": "warn",
        "no-promise-executor-return": "off",
        "import/no-extraneous-dependencies": "off",
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      env: {
        browser: true,
        es6: true,
        node: true,
      },
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
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
      plugins: ["@typescript-eslint"],
      settings: {
        "import/resolver": {
          typescript: {
            project: resolve(__dirname, "./packages/**/tsconfig.json"),
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
