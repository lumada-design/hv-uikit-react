import { getClasses } from "@core/utils";

export interface HvBreadCrumbClasses {
  root?: string;
  link?: string;
  orderedList?: string;
  currentPage?: string;
  centerContainer?: string;
  separatorContainer?: string;
  a?: string;
}

const classKeys: string[] = [
  "root",
  "link",
  "orderedList",
  "currentPage",
  "centerContainer",
  "separatorContainer",
  "a",
];

const breadCrumbClasses = getClasses<HvBreadCrumbClasses>(
  classKeys,
  "HvBreadCrumb"
);

export default breadCrumbClasses;
