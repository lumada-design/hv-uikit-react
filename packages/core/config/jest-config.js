module.exports = {
  testEnvironment: "jsdom",
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
  reporters: ["default", "jest-junit"],
  coverageReporters: ["json", "lcov", "text-summary"],
  moduleDirectories: ["node_modules", "src", "config/jest-utils"],
  moduleNameMapper: {
    ".*\\.(css|less|styl|scss|sass)$": "<rootDir>/config/jest-mocks/cssModule.js",
    ".*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/config/jest-mocks/image.js",
    "^react($|/.+)": "<rootDir>/../../node_modules/react$1",
    "^@material-ui($|/.+)": "<rootDir>/../../node_modules/@material-ui$1",
    "^@hitachivantara/uikit-react-icons$": "<rootDir>/../icons/bin",
    "^@hitachivantara/uikit-react-icons/dist/(.*)$": "<rootDir>/../icons/bin/$1",
    "^@hitachivantara/uikit-common-themes/dist/(.*)$": "<rootDir>/../themes/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/config/test-setup.js"],
  testRegex: "src/.*/tests/.*\\.test\\.(js|jsx)$",
  rootDir: "../",
  testURL: "http://localhost/",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { rootMode: "upward" }],
  },
};
