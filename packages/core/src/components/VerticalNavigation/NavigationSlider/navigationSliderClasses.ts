import { getClasses } from "utils";

export type HvVerticalNavigationSliderClasses = {
  root?: string;
  listItemSelected?: string;
};

const classKeys: string[] = ["root", "listItemSelected"];

const verticalNavigationSliderClasses =
  getClasses<HvVerticalNavigationSliderClasses>(
    classKeys,
    "HvVerticalNavigationSlider"
  );

export default verticalNavigationSliderClasses;
