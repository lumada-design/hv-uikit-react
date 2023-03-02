import { getClasses } from "utils";

export type HvMultiButtonClasses = {
  root?: string;
  button?: string;
  vertical?: string;
  selected?: string;
};

const classKeys: string[] = ["root", "button", "vertical", "selected"];

const multiButtonClasses = getClasses<HvMultiButtonClasses>(
  classKeys,
  "HvMultiButton"
);

export default multiButtonClasses;
