import { createClasses } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses(
  "HvWizardContainer",
  {
    root: {},
    paper: {
      width: "80%",
      maxWidth: "80%",
      maxHeight: "calc(100% - (2 * 80px))",
    },
    closeButton: {
      display: "none",
    },
  },
);
