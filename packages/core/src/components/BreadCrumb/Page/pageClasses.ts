import { getClasses } from "@core/utils";

export interface HvPageClasses {
  a?: string;
  link?: string;
  label?: string;
}

const classKeys: string[] = ["a", "link", "label"];

const pageClasses = getClasses<HvPageClasses>(classKeys, "HvPage");

export default pageClasses;
