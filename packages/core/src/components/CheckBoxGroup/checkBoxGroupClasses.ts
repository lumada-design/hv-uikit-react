import { getClasses } from "@core/utils";

export interface HvCheckBoxGroupClasses {
  root?: string;
  label?: string;
  group?: string;
  vertical?: string;
  horizontal?: string;
  invalid?: string;
  selectAll?: string;
  error?: string;
}

const classKeys: (keyof HvCheckBoxGroupClasses)[] = [
  "root",
  "label",
  "group",
  "vertical",
  "horizontal",
  "invalid",
  "selectAll",
  "error",
];

const checkBoxGroupClasses = getClasses(classKeys, "HvCheckBoxGroup");

export default checkBoxGroupClasses;
