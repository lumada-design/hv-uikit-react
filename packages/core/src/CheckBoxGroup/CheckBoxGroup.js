import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import { HvFormElement, HvLabel, HvInfoMessage, HvWarningText, useUniqueId, HvCheckBox } from "..";

import { setId, useControlled } from "../utils";

import styles from "./styles";

const computeSelectAllState = (selected, total) => {
  if (selected === 0) {
    return "none";
  }

  if (selected === total) {
    return "all";
  }

  return "some";
};

/**
 *
 */
const HvCheckBoxGroup = (props) => {
  const {
    classes,
    className,

    id,
    name,
    value: valueProp,
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

    orientation = "vertical",
    showSelectAll = false,
    selectAllLabel = "All",

    children,
    ...others
  } = props;

  const elementId = useUniqueId(id, "hvcheckboxgroup");

  const [value, setValue] = useControlled(
    valueProp,
    (() => {
      // when uncontrolled, extract the initial selected values from the children own state
      const selectedValues = [];

      React.Children.toArray(children).forEach((child, i) => {
        const childIsControlled = child.props.checked !== undefined;
        const childValue = child.props.value;

        let childIsSelected = false;
        if (childIsControlled) {
          childIsSelected = child.props.checked;
        } else {
          childIsSelected = child.props.defaultChecked;
        }

        selectedValues[i] = childIsSelected ? childValue : null;
      });

      return selectedValues.filter((v) => v != null);
    })()
  );

  const [validationState, setValidationState] = useControlled(status, "standBy");

  const [validationMessage] = useControlled(statusMessage, "Required");

  const [allValues, selectedState] = useMemo(() => {
    const childValues = [];
    const childSelectedState = [];

    React.Children.toArray(children).forEach((child, i) => {
      const childValue = child.props.value;
      const childIsSelected = value.indexOf(childValue) !== -1;

      childValues[i] = childValue;
      childSelectedState[i] = childIsSelected;
    });

    return [childValues, childSelectedState];
  }, [children, value]);

  const selectAllState = computeSelectAllState(value.length, selectedState.length);

  const onChildChangeInterceptor = useCallback(
    (index, childOnChange, evt, isChecked) => {
      const newValue = [];
      selectedState.forEach((isSelected, i) => {
        if (i === index) {
          if (isChecked) {
            newValue.push(allValues[i]);
          }
        } else if (isSelected) {
          newValue.push(allValues[i]);
        }
      });

      childOnChange?.(evt, isChecked);

      onChange?.(evt, newValue);

      setValue(() => {
        // this will only run if uncontrolled

        if (required && newValue.length === 0) {
          setValidationState("invalid");
        } else {
          setValidationState("valid");
        }

        return newValue;
      });
    },
    [allValues, onChange, required, selectedState, setValidationState, setValue]
  );

  const modifiedChildren = useMemo(() => {
    return React.Children.map(children, (child, i) => {
      const childIsSelected = selectedState[i];

      return React.cloneElement(child, {
        checked: childIsSelected,
        name: child.props.name || name,
        onChange: (evt, isChecked) =>
          onChildChangeInterceptor(i, child.props.onChange, evt, isChecked),
        disabled: disabled || child.props.disabled,
        readOnly: readOnly || child.props.readOnly,
      });
    });
  }, [children, disabled, name, onChildChangeInterceptor, readOnly, selectedState]);

  const handleSelectAll = (evt, selectAllChecked) => {
    let newValue;
    if (selectAllChecked) {
      newValue = [...allValues];
    } else {
      newValue = [];
    }

    onChange?.(evt, newValue);

    setValue(() => {
      // this will only run if uncontrolled
      if (required && newValue.length === 0) {
        setValidationState("invalid");
      } else {
        setValidationState("valid");
      }

      return newValue;
    });
  };

  // error message area will only be needed if the status is being controlled
  // or if the value is uncontrolled and required is true
  const canShowError = status !== undefined || (required && valueProp === undefined);

  return (
    <HvFormElement
      id={id}
      name={name}
      value={value}
      status={validationState}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={clsx(className, classes.root)}
    >
      {label && (
        <HvLabel
          id={setId(elementId, "label")}
          htmlFor={setId(elementId, "group")}
          label={label}
          className={clsx(classes.label)}
        />
      )}
      {description && (
        <HvInfoMessage id={setId(elementId, "description")}>{description}</HvInfoMessage>
      )}
      <div
        id={label && setId(elementId, "group")}
        role="group"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={validationState === "invalid" ? true : undefined}
        aria-errormessage={validationState === "invalid" ? setId(elementId, "error") : undefined}
        aria-describedby={
          ariaDescribedBy != null ? ariaDescribedBy : description && setId(elementId, "description")
        }
        className={clsx(classes.group, {
          [classes.vertical]: orientation === "vertical",
          [classes.horizontal]: orientation === "horizontal",
        })}
        {...others}
      >
        {showSelectAll && (
          <HvCheckBox
            checked={selectAllState === "all"}
            indeterminate={selectAllState === "some"}
            label={selectAllLabel}
            disabled={disabled}
            readOnly={readOnly}
            className={clsx(classes.selectAll)}
            onChange={handleSelectAll}
          />
        )}
        {modifiedChildren}
      </div>
      {canShowError && (
        <HvWarningText id={setId(elementId, "error")} className={clsx(classes.error)}>
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};

HvCheckBoxGroup.propTypes = {
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
     * Styles applied to the checkbox group.
     */
    group: PropTypes.string,
    /**
     * Styles applied to the checkbox group when orientation is vertical.
     */
    vertical: PropTypes.string,
    /**
     * Styles applied to the checkbox group when orientation is horizontal.
     */
    horizontal: PropTypes.string,
    /**
     * Styles applied to the select all checkbox.
     */
    selectAll: PropTypes.string,
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
   * It is propagated to the children checkboxes, unless they already have one.
   */
  name: PropTypes.string,
  /**
   * The value of the form element. An array of values represented in the child checkboxes.
   *
   * When defined the checkbox group state becomes controlled.
   */
  value: PropTypes.arrayOf(PropTypes.any),

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
   * If `true` the state is propagated to the children checkboxes.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates that the form element is not editable.
   * If `true` the state is propagated to the children checkboxes.
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
   * The error message to show when `status` is "invalid". Defaults to "Required".
   */
  statusMessage: PropTypes.node,

  /**
   * The callback fired when the value changes.
   */
  onChange: PropTypes.func,

  /**
   * Indicates whether the checkbox group's orientation is horizontal or vertical.
   *
   * Defaults to vertical.
   */
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  /**
   * Indicates if an aditional select all checkbox should be shown.
   */
  showSelectAll: PropTypes.bool,
  /**
   * The label of the select all checkbox. Defaults to "All".
   */
  selectAllLabel: PropTypes.string,

  /**
   * The checkboxes that are part of the group.
   *
   * Their state will always be controlled by the group.
   * However the individual checkbox onChange callback will still be called if defined.
   */
  children: PropTypes.node,
};

export default withStyles(styles, { name: "HvCheckBoxGroup" })(HvCheckBoxGroup);
