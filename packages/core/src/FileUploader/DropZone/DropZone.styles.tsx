import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvDropZone", {
  dropZoneContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    border: `1px dashed ${theme.colors.textDisabled}`,
    cursor: "pointer",
    background: theme.colors.bgSurface,
    borderRadius: theme.radii.round,

    "&:hover": {
      background: `${theme.colors.bgSurface}`,
      border: `1px dashed ${theme.colors.text}`,
    },

    "&:focus-within": {
      background: `${theme.colors.bgSurface}`,
      border: `1px dashed ${theme.colors.text}`,
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
    background: `${theme.colors.bgSurface}`,
    border: `1px dashed ${theme.colors.primary}`,
  },
  dropZoneContainerDisabled: {
    background: `${theme.colors.bgDisabled}`,
    border: `1px dashed ${theme.colors.textDisabled}`,
    cursor: "not-allowed",
    "&:hover": {
      background: `${theme.colors.bgDisabled}`,
      border: `1px dashed ${theme.colors.textDisabled}`,
    },

    "& $dragText": {
      color: theme.colors.textDisabled,
    },
    "& $selectFilesText": {
      color: theme.colors.textDisabled,
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
    maxWidth: 120,
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
    ...(theme.typography.body as React.CSSProperties),
  },
  selectFilesText: {
    ...(theme.typography.label as React.CSSProperties),
  },
});
