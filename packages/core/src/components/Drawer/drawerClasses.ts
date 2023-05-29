import { getClasses } from "@core/utils";

export interface HvDrawerClasses {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the title element. */
  background?: string;
  /** Styles applied to the li element. */
  paper?: string;
  /**  Styles applied to the closeButton element. */
  closeButton?: string;
}

const classKeys: (keyof HvDrawerClasses)[] = [
  "root",
  "paper",
  "closeButton",
  "background",
];

const drawerClasses = getClasses(classKeys, "HvDrawer");

export default drawerClasses;
