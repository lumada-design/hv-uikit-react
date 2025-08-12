import { forwardRef } from "react";
import type { SnackbarProps as MuiSnackbarProps } from "@mui/material/Snackbar";
import type { SnackbarContentProps as MuiSnackbarContentProps } from "@mui/material/SnackbarContent";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvActionGeneric, HvActionsGenericProps } from "../../ActionsGeneric";
import { HvCallout, HvCalloutVariant } from "../../utils/Callout";
import { staticClasses, useClasses } from "./SnackbarContent.styles";

export { staticClasses as snackbarContentClasses };

export type HvSnackbarContentClasses = ExtractNames<typeof useClasses>;

export type HvSnackbarVariant = HvCalloutVariant;

const isActionGeneric = (action: any): action is HvActionGeneric =>
  action && typeof action === "object" && "id" in action && "label" in action;

export interface HvSnackbarContentProps
  extends Omit<MuiSnackbarContentProps, "variant" | "action" | "classes"> {
  /** The message to display. */
  label?: React.ReactNode;
  /** Variant of the snackbar. */
  variant?: HvSnackbarVariant;
  /** Controls if the associated icon to the variant should be shown. */
  showIcon?: boolean;
  /** Custom icon to replace the variant default. */
  customIcon?: React.ReactNode;
  /** Action to display. */
  action?: React.ReactNode | HvActionGeneric;
  /** The callback function called when an action is triggered, receiving `action` as parameter. */
  onAction?: HvActionsGenericProps["onAction"];
  /** @inheritdoc */
  onClose?: MuiSnackbarProps["onClose"];
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvSnackbarContentClasses;
}

export const HvSnackbarContent = forwardRef<
  HTMLDivElement,
  HvSnackbarContentProps
>(function HvSnackbarContent(props, ref) {
  const {
    className,
    id,
    classes: classesProp,
    label,
    variant = "default",
    showIcon,
    customIcon,
    action,
    onAction,
    onClose,
    ...others
  } = useDefaultProps("HvSnackbarContent", props);
  const { classes, cx } = useClasses(classesProp);

  return (
    <HvCallout
      ref={ref}
      id={id}
      variant={variant}
      classes={{
        root: cx(classes.root, classes[variant], className),
        message: classes.message,
        messageIcon: classes.iconVariant,
        messageContent: classes.messageText,
        action: classes.action,
      }}
      showIcon={showIcon}
      customIcon={customIcon}
      actions={isActionGeneric(action) ? [action] : action}
      onClose={onClose}
      onAction={onAction}
      {...others}
    >
      {label}
    </HvCallout>
  );
});
