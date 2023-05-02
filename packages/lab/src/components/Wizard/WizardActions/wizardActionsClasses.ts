import { getClasses } from "@hitachivantara/uikit-react-core";

export type HvWizardActionsClasses = {
  /** Styles applied to the component which contains the groups of buttons. */
  actionsContainer?: string;
  /** Styles applied to the component which contains the buttons. */
  buttonsContainer?: string;
  /** Styles applied to the Button component to override its width. */
  buttonWidth?: string;
  /** Styles applied to some Button components to override its left padding. */
  buttonSpacing?: string;
};

const classKeys: string[] = [
  "actionsContainer",
  "buttonsContainer",
  "buttonWidth",
  "buttonSpacing",
];

const wizardActionsClasses = getClasses<HvWizardActionsClasses>(
  classKeys,
  "HvWizardActions"
);

export default wizardActionsClasses;
