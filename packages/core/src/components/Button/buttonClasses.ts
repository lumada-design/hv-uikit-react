import { getClasses } from "utils";

export type HvButtonClasses = {
  focusVisible?: string;
  startIcon?: string;
  primary?: string;
};

const classKeys: string[] = ["focusVisible", "startIcon", "primary"];

const buttonClasses = getClasses<HvButtonClasses>(classKeys, "HvButton");

export default buttonClasses;
