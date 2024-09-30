import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

const { staticClasses, useClasses } = createClasses("HvLoadingContainer", {
  root: {
    position: "relative",
    height: "inherit",
  },
  loading: {
    position: "absolute",
    userSelect: "none",
    inset: 0,
    zIndex: theme.zIndices.overlay,
    transition: "background-color .2s ease",
    backgroundColor: theme.alpha("atmo1", "var(--opacity, 80%)"),
  },
});

export { staticClasses, useClasses };
