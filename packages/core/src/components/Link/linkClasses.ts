import { getClasses } from "@core/utils/classes";

export interface HvLinkClasses {
  a?: string;
}

const classKeys: (keyof HvLinkClasses)[] = ["a"];

const linkClasses = getClasses(classKeys, "HvLink");

export default linkClasses;
