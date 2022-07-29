const dawnTheme = require("../../../themes/src/dawn.json");

const replaceColorsWithTheme = (defaultPalette, themePalette) => {
  let result = defaultPalette;
  const paletteArray = defaultPalette.split(",");
  Object.keys(themePalette).forEach((categoryName) => {
    const categoryObject = themePalette[categoryName];
    Object.keys(categoryObject).forEach((themeColorName) => {
      paletteArray.forEach((defaultColor) => {
        const themeColor = `"${categoryObject[themeColorName]}"`;
        if (themeColor === defaultColor.toUpperCase()) {
          result = defaultPalette.replace(`${defaultColor}`, `theme.palette.${themeColorName}`);
        }
      });
    });
  });
  return result;
};

/**
 * Creates a full component string based upon provided svg data and a component name
 * @param  string svgOutput -The svg data, preformatted
 * @param  string componentName - The name of the component without extension
 * @param  string colors - The defaults value of colors to add to the component
 * @return string The parsed component string
 */
module.exports = ({
  svgOutput,
  componentName,
  colors,
  defaultSizes,
  iconBasePath = "./IconBase",
}) => {
  const themePalette = dawnTheme.palette;

  const selectors = ["Checkbox", "RadioButton"];
  const isSelector = selectors.some((el) => componentName.startsWith(el));
  const largerIcons = [
    "Level0Good",
    "Level1",
    "Level2Average",
    "Level3Bad",
    "Level4",
    "Level5",
    "Canceled",
    "Running",
    "Pending",
  ];
  const hasSpecialSize = largerIcons.includes(componentName);

  const hasSpecialSizeXS = componentName.endsWith("XS");
  const calcSize = (size) => (hasSpecialSize ? size + 8 : size);

  const themedPalette = colors
    .replace(/"#414141"/g, "theme.palette.acce1")
    .replace(/"#fff"/g, `theme.palette.${isSelector ? "atmo1" : "acce0"}`);
  const palette = replaceColorsWithTheme(themedPalette, themePalette);

  return `
import React from "react";
import { useTheme } from '@mui/styles';
import HvIconBase from "${iconBasePath}";

const sizeSelector = (iconSize, height, width) => {
  if (height && width) {
    return { width, height };
  }

  switch (iconSize) {
    case "XS":
      return { width: ${calcSize(12)}, height: ${calcSize(12)} };
    default:
    case "S":
      return { width: ${calcSize(16)}, height: ${calcSize(16)} };
    case "M":
      return { width: ${calcSize(32)}, height: ${calcSize(32)} };
    case "L":
      return { width: ${calcSize(96)}, height: ${calcSize(96)} };
  }
};

const ${componentName} = ({
  color,
  iconSize = "${hasSpecialSizeXS ? "XS" : "S"}",
  viewbox = "${defaultSizes.viewBoxRegexp.join(" ")}",
  height,
  width,
  semantic,
  inverted = false,
  svgProps,
  ...others
}) => {
  const theme = useTheme();
  const getColor = c => theme?.palette?.[c] || c;
  const colorArray = 
    (typeof color === "string" && [getColor(color)]) ||
    (Array.isArray(color) && color.map?.(getColor)) ||
    [${palette}];

  if (semantic) {
    colorArray[0] = theme.palette?.[semantic] || colorArray[0];
  }

  if (inverted && colorArray[1]) {
    colorArray[1] = colorArray[0];
    colorArray[0] = "none";
  }

  const size = sizeSelector(iconSize, height, width);

  return (
    <HvIconBase name="${componentName}" iconSize={iconSize ?? "S"} {...others}>
      ${svgOutput.replace("{...other}", "focusable={false} {...svgProps}")}
    </HvIconBase>
)};

${componentName}.propTypes = HvIconBase.propTypes;

export default ${componentName};`;
};
