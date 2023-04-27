import { getClasses } from "@core/utils";

export type HvDatePickerClasses = {
  root?: string;
  labelContainer?: string;
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  selectionDisabled?: string;
  dropdown?: string;
  panel?: string;
  action?: string;
  icon?: string;
  dropdownHeader?: string;
  dropdownHeaderInvalid?: string;
  dropdownHeaderOpen?: string;
  actionContainer?: string;
  leftContainer?: string;
  rightContainer?: string;
};

const classKeys: string[] = [
  "root",
  "labelContainer",
  "label",
  "description",
  "error",
  "placeholder",
  "selectionDisabled",
  "dropdown",
  "panel",
  "action",
  "icon",
  "dropdownHeader",
  "dropdownHeaderInvalid",
  "dropdownHeaderOpen",
  "actionContainer",
  "leftContainer",
  "rightContainer",
];

const datePickerClasses = getClasses<HvDatePickerClasses>(
  classKeys,
  "HvDatePicker"
);

export default datePickerClasses;
