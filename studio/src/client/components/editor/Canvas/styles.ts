import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  root: css({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#f7fafd",
    margin: "0 3px",
  }),
  canvas: css({
    maxHeight: "100%",
    overflowY: "auto",
    background: theme.colors.atmo1,
    transition: "0.5s ease",
    padding: theme.space.sm,
  }),
  desktop: css({
    width: "100%",
  }),
  mobile: css({
    width: "500px",
  }),
  empty: css({
    display: "inline-grid",
    alignItems: "center",
    textAlign: "center",
    height: "100%",
    width: "100%",
    whiteSpace: "pre-wrap",
  }),
  field: css({
    padding: 15,
    "& > *": {
      width: "100%",
      pointerEvents: "none",
    },
  }),
  overlay: css({
    padding: 15,
  }),
  spacer: css({
    background: "black",
    width: "100%",
    opacity: 0.5,
    height: 1,
  }),
};

export default styles;
