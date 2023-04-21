import { getClasses } from "@core/utils";

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

const classKeys: string[] = [
  "root",
  "error",
  "listbox",
  "label",
  "description",
  "horizontal",
  "vertical",
  "invalid",
];

const selectionListClasses = getClasses<HvSelectionListClasses>(
  classKeys,
  "HvSelectionList"
);

export default selectionListClasses;
