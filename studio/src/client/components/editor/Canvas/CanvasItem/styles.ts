import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  root: css({
    // display: "inline-block",
    position: "relative",
    "&:hover :nth-child(1)": {
      visibility: "visible",
    },
    cursor: "move",
  }),
  component: css({
    display: "inline-block",
    padding: 1,
    border: `1px solid transparent`,
    "&:hover": {
      border: `1px dashed ${theme.colors.secondary_60}`,
      borderRadius: 2,
    },
  }),
  selected: css({
    zIndex: 99999,
  }),
  // grid: css({
  //   display: "flex",
  //   width: "100%",
  //   border: `1px dashed ${theme.colors.secondary_60}`,
  //   color: theme.colors.secondary_60,
  //   minHeight: 50,
  //   textAlign: "center",
  //   alignItems: "center",
  // }),
  handle: css({
    display: "flex",
    position: "absolute",
    backgroundColor: theme.colors.secondary_60,
    height: 20,
    top: -19,
    borderRadius: 2,
    visibility: "hidden",
  }),
  handleText: css({
    color: theme.colors.atmo1,
    marginTop: 2,
  }),
  handleBtn: css({
    margin: "2px 0",
    height: 15,
    width: 15,
    minWidth: 15,
  }),
  handleIcon: css({
    color: theme.colors.atmo1,
    "& svg": {
      "& path": {
        fill: `${theme.colors.atmo1} !important`,
      },
    },
    width: 11,
  }),
  handleDrag: css({
    height: 11,
    margin: "2px 5px",
  }),
  handleClose: css({
    width: 15,
    height: 15,
  }),
};

export default styles;
