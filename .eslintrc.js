const javascriptFileExtensions = [".js", ".jsx"];

module.exports = {
  extends: ["airbnb", "prettier", "prettier/@typescript-eslint"],
  plugins: ["prettier", "react-hooks", "@typescript-eslint"],
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": [1, { extensions: javascriptFileExtensions }],
    "react/jsx-wrap-multilines": ["error", { declaration: false, assignment: false }],
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-curly-newline": "off",
    "react/require-default-props": "off",

    // turned off while this isn't resolved: https://github.com/eslint/eslint/issues/12642
    "no-unused-expressions": "off",
    "react/forbid-prop-types": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ]
  },
  overrides: [
    {
      files: ["*.stories.js", "*.stories.test.js"],
      rules: {
        "no-console": "off",
        "no-alert": "off",
        "no-any": 0
      }
    },
    {
      files: ["*.ts"],
      env: { browser: true, es6: true, node: true },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-types": [
          "error",
          {
            "types": {
              "object": false,
              "Function": false
            }
          }
        ]
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json"
      },
      plugins: ["@typescript-eslint"],
      settings: {
        "import/resolver": {
          typescript: {
            project: "./packages/*/tsconfig.json"
          }
        }
      }
    }
  ],
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
  env: {
    browser: true,
    node: true,
    jest: true
  }
};
