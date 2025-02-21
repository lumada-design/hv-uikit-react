import { forwardRef, isValidElement } from "react";
import { type SnackbarProps as MuiSnackbarProps } from "@mui/material/Snackbar";
import SnackbarContent, {
  type SnackbarContentProps as MuiSnackbarContentProps,
} from "@mui/material/SnackbarContent";
import {
  useDefaultProps,
  useTheme,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import {
  HvActionGeneric,
  HvActionsGeneric,
  HvActionsGenericProps,
} from "../../ActionsGeneric";
import { HvButtonVariant } from "../../Button";
import { iconVariant } from "../../utils/iconVariant";
import { setId } from "../../utils/setId";
import { HvSnackbarVariant } from "../types";
import { staticClasses, useClasses } from "./SnackbarContent.styles";

export { staticClasses as snackbarContentClasses };

export type HvSnackbarContentClasses = ExtractNames<typeof useClasses>;

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
  /**
   * The callback function called when an action is triggered, receiving `action` as parameter.
   *
   * @deprecated Use `onAction` instead.
   * */
  actionCallback?: HvActionsGenericProps["actionsCallback"];
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
    actionCallback, // TODO - remove in v6
    onAction,
    onClose,
    ...others
  } = useDefaultProps("HvSnackbarContent", props);

  const icon = customIcon || (showIcon && iconVariant(variant, "inherit"));
  const innerAction: any = isValidElement(action) ? action : [action];

  const { classes, cx } = useClasses(classesProp);
  const { activeTheme } = useTheme();

  return (
    <SnackbarContent
      ref={ref}
      id={id}
      classes={{
        root: cx(classes.root, classes[variant], className),
        message: cx(classes.message, classes.messageSpan),
        action: classes.action,
      }}
      message={
        <>
          {icon && <div className={classes.iconVariant}>{icon}</div>}
          <div id={setId(id, "message")} className={classes.messageText}>
            {label}
          </div>
        </>
      }
      action={
        action && (
          <HvActionsGeneric
            id={id}
            variant={
              activeTheme?.snackbar.actionButtonVariant as HvButtonVariant
            }
            actions={innerAction}
            actionsCallback={actionCallback}
            onAction={onAction}
          />
        )
      }
      {...others}
    />
  );
});
