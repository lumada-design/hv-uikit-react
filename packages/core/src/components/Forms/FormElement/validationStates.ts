import { HvFormStatus } from "./FormElement";

const validationState = Object.freeze({
  standBy: "standBy",
  valid: "valid",
  invalid: "invalid",
});

export const isValid = (compareState: HvFormStatus) =>
  compareState === validationState.valid;
export const isInvalid = (compareState: HvFormStatus) =>
  compareState === validationState.invalid;

export default validationState;
