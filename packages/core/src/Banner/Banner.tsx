import { forwardRef, useCallback } from "react";
import {
  SnackbarProps as MuiSnackbarProps,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarOrigin,
} from "@mui/material";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvActionsGenericProps } from "../ActionsGeneric";
import { setId } from "../utils/setId";
import { staticClasses, useClasses } from "./Banner.styles";
import {
  HvBannerContent,
  HvBannerContentProps,
} from "./BannerContent/BannerContent";
import { HvBannerActionPosition, HvBannerVariant } from "./types";

export { staticClasses as bannerClasses };

export type HvBannerClasses = ExtractNames<typeof useClasses>;

export interface HvBannerProps
  extends Omit<MuiSnackbarProps, "anchorOrigin" | "classes" | "onClose"> {
  /** If true, the snackbar is open. */
  open: boolean;
  /**
   * Callback fired when the component requests to be closed.
   * Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop.
   * The reason parameter can optionally be used to control the response to onClose, for example ignoring click away.
   * */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** The message to display. */
  label?: string;
  /** The anchor of the Snackbar. */
  anchorOrigin?: "top" | "bottom";
  /** Variant of the snackbar. */
  variant?: HvBannerVariant;
  /** Custom icon to replace the variant default. */
  customIcon?: React.ReactNode;
  /** Controls if the associated icon to the variant should be shown. */
  showIcon?: boolean;
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
  /** How much the transition animation last in milliseconds, if 0 no animation is played. */
  transitionDuration?: number;
  /** Direction of slide transition. */
  transitionDirection?: "up" | "down" | "left" | "right";
  /** The container the banner should slide from. */
  container?: SlideProps["container"];
  /** Offset from top/bottom of the page, in px. Defaults to 60px. */
  offset?: number;
  /** Props to pass down to the banner Wrapper. An object `actionProps` can be included to be passed as others to actions. */
  bannerContentProps?: HvBannerContentProps;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvBannerClasses;
  /** @ignore */
  ref?: MuiSnackbarProps["ref"];
}

/**
 * A Banner displays an important and succinct message. It can also provide actions for the user to address, or dismiss.
 * It requires a user action, for it to be dismissed. Banners should appear at the top of the screen, below a top app bar.
 */
export const HvBanner = forwardRef<
  React.ComponentRef<typeof Snackbar>,
  HvBannerProps
>(function HvBanner(props, ref) {
  const {
    id,
    classes: classesProp,
    className,
    open,
    onClose,
    anchorOrigin = "top",
    variant = "default",
    transitionDuration = 300,
    transitionDirection = "down",
    container,
    showIcon = false,
    customIcon,
    actions,
    actionsCallback, // TODO - remove in v6
    onAction,
    actionsPosition = "auto",
    label,
    offset = 60,
    bannerContentProps,
    ...others
  } = useDefaultProps("HvBanner", props);
  const { classes, cx } = useClasses(classesProp);

  const anchorOriginBanner: SnackbarOrigin = {
    horizontal: "center",
    vertical: anchorOrigin,
  };

  const SlideTransition = useCallback<
    NonNullable<MuiSnackbarProps["TransitionComponent"]>
  >(
    (properties) => (
      <Slide
        {...properties}
        container={container}
        direction={transitionDirection}
      />
    ),
    [container, transitionDirection],
  );

  return (
    <Snackbar
      ref={ref}
      id={id}
      open={open}
      className={className}
      classes={{
        root: cx(classes.root, { [classes.rootClosed]: !open }),
        anchorOriginTopCenter: classes.anchorOriginTopCenter,
        anchorOriginBottomCenter: classes.anchorOriginBottomCenter,
      }}
      style={{ [anchorOrigin]: offset }}
      anchorOrigin={anchorOriginBanner}
      TransitionComponent={SlideTransition}
      transitionDuration={transitionDuration}
      {...others}
    >
      <HvBannerContent
        id={setId(id, "content")}
        content={label}
        variant={variant}
        customIcon={customIcon}
        showIcon={showIcon}
        actions={actions}
        actionsCallback={actionsCallback}
        onAction={onAction}
        actionsPosition={actionsPosition}
        onClose={onClose}
        {...bannerContentProps}
      />
    </Snackbar>
  );
});
