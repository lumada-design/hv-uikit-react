import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses(
  "HvCanvasFloatingPanel",
  {
    root: {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      right: 0,
      bottom: 0,
      width: "100%",
      maxHeight: "500px",
      visibility: "visible",
      transition: "visibility 0.3s ease, max-height 0.3s ease, width 0.3s ease",
    },
    closed: {
      maxHeight: 0,
      visibility: "hidden",
    },
    minimized: {
      "& $content": {
        display: "none",
      },
      "& $tab": {
        backgroundColor: theme.colors.atmo1,
        ...theme.typography.label,
      },
    },
    multipleTabs: {
      "& $tab": { maxWidth: "288px" },
      "& $rightActions": {
        right: `calc(100% - var(--right) + ${theme.space.xs})`,
      },
    },
    overflowing: {
      "& $tabTitle": {
        paddingLeft: theme.space.sm,
        paddingRight: theme.space.sm,
      },
    },
    tab: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
    },
    tabTitle: {
      display: "flex",
      width: "100%",
      padding: theme.space.sm,
      paddingLeft: `calc(var(--left-actions-width) + ${theme.space.xs})`,
      paddingRight: `calc(var(--right-actions-width) + ${theme.space.xs})`,
    },
    tabsRoot: {
      position: "relative",
    },
    leftActions: {
      position: "absolute",
      left: `calc(var(--left) + ${theme.space.xs})`,
      top: 8,
    },
    rightActions: {
      position: "absolute",
      right: theme.space.xs,
      top: 8,
    },
    content: { borderTopRightRadius: "var(--right-border-radius)" },
  },
);
