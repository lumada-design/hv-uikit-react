import { outlineStyles } from "../../Focus/styles";

const styles = (theme) => ({
  dropZoneContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    border: `1px dotted ${theme.hv.palette.atmosphere.atmo6}`,
    cursor: "pointer",
    background: `${theme.hv.palette.atmosphere.atmo2}`,
    "&:hover": {
      background: `${theme.hv.palette.atmosphere.atmo1}`,
      border: `1px dotted ${theme.hv.palette.accent.acce1}`,
    },
    "&:focus": {
      background: `${theme.hv.palette.atmosphere.atmo1}`,
      ...outlineStyles,
    },
  },
  dropZoneContainerDisabled: {
    "&$dropZoneContainer": {
      background: `${theme.hv.palette.atmosphere.atmo4}`,
      border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
      cursor: "not-allowed",
      "&:hover": {
        background: `${theme.hv.palette.atmosphere.atmo4}`,
        border: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
        cursor: "not-allowed",
      },
    },
    "& $dragText": {
      color: theme.hv.palette.atmosphere.atmo6,
    },
    "& $selectFilesText": {
      color: theme.hv.palette.atmosphere.atmo6,
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
    margin: `${theme.hv.spacing.md}px auto`,
    minHeight: 40,
  },
  dropZoneLabelsGroup: {
    display: "flex",
    marginBottom: 5,
    "& label:nth-child(1)": {
      marginRight: `${theme.hv.spacing.sm}px`,
    },
    "& p:nth-child(3)": {
      marginRight: `${theme.hv.spacing.sm}px`,
      marginLeft: "auto",
    },
    "& p:last-child": {
      marginRight: 0,
    },
  },
  dropZoneAreaLabels: {
    display: "flex",
    width: 115,
    margin: "auto",
  },
  dropZoneAreaIcon: {
    margin: "auto",
    marginRight: `${theme.hv.spacing.xs}px`,
  },
  dragText: {
    ...theme.hv.typography.normalText,
  },
  selectFilesText: {
    ...theme.hv.typography.highlightText,
  },
});

export default styles;
