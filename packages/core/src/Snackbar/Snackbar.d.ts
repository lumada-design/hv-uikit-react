import { StandardProps, SnackbarProps } from "@material-ui/core";
import { Action } from "../Actions";
import { NotificationsCommonProps } from "../Banner";

export interface HvSnackbarProps
  extends StandardProps<SnackbarProps, HvSnackbarClassKey, "action">,
    NotificationsCommonProps {
  /**
   * Action to display.
   */
  action?: React.ReactNode | Action;
  /**
   * The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionCallback?: (id: string, action: Action) => void;
}

export type HvSnackbarClassKey =
  // | "root"
  | "anchorOriginTopRight"
  | "anchorOriginTopLeft"
  | "anchorOriginTopCenter"
  | "anchorOriginBottomCenter"
  | "anchorOriginBottomLeft"
  | "anchorOriginBottomRight";

export default function HvSnackbar(props: HvSnackbarProps): JSX.Element | null;
