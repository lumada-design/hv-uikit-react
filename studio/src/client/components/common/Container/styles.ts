import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  container: css({
    padding: 0,
    paddingTop: `calc(${theme.header.height} + 3px)`,
    height: "100vh",
  }),
};

export default styles;
