import React, { isValidElement, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { CloseXS, Info } from "@hitachivantara/uikit-react-icons";
import { HvAdornment, HvBaseInput, HvFormElement, HvHelperText, HvLabel, HvSuggestions } from "..";
import withId from "../withId";
import withLabels from "../withLabels";
import withTooltips from "../withTooltip";
import { isKeypress, KeyboardCodes, setId, useControlled } from "../utils";
import validationTypes from "./validationTypes";
import validationStates, { isInvalid } from "./validationStates";
import { validateCharLength, validateInput, validationIcon } from "./validations";
import styles from "./styles";
import isBrowser from "../utils/browser";

const DEFAULT_LABELS = {
  inputLabel: "",
  placeholder: "",
  infoText: "",
  warningText: "something wrong",
  maxCharQuantityWarningText: "The value is too big",
  minCharQuantityWarningText: "The value is too short",
  requiredWarningText: "The value is required",
  clearButtonLabel: "Clear the text",
};

/**
 * An input is a graphical control element that allows the user to write text.
 */
const HvInput = (props) => {
  const {
    labels,
    classes,
    className,
    id,
    name,
    password = false,
    disabled = false,
    isRequired = false,
    infoIcon = false,
    validationIconVisible = true,
    disableClear = false,
    customFixedIcon,
    validationIconPosition = "right",
    showInfo = true,
    validationType = validationTypes.none,
    validationState: validationStateProp,
    maxCharQuantity,
    minCharQuantity,
    validation,
    externalWarningTextOverride,
    inputProps = {},
    inputRef: inputRefProp,
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

  // validation related state
  const [validationState, setValidationState] = useControlled(
    validationStateProp,
    value ? validationStates.filled : validationStates.empty
  );

  const [warningText, setWarningText] = useControlled(
    externalWarningTextOverride,
    labels.warningText
  );

  const materialInputRef = useRef(null);
  const inputRef = useRef(inputRefProp || null);
  const suggestionRef = useRef({});

  useEffect(() => {
    if (valueProp != null) setValue(valueProp);
  }, [valueProp]);

  useEffect(() => {
    suggestionRef.current = document.getElementById(setId(id, "suggestions"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Updates the states while the input is being entered.
   *
   * @param {String} val - the inputted value.
   * @param {*} warnText - the error text below the input.
   */
  const manageInputValueState = (val, warnText) => {
    setValidationState(() => {
      // this will only run if validationState is uncontrolled
      setWarningText(warnText);

      return val ? validationStates.filled : validationStates.empty;
    });

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
  const handleClear = (event) => {
    const val = "";
    onChange?.(event, val);
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
  const suggestionHandler = (val) => {
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
   * @param val
   */
  const onChangeHandler = (event, val) => {
    const newValue = onChange?.(event, val) ?? val;
    suggestionHandler(val);
    manageInputValueState(newValue, null);
  };

  /**
   * Find the focused element onBlur.
   *
   * @param event
   * @returns {any}
   */
  const getFocusedElement = (event) =>
    isBrowser("ie") ? document.activeElement : event.relatedTarget;

  /**
   * Validates the input updating the state and modifying the info text, also executes
   * the user provided onBlur passing the current validation status and value.
   *
   * @returns {undefined}
   */
  const onInputBlurHandler = (event) => {
    // If the blur is executed when choosing an suggestion it should be ignored.
    if (suggestionRef?.current && suggestionRef?.current.contains(getFocusedElement(event))) return;

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

    setValidationState(() => {
      // this will only run if validationState is uncontrolled
      setWarningText(warningTextResult);

      return validationStateResult;
    });

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

  const getSuggestions = (li) => {
    const listEl = document.getElementById(setId(id, "suggestions-list"));
    return li != null ? listEl?.getElementsByTagName("li")?.[li] : listEl;
  };

  const onSuggestionKeyDown = (event) => {
    if (isKeypress(event, KeyboardCodes.Esc)) {
      suggestionClearHandler();
      focusInput();
    } else if (isKeypress(event, KeyboardCodes.Tab)) {
      suggestionClearHandler();
    }
  };

  /**
   * Focus the suggestion list when the arrow down is pressed.
   *
   * @param {Object} event - The event provided by the material ui input
   */
  const onKeyDownHandler = (event) => {
    if (isKeypress(event, KeyboardCodes.ArrowDown) && !!suggestionValues) {
      const li = getSuggestions(0);
      li?.focus();
    }
    onKeyDown?.(event, value);
  };

  /**
   * Clears the suggestion list on blur.
   *
   * @param {Object} event - The event provided by the material ui input.
   */
  const onContainerBlurHandler = (event) => {
    if (event.relatedTarget) {
      setTimeout(() => {
        const list = getSuggestions();
        if (!list?.contains(document.activeElement)) suggestionClearHandler();
      }, 10);
    }
  };

  const getInputAdornments = (showValidationIcon, showClear) => {
    if (!showValidationIcon && !showClear && !customFixedIcon) return null;

    const customIconEl =
      isValidElement(customFixedIcon) &&
      React.cloneElement(customFixedIcon, {
        className: clsx(classes.icon, customFixedIcon.props.className),
      });

    return (
      <div className={classes.adornmentsBox} aria-hidden="true">
        <HvAdornment
          className={clsx(classes.adornmentButton, classes.iconClear)}
          isVisible={showClear}
          onClick={handleClear}
          onMouseDown={handleClear}
          title={labels.clearButtonLabel}
          aria-label={labels.clearButtonLabel}
          icon={<CloseXS />}
        />

        {(showValidationIcon && validationIcon(validationState, classes.icon)) || customIconEl}
      </div>
    );
  };

  const isStateInvalid = isInvalid(validationState);
  const hasValidation =
    isStateInvalid ||
    validationType !== validationTypes.none ||
    maxCharQuantity != null ||
    minCharQuantity != null ||
    validation != null;

  // show the validation icon only if the input is enabled, validationIconVisible and showInfo are true and:
  // - the input has some sort of validation
  // - also if states is invalid (even if there is no validation, because that would mean it had to be explicitly set like that)
  const showValidationIcon = !disabled && validationIconVisible && showInfo && hasValidation;

  // show the clear button only if the input is enabled, disableClear is false and the input is not empty
  const showClear = !disabled && !disableClear && value != null && value !== "";

  const adornments = getInputAdornments(showValidationIcon, showClear);

  const IconDisplay = () => (
    <div aria-hidden="true" className={classes.infoIconContainer}>
      <Info />
    </div>
  );
  const InfoIcon = withTooltips(IconDisplay, labels.infoText);
  const showInfoIcon = showInfo && infoIcon && labels.infoText;

  return (
    <HvFormElement
      id={id}
      name={name}
      className={clsx(classes.root, className)}
      onBlur={onContainerBlurHandler}
      value={value}
      disabled={disabled}
    >
      <div className={classes.labelContainer}>
        {labels.inputLabel && (
          <HvLabel
            id={setId(id, "label")}
            htmlFor={setId(id, "input")}
            aria-disabled={disabled}
            className={clsx(classes.label, {
              [classes.labelDisabled]: disabled,
            })}
            label={
              <>
                {labels.inputLabel}
                {isRequired && <span aria-hidden="true">*</span>}
              </>
            }
          />
        )}

        {showInfoIcon && <InfoIcon />}
      </div>

      <HvBaseInput
        id={setId(id, "input")}
        autoFocus={autoFocus}
        onKeyDown={onKeyDownHandler}
        onBlur={onInputBlurHandler}
        onFocus={onFocusHandler}
        placeholder={labels.placeholder || undefined}
        type={password ? "password" : "text"}
        classes={{
          input: classes.input,
          inputRoot: classes.inputRoot,
          inputRootFocused: classes.inputRootFocused,
          inputDisabled: classes.inputDisabled,
          multiLine: classes.multiLine,
        }}
        className={clsx({
          [classes.inputRootDisabled]: disabled,
          [classes.inputRootInvalid]: isStateInvalid,
        })}
        invalid={isStateInvalid}
        required={isRequired}
        onChange={onChangeHandler}
        inputProps={{
          ref: materialInputRef,
          ...inputProps,
        }}
        inputRef={inputRefProp || inputRef}
        {...(validationIconPosition === "right" && {
          endAdornment: adornments,
        })}
        {...(validationIconPosition === "left" && {
          startAdornment: adornments,
        })}
        {...others}
      />

      <HvSuggestions
        id={setId(id, "suggestions")}
        classes={{
          root: classes.suggestionsContainer,
          list: classes.suggestionList,
        }}
        expanded={!!suggestionValues}
        anchorEl={inputRef?.current?.parentElement}
        onClose={suggestionClearHandler}
        onKeyDown={onSuggestionKeyDown}
        onSuggestionSelected={suggestionSelectedHandler}
        suggestionValues={suggestionValues}
      />

      <HvHelperText
        id={setId(id, "description")}
        {...(!isStateInvalid && (showInfoIcon || !labels.infoText)
          ? { style: { display: "none" } }
          : {})}
        className={clsx(classes.infoText, {
          [classes.infoIcon]: infoIcon,
        })}
        notification={isStateInvalid ? warningText : ""}
      >
        {labels.infoText}
      </HvHelperText>
    </HvFormElement>
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
   * Component name identifier to be used in the context.
   */
  name: PropTypes.string,
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
    infoIcon: PropTypes.string,
    /**
     * Styles applied to the input adornment icons.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon used to clean the input.
     */
    iconClear: PropTypes.string,
    adornmentsBox: PropTypes.string,
    adornmentButton: PropTypes.string,
    /**
     * IE11 specific styling.
     */
    "@global": PropTypes.string,
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
    clearButtonLabel: PropTypes.string,
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
  externalWarningTextOverride: PropTypes.string,
};

export default withStyles(styles, { name: "HvInput" })(withLabels(DEFAULT_LABELS)(withId(HvInput)));
