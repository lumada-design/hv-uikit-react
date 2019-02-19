module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/*.test.{js,jsx}",
    "!core/*"
  ],
  coverageThreshold: {
    global: {
      branches: 66,
      lines: 67,
      functions: 64
    }
  },
  reporters: ["default", "jest-junit"],
  coverageReporters: ["json", "lcov", "text-summary"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    ".*\\.(css|less|styl|scss|sass)$":
      "<rootDir>/config/jest-mocks/cssModule.js",
    ".*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/config/jest-mocks/image.js"
  },
  setupTestFrameworkScriptFile: "<rootDir>/config/test-setup.js",
  testRegex: "src/.*\\.test\\.(js|jsx)$",
  rootDir: "../",
  testURL: "http://localhost/",
  snapshotSerializers: ["enzyme-to-json/serializer", "jss-snapshot-serializer"]
};
