/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const { createReport, outputDir } = require("./base");

const init = () => {
  try {
    console.log("⏳ Testing a11y...");

    // Create report
    createReport();

    // Get the number of a11y issues
    const reportFile = path.resolve(
      __dirname,
      `../../${outputDir}/a11y_report.html`
    );
    const htmlData = fs.readFileSync(reportFile, "utf8");
    const regex = /<h2>.* violations have been found/g;
    const violations = htmlData.match(regex);

    if (violations) {
      // Violations were found
      const countStr = violations[0].replace("<h2>", "").trim();
      console.log(`❌ ${countStr}`);

      // Get all failed IDs
      const regexId = /A11y ID: .*<\/h3>/g;
      const ids = htmlData
        .match(regexId)
        ?.map((id) => id.replace("</h3>", "").replace("A11y ID:", "").trim());
      console.log("Failing a11y IDs", ids);
    } else {
      // No violations found
      console.log("No a11y issues found 🚀");
    }
  } catch (error) {
    console.error("❌ Could not test a11y.", error);
    process.exit(1);
  }
};

init();
