import { getClasses } from "utils";

export type HvSuggestionsClasses = {
  root?: string;
  list?: string;
  popper?: string;
};

const classKeys: string[] = ["root", "list", "popper"];

export const suggestionsClasses = getClasses<HvSuggestionsClasses>(
  classKeys,
  "HvSuggestions"
);

export * from "./Suggestions";
