import { themeVars } from "../theme/base";
import { HvThemeBreakpoint, HvThemeVars } from "../types/theme";

/** Acceptable values for theme spacing. */
type SpacingValue = number | HvThemeBreakpoint | (string & {});

/** Type guard to detect multiple arguments */
const hasMultipleArgs = <T>(args: T[] | [T[]]): args is T[] => args.length > 1;

/**
 * Computes spacing based on the theme. Accepts shorthand or raw CSS values.
 *
 * @exampletheme
 * spacing(2) → "calc(var(--uikit-space-base) * 2px)"
 * spacing("md", "inherit") → "var(--uikit-space-md) inherit"
 */
export const spacing = (...args: [SpacingValue[]] | SpacingValue[]) => {
  if (hasMultipleArgs(args)) {
    return args.map((arg) => spacingUtil(arg, themeVars)).join(" ");
  }

  const [value] = args;

  switch (typeof value) {
    case "number":
    case "string":
      return spacingUtil(value, themeVars);
    // TODO: remove in v6
    case "object":
      return value && value.length > 0
        ? value.map((val) => spacingUtilOld(val, themeVars)).join(" ")
        : "0px";
    default:
      return "0px";
  }
};

/**
 * Resolves a spacing value to a valid CSS string using the theme.
 */
const spacingUtil = (value: SpacingValue, vars: HvThemeVars) => {
  switch (typeof value) {
    case "number":
      return value === 0 ? "0" : `calc(${vars.space.base} * ${value}px)`;
    case "string":
      return vars.space[value as HvThemeBreakpoint] || value;
    default:
      return value;
  }
};

/**
 * Spacing utility kept for compatibility with array-style arguments.
 * TODO: remove in favour of spacingUtil in v6
 */
const spacingUtilOld = (value: SpacingValue, vars: HvThemeVars): string => {
  switch (typeof value) {
    case "number":
      return `${value}px`;
    case "string":
      return vars.space[value as HvThemeBreakpoint] || value;
    default:
      return "0px";
  }
};
