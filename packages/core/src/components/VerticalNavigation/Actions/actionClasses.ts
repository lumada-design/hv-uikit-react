import { getClasses } from "@core/utils";

export interface HvVerticalNavigationActionClasses {
  action?: string;
  noIcon?: string;
  minimized?: string;
}

const classKeys: string[] = ["action", "noIcon", "minimized"];

const actionClasses = getClasses<HvVerticalNavigationActionClasses>(
  classKeys,
  "HvVerticalNavigationAction"
);

export default actionClasses;
