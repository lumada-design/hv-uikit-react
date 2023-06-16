import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";

export const styles = {
  closed: css({
    display: "none",
  }),
  root: css({
    backgroundColor: theme.colors.atmo1,
    right: 0,
    display: "flex",
    width: 390,
    flexDirection: "column",
    gap: theme.space.sm,
    padding: theme.space.sm,
    position: "fixed",
    zIndex: theme.zIndices.overlay,
    height: "100vh",
    boxShadow: `-4px 0px 10px 1px rgba(125,125,125,0.12)`,
    overflowY: "scroll",
  }),
  label: css({
    ...theme.typography.sectionTitle,
    textTransform: "uppercase",
  }),
  themeBase: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
  }),
  themeTools: css({
    justifyContent: "center",
    fontSize: 12,
  }),
};
