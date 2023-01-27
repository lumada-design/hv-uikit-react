import { getClasses } from "utils";

export type HvWarningTextClasses = {
  root?: string;
  defaultIcon?: string;
  warningText?: string;
  show?: string;
  topGutter?: string;
  hideText?: string;
  topBorder?: string;
};

const classKeys: string[] = [
  "root",
  "defaultIcon",
  "warningText",
  "show",
  "topGutter",
  "hideText",
  "topBorder",
];

export const warningTextClasses = getClasses<HvWarningTextClasses>(
  classKeys,
  "HvWarningText"
);

export * from "./WarningText";
