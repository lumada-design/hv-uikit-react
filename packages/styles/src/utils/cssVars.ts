import { DeepString } from "../types/common";
import { isObject } from "./common";

/**
 * Converts a deeply nested object into a flat object with CSS custom property definitions.
 *
 * @example
 * toCSSVars({ colors: { brand: "#000" } })
 * → { "--uikit-colors-brand": "#000" }
 */
export const toCSSVars = (
  obj: object,
  prefix = "--uikit",
): Record<string, string> => {
  const vars: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const varName = `${prefix}-${key}`;

    if (isObject(value)) {
      Object.assign(vars, toCSSVars(value, varName));
    } else {
      vars[varName] = String(value);
    }
  }

  return vars;
};

/**
 * Maps a deeply nested object into the same structure with `var(--...)` references.
 *
 * @example
 * mapCSSVars({ colors: { brand: "#000" } })
 * → { colors: { brand: "var(--uikit-colors-brand)" } }
 */
export const mapCSSVars = <T extends object>(
  obj: T,
  prefix = "--uikit",
): DeepString<T> => {
  const result = {} as DeepString<T>;

  for (const [key, value] of Object.entries(obj)) {
    const varRef = `var(${prefix}-${key})`;

    if (isObject(value)) {
      result[key as keyof T] = mapCSSVars(value, `${prefix}-${key}`) as any;
    } else {
      result[key as keyof T] = varRef as any;
    }
  }

  return result;
};
