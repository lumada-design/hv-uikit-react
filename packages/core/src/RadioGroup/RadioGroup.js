import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { withStyles } from "@mui/styles";

import { HvFormElement, HvLabel, HvInfoMessage, HvWarningText, useUniqueId } from "..";

import { setId, useControlled } from "../utils";

import styles from "./styles";

const getValueFromSelectedChildren = (children) => {
  const childrenArray = React.Children.toArray(children);
  const childrenCount = childrenArray.length;
  for (let i = 0; i !== childrenCount; i += 1) {
    const child = childrenArray[i];

    const childIsControlled = child.props.checked !== undefined;
    const childIsSelected = childIsControlled ? child.props.checked : child.props.defaultChecked;

    if (childIsSelected) {
      return child.props.value;
    }
  }

  return null;
};

/**
 * A group of radio buttons.
 *
 * A radio group is a type of selection list that can only have a single entry checked at any one time.
 */
const HvRadioGroup = (props) => {
  const {
    classes,
    className,

    id,
    name,
    value: valueProp,
    defaultValue,

    required = false,
    readOnly = false,
    disabled = false,

    label,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    description,
    "aria-describedby": ariaDescribedBy,

    onChange,

    status,
    statusMessage,
    "aria-errormessage": ariaErrorMessage,

    orientation = "vertical",

    children,
    ...others
  } = props;

  const elementId = useUniqueId(id, "hvradiogroup");

  const [value, setValue] = useControlled(
    valueProp,
    defaultValue !== undefined
      ? defaultValue
      : // when uncontrolled and no default value is given,
        // extract the initial selected values from the children own state
        () => getValueFromSelectedChildren(children)
  );

  const onChildChangeInterceptor = useCallback(
    (childOnChange, evt, isChecked, newValue) => {
      childOnChange?.(evt, isChecked, newValue);

      onChange?.(evt, newValue);

      setValue(newValue);
    },
    [onChange, setValue]
  );

  const modifiedChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      const childValue = child.props.value ?? "on";

      const childIsSelected = childValue === value;

      return React.cloneElement(child, {
        checked: childIsSelected,
        name: child.props.name || name || elementId,
        onChange: (evt, isChecked, newValue) =>
          onChildChangeInterceptor(child.props.onChange, evt, isChecked, newValue),
        inputProps: {
          ...child.props.inputProps,
          // set the required attribute directly in the input
          // the radio form element context shouldn't be aware so the
          // label doesn't show redundant asterisk
          required,
        },
        disabled: disabled || child.props.disabled,
        readOnly: readOnly || child.props.readOnly,
      });
    });
  }, [children, disabled, elementId, name, onChildChangeInterceptor, readOnly, required, value]);

  // the error message area will only be created if:
  // - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled OR
  //   - status is uncontrolled and required is true
  const canShowError =
    ariaErrorMessage == null &&
    ((status !== undefined && statusMessage !== undefined) || (status === undefined && required));

  const errorMessageId = canShowError ? setId(elementId, "error") : ariaErrorMessage;

  return (
    <HvFormElement
      id={id}
      name={name}
      status={status || "standBy"}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={clsx(className, classes.root)}
    >
      {label && (
        <HvLabel id={setId(elementId, "label")} label={label} className={clsx(classes.label)} />
      )}
      {description && (
        <HvInfoMessage id={setId(elementId, "description")}>{description}</HvInfoMessage>
      )}
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy || (label && setId(elementId, "label"))}
        aria-invalid={status === "invalid" ? true : undefined}
        aria-errormessage={status === "invalid" ? errorMessageId : undefined}
        aria-describedby={
          [description && setId(elementId, "description"), ariaDescribedBy].join(" ").trim() ||
          undefined
        }
        className={clsx(classes.group, {
          [classes.vertical]: orientation === "vertical",
          [classes.horizontal]: orientation === "horizontal",
          [classes.invalid]: status === "invalid",
        })}
        {...others}
      >
        {modifiedChildren}
      </div>
      {canShowError && (
        <HvWarningText id={setId(elementId, "error")} disableBorder className={classes.error}>
          {statusMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};

HvRadioGroup.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the label.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the radio button group.
     */
    group: PropTypes.string,
    /**
     * Styles applied to the radio button group when orientation is vertical.
     */
    vertical: PropTypes.string,
    /**
     * Styles applied to the radio button group when orientation is horizontal.
     */
    horizontal: PropTypes.string,
    /**
     * Styles applied to the radio button group when validation status is invalid.
     */
    invalid: PropTypes.string,
    /**
     * Styles applied to the error area.
     */
    error: PropTypes.string,
  }).isRequired,

  /**
   * Id to be applied to the form element root node.
   */
  id: PropTypes.string,

  /**
   * The form element name.
   * It is propagated to the children radio buttons, unless they already have one (which they shouldn't).
   */
  name: PropTypes.string,
  /**
   * The value of the form element, represented in one of the child radio buttons values.
   *
   * When defined the radio button group state becomes controlled.
   */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  /**
   * When uncontrolled, defines the initial value.
   */
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: PropTypes.any,

  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  "aria-label": PropTypes.string,
  /**
   * @ignore
   */
  "aria-labelledby": PropTypes.string,
  /**
   * Provide additional descriptive text for the form element.
   */
  description: PropTypes.node,
  /**
   * @ignore
   */
  "aria-describedby": PropTypes.string,

  /**
   * Indicates that the form element is disabled.
   * If `true` the state is propagated to the children radio buttons.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates that the form element is not editable.
   * If `true` the state is propagated to the children radio buttons.
   */
  readOnly: PropTypes.bool,
  /**
   * Indicates that user input is required on the form element.
   * If `true` the state is propagated to the children radio buttons' input element.
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
  statusMessage: PropTypes.node,
  /**
   * Identifies the element that provides an error message for the radio group.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage": PropTypes.string,

  /**
   * The callback fired when the value changes.
   */
  onChange: PropTypes.func,

  /**
   * Indicates whether the radio buttons group's orientation is horizontal or vertical.
   *
   * Defaults to vertical.
   */
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),

  /**
   * The radio buttons that are part of the group.
   *
   * Their state will always be controlled by the group.
   * However the individual radio button onChange callback will still be called if defined.
   */
  children: PropTypes.node,
};

export default withStyles(styles, { name: "HvRadioGroup" })(HvRadioGroup);
