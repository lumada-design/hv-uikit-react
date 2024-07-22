import { HvColor } from "@hitachivantara/uikit-styles";

const hexColorMap: Record<string, HvColor> = {
  "#414141": "secondary",
  "#fff": "atmo1",
  "#f0f0f0": "atmo2",
  "#ccced0": "atmo4",
};

/**
 * Creates a full component string based upon provided svg data and a component name
 * @return The parsed component string
 */
export const generateComponent = (
  svgOutput: string,
  iconName: string,
  colorArray: string[],
  viewBox: string,
  basePath = "..",
) => {
  const palette = colorArray.map((c) => `"${hexColorMap[c] || c}"`).join(",");

  return `import { createHvIcon } from "${basePath}/IconBase";

export const ${iconName} = createHvIcon(
  "${iconName}", "${viewBox}", [${palette}],
  <>${svgOutput}</>,
);
`;
};
