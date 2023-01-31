import { getClasses } from "utils";

export type HvMultiButtonClasses = {
  root?: string;
  button?: string;
};

const classKeys: string[] = ["root", "button"];

export const multiButtonClasses = getClasses<HvMultiButtonClasses>(
  classKeys,
  "HvMultiButton"
);

export * from "./MultiButton";
