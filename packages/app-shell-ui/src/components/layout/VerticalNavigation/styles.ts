import { css } from "@emotion/css";
import {
  theme,
  verticalNavigationTreeClasses,
} from "@hitachivantara/uikit-react-core";

export const classes = {
  root: css({
    height: `calc(100vh - ${theme.header.height})`,
    top: theme.header.height,
    zIndex: theme.zIndices.overlay,
    position: "sticky",
  }),
  /** full-height Vertical Navigation */
  pentaho: css({
    height: "100dvh",
    marginTop: `calc(-1 * var(--headerHeight))`,
    top: 0,
  }),
  compact: css({
    position: "fixed",
    top: theme.header.height,
  }),
  popup: css({
    maxHeight: `calc(100vh - ${theme.header.height})`,
    overflowY: "auto",
    boxShadow: theme.colors.shadow,
    [`& .${verticalNavigationTreeClasses.popup}`]: { boxShadow: "none" },
  }),
  navigationHeader: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    "& svg path": {
      fill: theme.colors.textLight,
    },
    gap: theme.space.xs,
  }),
  navigationCollapse: css({
    position: "absolute",
    bottom: 0,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  }),
  navigationCollapseButton: css({
    color: "inherit",
  }),
  navigationCollapseAlignRight: css({
    marginLeft: "auto",
  }),
  navigationCollapseText: css({
    color: "inherit",
  }),
};
