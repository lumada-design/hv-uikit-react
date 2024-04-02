import chalk from "chalk";
import fs from "fs-extra";
import nodePlop from "node-plop";

import { __dirname, mergeDependenciesObject } from "./utils.js";

const plop = await nodePlop(`${__dirname}/plopfile.js`);

const createReadMe = plop.getGenerator("createReadMe");

const getTemplateDependencies = (templatePath) => {
  // read and remove template dependencies.json file if exists
  const dependenciesPath = `${templatePath}/dependencies.json`;
  const dependenciesExist = fs.existsSync(dependenciesPath);
  const dependencies = dependenciesExist
    ? fs.readJsonSync(dependenciesPath)
    : {};

  fs.removeSync(dependenciesPath);

  return dependencies;
};

const copyTemplateContents = (appPath, templates) => {
  const destPath = `${appPath}/src`;

  // object for collecting extra dependencies coming from selected templates or other options
  const dependencies = {
    dependencies: {},
    devDependencies: {},
  };

  for (const template of templates) {
    console.log(`Creating template: ${chalk.cyan(template)}`);

    const templateSrc = `${__dirname}/templates/${template}`;
    const templateDest = `${destPath}/pages/${template}`;

    fs.copySync(templateSrc, templateDest, { overwrite: true });

    mergeDependenciesObject(
      getTemplateDependencies(templateDest),
      dependencies,
    );
  }

  return dependencies;
};

const createDefaultContents = async (path, useAppShell) => {
  const createDefault = plop.getGenerator("createDefault");

  console.log(
    `No templates selected: ${chalk.cyan("Creating default contents")}`,
  );

  // create default contents from plop template
  await createDefault.runActions({ path, name: "Project", useAppShell });

  return {};
};

const createReadMeFile = async (path, name) => {
  await createReadMe.runActions({
    path,
    appName: name.replace(/([a-z])([A-Z])/g, "$1 $2"),
  });
};

export const createAppContents = async (
  appPath,
  name,
  templates,
  useAppShell,
) => {
  console.log(`Creating ${chalk.cyan(name)} contents\n`);

  await createReadMeFile(appPath, name);

  return templates?.length
    ? copyTemplateContents(appPath, templates)
    : createDefaultContents(appPath, useAppShell);
};
