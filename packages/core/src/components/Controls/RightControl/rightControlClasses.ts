import { getClasses } from "@core/utils/classes";

export interface HvRightControlClasses {
  root?: string;
  sortDropdown?: string;
}

const classKeys: (keyof HvRightControlClasses)[] = ["root"];

const rightControlClasses = getClasses(classKeys, "HvRightControl");

export default rightControlClasses;
