/*eslint import/namespace: [2, { allowComputed: true }]*/
import {
  themes,
  HvThemeColorModeStructure,
  HvParsedThemeStyles,
  HvThemeStructure,
} from "@hitachivantara/uikit-styles";
import { HvTheme, HvCreateThemeProps } from "../types/theme";

/**
 * Sets the element attributes for a theme and color mode.
 */
export const setElementAttrs = (
  theme: string,
  mode: string,
  styles: HvParsedThemeStyles,
  elementId?: string
) => {
  const element =
    (elementId && document.getElementById(elementId)) || document.body;

  element.setAttribute(`data-theme`, theme);
  element.setAttribute(`data-color-mode`, mode);

  // Set default properties for all components to inherit
  element.style.backgroundColor = styles.bgColor;
  element.style.colorScheme = styles.colorScheme;
  element.style.accentColor = styles.accentColor;
  element.style.color = styles.color;
  element.style.fontSize = styles.fontSize;
  element.style.fontWeight = styles.fontWeight;
  element.style.lineHeight = styles.lineHeight;
  element.style.letterSpacing = styles.letterSpacing;
  element.style.fontFamily = styles.fontFamily;
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
      } else if (typeof customizedTheme[key] == typeof customizations[key]) {
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
export const createTheme = ({
  name,
  base = "ds5",
  inheritColorModes = true,
  ...customizations
}: HvCreateThemeProps): HvTheme | HvThemeStructure => {
  // Apply customizations to the base theme
  const customizedTheme: HvTheme | HvThemeStructure = customizations
    ? (applyThemeCustomizations(themes[base], customizations) as HvTheme)
    : { ...themes[base] };

  // Set theme name
  customizedTheme.name = name.trim();

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

    themesList.map((theme) => {
      const i: number = list.findIndex(
        (t) => t.name.trim() === theme.name.trim()
      );

      if (i !== -1) {
        list.splice(i, 1);
        list.push(theme);
      } else {
        list.push(theme);
      }
    });

    // Cleaned themes
    return list;
  } else {
    // DS5
    return [themes.ds5];
  }
};
