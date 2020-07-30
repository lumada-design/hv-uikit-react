import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import withId from "../../withId";
import { findDescriptors } from "./utils/FormUtils";
import { HvFormElementContextProvider } from "./context/FormElementContext";
import styles from "./styles";

/**
 * The FormElement is a component used to contain and control components capable of receiving data.
 */
const HvFormElement = props => {
  const {
    id,
    name,
    classes,
    className,
    children,
    status = "standBy",
    value,
    disabled = false,
    ...others
  } = props;
  const descriptors = findDescriptors(children, [
    "HvHelperText",
    "HvLabel",
    "HvSuggestions",
    "HvInfoMessage",
    "HvWarningText",
    "HvBaseInput"
  ]);
  const contextValue = {
    elementId: id,
    elementName: name,
    elementStatus: status,
    elementValue: value,
    elementDisabled: disabled,
    descriptors
  };
  return (
    <div className={clsx(className, classes.root)} {...others}>
      <HvFormElementContextProvider value={contextValue}>{children}</HvFormElementContextProvider>
    </div>
  );
};

HvFormElement.propTypes = {
  /**
   * Component identifier.
   */
  id: PropTypes.string,
  /**
   * Component name identifier to be used in the context.
   */
  name: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the FormElement.
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
   * this value will be propagated to the children through the context.
   */
  status: PropTypes.oneOf(["standBy", "valid", "invalid"]),
  /**
   * Represents the status of this form element,
   * where valid is correct, invalid is incorrect and standby means no validations had run.
   * this value will be propagated to the children through the context.
   */
  value: PropTypes.string,
  /**
   * If `true` the form element and all of it's children are disabled which blocks interactions.
   * this value will be propagated to the children through the context.
   */
  disabled: PropTypes.bool
};

export default withStyles(styles, { name: "HvFormElement" })(withId(HvFormElement));
