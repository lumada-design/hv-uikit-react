import { getClasses } from "utils";

export type HvListContainerClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

export const listContainerClasses = getClasses<HvListContainerClasses>(
  classKeys,
  "HvListContainer"
);

export * from "./ListContainer";
export * from "./ListItem";
