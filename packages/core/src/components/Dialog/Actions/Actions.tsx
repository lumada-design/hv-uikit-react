import MuiDialogActions, {
  DialogActionsProps as MuiDialogActionsProps,
} from "@mui/material/DialogActions";

import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Actions.styles";
import { useDialogContext } from "../context";

export { staticClasses as dialogActionClasses };

export type HvDialogActionClasses = ExtractNames<typeof useClasses>;

export interface HvDialogActionsProps
  extends Omit<MuiDialogActionsProps, "classes">,
    HvBaseProps {
  /** Set the dialog to fullscreen mode. @deprecated set `fullscreen` in `HvDialog` */
  fullscreen?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvDialogActionClasses;
}

export const HvDialogActions = (props: HvDialogActionsProps) => {
  const {
    classes: classesProp,
    className,
    children,
    fullscreen: fullScreenProp,
    ...others
  } = useDefaultProps("HvDialogActions", props);
  const context = useDialogContext();
  const fullscreen = fullScreenProp ?? context.fullscreen;

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
