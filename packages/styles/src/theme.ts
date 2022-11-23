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

const keys = Object.keys(tokens.breakpoints.values);

const themeUtils = {
  spacing: (factor: number): string =>
    `calc(${tokens.space.base} * ${factor}px)`,

  breakpoints: {
    up: (key: string) => {
      const value = typeof keys[key] === "number" ? keys[key] : key;
      return `@media (min-width:${value}${tokens.breakpoints.unit})`;
    },
    down: (key: string) => {
      const value = typeof keys[key] === "number" ? keys[key] : key;
      return `@media (max-width:${value - tokens.breakpoints.step / 100}${
        tokens.breakpoints.unit
      })`;
    },
    between: (start: string, end: string) => {
      const endIndex = keys.indexOf(end);

      return (
        `@media (min-width:${
          typeof keys[start] === "number" ? keys[start] : start
        }${tokens.breakpoints.unit}) and ` +
        `(max-width:${
          (endIndex !== -1 && typeof keys[keys[endIndex]] === "number"
            ? keys[keys[endIndex]]
            : end) -
          tokens.breakpoints.step / 100
        }${tokens.breakpoints.unit})`
      );
    },
    only: (key: string) => {
      if (keys.indexOf(key) + 1 < keys.length) {
        return themeUtils.breakpoints.between(key, keys[keys.indexOf(key) + 1]);
      }

      return themeUtils.breakpoints.up(key);
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
