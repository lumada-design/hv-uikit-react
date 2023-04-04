import { getClasses } from "~/utils";

export type HvVerticalNavigationActionClasses = {
  action?: string;
  noIcon?: string;
  minimized?: string;
};

const classKeys: string[] = ["action", "noIcon", "minimized"];

const actionClasses = getClasses<HvVerticalNavigationActionClasses>(
  classKeys,
  "HvVerticalNavigationAction"
);

export default actionClasses;
