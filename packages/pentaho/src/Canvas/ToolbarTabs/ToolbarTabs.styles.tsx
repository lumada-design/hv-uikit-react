import { tabClasses } from "@mui/base/Tab";
import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const MIN_TAB_WIDTH = 120;
const MAX_TAB_WIDTH = 220;
const TAB_HEIGHT = 32;

export const { staticClasses, useClasses } = createClasses(
  "HvCanvasToolbarTabs",
  {
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      backgroundColor: theme.colors.atmo1,
      boxShadow: theme.colors.shadow,
      borderRadius: `0px 0px ${theme.radii.base} ${theme.radii.base}`,
      gap: theme.space.sm,
      transition: "width 0.3s ease",
    },
    tabsContainer: {
      display: "flex",
    },
    tabsList: {
      height: TAB_HEIGHT,
      background: theme.colors.atmo1,
      borderEndStartRadius: theme.radii.base,
    },
    tab: {
      width: `clamp(${MIN_TAB_WIDTH}px, 100%, ${MAX_TAB_WIDTH}px)`,
      border: `1px solid ${theme.colors.atmo1}`,
      borderBottom: "none",
      borderRadius: "10px 10px 0 0",
      boxShadow: "none",
      backgroundColor: theme.colors.atmo1,
      [`&.${tabClasses.selected}`]: {
        color: theme.colors.primary,
        backgroundColor: theme.colors.containerBackgroundHover,
        borderColor: theme.colors.atmo4,
      },
      "&:first-of-type": { borderEndStartRadius: theme.radii.base },
    },
    tabContent: {
      position: "relative",
      height: TAB_HEIGHT,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: theme.space.xs,
    },
    tabIcon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 16,
    },
    closeIconContainer: {
      marginRight: `calc(-1 * ${theme.space.xs})`,
      width: 32,
    },
    tabDivider: {
      position: "absolute",
      height: 18,
      width: 1,
      backgroundColor: theme.colors.atmo3,
      right: 0,
    },
    actionsContainer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: theme.space.sm,
    },
    dropdownMenu: {
      margin: theme.spacing(0, "sm"),
    },
    dropdownMenuListRoot: {
      maxHeight: 220,
    },
  },
);
