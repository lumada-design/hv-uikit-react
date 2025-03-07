import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvSwitch", {
  root: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {},
  error: {},
  switchContainer: {
    height: "32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderBottom: "1px solid transparent",
  },
  invalidSwitch: {
    paddingBottom: "1px",
    borderBottom: `1px solid ${theme.form.errorColor}`,
  },
});
