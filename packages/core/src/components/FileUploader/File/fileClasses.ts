import { getClasses } from "~/utils";

export type HvFileClasses = {
  root?: string;
  progressbar?: string;
  progressbarBack?: string;
  nameText?: string;
  progressTextContainer?: string;
  removeButton?: string;
  previewContainer?: string;
  icon?: string;
  fail?: string;
};

const classKeys: string[] = [
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

const fileClasses = getClasses<HvFileClasses>(classKeys, "HvFile");

export default fileClasses;
