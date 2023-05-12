import { getClasses } from "@core/utils";

export interface HvWarningTextClasses {
  root?: string;
  defaultIcon?: string;
  warningText?: string;
  show?: string;
  topGutter?: string;
  hideText?: string;
  topBorder?: string;
}

const classKeys: (keyof HvWarningTextClasses)[] = [
  "root",
  "defaultIcon",
  "warningText",
  "show",
  "topGutter",
  "hideText",
  "topBorder",
];

const warningTextClasses = getClasses(classKeys, "HvWarningText");

export default warningTextClasses;
