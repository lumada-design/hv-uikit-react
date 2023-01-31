import { getClasses } from "utils";

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

export const checkBoxClasses = getClasses<HvCheckBoxClasses>(
  classKeys,
  "HvCheckBox"
);

export * from "./CheckBox";
