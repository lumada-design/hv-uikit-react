import { getClasses } from "@core/utils";

export interface HvTimeAgoClasses {
  root?: string;
}

const classKeys: string[] = ["root"];

const timeAgoClasses = getClasses<HvTimeAgoClasses>(classKeys, "HvTimeAgo");

export default timeAgoClasses;
