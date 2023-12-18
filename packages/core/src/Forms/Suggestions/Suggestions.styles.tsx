import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvSuggestions", {
  root: { position: "relative" },
  list: {
    backgroundColor: theme.colors.atmo1,
    boxShadow: theme.colors.shadow,
    padding: theme.space.xs,
    width: "100%",
  },
  popper: {
    width: "100%",
    position: "absolute",
    transform: "translate3d(0, -1px, 0) !important",
    zIndex: theme.zIndices.tooltip,
  },
});
