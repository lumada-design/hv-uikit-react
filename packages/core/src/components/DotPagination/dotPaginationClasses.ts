import { getClasses } from "@core/utils";

export interface HvDotPaginationClasses {
  root?: string;
  horizontal?: string;
  radioRoot?: string;
  radio?: string;
  icon?: string;
}

const classKeys: (keyof HvDotPaginationClasses)[] = [
  "root",
  "horizontal",
  "radioRoot",
  "radio",
  "icon",
];

const dotPaginationClasses = getClasses(classKeys, "HvDotPagination");

export default dotPaginationClasses;
