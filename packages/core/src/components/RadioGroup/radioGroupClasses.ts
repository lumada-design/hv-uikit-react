import { getClasses } from "@core/utils";

export interface HvRadioGroupClasses {
  root?: string;
  label?: string;
  group?: string;
  vertical?: string;
  horizontal?: string;
  invalid?: string;
  error?: string;
}

const classKeys: (keyof HvRadioGroupClasses)[] = [
  "root",
  "label",
  "group",
  "vertical",
  "horizontal",
  "invalid",
  "error",
];

const radioGroupClasses = getClasses(classKeys, "HvRadioGroup");

export default radioGroupClasses;
