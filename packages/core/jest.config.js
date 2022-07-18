const base = require("../../config/tests/jest-config");

module.exports = {
  testEnvironment: "jsdom",
  ...base,
};
