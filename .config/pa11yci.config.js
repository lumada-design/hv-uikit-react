const fetch = require("node-fetch");

const baseUrl = process.env.STORYBOOK_URL || "http://localhost:6006";
const storiesUrl = baseUrl + "/stories.json";
const iframeUrl = baseUrl + "/iframe.html";

module.exports = (async () => {
  const response = await fetch(storiesUrl);
  const data = await response.json();

  const storiesUrls = Object.values(data.stories).map((story, i) => {
    return iframeUrl + "?id=" + story.id;
  });

  return {
    defaults: {
      timeout: 15000,
      runners: ["htmlcs", "axe"],
      standard: "WCAG2AA",
      rootElement: "div[id=root]",
      reporter: "json",
      chromeLaunchConfig: {
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    },
    urls: storiesUrls,
  };
})();
