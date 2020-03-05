module.exports = {
  parser: "babel-eslint",
  rules: {
    "no-console": "off",
    "react/prop-types": "off",
    "no-alert": "off",
    "no-underscore-dangle": "off"
  },
  env: {
    browser: true,
    node: true,
    jest: true
  }
};
