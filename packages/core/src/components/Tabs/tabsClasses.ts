import { getClasses } from "@core/utils";

export interface HvTabsClasses {
  root?: string;
  flexContainer?: string;
  indicator?: string;
  scroller?: string;
}

const classKeys: string[] = ["root", "flexContainer", "indicator", "scroller"];

const tabsClasses = getClasses<HvTabsClasses>(classKeys, "HvTabs");

export default tabsClasses;
