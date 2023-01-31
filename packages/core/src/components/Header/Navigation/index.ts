import { getClasses } from "utils";

export type HvNavigationClasses = { root?: string };

const classKeys: string[] = ["root"];

export const navigationClasses = getClasses<HvNavigationClasses>(
  classKeys,
  "HvHeader-Navigation"
);

export * from "./Navigation";
export { HvMenuBar as HvHeaderMenuBar } from "./MenuBar";
export { HvMenuItem as HvHeaderMenuItem } from "./MenuItem";
