import validationStates from "../Forms/FormElement/validationStates";

/**
 * Checks if the value is a number.
 *
 * @param {Number || String} num - The value to test.
 *
 * @returns {Boolean} - `true` if the value is a number `false` otherwise.
 */
const isNumeric = (num) =>
  // to prevent Number( <spaces> ) = 0
  num.trim().length > 0 && !Number.isNaN(Number(num));

/**
 * Checks if the value is an email
 *
 * @param {String} email - The value to test.
 *
 * @returns {Boolean} - `true` if the value is an email `false` otherwise.
 */
const isEmail = (email) => {
  const regexp =
    /^[^\\s]+[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/i;
  return regexp.test(email);
};

export const validationTypes = Object.freeze({
  none: "none",
  number: "number",
  email: "email",
});

/**
 * Returns the input's validation type based in the type of the input.
 *
 * @param {String} type - the input type.
 *
 * @returns {String}    - the validation type.
 */
export const computeValidationType = (type) => {
  switch (type) {
    case "number":
      return validationTypes.number;
    case "email":
      return validationTypes.email;

    default:
      return validationTypes.none;
  }
};

/**
 * Checks whether any integrated validation, native or not, is active.
 */
export const hasBuiltInValidations = (
  required,
  validationType,
  minCharQuantity,
  maxCharQuantity,
  validation,
  inputProps
) =>
  required ||
  validationType !== validationTypes.none ||
  minCharQuantity != null ||
  maxCharQuantity != null ||
  validation != null ||
  inputProps?.required != null ||
  inputProps?.minLength != null ||
  inputProps?.maxLength != null ||
  inputProps?.min != null ||
  inputProps?.max != null ||
  (inputProps?.type != null && inputProps?.type !== "text" && inputProps?.type !== "password") ||
  inputProps?.pattern != null;

/**
 * Returns the form element's validation state based in the validity state of the input.
 *
 * @param {Object} inputValidity    - the input validity state (implementing ValidityState interface).
 *
 * @returns {String}                - the validation state.
 */
export const computeValidationState = (inputValidity, isEmptyValue) => {
  // to keep 2.x behaviour,
  // consider that if the value is empty (and not required) we're returning to the standBy state.
  // might not make sense, as it makes impossible to say if the user explicitly cleared the input.
  if (inputValidity.valid && isEmptyValue) {
    return validationStates.standBy;
  }

  return inputValidity.valid ? validationStates.valid : validationStates.invalid;
};

/**
 * Returns a error message based in the validity state of the input.
 *
 * Only one error message is returned even if multiple validations fail.
 * Also, only required, minCharQuantity, maxCharQuantity and validationType have specific error messages.
 *
 * For further customization both status and statusMessage should be controlled and
 * set using the onBlur callback that receives both the value and the input validity object.
 *
 * @param {Object} inputValidity    - the input validity state (implementing ValidityState interface).
 * @param {Object} errorMessages    - the available localized error messages.
 *
 * @returns {String}                - the error message.
 */
export const computeValidationMessage = (inputValidity, errorMessages) => {
  if (inputValidity.valid) {
    return "";
  }

  if (inputValidity.valueMissing) {
    return errorMessages.requiredError;
  }
  if (inputValidity.tooLong) {
    return errorMessages.maxCharError;
  }
  if (inputValidity.tooShort) {
    return errorMessages.minCharError;
  }
  if (inputValidity.typeMismatch) {
    return errorMessages.typeMismatchError;
  }

  return errorMessages.error;
};

/**
 * Returns a object describing the validity state of the input.
 *
 * It implements the native browser's ValidityState interface:
 * https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 *
 * @param {DOMElement} input        - the input being validated.
 * @param {String} value            - the inputted value.
 * @param {Boolean} required        - if the input needs to be filled.
 * @param {Number} minCharQuantity  - the minimum length of the value.
 * @param {Number} maxCharQuantity  - the maximum length of the value.
 * @param {String} validationType   - the input value type.
 * @param {Function} validation     - a custom validation function.
 *
 * @returns {Object}                - the validity state of the input.
 */
export const validateInput = (
  input,
  value,
  required,
  minCharQuantity,
  maxCharQuantity,
  validationType,
  validation
) => {
  // bootstrap validity object using browser's built-in validation
  const inputValidity = {
    valid: input?.validity?.valid ?? true,
    badInput: input?.validity?.badInput,
    customError: input?.validity?.customError,
    patternMismatch: input?.validity?.patternMismatch,
    rangeOverflow: input?.validity?.rangeOverflow,
    rangeUnderflow: input?.validity?.rangeUnderflow,
    stepMismatch: input?.validity?.stepMismatch,
    tooLong: input?.validity?.tooLong,
    tooShort: input?.validity?.tooShort,
    typeMismatch: input?.validity?.typeMismatch,
    valueMissing: input?.validity?.valueMissing,
  };

  if (!value) {
    if (required) {
      // this is redundant because we're setting the required property in the native input
      inputValidity.valueMissing = true;
      inputValidity.valid = false;
    }
  } else {
    // we're not setting minlength and maxlength in the native input
    // to avoid different browser's behaviours and keep the user experience consistent
    if (minCharQuantity !== null && value.length < minCharQuantity) {
      inputValidity.tooShort = true;
      inputValidity.valid = false;
    }

    if (maxCharQuantity !== null && value.length > maxCharQuantity) {
      inputValidity.tooLong = true;
      inputValidity.valid = false;
    }

    // the validationType is used instead of type
    // for the same reason stated above
    switch (validationType) {
      case validationTypes.number:
        if (!isNumeric(value)) {
          inputValidity.typeMismatch = true;
          inputValidity.valid = false;
        }
        break;

      case validationTypes.email:
        if (!isEmail(value)) {
          inputValidity.typeMismatch = true;
          inputValidity.valid = false;
        }
        break;

      default:
    }

    if (validation != null && !validation(value)) {
      inputValidity.customError = true;
      inputValidity.valid = false;
    }
  }

  return inputValidity;
};

export const DEFAULT_ERROR_MESSAGES = {
  error: "Invalid value",
  requiredError: "The value is required",
  minCharError: "The value is too short",
  maxCharError: "The value is too long",
  typeMismatchError: "Invalid value",
};
