import chalk from "chalk";
import fs from "fs-extra";
import nodePlop from "node-plop";

import { __dirname } from "./utils.js";

const plop = await nodePlop(`${__dirname}/plopfile.js`);

const createAppShellIndexHtml = plop.getGenerator("createAppShellIndexHtml");
const createAppShellConfig = plop.getGenerator("createAppShellConfig");
const createAppShellViteConfig = plop.getGenerator("createAppShellViteConfig");

const createAppShellIndexHtmlFile = async (path, name) => {
  await createAppShellIndexHtml.runActions({
    path,
    appName: name.replace(/([a-z])([A-Z])/g, "$1 $2"),
  });
};

const createAppShellConfigFile = async (
  path,
  name,
  appShellFeatures = [],
  viteOptionsAppShell = {},
) => {
  const pagesPath = `${path}/src/pages`;
  const pages = fs.readdirSync(pagesPath);

  const templatePages = pages.map((page) => ({
    path,
    pagesPath: "pages",
    name: page,
    pageName: page.replace(/([a-z])([A-Z])/g, "$1 $2"),
  }));

  const appShellFeatMap = {
    AppSwitcher: {
      bundle: "@hv/app-switcher-client/toggle.js",
      config:
        '{ title: "Apps",\n\t\t\t\t\t\t\t\t\tapps: [\n\t\t\t\t\t\t\t\t\t\t{ label: "App 1", description: "Application 1", url: "#", target: "NEW" },\n\t\t\t\t\t\t\t\t\t\t{ label: "App 2", description: "Application 2", url: "#", target: "SELF", icon: { iconType: "uikit", name: "Warehouse" } }\n\t\t\t\t\t\t\t\t\t]}',
    },
    ColorModeSwitcher: {
      bundle: "@hv/theming-client/colorModeSwitcher.js",
    },
    HelpLink: {
      bundle: "@hv/help-client/button.js",
      config:
        '{ url: "https://www.hitachivantara.com/", description: "Hitachi Vantara Help Link" }',
    },
  };

  const appShellFeats = appShellFeatures
    .map((feat) => appShellFeatMap[feat])
    .filter(Boolean);

  await createAppShellConfig.runActions({
    path,
    appName: name.replace(/([a-z])([A-Z])/g, "$1 $2"),
    pages: templatePages,
    feats: appShellFeats,
    viteOptionsAppShell,
  });
};

const createAppShellViteConfigFile = async (path, viteOptionsAppShell) => {
  const pagesPath = `${path}/src/pages`;
  const pages = fs.readdirSync(pagesPath);

  const templatePages = pages.map((page) => ({
    path,
    pagesPath: "src/pages",
    name: page,
  }));

  await createAppShellViteConfig.runActions({
    path,
    pages: templatePages,
    viteOptionsAppShell,
  });
};

export const createAppShellBaseline = async (appPath) => {
  const basePath = `${__dirname}/baselines/app-shell/vite`;

  console.log(`\nCreating a new App Shell app in\n${chalk.green(appPath)}\n`);

  // copy baseline contents
  fs.copySync(basePath, appPath, { overwrite: true });
  fs.moveSync(`${appPath}/_gitignore`, `${appPath}/.gitignore`);
  fs.moveSync(`${appPath}/_package.json`, `${appPath}/package.json`);
};

export const setupAppShell = async (
  appPath,
  name,
  appShellFeatures,
  viteOptionsAppShell,
  packageName,
) => {
  console.log(`\nConfiguring App Shell environment\n`);

  // use our index.html (without favicon and similar stuff)
  await createAppShellIndexHtmlFile(appPath, name);

  // generate app shell config file
  await createAppShellConfigFile(
    appPath,
    name,
    appShellFeatures,
    viteOptionsAppShell,
  );

  // generate app shell vite config file
  await createAppShellViteConfigFile(appPath, viteOptionsAppShell);

  // replace package name in i18n.ts file
  const i18nFile = `${appPath}/src/lib/i18n.ts`;
  const i18nData = fs.readFileSync(i18nFile, { encoding: "utf-8" });
  const i18nUpdated = i18nData.replace("uikit-app", packageName);
  fs.writeFileSync(i18nFile, i18nUpdated);
};
