/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";

import yargs from "yargs";
import recursive from "recursive-readdir";

import { formatSVG, generateSymbol } from "./utils/converter";
import { extractColors, replaceFill } from "./utils/colors";

// Argument setup
const args = yargs // reading arguments from the command line
  .option("format", { default: true })
  .option("output", { alias: "o" })
  .option("input", { alias: "i" }).argv as any;

// Resolve arguments
const firstArg = args._[0];
const inputPath = args.input as string;
const { format } = args;
const outputPath = args.output as string;

const outputFolder = outputPath
  ? path.resolve(process.cwd(), outputPath)
  : path.resolve(process.cwd());

/**
 * Recursively get all SVG file paths in a directory, grouped by sub-folder name.
 * @param dirPath The path to the directory to search.
 * @returns A Promise that resolves with an object that maps each sub-folder name to an array of SVG file paths.
 */
async function getSvgPathsByGroup(
  dirPath: string
): Promise<{ [key: string]: string[] }> {
  const svgPathsByGroup: { [key: string]: string[] } = {};
  const files = await recursive(dirPath);
  for (const file of files) {
    if (path.extname(file) === ".svg") {
      const folderName = path.dirname(file);
      const groupName =
        folderName === dirPath ? "icons" : path.basename(folderName);
      if (!svgPathsByGroup[groupName]) {
        svgPathsByGroup[groupName] = [];
      }
      svgPathsByGroup[groupName].push(file);
    }
  }
  return svgPathsByGroup;
}

// Create the output directory if it doesn't exist
fs.mkdir(outputFolder, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

// Create a sprite for each group of SVG files
(async () => {
  const svgPathsByGroup =
    firstArg === "dir"
      ? await getSvgPathsByGroup(inputPath)
      : { icons: [inputPath] };

  for (const groupName in svgPathsByGroup) {
    if (Object.prototype.hasOwnProperty.call(svgPathsByGroup, groupName)) {
      const svgPaths = svgPathsByGroup[groupName];
      const symbolsSvgPath = path.resolve(
        process.cwd(),
        outputPath,
        `${groupName}.svg`
      );
      const spriteStream = fs.createWriteStream(symbolsSvgPath, {
        flags: args.force ? "w" : "wx",
      });
      spriteStream.on("error", (err) => {
        if (err.message.includes("EEXIST")) {
          console.error(
            `Output file ${symbolsSvgPath} already exists. Use the force (--force) flag to overwrite the existing files`
          );
        } else {
          console.error(err);
        }
      });
      spriteStream.on("open", () => {
        spriteStream.write(
          `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" viewBox="0 0 0 0">\n`
        );

        for (const svgPath of svgPaths) {
          let svgData = fs.readFileSync(svgPath, "utf8");

          svgData = svgData
            .replace('fill="none"', "")
            .replace('style="isolation:isolate"', "")
            .replace('="">', ">");

          // Format / Prettify JSX
          if (format) {
            svgData = formatSVG(svgData);
          }
          const colorObject = extractColors(svgData);
          const svgWithCssVars = replaceFill(svgData, colorObject);
          const symbol = generateSymbol(
            svgWithCssVars,
            path.basename(svgPath, ".svg")
          );
          spriteStream.write(symbol);
          spriteStream.write("\n");
        }
        spriteStream.write("</svg>");
        spriteStream.end(() => {
          spriteStream.close();
        });
      });
    }
  }
})();
