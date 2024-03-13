#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import fs from "fs-extra";

import create from "./create.js";
import { __rootPath } from "./utils.js";

const checkNode = () => {
  const currentNodeVersion = process.versions.node;
  const semver = currentNodeVersion.split(".");
  const major = Number(semver[0]);

  if (major < 16) {
    console.error(
      "You are running Node " +
        currentNodeVersion +
        ".\n" +
        "UI Kit CLI requires Node 16 or higher. \n" +
        "Please update your version of Node.",
    );
    process.exit(1);
  }
};

const startCLI = async () => {
  const pckg = JSON.parse(
    fs.readFileSync(`${__rootPath}/package.json`, "utf-8"),
  );

  const program = new Command();

  program
    // metadata
    .name(pckg.name)
    .description(pckg.description)
    .version(pckg.version)
    // commands
    .addCommand(create)
    //start
    .parse(process.argv);
};

try {
  checkNode();
  startCLI();
} catch (error) {
  error && console.log(chalk.red(error));
}
