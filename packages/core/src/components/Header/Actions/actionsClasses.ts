import { getClasses } from "@core/utils";

export interface HvHeaderActionsClasses {
  root?: string;
}

const classKeys: (keyof HvHeaderActionsClasses)[] = ["root"];

const headerActionsClasses = getClasses(classKeys, "HvHeader-Actions");

export default headerActionsClasses;
