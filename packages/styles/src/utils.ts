import type {
  DeepString,
  HvThemeBreakpoint,
  HvThemeStructure,
  HvThemeVars,
  SpacingValue,
} from "./types";

export const spacingUtil = (value: SpacingValue, vars: HvThemeVars): string => {
  switch (typeof value) {
    case "number":
      return `calc(${vars.space.base} * ${value}px)`;
    case "string":
      return vars.space[value as HvThemeBreakpoint] || value;
    default:
      return value;
  }
};

// TODO: remove in favour or `spacingUtil` in v6
export const spacingUtilOld = (
  value: SpacingValue,
  vars: HvThemeVars,
): string => {
  switch (typeof value) {
    case "number":
      return `${value}px`;
    case "string":
      return vars.space[value as HvThemeBreakpoint] || value;
    default:
      return "0px";
  }
};

const toCSSVars = (obj: object, prefix = "--uikit") => {
  const vars: Record<string, string> = {};

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

export const hasMultipleArgs = <T>(args: T[] | [T[]]): args is T[] => {
  return args.length > 1;
};

export const mapCSSVars = <T extends object>(
  obj: T,
  prefix = "--uikit",
): DeepString<T> => {
  const vars: DeepString<any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      vars[key] = mapCSSVars(value, `${prefix}-${key}`);
    } else {
      vars[key] = `var(${prefix}-${key})`;
    }
  }

  return vars;
};

// TODO: review in v6:
// - typings: accept any or theme object?
// - arguments: source/target themes, or any number of theme objects?
export const mergeTheme = (...objects: any[]) => {
  const isObject = (obj: unknown) => obj && typeof obj === "object";

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeTheme(pVal, oVal);
      } else {
        prev[key] = oVal !== undefined ? oVal : pVal;
      }
    });

    return prev;
  }, {});
};

export const parseTheme = (
  themes: HvThemeStructure[],
  theme = "",
  colorMode = "",
): {
  theme: HvThemeStructure;
  selectedTheme: string;
  selectedMode: string;
  colorModes: string[];
  colorScheme: string;
} => {
  const names = themes.map((t) => t.name);
  const selectedTheme = names.includes(theme) ? theme : names[0];
  const themeStructure =
    themes.find((t) => t.name === selectedTheme) || themes[0];
  const colorModes = Object.keys(themeStructure.colors.modes);
  const selectedMode = colorModes.includes(colorMode)
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

export const getThemesList = (themes: Record<string, any>) => {
  const list: Record<string, any> = {};

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
  const vars: Record<string, any> = {};

  themes.forEach((theme) => {
    const colorModes = Object.keys(theme.colors.modes);

    colorModes.forEach((colorMode) => {
      const styleName = `[data-theme="${theme.name}"][data-color-mode="${colorMode}"]`;
      const themeName = `[data-theme="${theme.name}"]`;

      // extract properties that shouldn't be mapped to CSS variables
      // @ts-expect-error align HvTheme <-> HvThemeStructure?
      const { components, name, colors, palette, ...rest } = theme;

      vars[styleName] = toCSSVars({
        colors: {
          ...colors.modes[colorMode],
        },
      });

      vars[themeName] = toCSSVars({
        ...rest,
      });
    });
  });

  return vars;
};
