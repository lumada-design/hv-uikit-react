import { getClasses } from "@hitachivantara/uikit-react-core";

export type HvWizardContainerClasses = {
  /** Styles applied to the component root class. */
  root?: string;
  /** Style applied to the component (root). */
  paper?: string;
  /** Style applied to the close button. */
  closeButton?: string;
};

const classKeys: (keyof HvWizardContainerClasses)[] = [
  "root",
  "paper",
  "closeButton",
];

const wizardContainerClasses = getClasses(classKeys, "HvWizardContainer");

export default wizardContainerClasses;
