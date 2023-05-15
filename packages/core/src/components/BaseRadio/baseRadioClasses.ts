import { getClasses } from "@core/utils";

export interface HvBaseRadioClasses {
  /** Styles applied to the component. */
  root?: string;
  /** Styles applied to the radio button when it is disabled. */
  disabled?: string;
  /** Class applied to the root element if keyboard focused. */
  focusVisible?: string;
  /** Class applied top the icon element. */
  icon?: string;
}

const classKeys: (keyof HvBaseRadioClasses)[] = [
  "root",
  "disabled",
  "focusVisible",
  "icon",
];

const baseRadioClasses = getClasses(classKeys, "HvBaseRadio");

export default baseRadioClasses;
