const puppeteer = require("puppeteer");

const url = (process.env.STORYBOOK_URL || "http://localhost:9001") + "/iframe.html";
const filter = process.env.STORY;

function getStories(url, filter) {
  // only for storybook >= 5.2
  // might need to be changed with storybook 6.x
  const clientAPI = window.__STORYBOOK_CLIENT_API__;
  const stories = clientAPI.raw();

  const hasPa11ySet = (s) => s.parameters && s.parameters.pa11y != null;

  const isCoreComponent = (s) => {
    const includedPaths = ["Components/", "Forms/"];
    return s.kind && includedPaths.some((p) => s.kind.startsWith(p));
  };

  const hasExplicitDisable = (s) =>
    s.parameters == null || s.parameters.pa11y == null || s.parameters.pa11y.disable !== true;

  return Promise.resolve(
    stories
      .filter((s) => hasPa11ySet(s) || isCoreComponent(s))
      .filter(hasExplicitDisable)
      .filter((s) => filter == null || s.id.includes(filter.toLowerCase()))
      .map((s) => ({
        url: url + "?id=" + s.id,
        ...s.parameters.pa11y,
      }))
  );
}

module.exports = (async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  const stories = await page
    .goto(url)
    .then(() => page.evaluate(getStories, url, filter))
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {
      browser.close();
    });

  if (stories == null) {
    process.exit(1);
  }

  return {
    defaults: {
      timeout: 15000,
      ignore: [
        "region",
        // Disabling contrast tests due to inconsistent false positives
        // https://github.com/pa11y/pa11y/issues/422
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
        "color-contrast",
        // Incorrect Reporting of: This element's role is "presentation" but contains child elements with semantic meaning.
        // https://github.com/squizlabs/HTML_CodeSniffer/issues/274
        "WCAG2AA.Principle1.Guideline1_3.1_3_1.F92,ARIA4",
      ],
      runners: ["htmlcs", "axe"],
      standard: "WCAG2AA",
      rootElement: "div[id=root]",
      reporter: "json",
      chromeLaunchConfig: {
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    },
    urls: stories,
  };
})();
