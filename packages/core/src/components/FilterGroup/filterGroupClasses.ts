import { getClasses } from "@core/utils";

export interface HvFilterGroupClasses {
  root?: string;
  labelContainer?: string;
  label?: string;
  description?: string;
  error?: string;
}

const classKeys: (keyof HvFilterGroupClasses)[] = [
  "root",
  "labelContainer",
  "label",
  "description",
  "error",
];

const filterGroupClasses = getClasses(classKeys, "HvFilterGroup");

export default filterGroupClasses;
