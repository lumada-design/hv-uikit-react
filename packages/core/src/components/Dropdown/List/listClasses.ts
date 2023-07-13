import { getClasses } from "@core/utils/classes";

export interface HvDropdownListClasses {
  rootList?: string;
  dropdownListContainer?: string;
  searchContainer?: string;
  listBorderDown?: string;
  listContainer?: string;
  selectAllContainer?: string;
  selection?: string;
  selectAll?: string;
}

const classKeys: (keyof HvDropdownListClasses)[] = [
  "rootList",
  "dropdownListContainer",
  "searchContainer",
  "listBorderDown",
  "listContainer",
  "selectAllContainer",
  "selection",
  "selectAll",
];

const dropdownListClasses = getClasses(classKeys, "HvDropdownList");

export default dropdownListClasses;
