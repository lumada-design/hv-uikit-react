import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  container: css({
    padding: theme.space.sm,
  }),
  card: css({
    cursor: "pointer",
  }),
  title: css({
    margin: `${theme.space.xs}px 0`,
  }),
  content: css({
    display: "flex",
    alignItems: "center",
  }),
  variation: css({
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  }),
  selected: css({
    outline: `1px solid ${theme.colors.secondary_60}`,
  }),
};

export default styles;
