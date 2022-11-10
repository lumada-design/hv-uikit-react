/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
// Vendor includes
const fs = require("fs"); // file system
const recursive = require("recursive-readdir");
const yargs = require("yargs"); // argument reader
const path = require("path"); // utilities for working with file and directory
const HTMLtoJSX = require("htmltojsx"); // converter from html to jsx
const jsdom = require("jsdom-no-contextify");

const theme = require("@hitachivantara/uikit-styles");

// Language files
const content = require("./lang/en");

// Local includes
const createComponentName = require("./fileSystemUtils/createComponentName");
const formatSVG = require("./converterUtils/formatSVG");
const generateComponent = require("./converterUtils/generateComponent");
const removeStyle = require("./converterUtils/removeStyle");
const colorExtractor = require("./colorUtils/colorExtractor");
const fillColorReplacer = require("./colorUtils/fillColorReplacer");
const sizeExtractor = require("./sizeUtils/sizeExtractor");
const sizeReplacer = require("./sizeUtils/sizeReplacer");

const printErrors = console.warn;

// Argument setup
const args = yargs // reading arguments from the command line
  .option("format", { default: true })
  .option("output", { alias: "o" })
  .option("input", { alias: "i" })
  .option("rm-style", { default: false })
  .option("force", { alias: "f", default: false }).argv;

// Resolve arguments
const firstArg = args._[0];
const secondArgs = args._[1] || "MyComponent";
const outputPath = args.output;
const inputPath = args.input;
const { rmStyle, format } = args;

// Bootstrap base variables
const converter = new HTMLtoJSX({ createClass: false }); // instantiate a the html to jsx converter
const svg = `./${firstArg}.svg`; // append the file extension

// Exit out early arguments
if (args.help) {
  console.log(content.helptext);
  process.exit(1);
}

if (args.example) {
  console.log(content.exampleText);
  process.exit(1);
}

const componentOutputFolder = outputPath
  ? path.resolve(process.cwd(), outputPath)
  : path.resolve(process.cwd());

const knownSubfolders = {};

const writeFile = (processedSVG, fileName, subFolder = ".", depth = 0) => {
  fs.mkdirSync(path.resolve(componentOutputFolder, subFolder), {
    recursive: true,
  });

  const file = path.resolve(
    componentOutputFolder,
    subFolder,
    `${fileName}.tsx`
  );

  fs.writeFile(file, processedSVG, { flag: args.force ? "w" : "wx" }, (err) => {
    if (err) {
      if (err.code === "EEXIST") {
        printErrors(
          `Output file ${file} already exists. Use the force (--force) flag to overwrite the existing files`
        );
      } else {
        printErrors(`Output file ${file} not writable ${err.code}`);
      }
    }
  });

  const exportName = fileName.split(".").join("");
  const exportString = `export { default as ${exportName} } from "./${fileName}";\n`;

  if (subFolder === ".") {
    fs.appendFile(
      path.resolve(componentOutputFolder, `icons.ts`),
      exportString,
      () => {}
    );
  } else {
    fs.appendFile(
      path.resolve(componentOutputFolder, subFolder, `index.ts`),
      exportString,
      () => {}
    );
  }

  if (!knownSubfolders[subFolder]) {
    knownSubfolders[subFolder] = true;

    if (subFolder === ".") {
      fs.appendFile(
        path.resolve(componentOutputFolder, `index.ts`),
        `\nexport * from "./icons";\n`,
        () => {}
      );
    } else {
      fs.appendFile(
        path.resolve(componentOutputFolder, subFolder, "..", `index.ts`),
        `\nexport * from "${subFolder}";\n`,
        () => {}
      );
    }
  }
};

const runUtil = (fileToRead, fileToWrite, subFolder = ".", depth = 0) => {
  fs.readFile(fileToRead, "utf8", (err, file) => {
    if (err) {
      printErrors(err);
      return;
    } // exit early

    let output = file;

    jsdom.env(output, async (_err, window) => {
      const body = window.document.getElementsByTagName("body")[0];

      if (rmStyle) {
        removeStyle(body);
      }

      // Add width and height
      // The order of precedence of how width/height is set on to an element is as follows:
      // 1st - passed in props are always priority one. This gives run time control to the container
      // 2nd - svg set width/height is second priority
      // 3rd - if no props, and no svg width/height, use the viewbox width/height as the width/height
      // 4th - if no props, svg width/height or viewbox, simlpy set it to 50px/50px
      let defaultWidth = "50px";
      let defaultHeight = "50px";
      if (body.firstChild.hasAttribute("viewBox")) {
        const [, , width, height] = body.firstChild
          .getAttribute("viewBox")
          .split(/[,\s]+/);
        defaultWidth = width;
        defaultHeight = height;
      }

      if (!body.firstChild.hasAttribute("width")) {
        body.firstChild.setAttribute("width", defaultWidth);
      }
      if (!body.firstChild.hasAttribute("height")) {
        body.firstChild.setAttribute("height", defaultHeight);
      }

      // Add generic props attribute to parent element, allowing props to be passed to the svg
      // such as className
      body.firstChild.setAttribute(":props:", "");

      // Now that we are done with manipulating the node/s we can return it back as a string
      output = body.innerHTML;

      // Convert from HTML to JSX
      output = converter.convert(output);

      // jsdom and htmltojsx will automatically (and correctly) wrap attributes in double quotes,
      // and generally just dislikes all the little markers used by react, such as the spread
      // operator. We will sub those back in manually now
      output = output.replace(/:props:/g, "{...other}");

      const sizeObject = sizeExtractor(output);
      output = sizeReplacer(output, sizeObject);

      const colorObject = colorExtractor(output);
      output = fillColorReplacer(output, colorObject);

      // regexp fill="(.*?)"

      // Format / Prettify JSX
      if (format) {
        output = formatSVG(output);
      }

      const processedFileToWrite = fileToWrite.split(".").join("");

      // Wrap it up in a React component
      const params = {
        svgOutput: output,
        componentName: processedFileToWrite,
        colors: colorObject.colorText,
        defaultSizes: sizeObject,
        iconBasePath: `${".".repeat(depth + 1)}/IconBase`,
      };

      output = generateComponent(params, theme);
      writeFile(output, fileToWrite, subFolder, depth);
    });
  });
};

const isFolder = (dirPath) =>
  fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();

const processFile = (file, subFolder = ".", depth = 0) => {
  const extension = path.extname(file); // extract extensions
  const fileName = path.basename(file); // extract file name extensions

  if (extension === ".svg") {
    // variable instantiated up top
    const componentName = createComponentName(file, fileName);
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

const runUtilForJustFilesInDir = (folder, subFolder = ".", depth = 0) => {
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
          depth + 1
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
