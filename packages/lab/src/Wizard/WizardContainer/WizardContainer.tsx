import {
  ExtractNames,
  HvBaseProps,
  HvDialog,
  HvDialogProps,
  useDefaultProps,
} from "@hitachivantara/uikit-react-core";

import { staticClasses, useClasses } from "./WizardContainer.styles";

export { staticClasses as wizardContainerClasses };

export type HvWizardContainerClasses = ExtractNames<typeof useClasses>;

export interface HvWizardContainerProps
  extends Omit<HvBaseProps, "onClose">,
    Pick<HvDialogProps, "maxWidth" | "fullWidth"> {
  /** Current state of the Wizard. */
  open: boolean;
  /** Function executed on close. */
  handleClose: (
    event: React.SyntheticEvent,
    reason?: "escapeKeyDown" | "backdropClick",
  ) => void;
  /** A Jss Object used to override or extend the styles applied to the empty state Wizard. */
  classes?: HvWizardContainerClasses;
}

export const HvWizardContainer = (props: HvWizardContainerProps) => {
  const {
    classes: classesProp,
    className,
    children,
    handleClose,
    open,
    ...others
  } = useDefaultProps("HvWizardContainer", props);
  const { classes } = useClasses(classesProp);

  return (
    <HvDialog
      classes={{
        closeButton: classes.closeButton,
        paper: classes.paper,
      }}
      className={classes.root}
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      {...others}
    >
      {children}
    </HvDialog>
  );
};
