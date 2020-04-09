#!/usr/bin/env node
const { promisify } = require("util");
const childProcess = require("child_process");

const ghpages = require("gh-pages");

const exec = promisify(childProcess.exec);

const getBranchName = async options => {
  const { stdout } = await exec("git symbolic-ref --short HEAD", { ...options });
  return stdout.trim();
};

const getLastCommit = async options => {
  const { stdout } = await exec("git log -1 --pretty=%B", { ...options });
  return stdout.trim();
};

Promise.all([getBranchName(), getLastCommit()])
  .then(([branchName, lastCommit]) => {
    ghpages.publish("dist", {
      branch: "gh-pages",
      dest: branchName,
      message: `documentation for ${lastCommit}`
    });
  })
  .catch(err => {
    console.error(err);
  });
