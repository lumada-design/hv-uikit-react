import {
  HvThemeColorModeStructure,
  HvThemeStructure,
  themes,
} from "@hitachivantara/uikit-styles";

import { HvCreateThemeProps, HvTheme } from "../types/theme";
import { getElementById } from "./document";

/**
 * Applies customizations to a theme.
 */
const applyThemeCustomizations = (obj: any, customizations: any) => {
  const isObject = (val: any) =>
    val && typeof val === "object" && !Array.isArray(val);

  // Customized theme
  const customizedTheme = { ...obj };

  // Add new values to the theme or replace values
  Object.keys(customizations).forEach((key) => {
    if (customizedTheme[key]) {
      if (isObject(customizedTheme[key]) && isObject(customizations[key])) {
        customizedTheme[key] = applyThemeCustomizations(
          customizedTheme[key],
          customizations[key],
        );
      } else if (typeof customizedTheme[key] === typeof customizations[key]) {
        customizedTheme[key] = customizations[key];
      }
    } else {
      customizedTheme[key] = customizations[key];
    }
  });

  return customizedTheme;
};

/**
 * Creates a customized theme based on the base theme and customizations given.
 * For the color modes, the colors that are not defined will be replaced by the values from the dawn mode of the base theme.
 */
export const createTheme = (
  props: HvCreateThemeProps,
): HvTheme | HvThemeStructure => {
  const {
    name,
    base = "ds5",
    inheritColorModes = true,
    ...customizations
  } = props;

  // Apply customizations to the base theme
  const customizedTheme: HvTheme | HvThemeStructure = customizations
    ? (applyThemeCustomizations(themes[base], customizations) as HvTheme)
    : { ...themes[base] };

  // Set theme name
  customizedTheme.name = name.trim();
  // Set theme base
  customizedTheme.base = base;

  // Fill new color modes with missing colors
  if (customizations) {
    Object.keys(customizedTheme.colors.modes).forEach((mode) => {
      // @ts-ignore
      if (!themes[base].colors.modes[mode]) {
        customizedTheme.colors.modes[mode] = {
          ...themes[base].colors.modes.dawn,
          ...(customizedTheme.colors.modes[mode] as Partial<
            HvThemeColorModeStructure & { [key: string]: string }
          >),
        };
      }
    });
  }

  // If the flag `inheritColorModes` is false and customizations were given for the color modes,
  // we're removing any color modes that might have been inherited
  if (!inheritColorModes && customizations.colors?.modes) {
    Object.keys(customizedTheme.colors.modes).forEach((mode) => {
      if (!Object.keys(customizations.colors?.modes || {}).includes(mode)) {
        delete customizedTheme.colors.modes[mode];
      }
    });
  }

  // Created theme
  return customizedTheme;
};

export const getVarValue = (cssVar: string, rootElementId?: string) => {
  const root = getElementById(rootElementId || "hv-root");
  if (!root) return undefined;

  return getComputedStyle(root)
    .getPropertyValue(cssVar.replace("var(", "").replace(")", ""))
    .trim();
};
