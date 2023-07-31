import { getClasses } from "@core/utils/classes";

export interface HvControlsClasses {
  root: string;
  section: string;
  rightSection: string;
  leftSection: string;
}

const classKeys: (keyof HvControlsClasses)[] = [
  "root",
  "section",
  "rightSection",
  "leftSection",
];

const controlsClasses = getClasses(classKeys, "HvControls");

export default controlsClasses;
