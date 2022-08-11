import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvWizardContentClassKey = "root";

export type HvWizardContentProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvWizardContentClassKey
> & {
  /**
   * Tabs to show on the Wizard.
   */
  children: React.ReactNode;
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
};

export default function HvWizardContent(props: HvWizardContentProps): JSX.Element | null;
