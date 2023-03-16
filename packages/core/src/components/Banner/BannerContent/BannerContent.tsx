import clsx from "clsx";
import { SnackbarContentProps as MuiSnackbarContentProps } from "@mui/material/SnackbarContent";
import { HvBaseProps } from "../../../types";
import bannerContentClasses, {
  HvBannerContentClasses,
} from "./bannerContentClasses";
import { HvActionContainer } from "./ActionContainer";
import { HvMessageContainer } from "./MessageContainer";
import { StyledRoot, StyledSnackbarContent } from "./BannerContent.styles";
import {
  HvActionGeneric,
  HvBannerActionPosition,
  HvBannerVariant,
} from "components";
import { forwardRef } from "react";
import { iconVariant } from "../../../utils";
import { HvActionContainerProps } from "./ActionContainer/ActionContainer";

export type HvBannerContentProps = Omit<
  MuiSnackbarContentProps,
  "variant" | "classes" | "onClose"
> &
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
    onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Actions to display on the right side. */
    actions?: React.ReactNode | HvActionGeneric[];
    /**  The callback function ran when an action is triggered, receiving `action` as param */
    actionsCallback?: (
      event: React.SyntheticEvent,
      id: string,
      action: HvActionGeneric
    ) => void;
    /** The position property of the header. */
    actionsPosition?: HvBannerActionPosition;
    /** The props to pass down to the Action Container. */
    actionProps?: HvActionContainerProps;
    /** A Jss Object used to override or extend the styles applied to the component. */
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
            classes?.baseVariant,
            bannerContentClasses[variant],
            classes?.[variant]
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
