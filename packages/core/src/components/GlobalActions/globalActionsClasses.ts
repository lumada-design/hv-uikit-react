import { getClasses } from "@core/utils";

export type HvGlobalActionsClasses = {
  root?: string;
  global?: string;
  backButton?: string;
  globalSectionArea?: string;
  actions?: string;
  wrapper?: string;
  name?: string;
  positionFixed?: string;
  positionSticky?: string;
  globalWrapperComplement?: string;
};

const classKeys: string[] = [
  "root",
  "global",
  "backButton",
  "globalSectionArea",
  "actions",
  "wrapper",
  "name",
  "positionFixed",
  "positionSticky",
  "globalWrapperComplement",
];

const globalActionsClasses = getClasses<HvGlobalActionsClasses>(
  classKeys,
  "HvGlobalActions"
);

export default globalActionsClasses;
