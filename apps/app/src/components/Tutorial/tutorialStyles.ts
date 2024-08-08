import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
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
    left: "calc(50% - 15px)",
  }),
  triangle_down: css({
    width: 0,
    height: 0,
    borderLeft: `15px solid transparent`,
    borderRight: `15px solid transparent`,
    borderTop: `15px solid ${theme.colors.atmo1}`,
    position: "absolute",
    bottom: -15,
    left: "calc(50% - 15px)",
  }),
  triangle_right: css({
    width: 0,
    height: 0,
    borderLeft: `15px solid ${theme.colors.atmo1}`,
    borderBottom: `15px solid transparent`,
    borderTop: `15px solid transparent`,
    position: "absolute",
    right: -15,
    top: "calc(50% - 15px)",
  }),
  triangle_left: css({
    width: 0,
    height: 0,
    borderRight: `15px solid ${theme.colors.atmo1}`,
    borderBottom: `15px solid transparent`,
    borderTop: `15px solid transparent`,
    position: "absolute",
    left: -15,
    top: "calc(50% - 15px)",
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
