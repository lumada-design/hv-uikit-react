import { getClasses } from "~/utils";

export type HvDialogClasses = {
  root?: string;
  closeButton?: string;
  fullscreen?: string;
  background?: string;
  paper?: string;
};

const classKeys: string[] = [
  "root",
  "closeButton",
  "fullscreen",
  "background",
  "paper",
];

const dialogClasses = getClasses<HvDialogClasses>(classKeys, "HvDialog");

export default dialogClasses;
