import { getClasses } from "~/utils";

export type HvButtonClasses = {
  root?: string;
  startIcon?: string;
  focusVisible?: string;
};

const classKeys: string[] = ["root", "startIcon", "focusVisible"];

const buttonClasses = getClasses<HvButtonClasses>(classKeys, "HvButton");

export default buttonClasses;
