import { getClasses } from "utils";

export type HvAvatarClasses = {
  root?: string;
  container?: string;
  img?: string;
  fallback?: string;
  badge?: string;
  avatar?: string;
  status?: string;
};

const classKeys: string[] = [
  "root",
  "container",
  "img",
  "fallback",
  "badge",
  "avatar",
  "status",
];

export const avatarClasses = getClasses<HvAvatarClasses>(classKeys, "HvAvatar");

export * from "./Avatar";
