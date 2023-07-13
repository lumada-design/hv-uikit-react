import { getClasses } from "@core/utils/classes";

export interface HvSelectionListClasses {
  root?: string;
  error?: string;
  listbox?: string;
  label?: string;
  description?: string;
  horizontal?: string;
  vertical?: string;
  invalid?: string;
}

const classKeys: (keyof HvSelectionListClasses)[] = [
  "root",
  "error",
  "listbox",
  "label",
  "description",
  "horizontal",
  "vertical",
  "invalid",
];

const selectionListClasses = getClasses(classKeys, "HvSelectionList");

export default selectionListClasses;
