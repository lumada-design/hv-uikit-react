import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  over: css({
    background: `${theme.colors.cat1_60} !important`,
  }),
  dragging: css({
    background: `${theme.colors.cat1_20} !important`,
  }),
};

export default styles;
