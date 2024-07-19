/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { transform } from "@svgr/core";
import recursive from "recursive-readdir";
import yargs from "yargs";

import { generateComponent } from "./generateComponent";
import { extractColors, extractSize, replaceFill } from "./utils";

// Argument setup
const args = yargs // reading arguments from the command line
  .option("output", { alias: "o" })
  .option("input", { alias: "i" })
  .option("rm-style", { default: false }).argv as any;

// Resolve arguments
const firstArg = args._[0];
const secondArgs = args._[1] || "MyComponent";
const inputPath = args.input;
const outputPath = args.output as string;

// Bootstrap base variables
const svg = `./${firstArg}.svg`; // append the file extension

const componentOutputFolder = outputPath
  ? path.resolve(process.cwd(), outputPath)
  : path.resolve(process.cwd());

const knownSubfolders: Record<string, boolean> = {};

const transformToJsx = (svgCode: string) => {
  return transform.sync(svgCode, {
    plugins: ["@svgr/plugin-jsx"],
    jsxRuntime: "automatic",
    // we only care about the JSX part of the generated React component
    template: (vars, { tpl }) => tpl`${vars.jsx}`,
  });
};

const writeFile = (processedSVG: string, fileName: string, subFolder = ".") => {
  fs.mkdirSync(path.resolve(componentOutputFolder, subFolder), {
    recursive: true,
  });

  const file = path.resolve(
    componentOutputFolder,
    subFolder,
    `${fileName}.tsx`,
  );

  fs.writeFile(file, processedSVG, { flag: "w" }, (err) => {
    if (err) {
      console.error(`Output file ${file} not writable ${err.code}`);
    }
  });

  const exportName = fileName.split(".").join("");
  const exportString = `export { ${exportName} } from "./${fileName}";\n`;

  if (subFolder === ".") {
    fs.appendFile(
      path.resolve(componentOutputFolder, `icons.ts`),
      exportString,
      () => {},
    );
  } else {
    fs.appendFile(
      path.resolve(componentOutputFolder, subFolder, `index.ts`),
      exportString,
      () => {},
    );
  }

  if (!knownSubfolders[subFolder]) {
    knownSubfolders[subFolder] = true;

    if (subFolder === ".") {
      fs.appendFile(
        path.resolve(componentOutputFolder, `index.ts`),
        [
          `export * from "./IconBase";`,
          `export * from "./IconSprite";`,
          "\n",
          `export * from "./icons";`,
          `import * as icons from "./icons";`,
          `export { icons };`,
          "\n",
        ].join("\n"),
        () => {},
      );
    } else {
      const subFolderName = subFolder.replace("./", "");
      fs.appendFile(
        path.resolve(componentOutputFolder, subFolder, "..", `index.ts`),
        [
          `export * from "${subFolder}";`,
          `import * as ${subFolderName} from "${subFolder}";`,
          `export { ${subFolderName} };`,
          "\n",
        ].join("\n"),
        () => {},
      );
    }
  }
};

const runUtil = (
  fileToRead: string,
  iconName: string,
  subFolder = ".",
  depth = 0,
) => {
  fs.readFile(fileToRead, "utf8", (err, fileData) => {
    if (err) {
      console.error(err);
      return;
    } // exit early

    let output = transformToJsx(fileData);

    const viewBox = extractSize(output);
    const colorArray = extractColors(output);

    output = replaceFill(output, colorArray)
      // remove svg tag, keeping only the content
      .replace(/<svg.*?>(.*?)<\/svg>;/s, "$1");

    // Wrap it up in a React component
    output = generateComponent(
      output,
      iconName,
      colorArray,
      viewBox,
      `${".".repeat(depth + 1)}`,
    );
    writeFile(output, iconName, subFolder);
  });
};

const isFolder = (dirPath: string) =>
  fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();

const processFile = (file: string, subFolder = ".", depth = 0) => {
  const extension = path.extname(file);
  const fileName = path.basename(file, extension);

  if (extension === ".svg") {
    const componentName = fileName.replace(/[-.]g/, "");
    runUtil(file, componentName, subFolder, depth);
  }
};

const runUtilForAllInDir = () => {
  recursive(`${process.cwd()}/${inputPath}`, (err, files) => {
    if (err) {
      console.log(err);
      return;
    } // Get out early if not found
    files.forEach((file) => processFile(file));
  });
};

const runUtilForJustFilesInDir = (
  folder: string,
  subFolder = ".",
  depth = 0,
) => {
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.log(err);
      return;
    } // Get out early if not found

    files.forEach((file) => {
      const filePath = path.resolve(folder, file);
      if (!isFolder(filePath)) {
        processFile(filePath, subFolder, depth);
      } else {
        runUtilForJustFilesInDir(
          filePath,
          `${subFolder}/${path.basename(file)}`,
          depth + 1,
        );
      }
    });
  });
};

fs.mkdir(outputPath, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.writeFile(path.resolve(process.cwd(), outputPath, `index.ts`), "", () => {});

// Main entry point
if (firstArg === "dir") {
  if (secondArgs === "flatten") runUtilForAllInDir();
  else runUtilForJustFilesInDir(`${process.cwd()}/${inputPath}`);
} else {
  runUtil(svg, secondArgs);
}
