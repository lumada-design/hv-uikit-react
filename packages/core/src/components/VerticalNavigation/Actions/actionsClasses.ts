import { getClasses } from "@core/utils";

export interface HvVerticalNavigationActionsClasses {
  root?: string;
  hide?: string;
}

const classKeys: string[] = ["root", "hide"];

const actionsClasses = getClasses<HvVerticalNavigationActionsClasses>(
  classKeys,
  "HvVerticalNavigationActions"
);

export default actionsClasses;
