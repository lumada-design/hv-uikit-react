import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvWizardContentClassKey = "root";

export type HvWizardContentProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvWizardContentClassKey
> & {
  /**
   * Tabs to show on the Wizard.
   */
  children?: React.ReactNode;
  /**
   * Current tab to show.
   */
  tab: number;
  /**
   * Forces minimum height to the component.
   */
  fixedHeight?: boolean;
  /**
   * Whether the loading animation is shown.
   */
  loading?: boolean;
  /**
   * The content of the summary.
   */
  summaryContent?: React.ReactNode;
};

export default function HvWizardContent(props: HvWizardContentProps): JSX.Element | null;
