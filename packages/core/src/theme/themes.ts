import { toVarNames } from "./utils";

export const themes = {
  light: {
    colors: {
      primary: "deeppink",
      background: "white",
    },
  },
  dark: {
    colors: {
      primary: "lightpink",
      background: "black",
    },
  },
};

export const themeVars = toVarNames(themes.light);
