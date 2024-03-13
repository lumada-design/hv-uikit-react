import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  root: css({
    height: `calc(100vh - ${theme.header.height})`,
  }),
  empty: css({
    alignItems: "center",
  }),
};

export default styles;
