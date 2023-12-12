/**
 * Creates a full component string based upon provided svg data and a component name
 * @return content of the `<svg>` as a `<symbol>` with `componentName` as the `id`
 */
export const generateSymbol = (svgOutput: string, componentName: string) => {
  return svgOutput
    .replace(/<svg/, `<symbol id="${componentName}"`)
    .replace(/\n<\/svg>/, `</symbol>`)
    .replace(/\n/g, "")
    .replace(/ {2,}/g, " ");
};
