// Vendor includes
const fs = require("fs"); // file system
const recursive = require("recursive-readdir");
const yargs = require("yargs"); // argument reader
const path = require("path"); // utilities for working with file and directory
const HTMLtoJSX = require("htmltojsx"); // converter from html to jsx
const jsdom = require("jsdom-no-contextify");

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

const writeFile = (processedSVG, fileName) => {
  const componentOutputFolder = outputPath
    ? path.resolve(process.cwd(), outputPath)
    : path.resolve(process.cwd());

  fs.mkdirSync(componentOutputFolder, { recursive: true });

  const file = path.resolve(componentOutputFolder, `${fileName}.js`);
  const fileTs = path.resolve(componentOutputFolder, `${fileName}.d.ts`);

  fs.writeFile(file, processedSVG, { flag: args.force ? "w" : "wx" }, err => {
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
  const exportStringTs = `export { default } from "./IconBase";`;

  fs.writeFile(fileTs, exportStringTs, { flag: "w" }, () => {});

  fs.appendFile(path.resolve(componentOutputFolder, `index.js`), exportString, () => {});
  fs.appendFile(path.resolve(componentOutputFolder, `index.d.ts`), exportString, () => {});
};

const runUtil = (fileToRead, fileToWrite) => {
  fs.readFile(fileToRead, "utf8", (err, file) => {
    if (err) {
      printErrors(err);
      return;
    } // exit early

    let output = file;

    jsdom.env(output, (err, window) => {
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
        const [minX, minY, width, height] = body.firstChild.getAttribute("viewBox").split(/[,\s]+/);
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
        defaultSizes: sizeObject
      };

      output = generateComponent(params);
      writeFile(output, fileToWrite);
    });
  });
};

const processFile = file => {
  const extension = path.extname(file); // extract extensions
  const fileName = path.basename(file); // extract file name extensions

  if (extension === ".svg") {
    // variable instantiated up top
    const componentName = createComponentName(file, fileName);
    runUtil(file, componentName);
  }
};

const runUtilForAllInDir = () => {
  recursive(`${process.cwd()}/${inputPath}`, (err, files) => {
    if (err) {
      return console.log(err);
    } // Get out early if not found
    files.forEach(file => processFile(file));
  });
};

const runUtilForJustFilesInDir = () => {
  const files = fs.readdir(`${process.cwd()}/${inputPath}`, (err, files) => {
    if (err) {
      return console.log(err);
    } // Get out early if not found
    files.forEach(file => {
      const filePath = path.join(`${process.cwd()}/${inputPath}`, file);
      processFile(filePath);
    });
  });
};

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

fs.mkdir(outputPath, { recursive: true }, err => {
  if (err) throw err;
});

fs.writeFile(path.resolve(process.cwd(), outputPath, `index.js`), "", () => {});
fs.writeFile(path.resolve(process.cwd(), outputPath, `index.d.ts`), "", () => {});

// Main entry point
if (firstArg === "dir") {
  if (secondArgs === "flatten") runUtilForAllInDir();
  else runUtilForJustFilesInDir();
} else {
  runUtil(svg, secondArgs);
}
