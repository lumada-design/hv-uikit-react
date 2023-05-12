import { getClasses } from "@core/utils";

export interface HvSuggestionsClasses {
  root?: string;
  list?: string;
  popper?: string;
}

const classKeys: (keyof HvSuggestionsClasses)[] = ["root", "list", "popper"];

const suggestionsClasses = getClasses(classKeys, "HvSuggestions");

export default suggestionsClasses;
