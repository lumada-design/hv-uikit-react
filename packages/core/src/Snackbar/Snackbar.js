import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import capitalize from "lodash/capitalize";
import { Slide, Snackbar } from "@mui/material";
import { withStyles } from "@mui/styles";
import HvSnackBarContentWrapper from "./SnackbarContentWrapper";
import styles from "./styles";
import { setId } from "../utils";

const transLeft = (props) => <Slide {...props} direction="left" />;
const transRight = (props) => <Slide {...props} direction="right" />;
const transUp = (props) => <Slide {...props} direction="up" />;
const transDown = (props) => <Slide {...props} direction="down" />;

const snackBarDirComponent = (direction) => {
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

/**
 * A Snackbar provides brief messages about app processes.
 * It is dismissed automatically after a given interval.
 *
 * Snackbar can be built with two different components.
 * One is the HvSnackbar, which wraps all the positioning, transition, auto hide, etc.
 * The other is the HvSnackbarContent, which allows a finer control and customization of the content of the Snackbar.
 */
const HvSnackbar = ({
  classes,
  className,
  id,
  open = false,
  onClose,
  label = "",
  anchorOrigin = { vertical: "top", horizontal: "right" },
  autoHideDuration = 5000,
  variant = "default",
  showIcon = false,
  customIcon = null,
  action = null,
  actionCallback,
  transitionDuration = 300,
  transitionDirection = "left",
  offset = 60,
  snackbarContentProps,
  ...others
}) => {
  const anchorOriginOffset = {
    anchorOriginTop: {
      top: `${offset}px`,
    },
    anchorOriginBottom: {
      bottom: `${offset}px`,
    },
  };

  return (
    <Snackbar
      style={anchorOriginOffset[`anchorOrigin${capitalize(anchorOrigin.vertical)}`]}
      classes={classes}
      className={className}
      id={id}
      anchorOrigin={anchorOrigin}
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      transitionDuration={transitionDuration}
      TransitionComponent={snackBarDirComponent(transitionDirection)}
      {...others}
    >
      <HvSnackBarContentWrapper
        id={setId(id, "content")}
        label={label}
        variant={variant}
        customIcon={customIcon}
        showIcon={showIcon}
        action={action}
        actionCallback={actionCallback}
        {...snackbarContentProps}
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
    anchorOriginBottomRight: PropTypes.string,
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
  label: PropTypes.node,
  /**
   *  The anchor of the Snackbar. vertical: "top", "bottom" | horizontal: "left","center","right. It defines where the snackbar will end his animation
   */
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
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
      disabled: PropTypes.bool,
    }),
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving `action` as param
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
  offset: PropTypes.number,
  /**
   * Others applied to the content of the snackbar.
   */
  snackbarContentProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvSnackbar" })(HvSnackbar);
