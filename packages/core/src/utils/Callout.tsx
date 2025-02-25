import { forwardRef } from "react";
import type { SnackbarProps as MuiSnackbarProps } from "@mui/material/Snackbar";
import SnackbarContent, {
  type SnackbarContentProps as MuiSnackbarContentProps,
} from "@mui/material/SnackbarContent";
import { Close } from "@hitachivantara/uikit-react-icons";
import {
  createClasses,
  useDefaultProps,
  useTheme,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { HvActionsGeneric, HvActionsGenericProps } from "../ActionsGeneric";
import { HvButton, HvButtonProps } from "../Button";
import { iconVariant } from "./iconVariant";

export const { useClasses, staticClasses } = createClasses("HvCallout", {
  root: {
    position: "relative",
    boxShadow: "none",
    flexWrap: "nowrap",
    padding: 0,
  },
  success: {
    backgroundColor: theme.colors.positiveDimmed,
  },
  warning: {
    backgroundColor: theme.colors.warningDimmed,
  },
  error: {
    backgroundColor: theme.colors.negativeDimmed,
  },
  default: {
    backgroundColor: theme.colors.infoDimmed,
  },
  message: {
    display: "flex",
    alignItems: "center",
    padding: 0,
    color: theme.colors.textDark,
  },
  messageContent: {
    textWrap: "balance",
    overflow: "hidden",
    wordBreak: "break-word",
  },
  messageIcon: {
    "& svg .color0": {
      fill: "inherit",
    },
  },
  action: {
    marginRight: 0,
  },
  actionContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    gap: theme.space.xs,
  },
  actionCustom: {
    flex: "0 0 auto",
  },
  actionClose: {
    alignSelf: "flex-end",
  },
});

export type HvCalloutVariant = "success" | "warning" | "error" | "default";

export type HvCalloutActionPosition = "auto" | "inline" | "bottom-right";

export type HvCalloutClasses = ExtractNames<typeof useClasses>;

export interface HvCalloutProps
  extends Omit<MuiSnackbarContentProps, "variant" | "classes" | "onClose"> {
  /** The message to display. */
  children?: React.ReactNode;
  /** Variant of the snackbar. */
  variant?: HvCalloutVariant;
  /** Controls if the associated icon to the variant should be shown. */
  showIcon?: boolean;
  /** Controls whether to show the close icon */
  showClose?: boolean;
  /** Custom icon to replace the variant default. */
  customIcon?: React.ReactNode;
  /** @inheritdoc */
  onClose?: MuiSnackbarProps["onClose"];
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
  actionsPosition?: HvCalloutActionPosition;
  /** The props to pass down to the Action Container. */
  actionProps?: Partial<HvButtonProps>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvCalloutClasses;
}

/**
 * `HvCallout` is the internal content handler for the snackbars and banners. Might be promoted to a component.
 * @private @internal
 */
export const HvCallout = forwardRef<
  // no-indent
  HTMLDivElement,
  HvCalloutProps
>(function HvCallout(props, ref) {
  const {
    id,
    classes: classesProp,
    className,
    showClose,
    showIcon,
    customIcon,
    variant = "default",
    onClose,
    actions,
    onAction,
    actionsPosition: actionsPositionProp = "auto",
    children,
    actionProps,
    ...others
  } = useDefaultProps("HvCallout", props);
  const { classes, cx } = useClasses(classesProp, false);
  const { activeTheme } = useTheme();
  const icon = customIcon || (showIcon && iconVariant(variant, "inherit"));

  // TODO: consider making this flex-flow only, so it adapts according to the
  // content length, available space, number of actions, etc.
  const actionsPosition =
    actionsPositionProp === "auto" ? "inline" : actionsPositionProp;

  const actionsContent = (
    <HvActionsGeneric
      id={id}
      className={classes.actionCustom}
      variant={
        showClose
          ? "semantic"
          : (activeTheme?.snackbar.actionButtonVariant as any)
      }
      actions={actions}
      onAction={onAction}
    />
  );

  const showCustomActions = actions && actionsPosition === "bottom-right";

  return (
    <SnackbarContent
      ref={ref}
      id={id}
      classes={{
        root: cx(classes.root, classes[variant], className),
        message: classes.message,
        action: classes.action,
      }}
      message={
        <>
          {icon && <div className={classes.messageIcon}>{icon}</div>}
          <div className={classes.messageContent}>{children}</div>
          {actions && actionsPosition === "inline" && actionsContent}
        </>
      }
      action={
        (showClose || showCustomActions) && (
          <div className={classes.actionContent}>
            {showClose && (
              <HvButton
                icon
                className={classes.actionClose}
                variant="semantic"
                aria-label="Close"
                onClick={(evt) => onClose?.(evt, "clickaway")}
                {...actionProps}
              >
                <Close size="XS" />
              </HvButton>
            )}
            {showCustomActions && actionsContent}
          </div>
        )
      }
      {...others}
    />
  );
});
