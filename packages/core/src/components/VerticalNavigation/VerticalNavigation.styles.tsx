import { createClasses } from "@core/utils/classes";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses(
  "HvVerticalNavigation",
  {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",

      width: "220px",

      background: theme.colors.atmo1,
      boxShadow: theme.colors.shadow,
      clipPath: "inset(0px -12px 0px 0px)",

      "& > :only-child": {
        padding: theme.space.sm,
      },
      "& > :not(nav:first-of-type)": {
        borderTop: `3px solid ${theme.colors.atmo2}`,
        padding: theme.spacing("xs", "sm", "sm", "sm"),
      },

      "& > :first-of-type:not(:last-child)": {
        borderTop: "none",
        padding: theme.spacing("sm", "sm", "xs", "sm"),
      },
    },
    collapsed: {
      width: "56px",
      "&$childData": {
        width: "66px",
      },
      "& > :first-of-type:not(:last-child)": {
        padding: theme.spacing("sm", "xs", "xs", "xs"),
      },

      "& > :not(nav:first-of-type)": {
        padding: theme.spacing("xs", "xs", "sm", "xs"),
      },
    },

    slider: {
      "& > div:first-of-type": {
        borderBottom: `3px solid ${theme.colors.atmo2}`,
      },
    },

    childData: {},
  }
);
