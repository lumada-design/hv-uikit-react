import { getClasses } from "@core/utils/classes";

export interface HvMultiButtonClasses {
  root?: string;
  button?: string;
  vertical?: string;
  selected?: string;
}

const classKeys: (keyof HvMultiButtonClasses)[] = [
  "root",
  "button",
  "vertical",
  "selected",
];

const multiButtonClasses = getClasses(classKeys, "HvMultiButton");

export default multiButtonClasses;
