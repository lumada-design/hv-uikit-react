import { createGenerateClassName } from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "jss-uikit",
  disableGlobal: false,
});

export default (rule, styleSheet) => {
  const { name } = styleSheet.options;

  if (name && name.startsWith("Hv")) {
    return `${name}-${rule.key}`;
  }

  return generateClassName(rule, styleSheet);
};
