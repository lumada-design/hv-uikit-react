import { getClasses } from "utils";

export type HvCheckBoxGroupClasses = {
  root?: string;
  label?: string;
  group?: string;
  vertical?: string;
  horizontal?: string;
  invalid?: string;
  selectAll?: string;
  error?: string;
};

const classKeys: string[] = [
  "root",
  "label",
  "group",
  "vertical",
  "horizontal",
  "invalid",
  "selectAll",
  "error",
];

export const checkBoxGroupClasses = getClasses<HvCheckBoxGroupClasses>(
  classKeys,
  "HvCheckBoxGroup"
);

export * from "./CheckBoxGroup";
