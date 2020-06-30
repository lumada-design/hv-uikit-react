import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Input, withStyles } from "@material-ui/core";
import { Info } from "@hv/uikit-react-icons";
import { HvList, HvTypography } from "..";
import withId from "../withId";
import withLabels from "../withLabels";
import withTooltips from "../withTooltip";
import { isKeypress, KeyboardCodes, setId } from "../utils";
import isBrowser from "../utils/browser";
import InputAdornment from "./InputAdornment";
import validationTypes from "./validationTypes";
import validationStates from "./validationStates";
import { validateCharLength, validateInput } from "./validations";
import styles from "./styles";

const DEFAULT_LABELS = {
  inputLabel: "",
  placeholder: "",
  infoText: "",
  warningText: "something wrong",
  maxCharQuantityWarningText: "The value is too big",
  minCharQuantityWarningText: "The value is too short",
  requiredWarningText: "The value is required",
  clearButtonLabel: "Clear the text"
};

/**
 * An input is a graphical control element that allows the user to write text.
 */
const HvInput = props => {
  const {
    labels,
    classes,
    className,
    id,
    password = false,
    disabled = false,
    isRequired = false,
    infoIcon = false,
    validationIconVisible = true,
    disableClear = false,
    customFixedIcon,
    validationIconPosition = "right",
    showInfo = true,
    validationType = "none",
    validationState: validationStateProp = validationStates.empty,
    maxCharQuantity,
    minCharQuantity,
    validation,
    externalWarningTextOverride,
    inputProps = {},
    inputRef,
    onChange = (e, val) => val,
    onBlur,
    onFocus,
    onKeyDown,
    suggestionSelectedCallback,
    suggestionListCallback,
    value: valueProp,
    autoFocus = false,
    initialValue,
    ...others
  } = props;
  const [value, setValue] = useState(valueProp || initialValue);
  const [suggestionValues, setSuggestionValues] = useState(null);
  const [warningText, setWarningText] = useState(
    validationStateProp === validationStates.invalid ? labels.warningText : null
  );
  const materialInputRef = useRef(null);
  const listRef = useRef(null);

  const [validationState, setValidationState] = useState(validationStateProp);
  const [currentValidationStateProps, setCurrentValidationStateProps] = useState(
    validationStateProp
  );

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  useEffect(() => {
    if (validationStateProp && validationStateProp !== currentValidationStateProps) {
      setValidationState(validationStateProp);

      // TODO: review. redundant? keep state instead of new prop?
      setCurrentValidationStateProps(
        validationStateProp !== currentValidationStateProps
          ? currentValidationStateProps
          : validationState
      );
    }
  }, [validationStateProp]);

  /**
   * Updates the states while the input is being entered.
   *
   * @param {String} val - the inputted value.
   * @param {*} warnText - the error text below the input.
   */
  const manageInputValueState = (val, warnText) => {
    setValidationState(val ? validationStates.filled : validationStates.empty);
    setWarningText(warnText);
    setValue(val);
  };

  /**
   * Looks for the node that represent the input inside the material tree and focus it.
   */
  const focusInput = () => {
    materialInputRef.current.focus();
  };

  /**
   * Clears the input value from the state and refocus the input.
   *
   * Note: given than the input component from material doesn't offer any api to focus
   * this timeout with a node focus was used to solve the problem
   * because the reference to the input is lost when the component is updated.
   */
  const handleClear = () => {
    const val = "";
    onChange(null, val);
    manageInputValueState(val, null);
    setTimeout(() => {
      focusInput();
    });
  };

  /**
   * Clears the suggestion array.
   */
  const suggestionClearHandler = () => {
    setSuggestionValues(null);
  };

  /**
   * Fills of the suggestion array.
   */
  const suggestionHandler = val => {
    const suggestionsArray = suggestionListCallback?.(val);
    if (suggestionsArray?.[0]?.label) {
      setSuggestionValues(suggestionsArray);
    } else {
      suggestionClearHandler();
    }
  };

  /**
   * Executes the user callback adds the selection to the state and clears the suggestions.
   */
  const suggestionSelectedHandler = (event, item) => {
    manageInputValueState(item.label);
    focusInput();
    suggestionClearHandler();
    suggestionSelectedCallback(item);
  };

  /**
   * Updates the state while is being inputted, also executes the user onChange
   * allowing the customization of the input if required.
   *
   * @param {Object} event - The event provided by the material ui input
   */
  const onChangeHandler = event => {
    const val = event.target.value;
    const newValue = onChange?.(event, val) ?? val;
    suggestionHandler(val);
    manageInputValueState(newValue, null);
  };

  /**
   * Validates the input updating the state and modifying the info text, also executes
   * the user provided onBlur passing the current validation status and value.
   *
   * @returns {undefined}
   */
  const onInputBlurHandler = () => {
    let validationStateResult;
    let warningTextResult = null;

    if (!value) {
      if (isRequired) {
        validationStateResult = validationStates.invalid;
        warningTextResult = labels.requiredWarningText;
      } else {
        validationStateResult = validationStates.empty;
      }
    } else {
      const valueSizeStatus = validateCharLength(value, maxCharQuantity, minCharQuantity);
      const valid = validateInput(value, validation, validationType);

      if (valid && valueSizeStatus) {
        validationStateResult = validationStates.valid;
      } else if (!valid || !valueSizeStatus) {
        validationStateResult = validationStates.invalid;

        if (maxCharQuantity && value.length > maxCharQuantity) {
          warningTextResult = labels.maxCharQuantityWarningText;
        } else if (minCharQuantity && value.length < minCharQuantity) {
          warningTextResult = labels.minCharQuantityWarningText;
        } else {
          warningTextResult = labels.warningText;
        }
      }
    }

    setValidationState(validationStateResult);
    setWarningText(warningTextResult);
    onBlur?.(value, validationStateResult);
  };

  /**
   * Updates the state putting again the value from the state because the input value is
   * not automatically manage, it also executes the onFocus function from the user passing the value
   */
  const onFocusHandler = () => {
    manageInputValueState(value, null);
    onFocus?.(value);
  };

  /**
   * Focus the suggestion list when the arrow down is pressed.
   *
   * @param {Object} event - The event provided by the material ui input
   */
  const onKeyDownHandler = event => {
    if (isKeypress(event, KeyboardCodes.ArrowDown)) {
      console.log(listRef);
      // console.log(listRef.current);
      listRef?.current?.getElementsByTagName("li")[0].focus();
    }
    onKeyDown?.(event, value);
  };

  /**
   * Clears the suggestion list on blur.
   *
   * @param {Object} event - The event provided by the material ui input.
   */
  const onContainerBlurHandler = event => {
    if (event.relatedTarget) {
      // workaround because IE 11
      if (isBrowser("ie")) {
        setTimeout(suggestionClearHandler, 100);
      } else {
        suggestionClearHandler();
      }
    }
  };

  const getInputAdornment = (inputId, showValidationIcon, showClear, clearButtonLabel) => {
    if (!showValidationIcon && !showClear && customFixedIcon) {
      // nothing to show
      return null;
    }

    return (
      <InputAdornment
        inputId={inputId}
        classes={classes}
        showValidationIcon={showValidationIcon}
        validationState={validationState}
        showClear={showClear}
        handleClear={handleClear}
        clearButtonLabel={clearButtonLabel}
        customFixedIcon={customFixedIcon}
      />
    );
  };

  // show the validation icon only if the input is enabled, validationIconVisible and showInfo are true and:
  // - the input have some sort of validation
  // - also if states is invalid (even if there is no validation, because that would mean it had to be explicity set like that)
  const showValidationIcon =
    !disabled &&
    validationIconVisible &&
    showInfo &&
    (validationState === validationStates.invalid ||
      validationType !== validationTypes.none ||
      maxCharQuantity !== null ||
      minCharQuantity !== null ||
      validation !== null);

  // show the clear button only if the input is enabled, disableClear is false and the input is not empty
  const showClear = !disabled && !disableClear && value != null && value !== "";

  const adornment = getInputAdornment(
    setId(id, "input"),
    showValidationIcon,
    showClear,
    labels.clearButtonLabel
  );

  const IconDisplay = () => (
    <div aria-hidden="true" className={classes.infoIconContainer}>
      <Info />
    </div>
  );
  const InfoIcon = withTooltips(IconDisplay, labels.infoText);

  return (
    <div className={clsx(classes.root, className)} id={id} onBlur={onContainerBlurHandler}>
      <div className={classes.labelContainer}>
        {labels.inputLabel && (
          <HvTypography
            variant="labelText"
            component="label"
            id={setId(id, "label")}
            htmlFor={setId(id, "input")}
            aria-disabled={disabled}
            className={clsx(classes.label, {
              [classes.labelDisabled]: disabled
            })}
          >
            {labels.inputLabel}
            {isRequired && <span aria-hidden="true">*</span>}
          </HvTypography>
        )}

        {showInfo && infoIcon && labels.infoText && <InfoIcon />}
      </div>

      <Input
        id={setId(id, "input")}
        aria-describedby={showInfo && labels.infoText ? setId(id, "description") : undefined}
        autoFocus={autoFocus}
        onKeyDown={onKeyDownHandler}
        onBlur={onInputBlurHandler}
        onFocus={onFocusHandler}
        value={value}
        disabled={disabled}
        placeholder={labels.placeholder || undefined}
        type={password ? "password" : "text"}
        classes={{
          input: classes.input,
          focused: classes.inputRootFocused,
          disabled: classes.inputDisabled,
          multiline: classes.multiLine
        }}
        className={clsx(classes.inputRoot, {
          [classes.inputRootDisabled]: disabled,
          [classes.inputRootInvalid]: validationState === validationStates.invalid
        })}
        onChange={onChangeHandler}
        inputProps={{
          required: isRequired,
          ref: materialInputRef,
          "aria-required": isRequired || undefined,
          "aria-invalid": validationState === validationStates.invalid || undefined,
          ...inputProps
        }}
        inputRef={inputRef}
        {...(validationIconPosition === "right" && {
          endAdornment: adornment
        })}
        {...(validationIconPosition === "left" && {
          startAdornment: adornment
        })}
        {...others}
      />

      {suggestionValues && (
        <div className={classes.suggestionsContainer}>
          <div ref={listRef} className={classes.suggestionList}>
            <HvList
              values={suggestionValues}
              onClick={suggestionSelectedHandler}
              selectable={false}
              condensed
            />
          </div>
        </div>
      )}

      {showInfo && labels.infoText && (
        <HvTypography
          id={setId(id, "description")}
          variant="infoText"
          className={clsx(classes.infoText)}
          style={{
            display: !infoIcon && validationState !== validationStates.invalid ? "block" : "none"
          }}
        >
          {labels.infoText}
        </HvTypography>
      )}

      <HvTypography
        variant="sText"
        className={clsx(classes.textWarning, classes.infoText, {
          [classes.showText]:
            validationState === validationStates.invalid &&
            (externalWarningTextOverride || warningText)
        })}
        aria-live="polite"
        aria-controls={setId(id, "input")}
        aria-atomic="true"
        aria-relevant="additions text"
        aria-labelledby={labels.inputLabel ? setId(id, "label") : null}
      >
        {externalWarningTextOverride || warningText || ""}
      </HvTypography>
    </div>
  );
};

