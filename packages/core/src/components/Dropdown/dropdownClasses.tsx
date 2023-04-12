import { getClasses } from "~/utils";

export type HvDropdownClasses = {
  root?: string;
  labelContainer?: string;
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  selectionDisabled?: string;
  dropdown?: string;
  arrow?: string;
  dropdownHeader?: string;
  dropdownHeaderInvalid?: string;
  dropdownHeaderOpen?: string;
  dropdownListContainer?: string;
  rootList?: string;
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
  "arrow",
  "dropdownHeader",
  "dropdownHeaderInvalid",
  "dropdownHeaderOpen",
  "rootList",
  "dropdownListContainer",
];

const dropdownClasses = getClasses<HvDropdownClasses>(classKeys, "HvDropdown");

export default dropdownClasses;
