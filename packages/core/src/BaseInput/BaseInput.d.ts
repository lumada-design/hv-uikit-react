import { StandardProps, InputProps } from "@material-ui/core";

export type HvBaseInputClassKey =
  | "root"
  | "disabled"
  | "invalid"
  | "resizable"
  | "inputRoot"
  | "inputRootFocused"
  | "inputRootDisabled"
  | "inputRootMultiline"
  | "input"
  | "inputResizable"
  | "inputBorderContainer"
  | "readOnly";

export interface HvBaseInputProps
  extends StandardProps<InputProps, HvBaseInputClassKey, "onChange"> {
  /**
   * The function that will be executed onChange, allows modification of the input,
   * it receives the value. If a new value should be presented it must returned it.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: any) => void;

  /**
   * If true and multiline is also true the textarea element will be resizable.
   */
  resizable?: boolean;

  /**
   * Denotes if the input is in an invalid state.
   */
  invalid?: boolean;
}

export default function HvBaseInput(props: HvBaseInputProps): JSX.Element | null;

export interface HvBaseInputValidationMessagesProps {
  /**
   * The value when a validation fails.
   */
  error?: string;
  /**
   * The message that appears when there are too many characters.
   */
  maxCharError?: string;
  /**
   * The message that appears when there are too few characters.
   */
  minCharError?: string;
  /**
   * The message that appears when the input is empty and required.
   */
  requiredError?: string;
  /**
   * The message that appears when the input is value is incompatible with the expected type.
   */
  typeMismatchError?: string;
}
