import { forwardRef, isValidElement } from "react";

import SnackbarContent, {
  SnackbarContentProps as MuiSnackbarContentProps,
} from "@mui/material/SnackbarContent";

import { ExtractNames } from "@core/utils/classes";
import { setId } from "@core/utils/setId";
import { iconVariant } from "@core/utils/iconVariant";
import { HvBaseProps } from "@core/types/generic";
import {
  HvActionsGeneric,
  HvActionGeneric,
} from "@core/components/ActionsGeneric";
import { HvButtonVariant } from "@core/components/Button";
import { useTheme } from "@core/hooks/useTheme";

import { useDefaultProps } from "@core/hooks";

import { staticClasses, useClasses } from "./SnackbarContent.styles";
import { HvSnackbarVariant } from "../types";

export { staticClasses as snackbarContentClasses };

export type HvSnackbarContentClasses = ExtractNames<typeof useClasses>;

export interface HvSnackbarContentProps
  extends Omit<MuiSnackbarContentProps, "variant" | "action" | "classes">,
    HvBaseProps {
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
  /** The callback function ran when an action is triggered, receiving `action` as param */
  actionCallback?: (
    event: React.SyntheticEvent,
    id: string,
    action: HvActionGeneric
  ) => void;
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
    actionCallback,
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
                category={
                  activeTheme?.snackbar.actionButtonVariant as HvButtonVariant
                }
                actions={innerAction}
                actionsCallback={actionCallback}
              />
            </div>
          )}
        </div>
      }
      {...others}
    />
  );
});
