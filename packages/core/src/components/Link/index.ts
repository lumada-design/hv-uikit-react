import { getClasses } from "utils";

export type HvLinkClasses = {
  a?: string;
};

const classKeys: string[] = ["a"];

export const linkClasses = getClasses<HvLinkClasses>(classKeys, "HvLink");

export * from "./Link";
