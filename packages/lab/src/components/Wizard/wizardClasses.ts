import { getClasses } from "@hitachivantara/uikit-react-core";

export type HvWizardClasses = {
  /** Styles applied to the component root class. */
  root?: string;
};

const classKeys: (keyof HvWizardClasses)[] = ["root"];

const wizardClasses = getClasses(classKeys, "HvWizard");

export default wizardClasses;
