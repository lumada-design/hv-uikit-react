import { getClasses } from "@core/utils";

export interface HvVerticalNavigationPopupClasses {}

const classKeys: string[] = [];

const verticalNavigationPopupClasses =
  getClasses<HvVerticalNavigationPopupClasses>(
    classKeys,
    "HvVerticalNavigationPopup"
  );

export default verticalNavigationPopupClasses;
