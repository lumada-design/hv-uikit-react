import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  root: css({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#f7fafd",
  }),
  canvas: css({
    height: "100%",
    background: theme.colors.backgroundColor,
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
};

export default styles;
