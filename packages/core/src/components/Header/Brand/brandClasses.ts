import { getClasses } from "@core/utils";

export interface HvHeaderBrandClasses {
  root?: string;
  separator?: string;
}

const classKeys: (keyof HvHeaderBrandClasses)[] = ["root", "separator"];

const headerBrandClasses = getClasses(classKeys, "HvHeader-Brand");

export default headerBrandClasses;
