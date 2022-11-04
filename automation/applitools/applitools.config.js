const isIncludedPath = (kind) => {
  const includedPaths = ["Components/", "Visualizations/"];
  return includedPaths.some((p) => kind.startsWith(p));
};

const isExcludedSample = (kind) => {
  const excludedSamples = [
    // asset inventory stories excluded due inconsistent view port (applitools ticket 34169)
    "Components/Asset Inventory",

    // dialog is opened and tested via Tests/Modal
    "Components/Modal",

    // no way to take a stable screenshot of a loading animation
    "Components/Loading",

    // plottly visualizations with axis rendering appear to produce small variations
    // https://insightgroup.atlassian.net/browse/HVUIKIT-5448
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

  appName: "UI Kit v2.x",
  batchName: "UI Kit v2.x",

  browser: [
    { width: 1024, height: 768, name: "chrome" },
    { width: 1024, height: 768, name: "firefox" },
    { width: 1024, height: 768, name: "safari" },
    { width: 1024, height: 768, name: "edgechromium" },
  ],

  include: ({ kind }) => isIncludedPath(kind) && !isExcludedSample(kind),

  concurrency: 10,
};
