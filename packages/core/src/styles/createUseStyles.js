import { createUseStyles as jssCreateUseStyles } from "react-jss";

import theming from "./jss/theming";
import generateId from "./generateClassName";

const createUseStyles = (stylesOrCreator, options) => {
  return jssCreateUseStyles(stylesOrCreator, {
    theming,
    generateId,
    ...options
  });
};

export default createUseStyles;
