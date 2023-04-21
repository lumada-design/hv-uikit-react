import { getClasses } from "@core/utils";

export interface HvListContainerClasses {
  root?: string;
}

const classKeys: string[] = ["root"];

const listContainerClasses = getClasses<HvListContainerClasses>(
  classKeys,
  "HvListContainer"
);

export default listContainerClasses;
