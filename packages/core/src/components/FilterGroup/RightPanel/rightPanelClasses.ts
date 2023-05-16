import { getClasses } from "@core/utils";

export interface HvFilterGroupRightPanelClasses {
  search?: string;
  selectAllContainer?: string;
  selectAll?: string;
  list?: string;
}

const classKeys: (keyof HvFilterGroupRightPanelClasses)[] = [
  "list",
  "search",
  "selectAll",
  "selectAllContainer",
];

const filterGroupRightPanelClasses = getClasses(
  classKeys,
  "HvFilterGroupRightPanel"
);

export default filterGroupRightPanelClasses;
