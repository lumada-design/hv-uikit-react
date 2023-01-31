import { getClasses } from "utils";

export type HvCardClasses = {
  root?: string;
  selectable?: string;
  selected?: string;
  semanticBar?: string;
};

const classKeys: string[] = ["root", "selectable", "selected", "semanticBar"];

export const cardClasses = getClasses<HvCardClasses>(classKeys, "HvCard");

export * from "./Card";
export { HvHeader as HvCardHeader } from "./Header";
export { HvContent as HvCardContent } from "./Content";
export { HvMedia as HvCardMedia } from "./Media";
