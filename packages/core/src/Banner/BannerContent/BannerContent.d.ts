import * as React from "react";
import { StandardProps, SnackbarContentProps } from "@material-ui/core";
import {
  ActionsPositionProp,
  HvActionsGenericCommonProps,
  HvButtonProps,
  NotificationsCommonProps,
  SemanticVariantTypes,
} from "../..";

export type HvBannerContentClassKey =
  | "root"
  | "message"
  | "action"
  | "baseVariant"
  | "outContainer"
  | SemanticVariantTypes;

export interface HvBannerContentProps
  extends StandardProps<SnackbarContentProps, HvBannerContentClassKey>,
    HvActionsGenericCommonProps,
    Pick<NotificationsCommonProps, "showIcon" | "customIcon"> {
  /**
   * The position property of the header.
   */
  actionsPosition?: ActionsPositionProp;
  /**
   * The message to display.
   */
  content?: React.ReactNode;
  /**
   * onClose function.
   */
  onClose?: HvButtonProps["onClick"];
  /**
   * The props to pass down to the Action Container.
   */
  actionProps?: Record<string, unknown>;
}

export default function HvBannerContent(props: HvBannerContentProps): JSX.Element | null;
