import type { DeepString, HvThemeStructure, SpacingValue } from "./types";
import { space } from "./tokens/space";

export const spacingUtil = (value: SpacingValue): string => {
  switch (typeof value) {
    case "number":
      return `calc(${space.base} * ${value}px)`;
    case "string":
      return space[value] || value;
    default:
      return value;
  }
};

// TODO: remove in favour or `spacingUtil` in v6
export const spacingUtilOld = (value: SpacingValue): string => {
  switch (typeof value) {
    case "number":
      return `${value}px`;
    case "string":
      return space[value] || value;
    default:
      return "0px";
  }
};

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

export const hasMultipleArgs = <T extends any>(
  args: T[] | [T[]]
): args is T[] => {
  return args.length > 1;
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

export const parseTheme = (
  themes: HvThemeStructure[],
  theme: string = "",
  colorMode: string = ""
): {
  theme: HvThemeStructure;
  selectedTheme: string;
  selectedMode: string;
  colorModes: string[];
  colorScheme: string;
} => {
  const names: string[] = themes.map((t) => t.name);
  const selectedTheme: string = names.includes(theme) ? theme : names[0];
  const themeStructure: HvThemeStructure =
    themes.find((t) => t.name === selectedTheme) || themes[0];
  const colorModes: string[] = Object.keys(themeStructure.colors.modes);
  const selectedMode: string = colorModes.includes(colorMode)
    ? colorMode
    : colorModes[0];
  const colorScheme = themeStructure.colors.modes[selectedMode].type;

  return {
    theme: themeStructure,
    selectedTheme,
    selectedMode,
    colorModes,
    colorScheme,
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
