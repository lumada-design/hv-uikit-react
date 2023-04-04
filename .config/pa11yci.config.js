const fetch = require("node-fetch");

const baseUrl = process.env.STORYBOOK_URL || "http://localhost:6006";
const storiesUrl = baseUrl + "/stories.json";
const iframeUrl = baseUrl + "/iframe.html";

const filterStories = (stories) => {
  const exclude = ["Overview/", "Foundation/", "Guides/", "Templates/"];

  return Object.values(stories).reduce((acc, story) => {
    const isExcluded = exclude.some((p) => story.title.includes(p));

    if (!isExcluded) acc.push(iframeUrl + "?id=" + story.id);
    return acc;
  }, []);
};

module.exports = (async () => {
  const response = await fetch(storiesUrl);
  const data = await response.json();

  const storiesUrls = filterStories(data.stories);

  return {
    defaults: {
      timeout: 15000,
      runners: ["htmlcs", "axe"],
      standard: "WCAG2AA",
      rootElement: "div[id=root]",
      reporters: ["cli", "pa11y-ci-reporter-html"],
      chromeLaunchConfig: {
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
      ignore: ["color-contrast"],
    },
    urls: storiesUrls,
  };
})();
