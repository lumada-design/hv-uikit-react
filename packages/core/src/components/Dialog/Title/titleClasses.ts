import { getClasses } from "utils";

export type HvDialogTitleClasses = {
  root?: string;
  fullscreen?: string;
  messageContainer?: string;
  textWithIcon?: string;
};

const classKeys: string[] = [
  "root",
  "fullscreen",
  "messageContainer",
  "textWithIcon",
];

const dialogTitleClasses = getClasses<HvDialogTitleClasses>(
  classKeys,
  "HvDialog-Title"
);

export default dialogTitleClasses;
