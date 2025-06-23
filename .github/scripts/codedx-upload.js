#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const { CODE_DX_URL, CODE_DX_API_KEY, CODE_DX_PROJECT_ID } = process.env;

if (!CODE_DX_URL) throw new Error("CODE_DX_URL is required");
if (!CODE_DX_API_KEY) throw new Error("CODE_DX_API_KEY is required");
if (!CODE_DX_PROJECT_ID) throw new Error("CODE_DX_PROJECT_ID is required");

main();

async function main() {
  const REPORT_FILE = path.resolve("reports/dependency-check-report.xml");
  console.log("REPORT_FILE:", REPORT_FILE);

  if (!fs.existsSync(REPORT_FILE)) {
    throw new Error(`❌ dependency-check report file NOT found.`);
  }

  console.info(`⬆️ dependency-check report file found. Uploading results...`);

  const formData = new FormData();
  formData.append("file1", fs.createReadStream(REPORT_FILE));

  const response = await fetch(
    `${CODE_DX_URL}/codedx/api/projects/${CODE_DX_PROJECT_ID}/analysis`,
    {
      method: "POST",
      headers: {
        "API-Key": CODE_DX_API_KEY,
        accept: "*/*",
      },
      body: formData,
    },
  );

  const responseText = await response.text();
  console.log("Result", responseText);

  if (!response.ok) {
    throw new Error("❌ Upload failed: " + responseText);
  } else {
    console.log("✅ SUCCESS");
  }
}
