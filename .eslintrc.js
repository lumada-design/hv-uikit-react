module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["prettier", "license-header"],
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "license-header/header": ["error", "./resources/license-header.js"],
    "react/jsx-wrap-multilines": ["error", {"declaration": false, "assignment": false}]
  },
  env: {
    browser: true,
    node: true,
    jest: true
  }
};
