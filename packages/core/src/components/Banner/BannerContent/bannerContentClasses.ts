import { getClasses } from "utils";

export type HvBannerContentClasses = {
  outContainer?: string;
  root?: string;
  message?: string;
  action?: string;
  baseVariant?: string;
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
  default?: string;
};

const classKeys: string[] = [
  "outContainer",
  "root",
  "message",
  "action",
  "baseVariant",
  "success",
  "warning",
  "error",
  "info",
  "default",
];

const bannerContentClasses = getClasses<HvBannerContentClasses>(
  classKeys,
  "HvBanner-Content"
);

export default bannerContentClasses;
