import { outlineStyles } from "../Focus/styles";

const styles = (theme) => ({
  root: {
    display: "inline-block",
  },

  container: {
    cursor: "pointer",
    display: "flex",

    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
  },
  disabled: {
    cursor: "not-allowed",
  },

  checkbox: {},

  label: {
    // ensure more specificity than .HvTypography-highlightText
    "$root &": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      verticalAlign: "middle",
      paddingRight: theme.hv.spacing.xs,
      whiteSpace: "nowrap",
      ...theme.hv.typography.normalText,
      cursor: "pointer",
      height: "32px",
      lineHeight: "32px",
      width: "100%",
    },
    "$disabled &": {
      // not spreading theme.hv.typography.placeholderText, it overrides too many things
      color: theme.hv.palette.atmosphere.atmo5,
      cursor: "not-allowed",
    },
  },
  focusVisible: {
    ...outlineStyles,
    backgroundColor: theme.hv.palette.atmosphere.atmo3,

    // ensure more specificity than .HvBaseCheckbox-root.HvBaseCheckbox-focusVisible svg
    "& $checkbox div>svg": {
      outline: "none",
      boxShadow: "none",
    },
  },
});

export default styles;
