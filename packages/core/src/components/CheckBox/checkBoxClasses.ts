import { getClasses } from "@core/utils";

export type HvCheckBoxClasses = {
  root?: string;
  container?: string;
  disabled?: string;
  focusVisible?: string;
  invalidContainer?: string;
  checkbox?: string;
  invalidCheckbox?: string;
  label?: string;
};

const classKeys: string[] = [
  "root",
  "container",
  "disabled",
  "focusVisible",
  "invalidContainer",
  "checkbox",
  "invalidCheckbox",
  "label",
];

const checkBoxClasses = getClasses<HvCheckBoxClasses>(classKeys, "HvCheckBox");

export default checkBoxClasses;
