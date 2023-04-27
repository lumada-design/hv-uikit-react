const isExcludedPath = (kind) => {
  const excludePaths = ["Overview/", "Foundation/", "Guides/", "Templates/"];

  return excludePaths.some((p) => kind.includes(p));
};

module.exports = {
  matchLevel: "Strict",

  puppeteerOptions: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  },

  appName: "UI Kit",
  batchId: process.env.APPLITOOLS_BATCH_ID,

  browser: [
    { width: 1024, height: 768, name: "chrome" },
    { width: 1024, height: 768, name: "firefox" },
    { width: 1024, height: 768, name: "safari" },
    { width: 1024, height: 768, name: "edgechromium" },
  ],

  include: ({ kind }) => !isExcludedPath(kind),

  concurrency: 10,
};
