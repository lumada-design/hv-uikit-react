import { getClasses } from "@hitachivantara/uikit-react-core";

export interface HvDefaultNavigationClasses {
  root: string;
}

const classKeys: (keyof HvDefaultNavigationClasses)[] = ["root"];

const defaultNavigationClasses = getClasses(classKeys, "HvStepNavigation");

export default defaultNavigationClasses;
