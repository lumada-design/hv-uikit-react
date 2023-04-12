import { getClasses } from "~/utils";

export type HvCharCounterClasses = {
  root?: string;
  counterDisabled?: string;
  gutter?: string;
  overloaded?: string;
};

const classKeys: string[] = ["root", "counterDisabled", "gutter", "overloaded"];

const charCounterClasses = getClasses<HvCharCounterClasses>(
  classKeys,
  "HvCharCounter"
);

export default charCounterClasses;
