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

  testConcurrency: 20,
};
