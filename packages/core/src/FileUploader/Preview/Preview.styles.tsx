import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses(
  "HvFileUploaderPreview",
  {
    previewButton: {
      position: "relative",
      width: "48px",
      height: "48px",
      "&:hover *": {
        display: "flex",
      },
    },
    overlay: {
      position: "absolute",
      inset: 0,
      display: "none",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.primary_20,
      opacity: "1",
      borderRadius: theme.radii.base,
    },
  },
);
