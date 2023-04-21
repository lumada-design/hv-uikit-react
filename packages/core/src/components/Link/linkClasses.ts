import { getClasses } from "@core/utils";

export interface HvLinkClasses {
  a?: string;
}

const classKeys: string[] = ["a"];

const linkClasses = getClasses<HvLinkClasses>(classKeys, "HvLink");

export default linkClasses;
