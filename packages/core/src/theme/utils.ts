const toVarNames = <T extends object>(obj: T, prefix: string = "-"): T => {
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

const toVars = (obj: object, prefix = "-") => {
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

export { toVarNames, toVars };
