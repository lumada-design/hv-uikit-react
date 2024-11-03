#!/usr/bin/env node

const config = {
  Citadel: [{ version: "1.6" }],
  "project-info": [
    {
      name: "uikit",
      "project-id": "120",
      branch: "master",
      email: "uikit@hitachivantara.com",
      repoPathsandBranch: "hv-uikit-react,master",
      repotype: "github",
      org: "lumada-design",
      artifactURL: "n-a",
      repoPathsIncludes: "n-a",
      repoPathsExcludes: "n-a",
    },
  ],
  "SAST-scan": [{ enable: "true" }],
  "OSS-scan": [
    {
      enable: "true",
      scantype: "source",
      OSS_serverURL: process.env.BLACK_DUCK_URL,
      project: "uikit",
      version: "latest",
      imagespec: "n-a",
      docker_registry: "n-a",
    },
  ],
  "SCA-scan": [{ enable: "false" }],
  "DAST-scan": [{ enable: "false" }],
  "host-based-scan": [{ enable: "false" }],
  "container-scan": [{ enable: "false" }],
};

async function main() {
  console.log("Sending the JSON scan request", config);

  try {
    const resp = await fetch(process.env.CITADEL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });

    if (resp.ok) {
      console.log("✅ SUCCESS");
      process.exit(0);
    } else {
      console.error("❌ FAILED", resp.status, resp.statusText);
      console.error(await resp.text());
      process.exit(1);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
