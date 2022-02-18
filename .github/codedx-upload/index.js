const core = require("@actions/core");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const checkName = `OWASP Dep Check for uikit (${new Date().getTime()})`;

const projectNameJson = {
  name: checkName,
};

const filePath = path.join(process.env.GITHUB_WORKSPACE, core.getInput("file"));
const key = core.getInput("key");
const serverUrl = core.getInput("serverUrl");
const projectId = core.getInput("projectId");

const monitorAnalysis = async (analysisId) => {
  const intervalId = setInterval(async () => {
    core.info(`Checking Analysis ${analysisId}...`);

    try {
      const { data } = await axios.get(
        `${serverUrl}/codedx/api/projects/${projectId}/analyses/${analysisId}`,
        {
          headers: {
            Authorization: `Bearer ${key}`,
          },
        }
      );

      if (data.state === "complete") {
        core.info(`CodeDx Analysis finished`);
        clearInterval(intervalId);
      }
    } catch (error) {
      core.error(`Error checking analysis ${analysisId}`);
      core.setFailed(error.message);
    }
  }, 1000);
};

async function main() {
  let fileExists = false;
  let output = "";
  const execOptions = {
    listeners: {
      stdout: (data) => {
        output += data.toString();
      },
    },
  };

  try {
    fileExists = fs.existsSync(filePath);
  } catch (error) {
    core.error(`Error reading file ${filePath}. It does not exist or it is unaccessible`);
    core.setFailed(error.message);
  }

  core.info(`File exists, uploading to CodeDx server...`);

  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));

  axios
    .post(`${serverUrl}/codedx/api/projects/${projectId}/analysis`, form, {
      headers: {
        Authorization: `Bearer ${key}`,
        ...form.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })
    .then(({ data: { analysisId } }) => {
      core.info(`Upload ${filePath} content finished`);
      core.info(`Rename analysis ${analysisId}`);

      axios
        .put(
          `${serverUrl}/codedx/api/projects/${projectId}/analyses/${analysisId}`,
          projectNameJson,
          {
            headers: {
              Authorization: `Bearer ${key}`,
            },
          }
        )
        .then(async () => {
          core.info(`CodeDx Analysis labeled ${checkName}`);
          monitorAnalysis(analysisId);
        })
        .catch((error) => {
          core.error(`Error labeling analysis ${analysisId}`);
          core.setFailed(error.message);
        });
    })
    .catch((error) => {
      core.error(`Error trying to upload file ${filePath}`);
      core.setFailed(error.message);
    });
}

main();
