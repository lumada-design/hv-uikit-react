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
    height: `calc(100% - ${theme.header.height})`,
    flexDirection: "column",
    gap: theme.space.sm,
    borderRight: `1px solid ${theme.colors.atmo5}`,
    marginTop: theme.header.height,
    padding: theme.space.sm,
    paddingRight: theme.space.md,
    position: "fixed",
    overflowY: "scroll",
    zIndex: theme.zIndices.overlay,
    boxShadow: `-10px 0px 10px 1px rgba(65,65,65,0.12)`,
  }),
  label: css({
    ...theme.typography.sectionTitle,
    textTransform: "uppercase",
  }),
  code: css({
    width: "100%",
    height: 260,
    fontFamily: "Courier New",
    fontSize: "12px",
    border: `1px solid ${theme.colors.acce4}`,
  }),
  themeName: css({
    display: "flex",
    gap: 10,
    alignItems: "center",
  }),
  themeNameInput: css({
    width: "100%",
  }),
  themeBase: css({
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
  }),
};
