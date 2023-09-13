import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

const styles = {
  container: css({
    padding: theme.space.sm,
  }),
  card: css({
    cursor: "pointer",
    width: "100%",
    padding: 0,
    textAlign: "left",
  }),
  title: css({
    margin: `${theme.space.xs} 0`,
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
  loading: css({
    margin: `${theme.space.xs} 0`,
  }),
};

export default styles;
