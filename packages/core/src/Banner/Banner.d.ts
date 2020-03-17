import * as React from "react";
import { StandardProps, SnackbarProps } from "@material-ui/core";
import { Action } from "../Actions";

export type TransitionDirectionProp = "up" | "down" | "left" | "right";

export type ActionsPositionProp = "auto" | "inline" | "bottom-right";

export type SemanticVariantTypes = "success" | "warning" | "error" | "info" | "default";

export interface HvBannerProps extends StandardProps<SnackbarProps, HvBannerClassKey> {
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
   * Actions to display on the right side.
   */
  actions?: React.ReactNode | Action[];
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionsCallback?: (id: string, action: Action) => void;

  /**
   * The position property of the header.
   */
  actionsPosition?: ActionsPositionProp;
  /**
   * How much the transition animation last in milliseconds, if 0 no animation is played.
   */
  transitionDuration?: number;
  /**
   * Direction of slide transition.
   */
  transitionDirection?: TransitionDirectionProp;
  /**
   * Offset from top/bottom of the page, in px. Defaults to 60px.
   */
  offset?: number;
}

export type HvBannerClassKey =
  | "root"
  | "rootClosed"
  | "anchorOriginTopCenter"
  | "anchorOriginBottomCenter";

export default function HvBanner(props: HvBannerProps): JSX.Element | null;
