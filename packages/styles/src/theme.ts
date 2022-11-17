import * as tokens from "./tokens";
import { mapCSSVars } from "./utils";

const componentsSpec = {
  dropdown: {
    borderRadius: "string",
  },
  header: {
    color: "string",
    height: "string",
    borderTopThickness: "string",
    borderTopColor: "string",
    selectedItemBorderTopColor: "string",
    selectedItemBorderTopThickness: "string",
    selectedItemBorderBottomColor: "string",
    selectedItemBorderBottomThickness: "string",
    shadow: "string",
  },
};

const themeUtils = {
  spacing: (factor: number): string =>
    `calc(${tokens.space.base} * ${factor}px)`,
};

const themeVars = mapCSSVars({
  ...tokens,
  colors: { ...tokens.colors.common, ...tokens.colors.light }, // flatten colors
  ...componentsSpec,
});

export const theme = {
  ...themeVars,
  ...themeUtils,
};
