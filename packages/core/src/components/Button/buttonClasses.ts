import { getClasses } from "@core/utils";

export interface HvButtonClasses {
  root?: string;
  startIcon?: string;
  endIcon?: string;
  focusVisible?: string;
}

const classKeys: string[] = ["root", "startIcon", "endIcon", "focusVisible"];

const buttonClasses = getClasses<HvButtonClasses>(classKeys, "HvButton");

export default buttonClasses;
