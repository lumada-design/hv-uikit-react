import {
  createClasses,
  hexToRgbA,
  theme,
} from "@hitachivantara/uikit-react-core";

import { alpha } from "@mui/material";

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
      backgroundColor: alpha(hexToRgbA(theme.colors.atmo2), 0.8),
      zIndex: theme.zIndices.modal,
    },
  }
);
