const base = require("../../config/tests/jest-config");

module.exports = {
  ...base,
  testEnvironment: "jsdom",
};
