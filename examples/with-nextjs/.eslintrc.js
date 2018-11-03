module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["prettier", "graphql"],
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }]
  },
  env: {
    browser: true,
    node: true
  }
};
