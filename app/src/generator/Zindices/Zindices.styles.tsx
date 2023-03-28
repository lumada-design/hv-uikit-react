import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

export const styles = {
  root: css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.space.xs,
    paddingLeft: theme.space.xs,
  }),
  item: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  }),
  zIndices: css({ width: 60 }),
  value: css({ width: 180 }),
  set: css({ width: 70 }),
};
