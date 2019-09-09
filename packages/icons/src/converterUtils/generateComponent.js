
const dawnTheme = require("@hv/uikit-common-themes/dist/dawn");

const replaceColorsWithTheme = (defaultPalette, themePalette) => {
  let result = defaultPalette;
  const paletteArray = defaultPalette.split(",");
  Object.keys(themePalette).forEach(function(categoryName) {
    const categoryObject = themePalette[categoryName];
    Object.keys(categoryObject).forEach(function(themeColorName) {
      paletteArray.forEach(defaultColor => {
        const themeColor = `"${categoryObject[themeColorName]}"`;
        if(themeColor === defaultColor.toUpperCase()) {
          result = defaultPalette.replace(
            `${defaultColor}`,
            `theme.hv.palette.${categoryName}.${themeColorName}`
          )
        }
      })
    });
  });
  return result;
}

/**
 * Creates a full component string based upon provided svg data and a component name
 * @param  string svgOutput -The svg data, preformatted
 * @param  string componentName - The name of the component without extension
 * @param  string colorArrayDefaultValues - The defaults value of colors to add to the component
 * @return string The parsed component string
 */
module.exports = (svgOutput, componentName, colorArrayDefaultValues, defaultSizes, useGeneric) => {
  const themePalette = dawnTheme.palette

  let palette = colorArrayDefaultValues.replace(
    '"#414141"',
    "theme.hv.palette.accent.acce1"
  );
  palette = replaceColorsWithTheme(colorArrayDefaultValues, themePalette);

  const iconContainer = useGeneric ? 
    `
      <div className={classesToApply}>
        ${
          svgOutput
          .split('\n')
          .map(line => `    ${line}`)
          .join('\n')
        }
      </div>
    `
    :
      `
        ${
          svgOutput
          .split('\n')
          .map(line => `    ${line}`)
          .join('\n')
        }
      ` 

  return (
    `
    import React from 'react';
    import PropTypes from "prop-types";
    import classNames from "classnames";
    import isNil from "lodash/isNil";
    import withStyles from "@material-ui/core/styles/withStyles";

    const X_SMALL = "8px";
    const SMALL = "16px";
    const MEDIUM = "32px";
    const LARGE = "64px";
    const X_LARGE = "128px";

    const sizeSelector = (iconHeight, iconWidth, iconSize) => {

      const size = {
        width: SMALL,
        height: SMALL
      }
  
      if (!isNil(iconHeight) && !isNil(iconWidth)) {
        size.height = iconHeight;
        size.width = iconWidth;
        return size;
      }

      switch(iconSize) {
        case "XS":
          size.height = X_SMALL;
          size.width = X_SMALL;
          break;
        case "S":
          size.height = SMALL;
          size.width = SMALL;
          break;
        default:
        case "M":
          size.height = MEDIUM;
          size.width = MEDIUM;
          break;
        case "L":
          size.height = LARGE;
          size.width = LARGE;
          break;
        case "XL":
          size.height = X_LARGE;
          size.width = X_LARGE;
        break;
      }

      return size;
    }

    const getClasses = (className, iconSize, classes) => {
      switch(iconSize) {
        case "XS":
          return classNames(className, classes.rootXs);
        case "S":
          return classNames(className, classes.rootS);
        default:
        case "M":
          return classNames(className, classes.rootM);
        case "L":
          return classNames(className, classes.rootL);
        case "XL":
          return classNames(className, classes.rootXL);
      }
    }

    const ${componentName} = props => {
    
      const {classes, color, iconSize, viewbox, height, width, theme, className, ...other} = props;

      let colorArray = color;
      const size = sizeSelector(height, width, iconSize);

      if (isNil(colorArray) || colorArray.length < 1) {
        colorArray =  [${palette}];
      }

      const classesToApply = getClasses(className, iconSize, classes);

      return (
        ${iconContainer}
      );
    }
    
    ${componentName}.propTypes = {
      /**
       * A Jss Object used to override or extend the styles applied.
       */
      classes: PropTypes.shape({
        /**
         * Styles applied to the component root when it is extra small.
         */
        rootXs: PropTypes.string,
        /**
         * Styles applied to the component root when it is small.
         */
        rootS: PropTypes.string,
        /**
         * Styles applied to the component root when it is medium.
         */
        rootM: PropTypes.string,
        /**
         * Styles applied to the component root when it is large.
         */
        rootL: PropTypes.string,
        /**
         * Styles applied to the component root when it is extra large.
         */
        rootXL: PropTypes.string,
      }).isRequired,
      /**
       * Class names to be applied.
       */
      className: PropTypes.string,
      /**
       * An array of strings representing the colors to override in the icon.
       * Each element inside the array will override a diferent color.
       */
      color: PropTypes.arrayOf(PropTypes.string),
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
      iconSize: PropTypes.oneOf(["XS","S","M","L", "XL"]),
    };
    
    ${componentName}.defaultProps = {
      className: "",
      color: null,
      viewbox: "${defaultSizes.viewBoxRegexp.join(" ")} ",
      height: null,
      width: null,
      iconSize: "S"
    };

    const styles = () => ({
      rootXs: {
        height: X_SMALL,
        width: X_SMALL
      },
      rootS: {
        height: SMALL,
        width: SMALL
      },
      rootM: {
        height: MEDIUM,
        width: MEDIUM
      },
      rootL: {
        height: LARGE,
        width: LARGE
      },
      rootXL: {
        height: X_LARGE,
        width: X_LARGE
      }
    });

    export default withStyles(styles, { withTheme: true })(${componentName});`
  )
}
