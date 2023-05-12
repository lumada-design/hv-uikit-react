import { getClasses } from "@core/utils";

export interface HvQueryBuilderClasses {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the top group container. */
  topGroup?: string;
  /** Styles applied to the sub group containers. */
  subGroup?: string;
  /** Styles applied to the radio button+label topGroup when the radio button is disabled. */
  combinator?: string;
  /** Styles applied to the multi-button combinator container on the top group. */
  topCombinator?: string;
  /** Styles applied to each combinator button. */
  combinatorButton?: string;
  /** Styles applied to the remove button.  */
  removeButton?: string;
  /** Styles applied to the remove button on the top group. */
  topRemoveButton?: string;
  /** Styles applied to the remove button when disabled on the top group. */
  topRemoveButtonDisabled?: string;
  /** Styles applied to the rules container. */
  rulesContainer?: string;
  /** Styles applied to the sub rules container. */
  subRulesContainer?: string;
  /** Styles applied to the action button container. */
  actionButtonContainer?: string;
  /** Styles applied to the top action button container. */
  topActionButtonContainer?: string;
  /** Styles applied to the top rules container. */
  topRulesContainer?: string;
  /** Styles applied to the background of buttons to remove transparency */
  buttonBackground?: string;
}

const classKeys: (keyof HvQueryBuilderClasses)[] = [
  "root",
  "topGroup",
  "subGroup",
  "combinator",
  "topCombinator",
  "combinatorButton",
  "removeButton",
  "topRemoveButton",
  "topRemoveButtonDisabled",
  "rulesContainer",
  "subRulesContainer",
  "actionButtonContainer",
  "topActionButtonContainer",
  "buttonBackground",
];

const queryBuilderClasses = getClasses(classKeys, "HvQueryBuilder");

export default queryBuilderClasses;
