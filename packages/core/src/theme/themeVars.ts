import * as tokens from "./tokens";
import { mapCSSVars } from "./utils";

const componentsContract = {
  dropdown: {
    borderRadius: undefined,
  },
  header: {
    height: undefined,
    borderTop: undefined,
  },
};

const componentsVars = mapCSSVars({
  ...componentsContract,
});

const tokensVars = mapCSSVars({
  ...tokens,
  colors: { ...tokens.colors.common, ...tokens.colors.light },
});

export const themeVars = { ...tokensVars, ...componentsVars };
