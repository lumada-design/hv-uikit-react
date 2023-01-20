import { getClasses } from "utils";

export type HvPageClasses = {
  a?: string;
  link?: string;
  label?: string;
};

const classKeys: string[] = ["a", "link", "label"];

const pageClasses = getClasses<HvPageClasses>(classKeys, "HvPage");

export default pageClasses;
