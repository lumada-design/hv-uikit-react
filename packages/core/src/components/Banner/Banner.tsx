import { useCallback } from "react";
import Slide from "@mui/material/Slide";
import Snackbar, {
  SnackbarProps as MuiSnackbarProps,
  SnackbarOrigin,
} from "@mui/material/Snackbar";
import capitalize from "lodash/capitalize";
import { HvActionGeneric } from "@core/components";
import { HvBaseProps } from "@core/types";
import { setId } from "@core/utils";
import { ClassNames } from "@emotion/react";
import { styles } from "./Banner.styles";
import bannerClasses, { HvBannerClasses } from "./bannerClasses";
import {
  HvBannerContent,
  HvBannerContentProps,
} from "./BannerContent/BannerContent";

export type HvBannerVariant = "success" | "warning" | "error" | "default";

export type HvBannerActionPosition = "auto" | "inline" | "bottom-right";

export interface HvBannerProps
  extends Omit<MuiSnackbarProps, "anchorOrigin" | "classes" | "onClose">,
    HvBaseProps<HTMLDivElement, "children"> {
  /** If true, the snackbar is open. */
  open: boolean;
  /** Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop. The reason parameter can optionally be used to control the response to onClose, for example ignoring clickaway. */
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
  actions?: React.ReactNode | HvActionGeneric[];
  /** The callback function ran when an action is triggered, receiving `action` as param */
  actionsCallback?: (
    event: React.SyntheticEvent,
    id: string,
    action: HvActionGeneric
  ) => void;
  /** The position property of the header. */
  actionsPosition?: HvBannerActionPosition;
  /** How much the transition animation last in milliseconds, if 0 no animation is played. */
  transitionDuration?: number;
  /** Direction of slide transition. */
  transitionDirection?: "up" | "down" | "left" | "right";
  /** Offset from top/bottom of the page, in px. Defaults to 60px. */
  offset?: number;
  /** Props to pass down to the Banner Wrapper. An object `actionProps` can be included to be passed as others to actions. */
  bannerContentProps?: HvBannerContentProps;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvBannerClasses;
}

/**
 * A Banner displays an important and succinct message. It can also provide actions for the user to address, or dismiss.
 * It requires a user action, for it to be dismissed. Banners should appear at the top of the screen, below a top app bar.
 */
export const HvBanner = ({
  id,
  classes,
  className,
  open,
  onClose,
  anchorOrigin = "top",
  variant = "default",
  transitionDuration = 300,
  transitionDirection = "down",
  showIcon = false,
  customIcon,
  actions,
  actionsCallback,
  actionsPosition = "auto",
  label,
  offset = 60,
  bannerContentProps,
  ...others
}: HvBannerProps) => {
  const anchorOriginOffset = {
    anchorOriginTop: {
      top: `${offset || 0}px`,
    },
    anchorOriginBottom: {
      bottom: `${offset || 0}px`,
    },
  };

  const anchorOriginBanner: SnackbarOrigin = {
    horizontal: "center",
    vertical: anchorOrigin,
  };

  const SlideTransition = useCallback(
    (properties) => <Slide {...properties} direction={transitionDirection} />,
    [transitionDirection]
  );

  return (
    <ClassNames>
      {({ css, cx }) => (
        <Snackbar
          id={id}
          open={open}
          className={className}
          classes={{
            root: cx(
              open
                ? cx(bannerClasses.root, css(styles.root), classes?.root)
                : cx(
                    bannerClasses.rootClosed,
                    css(styles.rootClosed),
                    classes?.rootClosed
                  )
            ),
            anchorOriginTopCenter: cx(
              bannerClasses.anchorOriginTopCenter,
              css(styles.anchorOriginTopCenter),
              classes?.anchorOriginTopCenter
            ),
            anchorOriginBottomCenter: cx(
              bannerClasses.anchorOriginBottomCenter,
              css(styles.anchorOriginBottomCenter),
              classes?.anchorOriginBottomCenter
            ),
          }}
          style={anchorOriginOffset[`anchorOrigin${capitalize(anchorOrigin)}`]}
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
            actionsPosition={actionsPosition}
            onClose={onClose}
            {...bannerContentProps}
          />
        </Snackbar>
      )}
    </ClassNames>
  );
};
