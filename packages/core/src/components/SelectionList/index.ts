import { getClasses } from "utils";

export type HvSelectionListClasses = {
  root?: string;
  error?: string;
  listbox?: string;
  label?: string;
  description?: string;
  horizontal?: string;
  vertical?: string;
  invalid?: string;
};

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

export const selectionListClasses = getClasses<HvSelectionListClasses>(
  classKeys,
  "HvSelectionList"
);

export * from "./SelectionList";
