import { getClasses } from "@core/utils";

export interface HvTextValueClasses {
  /** Styles applied to the location class. */
  location?: string;
}

const classKeys: (keyof HvTextValueClasses)[] = ["location"];

const textValueClasses = getClasses(classKeys, "HvTextValue");

export default textValueClasses;
