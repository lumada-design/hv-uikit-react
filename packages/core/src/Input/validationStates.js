const validationState = Object.freeze({
  empty: "empty",
  filled: "filled",
  valid: "valid",
  invalid: "invalid",
});

const isEmpty = (compareState) => compareState === validationState.empty;
const isFilled = (compareState) => compareState === validationState.filled;
const isValid = (compareState) => compareState === validationState.valid;
const isInvalid = (compareState) => compareState === validationState.invalid;

export { validationState as default, isInvalid, isEmpty, isValid, isFilled };
