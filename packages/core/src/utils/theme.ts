/* eslint import/namespace: [2, { allowComputed: true }] */
import { CSSProperties } from "react";
import {
  themes,
  HvThemeColorModeStructure,
  HvThemeStructure,
  theme,
} from "@hitachivantara/uikit-styles";
import { HvTheme, HvCreateThemeProps } from "@core/types";

/**
 * Sets the element style properties.
 */
const setElementStyle = (element: HTMLElement, style: CSSProperties) => {
  Object.entries(style).forEach(([property, value]) => {
    element.style[property] = value;
  });
};

/**
 * Sets the element attributes and style for a theme and color mode.
 */
export const setElementAttrs = (
  themeName: string,
  modeName: string,
  colorScheme: string,
  themeRootId?: string
) => {
  const element = themeRootId
    ? document.getElementById(themeRootId)
    : document.body;

  if (element) {
    element.setAttribute(`data-theme`, themeName);
    element.setAttribute(`data-color-mode`, modeName);

    // Set default properties for all components to inherit
    setElementStyle(element, {
      colorScheme,
      backgroundColor: theme.colors.backgroundColor,
      accentColor: theme.colors.secondary,
      color: theme.colors.secondary,
      fontSize: theme.typography.body.fontSize,
      fontWeight: theme.typography.body.fontWeight,
      lineHeight: theme.typography.body.lineHeight,
      letterSpacing: theme.typography.body.letterSpacing,
      fontFamily: theme.fontFamily.body,
    });
  }
};

/**
 * Applies customizations to a theme.
 */
const applyThemeCustomizations = (obj: object, customizations: object) => {
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
          customizations[key]
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
  props: HvCreateThemeProps
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

/**
 * Process the themes provided to the HvProvider:
 *  - Cleans themes with the same name
 *  - Returns the default if the list is empty (ds5)
 */
export const processThemes = (
  themesList?: (HvTheme | HvThemeStructure)[]
): (HvTheme | HvThemeStructure)[] => {
  if (themesList && Array.isArray(themesList) && themesList.length > 0) {
    const list: (HvTheme | HvThemeStructure)[] = [];

    themesList.forEach((thm) => {
      const i: number = list.findIndex(
        (t) => t.name.trim() === thm.name.trim()
      );

      if (i !== -1) {
        list.splice(i, 1);
        list.push(thm);
      } else {
        list.push(thm);
      }
    });

    // Cleaned themes
    return list;
  }
  // DS5
  return [themes.ds5];
};

/**
 * Returns the computed value of a theme CSS var
 */
export const getVarValue = (cssVar: string): string => {
  const tempEl = document.createElement("div");
  tempEl.style.setProperty("--temp", cssVar);
  document.body.appendChild(tempEl);
  const computedValue = getComputedStyle(tempEl)
    .getPropertyValue("--temp")
    .trim();
  document.body.removeChild(tempEl);
  return computedValue;
};
