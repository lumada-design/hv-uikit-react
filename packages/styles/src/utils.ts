const toCSSVars = (obj: object, prefix = "-") => {
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
  prefix: string = "-"
): T => {
  const vars = {} as T;

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
  themes: object,
  theme?: string,
  colorMode?: string
) => {
  const names = Object.keys(themes);
  const selected = theme || names[0];
  const colorModes = Object.keys(themes[selected].colors.modes);
  const selectedMode =
    (colorMode && colorModes[colorModes.indexOf(colorMode)]) || colorModes[0];

  return { selected, selectedMode, colorModes };
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
          ...theme.colors.common,
          ...theme.colors.modes[colorMode],
        },
      });
    });
  });

  return list;
};

export const getThemesVars = (themes, elem = "div") => {
  const vars = {};

  Object.keys(themes).forEach((themeName) => {
    const theme = themes[themeName];
    const colorModes = Object.keys(theme.colors.modes);

    colorModes.forEach((colorMode) => {
      const styleName = `${elem}[data-theme="${themeName}"][data-color-mode="${colorMode}"]`;

      vars[styleName] = toCSSVars({
        ...theme,
        colors: {
          ...theme.colors.common,
          ...theme.colors.modes[colorMode],
        },
      });
    });
  });

  return vars;
};

export const getThemesModes = (themes) => {
  const modes: string[] = [];

  Object.keys(themes).forEach((themeName) => {
    const theme = themes[themeName];
    const colorModes = Object.keys(theme.colors.modes);

    colorModes.forEach((colorMode) => {
      modes.push(`${themeName}-${colorMode}`);
    });
  });

  return modes;
};
