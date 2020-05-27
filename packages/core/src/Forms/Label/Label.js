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
  const { label, classes, id, disabled, ...others } = props;

  return (
    <>
      <HvFormElementContextConsumer>
        {() => {
          return (
            <>
              <HvTypography
                id={id}
                className={clsx(classes.root, {
                  [classes.labelDisabled]: disabled
                })}
                variant="labelText"
                component="label"
                {...others}
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
    root: PropTypes.string,
    /**
     * Styles applied when the text should be shown.
     */
    labelDisabled: PropTypes.string
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
