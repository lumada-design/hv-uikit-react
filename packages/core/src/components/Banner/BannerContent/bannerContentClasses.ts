import { getClasses } from "utils";

export type HvBannerContentClasses = {
  outContainer?: string;
  root?: string;
  message?: string;
  action?: string;
  baseVariant?: string;
};

const classKeys: string[] = [
  "outContainer",
  "root",
  "message",
  "action",
  "baseVariant",
];

const bannerContentClasses = getClasses<HvBannerContentClasses>(
  classKeys,
  "HvBanner-Content"
);

export default bannerContentClasses;
