import React, { useState } from "react";
import PropTypes, { oneOfType } from "prop-types";
import { Slide, Snackbar, withStyles } from "@material-ui/core";
import uniqueId from "lodash/uniqueId";
import capitalize from "lodash/capitalize";
import HvBannerContentWrapper from "./BannerWrapper";
import styles from "./styles";

/**
 * Banner component. This component has as base the snackbar, as the functionalities are identical. The main logic is
 * set in the HvBannerContentWrapper.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const HvBanner = props => {
  const {
    classes,
    className,
    id,
    open,
    onClose,
    anchorOrigin,
    variant,
    transitionDuration,
    transitionDirection,
    showIcon,
    customIcon,
    actions,
    actionsCallback,
    actionsPosition,
    label,
    offset
  } = props;

  const anchorOriginOffset = offset && {
    anchorOriginTop: {
      top: `${offset}px`
    },
    anchorOriginBottom: {
      bottom: `${offset}px`
    }
  };

  const [bannerId] = useState(id || uniqueId("hv-banner-"));
  const anchorOriginBanner = { horizontal: "center", vertical: anchorOrigin };

  const SlideTransition = properties => (
    <Slide {...properties} direction={transitionDirection} />
  );

  const bannerClasses = {
    anchorOriginTopCenter: classes.anchorOriginTopCenter,
    anchorOriginBottomCenter: classes.anchorOriginBottomCenter
  };
  bannerClasses.root = open ? classes.root : classes.rootClosed;

  return (
    <Snackbar
      {...(offset && {
        style: anchorOriginOffset[`anchorOrigin${capitalize(anchorOrigin)}`]
      })}
      className={className}
      id={bannerId}
      classes={bannerClasses}
      anchorOrigin={anchorOriginBanner}
      TransitionComponent={SlideTransition}
      open={open}
      transitionDuration={transitionDuration}
    >
      <HvBannerContentWrapper
        id={`${bannerId}-content`}
        content={label}
        variant={variant}
        customIcon={customIcon}
        showIcon={showIcon}
        actions={actions}
        actionsCallback={actionsCallback}
        actionsPosition={actionsPosition}
        onClose={onClose}
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
     * Styles applied to the component when define as top.
     */
    anchorOriginTopCenter: PropTypes.string,
    /**
     * Styles applied to the component when define as bottom.
     */
    anchorOriginBottomCenter: PropTypes.string
  }).isRequired,
  /**
   *  If true, Snackbar is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop. The reason parameter can optionally be used to control the response to onClose, for example ignoring clickaway.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * The message to display.
   */
  label: PropTypes.string,
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
        disabled: PropTypes.bool
      })
    )
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionsCallback: PropTypes.func,
  /**
   * The position property of the header.
   */
  actionsPosition: PropTypes.PropTypes.oneOf([
    "auto",
    "inline",
    "bottom-right"
  ]),
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
  offset: PropTypes.number
};

HvBanner.defaultProps = {
  className: "",
  id: undefined,
  label: "",
  anchorOrigin: "top",
  customIcon: null,
  showIcon: false,
  actions: null,
  actionsCallback: () => {},
  actionsPosition: "auto",
  variant: "default",
  transitionDuration: 300,
  transitionDirection: "down",
  offset: 60
};

export default withStyles(styles, { name: "HvBanner" })(HvBanner);
