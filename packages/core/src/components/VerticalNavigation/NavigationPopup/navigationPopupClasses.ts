import { getClasses } from "@core/utils";

export interface HvVerticalNavigationPopupClasses {}

const classKeys: (keyof HvVerticalNavigationPopupClasses)[] = [];

const verticalNavigationPopupClasses = getClasses(
  classKeys,
  "HvVerticalNavigationPopup"
);

export default verticalNavigationPopupClasses;
