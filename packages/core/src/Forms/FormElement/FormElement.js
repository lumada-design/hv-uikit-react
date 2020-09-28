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
const HvFormElement = (props) => {
  const {
    id,
    name,
    classes,
    className,
    children,
    status = "standBy",
    value,
    disabled = false,
    required = false,
    readOnly = false,
    locale = "en-US",
    ...others
  } = props;
  const descriptors = findDescriptors(children, [
    "HvLabel",
    "HvSuggestions",
    "HvInfoMessage",
    "HvCharCounter",
    "HvWarningText",
    "HvBaseInput",
    "HvBaseDropdown",
    "HvCalendar",
    "HvCalendarHeader",
  ]);
  const contextValue = {
    elementId: id,
    elementName: name,
    elementStatus: status,
    elementValue: value,
    elementDisabled: disabled,
    elementRequired: required,
    elementReadOnly: readOnly,
    elementLocale: locale,
    descriptors,
  };

  return (
    <div id={id} className={clsx(className, classes.root)} {...others}>
      <HvFormElementContextProvider value={contextValue}>{children}</HvFormElementContextProvider>
    </div>
  );
};

HvFormElement.propTypes = {
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
    root: PropTypes.string,
  }).isRequired,

  /**
   * Components that will receive the form context values.
   */
  children: PropTypes.node.isRequired,

  /**
   * Component identifier.
   */
  id: PropTypes.string,

  /**
   * Name of the form element.
   * Part of a name/value pair, should be the name property of the undeling native input, if any.
   */
  name: PropTypes.string,
  /**
   * Current value of the form element.
   * Part of a name/value pair, should be the value property of the undeling native input, if any.
   */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,

  /**
   * Whether the form element is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates that the form element is not editable.
   */
  readOnly: PropTypes.bool,
  /**
   * Indicates that user input is required on the form element.
   */
  required: PropTypes.bool,

  /**
   * Represents the status of this form element,
   * where valid is correct, invalid is incorrect and standby means no validations had run.
   * this value will be propagated to the children through the context.
   */
  status: PropTypes.oneOf(["standBy", "valid", "invalid"]),

  /**
   * Locale to be used by the calendar.
   */
  locale: PropTypes.string,
};

export default withStyles(styles, { name: "HvFormElement" })(withId(HvFormElement));
