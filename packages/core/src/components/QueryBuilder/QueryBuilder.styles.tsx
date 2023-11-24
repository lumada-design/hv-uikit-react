import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { useClasses, staticClasses } = createClasses("HvQueryBuilder", {
  /** Styles applied to the component root class. */
  root: {
    position: "relative",
    padding: theme.space.sm,
    marginTop: 12,
    marginBottom: 32,
    border: `1px solid ${theme.colors.atmo4}`,
  },
  /** Styles applied to the top group container. */
  topGroup: {
    margin: theme.space.sm,
    backgroundColor: "transparent",
    maxWidth: "100%",
    minWidth: 740,
    paddingBottom: `calc(${theme.space.md} * 3)`,
  },
  /** Styles applied to the sub group containers. */
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

      borderBottom: `1px solid ${theme.colors.atmo4}`,
      borderLeft: `1px solid ${theme.colors.atmo4}`,

      top: -38,
      left: -38,
    },
    ":not($topRulesContainer)>&:last-child::after": {
      content: '""',
      position: "absolute",
      zIndex: 1,

      width: 32,
      height: "100%",

      borderLeft: `1px solid ${theme.colors.atmo4}`,

      top: 0,
      left: `calc(${theme.space.sm} + 2)`,
    },
  },
  /** Styles applied to the radio button+label topGroup when the radio button is disabled. */
  combinator: { minWidth: 80 },
  /** Styles applied to the multi-button combinator container on the top group. */
  topCombinator: {
    position: "absolute",
    top: `calc( -1 * ${theme.space.sm})`,
    left: `calc( -1 * ${theme.space.sm})`,
  },
  /** Styles applied to each combinator button. */
  combinatorButton: {},
  /** Styles applied to the remove button.  */
  removeButton: {},
  /** Styles applied to the remove button on the top group. */
  topRemoveButton: { position: "absolute", top: -16, right: -16 },
  /** Styles applied to the remove button when disabled on the top group. */
  topRemoveButtonDisabled: { backgroundColor: theme.colors.atmo2 },
  /** Styles applied to the rules container. */
  rulesContainer: {},
  /** Styles applied to the sub rules container. */
  subRulesContainer: {
    borderLeft: `1px solid ${theme.colors.atmo4}`,
    marginLeft: theme.space.sm,
    marginBottom: theme.space.md,
    paddingLeft: theme.space.sm,
    paddingTop: 7,
    position: "relative",
    left: -33,
    width: "100%",
  },
  /** Styles applied to the action button container. */
  actionButtonContainer: {
    marginLeft: "auto",

    "&>*": {
      marginLeft: theme.space.sm,
    },
  },
  /** Styles applied to the top action button container. */
  topActionButtonContainer: {
    position: "absolute",
    bottom: `calc(-1 * ${theme.space.md} * 0.5 - 3px)`,
    right: `calc(${theme.space.sm} * 1.75 + 2px)`,
  },
  /** Styles applied to the top rules container. */
  topRulesContainer: {},
  /** Styles applied to the background of buttons to remove transparency */
  buttonBackground: {
    backgroundColor: theme.colors.atmo2,
    display: "inline-flex",
  },
  createConditionButton: {
    cursor: "pointer",
    backgroundColor: "transparent",
    padding: 0,
  },
  createGroupButton: {
    cursor: "pointer",
    backgroundColor: "transparent",
    padding: 0,
  },
});
