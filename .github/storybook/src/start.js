const core = require("@actions/core");
const exec = require("@actions/exec");
const waitOn = require("wait-on");
const path = require("path");

const env = process.env;

async function main() {
  const image = `storybook-image-${env.GITHUB_RUN_ID}`;
  const container = `storybook-container-${env.GITHUB_RUN_ID}`;
  core.saveState("storybook-image", image);
  core.saveState("storybook-container", container);

  // build
  const context = path.join(env.GITHUB_WORKSPACE, ".github/storybook");
  await exec.exec("docker", ["build", "--rm", "-t", image, context]);

  // run
  await exec.exec("docker", [
    "run",
    "-d",
    "--rm",
    "-p",
    "9002:9002",
    "--name",
    container,
    image
  ]);

  await waitOn({
    resources: ["http://localhost:9002"],
    interval: 5000,
    timeout: 300000,
    log: true
  });
}

main().catch(error => {
  core.setFailed(error.message);
});
