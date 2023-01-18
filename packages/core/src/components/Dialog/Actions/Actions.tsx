import { DialogActionsProps as MuiDialogActionsProps } from "@mui/material/DialogActions";
import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import { StyledActions } from "./Actions.styles";

export type HvActionsProps = MuiDialogActionsProps &
  HvBaseProps & {
    /** Set the dialog to fullscreen mode. */
    fullscreen?: boolean;
    classes?: {
      root?: string;
      fullscreen?: string;
      spacing?: string;
    };
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
        root: clsx(classes?.root, fullscreen && classes?.fullscreen),
        spacing: classes?.spacing,
      }}
      $fullscreen={fullscreen}
      {...others}
    >
      {children}
    </StyledActions>
  );
};