HvInput.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root container of the input.
     */
    root: PropTypes.string,
    /**
     * Styles applied to input root which is comprising of everything but the labels and descriptions.
     */
    inputRoot: PropTypes.string,
    /**
     * Styles applied to input root when it is disabled.
     */
    inputRootDisabled: PropTypes.string,
    /**
     * Styles applied to input root when it is invalid.
     */
    inputRootInvalid: PropTypes.string,
    /**
     * Styles applied to input root when it is focused.
     */
    inputRootFocused: PropTypes.string,
    /**
     * Styles applied to input html element.
     */
    input: PropTypes.string,
    /**
     * Styles applied to input html element when it is disabled.
     */
    inputDisabled: PropTypes.string,
    /**
     * Styles applied to the container of the suggestions list.
     */
    suggestionsContainer: PropTypes.string,
    /**
     * Styles applied to the suggestions list.
     */
    suggestionList: PropTypes.string,
    /**
     * Styles applied to input html element when it is multiline mode.
     */
    multiLine: PropTypes.string,
    /**
     * Styles applied to the label element.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the label element when it is disabled.
     */
    labelDisabled: PropTypes.string,
    /**
     * Styles applied to the container of the labels elements.
     */
    labelContainer: PropTypes.string,
    /**
     * Styles applied to the icon information container.
     */
    infoIconContainer: PropTypes.string,
    /**
     * Styles applied to the icon information text.
     */
    infoText: PropTypes.string,
    /**
     * Styles applied to the description.
     */
    text: PropTypes.string,
    /**
     * Styles applied to the description when it is showing an information.
     */
    textInfo: PropTypes.string,
    /**
     * Styles applied to the description when it is showing a warning.
     */
    textWarning: PropTypes.string,
    /**
     * Styles applied when the text should be shown.
     */
    showText: PropTypes.string,
    /**
     * Styles applied to the input adornment icons.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon used to clean the input.
     */
    iconClear: PropTypes.string,
    /**
     * IE11 specific styling.
     */
    "@global": PropTypes.string
  }).isRequired,
  /**
   * An Object containing the various texts associated with the input.
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
     * The label of the clear button.
     */
    clearButtonLabel: PropTypes.string
  }),
  /**
   * Attributes applied to the input element.
   */
  inputProps: PropTypes.instanceOf(Object),
  /**
   * Allows passing a ref to the underlying input
   */
  inputRef: PropTypes.shape({ current: PropTypes.any }),
  /**
   * If ´true´ the input is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If ´true´ the input value must be filled on blur or else the validation fails.
   */
  isRequired: PropTypes.bool,
  /**
   * If ´true´ the input is of type password hiding the value.
   */
  password: PropTypes.bool,
  /**
   * The function that will be executed onChange, allows modification of the input,
   * it receives the value. If a new value should be presented it must returned it.
   */
  onChange: PropTypes.func,
  /**
   * The function that will be executed onBlur, allows checking the validation state,
   * it receives the value and the validation state (´empty´, ´filled´, ´invalid´, ´valid´).
   */
  onBlur: PropTypes.func,
  /**
   * The function that will be executed onBlur, allows checking the value state,
   * it receives the value.
   */
  onFocus: PropTypes.func,
  /**
   * The function that will be executed onKeyDown, allows checking the value state,
   * it receives the event and value.
   */
  onKeyDown: PropTypes.func,
  /**
   * The function that will be executed to received an array of objects that has a label and id to create list of suggestion
   */
  suggestionListCallback: PropTypes.func,
  /**
   * The function that will be executed after selecting a value in the suggestion list
   */
  suggestionSelectedCallback: PropTypes.func,
  /**
   * If `true` information label is shown, `false` otherwise.
   */
  showInfo: PropTypes.bool,
  /**
   * The custom validation function, it receives the value and must return
   * either ´true´ for valid or ´false´ for invalid, default validations would only
   * occur if this function is null or undefined
   */
  validation: PropTypes.func,
  /**
   * The value of the input, when controlled.
   */
  value: PropTypes.string,
  /**
   * The initial value of the input, when uncontrolled.
   */
  initialValue: PropTypes.string,
  /**
   * If `true` it should autofocus.
   */
  autoFocus: PropTypes.bool,
  /**
   * The initial state of the input.
   * note: Is recommended you use the provided validationStates object to set this value.
   */
  validationState: PropTypes.oneOf(["empty", "filled", "invalid", "valid"]),
  /**
   * Show info icon with info label.infoText.
   */
  infoIcon: PropTypes.bool,
  /**
   * If `true` the validation icon is visible, `false` otherwise
   */
  validationIconVisible: PropTypes.bool,
  /**
   * If `true` the clear button is disabled if `false` is enable
   */
  disableClear: PropTypes.bool,
  /**
   * The icon position of the input. It is recommended to use the provided validationIconPosition object to set this value.
   */
  validationIconPosition: PropTypes.oneOf(["left", "right"]),
  /**
   * a custom icon to be added into the input.
   */
  customFixedIcon: PropTypes.node,
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
   * Which type of default validation should the input perform. It is recommended to use the provided ValidationTypes object to set this value.
   */
  validationType: PropTypes.oneOf(["none", "number", "email"]),
  /**
   * Overrides any validation with a specific error/warning message to set in the warningText slot.
   */
  externalWarningTextOverride: PropTypes.string
};

export default withStyles(styles, { name: "HvInput" })(withLabels(DEFAULT_LABELS)(withId(HvInput)));
