import { outlineStyles } from "../../../core/src/Focus/styles";

const styles = (theme) => ({
  root: {
    position: "relative",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: theme.hv.palette.semantic.sema7,
    margin: "0 8px 8px 0",
    float: "left",
    minWidth: 70,
    padding: theme.hvSpacing(0, "xs"),
    height: 20,
    minHeight: 20,
    textAlign: "center",
    " &:hover": {
      "&:not(disabled)": {
        "& > div svg": {
          backgroundColor: theme.hv.palette.atmosphere.atmo4,
          ...outlineStyles,
        },
        "&:focus": {
          "& > div svg": {
            backgroundColor: theme.hv.palette.atmosphere.atmo4,
            ...outlineStyles,
          },
        },
      },
    },
  },
  /* Styles applied to the label `span` element. */
  label: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingLeft: 12,
    paddingRight: 12,
    whiteSpace: "nowrap",
    maxWidth: 200,
    minHeight: 20,
  },
  square: {
    borderRadius: 2,
  },
  round: {
    borderRadius: 28,
  },

  deleteIcon: {
    WebkitTapHighlightColor: "transparent",
    height: 10,
    width: 12,
    cursor: "pointer",
    color: "white",
    "&:hover": {
      "& *": {
        backgroundColor: theme.palette.atmo3,
        ...outlineStyles,
      },
    },
  },
  focusVisible: {},
  disabled: {
    color: theme.hv.palette.atmosphere.atmo5,
    cursor: "not-allowed",
    PointerEvent: "none",
    opacity: 1,
    "&:hover": {
      color: theme.hv.palette.atmosphere.atmo5,
      border: `transparent`,
    },
    "&$focusVisible": {
      backgroundColor: theme.palette.atmo3,
      ...outlineStyles,
    },
  },
  informational: {
    backgroundColor: theme.hv.palette.semantic.sema7,
  },
  success: {
    backgroundColor: theme.hv.palette.semantic.sema8,
  },
  warning: {
    backgroundColor: theme.hv.palette.semantic.sema20,
  },
  error: {
    backgroundColor: theme.hv.palette.semantic.sema9,
  },
});
export default styles;
