import { StandardProps, InputProps } from "@material-ui/core";

export type HvBaseInputClassKey =
  | "root"
  | "inputRoot"
  | "disabledRoot"
  | "invalidRoot"
  | "inputBorderContainer"
  | "inputRootDisabled"
  | "inputRootFocused"
  | "input"
  | "inputDisabled"
  | "multiLine"
  | "@global";

export interface HvBaseInputProps
  extends StandardProps<InputProps, HvBaseInputClassKey, "onChange">{
  /**
   * Called back when the value is changed.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined,
    value: string
  ) => string;
  /**
   * If true, the input element will be required.
   */
  required?: boolean;
  /**
   * Denotes if the input is in an invalid state.
   */
  invalid?: boolean;
}

export default function HvBaseInput(props: HvBaseInputProps): JSX.Element | null;
