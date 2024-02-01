export interface HvValidationMessages {
  /** The value when a validation fails. */
  error?: string;
  /** The message that appears when there are too many characters. */
  maxCharError?: string;
  /** The message that appears when there are too few characters. */
  minCharError?: string;
  /** The message that appears when the input is empty and required. */
  requiredError?: string;
  /** The message that appears when the input is value is incompatible with the expected type. */
  typeMismatchError?: string;
}

export interface HvInputSuggestion {
  id: string;
  label: string;
  value?: string;
}

export interface HvTagSuggestion extends HvInputSuggestion {}
