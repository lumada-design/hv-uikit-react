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
    inputId,
    icon,
    showWhen,
    onClick,
    inputButtonLabel,
    isShown,
    ...others
  } = props;

  return (
    <HvFormElementContextConsumer>
      {formContext => {
        const { elementStatus, elementValue } = formContext;

        const displayIcon =
          (elementValue !== "" && elementStatus === showWhen) || (isShown && elementValue !== "");

        return (
          <div aria-hidden="true">
            <button
              type="button"
              tabIndex={-1}
              aria-controls={inputId || undefined}
              aria-label={inputButtonLabel}
              title={inputButtonLabel}
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
   * Id to be applied to the root node.
   */
  inputId: PropTypes.string,
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
     * Styles applied to the icon
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon when it's supposed to be hidden
     */
    hideIcon: PropTypes.string
  }),

  /**
   * The icon to be added into the input.
   */
  icon: PropTypes.node,
  /**
   * When the input aligment should be displayed
   */
  showWhen: PropTypes.string,
  /**
   * OnClick handler
   */
  onClick: PropTypes.func,
  /**
   * The label of the clear button
   */
  inputButtonLabel: PropTypes.string,
  /**
   * If the icon display is influenced by an external actor, i.e. hover on input
   */
  isShown: PropTypes.bool
};

export default withStyles(styles, { name: "HvInputAdornment" })(HvInputAdornment);
