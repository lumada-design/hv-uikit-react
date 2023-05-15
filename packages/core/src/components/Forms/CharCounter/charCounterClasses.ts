import { getClasses } from "@core/utils";

export interface HvCharCounterClasses {
  root?: string;
  counterDisabled?: string;
  gutter?: string;
  overloaded?: string;
}

const classKeys: (keyof HvCharCounterClasses)[] = [
  "root",
  "counterDisabled",
  "gutter",
  "overloaded",
];

const charCounterClasses = getClasses(classKeys, "HvCharCounter");

export default charCounterClasses;
