import path from "path";
import chalk from "chalk";
import fs from "fs-extra";
import nodePlop from "node-plop";

import { __dirname, mergeDependenciesObject, toCamelCase } from "./utils.js";

const plop = await nodePlop(`${__dirname}/plopfile.js`);

const createReadMe = plop.getGenerator("createReadMe");

const getTemplateComponents = (templatePath) => {
  const components = fs.readdirSync(templatePath);

  // return template components and filter out tests
  return components
    .filter((file) => !file.match("test"))
    .map((file) => path.join(templatePath, file))
    .filter((path) => fs.statSync(path).isDirectory());
};

const replaceTemplateImports = (templateName, templatePath) => {
  const templateToCamel = toCamelCase(templateName);
  const templateFile = `${templatePath}/${templateName}.tsx`;

  let templateData = fs.readFileSync(`${templatePath}/index.tsx`, {
    encoding: "utf-8",
  });

  // replace utils import from template file
  templateData = templateData.replace(
    `./utils`,
    `lib/utils/${templateToCamel}`,
  );

  const components = getTemplateComponents(templatePath);

  for (const component of components) {
    const componentName = component.split("/").pop();
    const componentFile = `${component}/${componentName}.tsx`;

    let componentData = fs.readFileSync(componentFile, {
      encoding: "utf-8",
    });

    // replace utils import from component file
    componentData = componentData.replace(
      `../utils`,
      `lib/utils/${templateToCamel}`,
    );

    // replace component import from template file
    templateData = templateData.replace(
      `./${componentName}`,
      `components/${templateToCamel}/${componentName}`,
    );

    // write modified component file
    fs.writeFileSync(componentFile, componentData);
  }

  // write modified template file
  fs.writeFileSync(templateFile, templateData);
};

const moveTemplateComponents = (template, templatePath, destPath) => {
  const templateToCamel = toCamelCase(template);
  const componentsDest = `${destPath}/components/${templateToCamel}`;

  // rename and move template utils file to utils folder
  const utilsExist = fs.existsSync(`${templatePath}/utils.tsx`);
  utilsExist &&
    fs.moveSync(
      `${templatePath}/utils.tsx`,
      `${destPath}/lib/utils/${templateToCamel}.tsx`,
      {
        overwrite: true,
      },
    );

  // rename and move template types definitions to types folder
  const typesExists = fs.existsSync(`${templatePath}/types.d.ts`);
  typesExists &&
    fs.moveSync(
      `${templatePath}/types.d.ts`,
      `${destPath}/types/${templateToCamel}.d.ts`,
      {
        overwrite: true,
      },
    );

  const components = getTemplateComponents(templatePath);

  for (const component of components) {
    const componentName = component.split("/").pop();

    // move template components to components folder
    fs.moveSync(component, `${componentsDest}/${componentName}`, {
      overwrite: true,
    });
  }
};

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

const copyTemplateContents = (appPath, templates, dependencies) => {
  const destPath = `${appPath}/src`;

  for (const template of templates) {
    console.log(`Creating template: ${chalk.cyan(template)}`);

    const templateSrc = `${__dirname}/templates/${template}`;
    const templateDest = `${destPath}/pages/${template}`;

    fs.copySync(templateSrc, templateDest, { overwrite: true });

    // replace template and sub components imports
    replaceTemplateImports(template, templateDest);
    // move template sub components to the right folders
    moveTemplateComponents(template, templateDest, destPath);

    mergeDependenciesObject(
      getTemplateDependencies(templateDest),
      dependencies,
    );
  }
};

const createDefaultContents = async (path, useAppShell) => {
  const createDefault = plop.getGenerator("createDefault");

  console.log(
    `No templates selected: ${chalk.cyan("Creating default contents")}`,
  );

  // create default contents from plop template
  await createDefault.runActions({ path, name: "Project", useAppShell });
};

const createReadMeFile = async (path, name) => {
  await createReadMe.runActions({
    path,
    appName: name.replace(/([a-z])([A-Z])/g, "$1 $2"),
  });
};

const createAppContents = async (
  appPath,
  name,
  templates,
  dependencies,
  useAppShell,
) => {
  console.log(`Creating ${chalk.cyan(name)} contents\n`);

  await createReadMeFile(appPath, name);

  templates?.length
    ? await copyTemplateContents(appPath, templates, dependencies)
    : await createDefaultContents(appPath, useAppShell);
};

export default createAppContents;
