import { getClasses } from "@hitachivantara/uikit-react-core";

export type HvWizardClasses = {
  /** Styles applied to the component root class. */
  root?: string;
};

const classKeys: string[] = ["root"];

const wizardClasses = getClasses<HvWizardClasses>(classKeys, "HvWizard");

export default wizardClasses;
