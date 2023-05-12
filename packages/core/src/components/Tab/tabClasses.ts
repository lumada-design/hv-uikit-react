import { getClasses } from "@core/utils";

export interface HvTabClasses {
  root?: string;
  selected?: string;
  disabled?: string;
  focusVisible?: string;
}

const classKeys: (keyof HvTabClasses)[] = [
  "root",
  "selected",
  "disabled",
  "focusVisible",
];

const tabClasses = getClasses(classKeys, "HvTab");

export default tabClasses;
