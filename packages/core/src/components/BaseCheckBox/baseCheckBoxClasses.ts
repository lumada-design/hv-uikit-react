import { getClasses } from "@core/utils";

export interface HvBaseCheckBoxClasses {
  root?: string;
  disabled?: string;
  focusVisible?: string;
  icon?: string;
}

const classKeys: (keyof HvBaseCheckBoxClasses)[] = [
  "root",
  "disabled",
  "focusVisible",
  "icon",
];

const baseCheckBoxClasses = getClasses(classKeys, "HvBaseCheckBox");

export default baseCheckBoxClasses;
