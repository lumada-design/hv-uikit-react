import { getClasses } from "utils";

export type HvAppSwitcherClasses = {
  root?: string;
  item?: string;
  itemSelected?: string;
  itemDisabled?: string;
  itemTrigger?: string;
  itemIcon?: string;
  itemTitle?: string;
  itemInfoIcon?: string;
  actionsContainer?: string;
  footerContainer?: string;
  open?: string;
  closed?: string;
  title?: string;
};

const classKeys: string[] = [
  "root",
  "item",
  "itemSelected",
  "itemDisabled",
  "itemTrigger",
  "itemIcon",
  "itemTitle",
  "itemInfoIcon",
  "actionsContainer",
  "footerContainer",
  "open",
  "closed",
  "title",
];

export const appSwitcherClasses = getClasses<HvAppSwitcherClasses>(
  classKeys,
  "HvAppSwitcher"
);

export * from "./AppSwitcher";
export { HvAction as HvAppSwitcherAction } from "./Action";
