/*
 * Copyright 2019 Hitachi Vantara Corporation
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

const path = require("path");
const fs = require("fs-extra");
const read = require("fs-readdir-recursive");
const chalk = require("chalk");
const Input = require("prompt-input");

const TAMPLATE_PATH = path.resolve(__dirname, "templates");
const LAB_PATH = path.resolve(__dirname, "../packages/lab/src");
const STORY_PATH = path.resolve(__dirname, "../packages/doc/stories/3-lab");
const SAMPLE_PATH = path.resolve(__dirname, "../packages/doc/samples/lab");

console.log(chalk.green("UIKit component generator:"));

const input = new Input({
  message: "What is your component name?"
});

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
    .replace(/Component/g, name)
    .replace(/component/g, name.toLowerCase());

  // replace dist path name
  const replacedPath = distPath
    .replace(/Component/g, name)
    .replace(/component/g, name.toLowerCase());

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
const createComponent = name => {
  const srcDir = `${TAMPLATE_PATH}/component`;
  const distDir = `${LAB_PATH}/${name}`;

  const exists = fs.pathExistsSync(distDir);
  if (exists) throw console.log(chalk.red(`Component ${name} already exists!`));

  console.log(chalk.blue(`...creating ${name} component.`));

  // read component files recursively
  const files = read(srcDir);

  files.map(file => {
    const srcPath = `${srcDir}/${file}`;
    const distPath = `${distDir}/${file}`;

    writeFile(name, srcPath, distPath, file);
  });
};

/**
 *  Copy story template to dist path
 *  and replaces data with the story name.
 *
 * @param {String} name - the name of the story to create.
 */
const createStory = name => {
  const storyName = name.toLowerCase();
  const srcPath = `${TAMPLATE_PATH}/story.js`;
  const distPath = `${STORY_PATH}/${storyName}.js`;
  const exists = fs.pathExistsSync(distPath);

  if (exists)
    throw console.log(chalk.red(`Story ${storyName} already exists!`));

  console.log(chalk.blue(`...creating ${storyName} story.`));

  writeFile(name, srcPath, distPath);
};

/**
 *  Copy sample template to dist path
 *  and replaces data with the sample name.
 *
 * @param {String} name - the name of the sample to create.
 */
const createSample = name => {
  const sampleName = name.toLowerCase();
  const srcPath = `${TAMPLATE_PATH}/sample.js`;
  const distPath = `${SAMPLE_PATH}/${sampleName}/sample.js`;
  const exists = fs.pathExistsSync(distPath);

  if (exists)
    throw console.log(chalk.red(`Sample ${sampleName} already exists!`));

  console.log(chalk.blue(`...creating ${sampleName} sample.`));

  writeFile(name, srcPath, distPath);
};

input.ask(answer => {
  const name = answer.charAt(0).toUpperCase() + answer.slice(1);

  createComponent(name);
  createStory(name);
  createSample(name);

  console.log(chalk.green(`${name} created!`));
});
