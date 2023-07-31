import { getClasses } from "@core/utils/classes";

export interface HvLeftControlClasses {
  root: string;
}

const classKeys: (keyof HvLeftControlClasses)[] = ["root"];

const leftControlClasses = getClasses(classKeys, "HvLeftControl");

export default leftControlClasses;
