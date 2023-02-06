import { getClasses } from "utils";

export type HvCardClasses = {
  root?: string;
  selectable?: string;
  selected?: string;
  semanticBar?: string;
};

const classKeys: string[] = ["root", "selectable", "selected", "semanticBar"];

const cardClasses = getClasses<HvCardClasses>(classKeys, "HvCard");

export default cardClasses;
