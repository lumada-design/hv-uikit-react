import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { HvFormElementContextProvider } from "./context/FormElementContext";
import styles from "./styles";

/**
 * The FormElement is a component used to contain and control components capable of receiving data.
 */
const FormElement = props => {
  const { classes, children, elementStatus = "standBy", elementValue, ...others } = props;

  const contextValue = {
    elementStatus,
    elementValue
  };

  return (
    <div className={classes.root} {...others}>
      <HvFormElementContextProvider value={contextValue}>{children}</HvFormElementContextProvider>
    </div>
  );
};

FormElement.propTypes = {
  /**
   *   A Jss Object used to override or extend the styles applied to the FormElement.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * Components that will receive the form context values.
   */
  children: PropTypes.node.isRequired,
  /**
   * Represents the status of this form element,
   * where valid is correct, invalid is incorrect and standby means no validations had run.
   * this value will be propagated to the childrens through the context.
   */
  elementStatus: PropTypes.oneOf(["standBy", "valid", "invalid"]),
  /**
   * Represents the status of this form element,
   * where valid is correct, invalid is incorrect and standby means no validations had run.
   * this value will be propagated to the childrens through the context.
   */
  elementValue: PropTypes.string
};

export default withStyles(styles, { name: "HvFormElement" })(FormElement);
