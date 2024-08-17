import { tabClasses } from "@mui/base/Tab";
import { createClasses, theme } from "@hitachivantara/uikit-react-core";

import { toolbarTabEditorClasses } from "./ToolbarTabEditor";

export const MIN_TAB_WIDTH = 120;
const MAX_TAB_WIDTH = 220;
const TAB_HEIGHT = 32;
const CLOSE_ICON_SIZE = 32;
const TAB_ICON_SIZE = 16;
const TAB_PADDING = theme.space.xs;
const TAB_COLOR = "#EFF6FF"; // TODO - change HEX for token when available (dark/light)

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
      "&:first-of-type": { borderEndStartRadius: theme.radii.base },
      [`&.${tabClasses.selected}`]: {
        color: theme.colors.primary,
        backgroundColor: TAB_COLOR,
        borderColor: theme.colors.atmo4,
      },
      [`&:hover:not(.${tabClasses.selected}), &:focus:not(.${tabClasses.selected})`]:
        {
          borderRadius: 0,
          backgroundColor: TAB_COLOR,
          borderColor: TAB_COLOR,
          "&:first-of-type": { borderEndStartRadius: theme.radii.base },
        },

      // Hide icon when editor is hovered and focused
      [`&:has($tabLabelEditor:hover) $tabIconContainer, &:has(.${toolbarTabEditorClasses.edit}) $tabIconContainer`]:
        {
          display: "none",
        },
      // Hide close when editor is focused
      [`&:has(.${toolbarTabEditorClasses.edit}) $closeIconContainer`]: {
        display: "none",
      },
    },
    tabLabel: {
      "&:not($tabLabelEditor)": {
        margin: theme.spacing(0, "xs"),
      },
    },
    tabLabelEditorRoot: {}, // TODO - FIX WIDTH
    tabLabelEditor: {
      color: theme.colors.primary,
    },
    tabContent: {
      position: "relative",
      height: TAB_HEIGHT,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      padding: TAB_PADDING,
    },
    tabIconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: TAB_ICON_SIZE,
    },
    closeIconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "auto",
      marginRight: theme.spacing(-1),
      width: CLOSE_ICON_SIZE,
      "&:hover": {
        backgroundColor: theme.colors.containerBackgroundHover,
        borderRadius: theme.radii.circle,
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
    dropdownMenuListRoot: {
      maxHeight: 220,
    },
  },
);
