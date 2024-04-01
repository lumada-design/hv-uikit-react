// Exclude everything and include at the story level
const isExcludedPath = (kind) => {
  const excludePaths = [
    "Overview/",
    "Foundation/",
    "Guides/",
    "Components/",
    "Widgets/",
    "Templates/",
    "Visualizations/",
    "Tests/",
    "Lab/",
  ];
  return excludePaths.some((p) => kind.includes(p));
};

module.exports = {
  matchLevel: "Strict",

  puppeteerOptions: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
    protocolTimeout: 300000,
  },

  appName: process.env.APPLITOOLS_APP_NAME,
  batchName: process.env.APPLITOOLS_BATCH_ID,
  branchName: process.env.APPLITOOLS_BRANCH_NAME,

  browser: [
    { width: 1024, height: 768, name: "chrome" },
    { width: 1024, height: 768, name: "firefox" },
    { width: 1024, height: 768, name: "safari" },
    { width: 1024, height: 768, name: "edgechromium" },
  ],

  include: ({ kind }) => !isExcludedPath(kind),

  testConcurrency: 20,
};
