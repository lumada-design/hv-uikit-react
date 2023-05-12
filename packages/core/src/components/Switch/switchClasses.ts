import { getClasses } from "@core/utils";

export interface HvSwitchClasses {
  /** Styles applied to the component. */
  root?: string;
  /** Styles applied to the label. */
  label?: string;
  /** Styles applied to the error area. */
  error?: string;
  /** Styles applied to the switch container. */
  switchContainer?: string;
  /** Styles applied to the switch container when the validations status is invalid. */
  invalidSwitch?: string;
}

const classKeys: (keyof HvSwitchClasses)[] = [
  "root",
  "label",
  "error",
  "switchContainer",
  "invalidSwitch",
];

const switchClasses = getClasses(classKeys, "HvSwitch");

export default switchClasses;
