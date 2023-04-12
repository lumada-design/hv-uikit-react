import { getClasses } from "~/utils";

export interface HvAvatarClasses {
  root?: string;
  container?: string;
  img?: string;
  fallback?: string;
  badge?: string;
  avatar?: string;
  status?: string;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  circular?: string;
  square?: string;
}

const classKeys: string[] = [
  "root",
  "container",
  "img",
  "fallback",
  "badge",
  "avatar",
  "status",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "circular",
  "square",
];

const avatarClasses = getClasses<HvAvatarClasses>(classKeys, "HvAvatar");

export default avatarClasses;
