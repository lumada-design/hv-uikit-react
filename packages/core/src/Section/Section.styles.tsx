import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvSection", {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.space.sm,
    backgroundColor: theme.colors.atmo1,
    borderRadius: theme.radii.round,
    border: `1px solid ${theme.colors.atmo4}`,
  },
  hidden: { height: 0, display: "none" },
  header: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    minHeight: theme.sizes.sm,
  },
  content: {
    marginTop: theme.space.sm,
  },
  actions: {
    display: "flex",
    gap: theme.space.xs,
    position: "absolute",
    right: 0,
  },
});
