import { forwardRef, isValidElement } from "react";
import SnackbarContent, {
  SnackbarContentProps as MuiSnackbarContentProps,
} from "@mui/material/SnackbarContent";

import {
  HvActionGeneric,
  HvActionsGeneric,
  HvActionsGenericProps,
} from "../../ActionsGeneric";
import { HvButtonVariant } from "../../Button";
import { useDefaultProps } from "../../hooks/useDefaultProps";
import { useTheme } from "../../hooks/useTheme";
import { ExtractNames } from "../../utils/classes";
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
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvSnackbarContentClasses;
}

export const HvSnackbarContent = forwardRef<
  HTMLDivElement,
  HvSnackbarContentProps
>((props: HvSnackbarContentProps, ref) => {
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
    ...others
  } = useDefaultProps("HvSnackbarContent", props);

  const icon = customIcon || (showIcon && iconVariant(variant, "base_dark"));
  const innerAction: any = isValidElement(action) ? action : [action];

  const { classes, cx } = useClasses(classesProp);
  const { activeTheme } = useTheme();

  return (
    <SnackbarContent
      ref={ref}
      id={id}
      classes={{
        root: classes.root,
        message: classes.message,
      }}
      className={cx(classes?.[variant], className)}
      message={
        <div id={setId(id, "message")} className={classes.messageSpan}>
          {icon && <div className={classes.iconVariant}>{icon}</div>}
          <div className={classes.messageText}>{label}</div>
          {action && (
            <div id={setId(id, "action")} className={classes.action}>
              <HvActionsGeneric
                id={id}
                variant={
                  activeTheme?.snackbar.actionButtonVariant as HvButtonVariant
                }
                actions={innerAction}
                actionsCallback={actionCallback}
                onAction={onAction}
              />
            </div>
          )}
        </div>
      }
      {...others}
    />
  );
});
