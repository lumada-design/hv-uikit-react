import { getClasses } from "@core/utils";

export interface HvControlsClasses {
  root: string;
  section: string;
  rightSection: string;
  leftSection: string;
}

const classKeys: string[] = ["root", "section", "rightSection", "leftSection"];

const controlsClasses = getClasses<HvControlsClasses>(classKeys, "HvControls");

export default controlsClasses;
