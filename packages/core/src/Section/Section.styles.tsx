import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvSection", {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.bgSurface,
    borderRadius: theme.radii.round,
    border: `1px solid ${theme.colors.divider}`,
  },
  hidden: { height: 0, display: "none" },
  header: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    minHeight: theme.sizes.sm,
    padding: theme.space.sm,
  },
  content: {
    padding: theme.spacing(0, "sm", "sm", "sm"),
  },
  spaceTop: {
    paddingTop: theme.space.sm,
  },
  actions: {
    display: "flex",
    gap: theme.space.xs,
    position: "absolute",
    right: 0,
  },
  raisedHeader: {
    zIndex: 1,
    boxShadow: theme.colors.shadow,
    "+ div": {
      paddingTop: theme.space.sm,
    },
  },
});
