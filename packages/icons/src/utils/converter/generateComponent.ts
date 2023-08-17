import { isSemantic, isXS, isSelector } from "../../../lib/utils";

const replaceColorsWithTheme = (defaultPalette, themePalette) => {
  let result = defaultPalette;
  const paletteArray = defaultPalette.split(",");
  Object.keys(themePalette).forEach((categoryName) => {
    const categoryObject = themePalette[categoryName];
    Object.keys(categoryObject).forEach((themeColorName) => {
      paletteArray.forEach((defaultColor) => {
        const themeColor = `"${categoryObject[themeColorName]}"`;
        if (themeColor === defaultColor.toUpperCase()) {
          result = defaultPalette.replace(
            `${defaultColor}`,
            `theme.colors.${themeColorName}`
          );
        }
      });
    });
  });
  return result;
};

/**
 * Creates a full component string based upon provided svg data and a component name
 * @return The parsed component string
 */
export const generateComponent = (
  { svgOutput, iconName, colors, defaultSizes, basePath = ".." },
  lightPalette
) => {
  const whiteColor = isSelector(iconName) ? "atmo1" : "acce0";

  const themedPalette = colors
    .replace(/"#414141"/g, "theme.colors.secondary")
    .replace(/"#fff"/g, `theme.colors.${whiteColor}`)
    .replace(/"#f0f0f0"/g, "theme.colors.atmo2")
    .replace(/"#ccced0"/g, "theme.colors.atmo4");
  const palette = replaceColorsWithTheme(themedPalette, lightPalette);

  return `
import { theme } from "@hitachivantara/uikit-styles";
import { IconBase, IconBaseProps, useIconSize } from "${basePath}/IconBase";

export const ${iconName} = ({
  iconSize = "${isXS(iconName) ? "XS" : "S"}",
  viewbox = "${defaultSizes.viewBoxRegexp.join(" ")}",
  height,
  width,
  svgProps,
  ...others
}: IconBaseProps) => {
  const size = useIconSize(iconSize, height, width, ${isSemantic(iconName)});

  return (
    <IconBase iconSize={iconSize} data-name="${iconName}" palette={[${palette}]} {...others}>
    ${svgOutput.replace("{...other}", "focusable={false} {...svgProps}")}
    </IconBase>
)};
`;
};
