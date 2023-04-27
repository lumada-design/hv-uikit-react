import { getClasses } from "@hitachivantara/uikit-react-core";

export interface HvDefaultNavigationClasses {
  root: string;
}

const classKeys: string[] = ["root"];

const defaultNavigationClasses = getClasses<HvDefaultNavigationClasses>(
  classKeys,
  "HvStepNavigation"
);

export default defaultNavigationClasses;
