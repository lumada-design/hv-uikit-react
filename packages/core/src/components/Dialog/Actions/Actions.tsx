import MuiDialogActions, {
  DialogActionsProps as MuiDialogActionsProps,
} from "@mui/material/DialogActions";

import { HvBaseProps } from "@core/types";
import { ExtractNames } from "@core/utils";

import { staticClasses, useClasses } from "./Actions.styles";

export { staticClasses as dialogActionClasses };

export type HvDialogActionClasses = ExtractNames<typeof useClasses>;

export interface HvDialogActionsProps
  extends Omit<MuiDialogActionsProps, "classes">,
    HvBaseProps {
  /** Set the dialog to fullscreen mode. */
  fullscreen?: boolean;
  classes?: HvDialogActionClasses;
}

export const HvDialogActions = ({
  classes: classesProp,
  className,
  children,
  fullscreen = false,
  ...others
}: HvDialogActionsProps) => {
  const { classes, cx } = useClasses(classesProp);

  return (
    <MuiDialogActions
      className={className}
      classes={{
        root: cx(classes.root, { [classes.fullscreen]: fullscreen }),
        spacing: classes.spacing,
      }}
      {...others}
    >
      {children}
    </MuiDialogActions>
  );
};
