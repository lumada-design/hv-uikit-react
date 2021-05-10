import React, { useCallback, useMemo, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { withStyles } from "@material-ui/core";
import { isKeypress, KeyboardCodes } from "../utils/KeyboardUtils";

import {
  HvFormElement,
  HvLabel,
  HvInfoMessage,
  HvWarningText,
  HvListContainer,
  useUniqueId,
} from "..";

import { setId, useControlled } from "../utils";

import styles from "./styles";

import multiSelectionEventHandler from "../utils/multiSelectionEventHandler";

const getValueFromSelectedChildren = (children, multiple) => {
  const selectedValues = React.Children.toArray(children)
    .map((child) => {
      const childIsControlled = child.props.selected !== undefined;
      const childIsSelected = childIsControlled
        ? child.props.selected
        : child.props.defaultSelected;

      return childIsSelected ? child.props.value : undefined;
    })
    .filter((v) => v !== undefined);

  return multiple ? selectedValues : selectedValues?.[0];
};

/**
 * Allows the user to select one or more items from a list of choices.
 *
 * Although it supports multi-selection, DS recommends the use of a selection list
 * when it’s clear that the user can only select just one option from the range provided.
 */

const HvSelectionList = (props) => {
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

    multiple = false,
    singleSelectionToggle = false,

    children,
    ...others
  } = props;

  const elementId = useUniqueId(id, "hvselectionlist");

  const [value, setValue] = useControlled(
    valueProp,
    defaultValue !== undefined
      ? defaultValue
      : // when uncontrolled and no default value is given,
        // extract the initial selected values from the children own state
        () => getValueFromSelectedChildren(children, multiple)
  );

  const [validationState, setValidationState] = useControlled(status, "standBy");

  const [validationMessage] = useControlled(statusMessage, "Required");

  const [allValues, selectedState] = useMemo(() => {
    const childValues = [];
    const childSelectedState = [];

    React.Children.toArray(children).forEach((child, i) => {
      const childValue = child.props.value;
      const childIsSelected = multiple ? value.indexOf(childValue) !== -1 : value === childValue;

      childValues[i] = childValue;
      childSelectedState[i] = childIsSelected;
    });

    return [childValues, childSelectedState];
  }, [children, multiple, value]);

  const selectionAnchor = useRef(undefined);

  const listContainer = useRef(null);

  const { ArrowUp, ArrowDown } = KeyboardCodes;

  useEffect(() => {
    const handleMeta = (event) => {
      const tempArray = [];
      if (
        (isKeypress(event, ArrowUp) &&
          event.shiftKey &&
          listContainer.current.contains(event.target)) ||
        (isKeypress(event, ArrowDown) &&
          event.shiftKey &&
          listContainer.current.contains(event.target))
      ) {
        selectedState.forEach((isSelected, i) => {
          if (i === event.target.value - 1) {
            if (!isSelected) {
              tempArray.push(allValues[i]);
            }
          } else if (isSelected) {
            tempArray.push(allValues[i]);
          }
        });
        setValue(tempArray);
      }
    };
    window.addEventListener("keyup", handleMeta);

    return () => {
      window.removeEventListener("keyup", handleMeta);
    };
  }, [allValues, selectedState, setValue, ArrowUp, ArrowDown]);

  const onChildChangeInterceptor = useCallback(
    (index, childOnClick, evt) => {
      childOnClick?.(evt);
      if (!readOnly && !disabled) {
        let newValue;
        if (multiple) {
          newValue = multiSelectionEventHandler(
            evt,
            index,
            selectionAnchor,
            allValues,
            selectedState
          );
        } else {
          newValue = singleSelectionToggle && selectedState[index] ? null : allValues[index];
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
      }
    },
    [
      allValues,
      disabled,
      multiple,
      onChange,
      readOnly,
      required,
      selectedState,
      setValidationState,
      setValue,
      singleSelectionToggle,
      selectionAnchor,
    ]
  );

  const modifiedChildren = useMemo(() => {
    return React.Children.map(children, (child, i) => {
      const childIsSelected = selectedState[i];

      return React.cloneElement(child, {
        role: "option",
        selected: childIsSelected,
        onClick: (evt) => onChildChangeInterceptor(i, child.props.onClick, evt),
        disabled: disabled || child.props.disabled,
      });
    });
  }, [children, disabled, onChildChangeInterceptor, selectedState]);

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
      status={validationState}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={clsx(className, classes.root)}
    >
      {label && <HvLabel id={setId(elementId, "label")} label={label} className={classes.label} />}
      {description && (
        <HvInfoMessage id={setId(elementId, "description")} className={classes.description}>
          {description}
        </HvInfoMessage>
      )}

      <HvListContainer
        id={label && setId(elementId, "listbox")}
        interactive
        condensed
        role="listbox"
        aria-multiselectable={multiple || undefined}
        aria-label={ariaLabel}
        aria-labelledby={
          [label && setId(elementId, "label"), ariaLabelledBy].join(" ").trim() || undefined
        }
        aria-invalid={validationState === "invalid" ? true : undefined}
        aria-errormessage={validationState === "invalid" ? errorMessageId : undefined}
        aria-describedby={
          [description && setId(elementId, "description"), ariaDescribedBy].join(" ").trim() ||
          undefined
        }
        className={clsx(classes.listbox, {
          [classes.vertical]: orientation === "vertical",
          [classes.horizontal]: orientation === "horizontal",
          [classes.invalid]: validationState === "invalid",
        })}
        ref={listContainer}
        {...others}
      >
        {modifiedChildren}
      </HvListContainer>

      {canShowError && (
        <HvWarningText id={setId(elementId, "error")} disableBorder className={classes.error}>
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};

HvSelectionList.propTypes = {
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
     * Styles applied to the description.
     */
    description: PropTypes.string,
    /**
     * Styles applied to the listbox.
     */
    listbox: PropTypes.string,
    /**
     * Styles applied to the listbox when orientation is vertical.
     */
    vertical: PropTypes.string,
    /**
     * Styles applied to the listbox when orientation is horizontal.
     */
    horizontal: PropTypes.string,
    /**
     * Styles applied to the listbox when validation status is invalid.
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
   */
  name: PropTypes.string,
  /**
   * The value of the form element. It must be represented in the child list items.
   *
   * Can either be a single value (when multiple = false) or an
   * array of values (when multiple = true).
   *
   * When defined the selection list state becomes controlled.
   */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
  /**
   * When uncontrolled, defines the initial value.
   */
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),

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
   * If `true` the state is propagated to the children list items.
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
   * The error message to show when the validation status is "invalid".
   *
   * Defaults to "Required" when the status is uncontrolled and no `aria-errormessage` is provided.
   */
  statusMessage: PropTypes.string,
  /**
   * Identifies the element that provides an error message for the listbox.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage": PropTypes.string,

  /**
   * The callback fired when the value changes.
   */
  onChange: PropTypes.func,

  /**
   * Indicates that the user may select more than one item from the current selectable list items.
   */
  multiple: PropTypes.bool,

  /**
   * If `true`, selection can be toggled when single selection.
   */
  singleSelectionToggle: PropTypes.bool,

  /**
   * Indicates whether the list orientation is horizontal or vertical.
   *
   * Defaults to vertical.
   */
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),

  /**
   * The list items.
   *
   * Their state will always be controlled by the selection list.
   */
  children: PropTypes.node,
};

export default withStyles(styles, { name: "HvSelectionList" })(HvSelectionList);
