import { getClasses } from "@core/utils";

export interface HvHeaderClasses {
  root?: string;
  header?: string;
  backgroundColor?: string;
}

const classKeys: (keyof HvHeaderClasses)[] = [
  "root",
  "header",
  "backgroundColor",
];

const headerClasses = getClasses(classKeys, "HvHeader");

export default headerClasses;
