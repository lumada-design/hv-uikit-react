const path = require("path");
const fs = require("fs-extra");
const read = require("fs-readdir-recursive");

const TEMPLATE_PATH = path.resolve(__dirname, "templates");
const CORE_PATH = path.resolve(__dirname, "../../packages/core/src");
const LAB_PATH = path.resolve(__dirname, "../../packages/lab/src");

/* eslint-disable no-console */

/**
 *  Reads src path and writes to dist path the replaced data.
 *
 * @param {String} name - the name to replace.
 * @param {String} src - the src path of the file to read.
 * @param {String} dist - the dist path to write the replaced data.
 */
const writeFile = (name, srcPath, distPath) => {
  // read src file
  const data = fs.readFileSync(srcPath, "utf8");

  // replace src data
  const replacedData = data
    .replace(/ComponentName/g, name)
    .replace(/componentName/g, name.toLowerCase());

  // replace dist path name
  const replacedPath = distPath
    .replace(/src\/component/g, `src/${name}`)
    .replace(/ComponentName/g, name)
    .replace(/componentName/g, name.toLowerCase());

  fs.ensureFileSync(replacedPath);

  // write files with data replaced
  fs.outputFile(replacedPath, replacedData, "utf8");
};

/**
 *  Copy template component files to dist path
 *  and replaces data with the component name.
 *
 * @param {String} name - the name of the component to create.
 */
const createComponent = (name, packageName, templateName) => {
  const srcDir = `${TEMPLATE_PATH}/${templateName}`;
  const distDir = `${packageName === "core" ? CORE_PATH : LAB_PATH}/${name}`;

  const exists = fs.pathExistsSync(distDir);
  if (exists) throw console.log(`Component ${name} already exists!`);

  console.log(`Creating ${name} component...`);

  // read component files recursively
  const files = read(srcDir);

  files.forEach((file) => {
    const srcPath = `${srcDir}/${file}`;
    const distPath = `${distDir}/${file}`;

    writeFile(name, srcPath, distPath, file);
  });
};

const args = process.argv.slice(2);

const [componentName, packageName = "lab", templateName = "component"] = args;

if (componentName) {
  createComponent(componentName, packageName, templateName);
  console.log(`Component ${componentName} created successfully!`);
} else {
  console.error("ERROR: You must provide a component name.");
}
