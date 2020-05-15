module.exports = {
  variations: () => ["theme:wicked"],

  browser: [
    { width: 1024, height: 768, name: "ie11" },
    { width: 1024, height: 768, name: "chrome" }
    // { width: 1024, height: 768, name: "firefox" },
    // { width: 1024, height: 768, name: "safari" },
    // { width: 1024, height: 768, name: "edgechromium" },

    // { width: 1024, height: 768, name: "chrome-one-versionsback" },
    // { width: 1024, height: 768, name: "firefox-one-version-back" },
    // { width: 1024, height: 768, name: "safari-one-version-back" },
    // { width: 1024, height: 768, name: "edgechromium-one-version-back" },

    // { width: 1024, height: 768, name: "chrome-two-versions-back" },
    // { width: 1024, height: 768, name: "firefox-two-versions-back" },
    // { width: 1024, height: 768, name: "safari-two-versions-back" }
  ],

  concurrency: 10
};
