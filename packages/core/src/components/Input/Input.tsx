import React, {
  HTMLInputTypeAttribute,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import {
  CloseXS,
  PreviewOff,
  Preview,
  Search,
} from "@hitachivantara/uikit-react-icons";
import { HvBaseProps, HvExtraProps } from "../../types";
import {
  StyledFormElement,
  StyledLabelContainer,
  StyledLabel,
  StyledSuggestions,
  StyledBaseInput,
  StyledInputExtension,
  StyledAdornmentsBox,
  StyledAdornmentButton,
  StyledSuccess,
} from "./Input.styles";
import validationStates, {
  isValid,
  isInvalid,
} from "../Forms/FormElement/validationStates";
import {
  DEFAULT_ERROR_MESSAGES,
  computeValidationType,
  hasBuiltInValidations,
  validateInput,
  computeValidationState,
  computeValidationMessage,
} from "../BaseInput/validations";
import { isBrowser, isKeypress, keyboardCodes, setId } from "utils";
import {
  HvFormStatus,
  HvInfoMessage,
  HvSuggestion,
  HvTooltip,
  HvTypography,
  HvWarningText,
} from "components";
import { useControlled, useIsMounted, useLabels, useUniqueId } from "hooks";
import { HvInputLabels, HvValidationMessages } from "types/forms";
import inputClasses, { HvInputClasses } from "./inputClasses";
import { InputBaseComponentProps as MuiInputBaseComponentProps } from "@mui/material";

export type HvInputProps = HvBaseProps<
  HTMLElement,
  { onChange; onBlur; onFocus; onKeyDown; color }
> & {
  /** The form element name. */
  name?: string;
  /** The value of the form element. */
  value?: string;
  /** When uncontrolled, defines the initial input value. */
  defaultValue?: string;
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be inputted via inputProps.
   */
  label?: React.ReactNode;
  /** Provide additional descriptive text for the form element. */
  description?: React.ReactNode;
  /** Indicates that the form element is disabled. */
  disabled?: boolean;
  /** Indicates that the form element is not editable. */
  readOnly?: boolean;
  /** Indicates that user input is required on the form element. */
  required?: boolean;
  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to `checked`, depending of the values of both `required` and `checked`.
   */
  status?: HvFormStatus;
  /** The error message to show when `status` is "invalid". */
  statusMessage?: string;
  /**
   * The function that will be executed onChange, allows modification of the input,
   * it receives the value. If a new value should be presented it must returned it.
   */
  onChange?: Function;
  /**
   * Callback called when the user submits the value by pressing Enter/Return.
   *
   * Also called when the search button is clicked (when type is "search").
   */
  onEnter?: Function;
  /**
   * The function that will be executed onBlur, allows checking the validation state,
   * it receives the value and the validation state (`invalid`, `valid`).
   */
  onBlur?: Function;
  /**
   * The function that will be executed onBlur, allows checking the value state,
   * it receives the value.
   */
  onFocus?: Function;
  /**
   * The function that will be executed onKeyDown, allows checking the value state,
   * it receives the event and value.
   */
  onKeyDown?: Function;
  /** The input type. */
  type?: HTMLInputTypeAttribute;
  /** The placeholder value of the input. */
  placeholder?: string;
  /** Internal labels?. */
  labels?: HvInputLabels & HvExtraProps;
  /** An Object containing the various texts associated with the input. */
  validationMessages?: HvValidationMessages;
  /** Attributes applied to the input element. */
  inputProps?: MuiInputBaseComponentProps;
  /** Allows passing a ref to the underlying input */
  inputRef?: any;
  /** The function that will be executed to received an array of objects that has a label and id to create list of suggestion */
  suggestionListCallback?: Function;
  /**
   * The custom validation function, it receives the value and must return
   * either `true` for valid or `false` for invalid, default validations would only
   * occur if this function is null or undefined
   */
  validation?: Function;
  /** If `true` it should autofocus. */
  autoFocus?: boolean;
  /** If `true` the clear button is disabled. */
  disableClear?: boolean;
  /** If `true` the reveal password button is disabled. Valid only when type is "password". */
  disableRevealPassword?: boolean;
  /** If `true` the search button is disabled. Valid only when type is "search". */
  disableSearchButton?: boolean;
  /**
   * If `true` the validation icon adornment is visible. Defaults to `false`.
   *
   * Currently, DS specifications define only a positive feedback icon;
   * errors are signaled through the border style and by displaying the error message.
   */
  showValidationIcon?: boolean;
  /** A custom icon to be added into the input. */
  endAdornment?: React.ReactNode;
  /** The maximum allowed length of the characters, if this value is null no check will be performed. */
  maxCharQuantity?: number;
  /** The minimum allowed length of the characters, if this value is null no check will be perform. */
  minCharQuantity?: number;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvInputClasses;
};

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
 * A text input box is a graphical control element intended to enable the user to input text information to be used by the software.
 */
export const HvInput = ({
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
  "aria-errormessage": ariaErrorMessage,
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
}: HvInputProps) => {
  const labels = useLabels(DEFAULT_LABELS, labelsProp);
  const elementId = useUniqueId(id, "hvinput");

  const inputRef = useRef(inputRefProp || null);

  const [focused, setFocused] = useState(false);

  // signals that the user has manually edited the input value
  const isDirty = useRef(false);

  // value related state
  const [value, setValue] = useControlled(valueProp, defaultValue);

  const isEmptyValue = value == null || value === "";

  // validation related state
  const [validationState, setValidationState] = useControlled(
    status,
    validationStates.standBy
  );

  const [validationMessage, setValidationMessage] = useControlled(
    statusMessage,
    ""
  );

  // validationMessages reference tends to change, as users will not memoize/useState for it;
  // dependencies must be more explicit so we set
  const errorMessages = useMemo(
    () => ({ ...DEFAULT_ERROR_MESSAGES, ...validationMessages }),
    [
      validationMessages?.error,
      validationMessages?.requiredError,
      validationMessages?.minCharError,
      validationMessages?.maxCharError,
      validationMessages?.typeMismatchError,
    ]
  );

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
    setValidationMessage(
      computeValidationMessage(inputValidity, errorMessages)
    );

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
          validationType,
          minCharQuantity,
          maxCharQuantity,
          validation,
          inputProps
        )));

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
  const [suggestionValues, setSuggestionValues] = useState<
    HvSuggestion[] | null
  >(null);

  const canShowSuggestions = suggestionListCallback != null;
  const hasSuggestions = !!suggestionValues;

  const materialInputRef = useRef<HTMLElement | null>(null);
  const suggestionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // TODO Replace with ref
    suggestionRef.current = document.getElementById(
      setId(elementId, "suggestions") || ""
    );
  }, [elementId]);

  // miscellaneous state
  const hasLabel = label != null;
  const hasDescription = description != null;

  /**
   * Looks for the node that represent the input inside the material tree and focus it.
   */
  const focusInput = () => {
    materialInputRef.current?.focus();
  };

  const isMounted = useIsMounted();

  /**
   * Clears the suggestion array.
   */
  const suggestionClearHandler = () => {
    if (isMounted.current) {
      setSuggestionValues(null);
    }
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

    if (canShowSuggestions) {
      // an edge case might be a controlled input whose onChange callback
      // doesn't change the value (or sets another): the suggestionListCallback
      // callback will still receive the original rejected value.
      // a refactor is needed so the suggestionListCallback might be called only
      // when the input is uncontrolled, providing a way to externally control
      // the suggestion values.
      suggestionHandler(newValue);
    }
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
    const listEl = document.getElementById(
      setId(elementId, "suggestions-list") || ""
    );
    return li != null ? listEl?.getElementsByTagName("li")?.[li] : listEl;
  };

  const onSuggestionKeyDown = (event) => {
    if (isKeypress(event, keyboardCodes.Esc)) {
      suggestionClearHandler();
      focusInput();
    } else if (isKeypress(event, keyboardCodes.Tab)) {
      suggestionClearHandler();
    }
  };

  /**
   * Focus the suggestion list when the arrow down is pressed.
   *
   * @param {Object} event - The event provided by the material ui input
   */
  const onKeyDownHandler = (event) => {
    if (isKeypress(event, keyboardCodes.ArrowDown) && hasSuggestions) {
      const li = getSuggestions(0);
      li?.focus();
    } else if (isKeypress(event, keyboardCodes.Enter)) {
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
        const list = getSuggestions(null);
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

  const showRevealPasswordButton =
    type === "password" && !disableRevealPassword;

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
      <StyledAdornmentButton
        // don't control visibility when the search icon is enabled
        className={clsx(
          inputClasses.adornmentButton,
          classes?.adornmentButton,
          !showSearchIcon &&
            clsx("iconClear", inputClasses.iconClear, classes?.iconClear)
        )}
        onClick={handleClear}
        aria-label={labels?.clearButtonLabel}
        aria-controls={setId(elementId, "input")}
        icon={<CloseXS />}
        $iconClear={!showSearchIcon}
      />
    );
  }, [
    showClear,
    classes?.adornmentButton,
    classes?.iconClear,
    showSearchIcon,
    handleClear,
    labels?.clearButtonLabel,
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
      (isEmptyValue ||
        (hasOnEnter && validationState === validationStates.standBy));

    if (!reallyShowIt) {
      return null;
    }

    return (
      <StyledAdornmentButton
        className={clsx(inputClasses.adornmentButton, classes?.adornmentButton)}
        onClick={hasOnEnter ? handleSearch : undefined}
        aria-label={labels?.searchButtonLabel}
        icon={<Search />}
      />
    );
  }, [
    showSearchIcon,
    isEmptyValue,
    hasOnEnter,
    validationState,
    classes?.adornmentButton,
    handleSearch,
    labels?.searchButtonLabel,
  ]);

  /**
   * Changes input type and refocus the input.
   */
  const handleRevealPassword = useCallback(() => {
    setRevealPassword(!revealPassword);
  }, [revealPassword]);

  const revealPasswordButton = useMemo(() => {
    if (!showRevealPasswordButton) {
      return null;
    }

    return (
      <HvTooltip
        disableFocusListener
        disableTouchListener
        title={
          <HvTypography>
            {revealPassword
              ? labels?.revealPasswordButtonClickToHideTooltip
              : labels?.revealPasswordButtonClickToShowTooltip}
          </HvTypography>
        }
      >
        <StyledAdornmentButton
          className={clsx(
            inputClasses.adornmentButton,
            classes?.adornmentButton
          )}
          onClick={handleRevealPassword}
          aria-label={labels?.revealPasswordButtonLabel}
          aria-controls={setId(elementId, "input")}
          icon={revealPassword ? <PreviewOff /> : <Preview />}
        />
      </HvTooltip>
    );
  }, [
    showRevealPasswordButton,
    revealPassword,
    labels?.revealPasswordButtonClickToHideTooltip,
    labels?.revealPasswordButtonClickToShowTooltip,
    labels?.revealPasswordButtonLabel,
    classes?.adornmentButton,
    handleRevealPassword,
    elementId,
  ]);

  const validationIcon = useMemo(() => {
    if (!showValidationIcon) {
      return null;
    }

    if (!isValid(validationState)) {
      return null;
    }

    return (
      <StyledSuccess
        semantic="sema1"
        className={clsx(inputClasses.icon, classes?.icon)}
      />
    );
  }, [showValidationIcon, validationState, classes?.icon]);

  // useMemo to avoid repetitive cloning of the custom icon
  const customIconEl = useMemo(
    () =>
      isValidElement(endAdornment) &&
      React.cloneElement(endAdornment as React.ReactElement, {
        className: clsx(
          inputClasses.icon,
          classes?.icon,
          endAdornment.props.className
        ),
      }),
    [classes?.icon, endAdornment]
  );

  const adornments = useMemo(() => {
    if (
      !clearButton &&
      !revealPasswordButton &&
      !searchButton &&
      !validationIcon &&
      !customIconEl
    )
      return null;

    // note: specification implies that the custom icon should be hidden when
    // a validation feedback icon is being shown.
    return (
      <StyledAdornmentsBox
        className={clsx(inputClasses.adornmentsBox, classes?.adornmentsBox)}
        aria-hidden="true"
      >
        {clearButton}
        {revealPasswordButton}
        {searchButton}
        {validationIcon || customIconEl}
      </StyledAdornmentsBox>
    );
  }, [
    classes?.adornmentsBox,
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

  let errorMessageId;
  if (isStateInvalid) {
    errorMessageId = canShowError
      ? setId(elementId, "error")
      : ariaErrorMessage;
  }

  return (
    <StyledFormElement
      id={id}
      name={name}
      status={validationState}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      className={clsx(
        inputClasses.root,
        classes?.root,
        className,
        hasSuggestions &&
          clsx(inputClasses.hasSuggestions, classes?.hasSuggestions)
      )}
      onBlur={onContainerBlurHandler}
    >
      {(hasLabel || hasDescription) && (
        <StyledLabelContainer
          className={clsx(inputClasses.labelContainer, classes?.labelContainer)}
        >
          {hasLabel && (
            <StyledLabel
              id={setId(elementId, "label")}
              className={clsx(inputClasses.label, classes?.label)}
              htmlFor={setId(elementId, "input")}
              label={label}
            />
          )}

          {hasDescription && (
            <HvInfoMessage
              id={setId(elementId, "description")}
              className={clsx(inputClasses.description, classes?.description)}
            >
              {description}
            </HvInfoMessage>
          )}
        </StyledLabelContainer>
      )}
      <StyledBaseInput
        id={
          hasLabel || showClear || showRevealPasswordButton
            ? setId(elementId, "input")
            : setId(id, "input")
        }
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
          input: clsx(inputClasses.input, classes?.input),
          inputRoot: clsx(inputClasses.inputRoot, classes?.inputRoot),
          inputRootFocused: clsx(
            inputClasses.inputRootFocused,
            classes?.inputRootFocused
          ),
          inputRootDisabled: clsx(
            inputClasses.inputRootDisabled,
            classes?.inputRootDisabled
          ),
          inputRootMultiline: clsx(
            inputClasses.inputRootMultiline,
            classes?.inputRootMultiline
          ),
          inputBorderContainer: clsx(
            inputClasses.inputBorderContainer,
            classes?.inputBorderContainer
          ),
        }}
        invalid={isStateInvalid}
        inputProps={{
          "aria-label": ariaLabel,
          "aria-labelledby": ariaLabelledBy,
          "aria-invalid": isStateInvalid ? true : undefined,
          "aria-errormessage": errorMessageId,
          "aria-describedby":
            ariaDescribedBy != null
              ? ariaDescribedBy
              : description
              ? setId(elementId, "description")
              : undefined,
          "aria-controls": canShowSuggestions
            ? setId(elementId, "suggestions")
            : undefined,

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
          {hasSuggestions && (
            <StyledInputExtension
              role="presentation"
              className={clsx(
                inputClasses.inputExtension,
                classes?.inputExtension
              )}
            />
          )}
          <StyledSuggestions
            id={setId(elementId, "suggestions")}
            classes={{
              root: clsx(
                inputClasses.suggestionsContainer,
                classes?.suggestionsContainer
              ),
              list: clsx(inputClasses.suggestionList, classes?.suggestionList),
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
        <HvWarningText
          id={setId(elementId, "error")}
          disableBorder
          className={clsx(inputClasses.error, classes?.error)}
        >
          {validationMessage}
        </HvWarningText>
      )}
    </StyledFormElement>
  );
};
