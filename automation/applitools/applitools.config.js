const isIncludedPath = (kind) => {
  const includedPaths = ["Components/", "Forms/", "Tests/", "Visualizations/"];
  return includedPaths.some((p) => kind.startsWith(p));
};

const isExcludedSample = (kind) => {
  const excludedSamples = [
    "Components/Asset Inventory",
    "Components/Dialog",
    "Components/Loading",
    "Visualizations/Bar Chart",
    "Visualizations/Line Chart",
  ];
  return excludedSamples.some((p) => kind.includes(p));
};

module.exports = {
  matchLevel: "Strict",
  puppeteerOptions: { args: ["--no-sandbox", "--disable-setuid-sandbox"], ignoreHTTPSErrors: true },
  runInDocker: true,
  variations: () => ["theme:wicked"],

  appName: "v3 pre-release",

  browser: [
    { width: 1920, height: 1080, name: "ie11" },
    { width: 1920, height: 1080, name: "chrome" },
    { width: 1920, height: 1080, name: "firefox" },
    { width: 1920, height: 1080, name: "safari" },
    // { width: 1920, height: 1080, name: "edgechromium" },

    // { width: 1920, height: 1080, name: "chrome-one-versionsback" },
    // { width: 1920, height: 1080, name: "firefox-one-version-back" },
    // { width: 1920, height: 1080, name: "safari-one-version-back" },
    // { width: 1920, height: 1080, name: "edgechromium-one-version-back" },

    // { width: 1920, height: 1080, name: "chrome-two-versions-back" },
    // { width: 1920, height: 1080, name: "firefox-two-versions-back" },
    // { width: 1920, height: 1080, name: "safari-two-versions-back" }
  ],
  // asset inventory stories excluded due inconsistent view port (applitools ticket 34169)

  include: ({ name, kind, parameters }) => isIncludedPath(kind) && !isExcludedSample(kind),
  concurrency: 10,
};
