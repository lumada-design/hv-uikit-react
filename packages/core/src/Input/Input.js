import React, { isValidElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { withStyles } from "@material-ui/core";

import { CloseXS, PreviewOff, Preview, Search, Success } from "@hv/uikit-react-icons";

import {
  HvTypography,
  HvTooltip,
  HvAdornment,
  HvBaseInput,
  HvFormElement,
  HvLabel,
  HvSuggestions,
  HvWarningText,
  HvInfoMessage,
  useUniqueId,
} from "..";

import { isBrowser, isKeypress, KeyboardCodes, setId, useControlled, useLabels } from "../utils";

import validationStates, { isValid, isInvalid } from "../Forms/FormElement/validationStates";
import {
  DEFAULT_ERROR_MESSAGES,
  computeValidationType,
  hasBuiltInValidations,
  validateInput,
  computeValidationState,
  computeValidationMessage,
} from "../BaseInput/validations";

import styles from "./styles";

const DEFAULT_LABELS = {
  clearButtonLabel: "Clear the text",

  revealPasswordButtonLabel: "Reveal password",
  revealPasswordButtonClickToShowTooltip: "Click to show password.",
  revealPasswordButtonClickToHideTooltip: "Click to hide password.",

  searchButtonLabel: "Search",
};

/**
 * Find the focused element onBlur.
 */
const getFocusedElement = (event) =>
  isBrowser("ie") ? document.activeElement : event.relatedTarget;

function eventTargetIsInsideContainer(container, event) {
  return container != null && container.contains(getFocusedElement(event));
}

/**
 * An input is a graphical control element that allows the user to write text.
 */
const HvInput = (props) => {
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
    onEnter,

    status,
    statusMessage,

    type = "text",

    placeholder,

    autoFocus = false,

    labels: labelsProp,

    validationMessages,

    disableClear = false,
    disableRevealPassword = false,
    disableSearchButton = false,

    endAdornment,

    maxCharQuantity,
    minCharQuantity,
    validation,

    showValidationIcon = false,

    suggestionListCallback,

    inputRef: inputRefProp,
    onBlur,
    onFocus,
    onKeyDown,

    inputProps = {},

    ...others
  } = props;

  const labels = useLabels(DEFAULT_LABELS, labelsProp);
  const elementId = useUniqueId(id, "hvinput");

  const inputRef = useRef(inputRefProp || null);

  const [focused, setFocused] = React.useState(false);

  // signals that the user has manually edited the input value
  const isDirty = useRef(false);

  // value related state
  const [value, setValue] = useControlled(valueProp, defaultValue);

  const isEmptyValue = value == null || value === "";

  // validation related state
  const [validationState, setValidationState] = useControlled(status, validationStates.standBy);

  const [validationMessage, setValidationMessage] = useControlled(statusMessage, "");

  // validationMessages reference tends to change, as users will not useState for it;
  // dependencies must be more explicit and:
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const errorMessages = useMemo(() => ({ ...DEFAULT_ERROR_MESSAGES, ...validationMessages }), [
    validationMessages?.error,
    validationMessages?.requiredError,
    validationMessages?.minCharError,
    validationMessages?.maxCharError,
    validationMessages?.typeMismatchError,
  ]);

  const validationType = useMemo(() => computeValidationType(type), [type]);

  // validates the input, sets the status and the statusMessage accordingly (if uncontrolled)
  // and returns the validity state of the input.
  const performValidation = useCallback(() => {
    const inputValidity = validateInput(
      inputRef.current,
      value,
      required,
      minCharQuantity,
      maxCharQuantity,
      validationType,
      validation
    );

    // this will only run if status is uncontrolled
    setValidationState(computeValidationState(inputValidity, isEmptyValue));

    // this will only run if statusMessage is uncontrolled
    setValidationMessage(computeValidationMessage(inputValidity, errorMessages));

    return inputValidity;
  }, [
    errorMessages,
    isEmptyValue,
    maxCharQuantity,
    minCharQuantity,
    required,
    setValidationMessage,
    setValidationState,
    validation,
    validationType,
    value,
  ]);

  // error message area will only be needed if the status property is being controlled
  // or if any of the built-in validations are active
  const canShowError =
    status !== undefined ||
    hasBuiltInValidations(
      required,
      validationType,
      minCharQuantity,
      maxCharQuantity,
      validation,
      inputProps
    );

  const isStateInvalid = isInvalid(validationState);

  // input type related state
  const [revealPassword, setRevealPassword] = useState(false);

  const realType = useMemo(() => {
    if (type === "password") {
      return revealPassword ? "text" : "password";
    }

    if (type === "search") {
      return "search";
    }

    return "text";
  }, [revealPassword, type]);

  // suggestions related state
  const [suggestionValues, setSuggestionValues] = useState(null);

  const canShowSuggestions = suggestionListCallback != null;
  const hasSuggestions = !!suggestionValues;

  const materialInputRef = useRef(null);
  const suggestionRef = useRef({});

  useEffect(() => {
    // TODO Replace with ref
    suggestionRef.current = document.getElementById(setId(elementId, "suggestions"));
  }, [elementId]);

  // miscellaneous state
  const hasLabel = label != null;
  const hasDescription = description != null;

  /**
   * Looks for the node that represent the input inside the material tree and focus it.
   */
  const focusInput = () => {
    materialInputRef.current.focus();
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
    const newValue = item.value || item.label;

    // set the input value (only when value is uncontrolled)
    setValue(newValue);

    onChange?.(event, newValue);

    focusInput();
    suggestionClearHandler();

    if (type === "search") {
      // trigger the onEnter callback when the user selects an option in a search box
      onEnter?.(event, newValue);
    }
  };

  const onChangeHandler = (event, newValue) => {
    isDirty.current = true;

    // set the input value (only when value is uncontrolled)
    setValue(newValue);

    onChange?.(event, newValue);

    // an edge case might be a controlled input whose onChange callback
    // doesn't change the value (or sets another): the suggestionListCallback
    // callback will still receive the original rejected value.
    // a refactor is needed so the suggestionListCallback might be called only
    // when the input is uncontrolled, providing a way to externally control
    // the suggestion values.
    suggestionHandler(newValue);
  };

  /**
   * Validates the input updating the state and modifying the info text, also executes
   * the user provided onBlur passing the current validation status and value.
   *
   * @returns {undefined}
   */
  const onInputBlurHandler = (event) => {
    // If the blur is executed when choosing an suggestion it should be ignored.
    if (eventTargetIsInsideContainer(suggestionRef?.current, event)) return;

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

  const getSuggestions = (li) => {
    // TODO Replace with ref
    const listEl = document.getElementById(setId(elementId, "suggestions-list"));
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
    if (isKeypress(event, KeyboardCodes.ArrowDown) && hasSuggestions) {
      const li = getSuggestions(0);
      li?.focus();
    } else if (isKeypress(event, KeyboardCodes.Enter)) {
      onEnter?.(event, value);
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

  const hasOnEnter = onEnter != null;

  // show the clear button only if the input is enabled, not read-only, disableClear is false and the input is not empty
  // also, don't show it when the input type is "search" and the input is active (standBy)
  const showClear =
    !disabled &&
    !readOnly &&
    !disableClear &&
    !isEmptyValue &&
    (!hasOnEnter ||
      type !== "search" ||
      disableSearchButton ||
      validationState !== validationStates.standBy);

  const showSearchIcon = type === "search" && !disableSearchButton;

  const showRevealPasswordButton = type !== "password" || disableRevealPassword;

  /**
   * Clears the input value from the state and refocus the input.
   */
  const handleClear = useCallback(
    (event) => {
      // reset validation status to standBy (only when status is uncontrolled)
      setValidationState(validationStates.standBy);

      // clear the input value (only when value is uncontrolled)
      setValue("");

      onChange?.(event, "");

      // we wan't to focus the input when clicked and not active
      setTimeout(focusInput);
    },
    [onChange, setValidationState, setValue]
  );

  const clearButton = useMemo(() => {
    if (!showClear) {
      return null;
    }

    return (
      <HvAdornment
        // don't control visibility when the search icon is enabled
        className={clsx(classes.adornmentButton, { [classes.iconClear]: !showSearchIcon })}
        onClick={handleClear}
        aria-label={labels.clearButtonLabel}
        aria-controls={setId(elementId, "input")}
        icon={<CloseXS />}
      />
    );
  }, [
    showClear,
    classes.adornmentButton,
    classes.iconClear,
    showSearchIcon,
    handleClear,
    labels.clearButtonLabel,
    elementId,
  ]);

  /**
   * Calls the onEnter callback and refocus the input.
   */
  const handleSearch = useCallback(
    (event) => {
      onEnter?.(event, value);
    },
    [onEnter, value]
  );

  const searchButton = useMemo(() => {
    // if the search icon is not actionable, only show it when the input is empty or active
    const reallyShowIt =
      showSearchIcon &&
      (isEmptyValue || (hasOnEnter && validationState === validationStates.standBy));

    if (!reallyShowIt) {
      return null;
    }

    return (
      <HvAdornment
        className={clsx(classes.adornmentButton)}
        onClick={hasOnEnter ? handleSearch : undefined}
        aria-label={labels.searchButtonLabel}
        icon={<Search />}
      />
    );
  }, [
    showSearchIcon,
    isEmptyValue,
    hasOnEnter,
    validationState,
    classes.adornmentButton,
    handleSearch,
    labels.searchButtonLabel,
  ]);

  /**
   * Changes input type and refocus the input.
   */
  const handleRevealPassword = useCallback(() => {
    setRevealPassword(!revealPassword);
  }, [revealPassword]);

  const revealPasswordButton = useMemo(() => {
    if (showRevealPasswordButton) {
      return null;
    }

    return (
      <HvTooltip
        disableFocusListener
        disableTouchListener
        title={
          <HvTypography>
            {revealPassword
              ? labels.revealPasswordButtonClickToHideTooltip
              : labels.revealPasswordButtonClickToShowTooltip}
          </HvTypography>
        }
      >
        <HvAdornment
          className={classes.adornmentButton}
          onClick={handleRevealPassword}
          aria-label={labels.revealPasswordButtonLabel}
          aria-controls={setId(elementId, "input")}
          icon={revealPassword ? <PreviewOff /> : <Preview />}
        />
      </HvTooltip>
    );
  }, [
    showRevealPasswordButton,
    revealPassword,
    labels.revealPasswordButtonClickToHideTooltip,
    labels.revealPasswordButtonClickToShowTooltip,
    labels.revealPasswordButtonLabel,
    classes.adornmentButton,
    handleRevealPassword,
    elementId,
  ]);

  const validationIcon = useMemo(() => {
    if (!showValidationIcon || !canShowError) {
      return null;
    }

    if (!isValid(validationState)) {
      return null;
    }

    return <Success semantic="sema1" className={classes.icon} />;
  }, [showValidationIcon, canShowError, validationState, classes.icon]);

  // useMemo to avoid repetitive cloning of the custom icon
  const customIconEl = useMemo(
    () =>
      isValidElement(endAdornment) &&
      React.cloneElement(endAdornment, {
        className: clsx(classes.icon, endAdornment.props.className),
      }),
    [classes.icon, endAdornment]
  );

  const adornments = useMemo(() => {
    if (!clearButton && !revealPasswordButton && !searchButton && !validationIcon && !customIconEl)
      return null;

    // note: specification implies that the custom icon should be hidden when
    // a validation feedback icon is being shown.
    return (
      <div className={classes.adornmentsBox} aria-hidden="true">
        {clearButton}
        {revealPasswordButton}
        {searchButton}
        {validationIcon || customIconEl}
      </div>
    );
  }, [
    classes.adornmentsBox,
    clearButton,
    customIconEl,
    revealPasswordButton,
    searchButton,
    validationIcon,
  ]);

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

  return (
    <HvFormElement
      id={id}
      name={name}
      value={value}
      status={validationState}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={clsx(classes.root, className, {
        [classes.hasSuggestions]: hasSuggestions,
      })}
      onBlur={onContainerBlurHandler}
    >
      {(hasLabel || hasDescription) && (
        <div className={classes.labelContainer}>
          {hasLabel && (
            <HvLabel
              id={setId(id, "label")}
              className={classes.label}
              htmlFor={setId(elementId, "input")}
              label={label}
            />
          )}

          {hasDescription && (
            <HvInfoMessage id={setId(elementId, "description")} className={classes.description}>
              {description}
            </HvInfoMessage>
          )}
        </div>
      )}

      <HvBaseInput
        id={hasLabel || !disableClear || !disableRevealPassword ? setId(elementId, "input") : null}
        name={name}
        value={value}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        onChange={onChangeHandler}
        autoFocus={autoFocus}
        onKeyDown={onKeyDownHandler}
        onBlur={onInputBlurHandler}
        onFocus={onFocusHandler}
        placeholder={placeholder}
        type={realType}
        classes={{
          input: classes.input,
          inputRoot: classes.inputRoot,
          inputRootFocused: classes.inputRootFocused,
          inputRootDisabled: classes.inputRootDisabled,
          inputRootMultiline: classes.inputRootMultiline,
          inputBorderContainer: classes.inputBorderContainer,
        }}
        invalid={isStateInvalid}
        inputProps={{
          "aria-label": ariaLabel,
          "aria-labelledby": ariaLabelledBy,
          "aria-invalid": isStateInvalid ? true : undefined,
          "aria-errormessage": isStateInvalid ? setId(elementId, "error") : undefined,
          "aria-describedby":
            ariaDescribedBy != null
              ? ariaDescribedBy
              : description && setId(elementId, "description"),
          "aria-controls": canShowSuggestions ? setId(elementId, "suggestions") : undefined,

          ref: materialInputRef,

          // prevent browsers auto-fill/suggestions when we have our own
          autoComplete: canShowSuggestions ? "off" : undefined,

          ...inputProps,
        }}
        inputRef={inputRefProp || inputRef}
        endAdornment={adornments}
        {...others}
      />

      {canShowSuggestions && (
        <>
          {hasSuggestions && <div role="presentation" className={classes.inputExtension} />}
          <HvSuggestions
            id={setId(elementId, "suggestions")}
            classes={{
              root: classes.suggestionsContainer,
              list: classes.suggestionList,
            }}
            expanded={hasSuggestions}
            anchorEl={inputRef?.current?.parentElement}
            onClose={suggestionClearHandler}
            onKeyDown={onSuggestionKeyDown}
            onSuggestionSelected={suggestionSelectedHandler}
            suggestionValues={suggestionValues}
          />
        </>
      )}

      {canShowError && (
        <HvWarningText id={setId(elementId, "error")} disableBorder>
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};

HvInput.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root container of the input.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the root container when the suggestion list is open.
     */
    hasSuggestions: PropTypes.string,

    /**
     * Styles applied to input root which is comprising of everything but the labels and descriptions.
     */
    inputRoot: PropTypes.string,
    /**
     * Styles applied to the base input border element.
     */
    inputBorderContainer: PropTypes.string,
    /**
     * Styles applied to input root when it is focused.
     */
    inputRootFocused: PropTypes.string,
    /**
     * Styles applied to input html element when it is disabled.
     */
    inputRootDisabled: PropTypes.string,
    /**
     * Styles applied to input html element when it is multiline mode.
     */
    inputRootMultiline: PropTypes.string,
    /**
     * Styles applied to input html element.
     */
    input: PropTypes.string,

    /**
     * Styles applied to the container of the labels elements.
     */
    labelContainer: PropTypes.string,
    /**
     * Styles applied to the label element.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the icon information text.
     */
    description: PropTypes.string,

    /**
     * Styles applied to the div around the adornment.
     */
    adornmentsBox: PropTypes.string,
    /**
     * Styles applied to the the adornment when behaving as a button.
     */
    adornmentButton: PropTypes.string,
    /**
     * Styles applied to the input adornment icons.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the icon used to clean the input.
     */
    iconClear: PropTypes.string,

    /**
     * Styles applied to the input extension shown when the suggestions list is visible.
     */
    inputExtension: PropTypes.string,

    /**
     * Styles applied to the container of the suggestions list.
     */
    suggestionsContainer: PropTypes.string,
    /**
     * Styles applied to the suggestions list.
     */
    suggestionList: PropTypes.string,
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
   * The function that will be executed onChange, allows modification of the input,
   * it receives the value. If a new value should be presented it must returned it.
   */
  onChange: PropTypes.func,
  /**
   * Callback called when the user submits the value by pressing Enter/Return.
   *
   * Also called when the search button is clicked (when type is "search").
   */
  onEnter: PropTypes.func,

  /**
   * The input type.
   */
  type: PropTypes.string,

  /**
   * The placeholder value of the input.
   */
  placeholder: PropTypes.string,

  /**
   * Internal labels.
   */
  labels: PropTypes.shape({
    /**
     * The label of the clear button.
     */
    clearButtonLabel: PropTypes.string,

    /**
     * The label of the reveal password button.
     */
    revealPasswordButtonLabel: PropTypes.string,
    /**
     * The tooltip of the reveal password button when the password is hidden.
     */
    revealPasswordButtonClickToShowTooltip: PropTypes.string,
    /**
     * The tooltip of the reveal password button when the password is revealed.
     */
    revealPasswordButtonClickToHideTooltip: PropTypes.string,

    /**
     * The label of the search button.
     */
    searchButtonLabel: PropTypes.string,
  }),

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
    /**
     * The message that appears when the input is value is incompatible with the expected type.
     */
    typeMismatchError: PropTypes.string,
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
   * The function that will be executed onKeyDown, allows checking the value state,
   * it receives the event and value.
   */
  onKeyDown: PropTypes.func,

  /**
   * The function that will be executed to received an array of objects that has a label and id to create list of suggestion
   */
  suggestionListCallback: PropTypes.func,

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
   * If `true` the clear button is disabled.
   */
  disableClear: PropTypes.bool,
  /**
   * If `true` the reveal password button is disabled.
   *
   * Valid only when type is "password".
   */
  disableRevealPassword: PropTypes.bool,
  /**
   * If `true` the search button is disabled.
   *
   * Valid only when type is "search".
   */
  disableSearchButton: PropTypes.bool,

  /**
   * If `true` the validation icon adorment is visible. Defaults to `false`.
   *
   * Currently, DS specifications define only a positive feedback icon;
   * errors are signaled through the border style and by displaying the error message.
   */
  showValidationIcon: PropTypes.bool,

  /**
   * a custom icon to be added into the input.
   */
  endAdornment: PropTypes.node,

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
};

export default withStyles(styles, { name: "HvInput" })(HvInput);
