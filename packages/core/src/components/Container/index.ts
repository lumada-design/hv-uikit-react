import { getClasses } from "utils";

export type HvContainerClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

export const containerClasses = getClasses<HvContainerClasses>(
  classKeys,
  "HvContainer"
);

export * from "./Container";
