import { StandardProps, SnackbarContentProps } from "@mui/material";
import { ActionGeneric } from "../../ActionsGeneric";
import { SemanticVariantTypes } from "../../Banner";

export type HvSnackbarContentClassKey =
  | "root"
  | "success"
  | "error"
  | "default"
  | "message"
  | "messageSpan"
  | "messageText"
  | "action";

export interface HvSnackbarContentProps
  extends StandardProps<SnackbarContentProps, HvSnackbarContentClassKey, "action" | "variant"> {
  /**
   * The message to display.
   */
  label?: React.ReactNode;
  /**
   * Variant of the snackbar.
   */
  variant?: SemanticVariantTypes;
  /**
   * Custom icon to replace the variant default.
   */
  customIcon?: React.ReactNode;
  /**
   * Controls if the associated icon to the variant should be shown.
   */
  showIcon?: boolean;
  /**
   * Action to display.
   */
  action?: React.ReactNode | ActionGeneric;
  /**
   * The callback function ran when an action is triggered, receiving `action` as param
   */
  actionCallback?: (event: Event, id: string, action: ActionGeneric) => void;
}

export default function HvSnackbarContent(props: HvSnackbarContentProps): JSX.Element | null;
