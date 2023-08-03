import { createClasses } from "@core/utils/classes";
import { outlineStyles } from "@core/utils/focusUtils";
import { theme } from "@hitachivantara/uikit-styles";
import { CSSProperties } from "react";

export const { staticClasses, useClasses } = createClasses("HvDropZone", {
  dropZoneContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    border: `1px ${theme.fileUploader.dropZone.borderType} ${theme.fileUploader.dropZone.borderColor}`,
    cursor: "pointer",
    background: theme.fileUploader.dropZone.backgroundColor,
    borderRadius: theme.fileUploader.dropZone.borderRadius,

    "&:hover": {
      background: `${theme.colors.atmo1}`,
      border: `1px ${theme.fileUploader.dropZone.borderType} ${theme.colors.secondary}`,
    },

    "&:focus": {
      background: `${theme.colors.atmo1}`,
      border: `1px ${theme.fileUploader.dropZone.borderType} ${theme.colors.secondary}`,
      ...outlineStyles,
    },
  },
  dropZoneLabelsGroup: {
    display: "flex",
    justifyContent: "start",

    "& label:nth-of-type(1)": {},

    "& p:nth-of-type(2)": {
      marginLeft: "auto",
    },
  },
  dragAction: {
    background: `${theme.colors.atmo1}`,
    border: `1px ${theme.fileUploader.dropZone.borderType} ${theme.fileUploader.dropZone.borderColorDrag}`,
  },
  dropZoneContainerDisabled: {
    background: `${theme.colors.atmo3}`,
    border: `1px ${theme.fileUploader.dropZone.borderType} ${theme.fileUploader.dropZone.borderColorDisabled}`,
    cursor: "not-allowed",
    "&:hover": {
      background: `${theme.colors.atmo3}`,
      border: `1px ${theme.fileUploader.dropZone.borderType} ${theme.fileUploader.dropZone.borderColorDisabled}`,
    },

    "& $dragText": {
      color: theme.colors.secondary_60,
    },
    "& $selectFilesText": {
      color: theme.colors.secondary_60,
    },
  },
  inputArea: {
    opacity: 0,
    width: "100%",
    position: "absolute",
    height: "100%",
    cursor: "pointer",

    "&:disabled": {
      cursor: "not-allowed",
    },
  },
  dropArea: {
    display: "flex",
    margin: `${theme.space.md} auto`,
    minHeight: 48,
  },
  dropZoneAreaLabels: {
    display: "flex",
    width: 115,
    margin: "auto",
  },
  dropZoneAreaIcon: {
    margin: "auto",
    marginRight: theme.space.xs,
  },
  dropZoneLabel: {
    paddingBottom: 6,
  },
  dragText: {
    ...(theme.typography.body as CSSProperties),
  },
  selectFilesText: {
    ...(theme.typography.label as CSSProperties),
  },
});
