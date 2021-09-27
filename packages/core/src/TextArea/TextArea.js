import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import isNil from "lodash/isNil";

import clsx from "clsx";
import { withStyles } from "@material-ui/core";

import { refType, setId, useControlled } from "../utils";

import {
  HvFormElement,
  HvBaseInput,
  HvLabel,
  HvInfoMessage,
  HvWarningText,
  HvCharCounter,
  useUniqueId,
} from "..";

import validationStates, { isInvalid } from "../Forms/FormElement/validationStates";
import {
  DEFAULT_ERROR_MESSAGES,
  validationTypes,
  hasBuiltInValidations,
  validateInput,
  computeValidationState,
  computeValidationMessage,
} from "../BaseInput/validations";

import styles from "./styles";

/**
 * A text area is a multiline text input box, with an optional character counter when there is a length limit.
 */
const HvTextArea = (props) => {
  const {
    classes,
    className,

    id,
    name,

    value: valueProp,
    defaultValue = "",

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

    placeholder,

    autoFocus = false,

    middleCountLabel = "/",

    rows = 1,
    resizable = false,
    autoScroll = false,

    hideCounter = false,

    validationMessages,

    maxCharQuantity,
    minCharQuantity,
    validation,

    blockMax = false,

    inputRef: inputRefProp,
    onBlur,
    onFocus,

    inputProps = {},
    countCharProps = {},

    ...others
  } = props;

  const elementId = useUniqueId(id, "hvtextarea");

  const inputRefOwn = useRef(null);
  const inputRef = inputRefProp || inputRefOwn;

  const [focused, setFocused] = React.useState(false);

  // signals that the user has manually edited the input value
  const isDirty = useRef(false);

  // value related state
  const [value, setValue] = useControlled(valueProp, defaultValue);

  const isEmptyValue = value == null || value === "";

  // validation related state
  const [validationState, setValidationState] = useControlled(status, validationStates.standBy);

  const [validationMessage, setValidationMessage] = useControlled(statusMessage, "");

  // validationMessages reference tends to change, as users will not memoize/useState for it;
  // dependencies must be more explicit so we set
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const errorMessages = useMemo(
    () => ({ ...DEFAULT_ERROR_MESSAGES, ...validationMessages }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      validationMessages?.error,
      validationMessages?.requiredError,
      validationMessages?.minCharError,
      validationMessages?.maxCharError,
    ]
  );

  const isOverflow = (currentValue) =>
    isNil(maxCharQuantity) ? false : currentValue.length > maxCharQuantity;

  // validates the input, sets the status and the statusMessage accordingly (if uncontrolled)
  // and returns the validity state of the input.
  const performValidation = useCallback(() => {
    const inputValidity = validateInput(
      inputRef.current,
      value,
      required,
      minCharQuantity,
      maxCharQuantity,
      validationTypes.none,
      validation
    );

    // this will only run if status is uncontrolled
    setValidationState(computeValidationState(inputValidity, isEmptyValue));

    // this will only run if statusMessage is uncontrolled
    setValidationMessage(computeValidationMessage(inputValidity, errorMessages));

    return inputValidity;
  }, [
    errorMessages,
    inputRef,
    isEmptyValue,
    maxCharQuantity,
    minCharQuantity,
    required,
    setValidationMessage,
    setValidationState,
    validation,
    value,
  ]);

  /**
   * Limit the string to the maxCharQuantity length.
   *
   * @param value - string to evaluate
   * @returns {string|*} - string according the limit
   */
  const limitValue = (currentValue) => {
    if (currentValue === undefined || !blockMax) return currentValue;
    return !isOverflow(currentValue) ? currentValue : currentValue.substring(0, maxCharQuantity);
  };

  const [autoScrolling, setAutoScrolling] = useState(autoScroll);

  const isScrolledDown = useCallback(() => {
    const el = inputRef.current;
    return el == null || el.scrollHeight - el.scrollTop === el.clientHeight;
  }, [inputRef]);

  const scrollDown = useCallback(() => {
    const el = inputRef.current;
    if (el != null) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  }, [inputRef]);

  const addScrollListener = useCallback(() => {
    const scrollHandler = {
      handleEvent: () => {
        setAutoScrolling(isScrolledDown());
      },
    };
    inputRef.current.addEventListener("scroll", scrollHandler);
  }, [inputRef, isScrolledDown]);

  /**
   * Validates the text area updating the state and modifying the warning text, also executes
   * the user provided onBlur passing the current validation status and value.
   *
   * @returns {undefined}
   */
  const onContainerBlurHandler = (event) => {
    setFocused(false);

    const inputValidity = performValidation();

    onBlur?.(event, value, inputValidity);
  };

  /**
   * Updates the state putting again the value from the state because the input value is
   * not automatically manage, it also executes the onFocus function from the user passing the value
   */
  const onFocusHandler = (event) => {
    setFocused(true);

    // reset validation status to standBy (only when status is uncontrolled)
    setValidationState(validationStates.standBy);

    onFocus?.(event, value);
  };

  /**
   * Updates the length of the string while is being inputted, also executes the user onChange
   * allowing the customization of the input if required.
   *
   * @param {String} value - The value provided by the HvInput
   */
  const onChangeHandler = (event, currentValue) => {
    isDirty.current = true;

    const limitedValue = blockMax ? limitValue(currentValue) : currentValue;

    // set the input value (only when value is uncontrolled)
    setValue(limitedValue);

    onChange?.(event, limitedValue);
  };

  useEffect(() => {
    if (autoScroll) {
      addScrollListener();
      scrollDown();
    }
    if (autoScrolling) {
      scrollDown();
    }
  }, [addScrollListener, autoScroll, autoScrolling, scrollDown]);

  // run initial validation after first render
  // and also when any validation condition changes
  useEffect(() => {
    if (focused || (!isDirty.current && isEmptyValue)) {
      // skip validation if currently focused or if empty and
      // the user never manually edited the input value
      return;
    }

    performValidation();
  }, [focused, isEmptyValue, performValidation]);

  const hasLabel = label != null;
  const hasDescription = description != null;
  const hasCounter = maxCharQuantity != null && !hideCounter;

  // the error message area will only be created if:
  // - an external element that provides an error message isn't identified via aria-errormessage AND
  //   - both status and statusMessage properties are being controlled OR
  //   - status is uncontrolled and any of the built-in validations are active
  const canShowError =
    ariaErrorMessage == null &&
    ((status !== undefined && statusMessage !== undefined) ||
      (status === undefined &&
        hasBuiltInValidations(
          required,
          validationTypes.none,
          minCharQuantity,
          // if blockMax is true maxCharQuantity will never produce an error
          // unless the value is controlled, so we can't prevent it to overflow maxCharQuantity
          maxCharQuantity != null && (blockMax !== true || value != null) ? maxCharQuantity : null,
          validation,
          inputProps
        )));

  const isStateInvalid = isInvalid(validationState);

  let errorMessageId;
  if (isStateInvalid) {
    errorMessageId = canShowError ? setId(elementId, "error") : ariaErrorMessage;
  }

  return (
    <HvFormElement
      id={id}
      name={name}
      status={validationState}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={clsx(classes.root, className, {
        [classes.resizable]: resizable,
        [classes.disabled]: disabled,
        [classes.invalid]: isStateInvalid,
      })}
      onBlur={onContainerBlurHandler}
    >
      {(hasLabel || hasDescription) && (
        <div className={classes.labelContainer}>
          {hasLabel && (
            <HvLabel
              className={classes.label}
              id={setId(id, "label")}
              htmlFor={setId(elementId, "input")}
              label={label}
            />
          )}

          {hasDescription && (
            <HvInfoMessage className={classes.description} id={setId(elementId, "description")}>
              {description}
            </HvInfoMessage>
          )}
        </div>
      )}

      {hasCounter && (
        <HvCharCounter
          id={setId(elementId, "charCounter")}
          className={classes.characterCounter}
          separator={middleCountLabel}
          currentCharQuantity={value.length}
          maxCharQuantity={maxCharQuantity}
          {...countCharProps}
        />
      )}

      <HvBaseInput
        classes={{
          root: classes.baseInput,
          input: classes.input,
          inputResizable: classes.inputResizable,
        }}
        id={hasLabel ? setId(elementId, "input") : setId(id, "input")}
        name={name}
        value={value}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChangeHandler}
        autoFocus={autoFocus}
        onFocus={onFocusHandler}
        placeholder={placeholder}
        invalid={isStateInvalid}
        resizable={resizable}
        multiline
        rows={rows}
        inputProps={{
          "aria-label": ariaLabel,
          "aria-labelledby": ariaLabelledBy,
          "aria-invalid": isStateInvalid ? true : undefined,
          "aria-errormessage": errorMessageId,
          "aria-describedby":
            ariaDescribedBy != null
              ? ariaDescribedBy
              : description && setId(elementId, "description"),
          "aria-controls": maxCharQuantity ? setId(elementId, "charCounter") : undefined,

          ...inputProps,
        }}
        inputRef={inputRef}
        {...others}
      />

      {canShowError && (
        <HvWarningText id={setId(elementId, "error")} className={classes.error} disableBorder>
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};

HvTextArea.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.PropTypes.shape({
    /**
     * Styles applied to the root container of the textarea.
     */
    root: PropTypes.string,
    /**
     * Style applied to the root when resizable is `true`.
     */
    disabled: PropTypes.string,
    /**
     * Style applied to the root when resizable is `true`.
     */
    resizable: PropTypes.string,
    /**
     * Style applied to the root when resizable is `true`.
     */
    invalid: PropTypes.string,

    /**
     * Styles applied to the base input root which is comprising of everything but the labels and descriptions.
     */
    baseInput: PropTypes.string,

    /**
     * Style applied on the text area element.
     */
    input: PropTypes.string,
    /**
     * Styles applied to text area element element when it is resizable. Can be used to set max/min width.
     */
    inputResizable: PropTypes.string,

    /**
     * Styles applied to text area container that holds the label, description and counter.
     */
    labelContainer: PropTypes.string,
    /**
     * Styles applied to the label element.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the label element.
     */
    description: PropTypes.string,
    /**
     * Style applied on the character counter.
     */
    characterCounter: PropTypes.string,
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
   * The value of the form element.
   */
  value: PropTypes.string,
  /**
   * When uncontrolled, defines the initial input value.
   */
  defaultValue: PropTypes.string,

  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be inputted via inputProps.
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
   * or "invalid" after any change to `checked`, depending of the values of both `required` and `checked`.
   */
  status: PropTypes.oneOf(["standBy", "valid", "invalid"]),
  /**
   * The error message to show when `status` is "invalid".
   */
  statusMessage: PropTypes.string,
  /**
   * Identifies the element that provides an error message for the textarea.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage": PropTypes.string,

  /**
   * The function that will be executed onChange.
   */
  onChange: PropTypes.func,

  /**
   * The placeholder value of the input.
   */
  placeholder: PropTypes.string,

  /**
   * Text between the current char counter and max value.
   */
  middleCountLabel: PropTypes.string,

  /**
   * An Object containing the various texts associated with the input.
   */
  validationMessages: PropTypes.shape({
    /**
     * The value when a validation fails.
     */
    error: PropTypes.string,
    /**
     * The message that appears when there are too many characters.
     */
    maxCharError: PropTypes.string,
    /**
     * The message that appears when there are too few characters.
     */
    minCharError: PropTypes.string,
    /**
     * The message that appears when the input is empty and required.
     */
    requiredError: PropTypes.string,
  }),

  /**
   * Attributes applied to the input element.
   */
  inputProps: PropTypes.instanceOf(Object),
  /**
   * Allows passing a ref to the underlying input
   */
  inputRef: refType,

  /**
   * The function that will be executed onBlur, allows checking the validation state,
   * it receives the value and the validation state (`invalid`, `valid`).
   */
  onBlur: PropTypes.func,
  /**
   * The function that will be executed onBlur, allows checking the value state,
   * it receives the value.
   */
  onFocus: PropTypes.func,

  /**
   * The custom validation function, it receives the value and must return
   * either `true` for valid or `false` for invalid, default validations would only
   * occur if this function is null or undefined
   */
  validation: PropTypes.func,
  /**
   * If `true` it should autofocus.
   */
  autoFocus: PropTypes.bool,

  /**
   * The maximum allowed length of the characters, if this value is null no check
   * will be performed.
   */
  maxCharQuantity: PropTypes.number,
  /**
   * The minimum allowed length of the characters, if this value is null no check
   * will be perform.
   */
  minCharQuantity: PropTypes.number,

  /**
   * The number of rows of the text area
   */
  rows: PropTypes.number,
  /**
   * If `true` the component is resizable.
   */
  resizable: PropTypes.bool,
  /**
   * Auto-scroll: automatically scroll to the end on value changes.
   * Will stop if the user scrolls up and resume if scrolled to the bottom.
   */
  autoScroll: PropTypes.bool,
  /**
   * If `true` it isn't possible to have more characters than the `maxCharQuantity`
   */
  blockMax: PropTypes.bool,
  /**
   * If `true` the character counter isn't shown even if maxCharQuantity is set.
   */
  hideCounter: PropTypes.bool,

  /**
   * Props passed to the HvCharCount component.
   */
  countCharProps: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvTextArea" })(HvTextArea);
