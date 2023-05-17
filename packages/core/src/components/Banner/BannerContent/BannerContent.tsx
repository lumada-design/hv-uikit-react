import { forwardRef } from "react";
import SnackbarContent, {
  SnackbarContentProps as MuiSnackbarContentProps,
} from "@mui/material/SnackbarContent";
import { HvBaseProps } from "@core/types";
import { iconVariant } from "@core/utils";
import {
  HvActionGeneric,
  HvBannerActionPosition,
  HvBannerVariant,
} from "@core/components";
import bannerContentClasses, {
  HvBannerContentClasses,
} from "./bannerContentClasses";
import { HvActionContainer, HvActionContainerProps } from "./ActionContainer";
import { HvMessageContainer } from "./MessageContainer";
import { ClassNames } from "@emotion/react";
import { styles } from "./BannerContent.styles";

export interface HvBannerContentProps
  extends Omit<MuiSnackbarContentProps, "variant" | "classes" | "onClose">,
    HvBaseProps {
  /** The message to display. */
  content?: string;
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
}

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
      customIcon || (showIcon && iconVariant(variant, "base_dark", undefined));

    // default to inline
    // this might try to be more intelligent in the future,
    // taking into account the content length, available space,
    // number of actions, etc..
    const effectiveActionsPosition =
      actionsPosition === "auto" ? "inline" : actionsPosition;

    return (
      <ClassNames>
        {({ css, cx }) => (
          <div
            className={cx(
              bannerContentClasses.outContainer,
              css(styles.outContainer),
              classes?.outContainer
            )}
          >
            <SnackbarContent
              ref={ref}
              id={id}
              classes={{
                root: cx(
                  bannerContentClasses.root,
                  css(styles.root),
                  classes?.root
                ),
                message: cx(
                  bannerContentClasses.message,
                  css(styles.message),
                  classes?.message
                ),
                action: cx(
                  bannerContentClasses.action,
                  css(styles.action),
                  classes?.action
                ),
              }}
              className={cx(
                bannerContentClasses.baseVariant,
                bannerContentClasses[variant],
                css(styles.baseVariant),
                css(styles[variant]),
                classes?.baseVariant,
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
              {...others}
            />
          </div>
        )}
      </ClassNames>
    );
  }
);
