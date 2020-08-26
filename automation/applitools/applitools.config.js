module.exports = {
  showLogs: true,
  batchName: '[debug] - grid issue',
  matchLevel: "Strict",
  puppeteerOptions: { args: ["--no-sandbox", "--disable-setuid-sandbox"], ignoreHTTPSErrors: true },
  runInDocker: true,
  variations: () => ["theme:wicked"],

  browser: [
    { width: 1920, height: 1080, name: "ie11" },
    { width: 1920, height: 1080, name: "chrome" },
    { width: 1920, height: 1080, name: "firefox" },
    { width: 1920, height: 1080, name: "safari" },
    { width: 1920, height: 1080, name: "edgechromium" }

    // { width: 1920, height: 1080, name: "chrome-one-versionsback" },
    // { width: 1920, height: 1080, name: "firefox-one-version-back" },
    // { width: 1920, height: 1080, name: "safari-one-version-back" },
    // { width: 1920, height: 1080, name: "edgechromium-one-version-back" },

    // { width: 1920, height: 1080, name: "chrome-two-versions-back" },
    // { width: 1920, height: 1080, name: "firefox-two-versions-back" },
    // { width: 1920, height: 1080, name: "safari-two-versions-back" }
  ],
  //asset inventory stories excluded due inconsistent view port (applitools ticket 34169)
  include: ({ name, kind, parameters }) =>
    (kind.includes("Components/Asset Inventory")),
  concurrency: 10
};
