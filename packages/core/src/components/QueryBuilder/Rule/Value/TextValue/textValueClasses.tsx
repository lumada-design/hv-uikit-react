import { getClasses } from "@core/utils";

export interface HvTextValueClasses {
  /** Styles applied to the location class. */
  location?: string;
}

const classKeys: string[] = ["location"];

const textValueClasses = getClasses<HvTextValueClasses>(
  classKeys,
  "HvTextValue"
);

export default textValueClasses;
