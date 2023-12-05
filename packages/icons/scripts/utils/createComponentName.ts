import path from "path";

/**
 * Convert a string from snake case to camel case
 */
function snakeToCamel(s: string) {
  return s.replace(/(-\w)/g, (m) => m[1].toUpperCase());
}

/**
 * Creates a standardized component name from a given file and filename
 */
export const createComponentName = (file: string, fileName: string) => {
  let componentNamePrep;

  if (fileName.indexOf("-") !== -1) {
    componentNamePrep = snakeToCamel(path.basename(file, ".svg"));
  } else {
    componentNamePrep = path.basename(file, ".svg");
  }
  const componentNameArr = componentNamePrep.split("");
  componentNameArr[0] = componentNameArr[0].toUpperCase();
  return componentNameArr.join("");
};
