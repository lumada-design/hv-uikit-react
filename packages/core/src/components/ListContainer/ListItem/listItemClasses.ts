import { getClasses } from "@core/utils/classes";

export interface HvListItemClasses {
  root?: string;
  focus?: string;
  startAdornment?: string;
  endAdornment?: string;
  gutters?: string;
  condensed?: string;
  interactive?: string;
  selected?: string;
  disabled?: string;
  withStartAdornment?: string;
  withEndAdornment?: string;
}

const classKeys: (keyof HvListItemClasses)[] = [
  "root",
  "focus",
  "startAdornment",
  "endAdornment",
  "gutters",
  "condensed",
  "interactive",
  "selected",
  "disabled",
  "withStartAdornment",
  "withEndAdornment",
];

const listItemClasses = getClasses(classKeys, "HvListItem");

export default listItemClasses;
