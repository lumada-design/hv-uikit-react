import { getClasses } from "utils";

export type HvAvatarClasses = {
  root?: string;
  container?: string;
  img?: string;
  fallback?: string;
  badge?: string;
  avatar?: string;
  status?: string;
  XS?: string;
  SM?: string;
  MD?: string;
  LG?: string;
  XL?: string;
  circular?: string;
  square?: string;
};

const classKeys: string[] = [
  "root",
  "container",
  "img",
  "fallback",
  "badge",
  "avatar",
  "status",
  "XS",
  "SM",
  "MD",
  "LG",
  "XL",
  "circular",
  "square",
];

const avatarClasses = getClasses<HvAvatarClasses>(classKeys, "HvAvatar");

export default avatarClasses;
