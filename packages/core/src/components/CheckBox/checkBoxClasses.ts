import { getClasses } from "@core/utils/classes";

export interface HvCheckBoxClasses {
  root?: string;
  container?: string;
  disabled?: string;
  focusVisible?: string;
  invalidContainer?: string;
  checkbox?: string;
  invalidCheckbox?: string;
  label?: string;
}

const classKeys: (keyof HvCheckBoxClasses)[] = [
  "root",
  "container",
  "disabled",
  "focusVisible",
  "invalidContainer",
  "checkbox",
  "invalidCheckbox",
  "label",
];

const checkBoxClasses = getClasses(classKeys, "HvCheckBox");

export default checkBoxClasses;
