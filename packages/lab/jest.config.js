const { resolve } = require("path");
const base = require("../../config/tests/jest-config");

const CONFIG_PATH = resolve(__dirname);
const ROOT_PATH = resolve(CONFIG_PATH, "../..");

module.exports = {
  ...base,
  moduleNameMapper: {
    ...base.moduleNameMapper,
    "^@hitachivantara/uikit-react-lab$": `${ROOT_PATH}/packages/lab/src`,
  },
  testEnvironment: "jsdom",
};
