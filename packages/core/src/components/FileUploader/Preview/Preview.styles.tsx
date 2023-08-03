import { createClasses } from "@core/utils/classes";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses(
  "HvFileUploaderPreview",
  {
    previewButton: {
      position: "relative",
      width: theme.fileUploader.preview.buttonSize,
      height: theme.fileUploader.preview.buttonSize,
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
      backgroundColor: theme.fileUploader.preview.overlayColor,
      opacity: theme.fileUploader.preview.overlayOpacity,
      borderRadius: theme.fileUploader.preview.overlayBorderRadius,
    },
  }
);
