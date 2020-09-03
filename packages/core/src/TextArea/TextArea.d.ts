import { StandardProps } from "@material-ui/core";
import { HvFormElementProps } from "../Forms";
import { HvBaseInputProps } from "../Forms/BaseInput";
import { HvCharCounterProps } from "../Forms/CharCounter";
import { HvWarningTextProps } from "../Forms/WarningText";
import { HvLabelProps } from "../Forms/Label";

export interface HvTextAreaLabelsProp {
  startCount: string;
  /**
   * Text between the current char counter and max value.
   */
  middleCount: string;
  /**
   * The label on top of the input.
   */
  inputLabel: string;
  /**
   * The placeholder value of the input.
   */
  placeholder: string;
  /**
   * The default value of the info text below the input.
   */
  infoText: string;
  /**
   * The value when a validation fails.
   */
  warningText: string;
  /**
   * The message that appears when there are too many characters.
   */
  maxCharQuantityWarningText: string;
  /**
   * The message that appears when there are too few characters.
   */
  minCharQuantityWarningText: string;
  /**
   * The message that appears when the input is empty and required.
   */
  requiredWarningText: string;
}

export interface HvTextAreaProps extends StandardProps<HvBaseInputProps, HvTextAreaClassKey, "onChange" | "onBlur"> {
  /**
   * The initial value of the input, when uncontrolled.
   */
  initialValue?: string;
  /**
   * Component name identifier to be used in the context.
   */
  name?: string;
  /**
   * An Object containing the various text associated with the input.
   */
  labels?: HvTextAreaLabelsProp;
  /**
   * The number of rows of the text area
   */
  rows?: number;
  /**
   * If ´true´ the component is resizable.
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
   * If ´true´ the input value must be filled on blur or else the validation fails.
   */
  isRequired?: boolean;
  /**
   * The state of the textArea.
   */
  validationState?: "standBy" | "invalid";
  /**
   * The custom validation function, it receives the value and must return
   * either ´true´ for valid or ´false´ for invalid, default validations would only
   * occur if this function is null or undefined
   */
  validation?: (value: string) => boolean;
  /**
   * Called back when the value is changed.
   * Return the new value to be accepted, or undefined/void to accept as it is.
   * The event can be undefined when the clear button is clicked.
   */
  onBlur?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined,
    value: string,
    validationState:  "standBy" | "invalid",
  ) => undefined | void;
  /**
   * Called back when the value is changed.
   * Return the new value to be accepted, or undefined/void to accept as it is.
   * The event can be undefined when the clear button is clicked.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined,
    value: string
  ) => undefined | void;
  /**
   * Props passed to the char count.
   */
  countCharProps?: HvCharCounterProps;
  /**
   * Props passed to the HvCharCount component.
   */
  formElementProps?: HvFormElementProps;
  /**
   * Props passed to the HvLabel component.
   */
  labelProps: HvLabelProps;
  /**
   * Props passed to the HvWarning component.
   */
  warningProps: HvWarningTextProps;
}

export type HvTextAreaClassKey =
  | "root"
  | "input"
  | "resize"
  | "inputRoot"
  | "inputRootDisabled"
  | "inputRootFocused"
  | "defaultWith"
  | "characterCounter"
  | "inline"
  | "separator"
  | "maxCharacter"
  | "currentCounter"
  | "disabled"
  | "container";

export default function HvTextArea(props: HvTextAreaProps): JSX.Element | null;
