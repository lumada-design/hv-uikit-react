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
    paddingRight: theme.space.md,
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
  codeEditor: css({
    ".margin, .margin-view-overlays": {
      paddingLeft: "4px!important",
    },
    ".visible.scrollbar.horizontal": {
      height: "10px!important",
      "& .slider": {
        top: "2px!important",
      },
    },
  }),
  codeEditorTools: css({
    display: "flex",
    padding: 8,
    border: `1px solid ${theme.colors.atmo4}`,
    borderBottom: "none",
    alignItems: "center",
    justifyContent: "space-between",
  }),
};
