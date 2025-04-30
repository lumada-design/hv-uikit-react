import { getStoryContext, type TestRunnerConfig } from "@storybook/test-runner";
import { checkA11y, configureAxe, injectAxe } from "axe-playwright";

const excludeStories = ["Templates", "Visualizations"];

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },

  async postVisit(page, context) {
    if (excludeStories.some((s) => context.title.includes(s))) return;

    const storyContext = await getStoryContext(page, context);
    if (storyContext.parameters?.a11y?.disable) return;

    // Apply story-level a11y rules
    await configureAxe(page, {
      rules: [
        { id: "color-contrast", enabled: false },
        ...(storyContext.parameters?.a11y?.config?.rules || []),
      ],
    });

    await checkA11y(page, "#storybook-root", {
      verbose: false,
      detailedReport: true,
    });
  },
};

export default config;
