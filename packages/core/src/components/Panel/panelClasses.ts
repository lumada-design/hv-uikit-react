import { getClasses } from "@core/utils";

export interface HvPanelClasses {
  /** Styles applied to the component root class. */
  root?: string;
}

const classKeys: (keyof HvPanelClasses)[] = ["root"];

const panelClasses = getClasses(classKeys, "HvPanel");

export default panelClasses;
