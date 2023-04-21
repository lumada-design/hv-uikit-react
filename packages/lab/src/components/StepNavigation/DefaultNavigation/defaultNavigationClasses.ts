import { getClasses } from "@hitachivantara/uikit-react-core";

export type HvDefaultNavigationClasses = {
  root: string;
};

const classKeys: string[] = ["root"];

const defaultNavigationClasses = getClasses<HvDefaultNavigationClasses>(
  classKeys,
  "HvStepNavigation"
);

export default defaultNavigationClasses;
