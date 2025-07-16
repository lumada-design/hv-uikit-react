import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { staticClasses as queryBuilderClasses } from "../QueryBuilder.styles";

export const { useClasses } = createClasses("HvQueryBuilderRule", {
  root: {
    position: "relative",
    marginTop: theme.space.xs,
    minHeight: 94,

    "&>div:not(:last-child)": {
      paddingRight: theme.space.md,
    },

    // hide required * as all fields are required
    "& label>span[aria-hidden]": {
      visibility: "hidden",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      zIndex: 2,

      width: "17px",
      height: "44px",

      borderBottom: `1px solid ${theme.colors.border}`,
      borderLeft: `1px solid ${theme.colors.border}`,

      top: 0,
      left: `calc(-1 * 17px)`,
    },

    [`:not(.${queryBuilderClasses.topRulesContainer})>&:last-child::after`]: {
      content: '""',
      position: "absolute",
      zIndex: 1,

      width: "17px",
      height: "100%",

      borderLeft: `1px solid ${theme.colors.border}`,

      top: 0,
      left: `calc(-1 * 17px)`,
    },
  },
  actionsContainer: {
    marginLeft: "auto",
    marginTop: "24px",

    "&>:not(:last-child)": {
      marginRight: theme.space.xs,
    },
  },
  isMdDown: {
    "&>div:not(:last-child)": {
      paddingRight: 0,
    },
    "&>div:not(:first-of-type)": {
      marginTop: theme.space.xs,
    },
  },
});
