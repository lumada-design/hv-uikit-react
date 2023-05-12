import { getClasses } from "@core/utils";

export interface HvSliderInputClasses {
  inputRoot?: string;
  input?: string;
  inputContainer?: string;
}

const classKeys: (keyof HvSliderInputClasses)[] = [
  "inputRoot",
  "input",
  "inputContainer",
];

const sliderInputClasses = getClasses(classKeys, "HvSliderInput");

export default sliderInputClasses;
