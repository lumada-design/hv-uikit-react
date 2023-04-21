import { HvCharCounterProps, HvFormStatus } from "../Forms";
import { HvBaseInputProps } from "../BaseInput";
import {
  StyledBaseInput,
  StyledCharCounter,
  StyledFormElement,
  StyledInfoMessage,
  StyledLabel,
  StyledLabelContainer,
  StyledWarningText,
} from "./TextArea.styles";
import { useControlled, useUniqueId } from "@core/hooks";
import validationStates, {
  isInvalid,
} from "@core/components/Forms/FormElement/validationStates";
import { clsx } from "clsx";
import { useCallback, useRef, useState, useMemo, useEffect } from "react";
import {
  computeValidationMessage,
  computeValidationState,
  DEFAULT_ERROR_MESSAGES,
  hasBuiltInValidations,
  HvInputValidity,
  validateInput,
  validationTypes,
} from "../BaseInput/validations";
import { setId } from "@core/utils";
import isNil from "lodash/isNil";
import { HvValidationMessages } from "@core/types";
import textAreaClasses, { HvTextAreaClasses } from "./textAreaClasses";

export type HvTextAreaProps = Omit<
  HvBaseInputProps,
  "onChange" | "onBlur" | "rows" | "classes" | "onFocus"
> & {
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: React.ReactNode;
  /**
   * Provide additional descriptive text for the form element.
   */
  description?: React.ReactNode;
  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status?: HvFormStatus;
  /**
   * The error message to show when `status` is "invalid".
   */
  statusMessage?: React.ReactNode;
  /**
   * Text between the current char counter and max value.
   */
  middleCountLabel?: string;
  /**
   * An Object containing the various texts associated with the input.
   */
  validationMessages?: HvValidationMessages;
  /**
   * The custom validation function, it receives the value and must return
   * either `true` for valid or `false` for invalid, default validations would only
   * occur if this function is null or undefined
   */
  validation?: (value: string) => boolean;
  /**
   * The maximum allowed length of the characters, if this value is null no check
   * will be performed.
   */
  maxCharQuantity?: number;
  /**
   * The minimum allowed length of the characters, if this value is null no check
   * will be perform.
   */
  minCharQuantity?: number;
  /**
   * If `true` it should autofocus.
   */
  autoFocus?: boolean;
  /**
   * The number of rows of the text area
   */
  rows?: number;
  /**
   * If `true` the component is resizable.
   */
  resizable?: boolean;
  /**
   * Auto-scroll: automatically scroll to the end on value changes.
   * Will stop if the user scrolls up and resume if scrolled to the bottom.
   */
  autoScroll?: boolean;
  /**
   * If true it isn't possible to pass the `maxCharQuantity`
   */
  blockMax?: boolean;
  /**
   * If `true` the character counter isn't shown even if maxCharQuantity is set.
   */
  hideCounter?: boolean;
  /**
   * Props passed to the char count.
   */
  countCharProps?: Partial<HvCharCounterProps>;
  /**
   * Called back when the value is changed.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    value: string
  ) => void;
  /**
   * Called back when the value is changed.
   */
  onBlur?: (
    event: React.FocusEvent<HTMLTextAreaElement>,
    value: string,
    validationState: HvInputValidity
  ) => void;
  /**
   * The function that will be executed onBlur, allows checking the value state,
   * it receives the value.
   */
  onFocus?: (
    event: React.FocusEvent<HTMLTextAreaElement>,
    value: string
  ) => void;
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes?: HvTextAreaClasses;
};

/**
 * A text area is a multiline text input box, with an optional character counter when there is a length limit.
 */
