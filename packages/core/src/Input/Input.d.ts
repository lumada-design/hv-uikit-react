import { StandardProps } from "@material-ui/core";

import { HvBaseInputProps, HvBaseInputValidationMessagesProps } from "../BaseInput";

import { HvFormStatus } from "../Forms/FormElement";

export interface InputSuggestion {
  id: string;
  label: string;
  value: string;
}

export interface InputLabelsProp {
  /**
   * The label of the clear button.
   */
  clearButtonLabel?: string;

  /**
   * The label of the reveal password button.
   */
  revealPasswordButtonLabel?: string;
  /**
   * The tooltip of the reveal password button when the password is hidden.
   */
  revealPasswordButtonClickToShowTooltip?: string;
  /**
   * The tooltip of the reveal password button when the password is revealed.
   */
  revealPasswordButtonClickToHideTooltip?: string;

  /**
   * The label of the search button.
   */
  searchButtonLabel?: string;
}

export type HvInputClassKey =
  | "root"
  | "hasSuggestions"
  | "inputRoot"
  | "inputBorderContainer"
  | "inputRootFocused"
  | "inputRootDisabled"
  | "inputRootMultiline"
  | "input"
  | "labelContainer"
  | "label"
  | "description"
  | "error"
  | "adornmentsBox"
  | "adornmentButton"
  | "icon"
  | "iconClear"
  | "inputExtension"
  | "suggestionsContainer"
  | "suggestionList";

export interface HvInputProps
  extends StandardProps<HvBaseInputProps, HvInputClassKey, "onChange" | "onBlur"> {
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: React.ReactNode;
  /**
   * @ignore
   */
  "aria-label"?: string;
  /**
   * @ignore
   */
  "aria-labelledby"?: string;
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
   * Identifies the element that provides an error message for the input.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage"?: string;

  /**
   * Internal labels.
   */
  labels?: InputLabelsProp;

  /**
   * An Object containing the various texts associated with the input.
   */
  validationMessages?: HvBaseInputValidationMessagesProps;

  /**
   * The function that will be executed to received an array of objects that has a label and id to create list of suggestion
   */
  suggestionListCallback?: (value: string) => InputSuggestion[];

  /**
   * The custom validation function, it receives the value and must return
   * either `true` for valid or `false` for invalid, default validations would only
   * occur if this function is null or undefined
   */
  validation?: (value: string) => boolean;

  /**
   * If `true` it should autofocus.
   */
  autoFocus?: boolean;

  /**
   * If `true` the clear button is disabled if `false` is enable
   */
  disableClear?: boolean;

  /**
   * If `true` the validation icon adorment is visible. Defaults to `false`.
   *
   * Currently, DS specifications define only a positive feedback icon;
   * errors are signaled through the border style and by displaying the error message.
   */
  showValidationIcon?: boolean;

  /**
   * a custom icon to be added into the input.
   */
  endAdornment?: React.ReactNode;

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
   * Called back when the value is changed.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;

  /**
   * Callback called when the user submits the value by pressing Enter/Return.
   *
   * Also called when the search button is clicked (when type is "search").
   */
  onEnter?: (
    event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => void;

  /**
   * Called back when the value is changed.
   */
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement>,
    value: string,
    validationState: string
  ) => void;
}

export default function HvInput(props: HvInputProps): JSX.Element | null;
