import { getClasses } from "utils";

export type HvTabsClasses = {
  root?: string;
  flexContainer?: string;
  indicator?: string;
  scroller?: string;
};

const classKeys: string[] = ["root", "flexContainer", "indicator", "scroller"];

const tabsClasses = getClasses<HvTabsClasses>(classKeys, "HvTabs");

export default tabsClasses;
