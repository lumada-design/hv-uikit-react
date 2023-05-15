import { getClasses } from "@core/utils";

export interface HvFileClasses {
  root?: string;
  progressbar?: string;
  progressbarBack?: string;
  nameText?: string;
  progressTextContainer?: string;
  removeButton?: string;
  previewContainer?: string;
  icon?: string;
  fail?: string;
}

const classKeys: (keyof HvFileClasses)[] = [
  "root",
  "progressbar",
  "progressbarBack",
  "nameText",
  "progressTextContainer",
  "removeButton",
  "previewContainer",
  "icon",
  "fail",
];

const fileClasses = getClasses(classKeys, "HvFile");

export default fileClasses;
