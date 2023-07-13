import { getClasses } from "@core/utils/classes";

export interface HvHeaderNavigationClasses {
  root?: string;
}

const classKeys: (keyof HvHeaderNavigationClasses)[] = ["root"];

const headerNavigationClasses = getClasses(classKeys, "HvHeader-Navigation");

export default headerNavigationClasses;
