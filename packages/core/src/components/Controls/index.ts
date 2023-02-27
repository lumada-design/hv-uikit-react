import { getClasses } from "utils";

export type HvControlsClasses = {
  root: string;
  section: string;
  rightSection: string;
  leftSection: string;
};

const classKeys: string[] = ["root", "section", "rightSection", "leftSection"];

export const controlsClasses = getClasses<HvControlsClasses>(
  classKeys,
  "HvControls"
);

export * from "./Controls";
export * from "./LeftControl";
export * from "./RightControl";
