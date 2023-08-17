/**
 * Creates a standardized component name from a given file and filename
 */
export const extractColors = (fileData: string) => {
  const regexp = /fill="(.*?)"|fill: (.*?);/g; // find all the fills inside the component
  let matcher;

  const result = {
    colorArray: [] as string[],
    colorText: "",
  };

  do {
    matcher = regexp.exec(fileData);
    if (matcher) {
      if (
        !result.colorArray.includes(matcher[1]) &&
        !result.colorArray.includes(matcher[2])
      ) {
        if (matcher[1] !== undefined && matcher[1] !== null) {
          result.colorArray.push(matcher[1]);
        }
        if (matcher[2] !== undefined && matcher[2] !== null) {
          result.colorArray.push(matcher[2]);
        }
      }
    }
  } while (matcher);
  result.colorText = result.colorArray.map((el) => `"${el}"`).join(", ");
  return result;
};

/**
 * Extract colors from the svg to an object
 */
export const replaceFill = (fileData: string, colorObject) => {
  let result = fileData;
  colorObject.colorArray.forEach((element, index) => {
    result = result
      .split(`fill="${element}"`)
      .join(`fill="var(--color-${index})" className="color${index}" `);
  });

  return result;
};
