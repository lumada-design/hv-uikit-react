import { theme } from "@hitachivantara/uikit-styles";
import { createClasses } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses(
  "HvWizardContainer",
  {
    root: {},
    paper: {
      width: "80%",
      maxWidth: "80%",
      maxHeight: `calc(100% - (2 * ${theme.dialog.margin}))`,
    },
    closeButton: {
      display: "none",
    },
  }
);
