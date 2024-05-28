import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvCharCounter", {
  root: { display: "inline-block", float: "right" },
  counterDisabled: { color: theme.colors.textDisabled },
  gutter: { paddingLeft: "6px" },
  overloaded: { color: theme.colors.error },
});
