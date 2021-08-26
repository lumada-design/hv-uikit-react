import { outlineStyles } from "../../Focus/styles";

const styles = (theme) => ({
  dropZoneContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    border: `1px dotted ${theme.hv.palette.atmosphere.atmo4}`,
    cursor: "pointer",
    background: `${theme.hv.palette.atmosphere.atmo2}`,
    "&:hover": {
      background: `${theme.hv.palette.atmosphere.atmo1}`,
      border: `1px dotted ${theme.hv.palette.accent.acce1}`,
    },
    "&:focus": {
      background: `${theme.hv.palette.atmosphere.atmo1}`,
      border: `1px dotted ${theme.hv.palette.accent.acce1}`,
      ...outlineStyles,
    },
  },
  dropZoneContainerDisabled: {
    "&$dropZoneContainer": {
      background: `${theme.hv.palette.atmosphere.atmo3}`,
      border: `1px dotted ${theme.hv.palette.atmosphere.atmo4}`,
      cursor: "not-allowed",
    },
    "& $dragText": {
      color: theme.hv.palette.atmosphere.atmo5,
    },
    "& $selectFilesText": {
      color: theme.hv.palette.atmosphere.atmo5,
    },
  },
  dragAction: {
    background: `${theme.hv.palette.atmosphere.atmo1}`,
    border: `1px dotted ${theme.hv.palette.accent.acce1}`,
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
    margin: theme.hvSpacing("md", "auto"),
    minHeight: 40,
  },
  dropZoneLabelsGroup: {
    display: "flex",
    paddingBottom: "6px",
    justifyContent: "start",
    "& :first-child": {
      marginRight: 10,
    },
  },
  dropZoneAreaLabels: {
    display: "flex",
    width: 115,
    margin: "auto",
  },
  dropZoneAreaIcon: {
    margin: "auto",
    marginRight: theme.hv.spacing.xs,
  },
  dragText: {
    ...theme.hv.typography.normalText,
  },
  selectFilesText: {
    ...theme.hv.typography.highlightText,
  },
});

export default styles;
