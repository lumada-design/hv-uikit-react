import { getClasses } from "@core/utils";

export interface HvLeftControlClasses {
  root: string;
}

const classKeys: string[] = ["root"];

const leftControlClasses = getClasses<HvLeftControlClasses>(
  classKeys,
  "HvLeftControl"
);

export default leftControlClasses;
