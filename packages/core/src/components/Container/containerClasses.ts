import { getClasses } from "~/utils";

export type HvContainerClasses = {
  root?: string;
  disableGutters?: string;
  fixed?: string;
  maxWidthXs?: string;
  maxWidthSm?: string;
  maxWidthMd?: string;
  maxWidthLg?: string;
  maxWidthXl?: string;
};

const classKeys: string[] = [
  "root",
  "disableGutters",
  "fixed",
  "maxWidthXs",
  "maxWidthSm",
  "maxWidthMd",
  "maxWidthLg",
  "maxWidthXl",
];

const containerClasses = getClasses<HvContainerClasses>(
  classKeys,
  "HvContainer"
);

export default containerClasses;
