import {
  themes,
  HvBaseTheme,
  colors,
  HvThemeColorModeStructure,
  HvParsedThemeStyles,
} from "@hitachivantara/uikit-styles";
import { HvThemeCustomizationProps, HvCustomizedTheme } from "types/theme";

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
};

/**
 * Applies the customizations to a theme.
 */
const applyThemeCustomizations = (obj: object, customizations: object) => {
  const isObject = (val: any) => val && typeof val === "object";

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
 * Creates a list of customized themes based on the base theme and customizations given.
 *
 * If a newThemeName is given, a new theme is created based on the base theme and customizations.
 */
export const parseThemes = (
  baseTheme: HvBaseTheme,
  newThemeName?: string,
  customizations?: HvThemeCustomizationProps
): { [themeName: string]: HvCustomizedTheme } => {
  // Apply customizations to the base theme
  const customizedTheme: HvCustomizedTheme = customizations
    ? (applyThemeCustomizations(
        themes[baseTheme],
        customizations
      ) as HvCustomizedTheme)
    : { ...themes[baseTheme] };

  // Fill new color modes with missing colors
  if (customizations) {
    Object.keys(customizedTheme.colors.modes).forEach((mode) => {
      if (!themes[baseTheme].colors.modes[mode]) {
        customizedTheme.colors.modes[mode] = {
          type: customizedTheme.colors.modes[mode].type || "light",
          backgroundColor: colors.light.atmo2,
          ...colors.common,
          ...colors.light,
          ...(customizedTheme.colors.modes[mode] as Partial<
            HvThemeColorModeStructure & { [key: string]: string }
          >),
        };
      }
    });
  }

  // Create new themes list
  const customizedThemes: {
    [themeName: string]: HvCustomizedTheme;
  } = newThemeName
    ? { ...themes, [newThemeName]: customizedTheme }
    : { ...themes, [baseTheme]: customizedTheme };

  return customizedThemes;
};
