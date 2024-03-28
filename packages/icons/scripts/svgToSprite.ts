/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import recursive from "recursive-readdir";
import yargs from "yargs";

import { generateSymbol } from "./generateSymbol";
import { extractColors, replaceFill } from "./utils";

// Argument setup
const args = yargs // reading arguments from the command line
  .option("output", { alias: "o" })
  .option("input", { alias: "i" }).argv as any;

// Resolve arguments
const firstArg = args._[0];
const inputPath = args.input as string;
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
  dirPath: string,
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
    if (Object.hasOwn(svgPathsByGroup, groupName)) {
      const svgPaths = svgPathsByGroup[groupName];
      const symbolsSvgPath = path.resolve(
        process.cwd(),
        outputPath,
        `${groupName}.svg`,
      );
      const spriteStream = fs.createWriteStream(symbolsSvgPath, { flags: "w" });
      spriteStream.on("error", (err) => {
        console.error(err);
      });
      spriteStream.on("open", () => {
        spriteStream.write(
          `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" viewBox="0 0 0 0">\n`,
        );

        for (const svgPath of svgPaths) {
          const svgData = fs.readFileSync(svgPath, "utf8");
          const colorObject = extractColors(svgData);
          const svgWithCssVars = replaceFill(svgData, colorObject);
          const symbol = generateSymbol(
            svgWithCssVars,
            path.basename(svgPath, ".svg"),
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
