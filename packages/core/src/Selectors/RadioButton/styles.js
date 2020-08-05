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
        borderRadius: "50%",
        ...outlineStyles
      }
    }
  },
  disableFocus: {
    outline: "none !important"
  },
  labelTypography: {
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
  radio: {
    padding: 0
  },
  icon: {
    width: "32px",
    height: "32px"
  }
});

export default styles;
