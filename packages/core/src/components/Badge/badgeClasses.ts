import { getClasses } from "utils";

export type HvBadgeClasses = {
  root?: string;
  badgeContainer?: string;
  badgePosition?: string;
  badge?: string;
  showCount?: string;
  showLabel?: string;
  badgeIcon?: string;
  badgeOneDigit?: string;
};

const classKeys: string[] = [
  "root",
  "badgeContainer",
  "badgePosition",
  "badge",
  "showCount",
  "showLabel",
  "badgeIcon",
  "badgeOneDigit",
];

const badgeClasses = getClasses<HvBadgeClasses>(classKeys, "HvBadgeClasses");

export default badgeClasses;
