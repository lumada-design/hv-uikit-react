import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

export const { staticClasses, useClasses } = createClasses("HvFooter", {
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: `${theme.space.xs} ${theme.space.sm}`,
    height: 40,
    bottom: 0,
    zIndex: theme.zIndices.base,
    backgroundColor: theme.colors.bgSurface,
    boxShadow: `0 -1px 0 ${theme.colors.borderDivider}`,
  },
  name: {},
  rightContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: "auto",
  },
  copyright: {},
  separator: {
    width: 1,
    height: 16,
    backgroundColor: theme.colors.text,
    margin: `${theme.space.xs} ${theme.space.sm}`,
  },
  small: {
    "&$root": {
      height: "unset",
      flexDirection: "column",
      padding: theme.space.xs,
    },
    "& $name": {
      marginBottom: theme.space.xs,
    },
    "& $rightContainer": {
      flexDirection: "column",
      textAlign: "center",
      marginLeft: "unset",
    },
    "& $copyright": {
      flexDirection: "column",
      marginBottom: theme.space.xs,
    },
    "& $separator": { display: "none" },
  },
});
