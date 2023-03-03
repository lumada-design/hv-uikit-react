import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  error: css({
    alignItems: "center",
  }),
  loading: css({
    height: "100%",
    zIndex: theme.zIndices.overlay,
  }),
};

export default styles;
