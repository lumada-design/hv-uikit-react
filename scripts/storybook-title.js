import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
    const storybookDist = path.resolve(__dirname, "../dist");
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
