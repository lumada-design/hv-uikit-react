import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import queryBuilderClasses from "../queryBuilderClasses";

export const styles: { [key: string]: CSSInterpolation } = {
  root: {
    position: "relative",
    padding: theme.space.sm,

    marginTop: 12,
    marginBottom: 32,

    border: theme.queryBuilder.border,
  },
  subGroup: {
    margin: "40px 14px 32px 20px",
    minHeight: 120,
    paddingBottom: 60,

    "&::before": {
      content: '""',
      position: "absolute",
      zIndex: 2,

      width: 21,
      height: 36,

      borderBottom: theme.queryBuilder.border,
      borderLeft: theme.queryBuilder.border,

      top: -38,
      left: theme.queryBuilder.ruleSubGroupLeftConnectorPosition,
    },
    [`:not(.${queryBuilderClasses.topRulesContainer})>&:last-child::after`]: {
      content: '""',
      position: "absolute",
      zIndex: 1,

      width: 32,
      height: "100%",

      borderLeft: theme.queryBuilder.border,

      top: 0,
      left: `calc(${theme.space.sm} + 2)`,
    },
  },
  topGroup: {
    margin: theme.space.sm,
    backgroundColor: "transparent",
    maxWidth: "100%",
    minWidth: 740,

    paddingBottom: `calc(${theme.space.sm} * 3)`,
  },

  combinator: {
    minWidth: 80,
  },
  topCombinator: {
    position: "absolute",
    top: `calc( -1 * ${theme.space.sm})`,
    left: `calc( -1 * ${theme.space.sm})`,
  },

  combinatorButton: {},

  actionButtonContainer: {
    marginLeft: "auto",

    "&>*": {
      marginLeft: theme.space.sm,
    },
  },
  topActionButtonContainer: {
    position: "absolute",
    bottom: theme.queryBuilder.topActionButtonContainerBottom,
    right: theme.queryBuilder.topActionButtonContainerRight,
  },
  buttonBackground: {
    backgroundColor: theme.colors.atmo2,
    display: "inline-flex",
  },
  removeButton: {},
  topRemoveButton: {
    position: "absolute",
    top: -16,
    right: -16,
  },

  topRemoveButtonDisabled: {
    backgroundColor: theme.colors.atmo2,
  },

  rulesContainer: {},

  subRulesContainer: {
    borderLeft: theme.queryBuilder.border,

    marginLeft: theme.space.sm,
    marginBottom: theme.space.md,
    paddingLeft: theme.space.sm,

    paddingTop: 7,

    position: "relative",
    left: theme.queryBuilder.ruleSubGroupContainerLeftConnectorPosition,

    width: "100%",
  },
};
