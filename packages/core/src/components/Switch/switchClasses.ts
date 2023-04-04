import { getClasses } from "~/utils";

export type HvSwitchClasses = {
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
};

const classKeys: string[] = [
  "root",
  "label",
  "error",
  "switchContainer",
  "invalidSwitch",
];

const switchClasses = getClasses<HvSwitchClasses>(classKeys, "HvSwitch");

export default switchClasses;
