/* eslint-disable no-console */
const { execSync } = require("child_process");

const storybookUrl = process.env.STORYBOOK_URL || "http://localhost:6006";

const outputDir = process.env.A11Y_OUTPUT_DIR || "a11y-report";

// Stories to exclude
const excludeStories = [
  "Overview/**",
  "Foundation/**",
  "Guides/**",
  "Templates/**",
  "Visualizations/Bar Chart/**",
  "Visualizations/Line Chart/**",
  "Visualizations/Donut Chart/**",
  "Visualizations/Confusion Matrix/**",
  "Widgets/Code Editor/**",
]
  .map((s) => `-e "${s}"`)
  .join(" ");

const createReport = () => {
  try {
    execSync(
      `npx storybook-a11y-report --storybookUrl ${storybookUrl} --outputFormat html --outDir ${outputDir} ${excludeStories}`
    );
  } catch (error) {
    console.error("❌ Could not create a11y report.", error);
    process.exit(1);
  }
};

module.exports = { storybookUrl, outputDir, createReport };
