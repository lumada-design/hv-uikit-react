import { getClasses } from "~/utils";

export interface HvActionBarClasses {
  root?: string;
}

const classKeys: string[] = ["root"];

const actionBarClasses = getClasses<HvActionBarClasses>(
  classKeys,
  "HvActionBar"
);

export default actionBarClasses;
