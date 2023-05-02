import { ClassNames } from "@emotion/react";
import { HvBaseProps, HvDialog } from "@hitachivantara/uikit-react-core";
import { clsx } from "clsx";
import wizardContainerClasses, {
  HvWizardContainerClasses,
} from "./wizardContainerClasses";
import { styles } from "./WizardContainer.styles";
import React from "react";

export interface HvWizardContainerProps extends Omit<HvBaseProps, "onClose"> {
  /** Current state of the Wizard. */
  open: boolean;
  /** Function executed on close. */
  handleClose: (
    event: React.SyntheticEvent,
    reason?: "escapeKeyDown" | "backdropClick"
  ) => void;
  /** A Jss Object used to override or extend the styles applied to the empty state Wizard. */
  classes?: HvWizardContainerClasses;
}

export const HvWizardContainer = ({
  classes,
  className,
  children,
  handleClose,
  open,
  ...others
}: HvWizardContainerProps) => {
  return (
    <ClassNames>
      {({ css }) => (
        <HvDialog
          classes={{
            closeButton: clsx(
              classes?.closeButton,
              wizardContainerClasses.closeButton,
              css(styles.closeButton)
            ),
            paper: clsx(
              classes?.paper,
              wizardContainerClasses.paper,
              css(styles.paper)
            ),
          }}
          className={clsx(
            className,
            classes?.root,
            wizardContainerClasses.root
          )}
          open={open}
          onClose={handleClose}
          {...others}
        >
          {children}
        </HvDialog>
      )}
    </ClassNames>
  );
};
