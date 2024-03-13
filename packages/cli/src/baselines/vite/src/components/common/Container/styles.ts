import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  root: css({
    display: "flex",
    paddingTop: `calc(${theme.header.height} + ${theme.space.lg})`,
    paddingBottom: theme.space.lg,
    minHeight: "100vh",
  }),
};

export default styles;
