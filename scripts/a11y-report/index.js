/* eslint-disable import/no-extraneous-dependencies, no-console */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

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

const init = () => {
  try {
    console.log("⏳ Testing a11y...");

    // Run a11y and create a report
    execSync(
      `npx storybook-a11y-report --storybookUrl ${storybookUrl} --outputFormat html --outDir ${outputDir} ${excludeStories}`,
    );

    // File paths
    const reportDir = path.resolve(__dirname, `../../${outputDir}`);
    const reportFile = [reportDir, "/a11y_report.html"].join("");
    const cssFile = path.resolve(__dirname, "styles.css");
    const svgFile = path.resolve(__dirname, "404.svg");
    const htmlData = fs.readFileSync(reportFile, "utf8");

    // Add CSS file to report directory
    fs.mkdirSync([reportDir, "/styles"].join(""));
    fs.copyFileSync(cssFile, [reportDir, "/styles/styles.css"].join(""));

    // Add svg to report directory
    fs.copyFileSync(svgFile, [reportDir, "/404.svg"].join(""));

    // Customize report
    let updatedHtml = htmlData
      .replace(
        "<title>Accessibility report</title>",
        `<title>NEXT UI Kit Accessibility Report</title>
        <link rel="stylesheet" type="text/css" href="styles/styles.css" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600" rel="stylesheet"/>`,
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
          },
        )}</h2>`,
      )
      .replace("violations have been found", "A11y issues")
      .replaceAll(storybookUrl, "https://lumada-design.github.io/uikit/master");

    if (updatedHtml.search("A11y issues") === -1) {
      updatedHtml = updatedHtml.replace(
        "</body>",
        "<h3>No Accessibility Issues Found</h3><img src='./404.svg'><h4>Wow, such empty</h4></body>",
      );
    }

    fs.writeFileSync(reportFile, updatedHtml, "utf8");

    // Rename report file to "index.html"
    fs.renameSync(reportFile, [reportDir, "/index.html"].join(""));

    console.log("Report created 🚀");

    // Look for violations
    const regex = /<h2>.* violations have been found/g;
    const violations = htmlData.match(regex);

    if (violations) {
      // Violations were found
      const urlRegex = /https?:\/\/[^\s]+/g;
      const errorUrls = updatedHtml.match(urlRegex);
      const countStr = violations[0].replace("<h2>", "").trim();
      console.log(`Found ${countStr} violations. Stories with issues:`);
      console.log(errorUrls.slice(1).join("\n"));

      // Exit
      if (
        process.argv[2] === "--exit" &&
        process.argv[3]?.toString() === "true"
      ) {
        process.exit(1);
      }
    } else {
      // No violations found
      console.log("✅ No a11y issues found");
    }
  } catch (error) {
    console.error("❌ A11y error:", error);
    process.exit(1);
  }
};

init();
