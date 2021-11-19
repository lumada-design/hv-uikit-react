import React, { useCallback } from "react";
import PropTypes, { oneOfType } from "prop-types";
import { Slide, Snackbar, withStyles } from "@material-ui/core";
import capitalize from "lodash/capitalize";
import { setId } from "../utils";
import HvBannerContentWrapper from "./BannerWrapper";
import styles from "./styles";

/**
 * A Banner displays an important and succinct message. It can also provide actions for the user to address, or dismiss.
 * It requires a user action, for it to be dismissed. Banners should appear at the top of the screen, below a top app bar.
 */
const HvBanner = (props) => {
  const {
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
  } = props;

  const anchorOriginOffset = {
    anchorOriginTop: {
      top: `${offset || 0}px`,
    },
    anchorOriginBottom: {
      bottom: `${offset || 0}px`,
    },
  };

  const anchorOriginBanner = { horizontal: "center", vertical: anchorOrigin };

  const SlideTransition = useCallback(
    (properties) => <Slide {...properties} direction={transitionDirection} />,
    [transitionDirection]
  );

  return (
    <Snackbar
      style={anchorOriginOffset[`anchorOrigin${capitalize(anchorOrigin)}`]}
      className={className}
      id={id}
      classes={{
        root: open ? classes.root : classes.rootClosed,
        anchorOriginTopCenter: classes.anchorOriginTopCenter,
        anchorOriginBottomCenter: classes.anchorOriginBottomCenter,
      }}
      anchorOrigin={anchorOriginBanner}
      TransitionComponent={SlideTransition}
      open={open}
      transitionDuration={transitionDuration}
      {...others}
    >
      <HvBannerContentWrapper
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
  );
};

HvBanner.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component root class when the component is closed.
     */
    rootClosed: PropTypes.string,
    /**
     * Styles applied to the component when define as top.
     */
    anchorOriginTopCenter: PropTypes.string,
    /**
     * Styles applied to the component when define as bottom.
     */
    anchorOriginBottomCenter: PropTypes.string,
  }).isRequired,
  /**
   *  If true, Snackbar is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop. The reason parameter can optionally be used to control the response to onClose, for example ignoring clickaway.
   */
  onClose: PropTypes.func,
  /**
   * The message to display.
   */
  label: PropTypes.node,
  /**
   *  The anchor of the Snackbar.
   */
  anchorOrigin: PropTypes.oneOf(["top", "bottom"]),
  /**
   * Variant of the snackbar.
   */
  variant: PropTypes.oneOf(["success", "warning", "error", "info", "default"]),
  /**
   * Custom icon to replace the variant default.
   */
  customIcon: PropTypes.node,
  /**
   * Controls if the associated icon to the variant should be shown.
   */
  showIcon: PropTypes.bool,
  /**
   * Actions to display on the right side.
   */
  actions: oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.func,
        disabled: PropTypes.bool,
      })
    ),
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving `action` as param
   */
  actionsCallback: PropTypes.func,
  /**
   * The position property of the header.
   */
  actionsPosition: PropTypes.PropTypes.oneOf(["auto", "inline", "bottom-right"]),
  /**
   * How much the transition animation last in milliseconds, if 0 no animation is played.
   */
  transitionDuration: PropTypes.number,
  /**
   * Direction of slide transition.
   */
  transitionDirection: PropTypes.oneOf(["up", "down", "left", "right"]),
  /**
   * Offset from top/bottom of the page, in px. Defaults to 60px.
   */
  offset: PropTypes.number,
  /**
   * Props to pass down to the Banner Wrapper. An object `actionProps` can be included to be passed as others to actions.
   */
  bannerContentProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvBanner" })(HvBanner);
