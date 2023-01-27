import { getClasses } from "utils";

export type HvTabClasses = {
  root?: string;
  selected?: string;
  disabled?: string;
  focusVisible?: string;
};

const classKeys: string[] = ["root", "selected", "disabled", "focusVisible"];

export const tabClasses = getClasses<HvTabClasses>(classKeys, "HvTab");

export * from "./Tab";
