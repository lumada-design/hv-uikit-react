const fetch = require("node-fetch");

const baseUrl = process.env.STORYBOOK_URL || "http://localhost:6006";
const storiesUrl = baseUrl + "/stories.json";
const iframeUrl = baseUrl + "/iframe.html";

const filterStories = (stories) => {
  const exclude = [
    "Overview/",
    "Foundation/",
    "Guides/",
    "Templates/",
    "Visualizations/Bar Chart",
    "Visualizations/Line Chart",
    "Visualizations/Donut Chart",
    "Visualizations/Confusion Matrix",
    "Widgets/Code Editor",
  ];

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
      ignore: [
        // The two rules below are related with color contrast
        "color-contrast",
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
        // Ignoring this rule because it's ok to have links to inexisting anchors on our stories
        "WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124.NoSuchID",
      ],
    },
    urls: storiesUrls,
  };
})();
