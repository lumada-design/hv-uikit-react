const core = require("@actions/core");
const cache = require("@actions/tool-cache");
const semver = require("semver");
const path = require("path");

const toolName = "dependency-check";

async function exec() {
  try {
    let toolPath;
    const version = core.getInput("version");

    // is this version already in our cache
    toolPath = cache.find(toolName, version);

    if (!toolPath) {
      toolPath = await downloadCLI(version);
    } else {
      core.info(`Found in cache @ ${toolPath}`);
    }

    // add tool to path for this and future actions to use
    core.addPath(path.join(toolPath, "bin"));
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function downloadCLI(version) {
  const cleanVersion = semver.clean(version) || "";
  const downloadURL = encodeURI(
    `https://github.com/jeremylong/DependencyCheck/releases/download/v${cleanVersion}/dependency-check-${cleanVersion}-release.zip`
  );
  const downloadedTool = await cache.downloadTool(downloadURL);
  const extractedTool = await cache.extractZip(downloadedTool);

  const cachedPath = await cache.cacheDir(
    path.join(extractedTool, "dependency-check"),
    "dependency-check",
    version
  );
  return cachedPath;
}

exec();