export const HvTextArea = ({
  id,
  className,
  classes,
  name,
  label,
  description,
  placeholder,
  status,
  statusMessage,
  validationMessages,
  maxCharQuantity,
  minCharQuantity,
  value: valueProp,
  inputRef: inputRefProp,
  rows = 1,
  defaultValue = "",
  middleCountLabel = "/",
  countCharProps = {},
  inputProps = {},
  required = false,
  readOnly = false,
  disabled = false,
  autoFocus = false,
  resizable = false,
  autoScroll = false,
  hideCounter = false,
  blockMax = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-errormessage": ariaErrorMessage,
  validation,
  onChange,
  onBlur,
  onFocus,
  ...others
}: HvTextAreaProps) => {
  const elementId = useUniqueId(id, "hvtextarea");

  // Signals that the user has manually edited the input value
  const isDirty = useRef<boolean>(false);

  const inputRefOwn = useRef(null);

  const inputRef = inputRefProp || inputRefOwn;

  const [focused, setFocused] = useState<boolean>(false);

  const [autoScrolling, setAutoScrolling] = useState(autoScroll);

  const [validationState, setValidationState] = useControlled(
    status,
    validationStates.standBy
  );

  const [validationMessage, setValidationMessage] = useControlled(
    statusMessage,
    ""
  );

  const [value, setValue] = useControlled(valueProp, defaultValue);

  const isStateInvalid = isInvalid(validationState);

  const isEmptyValue = value == null || value === "";

  const hasLabel = label != null;

  const hasDescription = description != null;

  const hasCounter = maxCharQuantity != null && !hideCounter;

  // ValidationMessages reference tends to change, as users will not memorize/useState for it;
  // Dependencies must be more explicit so we set
  const errorMessages = useMemo(
    () => ({ ...DEFAULT_ERROR_MESSAGES, ...validationMessages }),
    [
      validationMessages?.error,
      validationMessages?.requiredError,
      validationMessages?.minCharError,
      validationMessages?.maxCharError,
    ]
  );

  // Validates the input, sets the status and the statusMessage accordingly (if uncontrolled)
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

    // This will only run if status is uncontrolled
    setValidationState(computeValidationState(inputValidity, isEmptyValue));

    // This will only run if statusMessage is uncontrolled
    setValidationMessage(
      computeValidationMessage(inputValidity, errorMessages)
    );

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

  const isOverflow = (currentValue) =>
    isNil(maxCharQuantity) ? false : currentValue.length > maxCharQuantity;

  /**
   * Limit the string to the maxCharQuantity length.
   *
   * @param value - string to evaluate
   * @returns {string|*} - string according the limit
   */
  const limitValue = (currentValue) => {
    if (currentValue === undefined || !blockMax) return currentValue;
    return !isOverflow(currentValue)
      ? currentValue
      : currentValue.substring(0, maxCharQuantity);
  };

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
   * Updates the length of the string while is being inputted, also executes the user onChange
   * allowing the customization of the input if required.
   *
   * @param {String} value - The value provided by the HvInput
   */
  const onChangeHandler = (event, currentValue) => {
    isDirty.current = true;

    const limitedValue = blockMax ? limitValue(currentValue) : currentValue;

    // Set the input value (only when value is uncontrolled)
    setValue(limitedValue);

    onChange?.(event, limitedValue);
  };

  /**
   * Updates the state putting again the value from the state because the input value is
   * not automatically manage, it also executes the onFocus function from the user passing the value
   */
  const onFocusHandler = (event) => {
    setFocused(true);

    // Reset validation status to standBy (only when status is uncontrolled)
    setValidationState(validationStates.standBy);

    onFocus?.(event, value);
  };

  const isScrolledDown = useCallback(() => {
    const el = inputRef.current;
    return el == null || el.offsetHeight + el.scrollTop >= el.scrollHeight;
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
    inputRef.current?.addEventListener("scroll", scrollHandler);
  }, [inputRef, isScrolledDown]);

  useEffect(() => {
    if (autoScroll) {
      addScrollListener();
    }
  }, [autoScroll, addScrollListener]);

  useEffect(() => {
    if (autoScrolling) {
      scrollDown();
    }
  }, [valueProp, autoScrolling, scrollDown]);

  // Run initial validation after first render
  // and also when any validation condition changes
  useEffect(() => {
    if (focused || (!isDirty.current && isEmptyValue)) {
      // Skip validation if currently focused or if empty and
      // the user never manually edited the input value
      return;
    }

    performValidation();
  }, [focused, isEmptyValue, performValidation]);

  // The error message area will only be created if:
  //   - an external element that provides an error message isn't identified via aria-errormessage AND
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
          // If blockMax is true maxCharQuantity will never produce an error
          // unless the value is controlled, so we can't prevent it to overflow maxCharQuantity
          maxCharQuantity != null && (blockMax !== true || value != null)
            ? maxCharQuantity
            : null,
          validation,
          inputProps
        )));

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
        textAreaClasses.root,
        classes?.root,
        className,
        resizable && clsx(textAreaClasses.resizable, classes?.resizable),
        disabled && clsx(textAreaClasses.disabled, classes?.disabled),
        isStateInvalid && clsx(textAreaClasses.invalid, classes?.invalid)
      )}
      $resizable={resizable}
      onBlur={onContainerBlurHandler}
    >
      {(hasLabel || hasDescription) && (
        <StyledLabelContainer
          className={clsx(
            textAreaClasses.labelContainer,
            classes?.labelContainer
          )}
        >
          {hasLabel && (
            <StyledLabel
              className={clsx(textAreaClasses.label, classes?.label)}
              id={setId(id, "label")}
              htmlFor={setId(elementId, "input")}
              label={label}
            />
          )}

          {hasDescription && (
            <StyledInfoMessage
              className={clsx(
                textAreaClasses.description,
                classes?.description
              )}
              id={setId(elementId, "description")}
            >
              {description}
            </StyledInfoMessage>
          )}
        </StyledLabelContainer>
      )}

      {hasCounter && (
        <StyledCharCounter
          id={setId(elementId, "charCounter")}
          className={clsx(
            textAreaClasses.characterCounter,
            classes?.characterCounter
          )}
          separator={middleCountLabel}
          currentCharQuantity={value.length}
          maxCharQuantity={maxCharQuantity}
          {...countCharProps}
        />
      )}

      <StyledBaseInput
        classes={{
          root: clsx(textAreaClasses.baseInput, classes?.baseInput),
          input: clsx(textAreaClasses.input, classes?.input),
          inputResizable: clsx(
            textAreaClasses.inputResizable,
            classes?.inputResizable
          ),
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
              : (description && setId(elementId, "description")) || undefined,
          "aria-controls": maxCharQuantity
            ? setId(elementId, "charCounter")
            : undefined,
          ...inputProps,
        }}
        inputRef={inputRef}
        $resizable={resizable}
        {...others}
      />

      {canShowError && (
        <StyledWarningText
          id={setId(elementId, "error")}
          className={clsx(textAreaClasses.error, classes?.error)}
          disableBorder
        >
          {validationMessage}
        </StyledWarningText>
      )}
    </StyledFormElement>
  );
};
