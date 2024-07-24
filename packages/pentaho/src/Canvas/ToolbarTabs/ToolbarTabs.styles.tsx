import { tabClasses } from "@mui/base/Tab";
import {
  baseInputClasses,
  createClasses,
  theme,
} from "@hitachivantara/uikit-react-core";

export const ICON_WIDTH = 32;
export const MIN_TAB_WIDTH = 120;
const MAX_TAB_WIDTH = 220;
const TAB_HEIGHT = 32;
const TAB_LABEL_HEIGHT = 24;

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
      position: "relative",
      display: "flex",
    },
    tabsList: {
      height: TAB_HEIGHT,
      background: theme.colors.atmo1,
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
    },
    tabContent: {
      height: TAB_HEIGHT,
      display: "flex",
      justifyContent: "space-between",
      position: "relative",
      width: "100%",
      padding: theme.space.xs,
      "& > div:first-of-type:not($tabIcon)": {
        visibility: "hidden",
      },
      "& > div:nth-of-type(2)": {
        visibility: "hidden",
        minWidth: `calc(${MIN_TAB_WIDTH}px - ${theme.space.xs} - 2 * ${ICON_WIDTH}px)`,
        maxWidth: `calc(${MAX_TAB_WIDTH}px - ${theme.space.xs} - 2 * ${ICON_WIDTH}px)`,
      },
      "& > div:nth-of-type(3)": {
        visibility: "hidden",
        marginRight: `calc(-1 * ${theme.space.xs})`,
      },
    },
    tabIcon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    closeButton: {
      position: "absolute",
      top: 0,
      right: "calc(100% - var(--right))",
      color: "var(--close-color)",
    },
    tabLabel: {
      position: "absolute",
      width: "var(--editor-width)",
      right: `calc(100% - var(--right) + ${ICON_WIDTH}px)`,
      height: TAB_LABEL_HEIGHT,
      top: 4.5,
      "&:not($activeTabLabel)": {
        ...theme.typography.body,
        color: theme.colors.secondary_60,
        background: "none",
        cursor: "pointer",
      },
    },
    activeTabLabel: {
      "& button": {
        height: TAB_LABEL_HEIGHT,
        minHeight: TAB_LABEL_HEIGHT,
        backgroundColor: "transparent",
        "& p": { ...theme.typography.label, color: theme.colors.primary },
        "& span": { display: "none" },
      },
      [`&& .${baseInputClasses.inputRoot}`]: {
        height: TAB_LABEL_HEIGHT,
        minHeight: TAB_LABEL_HEIGHT,
      },
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
  },
);
