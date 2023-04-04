import { getClasses } from "~/utils";

export type HvFocusClasses = {
  root?: string;
  selected?: string;
  focused?: string;
  focus?: string;
  disabled?: string;
  externalReference?: string;
  falseFocus?: string;
  focusDisabled?: string;
};

const classKeys: string[] = [
  "root",
  "selected",
  "focused",
  "focus",
  "disabled",
  "externalReference",
  "falseFocus",
  "focusDisabled",
];

const focusClasses = getClasses<HvFocusClasses>(classKeys, "HvFocus");

export default focusClasses;
