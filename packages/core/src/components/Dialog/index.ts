import { getClasses } from "utils";

export type HvDialogClasses = {
  root?: string;
  closeButton?: string;
  fullscreen?: string;
};

const classKeys: string[] = ["root", "closeButton", "fullscreen"];

export const dialogClasses = getClasses<HvDialogClasses>(classKeys, "HvDialog");

export { HvTitle as HvDialogTitle } from "./Title";
export { HvContent as HvDialogContent } from "./Content";
export { HvActions as HvDialogActions } from "./Actions";
export * from "./Dialog";
