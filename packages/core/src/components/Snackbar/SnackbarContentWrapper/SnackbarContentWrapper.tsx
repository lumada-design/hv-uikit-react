import clsx from "clsx";
import { SnackbarContentProps as MuiSnackbarContentProps } from "@mui/material/SnackbarContent";
import { iconVariant, setId } from "utils";
import { forwardRef, isValidElement } from "react";
import { HvBaseProps } from "../../../types";
import { HvSnackbarVariant } from "../Snackbar";
import {
  StyledMessageSpan,
  StyledSnackbarContent,
  StyledMessageText,
  StyledAction,
} from "./SnackbarContentWrapper.styles";
import snackbarContentClasses, {
  HvSnackbarContentClasses,
} from "./snackbarContentWrapperClasses";
import { HvActionsGeneric, HvActionGeneric } from "components";

export type HvSnackbarContentProps = Omit<
  MuiSnackbarContentProps,
  "variant" | "action" | "classes"
> &
  HvBaseProps & {
    /** The message to display. */
    label?: React.ReactNode;
    /** Variant of the snackbar. */
    variant: HvSnackbarVariant;
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
  };

const HvSnackbarContent = forwardRef<HTMLDivElement, HvSnackbarContentProps>(
  (
    {
      className,
      id,
      classes,
      label,
      variant,
      showIcon,
      customIcon,
      action,
      actionCallback,
      ...others
    },
    ref
  ) => {
    const icon =
      customIcon || (showIcon && iconVariant(variant, "base_dark", undefined));
    const innerAction: any = isValidElement(action) ? action : [action];

    return (
      <StyledSnackbarContent
        ref={ref}
        id={id}
        classes={{
          root: clsx(snackbarContentClasses.root, classes?.root),
          message: clsx(snackbarContentClasses.message, classes?.message),
        }}
        className={clsx(
          className,
          classes?.[variant],
          snackbarContentClasses[variant]
        )}
        message={
          <StyledMessageSpan
            id={setId(id, "message")}
            className={clsx(
              snackbarContentClasses.messageSpan,
              classes?.messageSpan
            )}
          >
            {icon && (
              <div
                className={clsx(
                  snackbarContentClasses.iconVariant,
                  classes?.iconVariant
                )}
              >
                {icon}
              </div>
            )}
            <StyledMessageText
              className={clsx(
                snackbarContentClasses.messageText,
                classes?.messageText
              )}
            >
              {label}
            </StyledMessageText>
            {action && (
              <StyledAction
                id={setId(id, "action")}
                className={clsx(snackbarContentClasses.action, classes?.action)}
              >
                <HvActionsGeneric
                  id={id}
                  category="secondaryGhost"
                  actions={innerAction}
                  actionsCallback={actionCallback}
                />
              </StyledAction>
            )}
          </StyledMessageSpan>
        }
        $variant={variant}
        {...others}
      />
    );
  }
);

export default HvSnackbarContent;
