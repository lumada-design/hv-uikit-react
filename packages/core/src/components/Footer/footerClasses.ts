import { getClasses } from "@core/utils/classes";

export interface HvFooterClasses {
  root?: string;
  name?: string;
  copyright?: string;
  separator?: string;
  rightContainer?: string;
}

const classKeys: (keyof HvFooterClasses)[] = [
  "root",
  "name",
  "copyright",
  "separator",
  "rightContainer",
];

const footerClasses = getClasses(classKeys, "HvFooter");

export default footerClasses;
