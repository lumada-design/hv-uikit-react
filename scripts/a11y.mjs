import { execSync } from "child_process";
import fs from "fs";

const storybookUrl = process.env.STORYBOOK_URL || "http://localhost:6006";

function showResults(type) {
  const fileName = `a11y_${type}_Results.txt`;
  if (fs.existsSync(fileName)) {
    const results = fs.readFileSync(fileName, "utf-8");
    const resultsNumber = results.split(type).length - 1;
    console.log(`${resultsNumber} ${type}s found.`);
    console.log(results);
    return resultsNumber;
  }
  return 0;
}

const init = () => {
  try {
    console.log("⏳ Testing a11y...");

    // Run a11y checks
    execSync(
      `npx test-storybook --url ${storybookUrl} --maxWorkers=2 >/dev/null 2>&1`,
    );

    const violationNumber = showResults("Violation");
    console.log("");
    console.log("********************************************");
    console.log("");
    const incompleteNumber = showResults("Incomplete");

    if (violationNumber !== 0 || incompleteNumber !== 0) {
      // Exit
      process.exit(1);
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
