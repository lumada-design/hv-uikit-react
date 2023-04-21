import { getClasses } from "@hitachivantara/uikit-react-core";

export type HvStepClasses = {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the ghost class. */
  ghost?: string;
  /** Styles applied to the ghostDisabled class. */
  ghostDisabled?: string;
  /** Styles applied to the root element when step is not in "current" state. */
  notCurrent?: string;
  /** Styles applied to the root element when size is XS. */
  xs?: string;
  /** Styles applied to the root element when size is SM. */
  sm?: string;
  /** Styles applied to the root element when size is MD. */
  md?: string;
  /** Styles applied to the root element when size is LG. */
  lg?: string;
  /** Styles applied to the root element when size is XL. */
  xl?: string;
  /** Styles applied to the avatar element. */
  avatar?: string;
  /** Styles applied to the title of a step element. */
  stepTitle?: string;
};

const classKeys: string[] = [
  "root",
  "ghost",
  "ghostDisabled",
  "notCurrent",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "avatar",
  "stepTitle",
];

const stepClasses = getClasses<HvStepClasses>(classKeys, "HvStep");

export default stepClasses;
