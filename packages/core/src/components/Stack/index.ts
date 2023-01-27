import { getClasses } from "utils";

export type HvStackClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

export const stackClasses = getClasses<HvStackClasses>(classKeys, "HvStack");

export * from "./Stack";
