import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

export const styles = {
  root: css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingLeft: theme.space.xs,
  }),
  group: css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: theme.space.xs,
  }),
  groupName: css({
    width: "30%",
  }),
  groupColors: css({
    width: "70%",
    textAlign: "end",
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
