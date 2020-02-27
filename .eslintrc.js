module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["prettier", "react-hooks"],
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-wrap-multilines": [
      "error",
      { declaration: false, assignment: false }
    ],
    "no-underscore-dangle": ["error", { allow: ["_offset"] }],
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn"
  },
  env: {
    browser: true,
    node: true,
    jest: true
  }
};
