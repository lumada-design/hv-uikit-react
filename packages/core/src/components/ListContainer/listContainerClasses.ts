import { getClasses } from "@core/utils";

export interface HvListContainerClasses {
  root?: string;
}

const classKeys: (keyof HvListContainerClasses)[] = ["root"];

const listContainerClasses = getClasses(classKeys, "HvListContainer");

export default listContainerClasses;
