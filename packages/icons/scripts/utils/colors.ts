/** Creates a standardized component name from a given file and filename */
export const extractColors = (fileData: string) => {
  const regexp = /fill="(.*?)"/g; // find all the fills inside the component

  const foundColors: string[] = fileData.match(regexp) || [];
  return [...new Set(foundColors)].map((c) => c.slice(6, -1));
};

/** Extract colors from the svg to an object */
export const replaceFill = (fileData: string, colorArray: string[]) => {
  let result = fileData;
  colorArray.forEach((element, index) => {
    result = result
      .split(`fill="${element}"`)
      .join(`fill="var(--color-${index})" className="color${index}" `);
  });

  return result;
};
