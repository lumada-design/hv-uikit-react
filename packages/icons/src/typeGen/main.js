const fs = require("fs");
const path = require("path");
const yargs = require("yargs"); // argumen reader

const moduleRoot = "@hv/uikit-react-icons/dist";
const iconBasePath = `${__dirname}/IconBase.d.ts`;
const jsRe = /\.js$/;

function main() {
  const args = yargs // reading arguments from the command line
    .option("output", { alias: "o" })
    .option("input", { alias: "i" }).argv;

  if (!fs.existsSync(args.input)) {
    error(`${args.input} does not exists`);
    return;
  }
  if (!fs.existsSync(args.output)) {
    fs.mkdirSync(args.output, { recursive: true });
  }
  generate(moduleRoot, args.input, args.output);
}

function generate(module, input, output, fileSuffix = "") {
  var text = !fileSuffix ? fs.readFileSync(iconBasePath, "utf-8") + "\n" : "";
  fs.readdirSync(input).forEach(f => {
    var fpath = path.join(input, f);
    if (isDirectory(fpath)) {
      generate(module + `/${f}`, fpath, output, f);
    } else if (f.match(jsRe)) {
      const className = f.replace(jsRe, "").replace(/[^a-zA-Z0-9]/g, "_");
      if (className == "index") {
        return;
      }
      text += `declare module '${module}/${f.replace(jsRe, "")}' {\n`;
      text += "  import { IconBase } from '@hv/uikit-react-icons/dist'\n";
      text += `  export default class ${className} extends IconBase {}\n`;
      text += "}\n";
    }
  });
  if (text) {
    fs.writeFileSync(path.join(output, `Icons${fileSuffix ? `_${fileSuffix}` : ""}.d.ts`), text);
  }
}

function error(s) {
  console.error(s);
  throw new Error(s);
}

function isDirectory(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch (e) {
    console.error(`cannot access ${p}.`);
    process.exit(-1);
  }
}

main();
