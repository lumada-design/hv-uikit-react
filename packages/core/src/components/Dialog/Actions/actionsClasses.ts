import { getClasses } from "@core/utils";

export type HvDialogActionClasses = {
  root?: string;
  fullscreen?: string;
  spacing?: string;
};

const classKeys: string[] = ["root", "fullscreen", "spacing"];

const dialogActionClasses = getClasses<HvDialogActionClasses>(
  classKeys,
  "HvDialog-Action"
);

export default dialogActionClasses;
