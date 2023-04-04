import { getClasses } from "~/utils";

export type HvVerticalNavigationActionsClasses = {
  root?: string;
  hide?: string;
};

const classKeys: string[] = ["root", "hide"];

const actionsClasses = getClasses<HvVerticalNavigationActionsClasses>(
  classKeys,
  "HvVerticalNavigationActions"
);

export default actionsClasses;
