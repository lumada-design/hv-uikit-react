import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  root: css({
    display: "flex",
    paddingTop: theme.header.height,
    minHeight: "100vh",
  }),
  fullWidth: css({
    padding: 0,
    maxWidth: "100%",
  }),
};

export default styles;
