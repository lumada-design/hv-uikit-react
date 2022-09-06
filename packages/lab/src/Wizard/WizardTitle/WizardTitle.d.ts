import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvStepNavigationProps } from "../../StepNavigation";

export type HvWizardTitleClassKey = "root";

export type HvWizardTitleProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvWizardTitleClassKey
> & {
  /**
   * Title for the wizard.
   */
  title: string;
  /**
   * Shows the summary button.
   */
  hasSummary: boolean;
  /**
   * An object containing all the labels for the wizard header.
   */
  labels: {
    /**
     * Summary button label.
     */
    summary: string;
  };
  /**
   * Current tab to check if it's last page or first to disable previous button and swap between next and submit button.
   */
  tab: number;
  /**
   * Function to change the tab when pressing previous and next buttons.
   */
  changeTab: any;
  /**
   * Custom object to define type, size and width of the StepNavigation component
   */
   customStep?: Pick<HvStepNavigationProps, "type" | "stepSize" | "width">
};

export default function HvWizardTitle(props: HvWizardTitleProps): JSX.Element | null;
