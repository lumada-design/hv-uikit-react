import { getClasses } from "@core/utils";

export interface HvDialogContentClasses {
  root?: string;
  textContent?: string;
}

const classKeys: string[] = ["root", "textContent"];

const dialogContentClasses = getClasses<HvDialogContentClasses>(
  classKeys,
  "HvDialog-Content"
);

export default dialogContentClasses;
