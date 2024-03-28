import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../../utils/classes";
import { staticClasses as queryBuilderClasses } from "../QueryBuilder.styles";

export const { useClasses, staticClasses } = createClasses(
  "HvQueryBuilder-Rule",
  {
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
        height: "39px",

        borderBottom: `1px solid ${theme.colors.atmo4}`,
        borderLeft: `1px solid ${theme.colors.atmo4}`,

        top: 0,
        left: `calc(-1 * 17px)`,
      },

      [`:not(.${queryBuilderClasses.topRulesContainer})>&:last-child::after`]: {
        content: '""',
        position: "absolute",
        zIndex: 1,

        width: "17px",
        height: "100%",

        borderLeft: `1px solid ${theme.colors.atmo4}`,

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
  },
);
