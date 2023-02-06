import { getClasses } from "utils";

export type HvMultiButtonClasses = {
  root?: string;
  button?: string;
};

const classKeys: string[] = ["root", "button"];

const multiButtonClasses = getClasses<HvMultiButtonClasses>(
  classKeys,
  "HvMultiButton"
);

export default multiButtonClasses;
