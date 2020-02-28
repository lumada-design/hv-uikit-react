import React, { useState } from "react";
import PropTypes, { oneOfType } from "prop-types";
import uniqueId from "lodash/uniqueId";
import capitalize from "lodash/capitalize";
import { Slide, Snackbar, withStyles } from "@material-ui/core";
import HvSnackBarContentWrapper from "./SnackbarContentWrapper";
import styles from "./styles";

const transLeft = props => <Slide {...props} direction="left" />;
const transRight = props => <Slide {...props} direction="right" />;
const transUp = props => <Slide {...props} direction="up" />;
const transDown = props => <Slide {...props} direction="down" />;

const snackBarDirComponent = direction => {
  switch (direction) {
    default:
    case "left":
      return transLeft;
    case "right":
      return transRight;
    case "up":
      return transUp;
    case "down":
      return transDown;
  }
};

const HvSnackbar = props => {
  const {
    classes,
    className,
    id,
    open,
    onClose,
    label,
    anchorOrigin,
    autoHideDuration,
    variant,
    showIcon,
    customIcon,
    action,
    actionCallback,
    transitionDuration,
    transitionDirection,
    offset
  } = props;

  const [snackbarId] = useState(id || uniqueId("hv-snackbar-"));

  const anchorOriginOffset = offset && {
    anchorOriginTop: {
      top: `${offset}px`
    },
    anchorOriginBottom: {
      bottom: `${offset}px`
    }
  };

  return (
    <Snackbar
      {...(offset && {
        style:
          anchorOriginOffset[`anchorOrigin${capitalize(anchorOrigin.vertical)}`]
      })}
      classes={classes}
      className={className}
      id={snackbarId}
      anchorOrigin={anchorOrigin}
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      transitionDuration={transitionDuration}
      TransitionComponent={snackBarDirComponent(transitionDirection)}
    >
      <HvSnackBarContentWrapper
        id={`${snackbarId}-content`}
        label={label}
        variant={variant}
        customIcon={customIcon}
        showIcon={showIcon}
        action={action}
        actionCallback={actionCallback}
      />
    </Snackbar>
  );
};

HvSnackbar.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component when define as top right.
     */
    anchorOriginTopRight: PropTypes.string,
    /**
     * Styles applied to the component when define as top left.
     */
    anchorOriginTopLeft: PropTypes.string,
    /**
     * Styles applied to the component when define as top center.
     */
    anchorOriginTopCenter: PropTypes.string,
    /**
     * Styles applied to the component when define as bottom center.
     */
    anchorOriginBottomCenter: PropTypes.string,
    /**
     * Styles applied to the component when define as bottom left.
     */
    anchorOriginBottomLeft: PropTypes.string,
    /**
     * Styles applied to the component when define as bottom right.
     */
    anchorOriginBottomRight: PropTypes.string
  }).isRequired,
  /**
   *  If true, Snackbar is open.
   */
  open: PropTypes.bool,
  /**
   * Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop. The reason parameter can optionally be used to control the response to onClose, for example ignoring clickaway.
   */
  onClose: PropTypes.func,
  /**
   * The message to display.
   */
  label: PropTypes.string,
  /**
   *  The anchor of the Snackbar. vertical: "top", "bottom" | horizontal: "left","center","right. It defines where the snackbar will end his animation
   */
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.string,
    horizontal: PropTypes.string
  }),
  /**
   * The number of milliseconds to wait before automatically calling the onClose function. onClose should then set the state of the open prop to hide the Snackbar
   */
  autoHideDuration: PropTypes.number,
  /**
   * Variant of the snackbar.
   */
  variant: PropTypes.oneOf(["default", "success", "error"]),
  /**
   * Custom icon to replace the variant default.
   */
  customIcon: PropTypes.node,
  /**
   * Controls if the associated icon to the variant should be shown.
   */
  showIcon: PropTypes.bool,
  /**
   * Action to display.
   */
  action: oneOfType([
    PropTypes.node,
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.func,
      disabled: PropTypes.bool
    })
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionCallback: PropTypes.func,
  /**
   * Duration of transition in milliseconds.
   */
  transitionDuration: PropTypes.number,
  /**
   * Direction of slide transition.
   */
  transitionDirection: PropTypes.oneOf(["up", "down", "left", "right"]),
  /**
   * Custom offset from top/bottom of the page, in px.
   */
  offset: PropTypes.number
};

HvSnackbar.defaultProps = {
  className: "",
  id: null,
  label: "",
  open: false,
  anchorOrigin: { vertical: "top", horizontal: "right" },
  onClose: null,
  autoHideDuration: 5000,
  customIcon: null,
  showIcon: false,
  action: null,
  actionCallback: () => {},
  variant: "default",
  transitionDuration: 300,
  transitionDirection: "left",
  offset: undefined
};

export default withStyles(styles, { name: "HvSnackbar" })(HvSnackbar);
