import { getClasses } from "@core/utils";

export interface HvDialogContentClasses {
  root?: string;
  textContent?: string;
}

const classKeys: (keyof HvDialogContentClasses)[] = ["root", "textContent"];

const dialogContentClasses = getClasses(classKeys, "HvDialog-Content");

export default dialogContentClasses;
