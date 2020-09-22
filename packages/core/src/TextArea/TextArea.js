import React, { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { setId } from "../utils";
import { HvFormElement, HvBaseInput, HvLabel, HvWarningText, HvCharCounter } from "..";
import { validateCharLength } from "../Input/validations";
import styles from "./styles";
import withLabels from "../withLabels";

const DEFAULT_LABELS = {
  inputLabel: "",
  placeholder: "",
  warningText: "",
  maxCharQuantityWarningText: "",
  requiredWarningText: "",
  middleCount: "/"
};

const VALIDATION_STATES = {
  standBy: "standBy",
  invalid: "invalid"
};

/**
 * A text area component wrapping the input box, it allows the input of paragraph of text.
 * alongside this it can provide a validation for the max character quantity
 */
const HvTextArea = props => {
  const {
    classes,
    className = "",
    name,
    id,
    labels,
    maxCharQuantity,
    rows = 1,
    initialValue,
    validationState: validationStateProp,
    value: valueProp,
    isRequired = false,
    disabled = false,
    resizable = false,
    autoScroll = false,
    validation,
    onChange,
    onBlur,
    blockMax = false,
    countCharProps,
    formElementProps,
    warningProps,
    labelProps,
    ...others
  } = props;

  const isOverflow = currentValue =>
    isNil(maxCharQuantity) ? false : currentValue.length > maxCharQuantity;

  /**
   * Limit the string to the maxCharQuantity length.
   *
   * @param value - string to evaluate
   * @returns {string|*} - string according the limit
   */
  const limitValue = currentValue => {
    if (currentValue === undefined || !blockMax) return currentValue;
    return !isOverflow(currentValue) ? currentValue : currentValue.substring(0, maxCharQuantity);
  };

  const isInvalid = compareState => compareState === VALIDATION_STATES.invalid;
  const textInputRef = useRef(null);
  const [value, setValue] = useState(initialValue);
  const [currentValueLength, setCurrentValueLength] = useState(
    initialValue !== undefined ? limitValue(initialValue).length : 0
  );
  const [validationState, setValidationState] = useState(
    validationStateProp || VALIDATION_STATES.standBy
  );
  const [warningText, setWarningText] = useState(
    isInvalid(validationStateProp) ? labels.warningText : null
  );
  const [overflow, setOverflow] = useState(initialValue ? isOverflow(initialValue) : false);
  const [autoScrolling, setAutoScrolling] = useState(autoScroll);

  const isScrolledDown = () => {
    const el = textInputRef.current;
    return el == null || el.scrollHeight - el.scrollTop === el.clientHeight;
  };

  const scrollDown = () => {
    const el = textInputRef.current;
    if (el != null) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  };

  const addScrollListener = useCallback(() => {
    const scrollHandler = {
      handleEvent: () => {
        setAutoScrolling(isScrolledDown());
      }
    };
    textInputRef.current.addEventListener("scroll", scrollHandler);
  }, []);

  const checkEmptyValue = (valueToTest = "") => {
    let validationStateResult = VALIDATION_STATES.standBy;
    let warningTextResult = null;
    if (!valueToTest && isRequired) {
      validationStateResult = VALIDATION_STATES.invalid;
      warningTextResult = labels.requiredWarningText;
    }
    return {
      validationStateResult,
      warningTextResult
    };
  };

  const validateValue = useCallback(
    (valueToTest = "") => {
      let validationStateResult;
      let warningTextResult = null;

      if (
        validationStateProp === VALIDATION_STATES.invalid ||
        validation?.(valueToTest) === false
      ) {
        // testing for false because if undefined validation does not exist
        return {
          validationStateResult: VALIDATION_STATES.invalid,
          warningTextResult: labels.warningText
        };
      }
      const isValidLength = validateCharLength(valueToTest, maxCharQuantity, null);

      if (isValidLength) {
        validationStateResult = VALIDATION_STATES.standBy;
      } else if (!isValidLength) {
        validationStateResult = VALIDATION_STATES.invalid;
        warningTextResult = labels.maxCharQuantityWarningText;
      }

      return {
        validationStateResult,
        warningTextResult
      };
    },
    [labels, maxCharQuantity, validation, validationStateProp]
  );

  /**
   * Validates the text area updating the state and modifying the warning text, also executes
   * the user provided onBlur passing the current validation status and value.
   *
   * @returns {undefined}
   */
  const onContainerBlurHandler = event => {
    if (event.relatedTarget) return;
    const emptyResult = checkEmptyValue(value);
    const validationResult = validateValue(value);
    const wText = emptyResult.warningTextResult || validationResult.warningTextResult;
    const vResult = emptyResult.warningTextResult
      ? emptyResult.validationStateResult
      : validationState.validationStateResult;
    setValidationState(vResult);
    setWarningText(wText);
    onBlur?.(event, value, vResult);
  };

  /**
   * Updates the length of the string while is being inputted, also executes the user onChange
   * allowing the customization of the input if required.
   *
   * @param {String} value - The value provided by the HvInput
   */
  const onChangeHandler = (event, currentValue) => {
    const limitedValue = blockMax ? limitValue(currentValue) : currentValue;
    onChange?.(event, limitedValue);
    setValue(limitedValue);
    setCurrentValueLength(limitedValue.length);
    setOverflow(isOverflow(limitedValue));
  };

  useEffect(() => {
    if (autoScroll) {
      addScrollListener();
      scrollDown();
    }
    if (autoScrolling) {
      scrollDown();
    }
    const valueToUse = valueProp || value || "";
    const { validationStateResult, warningTextResult } = validateValue(valueToUse);
    setCurrentValueLength(valueToUse?.length);
    setValidationState(validationStateResult);
    setWarningText(warningTextResult);
  }, [autoScroll, autoScrolling, value, valueProp, validateValue, addScrollListener]);

  const isStateInvalid = isInvalid(validationState);

  return (
    <HvFormElement
      id={id}
      name={name}
      className={clsx(classes.root, className, { [classes.rootResizable]: resizable })}
      onBlur={onContainerBlurHandler}
      value={valueProp || value}
      status={validationStateProp || validationState}
      disabled={disabled}
      {...formElementProps}
    >
      <div className={classes.labelContainer}>
        {labels.inputLabel && (
          <HvLabel
            id={setId(id, "label")}
            htmlFor={setId(id, "input")}
            aria-disabled={disabled}
            label={
              <>
                {labels.inputLabel}
                {isRequired && <span aria-hidden="true">*</span>}
              </>
            }
            {...labelProps}
          />
        )}
        {maxCharQuantity && (
          <HvCharCounter
            id={setId(id, "charCounter")}
            separator={labels.middleCount}
            currentCharQuantity={currentValueLength}
            maxCharQuantity={maxCharQuantity}
            {...countCharProps}
          />
        )}
      </div>
      <HvBaseInput
        className={className}
        id={setId(id, "input")}
        onChange={onChangeHandler}
        placeholder={labels.placeholder}
        resizable={resizable}
        multiline
        rows={rows}
        inputRef={textInputRef}
        aria-invalid={overflow || undefined}
        {...others}
      />
      <HvWarningText disableBorder id={setId(id, "warning")} {...warningProps}>
        {isStateInvalid ? warningText : ""}
      </HvWarningText>
    </HvFormElement>
  );
};

HvTextArea.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Component name identifier to be used in the context.
   */
  name: PropTypes.string,
  /**
   * The current state of the text area.
   */
  validationState: PropTypes.oneOf(["standBy", "invalid"]),
  /**
   * If `true` the the text area value must be filled on blur or else the validation fails.
   */
  isRequired: PropTypes.bool,
  /**
   *  Styles applied to the Drawer Paper element.
   */
  classes: PropTypes.PropTypes.shape({
    /**
     * Style applied on the text area input box.
     */
    input: PropTypes.string,
    /**
     * Style applied when resizable is `true`. Can be used to set max/min width.
     */
    resize: PropTypes.string,
    /**
     * Style applied to the root when resizable is `true`.
     */
    rootResizable: PropTypes.string,
    /**
     * Styles applied to input root which is comprising of everything but the labels and descriptions.
     */
    inputRoot: PropTypes.string,
    /**
     * Styles applied to input root when it is disabled.
     */
    inputRootDisabled: PropTypes.string,
    /**
     * Styles applied to input root when it is focused.
     */
    inputRootFocused: PropTypes.string,
    /**
     * Styles applied to text area container that holds the label and counter.
     */
    labelContainer: PropTypes.string,
    /**
     * Style applied defining the width when resizable is `false`.
     */
    defaultWith: PropTypes.string,
    /**
     * Style applied on the character counter.
     */
    characterCounter: PropTypes.string,
    /**
     * Style applied to the character counter when it is disabled.
     */
    disabled: PropTypes.string,
    /**
     * Style applied to the character counter when it the `maxCharQuantity` is reach.
     */
    invalid: PropTypes.string,
    /**
     * Style applied to the input container.
     */
    container: PropTypes.string,
    /**
     * Style applied container of the text area component.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * An Object containing the various text associated with the input.
   */
  labels: PropTypes.shape({
    /**
     * The label on top of the input.
     */
    inputLabel: PropTypes.string,
    /**
     * The placeholder value of the input.
     */
    placeholder: PropTypes.string,
    /**
     * The default value of the info text below the input.
     */
    infoText: PropTypes.string,
    /**
     * The value when a validation fails.
     */
    warningText: PropTypes.string,
    /**
     * The message that appears when there are too many characters.
     */
    maxCharQuantityWarningText: PropTypes.string,
    /**
     * The message that appears when there are too few characters.
     */
    minCharQuantityWarningText: PropTypes.string,
    /**
     * The message that appears when the input is empty and required.
     */
    requiredWarningText: PropTypes.string,
    /**
     * Text between the current char counter and max value.
     */
    middleCount: PropTypes.string
  }),
  /**
   * The maximum allowed length of the characters, if this value is null or undefined no check
   * will be performed.
   */
  maxCharQuantity: PropTypes.number,
  /**
   * The number of rows of the text area
   */
  rows: PropTypes.number,
  /**
   * The input value to be set. If used it is the responsibility of the caller to maintain the state.
   */
  value: PropTypes.string,
  /**
   * The initial value of the input.
   */
  initialValue: PropTypes.string,
  /**
   * The function that will be executed onChange, allows modification of the input,
   * it receives the value. If a new value should be presented it must returned it.
   */
  onChange: PropTypes.func,
  /**
   * The custom validation function, it receives the value and must return
   * either `true` for valid or `false` for invalid, default validations would only
   * occur if this function is null or undefined
   */
  validation: PropTypes.func,
  /**
   * The function that will be executed onBlur, allows checking the validation state,
   * it receives the value and the validation state (`empty`, `filled`, `invalid`, `valid`).
   */
  onBlur: PropTypes.func,
  /**
   * If `true` the text area is disabled.
   */
  disabled: PropTypes.bool,
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
   * Props passed to the HvbaseInput component.
   */
  formElementProps: PropTypes.instanceOf(Object),
  /**
   * Props passed to the HvCharCount component.
   */
  countCharProps: PropTypes.instanceOf(Object),
  /**
   * Props passed to the HvLabel component.
   */
  labelProps: PropTypes.instanceOf(Object),
  /**
   * Props passed to the HvWarning component.
   */
  warningProps: PropTypes.instanceOf(Object)
};

export default withStyles(styles, { name: "HvTextArea" })(withLabels(DEFAULT_LABELS)(HvTextArea));
