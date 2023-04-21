import { getClasses } from "@core/utils";

export interface HvHeaderNavigationClasses {
  root?: string;
}

const classKeys: string[] = ["root"];

const headerNavigationClasses = getClasses<HvHeaderNavigationClasses>(
  classKeys,
  "HvHeader-Navigation"
);

export default headerNavigationClasses;
