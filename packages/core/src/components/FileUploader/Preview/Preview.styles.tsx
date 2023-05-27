import styled from "@emotion/styled";
import { Preview } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import { HvButton, HvButtonProps } from "@core/components";
import { forwardRef } from "react";
import { PolymorphicRef } from "@core/types";
import fileUploaderPreviewClasses from "./previewClasses";

export const StyledOverlay = styled("div")({
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

  [`.${fileUploaderPreviewClasses.previewButton}:hover &`]: {
    display: "flex",
  },
});

export const StyledPreviewIcon = styled(Preview)({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  display: "none",

  [`.${fileUploaderPreviewClasses.previewButton}:hover &`]: {
    display: "flex",
  },
});

export const StyledButton = styled(
  forwardRef((props: HvButtonProps, ref?: PolymorphicRef<"button">) => {
    return <HvButton {...props} ref={ref} />;
  })
)({
  position: "relative",
  width: theme.fileUploader.preview.buttonSize,
  height: theme.fileUploader.preview.buttonSize,
});
