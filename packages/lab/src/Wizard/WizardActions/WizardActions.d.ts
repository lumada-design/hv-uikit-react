import * as React from "react";
import { ModalProps, StandardProps } from "@mui/material";

export type HvWizardActionsClassKey = "root";

export type HvWizardActionsProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvWizardActionsClassKey
> & {
  /**
   * Current tab to check if it's last page or first to disable previous button and swap between next and submit button.
   */
  tab: number;
  /**
   * Function to change the tab when pressing previous and next buttons.
   */
  changeTab: any;
  /**
   * Function to handle the cancel button.
   */
  handleClose: ModalProps["onClose"];
  /**
   * Function to handle the submit button. Also sends the current context state.
   */
  onSubmit: any;
  /**
   * An object containing all the labels for the wizard actions component.
   */
  labels: {
    /**
     * Cancel button label.
     */
    cancel: string;
    /**
     * Skip button label.
     */
    skip: string;
    /**
     * Previous button label.
     */
    previous: string;
    /**
     * Next button label.
     */
    next: string;
    /**
     * Submit button label.
     */
    submit: string;
  };
  /**
   * Whether the submit button is disabled.
   */
  loading?: boolean;
  /**
   * Enables the skip button.
   */
  skippable?: boolean;
};

export default function HvWizardActions(props: HvWizardActionsProps): JSX.Element | null;
