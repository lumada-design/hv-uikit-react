import { getClasses } from "@core/utils";

export interface HvBannerClasses {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the component root class when the component is closed. */
  rootClosed?: string;
  /** Styles applied to the component when define as top. */
  anchorOriginTopCenter?: string;
  /** Styles applied to the component when define as bottom. */
  anchorOriginBottomCenter?: string;
}

const classKeys: (keyof HvBannerClasses)[] = [
  "root",
  "rootClosed",
  "anchorOriginTopCenter",
  "anchorOriginBottomCenter",
];

const bannerClasses = getClasses(classKeys, "HvBanner");

export default bannerClasses;
