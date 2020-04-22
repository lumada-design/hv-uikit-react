import { StandardProps, InputProps } from "@material-ui/core";

interface InputSuggestion {
  id: string;
  label: string;
}

export interface HvInputLabelsProp {
  inputLabel?: string;
  placeholder?: string;
  infoText?: string;
  warningText?: string;
  maxCharQuantityWarningText?: string;
  minCharQuantityWarningText?: string;
  requiredWarningText?: string;
  clearButtonLabel?: string;
}

export interface HvInputProps extends StandardProps<InputProps, HvInputClassKey, "onChange"> {
  /**
   * An Object containing the various text associated with the input.
   *
   * - inputLabel: the label on top of the input.
   * - placeholder: the placeholder value of the input.
   * - infoText: the default value of the info text below the input.
   * - warningText: the value when a validation fails.
   * - maxCharQuantityWarningText: the message that appears when there are too many characters.
   * - minCharQuantityWarningText: the message that appears when there are too few characters.
   * - requiredWarningText: the message that appears when the input is empty and required.
   * - clearButtonLabel: the label of the clear button.
   */
  labels?: HvInputLabelsProp;
  /**
   * Attributes applied to the input element.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Allows passing a ref to the underlying input
   */
  inputRef?: React.Ref<unknown>;
  /**
   * If ´true´ the input is disabled.
   */
  disabled?: boolean;
  /**
   * If ´true´ the input value must be filled on blur or else the validation fails.
   */
  isRequired?: boolean;
  /**
   * If ´true´ the input is of type password hiding the value.
   */
  password?: boolean;
  /**
   * The function that will be executed to received an array of objects that has a label and id to create list of suggestion
   */
  suggestionListCallback?: (value: string) => InputSuggestion[];
  /**
   * The function that will be executed after selecting a value in the suggestion list
   */
  suggestionSelectedCallback?: (suggestion: InputSuggestion) => void;
  /**
   * If `true` information label is shown, `false` otherwise.
   */
  showInfo?: boolean;
  /**
   * The custom validation function, it receives the value and must return
   * either ´true´ for valid or ´false´ for invalid, default validations would only
   * occur if this function is null or undefined
   */
  validation?: (value: string) => boolean;
  /**
   * The value of the input, when controlled.
   */
  value?: string;
  /**
   * The initial value of the input, when uncontrolled.
   */
  initialValue?: string;
  /**
   * If `true` it should autofocus.
   */
  autoFocus?: boolean;
  /**
   * The initial state of the input.
   * note: Is recommended you use the provided validationStates object to set this value.
   */
  validationState?: "empty" | "filled" | "invalid" | "valid";
  /**
   * Show info icon with info label.infoText.
   */
  infoIcon?: boolean;
  /**
   * If `true` the validation icon is visible, `false` otherwise
   */
  validationIconVisible?: boolean;
  /**
   * If `true` the clear button is disabled if `false` is enable
   */
  disableClear?: boolean;
  /**
   * The icon position of the input. It is recommended to use the provided validationIconPosition object to set this value.
   */
  validationIconPosition?: "left" | "right";
  /**
   * a custom icon to be added into the input.
   */
  customFixedIcon?: React.ReactNode;
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
   * Which type of default validation should the input perform. It is recommended to use the provided ValidationTypes object to set this value.
   */
  validationType?: "none" | "number" | "email";
  /**
   * Overrides any validation with a specific error/warning message to set in the warningText slot.
   */
  externalWarningTextOverride?: string;

  /**
   * Called back when the value is changed.
   * Must return the new value to be accepted.
   * The event can be undefined when the clear button is clicked.
   */
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined, value: string) => string
}

export type HvInputClassKey =
  | "root"
  | "inputRoot"
  | "inputRootDisabled"
  | "inputRootInvalid"
  | "inputRootFocused"
  | "input"
  | "inputDisabled"
  | "suggestionsContainer"
  | "suggestionList"
  | "multiLine"
  | "label"
  | "labelDisabled"
  | "labelContainer"
  | "infoIconContainer"
  | "infoText"
  | "text"
  | "textInfo"
  | "textWarning"
  | "showText"
  | "icon"
  | "iconClear";

export default function HvInput(props: HvInputProps): JSX.Element | null;
