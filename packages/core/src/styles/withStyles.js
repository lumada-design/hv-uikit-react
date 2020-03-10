import { withStyles as jssWithStyles } from "react-jss";

import theming from "./jss/theming";
import generateId from "./generateClassName";

const withStyles = (stylesOrCreator, options = {}) => {
  const { withTheme = false, name, ...stylesOptions } = options;

  return jssWithStyles(stylesOrCreator, {
    theming,
    injectTheme: withTheme,
    generateId,
    ...stylesOptions
  });
};

export default withStyles;
