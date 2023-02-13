import clsx from "clsx";
import { SnackbarContentProps as MuiSnackbarContentProps } from "@mui/material/SnackbarContent";
import { HvBaseProps } from "../../../types";
import {
  bannerContentClasses,
  HvBannerContentClasses,
  HvMessageContainer,
  HvActionContainer,
} from ".";
import { StyledRoot, StyledSnackbarContent } from "./BannerContent.styles";
import {
  HvAction,
  HvBannerAction,
  HvBannerActionPosition,
  HvBannerVariant,
  HvListValue,
} from "components";
import { forwardRef } from "react";
import { iconVariant } from "utils";

export type HvBannerContentProps = Omit<MuiSnackbarContentProps, "variant"> &
  HvBaseProps & {
    /** The message to display. */
    content?: React.ReactNode;
    /** Variant of the snackbar. */
    variant?: HvBannerVariant;
    /** Controls if the associated icon to the variant should be shown. */
    showIcon?: boolean;
    /** Custom icon to replace the variant default. */
    customIcon?: React.ReactNode;
    /** onClose function. */
    onClose?: Function;
    /** Actions to display on the right side. */
    actions?: React.ReactNode | HvBannerAction[];
    /**  The callback function ran when an action is triggered, receiving `action` as param */
    actionsCallback?: (
      event:
        | React.ChangeEvent<HTMLLIElement>
        | React.MouseEvent<HTMLButtonElement>,
      id: string,
      action: HvAction | HvListValue
    ) => void;
    /** The position property of the header. */
    actionsPosition?: HvBannerActionPosition;
    /** The props to pass down to the Action Container. */
    actionProps?: object;
    /** A Jss Object used to override or extend the styles applied to the empty state component. */
    classes?: HvBannerContentClasses;
  };

export const HvBannerContent = forwardRef<HTMLDivElement, HvBannerContentProps>(
  (
    {
      id,
      classes,
      showIcon = false,
      customIcon,
      variant = "default",
      onClose,
      actions,
      actionsCallback,
      actionsPosition = "auto",
      content,
      actionProps,
      ...others
    },
    ref
  ) => {
    const icon =
      customIcon || (showIcon && iconVariant(variant, "base2", undefined));

    // default to inline
    // this might try to be more intelligent in the future,
    // taking into account the content length, available space,
    // number of actions, etc..
    const effectiveActionsPosition =
      actionsPosition === "auto" ? "inline" : actionsPosition;

    return (
      <StyledRoot
        className={clsx(
          bannerContentClasses.outContainer,
          classes?.outContainer
        )}
      >
        <StyledSnackbarContent
          ref={ref}
          id={id}
          classes={{
            root: clsx(bannerContentClasses.root, classes?.root),
            message: clsx(bannerContentClasses.message, classes?.message),
            action: clsx(bannerContentClasses.action, classes?.action),
          }}
          className={clsx(
            bannerContentClasses.baseVariant,
            classes?.baseVariant
          )}
          message={
            <HvMessageContainer
              id={id}
              icon={icon}
              {...(effectiveActionsPosition === "inline" && {
                actionsOnMessage: actions,
                actionsOnMessageCallback: actionsCallback,
              })}
              message={content}
            />
          }
          action={
            <HvActionContainer
              id={id}
              onClose={onClose}
              {...(effectiveActionsPosition === "bottom-right" && {
                action: actions,
                actionCallback: actionsCallback,
              })}
              {...actionProps}
            />
          }
          $variant={variant as HvBannerVariant}
          {...others}
        />
      </StyledRoot>
    );
  }
);
