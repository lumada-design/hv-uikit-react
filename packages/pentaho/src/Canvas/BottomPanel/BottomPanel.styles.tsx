import {
  buttonClasses,
  createClasses,
  theme,
} from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses(
  "HvCanvasBottomPanel",
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
        backgroundColor: theme.colors.bgSurface,
        ...theme.typography.label,
      },
    },
    multipleTabs: {
      "& $tab": { maxWidth: "288px" },
      "& $rightActions": {
        right: `calc(100% - var(--right) + ${theme.space.xs})`,
      },
    },
    overflowing: {},
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
      paddingLeft: "var(--left-actions-width)",
      paddingRight: "var(--right-actions-width)",
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
    actionsDisabled: {
      pointerEvents: "none",
      [`&& .${buttonClasses.disabled}`]: {
        pointerEvents: "none",
        backgroundColor: "transparent",
        borderColor: "transparent",
        ":hover": {
          backgroundColor: "transparent",
          borderColor: "transparent",
        },
      },
    },
    content: { borderTopRightRadius: "var(--right-border-radius)" },
  },
);
