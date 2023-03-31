import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  section: css({
    marginBottom: theme.space.md,
  }),
  headerRoot: css({
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 5,
  }),
  headerTitle: css({
    color: theme.colors.secondary,
    fontSize: "18px",
    letterSpacing: "0.02em",
    lineHeight: "28px",
    fontWeight: 600,
  }),
  cardContent: css({
    paddingLeft: 0,
    paddingRight: 0,
  }),
  tagRoot: css({
    width: "100%",
  }),
};

export default styles;
