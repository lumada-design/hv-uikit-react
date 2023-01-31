import { getClasses } from "utils";

export type HvActionsClasses = {
  root?: string;
};

const classKeys: string[] = ["root"];

export const actionsClasses = getClasses<HvActionsClasses>(
  classKeys,
  "HvHeader-Actions"
);

export * from "./Actions";
