import { getClasses } from "@core/utils";

export interface HvAdornmentClasses {
  root?: string;
  icon?: string;
  adornment?: string;
  adornmentIcon?: string;
  hideIcon?: string;
  adornmentButton?: string;
}

const classKeys: (keyof HvAdornmentClasses)[] = [
  "root",
  "icon",
  "adornment",
  "adornmentIcon",
  "hideIcon",
  "adornmentButton",
];

const adornmentClasses = getClasses(classKeys, "HvAdornment");

export default adornmentClasses;
