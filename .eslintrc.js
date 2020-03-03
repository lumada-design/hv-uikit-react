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
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-props-no-spreading": "off",

    "react/state-in-constructor": "off",
    "react/static-property-placement": "off",
    "react/jsx-curly-newline": "off"
  },
  env: {
    browser: true,
    node: true,
    jest: true
  }
};
