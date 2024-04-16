import fs from "fs";
import { getStoryContext, type TestRunnerConfig } from "@storybook/test-runner";
import { NodeResult, Result } from "axe-core";
import { configureAxe, getAxeResults, injectAxe } from "axe-playwright";

const excludeStories = [
  "Overview",
  "Foundation",
  "Guides",
  "Templates",
  "Visualizations/Bar Chart",
  "Visualizations/Line Chart",
  "Visualizations/Donut Chart",
  "Visualizations/Confusion Matrix",
  "Visualizations/Scatter Plot",
  "Visualizations/Treemap",
  "Widgets/Code Editor",
];

function getNodesIds(nodes: NodeResult[]) {
  return nodes.map((n) => `\n\t\t${n.target}`).join();
}

function getResultSummary(type: string, results: Result[]) {
  return results
    .map((r) => `\n\t${type}: ${r.help} - ${r.impact} ${getNodesIds(r.nodes)}`)
    .join("");
}

function writeAxeResults(
  storyTitle: string,
  storyName: string,
  type: string,
  results: Result[],
) {
  if (results.length > 0) {
    const fileName = `a11y_${type}_Results.txt`;
    fs.appendFileSync(fileName, `\n${storyTitle} - ${storyName}`, "utf-8");
    fs.appendFileSync(fileName, getResultSummary(type, results), "utf8");
  }
}

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },

  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);
    const validStories = excludeStories.filter((s) =>
      storyContext.title.includes(s),
    );
    if (validStories.length != 0) return;

    const specificA11yRules = [{ id: "color-contrast", enabled: false }];

    // Apply story-level a11y rules
    await configureAxe(page, {
      rules: specificA11yRules.concat(
        storyContext.parameters?.a11y?.config?.rules,
      ),
    });

    const axeResults = await getAxeResults(page, "#storybook-root");

    writeAxeResults(
      storyContext.title,
      storyContext.name,
      "Violation",
      axeResults.violations,
    );
    writeAxeResults(
      storyContext.title,
      storyContext.name,
      "Incomplete",
      axeResults.incomplete,
    );
  },
};

export default config;
