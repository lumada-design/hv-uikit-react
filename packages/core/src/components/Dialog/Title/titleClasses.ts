import { getClasses } from "@core/utils";

export interface HvDialogTitleClasses {
  root?: string;
  fullscreen?: string;
  messageContainer?: string;
  textWithIcon?: string;
}

const classKeys: (keyof HvDialogTitleClasses)[] = [
  "root",
  "fullscreen",
  "messageContainer",
  "textWithIcon",
];

const dialogTitleClasses = getClasses(classKeys, "HvDialog-Title");

export default dialogTitleClasses;
