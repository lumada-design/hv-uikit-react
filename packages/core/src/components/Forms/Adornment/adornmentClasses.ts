import { getClasses } from "utils";

export type HvAdornmentClasses = {
  root?: string;
  icon?: string;
  adornment?: string;
  adornmentIcon?: string;
  hideIcon?: string;
  adornmentButton?: string;
};

const classKeys: string[] = [
  "root",
  "icon",
  "adornment",
  "adornmentIcon",
  "hideIcon",
  "adornmentButton",
];

const adornmentClasses = getClasses<HvAdornmentClasses>(
  classKeys,
  "HvAdornment"
);

export default adornmentClasses;
