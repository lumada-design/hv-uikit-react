import { getClasses } from "@core/utils";

export interface HvCardClasses {
  root?: string;
  selectable?: string;
  selected?: string;
  semanticBar?: string;
  semanticContainer?: string;
  icon?: string;
}

const classKeys: (keyof HvCardClasses)[] = [
  "root",
  "selectable",
  "selected",
  "semanticBar",
  "semanticContainer",
  "icon",
];

const cardClasses = getClasses(classKeys, "HvCard");

export default cardClasses;
