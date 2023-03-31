import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  headerTitle: css({
    color: theme.colors.secondary,
    fontSize: "18px",
    letterSpacing: "0.02em",
    lineHeight: "28px",
    fontWeight: 600,
  }),
  titleRoot: css({
    paddingBottom: 5,
  }),
};

export default styles;
