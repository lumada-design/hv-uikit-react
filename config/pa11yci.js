const fetch = require("node-fetch");

const baseUrl = process.env.STORYBOOK_URL || "http://localhost:9001";
const storiesUrl = baseUrl + "/stories.json";
const iframeUrl = baseUrl + "/iframe.html";

module.exports = (async () => {
  const response = await fetch(storiesUrl);
  const data = await response.json();

  return {
    defaults: {
      timeout: 15000,
      standard: "WCAG2AA",
      rootElement: "div[id=root]",
      reporter: "json",
      chromeLaunchConfig: {
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    },
    urls: ["https://pa11y.org/", "https://pa11y.org/contributing"],
  };
})();
