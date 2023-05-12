import { getClasses } from "@core/utils";

export interface HvRuleClasses {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the actions container. */
  actionsContainer?: string;
  /** Styles applied when the screen size is lower. */
  isMdDown?: string;
}

const classKeys: (keyof HvRuleClasses)[] = [
  "root",
  "actionsContainer",
  "isMdDown",
];

const ruleClasses = getClasses(classKeys, "HvRule");

export default ruleClasses;
