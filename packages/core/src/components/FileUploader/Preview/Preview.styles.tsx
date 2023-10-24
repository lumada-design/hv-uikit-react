import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

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
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "none",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.primary_20,
      opacity: "1",
      borderRadius: theme.radii.base,
    },
  }
);
