import { createGenerateClassName as muiCreateGenerateClassName } from "@mui/styles";

export default function createGenerateClassName(options = {}) {
  const { disableGlobal = false, productionPrefix = "jss-uikit", seed = "" } = options;

  const muiGenerateClassName = muiCreateGenerateClassName({
    disableGlobal,
    productionPrefix,
    seed,
  });

  const seedPrefix = seed === "" ? "" : `${seed}-`;

  return (rule, styleSheet) => {
    const { name } = styleSheet.options;

    if (name && name.indexOf("Hv") === 0 && !styleSheet.options.link && !disableGlobal) {
      return `${seedPrefix}${name}-${rule.key}`;
    }

    return muiGenerateClassName(rule, styleSheet);
  };
}
