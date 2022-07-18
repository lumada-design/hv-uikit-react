import { StandardProps, SnackbarProps } from "@mui/material";
import { ActionGeneric } from "../ActionsGeneric";
import { NotificationsCommonProps } from "../Banner";
import { HvSnackbarContentProps } from "./SnackbarContentWrapper";

export type HvSnackbarClassKey =
  // | "root"
  | "anchorOriginTopRight"
  | "anchorOriginTopLeft"
  | "anchorOriginTopCenter"
  | "anchorOriginBottomCenter"
  | "anchorOriginBottomLeft"
  | "anchorOriginBottomRight";

export interface HvSnackbarProps
  extends StandardProps<SnackbarProps, HvSnackbarClassKey, "action">,
    NotificationsCommonProps {
  /**
   * Action to display.
   */
  action?: React.ReactNode | ActionGeneric;
  /**
   * The callback function ran when an action is triggered, receiving `action` as param
   */
  actionCallback?: (id: string, action: ActionGeneric) => void;
  /**
   * Exposes the SnackbarContentProps so they can overriden from the outside.
   */
  snackbarContentProps?: HvSnackbarContentProps
}


export default function HvSnackbar(props: HvSnackbarProps): JSX.Element | null;
