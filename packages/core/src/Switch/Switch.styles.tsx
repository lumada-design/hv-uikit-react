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
  container: {
    display: "flex",
    "&$left": {
      flexDirection: "row",
      alignItems: "center",
    },
    "&$right": {
      flexDirection: "row-reverse",
      alignItems: "center",
    },
    "&$top": {
      flexDirection: "column",
    },
  },
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
  top: {},
  left: {},
  right: {},
});
