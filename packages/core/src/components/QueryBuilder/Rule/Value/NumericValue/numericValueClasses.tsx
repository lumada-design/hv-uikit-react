import { getClasses } from "@core/utils";

export interface HvNumericValueClasses {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the label. */
  label?: string;
  /** Styles applied to input container. */
  inputContainer?: string;
  /** Styles applied to input container. */
  rangeContainer?: string;
  /** Styles applied to range container. */
  input?: string;
  /** Styles applied when the screen size is lower. */
  isMdDown?: string;
}

const classKeys: string[] = [
  "root",
  "label",
  "inputContainer",
  "rangeContainer",
  "input",
  "isMdDown",
];

const numericValueClasses = getClasses<HvNumericValueClasses>(
  classKeys,
  "HvNumericValue"
);

export default numericValueClasses;
