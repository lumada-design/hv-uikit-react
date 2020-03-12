/* eslint-disable no-console */
const path = require("path");
const fse = require("fs-extra");
const glob = require("glob");

const packagePath = process.cwd();
const buildPath = path.join(packagePath, "./dist");
const srcPath = path.join(packagePath, "./src");

function generateLicenseHeader() {
  const date = new Date();

  return (
    "/*\n" +
    ` * Copyright ${date.getUTCFullYear()} Hitachi Vantara Corporation\n` +
    " *\n" +
    ' * Licensed under the Apache License, Version 2.0 (the "License");\n' +
    " * you may not use this file except in compliance with the License.\n" +
    " * You may obtain a copy of the License at\n" +
    " * \n" +
    " *    http://www.apache.org/licenses/LICENSE-2.0\n" +
    " * \n" +
    " * Unless required by applicable law or agreed to in writing, software\n" +
    ' * distributed under the License is distributed on an "AS IS" BASIS,\n' +
    " * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n" +
    " * See the License for the specific language governing permissions and\n" +
    " * limitations under the License.\n" +
    " */\n\n"
  );
}

async function includeFileInBuild(file) {
  const sourcePath = path.resolve(packagePath, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  await fse.copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

/**
 * Puts a package.json into every immediate child directory of rootDir.
 * That package.json contains information about esm for bundlers so that imports
 * like import Typography from '@material-ui/core/Typography' are tree-shakeable.
 *
 * It also tests that an this import can be used in typescript by checking
 * if an index.d.ts is present at that path.
 *
 * @param {string} rootDir
 */
async function createModulePackages({ from, to }) {
  const directoryPackages = glob
    .sync("*/index.js", { cwd: from })
    .map(path.dirname);

  await Promise.all(
    directoryPackages.map(async directoryPackage => {
      const packageJson = {
        sideEffects: false,
        module: path.join("../esm", directoryPackage, "index.js"),
        typings: "./index.d.ts"
      };
      const packageJsonPath = path.join(to, directoryPackage, "package.json");

      const [typingsExist] = await Promise.all([
        fse.exists(path.join(to, directoryPackage, "index.d.ts")),
        fse.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
      ]);

      if (!typingsExist) {
        // new Error(`index.d.ts for ${directoryPackage} is missing`);
        console.log(`index.d.ts for ${directoryPackage} is missing`);
      }

      return packageJsonPath;
    })
  );
}

async function typescriptCopy({ from, to }) {
  if (!(await fse.exists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = glob.sync("**/*.d.ts", { cwd: from });
  const cmds = files.map(file =>
    fse.copy(path.resolve(from, file), path.resolve(to, file))
  );
  return Promise.all(cmds);
}

async function resourcesCopy({ from, to }) {
  if (!(await fse.exists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = glob.sync("**/*.svg", { cwd: from });
  const cmds = files.map(file =>
    fse.copy(path.resolve(from, file), path.resolve(to, file))
  );
  return Promise.all(cmds);
}

async function createPackageFile() {
  const packageData = await fse.readFile(
    path.resolve(packagePath, "./package.json"),
    "utf8"
  );
  const {
    nyc,
    scripts,
    devDependencies,
    workspaces,
    ...packageDataOther
  } = JSON.parse(packageData);
  const newPackageData = {
    ...packageDataOther,
    private: false,
    main: "./dist/index.js",
    module: "./dist/esm/index.js",
    typings: "./dist/index.d.ts"
  };
  const targetPath = path.resolve(buildPath, "./package.json");

  await fse.writeFile(
    targetPath,
    JSON.stringify(newPackageData, null, 2),
    "utf8"
  );
  console.log(`Created package.json in ${targetPath}`);

  return newPackageData;
}

async function prepend(file, string) {
  const data = await fse.readFile(file, "utf8");
  await fse.writeFile(file, string + data, "utf8");
}

async function addLicense() {
  const license = generateLicenseHeader();

  await Promise.all(
    ["./index.js", "./esm/index.js"].map(async file => {
      try {
        await prepend(path.resolve(buildPath, file), license);
      } catch (err) {
        if (err.code === "ENOENT") {
          console.log(`Skipped license for ${file}`);
        } else {
          throw err;
        }
      }
    })
  );
}

async function run() {
  try {
    await createPackageFile();

    await Promise.all(
      [
        // use enhanced readme from workspace root for `@material-ui/core`
        "./README.md",
        "./CHANGELOG.md",
        "../../LICENSE.txt"
      ].map(file => includeFileInBuild(file))
    );

    await addLicense();

    // TypeScript and resources
    await typescriptCopy({ from: srcPath, to: buildPath });
    await resourcesCopy({ from: srcPath, to: buildPath });
    await resourcesCopy({ from: srcPath, to: `${buildPath}/es` });
    await resourcesCopy({ from: srcPath, to: `${buildPath}/esm` });

    await createModulePackages({ from: srcPath, to: buildPath });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
