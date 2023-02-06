import { getClasses } from "utils";

export type HvPanelClasses = {
  /** Styles applied to the component root class. */
  root?: string;
};

const classKeys: string[] = ["root"];

const panelClasses = getClasses<HvPanelClasses>(classKeys, "HvPanel");

export default panelClasses;
