/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const getReactFlowStyles = () => {
  try {
    console.log("⏳ Updating React Flow styles.");

    const reactFlowFile = path.resolve(
      __dirname,
      "../../node_modules/reactflow/dist/style.css"
    );
    const filePath = path.resolve(
      __dirname,
      "../../packages/lab/src/components/Flow/base.ts"
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
