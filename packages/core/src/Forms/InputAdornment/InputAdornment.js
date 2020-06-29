import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { HvFormElementContextConsumer } from "../FormElement";

import styles from "./styles";

const HvInputAdornment = props => {
  const {
    classes,
    className,
    icon,
    showWhen = "standBy",
    onClick,
    isShown = false,
    ...others
  } = props;

  return (
    <HvFormElementContextConsumer>
      {formContext => {
        const { elementStatus = "standBy", elementValue = "", descriptors = {} } = formContext;
        const { HvBaseInput, HvLabel } = descriptors;

        const displayIcon =
          (elementValue !== "" && elementStatus === showWhen) || (isShown && elementValue !== "");

        return (
          <div aria-hidden="true">
            <button
              type="button"
              tabIndex={-1}
              aria-labelledby={HvLabel?.[0]?.id || undefined}
              aria-controls={HvBaseInput?.[0]?.id || undefined}
              className={clsx(
                className,
                { [classes.hideIcon]: !displayIcon },
                classes.adornmentButton
              )}
              onClick={onClick}
              {...others}
            >
              <div className={classes.icon}>{icon}</div>
            </button>
          </div>
        );
      }}
    </HvFormElementContextConsumer>
  );
};
HvInputAdornment.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root container of the input.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the adornment box.
     */
    // adornmentsBox: PropTypes.string,
    /**
     * Styles applied to the adornment button.
     */
    adornmentButton: PropTypes.string,
    /**
     * Styles applied to icon on action.
     */
    iconAction: PropTypes.string,
    /**
     * Styles applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon when it's supposed to be hidden.
     */
    hideIcon: PropTypes.string
  }),
  /**
   * The icon to be added into the input.
   */
  icon: PropTypes.node.isRequired,
  /**
   * When the adornment should be displayed.
   */
  showWhen: PropTypes.oneOf(["standBy", "valid", "invalid"]),
  /**
   * Function to be executed when this element is clicked.
   */
  onClick: PropTypes.func,
  /**
   * If the icon display is influenced by an external actor, i.e. hover on input.
   */
  isShown: PropTypes.bool
};

const displayName = "HvInputAdornment";
const wrapper = withStyles(styles, { name: displayName })(HvInputAdornment);
wrapper.displayName = displayName;
export default wrapper;
