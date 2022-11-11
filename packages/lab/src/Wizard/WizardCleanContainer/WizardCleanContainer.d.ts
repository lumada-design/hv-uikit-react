import * as React from "react";
import { StandardProps } from "@mui/material";

export type HvWizardCleanContainerClassKey = "root";

export type HvWizardCleanContainerProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvWizardCleanContainerClassKey
> & {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * Components of the Wizard.
   */
  children?: React.ReactNode;
};

export default function HvWizardCleanContainer(
  props: HvWizardCleanContainerProps
): JSX.Element | null;
