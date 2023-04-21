import { getClasses } from "@core/utils";

export interface HvDotPaginationClasses {
  root?: string;
  horizontal?: string;
  radioRoot?: string;
  radio?: string;
  icon?: string;
}

const classKeys: string[] = [
  "root",
  "horizontal",
  "radioRoot",
  "radio",
  "icon",
];

const dotPaginationClasses = getClasses<HvDotPaginationClasses>(
  classKeys,
  "HvDotPagination"
);

export default dotPaginationClasses;
