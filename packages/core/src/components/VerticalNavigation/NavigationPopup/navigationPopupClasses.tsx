import { getClasses } from "~/utils";

export type HvVerticalNavigationPopupClasses = {};

const classKeys: string[] = [];

const verticalNavigationPopupClasses =
  getClasses<HvVerticalNavigationPopupClasses>(
    classKeys,
    "HvVerticalNavigationPopup"
  );

export default verticalNavigationPopupClasses;
