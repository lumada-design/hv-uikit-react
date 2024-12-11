import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "../../utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvDropZone", {
  dropZoneContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    border: `1px dashed ${theme.colors.secondary_60}`,
    cursor: "pointer",
    backgroundColor: theme.colors.atmo1,
    borderRadius: theme.radii.round,

    "&:hover": {
      borderColor: theme.colors.secondary,
    },

    "&:focus-within": {
      borderColor: theme.colors.secondary,
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
    backgroundColor: theme.colors.atmo1,
    borderColor: theme.colors.primary,
  },
  dropZoneContainerDisabled: {
    color: theme.colors.secondary_60,
    backgroundColor: theme.colors.atmo3,
    borderColor: "currentcolor",
    cursor: "not-allowed",
    "&:hover": {
      borderColor: "currentcolor",
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
    margin: theme.spacing("md", "auto"),
    gap: theme.space.xs,
    minHeight: 48,
  },
  dropZoneAreaLabels: {
    display: "flex",
    maxWidth: 120,
    margin: "auto",
  },
  dropZoneAreaIcon: {},
  dropZoneLabel: {},
  dragText: {},
  selectFilesText: {
    fontWeight: theme.typography.label.fontWeight,
  },
});
