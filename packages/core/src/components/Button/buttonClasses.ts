import { getClasses } from "@core/utils";

export interface HvButtonClasses {
  root?: string;
  startIcon?: string;
  endIcon?: string;
  focusVisible?: string;
}

const classKeys: (keyof HvButtonClasses)[] = [
  "root",
  "startIcon",
  "endIcon",
  "focusVisible",
];

const buttonClasses = getClasses(classKeys, "HvButton");

export default buttonClasses;
