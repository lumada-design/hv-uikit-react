import { getClasses } from "utils";

export type HvBaseCheckBoxClasses = {
  root?: string;
  disabled?: string;
  focusVisible?: string;
};

const classKeys: string[] = ["root", "disabled", "focusVisible"];

export const baseCheckBoxClasses = getClasses<HvBaseCheckBoxClasses>(
  classKeys,
  "HvBaseCheckBox"
);

export * from "./BaseCheckBox";
