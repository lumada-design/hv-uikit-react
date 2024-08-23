import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvHeader", {
  root: {
    height: theme.header.height,
    backgroundColor: theme.colors.atmo1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    flexShrink: 0,
    zIndex: theme.zIndices.banner,
    borderTop: "none",
    boxShadow: theme.colors.shadow,
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: `0 ${theme.space.sm}`,
    "& > *:not(nav)": {
      zIndex: 2,
    },
  },
  fixed: { position: "fixed", top: 0, left: "auto", right: 0 },
  backgroundColor: {},
});
