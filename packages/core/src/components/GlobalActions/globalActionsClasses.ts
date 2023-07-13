import { getClasses } from "@core/utils/classes";

export interface HvGlobalActionsClasses {
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
}

const classKeys: (keyof HvGlobalActionsClasses)[] = [
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

const globalActionsClasses = getClasses(classKeys, "HvGlobalActions");

export default globalActionsClasses;
