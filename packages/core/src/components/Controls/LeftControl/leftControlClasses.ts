import { getClasses } from "utils";

export type HvLeftControlClasses = {
  root: string;
};

const classKeys: string[] = ["root"];

const leftControlClasses = getClasses<HvLeftControlClasses>(
  classKeys,
  "HvLeftControl"
);

export default leftControlClasses;
