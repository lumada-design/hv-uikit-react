import { getClasses } from "@core/utils";

export interface HvTimeAgoClasses {
  root?: string;
}

const classKeys: (keyof HvTimeAgoClasses)[] = ["root"];

const timeAgoClasses = getClasses(classKeys, "HvTimeAgo");

export default timeAgoClasses;
