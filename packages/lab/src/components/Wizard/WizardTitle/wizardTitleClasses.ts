import { getClasses } from "@hitachivantara/uikit-react-core";

export type HvWizardTitleClasses = {
  /** Styles applied to the header container. */
  headerContainer?: string;
  /** Styles applied to override the Dialog Title styles. */
  messageContainer?: string;
  /** Styles applied to the header content container. */
  titleContainer?: string;
  /** Styles applied to the Button component to override its width. */
  buttonWidth?: string;
  /** Styles applied to the Button component to override its right padding. */
  rootSummaryButton?: string;
  /** Styles applies to the step container. */
  stepContainer?: string;
};

const classKeys: string[] = [
  "headerContainer",
  "messageContainer",
  "titleContainer",
  "buttonWidth",
  "rootSummaryButton",
  "stepContainer",
];

const wizardTitleClasses = getClasses<HvWizardTitleClasses>(
  classKeys,
  "HvWizardTitle"
);

export default wizardTitleClasses;
