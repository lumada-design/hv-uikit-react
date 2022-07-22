const { resolve } = require("path");

const CONFIG_PATH = resolve(__dirname);

module.exports = {
  rootDir: ".",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { rootMode: "upward" }],
  },
  testRegex: "/.*/tests/.*\\.test\\.(js|jsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `${CONFIG_PATH}/__mocks__/file-mock.js`,
    "\\.(css|less)$": `${CONFIG_PATH}/__mocks__/style-mock.js`,
    "^react-monaco-editor$": "<rootDir>/config/jest-mocks/empty.js",
    "^@hv/uikit-react-core$": "<rootDir>/../core/src",
    "^@hv/uikit-react-core/dist/(.*)$": "<rootDir>/../core/src/$1",
    "^@hv/uikit-react-icons$": "<rootDir>/../icons/bin",
    "^@hv/uikit-react-icons/dist/(.*)$": "<rootDir>/../icons/bin/$1",
    "^@hv/uikit-common-themes/dist/(.*)$": "<rootDir>/../themes/src/$1",
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
      branches: 50,
      lines: 50,
      functions: 50,
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