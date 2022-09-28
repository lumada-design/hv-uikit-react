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

export const parseThemes = (
  themes: object,
  theme?: string,
  colorMode?: string
) => {
  const names = Object.keys(themes);
  const selected = theme || names[0];
  const colorModes = Object.keys(themes[selected].colors.modes);
  const selectedColorMode =
    (colorMode && colorModes[colorMode]) || colorModes[0];

  return { names, selected, colorModes, selectedColorMode };
};

export const toThemeVars = <T extends object>(
  obj: T,
  prefix: string = "-"
): T => {
  const vars = {} as T;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      vars[key] = toThemeVars(value, `${prefix}-${key}`);
    } else {
      vars[key] = `var(${prefix}-${key})`;
    }
  }

  return vars;
};

export const toCSSVars = (obj: object, prefix = "-") => {
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

export const getStylesFromThemes = (themes) => {
  const styles = {};

  Object.keys(themes).forEach((themeName) => {
    const theme = themes[themeName];
    const colorModes = Object.keys(theme.colors.modes);

    colorModes.forEach((colorMode) => {
      const styleName = `body[data-theme="${themeName}"][data-color-mode="${colorMode}"]`;

      styles[styleName] = toCSSVars({
        ...theme,
        colors: {
          ...theme.colors.modes[colorMode],
        },
      });
    });
  });

  return styles;
};
