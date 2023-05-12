import { getClasses } from "@core/utils";

export interface HvDialogActionClasses {
  root?: string;
  fullscreen?: string;
  spacing?: string;
}

const classKeys: (keyof HvDialogActionClasses)[] = [
  "root",
  "fullscreen",
  "spacing",
];

const dialogActionClasses = getClasses(classKeys, "HvDialog-Action");

export default dialogActionClasses;
