const dawnTheme = require("@hv/uikit-common-themes/dist/dawn");

const replaceColorsWithTheme = (defaultPalette, themePalette) => {
  let result = defaultPalette;
  const paletteArray = defaultPalette.split(",");
  Object.keys(themePalette).forEach(categoryName => {
    const categoryObject = themePalette[categoryName];
    Object.keys(categoryObject).forEach(themeColorName => {
      paletteArray.forEach(defaultColor => {
        const themeColor = `"${categoryObject[themeColorName]}"`;
        if (themeColor === defaultColor.toUpperCase()) {
          result = defaultPalette.replace(
            `${defaultColor}`,
            `theme.palette.${themeColorName}`
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
module.exports = ({ svgOutput, componentName, colors, defaultSizes }) => {
  const themePalette = dawnTheme.palette;

  const selectors = ["Checkbox", "RadioButton"];
  const isSelector = selectors.some(el => componentName.startsWith(el));
  const hasSpecialSize = /^Level(\d)/g.test(componentName);
  const specialCaseXS = componentName.endsWith("XS");
  const calcSize = size => (hasSpecialSize ? size + 8 : size);
  const USE_DS_SPECS = true;

  const themedPalette = colors
    .replace(/"#414141"/g, "theme.palette.acce1")
    .replace(/"#fff"/g, `theme.palette.${isSelector ? "atmo1" : "acce0"}`);
  const palette = replaceColorsWithTheme(themedPalette, themePalette);

  return `
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import withStyles from "@material-ui/core/styles/withStyles";
import useTheme from "@material-ui/core/styles/useTheme";

const X_SMALL = "${calcSize(12)}px";
const X_SMALL_BOX = "${USE_DS_SPECS ? 32 : calcSize(12)}px";
const SMALL = "${calcSize(16)}px";
const SMALL_BOX = "${USE_DS_SPECS ? 32 : calcSize(16)}px";
const MEDIUM = "${calcSize(32)}px";
const MEDIUM_BOX = "${USE_DS_SPECS ? 48 : calcSize(32)}px";
const LARGE = "${calcSize(96)}px";
const LARGE_BOX = "${USE_DS_SPECS ? 112 : calcSize(96)}px";

const sizeSelector = (iconSize, iconHeight, iconWidth) => {
  if (iconHeight && iconWidth) {
    return { width: iconWidth, height: iconHeight };
  }

  switch (iconSize) {
    case "XS":
      return { width: X_SMALL, height: X_SMALL };
    default:
    case "S":
      return { width: SMALL, height: SMALL };
    case "M":
      return { width: MEDIUM, height: MEDIUM };
    case "L":
      return { width: LARGE, height: LARGE };
  }
};

const sizeClass = (classes, iconSize) => {
  switch (iconSize) {
    case "XS":
      return classes.rootXs;
    default:
    case "S":
      return classes.rootS;
    case "M":
      return classes.rootM;
    case "L":
      return classes.rootL;
  }
};

const ${componentName} = ({
  classes,
  color,
  iconSize = "${specialCaseXS ? "XS" : "S"}",
  viewbox = "${defaultSizes.viewBoxRegexp.join(" ")}",
  height,
  width,
  semantic,
  inverted = false,
  className = "",
  boxStyles,
  style,
  ...other
}) => {
  const theme = useTheme();
  let colorArray;

  if (typeof color == "string" && theme.palette[color]) {
    colorArray = [theme.palette[color]];
  } else if (Array.isArray(color)) {
    colorArray = color.map(c => theme.palette[c] || c);
  } else {
    colorArray = [${palette}];

    if (semantic) {
      colorArray[0] = theme.palette[semantic];
    }
  }

  if (inverted && colorArray[1]) {
    colorArray[1] = colorArray[0];
    colorArray[0] = "none";
  }

  const size = sizeSelector(iconSize, height, width);
  const clx = clsx(className, classes.root, sizeClass(classes, iconSize));

  return (
    <div className={clx} style={boxStyles} {...other}>
      ${svgOutput.replace("{...other}", "style={style} focusable={false}")}
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    "& svg": {
      margin: "auto"
    }
  },
  rootXs: {
    width: X_SMALL_BOX,
    height: X_SMALL_BOX
  },
  rootS: {
    width: SMALL_BOX,
    height: SMALL_BOX
  },
  rootM: {
    width: MEDIUM_BOX,
    height: MEDIUM_BOX
  },
  rootL: {
    width: LARGE_BOX,
    height: LARGE_BOX
  }
};

${componentName}.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root component.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the root component, when it is extra small.
     */
    rootXs: PropTypes.string,
    /**
     * Styles applied to the root component, when it is small.
     */
    rootS: PropTypes.string,
    /**
     * Styles applied to the root component, when it is medium.
     */
    rootM: PropTypes.string,
    /**
     * Styles applied to the root component, when it is large.
     */
    rootL: PropTypes.string,
  }),
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A String or Array of strings representing the colors to override in the icon.
   * Each element inside the array will override a diferent color.
   * You can use either an HEX or color name from the palette.
   */
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  /**
   * A string that will override the viewbox of the svg
   */
  viewbox: PropTypes.string,
  /**
   * A string that will override the height of the svg
   */
  height: PropTypes.string,
  /**
   * A string that will override the width of the svg
   */
  width: PropTypes.string,
  /**
   * Sets one of the standard sizes of the icons
   */
  iconSize: PropTypes.oneOf(["XS","S","M","L"]),
  /**
   * Sets one of the standard semantic palette colors of the icon
   */
  semantic: PropTypes.oneOf(["sema1","sema2","sema3","sema4","sema5","sema6","sema7","sema8","sema9","sema10", "sema11","sema12","sema13","sema14","sema15","sema16","sema17","sema18","sema19"]),
  /**
   * Inverts the background-foreground on semantic icons
   */
  inverted: PropTypes.bool,
  /**
   * Styles applied to the box around the svg.
   */
  boxStyles: PropTypes.instanceOf(Object)
};

export default withStyles(styles, { name: "HvIcon${componentName}" })(${componentName});`;
};
