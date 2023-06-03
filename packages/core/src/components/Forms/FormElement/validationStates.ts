const validationState = Object.freeze({
  standBy: "standBy",
  valid: "valid",
  invalid: "invalid",
});

export const isValid = (compareState) => compareState === validationState.valid;
export const isInvalid = (compareState) =>
  compareState === validationState.invalid;

export default validationState;
