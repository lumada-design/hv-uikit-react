import { getClasses } from "@core/utils/classes";

export interface HvStackClasses {
  root?: string;
}

const classKeys: (keyof HvStackClasses)[] = ["root"];

const stackClasses = getClasses(classKeys, "HvStack");

export default stackClasses;
