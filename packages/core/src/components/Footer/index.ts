import { getClasses } from "utils";

export type HvFooterClasses = {
  root?: string;
  name?: string;
  copyright?: string;
  separator?: string;
};

const classKeys: string[] = ["root", "name", "copyright", "separator"];

export const footerClasses = getClasses<HvFooterClasses>(classKeys, "HvFooter");

export * from "./Footer";
