import { forwardRef } from "react";
import SnackbarContent, {
  SnackbarContentProps as MuiSnackbarContentProps,
} from "@mui/material/SnackbarContent";
import { Close } from "@hitachivantara/uikit-react-icons";
import { type ExtractNames } from "@hitachivantara/uikit-react-utils";

import { HvActionsGeneric, HvActionsGenericProps } from "../../ActionsGeneric";
import { HvButton, HvButtonProps } from "../../Button";
import { iconVariant } from "../../utils/iconVariant";
import { setId } from "../../utils/setId";
import { HvBannerActionPosition, HvBannerVariant } from "../types";
import { staticClasses, useClasses } from "./BannerContent.styles";

export { staticClasses as bannerContentClasses };

export type HvBannerContentClasses = ExtractNames<typeof useClasses>;

export interface HvBannerContentProps
  extends Omit<MuiSnackbarContentProps, "variant" | "classes" | "onClose"> {
  /** The message to display. @deprecated use `children` instead */
  content?: string;
  /** The message to display. */
  children?: React.ReactNode;
  /** Variant of the snackbar. */
  variant?: HvBannerVariant;
  /** Controls if the associated icon to the variant should be shown. */
  showIcon?: boolean;
  /** Custom icon to replace the variant default. */
  customIcon?: React.ReactNode;
  /** Function called when clicking on the close button. */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Actions to display on the right side. */
  actions?: HvActionsGenericProps["actions"];
  /**
   * The callback function called when an action is triggered, receiving `action` as parameter.
   *
   * @deprecated Use `onAction` instead.
   * */
  actionsCallback?: HvActionsGenericProps["actionsCallback"];
  /** The callback function called when an action is triggered, receiving `action` as parameter. */
  onAction?: HvActionsGenericProps["onAction"];
  /** The position property of the header. */
  actionsPosition?: HvBannerActionPosition;
  /** The props to pass down to the Action Container. */
  actionProps?: Partial<HvButtonProps>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvBannerContentClasses;
}

export const HvBannerContent = forwardRef<HTMLDivElement, HvBannerContentProps>(
  function HvBannerContent(props, ref) {
    const {
      id,
      classes: classesProp,
      className,
      showIcon = false,
      customIcon,
      variant = "default",
      onClose,
      actions,
      actionsCallback, // TODO - remove in v6
      onAction,
      actionsPosition = "auto",
      content,
      children,
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

    const handleAction: HvBannerContentProps["onAction"] = (evt, action) => {
      onAction?.(evt, action);
      actionsCallback?.(evt, id!, action);
    };

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
          className={cx(classes.baseVariant, classes[variant], className)}
          message={
            <>
              {icon && <div className={classes.iconContainer}>{icon}</div>}
              <div
                id={setId(id, "message-text")}
                className={classes.messageContainer}
              >
                {children ?? content}
              </div>
              {actions && effectiveActionsPosition === "inline" && (
                <div
                  id={setId(id, "message-actions")}
                  className={classes.messageActions}
                >
                  <HvActionsGeneric
                    id={id}
                    variant="semantic"
                    actions={actions}
                    onAction={handleAction}
                  />
                </div>
              )}
            </>
          }
          action={
            <div className={classes.actionContainer}>
              <HvButton
                icon
                className={classes.closeAction}
                variant="semantic"
                aria-label="Close"
                onClick={onClose}
                {...actionProps}
              >
                <Close size="XS" />
              </HvButton>
              {actions && effectiveActionsPosition === "bottom-right" && (
                <div className={classes.actionsInnerContainer}>
                  <HvActionsGeneric
                    id={id}
                    variant="semantic"
                    actions={actions}
                    onAction={handleAction}
                  />
                </div>
              )}
            </div>
          }
          {...others}
        />
      </div>
    );
  },
);
