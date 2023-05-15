import { getClasses } from "@core/utils";

export interface HvVerticalNavigationHeaderClasses {
  root?: string;
  minimized?: string;
}

const classKeys: (keyof HvVerticalNavigationHeaderClasses)[] = [
  "root",
  "minimized",
];

const verticalNavigationHeaderClasses = getClasses(
  classKeys,
  "HvVerticalNavigationHeader"
);

export default verticalNavigationHeaderClasses;
