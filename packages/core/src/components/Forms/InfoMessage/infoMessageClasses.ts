import { getClasses } from "@core/utils";

export interface HvInfoMessageClasses {
  root?: string;
  infoDisabled?: string;
  gutter?: string;
}

const classKeys: (keyof HvInfoMessageClasses)[] = [
  "root",
  "infoDisabled",
  "gutter",
];

const infoMessageClasses = getClasses(classKeys, "HvInfoMessage");

export default infoMessageClasses;
