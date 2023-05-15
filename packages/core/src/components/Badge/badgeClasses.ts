import { getClasses } from "@core/utils";

export interface HvBadgeClasses {
  root?: string;
  badgeContainer?: string;
  badgePosition?: string;
  badge?: string;
  showCount?: string;
  showLabel?: string;
  badgeIcon?: string;
  badgeOneDigit?: string;
}

const classKeys: (keyof HvBadgeClasses)[] = [
  "root",
  "badgeContainer",
  "badgePosition",
  "badge",
  "showCount",
  "showLabel",
  "badgeIcon",
  "badgeOneDigit",
];

const badgeClasses = getClasses(classKeys, "HvBadgeClasses");

export default badgeClasses;
