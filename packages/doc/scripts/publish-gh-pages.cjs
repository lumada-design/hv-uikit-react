#!/usr/bin/env node

/*
 * Copyright 2020 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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

const getBranchName = async (options) => {
  const { stdout } = await exec("git symbolic-ref --short HEAD", {
    ...options,
  });
  return stdout.trim();
};

const getLastCommit = async (options) => {
  const { stdout } = await exec("git log -1 --pretty=%B", { ...options });
  return `docs: storybook for ${stdout.trim()}`;
};

Promise.all([
  getParameter("remote", "origin"),
  getParameter("branch", "gh-pages"),
  getParameter("folder", getBranchName),
  getParameter("message", getLastCommit),
  getParameter("tag"),
])
  .then(([remote, branch, dest, message, tag]) => {
    ghpages.publish("dist", {
      remote,
      branch,
      dest,
      message,
      tag,
      user: {
        name: "buildguy",
        email: "buildguy.pentaho@hitachivantara.com",
      },
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });
