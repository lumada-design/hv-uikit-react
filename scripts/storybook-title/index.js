/* eslint-disable no-console */
const fs = require("node:fs");
const path = require("node:path");

const fixTitle = (filePath, title) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const updatedData = data.replace(
    /<title>.*<\/title>/,
    `<title>${title}</title>`,
  );

  fs.writeFileSync(filePath, updatedData);
};

const fixStorybookTitle = () => {
  try {
    console.log("⏳ Fixing Storybook title.");

    const title = "NEXT UI Kit";
    const storybookDist = path.resolve(__dirname, "../../dist");
    const htmlFile = `${storybookDist}/index.html`;
    const iframeFile = `${storybookDist}/iframe.html`;

    fixTitle(htmlFile, title);
    fixTitle(iframeFile, title);

    console.log("🚀 Storybook title fixed.");
  } catch (error) {
    console.error("❌ Error fixing Storybook title:", error);
    process.exit(1);
  }
};

fixStorybookTitle();
