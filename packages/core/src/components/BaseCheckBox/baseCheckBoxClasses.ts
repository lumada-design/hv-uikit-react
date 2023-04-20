import { getClasses } from "@core/utils";

export interface HvBaseCheckBoxClasses {
  root?: string;
  disabled?: string;
  focusVisible?: string;
  icon?: string;
}

const classKeys: string[] = ["root", "disabled", "focusVisible", "icon"];

const baseCheckBoxClasses = getClasses<HvBaseCheckBoxClasses>(
  classKeys,
  "HvBaseCheckBox"
);

export default baseCheckBoxClasses;
