import { getClasses } from "utils";

export type HvDialogContentClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

const dialogContentClasses = getClasses<HvDialogContentClasses>(
  classKeys,
  "HvDialog-Content"
);

export default dialogContentClasses;
