/**
 * Based in generatePropTypes https://github.com/mui-org/material-ui/blob/v4.9.5/scripts/generateProptypes.ts
 * accommodating our propType cases, handling classes documentation, required for React.ReactNode elements and
 **/

import * as path from "path";
import * as fse from "fs-extra";
import * as ttp from "typescript-to-proptypes";
import {
  isUnionNode,
  isElementNode,
  isUndefinedNode,
  DefinitionHolder,
  isInterfaceNode,
  PropTypeNode,
} from "typescript-to-proptypes/dist";
import * as prettier from "prettier";
import * as globCallback from "glob";
import { promisify } from "util";
import * as _ from "lodash";

const glob = promisify(globCallback);

const ignoreCache = process.argv.includes("--disable-cache");
const verbose = process.argv.includes("--verbose");

enum GenerateResult {
  Success,
  Skipped,
  NoComponent,
  Failed
}

const isRequired = "@required";
const propertyRegex = /@property\s(\w*)\s*-\s(.*)/gm;

const tsconfig = ttp.loadConfig(path.resolve(__dirname, "../tsconfig.json"));

async function generateProptypes(
  tsFile: string,
  jsFile: string,
  program: ttp.ts.Program
): Promise<GenerateResult> {
  const proptypes = ttp.parseFromProgram(tsFile, program);
  const tsContent = await fse.readFile(tsFile, "utf8");

  if (proptypes.body.length === 0) {
    return GenerateResult.NoComponent;
  }
  proptypes.body.forEach(component => {
    let m;
    let classesDocs = new Map<string, string>();

    while ((m = propertyRegex.exec(tsContent)) !== null) {
      if (m.index === propertyRegex.lastIndex) {
        propertyRegex.lastIndex++;
      }
      classesDocs.set(m[1], m[2]);
    }

    component.types.forEach((prop: PropTypeNode) => {
      if (prop.name === "classes" && prop.jsDoc) {
        prop.jsDoc += "\nSee CSS API tab for more details.";
        if (tsContent.includes(`@type ${component.name}ClassKey`)) {
          const matches = tsContent.match(propertyRegex);

          if (isUnionNode(prop.propType)) {
            const props = prop.propType.types.find(type =>
              isInterfaceNode(type)
            );
            if (props) {
              (props as DefinitionHolder).types.forEach(type => {
                type.jsDoc = classesDocs.get(type.name);
              });
            }
          }
        }
      } else if (prop.name === "children" && !prop.jsDoc) {
        prop.jsDoc = "The content of the component.";
      } else if (!prop.jsDoc) {
        prop.jsDoc = "@ignore";
      } else if (prop.jsDoc.includes(isRequired)) {
        if (isUnionNode(prop.propType)) {
          const typesToCarry: ttp.Node[] = [];
          let containsElementNode = false;
          prop.propType.types.forEach((type: ttp.Node) => {
            if (!isUndefinedNode(type)) {
              typesToCarry.push(type);
              if (isElementNode(type) && type.elementType == "node") {
                containsElementNode = true;
              }
            }
          });
          if (typesToCarry.length > 0 && containsElementNode) {
            prop.propType.types = typesToCarry;
            if (prop.jsDoc.includes(`\n${isRequired}`)) {
              prop.jsDoc = prop.jsDoc.replace(`\n${isRequired}`, "");
            }
          }
        }
      }
    });
  });

  const jsContent = await fse.readFile(jsFile, "utf8");

  const result = ttp.inject(proptypes, jsContent, {
    sortProptypes: false,
    removeExistingPropTypes: true,
    shouldInclude: ({ prop }) => {
      if (prop.name === "children") {
        return true;
      }

      const documentRegExp = new RegExp(/\r?\n?@document/);
      if (prop.jsDoc && documentRegExp.test(prop.jsDoc)) {
        prop.jsDoc = prop.jsDoc.replace(documentRegExp, "");
        return true;
      }

      return undefined;
    }
  });

  if (!result) {
    return GenerateResult.Failed;
  }

  const prettified = prettier.format(result, { filepath: jsFile });

  await fse.writeFile(jsFile, prettified);
  return GenerateResult.Success;
}

async function run() {
  // Matches files where the folder and file both start with uppercase letters
  // Example: Button/Button.d.ts

  const allFiles = await Promise.all(
    [path.resolve(__dirname, "../packages/core/src")].map(folderPath =>
      glob("+([A-Z])*/+([A-Z])*.d.ts", {
        absolute: true,
        cwd: folderPath
      })
    )
  );

  const files = _.flatten(allFiles)
    // Filter out files where the directory name and filename doesn't match
    // Example: Modal/ModalManager.d.ts
    .filter(filePath => {
      const folderName = path.basename(path.dirname(filePath));
      const fileName = path.basename(filePath, ".d.ts");

      return fileName === folderName;
    });

  const program = ttp.createProgram(files, tsconfig);

  const promises = files.map<Promise<GenerateResult>>(async tsFile => {
    const jsFile = tsFile.replace(".d.ts", ".js");

    const jsFileTime = (await fse.stat(jsFile)).mtimeMs;
    const tsFileTime = (await fse.stat(tsFile)).mtimeMs;
    if (!ignoreCache && jsFileTime > tsFileTime) {
      // Javascript version is newer, skip file
      return GenerateResult.Skipped;
    }

    return generateProptypes(tsFile, jsFile, program);
  });

  const results = await Promise.all(promises);

  console.log("--- Summary ---");
  const groups = _.groupBy(results, x => x);

  _.forOwn(groups, (count, key) => {
    console.log(
      "%s: %d",
      GenerateResult[(key as unknown) as GenerateResult],
      count.length
    );
  });

  console.log("Total: %d", results.length);
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
