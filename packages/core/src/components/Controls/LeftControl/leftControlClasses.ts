import { getClasses } from "@core/utils";

export interface HvLeftControlClasses {
  root: string;
}

const classKeys: (keyof HvLeftControlClasses)[] = ["root"];

const leftControlClasses = getClasses(classKeys, "HvLeftControl");

export default leftControlClasses;
