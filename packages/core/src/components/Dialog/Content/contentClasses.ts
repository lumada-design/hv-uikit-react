import { getClasses } from "utils";

export type HvDialogContentClasses = {
  root?: string;
  textContent?: string;
};

const classKeys: string[] = ["root", "textContent"];

const dialogContentClasses = getClasses<HvDialogContentClasses>(
  classKeys,
  "HvDialog-Content"
);

export default dialogContentClasses;
