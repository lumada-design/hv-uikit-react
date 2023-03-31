import { DeepString, HvThemeStructure } from "./types";

const toCSSVars = (obj: object, prefix = "--uikit") => {
  const vars = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      const nestedVars = toCSSVars(value, `${prefix}-${key}`);

      for (const [nestedKey, nestedValue] of Object.entries(nestedVars)) {
        vars[nestedKey] = nestedValue;
      }
    } else {
      vars[`${prefix}-${key}`] = value;
    }
  }

  return vars;
};

export const mapCSSVars = <T extends object>(
  obj: T,
  prefix: string = "--uikit"
): DeepString<T> => {
  const vars = {} as DeepString<T>;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      vars[key] = mapCSSVars(value, `${prefix}-${key}`);
    } else {
      vars[key] = `var(${prefix}-${key})`;
    }
  }

  return vars;
};

export const mergeTheme = (...objects) => {
  const isObject = (obj) => obj && typeof obj === "object";

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (isObject(pVal) && isObject(oVal)) {
        prev[key] = pVal ? oVal : mergeTheme(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
};

export type HvParsedThemeStyles = {
  bgColor: string;
  color: string;
  accentColor: string;
  colorScheme: string;
  fontSize: string;
  letterSpacing: string;
  lineHeight: string;
  fontWeight: string;
  fontFamily: string;
};

export const parseTheme = (
  themes: HvThemeStructure[],
  theme: string = "",
  colorMode: string = ""
): {
  theme: HvThemeStructure;
  selectedTheme: string;
  selectedMode: string;
  colorModes: string[];
  styles: HvParsedThemeStyles;
} => {
  const names: string[] = themes.map((t) => t.name);
  const selectedTheme: string = names.includes(theme) ? theme : names[0];
  const themeStructure: HvThemeStructure =
    themes.find((t) => t.name === selectedTheme) || themes[0];
  const colorModes: string[] = Object.keys(themeStructure.colors.modes);
  const selectedMode: string = colorModes.includes(colorMode)
    ? colorMode
    : colorModes[0];

  const styles: HvParsedThemeStyles = {
    bgColor: themeStructure.colors.modes[selectedMode]?.backgroundColor,
    color: themeStructure.colors.modes[selectedMode].secondary,
    accentColor: themeStructure.colors.modes[selectedMode].secondary,
    colorScheme: themeStructure.colors.modes[selectedMode].type,
    fontSize: (typeof themeStructure.typography.body.fontSize === "string"
      ? themeStructure.typography.body.fontSize
      : `${themeStructure.typography.body.fontSize}px`) as string,
    letterSpacing: (typeof themeStructure.typography.body.letterSpacing ===
    "string"
      ? themeStructure.typography.body.letterSpacing
      : `${themeStructure.typography.body.letterSpacing}px`) as string,
    lineHeight: (typeof themeStructure.typography.body.lineHeight === "string"
      ? themeStructure.typography.body.lineHeight
      : `${themeStructure.typography.body.lineHeight}px`) as string,
    fontWeight: (typeof themeStructure.typography.body.fontWeight === "string"
      ? themeStructure.typography.body.fontWeight
      : `${themeStructure.typography.body.fontWeight}`) as string,
    fontFamily: (typeof themeStructure.fontFamily.body === "string"
      ? themeStructure.fontFamily.body
      : `${themeStructure.fontFamily.body}`) as string,
  };

  return {
    theme: themeStructure,
    selectedTheme,
    selectedMode,
    colorModes,
    styles,
  };
};

export const getThemesList = (themes: object) => {
  const list = {};

  Object.keys(themes).forEach((themeName) => {
    const theme = themes[themeName];
    const colorModes = Object.keys(theme.colors.modes);

    list[themeName] = {
      colorModes: {},
    };

    colorModes.forEach((colorMode) => {
      list[themeName].colorModes[colorMode] = toCSSVars({
        ...theme,
        colors: {
          ...theme.colors.modes[colorMode],
        },
      });
    });
  });

  return list;
};

export const getThemesVars = (themes: HvThemeStructure[]) => {
  const vars = {};

  themes.forEach((theme) => {
    const colorModes = Object.keys(theme.colors.modes);

    colorModes.forEach((colorMode) => {
      const styleName = `[data-theme="${theme.name}"][data-color-mode="${colorMode}"]`;

      const { name, ...rest } = theme;

      vars[styleName] = toCSSVars({
        ...rest,
        colors: {
          ...rest.colors.modes[colorMode],
        },
      });
    });
  });

  return vars;
};
