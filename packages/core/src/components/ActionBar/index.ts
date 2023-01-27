import { getClasses } from "utils";

export type HvActionBarClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

export const actionBarClasses = getClasses<HvActionBarClasses>(
  classKeys,
  "HvActionBar"
);

export * from "./ActionBar";
