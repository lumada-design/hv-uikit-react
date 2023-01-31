import { getClasses } from "utils";

export type HvDialogContentClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

export const dialogContentClasses = getClasses<HvDialogContentClasses>(
  classKeys,
  "HvDialog-Content"
);

export * from "./Content";
