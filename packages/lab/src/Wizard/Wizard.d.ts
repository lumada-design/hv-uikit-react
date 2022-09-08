import * as React from "react";
import { StandardProps, ModalProps } from "@material-ui/core";
import { HvWizardActionsProps } from "./WizardActions";
import { HvWizardTitleProps } from "./WizardTitle";
import { HvStepNavigationProps } from "../StepNavigation";

export type HvWizardClassKey = "root";

export type HvWizardProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvWizardClassKey
> & {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * Current state of the Wizard.
   */
  open: boolean;
  /**
   * Function executed on close.
   */
  onClose: ModalProps["onClose"];
  /**
   * Function executed on submit.
   */
  handleSubmit: any;
  /**
   * Title for the wizard.
   */
  title?: string;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * An object containing all the labels for the wizard.
   */
  labels?: HvWizardActionsProps["labels"] & HvWizardTitleProps["labels"];
  /**
   * Shows the summary button.
   */
  hasSummary?: boolean;
  /**
   * Enables the skip button.
   */
  skippable?: boolean;
  /**
   * Forces minimum height to the component.
   */
  fixedHeight?: boolean;
  /**
   * Whether the loading animation is shown.
   */
  loading?: boolean;
  /**
   * Custom object to define type, size and width of the StepNavigation component
   */
  customStep?: Pick<HvStepNavigationProps, "type" | "stepSize" | "width">
};

export default function HvWizard(props: HvWizardProps): JSX.Element | null;
