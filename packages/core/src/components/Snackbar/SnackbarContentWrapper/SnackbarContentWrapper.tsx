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
import {
  snackbarContentWrapperClasses,
  HvSnackbarContentWrapperClasses,
} from ".";
import { HvActionsGeneric, HvActionGeneric } from "components";

export type HvSnackbarContentWrapperProps = Omit<
  MuiSnackbarContentProps,
  "variant" | "action"
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
      event: Event,
      id: string,
      action: HvActionGeneric
    ) => void;
    /** A Jss Object used to override or extend the styles applied to the empty state component. */
    classes?: HvSnackbarContentWrapperClasses;
  };

const HvSnackbarContentWrapper = forwardRef<
  HTMLDivElement,
  HvSnackbarContentWrapperProps
>(
  (
    {
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
      customIcon || (showIcon && iconVariant(variant, "base2", undefined));
    const innerAction: any = isValidElement(action) ? action : [action];

    return (
      <StyledSnackbarContent
        ref={ref}
        id={id}
        classes={{
          root: clsx(snackbarContentWrapperClasses.root, classes?.root),
          message: clsx(
            snackbarContentWrapperClasses.message,
            classes?.message
          ),
        }}
        message={
          <StyledMessageSpan
            id={setId(id, "message")}
            className={clsx(
              snackbarContentWrapperClasses.messageSpan,
              classes?.messageSpan
            )}
          >
            {icon && (
              <div
                className={clsx(
                  snackbarContentWrapperClasses.iconVariant,
                  classes?.iconVariant
                )}
              >
                {icon}
              </div>
            )}
            <StyledMessageText
              className={clsx(
                snackbarContentWrapperClasses.messageText,
                classes?.messageText
              )}
            >
              {label}
            </StyledMessageText>
            {action && (
              <StyledAction
                id={setId(id, "action")}
                className={clsx(
                  snackbarContentWrapperClasses.action,
                  classes?.action
                )}
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

export default HvSnackbarContentWrapper;
