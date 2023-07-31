import { getClasses } from "@core/utils/classes";

export interface HvHeaderMenuBarClasses {
  hidden?: string;
  active?: string;
}

const classKeys: (keyof HvHeaderMenuBarClasses)[] = ["hidden", "active"];

const headerMenuBarClasses = getClasses(classKeys, "HvHeader-MenuBar");

export default headerMenuBarClasses;
