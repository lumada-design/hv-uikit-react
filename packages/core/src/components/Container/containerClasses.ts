import { getClasses } from "utils";

export type HvContainerClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

const containerClasses = getClasses<HvContainerClasses>(
  classKeys,
  "HvContainer"
);

export default containerClasses;
