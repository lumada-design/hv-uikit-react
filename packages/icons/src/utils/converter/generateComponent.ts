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
 * @param  string svgOutput -The svg data, preformatted
 * @param  string componentName - The name of the component without extension
 * @param  string colors - The defaults value of colors to add to the component
 * @return string The parsed component string
 */
export const generateComponent = (
  {
    svgOutput,
    componentName,
    colors,
    defaultSizes,
    iconBasePath = "../IconBase",
  },
  lightPalette
) => {
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

  const themedPalette = colors
    .replace(/"#414141"/g, "theme.colors.secondary")
    .replace(/"#fff"/g, `theme.colors.${isSelector ? "atmo1" : "acce0"}`)
    .replace(/"#f0f0f0"/g, "theme.colors.atmo2")
    .replace(/"#ccced0"/g, "theme.colors.atmo4");
  const palette = replaceColorsWithTheme(themedPalette, lightPalette);

  return `
import { theme } from "@hitachivantara/uikit-styles";
import { IconBase, IconBaseProps, useIconColor, useIconSize } from "${iconBasePath}";

export const ${componentName} = ({
  color,
  iconSize = "${hasSpecialSizeXS ? "XS" : "S"}",
  viewbox = "${defaultSizes.viewBoxRegexp.join(" ")}",
  height,
  width,
  semantic,
  inverted = false,
  svgProps,
  ...others
}: IconBaseProps) => {
  const colorArray = useIconColor(color, semantic, inverted, [${palette}]);
  const size = useIconSize(iconSize, height, width, ${hasSpecialSize});

  return (
    <IconBase iconSize={iconSize} name="${componentName}" {...others}>
    ${svgOutput.replace("{...other}", "focusable={false} {...svgProps}")}
    </IconBase>
)};
`;
};
