import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvHeader", {
  root: {
    height: theme.header.height,
    backgroundColor: theme.header.backgroundColor,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    flexShrink: 0,
    zIndex: theme.zIndices.banner,
    color: theme.colors.atmo1,
    boxShadow: theme.header.shadow,
    borderTop: `${theme.header.borderTopThickness} solid ${theme.header.borderTopColor}`,
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: `0 ${theme.space.sm}`,
    boxShadow: theme.header.shadow,
    "& > *:not(nav)": {
      zIndex: 2,
    },
  },
  backgroundColor: {},
});
