const javascriptFileExtensions = [".js", ".jsx"];

module.exports = {
  extends: ["airbnb", "prettier", "prettier/@typescript-eslint"],
  plugins: ["prettier", "react-hooks", "@typescript-eslint"],
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": [1, { extensions: javascriptFileExtensions }],
    "react/jsx-wrap-multilines": ["error", { declaration: false, assignment: false }],
    "no-underscore-dangle": ["error", { allow: ["_offset"] }],
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-curly-newline": "off",
    "react/require-default-props": "off",
    "react/forbid-prop-types": "off"
  },
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
