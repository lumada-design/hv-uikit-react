#!/usr/bin/env node
const { promisify } = require("util");
const childProcess = require("child_process");

// eslint-disable-next-line import/no-extraneous-dependencies
const ghpages = require("gh-pages");

const exec = promisify(childProcess.exec);

const getParameter = (paramName, defaultValue) => {
  const index = process.argv.indexOf(`--${paramName}`);
  let value;
  if (index > -1) {
    value = process.argv[index + 1];
  }

  if (!value) {
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  }

  return value;
};

const getBranchName = async options => {
  const { stdout } = await exec("git symbolic-ref --short HEAD", {
    ...options
  });
  return stdout.trim();
};

const getLastCommit = async options => {
  const { stdout } = await exec("git log -1 --pretty=%B", { ...options });
  return `docs: storybook for ${stdout.trim()}`;
};

Promise.all([
  getParameter("remote", "origin"),
  getParameter("branch", "gh-pages"),
  getParameter("folder", getBranchName),
  getParameter("message", getLastCommit),
  getParameter("tag")
])
  .then(([remote, branch, dest, message, tag]) => {
    ghpages.publish("dist", {
      remote,
      branch,
      dest,
      message,
      tag,
      user: {
        name: "github-actions-bot",
        email: "support+actions@github.com"
      }
    });
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err);
  });
