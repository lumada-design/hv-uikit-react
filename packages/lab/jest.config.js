const base = require("../../config/tests/jest-config");

module.exports = {
  ...base,
  testEnvironment: "jsdom",
  coverageThreshold: {
    global: {
      branches: 30,
      lines: 30,
      functions: 30,
    },
  },
};
