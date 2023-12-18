import { CSSProperties } from "react";
import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";
import { outlineStyles } from "../../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvDropZone", {
  dropZoneContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    border: `1px dashed ${theme.colors.secondary_60}`,
    cursor: "pointer",
    background: theme.colors.atmo1,
    borderRadius: theme.radii.round,

    "&:hover": {
      background: `${theme.colors.atmo1}`,
      border: `1px dashed ${theme.colors.secondary}`,
    },

    "&:focus-within": {
      background: `${theme.colors.atmo1}`,
      border: `1px dashed ${theme.colors.secondary}`,
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
    border: `1px dashed ${theme.colors.primary}`,
  },
  dropZoneContainerDisabled: {
    background: `${theme.colors.atmo3}`,
    border: `1px dashed ${theme.colors.secondary_60}`,
    cursor: "not-allowed",
    "&:hover": {
      background: `${theme.colors.atmo3}`,
      border: `1px dashed ${theme.colors.secondary_60}`,
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
    ...(theme.typography.body as CSSProperties),
  },
  selectFilesText: {
    ...(theme.typography.label as CSSProperties),
  },
});
