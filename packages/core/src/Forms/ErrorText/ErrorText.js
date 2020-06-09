import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { HvFormElementContextConsumer } from "../FormElement";
import HvTypography from "../../Typography";

import styles from "./styles";
/**
 * Component used in conjunction with other form elements, to give extra information about error status.
 */
const HvErrorText = props => {
  const {
    label,
    classes,
    id,
    errorTextStatus,
    showWhen,
    disabled,
    disableGutter = false,
    ...others
  } = props;

  return (
    <HvFormElementContextConsumer>
      {formContext => {
        const { elementStatus, elementDisabled } = formContext;
        const localStatus = errorTextStatus || elementStatus || "standBy";
        const isVisible = localStatus === showWhen;
        const localDisabled = disabled || elementDisabled;
        return (
          <HvTypography
            id={id}
            variant="infoText"
            className={clsx({
              [classes.showText]: isVisible,
              [classes.errorTextDisabled]: localDisabled,
              [classes.errorText]: !localDisabled,
              [classes.topGutter]: !disableGutter
            })}
            aria-live="polite"
            aria-atomic="true"
            aria-relevant="additions text"
            {...others}
          >
            {label}
          </HvTypography>
        );
      }}
    </HvFormElementContextConsumer>
  );
};

HvErrorText.propTypes = {
  /**
   * Describes the current state of the error text.
   */
  errorTextStatus: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the information text.
     */
    errorText: PropTypes.string,
    /**
     * Styles applied when the text should be shown.
     */
    showText: PropTypes.string,
    /**
     * Styles applied when the text is disabled.
     */
    errorTextDisabled: PropTypes.string,
    /**
     * Separation between text and upper element.
     */
    topGutter: PropTypes.string,
    /**
     * IE11 specific styling.
     */
    "@global": PropTypes.string
  }).isRequired,
  /**
   * The text to be shown by the info text.
   */
  label: PropTypes.string,
  /**
   * When this text is to be rendered.
   */
  showWhen: PropTypes.oneOf(["standBy", "valid", "invalid"]),
  /**
   * If ´true´ the text is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If ´true´ the text won't include a top gutter.
   */
  disableGutter: PropTypes.bool
};

export default withStyles(styles, { name: "HvErrorText" })(HvErrorText);
