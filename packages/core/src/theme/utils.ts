export const parseThemes = (
  themes: object,
  theme?: string,
  colorMode?: string
) => {
  const themesList = Object.keys(themes);
  const selectedTheme = theme || themesList[0];
  const colorModesList = Object.keys(themes[selectedTheme].colors.modes);
  const selectedColorMode =
    (colorMode && colorModesList[colorMode]) || colorModesList[0];

  return { themesList, selectedTheme, colorModesList, selectedColorMode };
};

export const toVarNames = <T extends object>(
  obj: T,
  prefix: string = "-"
): T => {
  const vars = {} as T;
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      vars[key] = toVarNames(value, `${prefix}-${key}`);
    } else {
      vars[key] = `var(${prefix}-${key})`;
    }
  }
  return vars;
};

export const toVars = (obj: object, prefix = "-") => {
  const vars = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      const nestedVars = toVars(value, `${prefix}-${key}`);
      for (const [nestedKey, nestedValue] of Object.entries(nestedVars)) {
        vars[nestedKey] = nestedValue;
      }
    } else {
      vars[`${prefix}-${key}`] = value;
    }
  }
  return vars;
};
