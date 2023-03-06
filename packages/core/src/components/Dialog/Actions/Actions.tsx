import { DialogActionsProps as MuiDialogActionsProps } from "@mui/material/DialogActions";
import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { StyledActions } from "./Actions.styles";
import dialogActionClasses, { HvDialogActionClasses } from "./actionsClasses";

export type HvActionsProps = Omit<MuiDialogActionsProps, "classes"> &
  HvBaseProps & {
    /** Set the dialog to fullscreen mode. */
    fullscreen?: boolean;
    classes?: HvDialogActionClasses;
  };

export const HvActions = ({
  classes,
  className,
  children,
  fullscreen = false,
  ...others
}: HvActionsProps) => {
  return (
    <StyledActions
      className={className}
      classes={{
        root: clsx(
          dialogActionClasses.root,
          classes?.root,
          fullscreen &&
            clsx(dialogActionClasses.fullscreen, classes?.fullscreen)
        ),
        spacing: clsx(dialogActionClasses.spacing, classes?.spacing),
      }}
      $fullscreen={fullscreen}
      {...others}
    >
      {children}
    </StyledActions>
  );
};
