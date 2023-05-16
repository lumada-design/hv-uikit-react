import { getClasses } from "@core/utils";

export interface HvHeaderMenuBarClasses {
  hidden?: string;
  active?: string;
}

const classKeys: (keyof HvHeaderMenuBarClasses)[] = ["hidden", "active"];

const headerMenuBarClasses = getClasses(classKeys, "HvHeader-MenuBar");

export default headerMenuBarClasses;
