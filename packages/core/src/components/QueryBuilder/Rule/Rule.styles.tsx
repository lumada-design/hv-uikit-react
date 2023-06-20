import { createClasses } from "@core/utils";
import { theme } from "@hitachivantara/uikit-styles";
import { staticClasses as queryBuilderClasses } from "../QueryBuilder.styles";

export const { useClasses, staticClasses } = createClasses(
  "HvQueryBuilder-Rule",
  {
    root: {
      position: "relative",
      marginTop: theme.space.xs,

      minHeight: 94,

      "&>div:not(:last-child)": {
        marginRight: theme.space.md,
      },

      // hide required * as all fields are required
      "& label>span[aria-hidden]": {
        visibility: "hidden",
      },
      "&::before": {
        content: '""',
        position: "absolute",
        zIndex: 2,

        width: theme.queryBuilder.ruleConnectorHorizontalSize,
        height: theme.queryBuilder.ruleConnectorHeight,

        borderBottom: theme.queryBuilder.border,
        borderLeft: theme.queryBuilder.border,

        top: 0,
        left: theme.queryBuilder.ruleLeftConnectorPosition,
      },
      [`:not(.${queryBuilderClasses.topRulesContainer})>&:last-child::after`]: {
        content: '""',
        position: "absolute",
        zIndex: 1,

        width: theme.queryBuilder.ruleConnectorHorizontalSize,
        height: "100%",

        borderLeft: theme.queryBuilder.border,

        top: 0,
        left: theme.queryBuilder.ruleLeftConnectorPosition,
      },
    },
    actionsContainer: {
      marginLeft: "auto",
      marginTop: theme.queryBuilder.actionsContainerMarginTop,

      "&>:not(:last-child)": {
        marginRight: theme.space.xs,
      },
    },
    isMdDown: {
      "&>div:not(:last-child)": {
        marginRight: `calc(${theme.space.md} / 2)`,
      },
    },
  }
);
