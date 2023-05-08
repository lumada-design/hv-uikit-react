import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  root: css({
    display: "flex",
    minHeight: `calc(100vh - ${theme.header.height} - 3px)`,
  }),
};

export default styles;
