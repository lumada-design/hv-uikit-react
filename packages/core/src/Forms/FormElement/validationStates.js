const validationState = Object.freeze({
  standBy: "standBy",
  valid: "valid",
  invalid: "invalid",
});

const isValid = (compareState) => compareState === validationState.valid;
const isInvalid = (compareState) => compareState === validationState.invalid;

export { validationState as default, isInvalid, isValid };
