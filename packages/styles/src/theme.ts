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

  breakpoints: {
    up: (key: string) => {
      const value =
        typeof tokens.breakpoints.values[key] === "number"
          ? tokens.breakpoints.values[key]
          : key;
      return `@media (min-width:${value}${tokens.breakpoints.unit})`;
    },
    down: (key: string) => {
      const value =
        typeof tokens.breakpoints.values[key] === "number"
          ? tokens.breakpoints.values[key]
          : key;
      return `@media (max-width:${value - tokens.breakpoints.step / 100}${
        tokens.breakpoints.unit
      })`;
    },
  },
};

const themeVars = mapCSSVars({
  ...tokens,
  colors: { ...tokens.colors.common, ...tokens.colors.light }, // flatten colors
  ...componentsSpec,
});

export const theme = {
  ...themeVars,
  ...themeUtils,
  // The line below is needed because both `themeVars` and `themeUtils` have a `breakpoints` prop
  // and the one from the utils was replacing the values on the vars.
  breakpoints: { ...themeVars.breakpoints, ...themeUtils.breakpoints },
};
