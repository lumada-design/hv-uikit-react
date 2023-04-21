import { getClasses } from "@core/utils";

export interface HvHeaderClasses {
  root?: string;
  header?: string;
  backgroundColor?: string;
}

const classKeys: string[] = ["root", "header", "backgroundColor"];

const headerClasses = getClasses<HvHeaderClasses>(classKeys, "HvHeader");

export default headerClasses;
