import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { HvFormElementContextConsumer } from "../FormElement";

import withId from "../../withId";
import HvTypography from "../../Typography";

import styles from "./styles";
/**
 * Component used in conjunction with other form elements, to give extra information about status.
 */
const HvInfoText = props => {
  const { label, classes, id, infoTextStatus = "standBy", showWhen, disabled, ...others } = props;

  return (
    <>
      <HvFormElementContextConsumer>
        {FormContext => {
          const { elementStatus } = FormContext;
          const localStatus = elementStatus || infoTextStatus;
          const render = localStatus === showWhen;
          return (
            <>
              <HvTypography
                id={id}
                variant="infoText"
                className={clsx({
                  [classes.showText]: render,
                  [classes.infoDisabled]: disabled,
                  [classes.infoText]: !disabled
                })}
                {...others}
                aria-live="polite"
                aria-atomic="true"
                aria-relevant="additions text"
              >
                {label}
              </HvTypography>
            </>
          );
        }}
      </HvFormElementContextConsumer>
    </>
  );
};

HvInfoText.propTypes = {
  /**
   * Describes the current state of the info text
   */
  infoTextStatus: PropTypes.string,
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
    infoText: PropTypes.string,
    /**
     * Styles applied when the text should be shown.
     */
    showText: PropTypes.string,
    /**
     * Styles applied when the text is disabled.
     */
    infoDisabled: PropTypes.string,
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
   * If ´true´ the input is disabled.
   */
  disabled: PropTypes.bool
};

export default withStyles(styles, { name: "HvInfoText" })(withId(HvInfoText));
