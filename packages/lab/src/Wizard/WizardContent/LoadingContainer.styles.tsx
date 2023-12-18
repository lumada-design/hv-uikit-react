import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses(
  "HvWizard-LoadingContainer",
  {
    loading: {
      width: "100%",
      height: "100%",
    },
    overlay: {
      position: "absolute",
      transition: "background-Color .2s ease",
      zIndex: -1,
    },
    blur: {
      backgroundColor: theme.alpha("atmo2", 0.8),
      zIndex: theme.zIndices.modal,
    },
  }
);
