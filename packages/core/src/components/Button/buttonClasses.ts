import { getClasses } from "utils";

export type HvButtonClasses = {
  root?: string;
  focusVisible?: string;
  startIcon?: string;
  primary?: string;
};

const classKeys: string[] = ["root", "focusVisible", "startIcon", "primary"];

const buttonClasses = getClasses<HvButtonClasses>(classKeys, "HvButton");

export default buttonClasses;
