#!/usr/bin/env node
import fs from "fs-extra";
import chalk from "chalk";
import { Command } from "commander";

import { createCommand as create } from "./create.js";
import { __rootPath } from "./utils.js";

const pkg = JSON.parse(fs.readFileSync(`${__rootPath}/package.json`, "utf-8"));

const program = new Command();

program
  // metadata
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version)
  // commands
  .addCommand(create);

try {
  program.parse(process.argv);
} catch (error) {
  if (error) console.log(chalk.red(error));
}
