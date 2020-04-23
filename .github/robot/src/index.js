const core = require("@actions/core");
const exec = require("@actions/exec");
const path = require("path")

const env = process.env;

async function main() {
  const storybookURL = core.getInput("storybook-url");
  const browser = core.getInput("browser");
  const excludes = core.getInput("excludes").split("\n");
  const outputDir = path.join(
    env.GITHUB_WORKSPACE,
    core.getInput("output-dir")
  );
  const testsPath = path.join(env.GITHUB_WORKSPACE, core.getInput("path"));
  const processes = core.getInput("processes");

  const excludesArray = [];

  excludes.forEach(exclude => {
    excludesArray.push("--exclude", exclude);
  });

  const firstCommandArgs = [
    "--variable", `STORYBOOK_URL:${storybookURL}`,
    "--variable", `BROWSER:${browser}`,
    ...excludesArray,
    "--outputdir", outputDir,
    "--output", "firstRun.xml",
    "--report", "NONE",
    "--log", "NONE",
    testsPath,
  ];

  const secondCommandArgs = [
    "--rerunfailed", path.join(outputDir, "firstRun.xml"),
    "--variable", `STORYBOOK_URL:${storybookURL}`,
    "--variable", `BROWSER:${browser}`,
    "--outputdir", outputDir,
    "--output", "secondRun.xml",
    "--report", "NONE",
    "--log", "NONE",
    "--loglevel", "TRACE",
    testsPath
  ];
  
  const rebotFirstCommandArgs = [
    "--outputdir", outputDir,
    "--output", "output.xml",
    path.join(outputDir, "firstRun.xml")
  ];

  const rebotSecondCommandArgs = [
    "--outputdir", outputDir,
    "--output", "output.xml",
    "--merge",
    path.join(outputDir, "firstRun.xml"),
    path.join(outputDir, "secondRun.xml")
  ];

  let command = "robot";
  if(processes !== "") {
    command = "pabot";
    if(browser === "ie" && processes.parseInt() > 2) {
      firstCommandArgs.unshift("--processes", "2");
    } else {
      firstCommandArgs.unshift("--processes", processes);
    }
  }

  exec
    .exec(command, firstCommandArgs)
    .then(() => {
      core.info("Compiling output");
      exec.exec("rebot", rebotFirstCommandArgs);
    })
    .catch(error => {
      core.warning("First execution failed, retrying");

      exec
        .exec(command, secondCommandArgs)
        .then(() => {
          exec.exec("rebot", rebotSecondCommandArgs);
        })
        .catch(error => {
          core.warning("Second execution failed.");
          core.setFailed(error.message);
        });
    });
}

main()