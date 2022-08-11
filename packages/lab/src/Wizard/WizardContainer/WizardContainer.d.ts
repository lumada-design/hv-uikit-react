import * as React from "react";
import { StandardProps, ModalProps } from "@material-ui/core";

export type HvWizardContainerClassKey = "root";

export type HvWizardContainerProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvWizardContainerClassKey
> & {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * Components of the Wizard.
   */
  children?: React.ReactNode;
  /**
   * Current state of the Wizard.
   */
  open: boolean;
  /**
   * Function executed on close.
   */
  handleClose: ModalProps["onClose"];
};

export default function HvWizardContainer(props: HvWizardContainerProps): JSX.Element | null;
