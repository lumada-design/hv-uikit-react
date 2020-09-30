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

  radio: {},

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
    backgroundColor: theme.hv.palette.atmosphere.atmo3,
    ...outlineStyles,

    // ensure more specificity than .HvBaseRadio-root.HvBaseRadio-focusVisible svg
    "& $radio div>svg": {
      outline: "none",
      boxShadow: "none",
    },
  },
});

export default styles;
