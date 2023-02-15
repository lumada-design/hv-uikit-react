import { getClasses } from "utils";
import { HvDropdownListClasses } from "./List/dropdownListClasses";

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
} & HvDropdownListClasses;

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
  "searchContainer",
  "listBorderDown",
  "listContainer",
  "selectAllContainer",
  "selection",
  "selectAll",
];

const dropdownClasses = getClasses<HvDropdownClasses>(classKeys, "HvDropdown");

export default dropdownClasses;
