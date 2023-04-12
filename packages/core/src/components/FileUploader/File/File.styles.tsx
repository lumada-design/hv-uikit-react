import styled from "@emotion/styled";
import { Fail, Success } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import { HvButton, HvButtonProps, HvTypography } from "~/components";

const iconStyles = {
  width: 32,
  height: 32,
  margin: `0px ${theme.space.xs}`,
};

export const StyledSuccess = styled(Success)({
  ...iconStyles,
});

export const StyledFail = styled(Fail)({
  ...iconStyles,
});

export const StyledEmptyIcon = styled("div")({
  ...iconStyles,
});

export const StyledErrorMessage = styled(HvTypography)({
  color: theme.colors.negative,
});

export const StyledProgressBarBack = styled("span")({
  position: "absolute",
  top: "-1px",
  width: "100%",
  border: `${theme.fileUploader.file.borderWidth} solid ${theme.colors.atmo4}`,
});

export const StyledProgressBar = styled("progress")({
  position: "absolute",
  top: "-1px",
  width: "80%",
  height: theme.fileUploader.file.progressHeight,
  border: `${theme.fileUploader.file.borderWidth} solid ${theme.colors.secondary}`,

  "&::-moz-progress-bar": {
    background: theme.colors.secondary,
  },
});

export const StyledNameText = styled(HvTypography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const StyledProgressTextContainer = styled("span")({
  display: "flex",
  flexGrow: 1,
  alignItems: "center",
});

export const StyledPreviewContainer = styled("div")({
  display: "flex",
  margin: `0px ${theme.space.xs}`,
  width: theme.fileUploader.file.previewContainerSize,
  height: theme.fileUploader.file.previewContainerSize,
  justifyContent: "center",
  alignItems: "center",

  "& span": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  "& img": {
    width: theme.fileUploader.file.imageSize,
    height: theme.fileUploader.file.imageSize,
    objectFit: "cover",
    objectPosition: "center",
    alignSelf: "center",
  },
});

export const StyledIconButton = styled((props: HvButtonProps) => (
  <HvButton {...props} />
))({
  margin: `0px ${theme.space.xs}`,
});
