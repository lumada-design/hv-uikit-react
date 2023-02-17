import { getClasses } from "utils";

export type HvDropdownListClasses = {
  rootList?: string;
  dropdownListContainer?: string;
  searchContainer?: string;
  listBorderDown?: string;
  listContainer?: string;
  selectAllContainer?: string;
  selection?: string;
  selectAll?: string;
};

const classKeys: string[] = [
  "rootList",
  "dropdownListContainer",
  "searchContainer",
  "listBorderDown",
  "listContainer",
  "selectAllContainer",
  "selection",
  "selectAll",
];

const dropdownListClasses = getClasses<HvDropdownListClasses>(
  classKeys,
  "HvDropdownList"
);

export default dropdownListClasses;
