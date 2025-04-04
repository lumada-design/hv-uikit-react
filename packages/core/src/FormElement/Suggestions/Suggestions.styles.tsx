import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvSuggestions", {
  root: { position: "relative" },
  list: {
    backgroundColor: theme.colors.bgContainer,
    border: `1px solid ${theme.colors.text}`,
    boxShadow: theme.colors.shadow,
    padding: theme.space.xs,
    width: "100%",
  },
  popper: {
    width: "var(--popper-width)",
    position: "absolute",
    zIndex: theme.zIndices.tooltip,
    ":not($portal)": {
      transform: "translate3d(0, -1px, 0) !important",
    },
  },
  portal: {},
});
