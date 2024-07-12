import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getReactFlowStyles = () => {
  try {
    console.log("⏳ Updating React Flow styles.");

    const reactFlowFile = path.resolve(
      __dirname,
      "../node_modules/reactflow/dist/style.css",
    );
    const filePath = path.resolve(
      __dirname,
      "../packages/lab/src/Flow/base.ts",
    );

    // Get styles
    const styles = fs.readFileSync(reactFlowFile, "utf-8");

    // Format styles
    const template = `
    import { css } from "@emotion/react";

    export const flowStyles = css\`${styles}\`;
    `;

    // Update base.ts file
    fs.writeFileSync(filePath, template);

    // Format
    execSync(`npx pretty-quick --pattern "**/lab/src/components/Flow/base.ts"`);

    console.log("🚀 React Flow styles updated.");
  } catch (error) {
    console.error("❌ Error updating React Flow styles:", error);
    process.exit(1);
  }
};

getReactFlowStyles();
