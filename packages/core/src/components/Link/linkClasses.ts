import { getClasses } from "~/utils";

export type HvLinkClasses = {
  a?: string;
};

const classKeys: string[] = ["a"];

const linkClasses = getClasses<HvLinkClasses>(classKeys, "HvLink");

export default linkClasses;
