import { getClasses } from "@core/utils";

export interface HvDialogClasses {
  root?: string;
  closeButton?: string;
  fullscreen?: string;
  background?: string;
  paper?: string;
}

const classKeys: (keyof HvDialogClasses)[] = [
  "root",
  "closeButton",
  "fullscreen",
  "background",
  "paper",
];

const dialogClasses = getClasses(classKeys, "HvDialog");

export default dialogClasses;
