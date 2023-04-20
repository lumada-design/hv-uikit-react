import { getClasses } from "@core/utils";

export interface HvSliderInputClasses {
  inputRoot?: string;
  input?: string;
  inputContainer?: string;
}

const classKeys: string[] = ["inputRoot", "input", "inputContainer"];

const sliderInputClasses = getClasses<HvSliderInputClasses>(
  classKeys,
  "HvSliderInput"
);

export default sliderInputClasses;
