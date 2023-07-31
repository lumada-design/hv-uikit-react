import { getClasses } from "@core/utils/classes";

export interface HvBreadCrumbClasses {
  root?: string;
  link?: string;
  orderedList?: string;
  currentPage?: string;
  centerContainer?: string;
  separatorContainer?: string;
  a?: string;
}

const classKeys: (keyof HvBreadCrumbClasses)[] = [
  "root",
  "link",
  "orderedList",
  "currentPage",
  "centerContainer",
  "separatorContainer",
  "a",
];

const breadCrumbClasses = getClasses(classKeys, "HvBreadCrumb");

export default breadCrumbClasses;
