import { getClasses } from "@core/utils";

export interface HvFilterGroupLeftPanelClasses {
  listItem?: string;
}

const classKeys: (keyof HvFilterGroupLeftPanelClasses)[] = ["listItem"];

const filterGroupLeftPanelClasses = getClasses(
  classKeys,
  "HvFilterGroupLeftPanel"
);

export default filterGroupLeftPanelClasses;
