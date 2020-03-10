let ruleCounter = 0;

export default (rule, styleSheet) => {
  ruleCounter += 1;

  const { classNamePrefix } = styleSheet.options;

  if (classNamePrefix && classNamePrefix.indexOf("Hv") === 0) {
    return `${classNamePrefix}${rule.key}`;
  }

  if (process.env.NODE_ENV === "production") {
    return `hv-uikit-jss-${ruleCounter}`;
  }

  const suffix = `${rule.key}-${ruleCounter}`;

  // Help with debuggability.
  if (styleSheet.options.classNamePrefix) {
    return `${styleSheet.options.classNamePrefix}${suffix}`;
  }

  return suffix;
};
