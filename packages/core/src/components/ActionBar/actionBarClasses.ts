import { getClasses } from "@core/utils";

export interface HvActionBarClasses {
  root?: string;
}

const classKeys: (keyof HvActionBarClasses)[] = ["root"];

const actionBarClasses = getClasses(classKeys, "HvActionBar");

export default actionBarClasses;
