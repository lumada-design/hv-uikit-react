import { getClasses } from "@core/utils";

export interface HvCardContentClasses {
  content?: string;
}

const classKeys: (keyof HvCardContentClasses)[] = ["content"];

const cardContentClasses = getClasses(classKeys, "HvCard-Content");

export default cardContentClasses;
