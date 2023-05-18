import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

export const styles = {
  root: css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.space.xs,
    marginBottom: theme.space.lg,
  }),
  item: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  }),
  size: css({ width: 60 }),
  value: css({ width: 140 }),
  set: css({ width: 70 }),
};
