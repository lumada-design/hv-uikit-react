import { outlineStyles } from "../../Focus/styles";

const styles = theme => ({
  container: {
    height: "32px",
    marginRight: 0,
    marginLeft: 0,
    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3
    },
    "&:not($disableFocus):focus-within": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
      "& svg": {
        ...outlineStyles
      }
    }
  },
  disableFocus: {
    outline: "none !important"
  },
  labelTypography: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    ...theme.hv.typography.normalText,
    "&$labelDisabled": {
      ...theme.hv.typography.placeholderText
    }
  },
  labelDisabled: {
    backgroundColor: "transparent",
    cursor: "not-allowed",
    "&:hover": {
      backgroundColor: "transparent",
      cursor: "not-allowed"
    }
  },
  labelEnd: {
    paddingRight: "8px"
  },
  labelStart: {
    paddingLeft: "8px"
  },
  checkBox: {
    padding: 0
  },
  icon: {},
  disabledBorder: {
    "& svg ": {
      "& path:nth-child(2)": {
        fill: theme.hv.palette.atmosphere.atmo5
      }
    }
  }
});

export default styles;
