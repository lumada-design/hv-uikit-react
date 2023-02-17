import styled from "@emotion/styled";
import { Doc } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import { HvInfoMessage, HvLabel, HvTypography } from "components";
import { CSSProperties } from "react";
import { outlineStyles } from "utils";
import { transientOptions } from "utils/transientOptions";
import dropZoneClasses from "./dropZoneClasses";

export const StyledDropZoneLabelsGroup = styled("div")({
  display: "flex",
  justifyContent: "start",

  "& label:nth-child(1)": {},

  "& p:nth-child(2)": {
    marginLeft: "auto",
  },
});

export const StyledLabel = styled(
  HvLabel,
  transientOptions
)(({ $disabled }: { $disabled: boolean }) => ({
  paddingBottom: 6,

  ...($disabled && {
    color: theme.colors.atmo5,
  }),
}));

export const StyledInfoMessage = styled(
  HvInfoMessage,
  transientOptions
)(({ $disabled }: { $disabled: boolean }) => ({
  ...($disabled && {
    color: theme.colors.atmo5,
  }),
}));

export const StyledDropZoneContainer = styled(
  "div",
  transientOptions
)(({ $drag, $disabled }: { $drag: boolean; $disabled: boolean }) => ({
  position: "relative",
  width: "100%",
  display: "flex",
  border: `1px ${theme.fileUploader.dropZone.borderType} ${theme.fileUploader.dropZone.borderColor}`,
  cursor: "pointer",
  background: theme.fileUploader.dropZone.backgroundColor,
  borderRadius: theme.fileUploader.dropZone.borderRadius,

  "&:hover": {
    background: `${theme.colors.atmo1}`,
    border: `1px ${theme.fileUploader.dropZone.borderType} ${theme.colors.acce1}`,
  },

  "&:focus": {
    background: `${theme.colors.atmo1}`,
    border: `1px ${theme.fileUploader.dropZone.borderType} ${theme.colors.acce1}`,
    ...outlineStyles,
  },

  ...($drag && {
    background: `${theme.colors.atmo1}`,
    border: `1px ${theme.fileUploader.dropZone.borderType} ${theme.fileUploader.dropZone.borderColorDrag}`,
  }),

  ...($disabled && {
    [`&.${dropZoneClasses.dropZoneContainer}`]: {
      background: `${theme.colors.atmo3}`,
      border: `1px ${theme.fileUploader.dropZone.borderType} ${theme.fileUploader.dropZone.borderColorDisabled}`,
      cursor: "not-allowed",
    },

    [`& .${dropZoneClasses.dragText}`]: {
      color: theme.colors.atmo5,
    },

    [`& .${dropZoneClasses.selectFilesText}`]: {
      color: theme.colors.atmo5,
    },
  }),
}));

export const StyledInput = styled("input")({
  opacity: 0,
  width: "100%",
  position: "absolute",
  height: "100%",
  cursor: "pointer",

  "&:disabled": {
    cursor: "not-allowed",
  },
});

export const StyledDropArea = styled("div")({
  display: "flex",
  margin: `${theme.spacing(3.75)} auto`,
  minHeight: 48,
});

export const StyledDropAreaLabel = styled("div")({
  display: "flex",
  width: 115,
  margin: "auto",
});

export const StyledDragText = styled(HvTypography)({
  ...(theme.typography.body as CSSProperties),
});

export const StyledDropAreaIcon = styled(Doc)({
  margin: "auto",
  marginRight: theme.spacing(1.25),
});

export const StyledDropAreaLabels = styled("div")({
  display: "flex",
  width: 115,
  margin: "auto",
});

export const StyledSelectedFilesText = styled("span")({
  ...(theme.typography.label as CSSProperties),
});
