import { getClasses } from "@core/utils/classes";

export interface HvFocusClasses {
  root?: string;
  selected?: string;
  focused?: string;
  focus?: string;
  disabled?: string;
  externalReference?: string;
  falseFocus?: string;
  focusDisabled?: string;
}

const classKeys: (keyof HvFocusClasses)[] = [
  "root",
  "selected",
  "focused",
  "focus",
  "disabled",
  "externalReference",
  "falseFocus",
  "focusDisabled",
];

const focusClasses = getClasses(classKeys, "HvFocus");

export default focusClasses;
