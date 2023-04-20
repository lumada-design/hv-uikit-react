import { getClasses } from "@core/utils";

export type HvCardClasses = {
  root?: string;
  selectable?: string;
  selected?: string;
  semanticBar?: string;
  semanticContainer?: string;
  icon?: string;
};

const classKeys: string[] = [
  "root",
  "selectable",
  "selected",
  "semanticBar",
  "semanticContainer",
  "icon",
];

const cardClasses = getClasses<HvCardClasses>(classKeys, "HvCard");

export default cardClasses;
