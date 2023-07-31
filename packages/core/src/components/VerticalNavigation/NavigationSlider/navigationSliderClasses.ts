import { getClasses } from "@core/utils/classes";

export interface HvVerticalNavigationSliderClasses {
  root?: string;
  listItemSelected?: string;
}

const classKeys: (keyof HvVerticalNavigationSliderClasses)[] = [
  "root",
  "listItemSelected",
];

const verticalNavigationSliderClasses = getClasses(
  classKeys,
  "HvVerticalNavigationSlider"
);

export default verticalNavigationSliderClasses;
