import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvTabs", {
  root: {
    minHeight: 0,
    overflow: "visible",
    "&$floating": {
      "& .HvTab-root": {
        marginTop: 0,
        "&:hover": {
          borderRadius: theme.radii.full,
        },
        "::after": {
          display: "none",
        },
      },
      "& .HvTab-selected": {
        border: `1px solid ${theme.colors.primary}`,
        borderRadius: theme.radii.full,
        backgroundColor: theme.colors.pp.bgSurface,
      },
      "& $indicator": {
        display: "none",
      },
      "& $flexContainer": {
        display: "inline-flex",
        backgroundColor: theme.colors.pp.bgActive,
        borderRadius: theme.radii.full,
        "& button:first-of-type": {
          marginLeft: 0,
        },
      },
    },
  },
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > div": {
      width: "100%",
      backgroundColor: `${theme.colors.secondary}`,
    },
    height: 2,
  },
  scroller: {
    overflow: "visible !important",
  },
  flexContainer: {
    "& button:first-of-type": {
      marginLeft: "3px",
    },
  },
  floating: {},
});
