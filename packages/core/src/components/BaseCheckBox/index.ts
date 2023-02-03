import { getClasses } from "utils";

export type HvBaseCheckBoxClasses = {
  root?: string;
  disabled?: string;
  focusVisible?: string;
  icon?: string;
};

const classKeys: string[] = ["root", "disabled", "focusVisible", "icon"];

export const baseCheckBoxClasses = getClasses<HvBaseCheckBoxClasses>(
  classKeys,
  "HvBaseCheckBox"
);

export * from "./BaseCheckBox";
