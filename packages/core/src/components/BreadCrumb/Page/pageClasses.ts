import { getClasses } from "@core/utils";

export interface HvPageClasses {
  a?: string;
  link?: string;
  label?: string;
}

const classKeys: (keyof HvPageClasses)[] = ["a", "link", "label"];

const pageClasses = getClasses(classKeys, "HvPage");

export default pageClasses;
