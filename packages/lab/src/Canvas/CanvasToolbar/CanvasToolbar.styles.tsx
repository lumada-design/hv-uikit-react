import { createClasses } from "@hitachivantara/uikit-react-core";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvCanvasToolbar", {
  root: {
    width: `calc(100% - var(--canvas-panel-width))`,
    height: 54,
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.atmo1,
    padding: theme.spacing(0, "md", 0, 0),
    position: "absolute",
    right: 0,
    top: 0,
    margin: `0 0 0 ${theme.space.md}`,
    transition: "width 0.3s ease",
  },
  back: {
    borderRadius: `${theme.radii.full} 0 0 ${theme.radii.full}`,
    minWidth: 68,
    backgroundColor: theme.colors.containerBackgroundHover,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, "md"),
    height: "100%",
    flexGrow: 1,
  },
  actions: {
    display: "flex",
    flexWrap: "nowrap",
    overflow: "scroll",
  },
});
