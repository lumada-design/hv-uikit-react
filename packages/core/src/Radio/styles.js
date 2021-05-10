import { outlineStyles } from "../Focus/styles";

const styles = (theme) => ({
  root: {
    display: "inline-block",
  },

  container: {
    cursor: "pointer",
    display: "flex",

    height: 32,

    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shortest,
    }),

    "&:hover": {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
  },
  invalidContainer: {
    borderBottom: `1px solid ${theme.hv.palette.semantic.sema4}`,
  },
  disabled: {
    cursor: "not-allowed",
  },

  radio: {
    height: 32,
  },
  invalidRadio: {
    borderBottom: `1px solid ${theme.hv.palette.semantic.sema4}`,
  },

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
