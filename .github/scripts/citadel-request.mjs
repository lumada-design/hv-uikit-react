#!/usr/bin/env node

const config = {
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
    },
  ],
  "SAST-scan": [
    {
      enable: "true",
    },
  ],
  "SCA-scan": [
    {
      enable: "false",
    },
  ],
  "OSS-scan": [
    {
      enable: "false",
      scantype: "layer",
      OSS_serverURL: "",
      project: "",
      version: "",
      imagespec: "",
      docker_registry: "",
    },
  ],
  "DAST-scan": [
    {
      enable: "false",
      url: "",
      "multiple-scans": "",
      user: "",
      encoded: "",
      password: "",
      network: "",
    },
  ],
  "host-based-scan": [
    {
      enable: "false",
      ip: "",
      encoded: "",
      user: "",
      SSH: "",
      password: "!",
      "SSH-key": "",
      SSH_PassphraseProtected: "",
      SSH_Passphrase: "",
      os: "",
      network: "",
      "agent-based": "",
    },
  ],
  "container-scan": [
    {
      enable: "false",
      ip: "",
      "container-scan": "",
      "image-scan": "",
    },
  ],
};

async function main() {
  console.log("Sending the json request", config);

  try {
    const resp = await fetch(
      "https://citadel.orl.eng.hitachivantara.com/citadel",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      },
    );

    if (resp.ok) {
      console.log("✅ SUCCESS");
      process.exit(0);
    } else {
      console.error("❌ FAILED", resp.statusText);
      process.exit(1);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
