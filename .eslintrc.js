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
    "no-unused-expressions": "off"
  },
  overrides: [
    {
      files: ["*.stories.js"],
      rules: {
        "no-console": "off",
        "no-alert": "off"
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
