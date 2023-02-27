import { getClasses } from "utils";

export type HvRightControlClasses = {
  root?: string;
  sortDropdown?: string;
};

const classKeys: string[] = ["root"];

const rightControlClasses = getClasses<HvRightControlClasses>(
  classKeys,
  "HvRightControl"
);

export default rightControlClasses;
