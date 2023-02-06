import { getClasses } from "utils";

export type HvBadgeClasses = {
  root?: string;
  badgeContainer?: string;
  badgePosition?: string;
};

const classKeys: string[] = ["root", "badgeContainer", "badgePosition"];

const badgeClasses = getClasses<HvBadgeClasses>(classKeys, "HvBadgeClasses");

export default badgeClasses;
