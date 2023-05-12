import { getClasses } from "@core/utils";

export interface HvContainerClasses {
  root?: string;
  disableGutters?: string;
  fixed?: string;
  maxWidthXs?: string;
  maxWidthSm?: string;
  maxWidthMd?: string;
  maxWidthLg?: string;
  maxWidthXl?: string;
}

const classKeys: (keyof HvContainerClasses)[] = [
  "root",
  "disableGutters",
  "fixed",
  "maxWidthXs",
  "maxWidthSm",
  "maxWidthMd",
  "maxWidthLg",
  "maxWidthXl",
];

const containerClasses = getClasses(classKeys, "HvContainer");

export default containerClasses;
