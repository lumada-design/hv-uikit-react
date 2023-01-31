import { getClasses } from "utils";

export type HvGlobalActionsClasses = {
  root?: string;
  backButton?: string;
  actions?: string;
  wrapper?: string;
  name?: string;
};

const classKeys: string[] = [
  "root",
  "backButton",
  "actions",
  "wrapper",
  "name",
];

export const globalActionsClasses = getClasses<HvGlobalActionsClasses>(
  classKeys,
  "HvGlobalActions"
);

export * from "./GlobalActions";
