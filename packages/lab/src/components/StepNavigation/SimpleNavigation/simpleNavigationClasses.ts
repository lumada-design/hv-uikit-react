import { getClasses } from "@hitachivantara/uikit-react-core";

export type HvSimpleNavigationClasses = {
  root: string;
};

const classKeys: string[] = ["root"];

const simpleNavigationClasses = getClasses<HvSimpleNavigationClasses>(
  classKeys,
  "HvStepNavigation"
);

export default simpleNavigationClasses;
