import { getClasses } from "@hitachivantara/uikit-react-core";

export interface HvSimpleNavigationClasses {
  root: string;
}

const classKeys: (keyof HvSimpleNavigationClasses)[] = ["root"];

const simpleNavigationClasses = getClasses(classKeys, "HvStepNavigation");

export default simpleNavigationClasses;
