import { getClasses } from "utils";

export type HvDialogClasses = {
  root?: string;
  closeButton?: string;
  fullscreen?: string;
};

const classKeys: string[] = ["root", "closeButton", "fullscreen"];

const dialogClasses = getClasses<HvDialogClasses>(classKeys, "HvDialog");

export default dialogClasses;
