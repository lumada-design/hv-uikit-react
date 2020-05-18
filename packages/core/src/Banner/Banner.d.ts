import * as React from "react";
import { StandardProps, SnackbarProps, SnackbarContentProps } from "@material-ui/core";
import { HvActionsCommonProps } from "../Actions";

export type TransitionDirectionProp = "up" | "down" | "left" | "right";

export type ActionsPositionProp = "auto" | "inline" | "bottom-right";

export type SemanticVariantTypes = "success" | "warning" | "error" | "info" | "default";

/**
 * Interface shared between HvBanner and HvSnackbar
 */
export interface NotificationsCommonProps {
  /**
   * The message to display.
   */
  label?: string;
  /**
   * Variant of the snackbar.
   */
  variant?: SemanticVariantTypes;
  /**
   * Custom icon to replace the variant default.
   */
  customIcon?: React.ReactNode;
  /**
   * Controls if the associated icon to the variant should be shown.
   */
  showIcon?: boolean;
  /**
   * Direction of slide transition.
   */
  transitionDirection?: TransitionDirectionProp;
  /**
   * Offset from top/bottom of the page, in px. Defaults to 60px.
   */
  offset?: number;
}

export interface HvBannerProps
  extends StandardProps<SnackbarProps, HvBannerClassKey>,
    HvActionsCommonProps,
    HvBannerCommonProps {
  /**
   * The position property of the header.
   */
  actionsPosition?: ActionsPositionProp;
  /**
   * Props to pass down to the Banner Wrapper.
   */
  bannerContentProps?: SnackbarContentProps;
}

export type HvBannerClassKey =
  | "root"
  | "rootClosed"
  | "anchorOriginTopCenter"
  | "anchorOriginBottomCenter";

export default function HvBanner(props: HvBannerProps): JSX.Element | null;
