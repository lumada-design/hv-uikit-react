const core = require("@actions/core");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const filePath = path.join(process.env.GITHUB_WORKSPACE, core.getInput("file"));
const key = core.getInput("key");
const serverUrl = core.getInput("serverUrl");
const projectId = core.getInput("projectId");
const projectName = core.getInput("projectName");
const branchName = core.getInput("branchName");

const checkName = `OWASP Dep Check for ${projectName} (${new Date().getTime()})`;

const projectNameJson = {
  name: checkName,
};

const authorizationHeaders = {
  headers: {
    Authorization: `Bearer ${key}`,
  },
};

const monitorAnalysis = (analysisId) =>
  new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      core.info(`Checking Analysis ${analysisId}...`);

      try {
        const { data } = await axios.get(
          `${serverUrl}/codedx/api/projects/${projectId}/analyses/${analysisId}`,
          authorizationHeaders
        );

        if (data.state === "complete") {
          core.info(`CodeDx Analysis finished`);
          resolve();
          clearInterval(intervalId);
        }
      } catch (error) {
        core.error(`Error checking analysis ${analysisId}`);
        core.setFailed(error.message);
        reject();
        clearInterval(intervalId);
      }
    }, 1000);
  });

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
  form.append("branchName", branchName);
  
  const postUrl = `${serverUrl}/codedx/api/projects/${projectId}/analysis`
  
  core.info(`URL: ${postUrl}`);

  axios
    .post(`${postUrl}`, form, {
      headers: {
        ...authorizationHeaders.headers,
        ...form.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })
    .then(({ data: { analysisId, jobId } }) => {
      core.info(`Upload ${filePath} content finished`);

      axios
        .put(
          `${serverUrl}/codedx/api/projects/${projectId}/analyses/${analysisId}`,
          projectNameJson,
          authorizationHeaders
        )
        .then(async () => {
          core.info(`CodeDx Analysis labeled ${checkName}`);

          await monitorAnalysis(analysisId);
          
          axios
            .post(
              `${serverUrl}/codedx/x/projects/${projectId};branch=${branchName}/findings/count`,
              {
                filter: {
                  "status:filter": ["1", "6", "10"], // new, unresolved and reopened states
                },
                globalConfig: {
                  ignoreArchived: false,
                },
              },
              authorizationHeaders
            )
            .then(({ data: { count } }) => {
              if (count === 0) {
                core.info(`CodeDx Analysis finished, no security vulnerabilities were found`);
              } else {
                core.setFailed(
                  `CodeDx reports ${count} vulnerabilities not triaged, please triage them in first.`
                );
              }
            })
            .catch((error) => {
              core.error(`Error identifying potential vulnerabilities`);
              core.setFailed(error.message);
            });
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
