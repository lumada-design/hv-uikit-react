import { StandardProps } from "@material-ui/core";

export interface HvInputAdornmentProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    HvInputAdornmentClassKey,
    "onChange"
  > {
  /**
   * Label inside the input used to help user.
   */
  placeholder?: string;
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
   * If ´true´ the input is of type password hiding the value.
   */
  password?: boolean;
  /**
   * Called back when the value is changed.
   * Must return the new value to be accepted.
   * The event can be undefined when the clear button is clicked.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined,
    value: string
  ) => string;
  /**
   * The value of the input, when controlled.
   */
  value?: string;
  /**
   * The initial value of the input, when uncontrolled.
   */
  defaultValue?: string;
  /**
   * If true, a textarea element will be rendered.
   */
  multiline?: boolean;
  /**
   * If true, the input element will be required.
   */
  required?: boolean;
  /**
   * Denotes if the input is in an invalid state.
   */
  invalid?: boolean;
}

export type HvInputAdornmentClassKey =
  | "root"
  | "inputRoot"
  | "inputRootDisabled"
  | "inputRootInvalid"
  | "inputRootFocused"
  | "input"
  | "inputDisabled"
  | "multiLine"
  | "@global";

export default function HvInputAdornment(props: HvInputAdornmentProps): JSX.Element | null;
