const isIncludedPath = (kind) => {
  const includedPaths = ["Components/", "Forms/", "Visualizations/", "Tests/"];
  return includedPaths.some((p) => kind.startsWith(p));
};

const isExcludedSample = (kind) => {
  const excludedSamples = [
    // asset inventory stories excluded due inconsistent view port (applitools ticket 34169)
    "Components/Asset Inventory",

    // dialog is opened and tested via Tests/Dialog
    "Components/Dialog",

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

  appName: "UI Kit v3.x",

  browser: [
    { width: 1024, height: 768, name: "ie11" },
    { width: 1024, height: 768, name: "chrome" },
    { width: 1024, height: 768, name: "firefox" },
    { width: 1024, height: 768, name: "safari" },
  ],

  include: ({ kind }) => isIncludedPath(kind) && !isExcludedSample(kind),

  concurrency: 5,
};
