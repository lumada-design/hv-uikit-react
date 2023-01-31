import { getClasses } from "utils";

export type HvDialogActionClasses = {
  root?: string;
  fullscreen?: string;
  spacing?: string;
};

const classKeys: string[] = ["root", "fullscreen", "spacing"];

export const dialogActionClasses = getClasses<HvDialogActionClasses>(
  classKeys,
  "HvDialog-Action"
);

export * from "./Actions";
