import * as tokens from "./tokens";
import { mapCSSVars } from "./utils";

const componentsSpec = {
  dropdown: {
    borderRadius: "string",
  },
  header: {
    height: "string",
    borderTop: "string",
  },
};

export const themeVars = mapCSSVars({
  ...tokens,
  colors: { ...tokens.colors.common, ...tokens.colors.light }, // flatten colors
  ...componentsSpec,
});
