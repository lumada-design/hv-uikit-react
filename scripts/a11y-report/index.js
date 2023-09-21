/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const storybookUrl = process.env.STORYBOOK_URL || "http://localhost:6006";

const outputDir = process.env.A11Y_OUTPUT_DIR || "a11y-report";

// stories to exclude
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

const buildReport = () => {
  try {
    console.log("⏳ Creating report...");

    // Create report
    execSync(
      `npx storybook-a11y-report --storybookUrl ${storybookUrl} --outputFormat html --outDir ${outputDir} -o ${excludeStories}`
    );

    console.log("⏳ Adding custom CSS to report...");

    const reportDir = path.resolve(__dirname, `../../${outputDir}`);
    const reportFile = [reportDir, "/a11y_report.html"].join("");
    const cssFile = path.resolve(__dirname, "styles.css");

    // Add CSS file to report directory
    fs.copyFileSync(cssFile, [reportDir, "/styles.css"].join(""));

    // Customize report
    const htmlData = fs.readFileSync(reportFile, "utf8");
    const updatedHtml = htmlData
      .replace(
        "<title>Accessibility report</title>",
        `<title>NEXT UI Kit Accessibility Report</title>
        <link rel="stylesheet" type="text/css" href="styles.css" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600" rel="stylesheet"/>`
      )
      .replace(
        "<h1>Accessibility report</h1>",
        `<h1>NEXT UI Kit Accessibility Report</h1><h2>Generated at: ${new Date().toLocaleDateString(
          "en-us",
          {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
            timeZoneName: "long",
            timeZone: "GMT",
          }
        )}</h2>`
      )
      .replace("violations have been found", "A11y issues")
      .replaceAll(storybookUrl, "https://lumada-design.github.io/uikit/master");
    fs.writeFileSync(reportFile, updatedHtml, "utf8");

    // Rename report file to "index.html"
    fs.renameSync(reportFile, [reportDir, "/index.html"].join(""));

    console.log("Report created 🚀");
  } catch (error) {
    console.error("❌ Error creating the report:", error);
    process.exit(1);
  }
};

buildReport();
