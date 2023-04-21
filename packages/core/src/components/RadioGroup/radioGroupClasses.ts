import { getClasses } from "@core/utils";

export type HvRadioGroupClasses = {
  root?: string;
  label?: string;
  group?: string;
  vertical?: string;
  horizontal?: string;
  invalid?: string;
  error?: string;
};

const classKeys: string[] = [
  "root",
  "label",
  "group",
  "vertical",
  "horizontal",
  "invalid",
  "error",
];

const radioGroupClasses = getClasses<HvRadioGroupClasses>(
  classKeys,
  "HvRadioGroup"
);

export default radioGroupClasses;
