const { resolve } = require("path");

const CONFIG_PATH = resolve(__dirname);
const ROOT_PATH = resolve(CONFIG_PATH, "../..");

module.exports = {
  rootDir: ".",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { rootMode: "upward" }],
  },
  testRegex: "/.*/tests/.*\\.test\\.(js|jsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", `${CONFIG_PATH}/__utils__`],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `${CONFIG_PATH}/__mocks__/file-mock.js`,
    "\\.(css|less)$": `${CONFIG_PATH}/__mocks__/style-mock.js`,
    "^react($|/.+)": `${ROOT_PATH}/node_modules/react$1`,
    "^@mui($|/.+)": `${ROOT_PATH}/node_modules/@mui$1`,
    "^@hitachivantara/uikit-react-core$": `${ROOT_PATH}/packages/core/src`,
    "^@hitachivantara/uikit-react-icons$": `${ROOT_PATH}/packages/icons/bin`,
    "^@hitachivantara/uikit-common-themes/dist/(.*)$": `${ROOT_PATH}/packages/themes/src/$1`,
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/*.test.{js,jsx}",
    "!src/**/stories/*",
    "!src/**/tests/*",
    "!core/*",
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      lines: 50,
      functions: 45,
    },
  },
  coverageReporters: ["json", "lcov", "text-summary"],
  coverageDirectory: "<rootDir>/coverage",
  reporters: ["default", "jest-junit"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: [`${CONFIG_PATH}/test-setup.js`],
  testEnvironmentOptions: {
    url: "http://localhost/",
  },
};
