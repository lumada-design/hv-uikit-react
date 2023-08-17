import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

export const styles = {
  root: css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
  }),
  group: css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: theme.space.sm,
  }),
  groupName: css({
    width: "27%",
  }),
  groupColors: css({
    width: "73%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: 2,
  }),
  color: css({
    width: 20,
    height: 25,
    marginLeft: 5,
    padding: 0,
    backgroundColor: "transparent",
  }),
  tooltip: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }),
};
