export const parseThemes = (
  themesData: object,
  selectedTheme?: string,
  selectedColorMode?: string
) => {
  const themes = Object.keys(themesData);
  const theme = selectedTheme || themes[0];
  const colorModes = Object.keys(themesData[theme]);
  const colorMode =
    (selectedColorMode && colorModes[selectedColorMode]) || colorModes[0];

  return { themes, theme, colorModes, colorMode };
};

export const toVarNames = <T extends object>(
  obj: T,
  prefix: string = "-"
): T => {
  const vars = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      vars[key] = toVarNames(value, `${prefix}-${key}`);
    } else {
      vars[key] = `var(${prefix}-${key})`;
    }
  }
  return vars as T;
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
