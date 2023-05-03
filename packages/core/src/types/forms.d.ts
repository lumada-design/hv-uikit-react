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

export interface HvInputLabels {
  /** The label of the clear button. */
  clearButtonLabel?: string;
  /** The label of the reveal password button. */
  revealPasswordButtonLabel?: string;
  /** The tooltip of the reveal password button when the password is hidden. */
  revealPasswordButtonClickToShowTooltip?: string;
  /** The tooltip of the reveal password button when the password is revealed. */
  revealPasswordButtonClickToHideTooltip?: string;
  /** The label of the search button. */
  searchButtonLabel?: string;
}

export interface HvInputSuggestion {
  id: string;
  label: string;
  value?: string;
}

export interface HvTagSuggestion extends HvInputSuggestion {}
