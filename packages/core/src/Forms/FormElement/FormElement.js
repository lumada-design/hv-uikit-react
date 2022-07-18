import React, { useMemo } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";

import useUniqueId from "../../useUniqueId";

import { findDescriptors } from "./utils/FormUtils";
import { HvFormElementContextProvider } from "./context/FormElementContext";
import { HvFormElementValueContextProvider } from "./context/FormElementValueContext";
import { HvFormElementDescriptorsContextProvider } from "./context/FormElementDescriptorsContext";
import styles from "./styles";

/**
 * The FormElement intends to establish the base API for form elements and also to
 * ensure state consistency among children in relation to ids, validation status, etc..
 *
 * FormElement and its provided building blocks can be used when implementing a custom
 * use case not covered by ready-to-use form elements.
 * Most of these form elements offer a Base version with minimal wiring and logic, with
 * the intent of also serving as building blocks for such cases.
 */
const HvFormElement = (props) => {
  const {
    classes,
    className,

    children,

    id,
    name,
    value,

    disabled = false,
    required = false,
    readOnly = false,

    status = "standBy",

    ...others
  } = props;

  const elementId = useUniqueId(id, "hvformelement");

  const contextValue = useMemo(
    () => ({
      elementId,
      elementName: name,
      elementStatus: status,
      elementDisabled: disabled,
      elementRequired: required,
      elementReadOnly: readOnly,
    }),
    [disabled, elementId, name, readOnly, required, status]
  );

  const descriptors = useMemo(() => findDescriptors(children), [children]);

  return (
    <div id={id} className={clsx(className, classes.root)} {...others}>
      <HvFormElementContextProvider value={contextValue}>
        <HvFormElementValueContextProvider value={value}>
          <HvFormElementDescriptorsContextProvider value={descriptors}>
            {children}
          </HvFormElementDescriptorsContextProvider>
        </HvFormElementValueContextProvider>
      </HvFormElementContextProvider>
    </div>
  );
};

HvFormElement.formElementType = "formelement";

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
   *
   * Part of a name/value pair, should be the name property of the underling native input.
   */
  name: PropTypes.string,
  /**
   * Current value of the form element.
   *
   * Part of a name/value pair, should be the value property of the underling native input.
   */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,

  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label: PropTypes.node,
  /**
   * Provide additional descriptive text for the form element.
   */
  description: PropTypes.node,

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
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status: PropTypes.oneOf(["standBy", "valid", "invalid"]),
  /**
   * The error message to show when `status` is "invalid".
   */
  statusMessage: PropTypes.string,

  /**
   * The callback fired when the value changes.
   */
  onChange: PropTypes.func,
};

export default withStyles(styles, { name: "HvFormElement" })(HvFormElement);
