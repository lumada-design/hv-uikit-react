import { getClasses } from "@core/utils";

export interface HvAppSwitcherClasses {
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
  single?: string;
  dual?: string;
  fluid?: string;
}

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
  "single",
  "dual",
  "fluid",
];

const appSwitcherClasses = getClasses<HvAppSwitcherClasses>(
  classKeys,
  "HvAppSwitcher"
);

export default appSwitcherClasses;
