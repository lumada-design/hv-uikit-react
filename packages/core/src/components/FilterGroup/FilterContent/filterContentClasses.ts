import { getClasses } from "@core/utils";

export interface HvFilterGroupContentClasses {
  dropdown?: string;
  panel?: string;
  baseDropdownSelection?: string;
  header?: string;
  root?: string;
  leftSidePanel?: string;
  rightSidePanel?: string;
  actionBar?: string;
  space?: string;
  applyButton?: string;
}

const classKeys: (keyof HvFilterGroupContentClasses)[] = [
  "dropdown",
  "panel",
  "baseDropdownSelection",
  "header",
  "root",
  "leftSidePanel",
  "rightSidePanel",
  "actionBar",
  "space",
  "applyButton",
];

const filterGroupContentClasses = getClasses(classKeys, "HvFilterGroupContent");

export default filterGroupContentClasses;
