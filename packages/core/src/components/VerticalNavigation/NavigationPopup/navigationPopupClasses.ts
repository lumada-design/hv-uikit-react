import { getClasses } from "@core/utils/classes";

export interface HvVerticalNavigationPopupClasses {}

const classKeys: (keyof HvVerticalNavigationPopupClasses)[] = [];

const verticalNavigationPopupClasses = getClasses(
  classKeys,
  "HvVerticalNavigationPopup"
);

export default verticalNavigationPopupClasses;
