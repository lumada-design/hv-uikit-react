module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  parser: "@babel/eslint-parser",
  rules: {
    "no-console": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
  env: {
    browser: false,
    node: true,
    jest: false,
  },
};
