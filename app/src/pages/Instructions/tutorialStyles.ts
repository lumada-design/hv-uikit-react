import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  root: css({
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: theme.zIndices.modal,
  }),
  buttons: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.space.md,
  }),
  triangle_up: css({
    width: 0,
    height: 0,
    borderLeft: `15px solid transparent`,
    borderRight: `15px solid transparent`,
    borderBottom: `15px solid ${theme.colors.atmo1}`,
    position: "absolute",
    top: -15,
  }),
  triangle_down: css({
    width: 0,
    height: 0,
    borderLeft: `15px solid transparent`,
    borderRight: `15px solid transparent`,
    borderTop: `15px solid ${theme.colors.atmo1}`,
    position: "absolute",
    bottom: -15,
  }),
  triangle_right: css({
    width: 0,
    height: 0,
    borderLeft: `15px solid ${theme.colors.atmo1}`,
    borderBottom: `15px solid transparent`,
    borderTop: `15px solid transparent`,
    position: "absolute",
    right: -15,
  }),
  triangle_left: css({
    width: 0,
    height: 0,
    borderRight: `15px solid ${theme.colors.atmo1}`,
    borderBottom: `15px solid transparent`,
    borderTop: `15px solid transparent`,
    position: "absolute",
    left: -15,
  }),
  paper: css({
    [`&.MuiDialog-paper.MuiPaper-root`]: {
      position: "absolute",
      margin: 0,
      overflow: "unset",
      minWidth: "unset",
      maxWidth: "unset",
    },
  }),
};

export default styles;
