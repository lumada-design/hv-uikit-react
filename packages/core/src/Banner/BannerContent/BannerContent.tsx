import { forwardRef } from "react";

import SnackbarContent, {
  SnackbarContentProps as MuiSnackbarContentProps,
} from "@mui/material/SnackbarContent";

import { iconVariant } from "../../utils/iconVariant";
import { ExtractNames } from "../../utils/classes";
import { HvActionGeneric } from "../../ActionsGeneric";

import { HvBannerActionPosition, HvBannerVariant } from "../types";
import { HvActionContainer, HvActionContainerProps } from "./ActionContainer";
import { HvMessageContainer } from "./MessageContainer";
import { useClasses, staticClasses } from "./BannerContent.styles";

export { staticClasses as bannerContentClasses };

export type HvBannerContentClasses = ExtractNames<typeof useClasses>;

export interface HvBannerContentProps
  extends Omit<MuiSnackbarContentProps, "variant" | "classes" | "onClose"> {
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
  (props, ref) => {
    const {
      id,
      classes: classesProp,
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
    } = props;
    const { classes, cx } = useClasses(classesProp);
    const icon = customIcon || (showIcon && iconVariant(variant, "base_dark"));

    // default to inline
    // this might try to be more intelligent in the future,
    // taking into account the content length, available space,
    // number of actions, etc..
    const effectiveActionsPosition =
      actionsPosition === "auto" ? "inline" : actionsPosition;

    return (
      <div className={classes.outContainer}>
        <SnackbarContent
          ref={ref}
          id={id}
          classes={{
            root: classes.root,
            message: classes.message,
            action: classes.action,
          }}
          className={cx(classes?.baseVariant, classes?.[variant])}
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
    );
  }
);
